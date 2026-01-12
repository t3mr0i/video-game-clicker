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
const developmentPointsCache = new Map();

export const calculateDevelopmentPoints = (platform, genre, size, year, employeeSkills = {}, teamComposition = {}) => {
  // Create a more comprehensive cache key
  const cacheKey = `${platform}:${genre}:${size}:${year}:${JSON.stringify(employeeSkills)}:${JSON.stringify(teamComposition)}`;

  // Check cache first
  if (developmentPointsCache.has(cacheKey)) {
    return developmentPointsCache.get(cacheKey);
  }

  const basePoints = GAME_MECHANICS.BASE_DEVELOPMENT_POINTS[size] || 1000;

  // Enhanced platform and genre modifiers with more nuanced factors
  const platformModifiers = {
    PC: { baseModifier: 1.0, complexityFactor: 0.9, marketReach: 1.2 },
    Console: { baseModifier: 1.2, complexityFactor: 1.1, marketReach: 1.0 },
    Mobile: { baseModifier: 1.5, complexityFactor: 0.9, marketReach: 1.5 },
    Web: { baseModifier: 0.4, complexityFactor: 0.5, marketReach: 0.6 },
    VR: { baseModifier: 2.5, complexityFactor: 1.5, marketReach: 0.4 },

    // PlayStation Family
    PlayStation: { baseModifier: 1.3, complexityFactor: 1.2, marketReach: 1.0 },
    'PlayStation 2': { baseModifier: 1.1, complexityFactor: 1.0, marketReach: 1.2 },
    'PlayStation 3': { baseModifier: 1.4, complexityFactor: 1.3, marketReach: 0.9 },
    'PlayStation 4': { baseModifier: 1.2, complexityFactor: 1.1, marketReach: 1.3 },
    'PlayStation 5': { baseModifier: 1.5, complexityFactor: 1.4, marketReach: 1.1 },
    'PlayStation Portal': { baseModifier: 1.1, complexityFactor: 1.0, marketReach: 0.3 },

    // Xbox Family
    Xbox: { baseModifier: 1.3, complexityFactor: 1.2, marketReach: 1.0 },
    'Xbox 360': { baseModifier: 1.2, complexityFactor: 1.1, marketReach: 1.1 },
    'Xbox One': { baseModifier: 1.3, complexityFactor: 1.2, marketReach: 1.0 },
    'Xbox Series X/S': { baseModifier: 1.4, complexityFactor: 1.3, marketReach: 1.0 },

    // Nintendo Family
    'Nintendo Switch': { baseModifier: 1.4, complexityFactor: 1.3, marketReach: 0.9 },
    'Nintendo Switch OLED': { baseModifier: 1.4, complexityFactor: 1.3, marketReach: 1.0 },
    'Nintendo Switch Lite': { baseModifier: 1.2, complexityFactor: 1.1, marketReach: 0.7 },
    'Nintendo 64': { baseModifier: 1.1, complexityFactor: 1.0, marketReach: 0.8 },
    GameCube: { baseModifier: 1.2, complexityFactor: 1.1, marketReach: 0.7 },
    Wii: { baseModifier: 1.0, complexityFactor: 0.9, marketReach: 1.0 },
    'Wii U': { baseModifier: 1.3, complexityFactor: 1.2, marketReach: 0.6 },

    // PlayStation Portable Family
    'PlayStation Portable': { baseModifier: 1.1, complexityFactor: 1.0, marketReach: 0.7 },
    'PlayStation Vita': { baseModifier: 1.2, complexityFactor: 1.1, marketReach: 0.5 },

    // Nintendo Handheld Family
    'Nintendo DS': { baseModifier: 0.9, complexityFactor: 0.8, marketReach: 0.9 },
    'Nintendo 3DS': { baseModifier: 1.0, complexityFactor: 0.9, marketReach: 0.8 },
    'Game Boy': { baseModifier: 0.7, complexityFactor: 0.6, marketReach: 0.6 },
    'Game Boy Color': { baseModifier: 0.8, complexityFactor: 0.7, marketReach: 0.7 },
    'Game Boy Advance': { baseModifier: 0.9, complexityFactor: 0.8, marketReach: 0.8 },

    // Classic Nintendo Consoles
    'Nintendo Entertainment System': { baseModifier: 0.6, complexityFactor: 0.5, marketReach: 0.5 },
    'Super Nintendo': { baseModifier: 0.8, complexityFactor: 0.7, marketReach: 0.6 },

    // Sega Consoles
    'Sega Genesis': { baseModifier: 0.9, complexityFactor: 0.8, marketReach: 0.6 },
    'Sega Mega Drive': { baseModifier: 0.9, complexityFactor: 0.8, marketReach: 0.6 },
    'Sega Game Gear': { baseModifier: 0.8, complexityFactor: 0.7, marketReach: 0.4 },
    'Sega Master System': { baseModifier: 0.7, complexityFactor: 0.6, marketReach: 0.4 },
    'Sega Dreamcast': { baseModifier: 1.1, complexityFactor: 1.0, marketReach: 0.5 },
    'Sega Saturn': { baseModifier: 1.3, complexityFactor: 1.2, marketReach: 0.4 },

    // Classic Atari Platforms
    'Atari 2600': { baseModifier: 0.5, complexityFactor: 0.4, marketReach: 0.3 },
    'Atari 7800': { baseModifier: 0.6, complexityFactor: 0.5, marketReach: 0.3 },
    'Atari Jaguar': { baseModifier: 1.2, complexityFactor: 1.1, marketReach: 0.2 },
    'Atari Lynx': { baseModifier: 0.8, complexityFactor: 0.7, marketReach: 0.3 },

    // Other Classic Platforms
    'TurboGrafx-16': { baseModifier: 0.9, complexityFactor: 0.8, marketReach: 0.4 },
    'Neo Geo': { baseModifier: 1.1, complexityFactor: 1.0, marketReach: 0.3 },
    'Neo Geo Pocket': { baseModifier: 0.9, complexityFactor: 0.8, marketReach: 0.2 },
    WonderSwan: { baseModifier: 0.8, complexityFactor: 0.7, marketReach: 0.2 },
    Ouya: { baseModifier: 0.9, complexityFactor: 0.8, marketReach: 0.1 },

    // Modern Handheld PC
    'Steam Deck': { baseModifier: 1.1, complexityFactor: 1.0, marketReach: 0.4 },
    'ASUS ROG Ally': { baseModifier: 1.2, complexityFactor: 1.1, marketReach: 0.3 },
    'Lenovo Legion Go': { baseModifier: 1.2, complexityFactor: 1.1, marketReach: 0.2 },

    // Retro/Indie Gaming Platforms
    'Analogue Pocket': { baseModifier: 0.8, complexityFactor: 0.7, marketReach: 0.1 },
    Evercade: { baseModifier: 0.7, complexityFactor: 0.6, marketReach: 0.1 },
    Playdate: { baseModifier: 0.6, complexityFactor: 0.5, marketReach: 0.1 },

    // Mobile Platform Variants
    Android: { baseModifier: 0.8, complexityFactor: 0.7, marketReach: 1.8 },
    iOS: { baseModifier: 0.9, complexityFactor: 0.8, marketReach: 1.5 },

    // Web Platform Variants
    WebGL: { baseModifier: 0.7, complexityFactor: 0.6, marketReach: 0.8 },
    WebAssembly: { baseModifier: 1.0, complexityFactor: 0.9, marketReach: 0.7 },

    // VR Platform Variants
    'Meta Quest': { baseModifier: 1.8, complexityFactor: 1.6, marketReach: 0.5 },
    'PlayStation VR': { baseModifier: 1.6, complexityFactor: 1.4, marketReach: 0.4 },
    'PlayStation VR2': { baseModifier: 2.0, complexityFactor: 1.8, marketReach: 0.4 },
    'Valve Index': { baseModifier: 1.9, complexityFactor: 1.7, marketReach: 0.3 },
    'HTC Vive': { baseModifier: 1.8, complexityFactor: 1.6, marketReach: 0.3 },

    // AR Platform Variants
    'Microsoft HoloLens': { baseModifier: 2.5, complexityFactor: 2.2, marketReach: 0.2 },
    'Magic Leap': { baseModifier: 2.4, complexityFactor: 2.1, marketReach: 0.2 },
    'Google Glass': { baseModifier: 2.1, complexityFactor: 1.9, marketReach: 0.1 },
    'Augmented Reality': { baseModifier: 2.8, complexityFactor: 1.8, marketReach: 0.2 },

    // TV/Streaming Platforms
    'Smart TV': { baseModifier: 1.0, complexityFactor: 0.9, marketReach: 0.5 },
    'Apple TV': { baseModifier: 1.1, complexityFactor: 1.0, marketReach: 0.4 },
    'NVIDIA Shield': { baseModifier: 1.1, complexityFactor: 1.0, marketReach: 0.3 },
    'Amazon Fire TV': { baseModifier: 0.9, complexityFactor: 0.8, marketReach: 0.5 }
  };

  const genreModifiers = {
    Action: { complexity: 1.1, learningCurve: 0.9, innovationPotential: 1.2 },
    Adventure: { complexity: 1.0, learningCurve: 0.8, innovationPotential: 1.1 },
    RPG: { complexity: 1.3, learningCurve: 1.2, innovationPotential: 1.3 },
    Strategy: { complexity: 1.2, learningCurve: 1.1, innovationPotential: 1.0 },
    Simulation: { complexity: 1.1, learningCurve: 1.0, innovationPotential: 0.9 },
    Puzzle: { complexity: 0.9, learningCurve: 0.7, innovationPotential: 0.8 },
    Sports: { complexity: 1.0, learningCurve: 0.8, innovationPotential: 0.7 },
    Racing: { complexity: 1.0, learningCurve: 0.9, innovationPotential: 0.9 },
    Fighting: { complexity: 1.1, learningCurve: 1.0, innovationPotential: 1.0 },
    Shooter: { complexity: 1.2, learningCurve: 1.1, innovationPotential: 1.2 }
  };

  const skillWeights = {
    programming: 0.5,
    design: 0.3,
    art: 0.15,
    audio: 0.05
  };

  // Team composition diversity bonus
  const calculateTeamDiversityBonus = (teamComposition) => {
    const disciplines = Object.keys(teamComposition);
    const uniqueDisciplines = new Set(disciplines);
    return Math.min(1.2, 1.0 + (uniqueDisciplines.size * 0.05));
  };

  // Pre-compute these values to reduce redundant calculations
  const platformModifier = platformModifiers[platform]?.baseModifier || 1.0;
  const platformComplexity = platformModifiers[platform]?.complexityFactor || 1.0;
  const marketReachFactor = platformModifiers[platform]?.marketReach || 1.0;
  const genreModifier = genreModifiers[genre]?.complexity || 1.0;
  const learningCurveFactor = genreModifiers[genre]?.learningCurve || 1.0;
  const innovationFactor = genreModifiers[genre]?.innovationPotential || 1.0;

  // Optimize skill calculation with more granular approach
  const avgSkill = Object.entries(employeeSkills).length > 0
    ? Object.entries(employeeSkills).reduce((total, [role, skill]) => {
        const weight = skillWeights[role] || 0.1;
        return total + (skill * weight);
      }, 0) * 2
    : 50; // Default skill level

  const yearModifier = Math.max(0.8, 1.0 + (year - 2020) * 0.06);
  const skillModifier = 0.5 + (avgSkill / 100);
  const teamDiversityBonus = calculateTeamDiversityBonus(teamComposition);

  const result = Math.floor(
    basePoints *
    platformModifier *
    genreModifier *
    yearModifier *
    skillModifier *
    teamDiversityBonus *
    marketReachFactor *
    innovationFactor *
    (1 + (platformComplexity - 1) * learningCurveFactor)
  );

  // Cache the result for future identical calls
  developmentPointsCache.set(cacheKey, result);

  // Optional: Limit cache size to prevent memory growth
  if (developmentPointsCache.size > 500) {
    const oldestKey = developmentPointsCache.keys().next().value;
    developmentPointsCache.delete(oldestKey);
  }

  return result;
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
    VR: 0.6,

    // PlayStation Family
    PlayStation: 1.0,
    'PlayStation 2': 1.3,
    'PlayStation 3': 1.1,
    'PlayStation 4': 1.4,
    'PlayStation 5': 1.2,
    'PlayStation Portal': 0.4,

    // Xbox Family
    Xbox: 1.0,
    'Xbox 360': 1.2,
    'Xbox One': 1.1,
    'Xbox Series X/S': 1.3,

    // Nintendo Family
    'Nintendo Switch': 1.1,
    'Nintendo Switch OLED': 1.2,
    'Nintendo Switch Lite': 0.9,
    'Nintendo 64': 0.9,
    GameCube: 0.8,
    Wii: 1.2,
    'Wii U': 0.7,

    // PlayStation Portable Family
    'PlayStation Portable': 0.8,
    'PlayStation Vita': 0.6,

    // Nintendo Handheld Family
    'Nintendo DS': 1.0,
    'Nintendo 3DS': 0.9,
    'Game Boy': 0.7,
    'Game Boy Color': 0.8,
    'Game Boy Advance': 0.9,

    // Classic Nintendo Consoles
    'Nintendo Entertainment System': 0.6,
    'Super Nintendo': 0.7,

    // Sega Consoles
    'Sega Genesis': 0.8,
    'Sega Mega Drive': 0.8,
    'Sega Game Gear': 0.5,
    'Sega Master System': 0.4,
    'Sega Dreamcast': 0.5,
    'Sega Saturn': 0.4,

    // Classic Atari Platforms
    'Atari 2600': 0.3,
    'Atari 7800': 0.35,
    'Atari Jaguar': 0.3,
    'Atari Lynx': 0.35,

    // Other Classic Platforms
    'TurboGrafx-16': 0.4,
    'Neo Geo': 0.6,
    'Neo Geo Pocket': 0.3,
    WonderSwan: 0.25,
    Ouya: 0.2,

    // Modern Handheld PC
    'Steam Deck': 0.6,
    'ASUS ROG Ally': 0.55,
    'Lenovo Legion Go': 0.5,

    // Retro/Indie Gaming Platforms
    'Analogue Pocket': 0.2,
    Evercade: 0.15,
    Playdate: 0.1,

    // Mobile Platform Variants
    Android: 1.6,
    iOS: 1.3,

    // Web Platform Variants
    WebGL: 0.4,
    WebAssembly: 0.5,

    // VR Platform Variants
    'Meta Quest': 0.7,
    'PlayStation VR': 0.5,
    'PlayStation VR2': 0.6,
    'Valve Index': 0.6,
    'HTC Vive': 0.55,

    // AR Platform Variants
    'Microsoft HoloLens': 0.25,
    'Magic Leap': 0.2,
    'Google Glass': 0.15,
    'Augmented Reality': 0.3,

    // TV/Streaming Platforms
    'Smart TV': 0.4,
    'Apple TV': 0.45,
    'NVIDIA Shield': 0.5,
    'Amazon Fire TV': 0.4
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
const marketDemandCache = new Map();

export const calculateMarketDemand = (genre, platform, year, previousGameSuccess = {}) => {
  // Create a cache key from input parameters
  const cacheKey = `${genre}:${platform}:${year}:${JSON.stringify(previousGameSuccess)}`;

  // Check cache first
  if (marketDemandCache.has(cacheKey)) {
    return marketDemandCache.get(cacheKey);
  }

  // Memoize base demand data to prevent repeated object creation
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
    VR: { baseValue: 0.3, innovationFactor: 1.3 },

    // PlayStation Family
    PlayStation: { baseValue: 0.9, innovationFactor: 1.0 },
    'PlayStation 2': { baseValue: 1.2, innovationFactor: 1.1 },
    'PlayStation 3': { baseValue: 0.8, innovationFactor: 1.2 },
    'PlayStation 4': { baseValue: 1.3, innovationFactor: 1.1 },
    'PlayStation 5': { baseValue: 1.0, innovationFactor: 1.4 },

    // Xbox Family
    Xbox: { baseValue: 0.8, innovationFactor: 1.0 },
    'Xbox 360': { baseValue: 1.1, innovationFactor: 1.1 },
    'Xbox One': { baseValue: 0.9, innovationFactor: 1.2 },
    'Xbox Series X/S': { baseValue: 0.9, innovationFactor: 1.3 },

    // Nintendo Family
    'Nintendo Switch': { baseValue: 1.0, innovationFactor: 1.2 },
    'Nintendo 64': { baseValue: 0.7, innovationFactor: 1.0 },
    GameCube: { baseValue: 0.6, innovationFactor: 1.1 },
    Wii: { baseValue: 1.1, innovationFactor: 1.3 },
    'Wii U': { baseValue: 0.4, innovationFactor: 1.1 },

    // PlayStation Portable Family
    'PlayStation Portable': { baseValue: 0.7, innovationFactor: 1.0 },
    'PlayStation Vita': { baseValue: 0.4, innovationFactor: 1.1 },

    // Nintendo Handheld Family
    'Nintendo DS': { baseValue: 0.9, innovationFactor: 1.0 },
    'Nintendo 3DS': { baseValue: 0.6, innovationFactor: 1.1 },
    'Game Boy': { baseValue: 0.5, innovationFactor: 0.8 },
    'Game Boy Color': { baseValue: 0.6, innovationFactor: 0.9 },
    'Game Boy Advance': { baseValue: 0.7, innovationFactor: 1.0 },

    // Classic Nintendo Consoles
    'Nintendo Entertainment System': { baseValue: 0.4, innovationFactor: 0.7 },
    'Super Nintendo': { baseValue: 0.5, innovationFactor: 0.8 },

    // Sega Consoles
    'Sega Genesis': { baseValue: 0.6, innovationFactor: 0.9 },
    'Sega Dreamcast': { baseValue: 0.3, innovationFactor: 1.2 },
    'Sega Saturn': { baseValue: 0.2, innovationFactor: 1.0 },

    // Modern Handheld PC
    'Steam Deck': { baseValue: 0.3, innovationFactor: 1.3 },

    // Augmented Reality
    'Augmented Reality': { baseValue: 0.1, innovationFactor: 1.5 }
  };

  // Precompute and memoize the trend calculation for significant performance boost
  const calculateTrendModifier = (genre) => {
    const genreData = baseDemand[genre] || { volatility: 0.1, recentTrend: 1.0 };
    const successFactor = previousGameSuccess[genre] || 1.0;

    // Use a combination of sine wave and success factor with memoization
    const cyclicalTrend = 1.0 + Math.sin((year - 2020) * 0.5) * genreData.volatility;
    return cyclicalTrend * (1 + (successFactor - 1) * 0.2);
  };

  // Compute these values only once
  const genreBaseValue = baseDemand[genre]?.baseValue || 1.0;
  const platformBaseValue = platformDemand[platform]?.baseValue || 1.0;
  const trendModifier = calculateTrendModifier(genre);
  const innovationFactor = platformDemand[platform]?.innovationFactor || 1.0;

  const result = Math.max(0.3, Math.min(2.0,
    genreBaseValue *
    platformBaseValue *
    trendModifier *
    innovationFactor
  ));

  // Cache the result for future identical calls
  marketDemandCache.set(cacheKey, result);

  // Optional: Limit cache size to prevent memory growth
  if (marketDemandCache.size > 500) {
    const oldestKey = marketDemandCache.keys().next().value;
    marketDemandCache.delete(oldestKey);
  }

  return result;
};