import { PLATFORMS, GENRES, GAME_MECHANICS } from './gameConstants';

export const defaultPlatforms = [
  {
    id: 1,
    name: PLATFORMS.PC,
    cost: 0,
    marketShare: 0.3,
    developmentDifficulty: 1.0,
    unlocked: true
  },
  {
    id: 2,
    name: PLATFORMS.MOBILE,
    cost: 50000,
    marketShare: 0.4,
    developmentDifficulty: 0.8,
    unlocked: false
  },
  {
    id: 3,
    name: PLATFORMS.CONSOLE,
    cost: 100000,
    marketShare: 0.1,
    developmentDifficulty: 1.2,
    unlocked: false
  },
  {
    id: 4,
    name: PLATFORMS.WEB,
    cost: 25000,
    marketShare: 0.05,
    developmentDifficulty: 0.6,
    unlocked: false
  },
  {
    id: 5,
    name: PLATFORMS.VR,
    cost: 200000,
    marketShare: 0.02,
    developmentDifficulty: 2.0,
    unlocked: false
  },
  // PlayStation Family
  {
    id: 6,
    name: PLATFORMS.PLAYSTATION,
    cost: 150000,
    marketShare: 0.15,
    developmentDifficulty: 1.3,
    unlocked: false
  },
  {
    id: 9,
    name: PLATFORMS.PLAYSTATION_2,
    cost: 120000,
    marketShare: 0.18,
    developmentDifficulty: 1.1,
    unlocked: false
  },
  {
    id: 10,
    name: PLATFORMS.PLAYSTATION_3,
    cost: 180000,
    marketShare: 0.12,
    developmentDifficulty: 1.4,
    unlocked: false
  },
  {
    id: 11,
    name: PLATFORMS.PLAYSTATION_4,
    cost: 220000,
    marketShare: 0.20,
    developmentDifficulty: 1.2,
    unlocked: false
  },
  {
    id: 12,
    name: PLATFORMS.PLAYSTATION_5,
    cost: 300000,
    marketShare: 0.15,
    developmentDifficulty: 1.5,
    unlocked: false
  },
  // Xbox Family
  {
    id: 7,
    name: PLATFORMS.XBOX,
    cost: 150000,
    marketShare: 0.15,
    developmentDifficulty: 1.3,
    unlocked: false
  },
  {
    id: 13,
    name: PLATFORMS.XBOX_360,
    cost: 160000,
    marketShare: 0.17,
    developmentDifficulty: 1.2,
    unlocked: false
  },
  {
    id: 14,
    name: PLATFORMS.XBOX_ONE,
    cost: 200000,
    marketShare: 0.14,
    developmentDifficulty: 1.3,
    unlocked: false
  },
  {
    id: 15,
    name: PLATFORMS.XBOX_SERIES,
    cost: 280000,
    marketShare: 0.12,
    developmentDifficulty: 1.4,
    unlocked: false
  },
  // Nintendo Family
  {
    id: 8,
    name: PLATFORMS.NINTENDO,
    cost: 125000,
    marketShare: 0.1,
    developmentDifficulty: 1.4,
    unlocked: false
  },
  {
    id: 16,
    name: PLATFORMS.NINTENDO_64,
    cost: 90000,
    marketShare: 0.08,
    developmentDifficulty: 1.1,
    unlocked: false
  },
  {
    id: 17,
    name: PLATFORMS.GAME_CUBE,
    cost: 110000,
    marketShare: 0.06,
    developmentDifficulty: 1.2,
    unlocked: false
  },
  {
    id: 18,
    name: PLATFORMS.WII,
    cost: 140000,
    marketShare: 0.12,
    developmentDifficulty: 1.0,
    unlocked: false
  },
  {
    id: 19,
    name: PLATFORMS.WII_U,
    cost: 100000,
    marketShare: 0.04,
    developmentDifficulty: 1.3,
    unlocked: false
  },
  // PlayStation Portable Family
  {
    id: 20,
    name: PLATFORMS.PSP,
    cost: 80000,
    marketShare: 0.07,
    developmentDifficulty: 1.1,
    unlocked: false
  },
  {
    id: 21,
    name: PLATFORMS.PS_VITA,
    cost: 95000,
    marketShare: 0.03,
    developmentDifficulty: 1.2,
    unlocked: false
  },
  // Nintendo Handheld Family
  {
    id: 22,
    name: PLATFORMS.NINTENDO_DS,
    cost: 70000,
    marketShare: 0.09,
    developmentDifficulty: 0.9,
    unlocked: false
  },
  {
    id: 23,
    name: PLATFORMS.NINTENDO_3DS,
    cost: 85000,
    marketShare: 0.06,
    developmentDifficulty: 1.0,
    unlocked: false
  },
  {
    id: 24,
    name: PLATFORMS.GAME_BOY,
    cost: 40000,
    marketShare: 0.05,
    developmentDifficulty: 0.7,
    unlocked: false
  },
  {
    id: 25,
    name: PLATFORMS.GAME_BOY_COLOR,
    cost: 45000,
    marketShare: 0.06,
    developmentDifficulty: 0.8,
    unlocked: false
  },
  {
    id: 26,
    name: PLATFORMS.GAME_BOY_ADVANCE,
    cost: 60000,
    marketShare: 0.07,
    developmentDifficulty: 0.9,
    unlocked: false
  },
  // Classic Nintendo Consoles
  {
    id: 27,
    name: PLATFORMS.NES,
    cost: 35000,
    marketShare: 0.04,
    developmentDifficulty: 0.6,
    unlocked: false
  },
  {
    id: 28,
    name: PLATFORMS.SNES,
    cost: 50000,
    marketShare: 0.05,
    developmentDifficulty: 0.8,
    unlocked: false
  },
  // Sega Consoles
  {
    id: 29,
    name: PLATFORMS.GENESIS,
    cost: 55000,
    marketShare: 0.06,
    developmentDifficulty: 0.9,
    unlocked: false
  },
  {
    id: 30,
    name: PLATFORMS.DREAMCAST,
    cost: 75000,
    marketShare: 0.03,
    developmentDifficulty: 1.1,
    unlocked: false
  },
  {
    id: 31,
    name: PLATFORMS.SATURN,
    cost: 65000,
    marketShare: 0.02,
    developmentDifficulty: 1.3,
    unlocked: false
  },
  // Modern Handheld PC
  {
    id: 32,
    name: PLATFORMS.STEAM_DECK,
    cost: 180000,
    marketShare: 0.02,
    developmentDifficulty: 1.1,
    unlocked: false
  },
  // Augmented Reality
  {
    id: 33,
    name: PLATFORMS.AR,
    cost: 250000,
    marketShare: 0.01,
    developmentDifficulty: 2.2,
    unlocked: false
  }
];

export const defaultGenres = Object.values(GENRES).map((genre, index) => ({
  id: index + 1,
  name: genre,
  popularity: Math.random() * 0.5 + 0.75, // Random popularity between 0.75-1.25
  unlocked: index < 3 // First 3 genres unlocked by default
}));

export const defaultGameState = {
  // Financial
  money: 10000,
  reputation: 50,

  // Time
  currentDate: {
    year: 2024,
    month: 1,
    day: 1
  },

  // Game elements
  platforms: defaultPlatforms,
  genres: defaultGenres,
  employees: [],
  projects: [],
  completedProjects: [],
  achievements: [],
  technologies: [],

  // Studio stats
  studioLevel: 1,
  morale: GAME_MECHANICS.BASE_MORALE,
  culture: {
    values: [],
    bonuses: {
      employeeProductivity: 1.0,
      qualityBonus: 1.0,
      marketingEfficiency: 1.0,
      developmentSpeed: 1.0,
      innovationBonus: 1.0,
      employeeRetention: 1.0
    }
  },

  // Game settings
  gameSpeed: 1, // 1x speed
  autoPause: false,

  // Notifications
  notifications: [],

  // Statistics
  stats: {
    totalProjectsCompleted: 0,
    totalRevenue: 0,
    totalEmployeesHired: 0,
    bestSellingGame: null,
    highestRatedGame: null
  }
};

export const achievements = [
  {
    id: 'first_game',
    title: 'First Steps',
    description: 'Complete your first game',
    reward: 5000,
    unlocked: false,
    condition: (state) => state.completedProjects.length >= 1
  },
  {
    id: 'profitable',
    title: 'In the Black',
    description: 'Reach $100,000 in funds',
    reward: 10000,
    unlocked: false,
    condition: (state) => state.money >= 100000
  },
  {
    id: 'team_player',
    title: 'Team Player',
    description: 'Hire 10 employees',
    reward: 15000,
    unlocked: false,
    condition: (state) => state.employees.length >= 10
  },
  {
    id: 'aaa_developer',
    title: 'AAA Developer',
    description: 'Complete a AAA game',
    reward: 50000,
    unlocked: false,
    condition: (state) => state.completedProjects.some(p => p.size === 3)
  },
  {
    id: 'millionaire',
    title: 'Millionaire',
    description: 'Reach $1,000,000 in funds',
    reward: 100000,
    unlocked: false,
    condition: (state) => state.money >= 1000000
  }
];