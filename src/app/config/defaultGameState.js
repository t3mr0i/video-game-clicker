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
  },
  // Additional PlayStation Platforms
  {
    id: 34,
    name: PLATFORMS.PLAYSTATION_PORTAL,
    cost: 160000,
    marketShare: 0.02,
    developmentDifficulty: 1.1,
    unlocked: false
  },
  // Additional Nintendo Switch Variants
  {
    id: 35,
    name: PLATFORMS.NINTENDO_OLED,
    cost: 140000,
    marketShare: 0.08,
    developmentDifficulty: 1.4,
    unlocked: false
  },
  {
    id: 36,
    name: PLATFORMS.NINTENDO_LITE,
    cost: 110000,
    marketShare: 0.05,
    developmentDifficulty: 1.2,
    unlocked: false
  },
  // Additional Sega Platforms
  {
    id: 37,
    name: PLATFORMS.MEGA_DRIVE,
    cost: 55000,
    marketShare: 0.06,
    developmentDifficulty: 0.9,
    unlocked: false
  },
  {
    id: 38,
    name: PLATFORMS.GAME_GEAR,
    cost: 45000,
    marketShare: 0.03,
    developmentDifficulty: 0.8,
    unlocked: false
  },
  {
    id: 39,
    name: PLATFORMS.MASTER_SYSTEM,
    cost: 35000,
    marketShare: 0.04,
    developmentDifficulty: 0.7,
    unlocked: false
  },
  // Classic Atari Platforms
  {
    id: 40,
    name: PLATFORMS.ATARI_2600,
    cost: 25000,
    marketShare: 0.03,
    developmentDifficulty: 0.5,
    unlocked: false
  },
  {
    id: 41,
    name: PLATFORMS.ATARI_7800,
    cost: 30000,
    marketShare: 0.02,
    developmentDifficulty: 0.6,
    unlocked: false
  },
  {
    id: 42,
    name: PLATFORMS.ATARI_JAGUAR,
    cost: 60000,
    marketShare: 0.01,
    developmentDifficulty: 1.2,
    unlocked: false
  },
  {
    id: 43,
    name: PLATFORMS.LYNX,
    cost: 40000,
    marketShare: 0.02,
    developmentDifficulty: 0.8,
    unlocked: false
  },
  // Other Classic Platforms
  {
    id: 44,
    name: PLATFORMS.TURBOGRAFX_16,
    cost: 50000,
    marketShare: 0.03,
    developmentDifficulty: 0.9,
    unlocked: false
  },
  {
    id: 45,
    name: PLATFORMS.NEO_GEO,
    cost: 85000,
    marketShare: 0.02,
    developmentDifficulty: 1.1,
    unlocked: false
  },
  {
    id: 46,
    name: PLATFORMS.NEO_GEO_POCKET,
    cost: 55000,
    marketShare: 0.01,
    developmentDifficulty: 0.9,
    unlocked: false
  },
  {
    id: 47,
    name: PLATFORMS.WONDERSWAN,
    cost: 45000,
    marketShare: 0.01,
    developmentDifficulty: 0.8,
    unlocked: false
  },
  // Modern Handheld PC Gaming
  {
    id: 48,
    name: PLATFORMS.ASUS_ROG_ALLY,
    cost: 190000,
    marketShare: 0.015,
    developmentDifficulty: 1.2,
    unlocked: false
  },
  {
    id: 49,
    name: PLATFORMS.LEGION_GO,
    cost: 185000,
    marketShare: 0.01,
    developmentDifficulty: 1.2,
    unlocked: false
  },
  // Retro/Indie Gaming Platforms
  {
    id: 50,
    name: PLATFORMS.ANALOGUE_POCKET,
    cost: 70000,
    marketShare: 0.005,
    developmentDifficulty: 0.8,
    unlocked: false
  },
  {
    id: 51,
    name: PLATFORMS.EVERCADE,
    cost: 35000,
    marketShare: 0.003,
    developmentDifficulty: 0.7,
    unlocked: false
  },
  {
    id: 52,
    name: PLATFORMS.PLAYDATE,
    cost: 40000,
    marketShare: 0.002,
    developmentDifficulty: 0.6,
    unlocked: false
  },
  {
    id: 53,
    name: PLATFORMS.OUYA,
    cost: 45000,
    marketShare: 0.001,
    developmentDifficulty: 0.9,
    unlocked: false
  },
  // Mobile Platform Variants
  {
    id: 54,
    name: PLATFORMS.ANDROID,
    cost: 45000,
    marketShare: 0.25,
    developmentDifficulty: 0.8,
    unlocked: false
  },
  {
    id: 55,
    name: PLATFORMS.IOS,
    cost: 55000,
    marketShare: 0.15,
    developmentDifficulty: 0.9,
    unlocked: false
  },
  // Web Platform Variants
  {
    id: 56,
    name: PLATFORMS.WEBGL,
    cost: 35000,
    marketShare: 0.08,
    developmentDifficulty: 0.7,
    unlocked: false
  },
  {
    id: 57,
    name: PLATFORMS.WEBASSEMBLY,
    cost: 45000,
    marketShare: 0.04,
    developmentDifficulty: 1.0,
    unlocked: false
  },
  // VR Platform Variants
  {
    id: 58,
    name: PLATFORMS.OCULUS_QUEST,
    cost: 180000,
    marketShare: 0.015,
    developmentDifficulty: 1.8,
    unlocked: false
  },
  {
    id: 59,
    name: PLATFORMS.PSVR,
    cost: 160000,
    marketShare: 0.008,
    developmentDifficulty: 1.6,
    unlocked: false
  },
  {
    id: 60,
    name: PLATFORMS.PSVR2,
    cost: 220000,
    marketShare: 0.006,
    developmentDifficulty: 2.0,
    unlocked: false
  },
  {
    id: 61,
    name: PLATFORMS.VALVE_INDEX,
    cost: 200000,
    marketShare: 0.005,
    developmentDifficulty: 1.9,
    unlocked: false
  },
  {
    id: 62,
    name: PLATFORMS.HTC_VIVE,
    cost: 190000,
    marketShare: 0.007,
    developmentDifficulty: 1.8,
    unlocked: false
  },
  // AR Platform Variants
  {
    id: 63,
    name: PLATFORMS.HOLOLENS,
    cost: 300000,
    marketShare: 0.003,
    developmentDifficulty: 2.5,
    unlocked: false
  },
  {
    id: 64,
    name: PLATFORMS.MAGIC_LEAP,
    cost: 280000,
    marketShare: 0.002,
    developmentDifficulty: 2.4,
    unlocked: false
  },
  {
    id: 65,
    name: PLATFORMS.GOOGLE_GLASS,
    cost: 200000,
    marketShare: 0.001,
    developmentDifficulty: 2.1,
    unlocked: false
  },
  // TV/Streaming Platforms
  {
    id: 66,
    name: PLATFORMS.SMART_TV,
    cost: 75000,
    marketShare: 0.03,
    developmentDifficulty: 1.0,
    unlocked: false
  },
  {
    id: 67,
    name: PLATFORMS.APPLE_TV,
    cost: 85000,
    marketShare: 0.02,
    developmentDifficulty: 1.1,
    unlocked: false
  },
  {
    id: 68,
    name: PLATFORMS.NVIDIA_SHIELD,
    cost: 90000,
    marketShare: 0.015,
    developmentDifficulty: 1.1,
    unlocked: false
  },
  {
    id: 69,
    name: PLATFORMS.AMAZON_FIRE_TV,
    cost: 70000,
    marketShare: 0.025,
    developmentDifficulty: 0.9,
    unlocked: false
  },
  // Retro Consoles
  {
    id: 70,
    name: PLATFORMS.COLECOVISION,
    cost: 25000,
    marketShare: 0.02,
    developmentDifficulty: 0.6,
    unlocked: false
  },
  {
    id: 71,
    name: PLATFORMS.INTELLIVISION,
    cost: 20000,
    marketShare: 0.015,
    developmentDifficulty: 0.5,
    unlocked: false
  },
  {
    id: 72,
    name: PLATFORMS.VECTREX,
    cost: 30000,
    marketShare: 0.005,
    developmentDifficulty: 0.7,
    unlocked: false
  },
  {
    id: 73,
    name: PLATFORMS.CHANNEL_F,
    cost: 15000,
    marketShare: 0.008,
    developmentDifficulty: 0.4,
    unlocked: false
  },
  {
    id: 74,
    name: PLATFORMS.ODYSSEY,
    cost: 12000,
    marketShare: 0.01,
    developmentDifficulty: 0.3,
    unlocked: false
  },
  {
    id: 75,
    name: PLATFORMS.ODYSSEY_2,
    cost: 18000,
    marketShare: 0.01,
    developmentDifficulty: 0.4,
    unlocked: false
  },
  // Modern Handheld Consoles
  {
    id: 76,
    name: PLATFORMS.ANBERNIC_RG35XX,
    cost: 50000,
    marketShare: 0.003,
    developmentDifficulty: 0.6,
    unlocked: false
  },
  {
    id: 77,
    name: PLATFORMS.MIYOO_MINI,
    cost: 40000,
    marketShare: 0.002,
    developmentDifficulty: 0.5,
    unlocked: false
  },
  {
    id: 78,
    name: PLATFORMS.RETROID_POCKET,
    cost: 60000,
    marketShare: 0.004,
    developmentDifficulty: 0.7,
    unlocked: false
  },
  {
    id: 79,
    name: PLATFORMS.GPD_WIN,
    cost: 150000,
    marketShare: 0.008,
    developmentDifficulty: 1.1,
    unlocked: false
  },
  {
    id: 80,
    name: PLATFORMS.AYANEO_AIR,
    cost: 170000,
    marketShare: 0.006,
    developmentDifficulty: 1.2,
    unlocked: false
  },
  // Mini Consoles
  {
    id: 81,
    name: PLATFORMS.NES_CLASSIC,
    cost: 45000,
    marketShare: 0.015,
    developmentDifficulty: 0.6,
    unlocked: false
  },
  {
    id: 82,
    name: PLATFORMS.SNES_CLASSIC,
    cost: 55000,
    marketShare: 0.018,
    developmentDifficulty: 0.7,
    unlocked: false
  },
  {
    id: 83,
    name: PLATFORMS.PLAYSTATION_CLASSIC,
    cost: 65000,
    marketShare: 0.012,
    developmentDifficulty: 0.8,
    unlocked: false
  },
  {
    id: 84,
    name: PLATFORMS.GENESIS_MINI,
    cost: 50000,
    marketShare: 0.01,
    developmentDifficulty: 0.7,
    unlocked: false
  },
  {
    id: 85,
    name: PLATFORMS.NEO_GEO_MINI,
    cost: 75000,
    marketShare: 0.005,
    developmentDifficulty: 0.8,
    unlocked: false
  },
  // Arcade Systems
  {
    id: 86,
    name: PLATFORMS.NEOGEO_MVS,
    cost: 120000,
    marketShare: 0.008,
    developmentDifficulty: 1.1,
    unlocked: false
  },
  {
    id: 87,
    name: PLATFORMS.NEOGEO_AES,
    cost: 110000,
    marketShare: 0.005,
    developmentDifficulty: 1.0,
    unlocked: false
  },
  {
    id: 88,
    name: PLATFORMS.CPS1,
    cost: 90000,
    marketShare: 0.006,
    developmentDifficulty: 0.9,
    unlocked: false
  },
  {
    id: 89,
    name: PLATFORMS.CPS2,
    cost: 100000,
    marketShare: 0.007,
    developmentDifficulty: 1.0,
    unlocked: false
  },
  {
    id: 90,
    name: PLATFORMS.NAOMI,
    cost: 130000,
    marketShare: 0.004,
    developmentDifficulty: 1.2,
    unlocked: false
  },
  // Computer Platforms
  {
    id: 91,
    name: PLATFORMS.COMMODORE_64,
    cost: 35000,
    marketShare: 0.012,
    developmentDifficulty: 0.6,
    unlocked: false
  },
  {
    id: 92,
    name: PLATFORMS.AMIGA,
    cost: 45000,
    marketShare: 0.008,
    developmentDifficulty: 0.7,
    unlocked: false
  },
  {
    id: 93,
    name: PLATFORMS.ZX_SPECTRUM,
    cost: 25000,
    marketShare: 0.01,
    developmentDifficulty: 0.5,
    unlocked: false
  },
  {
    id: 94,
    name: PLATFORMS.MSX,
    cost: 30000,
    marketShare: 0.006,
    developmentDifficulty: 0.6,
    unlocked: false
  },
  {
    id: 95,
    name: PLATFORMS.APPLE_II,
    cost: 40000,
    marketShare: 0.008,
    developmentDifficulty: 0.6,
    unlocked: false
  },
  // Cloud Gaming
  {
    id: 96,
    name: PLATFORMS.STADIA,
    cost: 180000,
    marketShare: 0.003,
    developmentDifficulty: 1.4,
    unlocked: false
  },
  {
    id: 97,
    name: PLATFORMS.GEFORCE_NOW,
    cost: 150000,
    marketShare: 0.01,
    developmentDifficulty: 1.2,
    unlocked: false
  },
  {
    id: 98,
    name: PLATFORMS.XBOX_CLOUD,
    cost: 160000,
    marketShare: 0.012,
    developmentDifficulty: 1.3,
    unlocked: false
  },
  {
    id: 99,
    name: PLATFORMS.AMAZON_LUNA,
    cost: 140000,
    marketShare: 0.005,
    developmentDifficulty: 1.1,
    unlocked: false
  },
  // Alternative Consoles
  {
    id: 100,
    name: PLATFORMS.ATARI_VCS,
    cost: 80000,
    marketShare: 0.002,
    developmentDifficulty: 0.8,
    unlocked: false
  },
  {
    id: 101,
    name: PLATFORMS.KFC_CONSOLE,
    cost: 95000,
    marketShare: 0.001,
    developmentDifficulty: 0.9,
    unlocked: false
  },
  {
    id: 102,
    name: PLATFORMS.POLYMEGA,
    cost: 110000,
    marketShare: 0.003,
    developmentDifficulty: 1.0,
    unlocked: false
  },
  // Educational/Kids Consoles
  {
    id: 103,
    name: PLATFORMS.LEAPFROG_LEAPSTER,
    cost: 35000,
    marketShare: 0.008,
    developmentDifficulty: 0.4,
    unlocked: false
  },
  {
    id: 104,
    name: PLATFORMS.VTECH_VSMILE,
    cost: 30000,
    marketShare: 0.006,
    developmentDifficulty: 0.3,
    unlocked: false
  },
  // Future/Concept Consoles
  {
    id: 105,
    name: PLATFORMS.TESLA_ARCADE,
    cost: 200000,
    marketShare: 0.005,
    developmentDifficulty: 1.5,
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

  // Stocks and Investment Portfolio
  stocks: [
    // Gaming Companies
    {
      id: 'stock_ea',
      symbol: 'EA',
      name: 'Electronic Arts',
      currentPrice: 125.40,
      historicalPrices: [125.40],
      volatility: 0.03,
      trend: 1.0,
      sector: 'gaming',
      dividendYield: 0.015, // 1.5% annual dividend yield
      lastDividendDate: null,
      marketCap: 35.2, // billions
      peRatio: 18.5,
      description: 'Leading sports and entertainment gaming company'
    },
    {
      id: 'stock_activision',
      symbol: 'ATVI',
      name: 'Activision Blizzard',
      currentPrice: 78.90,
      historicalPrices: [78.90],
      volatility: 0.04,
      trend: 1.0,
      sector: 'gaming',
      dividendYield: 0.021, // 2.1% annual dividend yield
      lastDividendDate: null,
      marketCap: 62.1,
      peRatio: 25.3,
      description: 'Major publisher of Call of Duty and World of Warcraft'
    },
    {
      id: 'stock_take_two',
      symbol: 'TTWO',
      name: 'Take-Two Interactive',
      currentPrice: 142.65,
      historicalPrices: [142.65],
      volatility: 0.05,
      trend: 1.0,
      sector: 'gaming'
    },
    {
      id: 'stock_ubisoft',
      symbol: 'UBI',
      name: 'Ubisoft Entertainment',
      currentPrice: 32.15,
      historicalPrices: [32.15],
      volatility: 0.07,
      trend: 1.0,
      sector: 'gaming'
    },
    {
      id: 'stock_nintendo',
      symbol: 'NTDOY',
      name: 'Nintendo Co Ltd',
      currentPrice: 58.75,
      historicalPrices: [58.75],
      volatility: 0.04,
      trend: 1.0,
      sector: 'gaming'
    },
    {
      id: 'stock_sony',
      symbol: 'SNE',
      name: 'Sony Group Corporation',
      currentPrice: 89.45,
      historicalPrices: [89.45],
      volatility: 0.03,
      trend: 1.0,
      sector: 'gaming'
    },
    {
      id: 'stock_epic',
      symbol: 'EPIC',
      name: 'Epic Games (Private)',
      currentPrice: 165.00,
      historicalPrices: [165.00],
      volatility: 0.08,
      trend: 1.0,
      sector: 'gaming'
    },
    {
      id: 'stock_valve',
      symbol: 'VALVE',
      name: 'Valve Corporation',
      currentPrice: 210.80,
      historicalPrices: [210.80],
      volatility: 0.06,
      trend: 1.0,
      sector: 'gaming'
    },
    // Technology Companies
    {
      id: 'stock_unity',
      symbol: 'U',
      name: 'Unity Software',
      currentPrice: 28.60,
      historicalPrices: [28.60],
      volatility: 0.08,
      trend: 1.0,
      sector: 'tech'
    },
    {
      id: 'stock_nvidia',
      symbol: 'NVDA',
      name: 'NVIDIA Corporation',
      currentPrice: 520.35,
      historicalPrices: [520.35],
      volatility: 0.06,
      trend: 1.0,
      sector: 'tech'
    },
    {
      id: 'stock_microsoft',
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      currentPrice: 415.20,
      historicalPrices: [415.20],
      volatility: 0.02,
      trend: 1.0,
      sector: 'tech',
      dividendYield: 0.024, // 2.4% annual dividend yield
      lastDividendDate: null,
      marketCap: 3100.0,
      peRatio: 32.8,
      description: 'Technology giant with Xbox gaming division and cloud services'
    },
    {
      id: 'stock_apple',
      symbol: 'AAPL',
      name: 'Apple Inc',
      currentPrice: 195.75,
      historicalPrices: [195.75],
      volatility: 0.03,
      trend: 1.0,
      sector: 'tech'
    },
    {
      id: 'stock_google',
      symbol: 'GOOGL',
      name: 'Alphabet Inc',
      currentPrice: 138.90,
      historicalPrices: [138.90],
      volatility: 0.04,
      trend: 1.0,
      sector: 'tech'
    },
    {
      id: 'stock_amazon',
      symbol: 'AMZN',
      name: 'Amazon.com Inc',
      currentPrice: 155.25,
      historicalPrices: [155.25],
      volatility: 0.04,
      trend: 1.0,
      sector: 'tech'
    },
    {
      id: 'stock_meta',
      symbol: 'META',
      name: 'Meta Platforms Inc',
      currentPrice: 485.60,
      historicalPrices: [485.60],
      volatility: 0.05,
      trend: 1.0,
      sector: 'tech'
    },
    // Emerging Tech / Gaming Hardware
    {
      id: 'stock_amd',
      symbol: 'AMD',
      name: 'Advanced Micro Devices',
      currentPrice: 125.80,
      historicalPrices: [125.80],
      volatility: 0.07,
      trend: 1.0,
      sector: 'hardware'
    },
    {
      id: 'stock_intel',
      symbol: 'INTC',
      name: 'Intel Corporation',
      currentPrice: 42.15,
      historicalPrices: [42.15],
      volatility: 0.05,
      trend: 1.0,
      sector: 'hardware'
    },
    {
      id: 'stock_qualcomm',
      symbol: 'QCOM',
      name: 'QUALCOMM Inc',
      currentPrice: 165.90,
      historicalPrices: [165.90],
      volatility: 0.04,
      trend: 1.0,
      sector: 'hardware'
    },
    // Entertainment & Media
    {
      id: 'stock_disney',
      symbol: 'DIS',
      name: 'Walt Disney Company',
      currentPrice: 98.35,
      historicalPrices: [98.35],
      volatility: 0.04,
      trend: 1.0,
      sector: 'media'
    },
    {
      id: 'stock_netflix',
      symbol: 'NFLX',
      name: 'Netflix Inc',
      currentPrice: 445.80,
      historicalPrices: [445.80],
      volatility: 0.05,
      trend: 1.0,
      sector: 'media'
    },
    // Cryptocurrency/Blockchain
    {
      id: 'stock_coinbase',
      symbol: 'COIN',
      name: 'Coinbase Global Inc',
      currentPrice: 185.40,
      historicalPrices: [185.40],
      volatility: 0.12,
      trend: 1.0,
      sector: 'crypto'
    },
    {
      id: 'stock_riot',
      symbol: 'RIOT',
      name: 'Riot Platforms Inc',
      currentPrice: 12.85,
      historicalPrices: [12.85],
      volatility: 0.15,
      trend: 1.0,
      sector: 'crypto'
    }
  ],
  portfolio: {
    holdings: [], // { stockId, quantity, averagePurchasePrice }
    totalInvested: 0,
    totalValue: 0,
    unrealizedGainLoss: 0,
    realizedGainLoss: 0,
    totalDividendsReceived: 0,
    watchlist: [], // array of stock IDs to monitor
    priceAlerts: [], // { stockId, targetPrice, direction: 'above'|'below', active: true }
    lastDividendCheck: null
  },

  // Stock Market Features
  stockMarket: {
    marketEvents: [], // { id, title, description, affectedStocks, priceImpact, duration }
    marketStatus: 'open', // 'open', 'closed', 'volatile'
    marketSentiment: 'neutral', // 'bullish', 'bearish', 'neutral'
    lastEventDate: null
  },

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