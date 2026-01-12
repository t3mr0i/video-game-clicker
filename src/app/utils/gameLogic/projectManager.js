/**
 * Project management utilities for the game loop
 * Handles project progression, skill matching, and revenue calculation
 */

/**
 * Calculates skill match between employee and project
 * @param {Object} employee - Employee with skills and personality
 * @param {Object} project - Project with required skills and phase
 * @returns {number} Skill match factor (0-1+)
 */
export function calculateSkillMatch(employee, project) {
  // More sophisticated skill matching based on project phase and requirements
  const relevantSkills = project.requiredSkills || ['programming', 'design', 'testing'];
  const phaseMultipliers = {
    'Concept': 0.5,
    'Pre-production': 0.7,
    'Production': 1.0,
    'Alpha': 1.2,
    'Beta': 1.5,
    'Release': 1.0
  };

  const phaseMultiplier = phaseMultipliers[project.phase] || 1.0;

  // Deeper skill calculation with personality and experience factors
  const skillSum = relevantSkills.reduce((sum, skill) => {
    const skillLevel = employee.skills[skill] || 50;
    const personalityBonus = employee.personality.includes('Innovative') ? 1.1 :
                              employee.personality.includes('Perfectionist') ? 1.05 : 1.0;

    return sum + (skillLevel * personalityBonus);
  }, 0);

  // Normalize and apply phase multiplier
  return Math.min(1, (skillSum / (relevantSkills.length * 100)) * phaseMultiplier);
}

/**
 * Calculates project revenue based on various factors
 * @param {Object} project - Project object with details
 * @param {Object} gameState - Current game state for morale, etc.
 * @returns {number} Calculated revenue
 */
export function calculateProjectRevenue(project, gameState) {
  // More dynamic revenue calculation with genre and market factors
  const baseRevenue = project.estimatedRevenue || 50000;

  // Sophisticated size and complexity multipliers
  const sizeMultipliers = {
    1: 1.0,  // Small game
    2: 1.5,  // Medium game
    3: 2.5   // Large AAA game
  };
  const sizeMultiplier = sizeMultipliers[project.size] || 1.0;

  // Genre popularity and current market trends
  const genrePopularityMultipliers = {
    'Action': 1.3,
    'RPG': 1.2,
    'Strategy': 1.1,
    'Simulation': 0.9,
    'Puzzle': 0.8
  };
  const genreMultiplier = genrePopularityMultipliers[project.genre] || 1.0;

  // Quality variance based on team composition, morale, and project complexity
  const teamQuality = gameState.morale / 100;
  const projectComplexityFactor = project.requiredSkills ? project.requiredSkills.length * 0.1 : 0.2;
  const qualityVariance = 0.2 + (teamQuality * 0.3) + projectComplexityFactor;

  // Random market reception factor
  const marketReceptionFactor = 0.8 + (Math.random() * 0.4);

  // Platform factor
  const platformMultipliers = {
    'PC': 1.0,
    'Console': 1.2,
    'Mobile': 0.9,
    'Web': 0.7,
    'VR': 1.5
  };
  const platformMultiplier = platformMultipliers[project.platform] || 1.0;

  return Math.floor(
    baseRevenue *
    sizeMultiplier *
    genreMultiplier *
    qualityVariance *
    marketReceptionFactor *
    platformMultiplier
  );
}

/**
 * Processes project advancement for a single project
 * @param {Object} project - Project to advance
 * @param {Array} assignedEmployees - Employees assigned to this project
 * @param {number} dayProgress - Days to progress
 * @param {number} morale - Team morale (0-100)
 * @returns {Object} Update object or null if no change
 */
export function processProjectAdvancement(project, assignedEmployees, dayProgress, morale) {
  if (assignedEmployees.length === 0) {
    return null;
  }

  // Calculate work progress based on employee skills and project complexity
  const totalProductivity = assignedEmployees.reduce((sum, emp) => {
    const skillMatch = calculateSkillMatch(emp, project);
    const moraleBonus = Math.max(0.1, morale / 100); // Ensure minimum productivity
    return sum + (emp.productivity * skillMatch * moraleBonus);
  }, 0);

  // More precise progress calculation with dynamic scaling
  const progressBase = 100 / project.estimatedDays;
  const progressMultiplier = 1 + (totalProductivity * 0.5); // Dynamic multiplier
  const progressIncrement = progressBase * progressMultiplier * dayProgress;
  const newProgress = Math.min(100, project.progress + progressIncrement);

  // Only return update if progress changed significantly
  if (Math.abs(newProgress - project.progress) > 0.01) {
    return {
      id: project.id,
      updates: { progress: newProgress },
      isComplete: newProgress >= 100 && project.progress < 100
    };
  }

  return null;
}