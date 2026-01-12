/**
 * Pure functions for morale-related calculations
 * These functions handle team morale dynamics without side effects
 */

import { calculateWorkloadRatio, calculatePhaseWorkloadImpact } from './projectCalculations.js';

/**
 * Calculate team personality harmony based on employee personalities
 * @param {Array} teamPersonalities - Array of personality strings
 * @returns {number} Harmony score (-1 to 1)
 */
export const calculateTeamPersonalityHarmony = (teamPersonalities) => {
  if (teamPersonalities.length <= 1) return 0;

  // Define personality compatibility matrix
  const personalityTypes = {
    'Creative': { synergies: ['Innovative', 'Perfectionist'], conflicts: ['Methodical'] },
    'Innovative': { synergies: ['Creative', 'Ambitious'], conflicts: ['Traditional'] },
    'Methodical': { synergies: ['Perfectionist', 'Traditional'], conflicts: ['Creative'] },
    'Perfectionist': { synergies: ['Methodical', 'Creative'], conflicts: ['Impatient'] },
    'Ambitious': { synergies: ['Innovative'], conflicts: ['Relaxed'] },
    'Traditional': { synergies: ['Methodical'], conflicts: ['Innovative'] },
    'Social': { synergies: ['Friendly'], conflicts: ['Introverted'] },
    'Analytical': { synergies: ['Methodical', 'Perfectionist'], conflicts: ['Impulsive'] }
  };

  let totalHarmony = 0;
  let interactions = 0;

  // Check all personality pair combinations
  for (let i = 0; i < teamPersonalities.length; i++) {
    for (let j = i + 1; j < teamPersonalities.length; j++) {
      const person1 = teamPersonalities[i];
      const person2 = teamPersonalities[j];

      if (personalityTypes[person1]) {
        if (personalityTypes[person1].synergies.includes(person2)) {
          totalHarmony += 0.5; // Positive synergy
        } else if (personalityTypes[person1].conflicts.includes(person2)) {
          totalHarmony -= 0.3; // Negative conflict
        }
      }

      interactions++;
    }
  }

  return interactions > 0 ? totalHarmony / interactions : 0;
};

/**
 * Calculate financial stress impact on morale
 * @param {number} currentMoney - Current company money
 * @param {number} dayProgress - Progress of the day (fraction)
 * @returns {number} Financial stress morale change
 */
export const calculateFinancialStress = (currentMoney, dayProgress) => {
  const financialStressLevels = [
    { threshold: 5000, impact: -5, description: 'Critical' },
    { threshold: 25000, impact: -2, description: 'Moderate' },
    { threshold: 100000, impact: 1, description: 'Secure' }
  ];

  const financialStress = financialStressLevels.find(level => currentMoney < level.threshold);

  return financialStress ? financialStress.impact * dayProgress : 0;
};

/**
 * Calculate morale boost from recent project completions
 * @param {Array} completedProjects - Array of completed projects
 * @param {number} dayProgress - Progress of the day (fraction)
 * @returns {number} Project completion morale boost
 */
export const calculateCompletionMoraleBoost = (completedProjects, dayProgress) => {
  // Check completions within last game month
  const completionThreshold = new Date(Date.now() - (30 * 24 * 60 * 60 * 1000));
  const recentCompletions = completedProjects.filter(project => {
    return project.completedDate && new Date(project.completedDate) > completionThreshold;
  });

  if (recentCompletions.length === 0) return 0;

  // Calculate boost based on project size and quality
  const completionBonus = recentCompletions.reduce((bonus, project) => {
    const sizeBonus = project.size === 3 ? 1.5 : project.size === 2 ? 1.0 : 0.5;
    const qualityBonus = project.progress >= 95 ? 1.2 : 1.0;
    return bonus + (0.5 * sizeBonus * qualityBonus);
  }, 0);

  return completionBonus * dayProgress;
};

/**
 * Calculate workload stress impact on morale
 * @param {Array} activeProjects - Array of active projects
 * @param {Array} employees - Array of employees
 * @param {number} dayProgress - Progress of the day (fraction)
 * @returns {number} Workload stress morale change
 */
export const calculateWorkloadStress = (activeProjects, employees, dayProgress) => {
  let moraleChange = 0;

  const workloadRatio = calculateWorkloadRatio(activeProjects, employees);
  const phaseWorkloadImpact = calculatePhaseWorkloadImpact(activeProjects);

  // Apply workload penalties and bonuses
  if (phaseWorkloadImpact > 3.0) {
    moraleChange -= 10 * dayProgress; // Extreme project complexity stress
  } else if (workloadRatio > 2.5) {
    moraleChange -= 8 * dayProgress; // Severe overwork
  } else if (workloadRatio > 1.5) {
    moraleChange -= 3 * dayProgress; // Moderate overwork
  } else if (workloadRatio < 0.5) {
    moraleChange += 2 * dayProgress; // Well-staffed bonus
  }

  return moraleChange;
};

/**
 * Calculate overall morale changes for a time period
 * @param {Object} gameState - Current game state
 * @param {number} dayProgress - Progress of the day (fraction)
 * @returns {number} Total morale change
 */
export const calculateMoraleChanges = (gameState, dayProgress) => {
  const { projects = [], employees = [], money = 0, completedProjects = [] } = gameState;

  let totalMoraleChange = 0;

  // Get active projects
  const activeProjects = projects.filter(p => p.status === 'in-progress');

  // Calculate individual morale factors
  const workloadStress = calculateWorkloadStress(activeProjects, employees, dayProgress);
  const financialStress = calculateFinancialStress(money, dayProgress);
  const completionBoost = calculateCompletionMoraleBoost(completedProjects, dayProgress);

  // Team personality dynamics
  const teamPersonalities = employees.map(emp => emp.personality).filter(Boolean);
  const personalityHarmony = calculateTeamPersonalityHarmony(teamPersonalities);

  totalMoraleChange = workloadStress + financialStress + completionBoost + (personalityHarmony * dayProgress);

  return totalMoraleChange;
};

/**
 * Apply morale boundaries and return constrained value
 * @param {number} currentMorale - Current morale value
 * @param {number} moraleChange - Proposed morale change
 * @returns {number} New morale value (0-100)
 */
export const applyMoraleBounds = (currentMorale, moraleChange) => {
  return Math.max(0, Math.min(100, currentMorale + moraleChange));
};