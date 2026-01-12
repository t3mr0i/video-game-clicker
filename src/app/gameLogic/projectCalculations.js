/**
 * Pure functions for project-related calculations
 * These functions have no side effects and are easily testable
 */

/**
 * Calculate how well an employee's skills match a project's requirements
 * @param {Object} employee - Employee object with skills and personality
 * @param {Object} project - Project object with required skills and phase
 * @returns {number} Skill match score (0-1)
 */
export const calculateSkillMatch = (employee, project) => {
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

  // Calculate skill score with personality bonuses
  const skillSum = relevantSkills.reduce((sum, skill) => {
    const skillLevel = employee.skills[skill] || 50;
    const personalityBonus = employee.personality.includes('Innovative') ? 1.1 :
                            employee.personality.includes('Perfectionist') ? 1.05 : 1.0;

    return sum + (skillLevel * personalityBonus);
  }, 0);

  // Normalize and apply phase multiplier
  return Math.min(1, (skillSum / (relevantSkills.length * 100)) * phaseMultiplier);
};

/**
 * Calculate project revenue based on multiple factors
 * @param {Object} project - Project object
 * @param {number} teamMorale - Current team morale (0-100)
 * @returns {number} Calculated revenue
 */
export const calculateProjectRevenue = (project, teamMorale = 50) => {
  const baseRevenue = project.estimatedRevenue || 50000;

  // Size multipliers
  const sizeMultipliers = {
    1: 1.0,  // Small game
    2: 1.5,  // Medium game
    3: 2.5   // Large AAA game
  };
  const sizeMultiplier = sizeMultipliers[project.size] || 1.0;

  // Genre popularity multipliers
  const genreMultipliers = {
    'Action': 1.3,
    'RPG': 1.2,
    'Strategy': 1.1,
    'Simulation': 0.9,
    'Puzzle': 0.8
  };
  const genreMultiplier = genreMultipliers[project.genre] || 1.0;

  // Platform multipliers
  const platformMultipliers = {
    'PC': 1.0,
    'Console': 1.2,
    'Mobile': 0.9,
    'Web': 0.7,
    'VR': 1.5
  };
  const platformMultiplier = platformMultipliers[project.platform] || 1.0;

  // Quality factors
  const teamQuality = teamMorale / 100;
  const projectComplexityFactor = project.requiredSkills ? project.requiredSkills.length * 0.1 : 0.2;
  const qualityVariance = 0.2 + (teamQuality * 0.3) + projectComplexityFactor;

  // Market reception (randomized)
  const marketReceptionFactor = 0.8 + (Math.random() * 0.4);

  return Math.floor(
    baseRevenue *
    sizeMultiplier *
    genreMultiplier *
    qualityVariance *
    marketReceptionFactor *
    platformMultiplier
  );
};

/**
 * Calculate project progress increment for a time period
 * @param {Object} project - Project object
 * @param {Array} assignedEmployees - Array of employees assigned to the project
 * @param {number} teamMorale - Current team morale (0-100)
 * @param {number} dayProgress - Progress of the day (fraction)
 * @returns {number} Progress increment
 */
export const calculateProjectProgress = (project, assignedEmployees, teamMorale, dayProgress) => {
  if (assignedEmployees.length === 0) return 0;

  // Calculate total productivity
  const totalProductivity = assignedEmployees.reduce((sum, employee) => {
    const skillMatch = calculateSkillMatch(employee, project);
    const moraleBonus = Math.max(0.1, teamMorale / 100); // Ensure minimum productivity
    return sum + (employee.productivity * skillMatch * moraleBonus);
  }, 0);

  // Calculate progress increment
  const progressBase = 100 / project.estimatedDays;
  const progressMultiplier = 1 + (totalProductivity * 0.5);
  const progressIncrement = progressBase * progressMultiplier * dayProgress;

  return progressIncrement;
};

/**
 * Determine if a project should be auto-completed
 * @param {Object} project - Project object
 * @param {number} newProgress - New progress value
 * @returns {boolean} Whether the project should be completed
 */
export const shouldCompleteProject = (project, newProgress) => {
  return newProgress >= 100 && project.progress < 100;
};

/**
 * Calculate workload ratio for team stress analysis
 * @param {Array} activeProjects - Array of active projects
 * @param {Array} employees - Array of employees
 * @returns {number} Workload ratio
 */
export const calculateWorkloadRatio = (activeProjects, employees) => {
  const employeeCount = Math.max(1, employees.length);
  return activeProjects.length / employeeCount;
};

/**
 * Calculate phase workload impact based on project phases
 * @param {Array} activeProjects - Array of active projects
 * @returns {number} Phase workload impact score
 */
export const calculatePhaseWorkloadImpact = (activeProjects) => {
  const phaseMultipliers = {
    'Concept': 0.2,
    'Pre-production': 0.5,
    'Production': 1.0,
    'Alpha': 1.5,
    'Beta': 2.0,
    'Release': 0.5
  };

  return activeProjects.reduce((impact, project) => {
    return impact + (phaseMultipliers[project.phase] || 1.0);
  }, 0);
};