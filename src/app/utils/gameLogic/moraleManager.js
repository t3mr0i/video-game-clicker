/**
 * Morale management utilities for the game loop
 * Handles team morale calculations and personality interactions
 */

import { GAME_MECHANICS } from '../../config/gameConstants';

/**
 * Calculates team personality harmony based on employee personalities
 * @param {Array} personalities - Array of personality strings
 * @returns {number} Harmony score (0-2)
 */
export function calculateTeamPersonalityHarmony(personalities) {
  const personalityGroups = {
    'Team Players': ['Team Player'],
    'Innovators': ['Innovative'],
    'Detail-Oriented': ['Perfectionist', 'Detail-oriented'],
    'Creatives': ['Creative', 'Visionary']
  };

  const groupCounts = Object.keys(personalityGroups).reduce((acc, group) => {
    acc[group] = personalities.filter(p => personalityGroups[group].includes(p)).length;
    return acc;
  }, {});

  // More personalities in a group increase harmony
  const harmonyScore = Object.values(groupCounts).reduce((score, count) => {
    return score + (count > 1 ? (count * 0.5) : 0);
  }, 0);

  return Math.min(2, harmonyScore); // Cap harmony bonus
}

/**
 * Calculates morale changes based on various factors
 * @param {Object} gameState - Current game state
 * @param {number} dayProgress - Days to process
 * @returns {number} Morale change amount
 */
export function calculateMoraleChanges(gameState, dayProgress) {
  let moraleChange = 0;

  // Workload pressure - more dynamic calculation
  const activeProjects = (gameState.projects || []).filter(p => p.status === 'in-progress');
  const employeeCount = Math.max(1, (gameState.employees || []).length);
  const workloadRatio = activeProjects.length / employeeCount;

  // Project phase complexity impacts workload
  const phaseWorkloadImpact = activeProjects.reduce((impact, project) => {
    const phaseMultipliers = {
      'Concept': 0.2,
      'Pre-production': 0.5,
      'Production': 1.0,
      'Alpha': 1.5,
      'Beta': 2.0,
      'Release': 0.5
    };
    return impact + (phaseMultipliers[project.phase] || 1.0);
  }, 0);

  // Apply workload stress
  if (phaseWorkloadImpact > 3.0) {
    moraleChange -= 10 * dayProgress; // Extreme project complexity stress
  } else if (workloadRatio > 2.5) {
    moraleChange -= 8 * dayProgress; // Severe overwork
  } else if (workloadRatio > 1.5) {
    moraleChange -= 3 * dayProgress; // Moderate overwork
  } else if (workloadRatio < 0.5) {
    moraleChange += 2 * dayProgress; // Well-staffed bonus
  }

  // Enhanced financial stress calculation
  const financialStressLevels = [
    { threshold: 5000, impact: -5, description: 'Critical' },
    { threshold: 25000, impact: -2, description: 'Moderate' },
    { threshold: 100000, impact: 1, description: 'Secure' }
  ];

  const financialStress = financialStressLevels.find(level => gameState.money < level.threshold);
  if (financialStress) {
    moraleChange += financialStress.impact * dayProgress;
  }

  // More sophisticated project completion morale boost
  const recentCompletions = (gameState.completedProjects || []).filter(p => {
    // Check completions within last game month
    const completionThreshold = new Date(Date.now() - (30 * 24 * 60 * 60 * 1000));
    return new Date(p.completedDate) > completionThreshold;
  });

  if (recentCompletions.length > 0) {
    // Boost depends on project size and quality
    const completionBonus = recentCompletions.reduce((bonus, project) => {
      const sizeBonus = project.size === 3 ? 1.5 : project.size === 2 ? 1.0 : 0.5;
      const qualityBonus = project.progress >= 95 ? 1.2 : 1.0;
      return bonus + (0.5 * sizeBonus * qualityBonus);
    }, 0);

    moraleChange += completionBonus * dayProgress;
  }

  // Team personality dynamics
  const teamPersonalities = (gameState.employees || []).map(emp => emp.personality);
  const personalityHarmony = calculateTeamPersonalityHarmony(teamPersonalities);
  moraleChange += personalityHarmony * dayProgress;

  return moraleChange;
}

/**
 * Calculates daily expenses (primarily employee salaries)
 * @param {Array} employees - List of employees
 * @param {number} dayProgress - Days to calculate for
 * @returns {number} Total daily expenses
 */
export function calculateDailyExpenses(employees, dayProgress) {
  return (employees || []).reduce((total, emp) => {
    return total + (emp.salary / GAME_MECHANICS.DAYS_PER_MONTH);
  }, 0) * dayProgress;
}