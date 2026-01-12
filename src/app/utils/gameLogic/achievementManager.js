/**
 * Achievement management utilities for the game loop
 * Handles achievement checking and unlocking logic
 */

const ACHIEVEMENTS_CONFIG = {
  first_game: {
    title: 'First Steps',
    description: 'Complete your first game',
    reward: 5000,
    condition: (state) => (state.completedProjects || []).length >= 1,
    category: 'milestone'
  },
  profitable: {
    title: 'In the Black',
    description: 'Reach $100,000 in funds',
    reward: 10000,
    condition: (state) => state.money >= 100000,
    category: 'financial'
  },
  team_player: {
    title: 'Team Player',
    description: 'Hire 10 employees',
    reward: 15000,
    condition: (state) => (state.employees || []).length >= 10,
    category: 'team'
  },
  aaa_developer: {
    title: 'AAA Developer',
    description: 'Complete a AAA game',
    reward: 50000,
    condition: (state) => (state.completedProjects || []).some(p => p.size === 3),
    category: 'milestone'
  },
  millionaire: {
    title: 'Millionaire',
    description: 'Reach $1,000,000 in funds',
    reward: 100000,
    condition: (state) => state.money >= 1000000,
    category: 'financial'
  },
  speed_demon: {
    title: 'Speed Demon',
    description: 'Complete 5 games',
    reward: 25000,
    condition: (state) => (state.completedProjects || []).length >= 5,
    category: 'milestone'
  },
  empire_builder: {
    title: 'Empire Builder',
    description: 'Hire 25 employees',
    reward: 75000,
    condition: (state) => (state.employees || []).length >= 25,
    category: 'team'
  },
  perfectionist: {
    title: 'Perfectionist',
    description: 'Achieve 95+ team morale',
    reward: 30000,
    condition: (state) => state.morale >= 95,
    category: 'performance'
  }
};

/**
 * Checks for new achievements that should be unlocked
 * @param {Object} gameState - Current game state
 * @returns {Array} Array of new achievements to unlock
 */
export function checkForNewAchievements(gameState) {
  const newAchievements = [];
  const existingAchievementIds = new Set(gameState.achievements?.map(a => a.id) || []);

  for (const [id, config] of Object.entries(ACHIEVEMENTS_CONFIG)) {
    if (!existingAchievementIds.has(id) && config.condition(gameState)) {
      const achievementData = {
        id,
        title: config.title,
        description: config.description,
        reward: config.reward,
        category: config.category,
        unlockedAt: Date.now()
      };
      newAchievements.push(achievementData);
    }
  }

  return newAchievements;
}

/**
 * Gets achievement details by ID
 * @param {string} id - Achievement ID
 * @returns {Object} Achievement configuration
 */
export function getAchievementConfig(id) {
  return ACHIEVEMENTS_CONFIG[id] || null;
}

/**
 * Gets achievement title by ID
 * @param {string} id - Achievement ID
 * @returns {string} Achievement title
 */
export function getAchievementTitle(id) {
  return ACHIEVEMENTS_CONFIG[id]?.title || 'Achievement';
}

/**
 * Gets achievement description by ID
 * @param {string} id - Achievement ID
 * @returns {string} Achievement description
 */
export function getAchievementDescription(id) {
  return ACHIEVEMENTS_CONFIG[id]?.description || 'Achievement unlocked';
}

/**
 * Gets achievement reward by ID
 * @param {string} id - Achievement ID
 * @returns {number} Achievement reward amount
 */
export function getAchievementReward(id) {
  return ACHIEVEMENTS_CONFIG[id]?.reward || 0;
}