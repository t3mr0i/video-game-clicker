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
    id: 6,
    name: PLATFORMS.PLAYSTATION,
    cost: 150000,
    marketShare: 0.15,
    developmentDifficulty: 1.3,
    unlocked: false
  },
  {
    id: 7,
    name: PLATFORMS.XBOX,
    cost: 150000,
    marketShare: 0.15,
    developmentDifficulty: 1.3,
    unlocked: false
  },
  {
    id: 8,
    name: PLATFORMS.NINTENDO,
    cost: 125000,
    marketShare: 0.1,
    developmentDifficulty: 1.4,
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