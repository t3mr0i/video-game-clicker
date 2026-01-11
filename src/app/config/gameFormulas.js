import { GAME_MECHANICS, GAME_SIZES } from './gameConstants';

// Cost calculation formulas
export const calculateEmployeeCost = (currentEmployeeCount) => {
  return Math.floor(
    GAME_MECHANICS.BASE_EMPLOYEE_COST *
    Math.pow(GAME_MECHANICS.EMPLOYEE_COST_MULTIPLIER, currentEmployeeCount)
  );
};

export const calculateProjectCost = (size, platformCount = 1) => {
  const baseCost = GAME_MECHANICS.BASE_PROJECT_COST * size * platformCount;
  return Math.floor(baseCost);
};

export const calculateResearchCost = (currentResearchCount) => {
  return Math.floor(
    GAME_MECHANICS.BASE_RESEARCH_COST *
    Math.pow(GAME_MECHANICS.RESEARCH_COST_MULTIPLIER, currentResearchCount)
  );
};

// Development calculation formulas
export const calculateDevelopmentPoints = (platform, genre, size, year, employeeSkills = {}) => {
  const basePoints = GAME_MECHANICS.BASE_DEVELOPMENT_POINTS[size] || 1000;

  // Platform modifier
  const platformModifiers = {
    PC: 1.0,
    Console: 1.2,
    Mobile: 0.8,
    Web: 0.7,
    VR: 1.5
  };

  // Genre modifier
  const genreModifiers = {
    Action: 1.1,
    Adventure: 1.0,
    RPG: 1.3,
    Strategy: 1.2,
    Simulation: 1.1,
    Puzzle: 0.9,
    Sports: 1.0,
    Racing: 1.0,
    Fighting: 1.1,
    Shooter: 1.2
  };

  // Year modifier (newer games are more complex)
  const yearModifier = Math.max(0.8, 1.0 + (year - 2020) * 0.05);

  // Employee skill modifier
  const avgSkill = (employeeSkills && Object.keys(employeeSkills).length > 0)
    ? Object.values(employeeSkills).reduce((sum, skill) => sum + skill, 0) / Object.values(employeeSkills).length
    : 50; // Default skill level

  const skillModifier = 0.5 + (avgSkill / 100);

  return Math.floor(
    basePoints *
    (platformModifiers[platform] || 1.0) *
    (genreModifiers[genre] || 1.0) *
    yearModifier *
    skillModifier
  );
};

// Revenue calculation formulas
export const calculateGameRevenue = (quality, hype, platform, genre, marketSize = 1000000) => {
  const qualityMultiplier = Math.max(0.1, quality / 100);
  const hypeMultiplier = Math.max(0.1, hype / 100);

  const platformMultipliers = {
    PC: 0.8,
    Console: 1.2,
    Mobile: 1.5,
    Web: 0.3,
    VR: 0.6
  };

  const baseRevenue = marketSize * qualityMultiplier * hypeMultiplier;
  return Math.floor(baseRevenue * (platformMultipliers[platform] || 1.0));
};

// Skill improvement formulas
export const calculateSkillGain = (currentSkill, projectDifficulty, timeSpent) => {
  const difficultyBonus = Math.max(0.1, projectDifficulty / 100);
  const diminishingReturns = Math.max(0.1, (100 - currentSkill) / 100);
  const baseGain = timeSpent * difficultyBonus * diminishingReturns;

  return Math.floor(baseGain * 10) / 10; // Round to 1 decimal
};

// Time calculation formulas
export const calculateProjectDuration = (size, employeeCount, avgSkill) => {
  const baseDuration = {
    [GAME_SIZES.A]: 90,    // 3 months
    [GAME_SIZES.AA]: 270,  // 9 months
    [GAME_SIZES.AAA]: 540  // 18 months
  };

  const skillMultiplier = Math.max(0.5, avgSkill / 100);
  const teamMultiplier = Math.min(2.0, Math.max(0.5, employeeCount / 5));

  return Math.ceil((baseDuration[size] || 90) / (skillMultiplier * teamMultiplier));
};

// Morale calculation formulas
export const calculateMoraleChange = (events) => {
  let totalChange = 0;

  events.forEach(event => {
    switch (event.type) {
      case 'project_success':
        totalChange += 10;
        break;
      case 'project_failure':
        totalChange -= 15;
        break;
      case 'bonus_payment':
        totalChange += 5;
        break;
      case 'overtime':
        totalChange -= 3;
        break;
      case 'new_hire':
        totalChange += 2;
        break;
      case 'layoff':
        totalChange -= 8;
        break;
      default:
        break;
    }
  });

  return totalChange;
};

// Market analysis formulas
export const calculateMarketDemand = (genre, platform, year) => {
  const baseDemand = {
    Action: 1.2,
    Adventure: 1.0,
    RPG: 1.1,
    Strategy: 0.9,
    Simulation: 0.8,
    Puzzle: 0.7,
    Sports: 1.0,
    Racing: 0.9,
    Fighting: 0.8,
    Shooter: 1.3
  };

  const platformDemand = {
    PC: 0.8,
    Console: 1.0,
    Mobile: 1.5,
    Web: 0.4,
    VR: 0.3
  };

  // Trend modifier based on year
  const trendModifier = 1.0 + Math.sin((year - 2020) * 0.5) * 0.2;

  return (baseDemand[genre] || 1.0) * (platformDemand[platform] || 1.0) * trendModifier;
};