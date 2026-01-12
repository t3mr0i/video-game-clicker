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
  PLAYSTATION_2: 'PlayStation 2',
  PLAYSTATION_3: 'PlayStation 3',
  PLAYSTATION_4: 'PlayStation 4',
  PLAYSTATION_5: 'PlayStation 5',
  PLAYSTATION_PORTAL: 'PlayStation Portal',
  PSP: 'PlayStation Portable',
  PS_VITA: 'PlayStation Vita',
  XBOX: 'Xbox',
  XBOX_360: 'Xbox 360',
  XBOX_ONE: 'Xbox One',
  XBOX_SERIES: 'Xbox Series X/S',
  NINTENDO: 'Nintendo Switch',
  NINTENDO_OLED: 'Nintendo Switch OLED',
  NINTENDO_LITE: 'Nintendo Switch Lite',
  NINTENDO_64: 'Nintendo 64',
  GAME_CUBE: 'GameCube',
  WII: 'Wii',
  WII_U: 'Wii U',
  NINTENDO_DS: 'Nintendo DS',
  NINTENDO_3DS: 'Nintendo 3DS',
  GAME_BOY: 'Game Boy',
  GAME_BOY_COLOR: 'Game Boy Color',
  GAME_BOY_ADVANCE: 'Game Boy Advance',
  NES: 'Nintendo Entertainment System',
  SNES: 'Super Nintendo',
  GENESIS: 'Sega Genesis',
  MEGA_DRIVE: 'Sega Mega Drive',
  GAME_GEAR: 'Sega Game Gear',
  MASTER_SYSTEM: 'Sega Master System',
  DREAMCAST: 'Sega Dreamcast',
  SATURN: 'Sega Saturn',
  ATARI_2600: 'Atari 2600',
  ATARI_7800: 'Atari 7800',
  ATARI_JAGUAR: 'Atari Jaguar',
  TURBOGRAFX_16: 'TurboGrafx-16',
  NEO_GEO: 'Neo Geo',
  NEO_GEO_POCKET: 'Neo Geo Pocket',
  WONDERSWAN: 'WonderSwan',
  LYNX: 'Atari Lynx',
  OUYA: 'Ouya',
  STEAM_DECK: 'Steam Deck',
  ASUS_ROG_ALLY: 'ASUS ROG Ally',
  LEGION_GO: 'Lenovo Legion Go',
  ANALOGUE_POCKET: 'Analogue Pocket',
  EVERCADE: 'Evercade',
  PLAYDATE: 'Playdate',
  MOBILE: 'Mobile',
  ANDROID: 'Android',
  IOS: 'iOS',
  WEB: 'Web',
  WEBGL: 'WebGL',
  WEBASSEMBLY: 'WebAssembly',
  VR: 'VR',
  OCULUS_QUEST: 'Meta Quest',
  PSVR: 'PlayStation VR',
  PSVR2: 'PlayStation VR2',
  VALVE_INDEX: 'Valve Index',
  HTC_VIVE: 'HTC Vive',
  AR: 'Augmented Reality',
  HOLOLENS: 'Microsoft HoloLens',
  MAGIC_LEAP: 'Magic Leap',
  GOOGLE_GLASS: 'Google Glass',
  SMART_TV: 'Smart TV',
  APPLE_TV: 'Apple TV',
  NVIDIA_SHIELD: 'NVIDIA Shield',
  AMAZON_FIRE_TV: 'Amazon Fire TV',

  // Retro Consoles
  COLECOVISION: 'ColecoVision',
  INTELLIVISION: 'Intellivision',
  VECTREX: 'Vectrex',
  CHANNEL_F: 'Fairchild Channel F',
  ODYSSEY: 'Magnavox Odyssey',
  ODYSSEY_2: 'Magnavox Odyssey²',
  BALLY_ASTROCADE: 'Bally Astrocade',
  ARCADIA_2001: 'Arcadia 2001',

  // Modern Handheld Consoles
  ANBERNIC_RG35XX: 'Anbernic RG35XX',
  MIYOO_MINI: 'Miyoo Mini',
  RETROID_POCKET: 'Retroid Pocket',
  POWKIDDY_RGB10: 'PowKiddy RGB10',
  GAMEFORCE_ACE: 'GameForce Ace',
  TRIMUI_SMART_PRO: 'TrimUI Smart Pro',
  AYANEO_AIR: 'AYANEO Air',
  GPD_WIN: 'GPD Win',

  // Mini Consoles
  NES_CLASSIC: 'NES Classic',
  SNES_CLASSIC: 'SNES Classic',
  PLAYSTATION_CLASSIC: 'PlayStation Classic',
  GENESIS_MINI: 'Genesis Mini',
  NEO_GEO_MINI: 'Neo Geo Mini',
  PC_ENGINE_MINI: 'PC Engine Mini',
  TURBOGRAFX_16_MINI: 'TurboGrafx-16 Mini',
  C64_MINI: 'C64 Mini',
  ATARI_FLASHBACK: 'Atari Flashback',

  // Arcade Systems
  NEOGEO_MVS: 'Neo Geo MVS',
  NEOGEO_AES: 'Neo Geo AES',
  CPS1: 'Capcom CPS-1',
  CPS2: 'Capcom CPS-2',
  CPS3: 'Capcom CPS-3',
  SYSTEM_16: 'Sega System 16',
  MODEL_2: 'Sega Model 2',
  MODEL_3: 'Sega Model 3',
  NAOMI: 'Sega NAOMI',
  CHIHIRO: 'Sega Chihiro',

  // Computer Platforms
  COMMODORE_64: 'Commodore 64',
  AMIGA: 'Amiga',
  AMSTRAD_CPC: 'Amstrad CPC',
  ZX_SPECTRUM: 'ZX Spectrum',
  MSX: 'MSX',
  APPLE_II: 'Apple II',
  ATARI_ST: 'Atari ST',
  BBC_MICRO: 'BBC Micro',
  TI_99: 'TI-99/4A',

  // Mobile Gaming Devices
  NVIDIA_SHIELD_PORTABLE: 'NVIDIA Shield Portable',
  SONY_XPERIA_PLAY: 'Sony Xperia Play',
  NOKIA_NGAGE: 'Nokia N-Gage',
  PANASONIC_JUNGLE: 'Panasonic Jungle',

  // Cloud Gaming
  STADIA: 'Google Stadia',
  GEFORCE_NOW: 'GeForce Now',
  XBOX_CLOUD: 'Xbox Cloud Gaming',
  AMAZON_LUNA: 'Amazon Luna',
  PLAYSTATION_NOW: 'PlayStation Now',

  // Alternative/Indie Consoles
  INTELLIVISION_AMICO: 'Intellivision Amico',
  ATARI_VCS: 'Atari VCS',
  KFC_CONSOLE: 'KFC Console',
  SOULJA_GAME: 'SouljaGame Console',
  POLYMEGA: 'Polymega',

  // Educational/Kids Consoles
  LEAPFROG_LEAPSTER: 'LeapFrog Leapster',
  VTECH_VSMILE: 'V.Tech V.Smile',
  FISHER_PRICE_PIXTER: 'Fisher-Price Pixter',

  // Future/Concept Consoles
  STEAM_CONSOLE: 'Steam Console',
  APPLE_CONSOLE: 'Apple Console',
  GOOGLE_CONSOLE: 'Google Console',
  TESLA_ARCADE: 'Tesla Arcade'
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