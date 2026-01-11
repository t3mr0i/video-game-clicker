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

  // Enhanced platform modifier with more differentiation
  const platformModifiers = {
    PC: { baseModifier: 1.0, complexityFactor: 0.9 },
    Console: { baseModifier: 1.2, complexityFactor: 1.1 },
    Mobile: { baseModifier: 0.8, complexityFactor: 0.7 },
    Web: { baseModifier: 0.7, complexityFactor: 0.5 },
    VR: { baseModifier: 1.5, complexityFactor: 1.3 }
  };

  // More nuanced genre modifier considering depth and complexity
  const genreModifiers = {
    Action: { complexity: 1.1, learningCurve: 0.9 },
    Adventure: { complexity: 1.0, learningCurve: 0.8 },
    RPG: { complexity: 1.3, learningCurve: 1.2 },
    Strategy: { complexity: 1.2, learningCurve: 1.1 },
    Simulation: { complexity: 1.1, learningCurve: 1.0 },
    Puzzle: { complexity: 0.9, learningCurve: 0.7 },
    Sports: { complexity: 1.0, learningCurve: 0.8 },
    Racing: { complexity: 1.0, learningCurve: 0.9 },
    Fighting: { complexity: 1.1, learningCurve: 1.0 },
    Shooter: { complexity: 1.2, learningCurve: 1.1 }
  };

  // More sophisticated year and complexity modifier
  const yearModifier = Math.max(0.8, 1.0 + (year - 2020) * 0.06);

  // Enhanced employee skill calculation with role-based weighting
  const skillWeights = {
    Developer: 0.5,
    Designer: 0.2,
    Artist: 0.15,
    SoundDesigner: 0.1,
    Producer: 0.05
  };

  const avgSkill = Object.entries(employeeSkills).length > 0
    ? Object.entries(employeeSkills).reduce((total, [role, skill]) => {
        const weight = skillWeights[role] || 0.1;
        return total + (skill * weight);
      }, 0)
    : 50; // Default skill level

  const skillModifier = 0.5 + (avgSkill / 100);

  // Combine platform and genre complexity
  const platformComplexity = platformModifiers[platform]?.complexityFactor || 1.0;
  const genreComplexity = genreModifiers[genre]?.complexity || 1.0;
  const learningCurveFactor = genreModifiers[genre]?.learningCurve || 1.0;

  return Math.floor(
    basePoints *
    (platformModifiers[platform]?.baseModifier || 1.0) *
    (genreModifiers[genre]?.complexity || 1.0) *
    yearModifier *
    skillModifier *
    (1 + (platformComplexity - 1) * learningCurveFactor)
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
export const calculateMarketDemand = (genre, platform, year, previousGameSuccess = {}) => {
  // More detailed base demand with historical trend tracking
  const baseDemand = {
    Action: { baseValue: 1.2, volatility: 0.15, recentTrend: 1.0 },
    Adventure: { baseValue: 1.0, volatility: 0.1, recentTrend: 1.0 },
    RPG: { baseValue: 1.1, volatility: 0.2, recentTrend: 1.0 },
    Strategy: { baseValue: 0.9, volatility: 0.12, recentTrend: 1.0 },
    Simulation: { baseValue: 0.8, volatility: 0.08, recentTrend: 1.0 },
    Puzzle: { baseValue: 0.7, volatility: 0.05, recentTrend: 1.0 },
    Sports: { baseValue: 1.0, volatility: 0.1, recentTrend: 1.0 },
    Racing: { baseValue: 0.9, volatility: 0.09, recentTrend: 1.0 },
    Fighting: { baseValue: 0.8, volatility: 0.07, recentTrend: 1.0 },
    Shooter: { baseValue: 1.3, volatility: 0.18, recentTrend: 1.0 }
  };

  const platformDemand = {
    PC: { baseValue: 0.8, innovationFactor: 1.1 },
    Console: { baseValue: 1.0, innovationFactor: 1.2 },
    Mobile: { baseValue: 1.5, innovationFactor: 0.9 },
    Web: { baseValue: 0.4, innovationFactor: 0.7 },
    VR: { baseValue: 0.3, innovationFactor: 1.3 }
  };

  // Dynamic trend modifier considering previous game success
  const calculateTrendModifier = (genre) => {
    const genreData = baseDemand[genre] || { volatility: 0.1, recentTrend: 1.0 };
    const successFactor = previousGameSuccess[genre] || 1.0;

    // Use sine wave with varying amplitude based on volatility
    const cyclicalTrend = 1.0 + Math.sin((year - 2020) * 0.5) * genreData.volatility;

    // Incorporate recent game success
    return cyclicalTrend * (1 + (successFactor - 1) * 0.2);
  };

  const genreBaseValue = baseDemand[genre]?.baseValue || 1.0;
  const platformBaseValue = platformDemand[platform]?.baseValue || 1.0;
  const trendModifier = calculateTrendModifier(genre);

  return Math.max(0.3, Math.min(2.0,
    genreBaseValue *
    platformBaseValue *
    trendModifier *
    (platformDemand[platform]?.innovationFactor || 1.0)
  ));
};