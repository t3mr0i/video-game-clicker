// Game Development Studio Constants

export const GAME_SIZES = {
  A: 1,
  AA: 2,
  AAA: 3
};

export const EMPLOYEE_TYPES = {
  DEVELOPER: 'Developer',
  DESIGNER: 'Designer',
  MARKETER: 'Marketer',
  ARTIST: 'Artist',
  SOUND_DESIGNER: 'Sound Designer',
  PRODUCER: 'Producer'
};

export const EMPLOYEE_PERSONALITIES = {
  DEVELOPER: ['Perfectionist', 'Innovative', 'Team Player', 'Independent'],
  DESIGNER: ['Creative', 'Detail-oriented', 'User-focused', 'Visionary'],
  MARKETER: ['Persuasive', 'Analytical', 'Trend-aware', 'Social'],
  ARTIST: ['Imaginative', 'Technical', 'Passionate', 'Collaborative'],
  SOUND_DESIGNER: ['Musical', 'Technical', 'Atmospheric', 'Precise'],
  PRODUCER: ['Organized', 'Diplomatic', 'Strategic', 'Results-driven']
};

export const PROJECT_PHASES = {
  CONCEPT: 'Concept',
  PRE_PRODUCTION: 'Pre-production',
  PRODUCTION: 'Production',
  ALPHA: 'Alpha',
  BETA: 'Beta',
  RELEASE: 'Release'
};

export const PHASE_COLORS = {
  [PROJECT_PHASES.CONCEPT]: 'gray',
  [PROJECT_PHASES.PRE_PRODUCTION]: 'yellow',
  [PROJECT_PHASES.PRODUCTION]: 'blue',
  [PROJECT_PHASES.ALPHA]: 'purple',
  [PROJECT_PHASES.BETA]: 'green',
  [PROJECT_PHASES.RELEASE]: 'emerald'
};

export const PLATFORMS = {
  PC: 'PC',
  CONSOLE: 'Console',
  PLAYSTATION: 'PlayStation',
  XBOX: 'Xbox',
  NINTENDO: 'Nintendo Switch',
  MOBILE: 'Mobile',
  WEB: 'Web',
  VR: 'VR'
};

export const GENRES = {
  ACTION: 'Action',
  ADVENTURE: 'Adventure',
  RPG: 'RPG',
  STRATEGY: 'Strategy',
  SIMULATION: 'Simulation',
  PUZZLE: 'Puzzle',
  SPORTS: 'Sports',
  RACING: 'Racing',
  FIGHTING: 'Fighting',
  SHOOTER: 'Shooter'
};

export const GAME_MECHANICS = {
  // Base costs and multipliers
  BASE_EMPLOYEE_COST: 50000,
  EMPLOYEE_COST_MULTIPLIER: 1.2,

  BASE_PROJECT_COST: 10000,
  PROJECT_COST_MULTIPLIER: 1.15,

  BASE_RESEARCH_COST: 25000,
  RESEARCH_COST_MULTIPLIER: 1.3,

  // Time constants (in game days)
  DAYS_PER_MONTH: 30,
  MONTHS_PER_YEAR: 12,
  GAME_DAYS_PER_REAL_SECOND: 1 / 60, // 1 game day = 1 minute real time at 1x speed

  // Studio level requirements
  STUDIO_LEVEL_REQUIREMENTS: {
    2: { minProjects: 1, minRevenue: 100000 },
    3: { minProjects: 3, minRevenue: 500000 },
    4: { minProjects: 5, minRevenue: 1000000 }
  },

  // Franchise/sequel multipliers
  SEQUEL_COMPLEXITY_MULTIPLIER: 1.2,
  SEQUEL_MAX_POINTS_MULTIPLIER: 1.2,

  // Technology IDs
  TECHNOLOGY_IDS: {
    GAME_ENGINE_FRAMEWORK: 'tech-3'
  },

  // Skill ranges
  MIN_SKILL_LEVEL: 1,
  MAX_SKILL_LEVEL: 100,

  // Project development points
  BASE_DEVELOPMENT_POINTS: {
    [GAME_SIZES.A]: 1000,
    [GAME_SIZES.AA]: 5000,
    [GAME_SIZES.AAA]: 20000
  },

  // Morale effects
  MIN_MORALE: 0,
  MAX_MORALE: 100,
  BASE_MORALE: 50
};

export const ACHIEVEMENT_TYPES = {
  FINANCIAL: 'Financial',
  PROJECT: 'Project',
  EMPLOYEE: 'Employee',
  MILESTONE: 'Milestone'
};

export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error'
};

export const UI_COLORS = {
  PRIMARY: 'blue',
  SECONDARY: 'gray',
  SUCCESS: 'green',
  WARNING: 'yellow',
  DANGER: 'red',
  INFO: 'blue'
};