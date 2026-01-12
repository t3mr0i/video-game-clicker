/**
 * Pure functions for achievement-related calculations
 * These functions handle achievement checking and progression without side effects
 */

/**
 * Achievement configuration object
 * This could be moved to a config file for easy modification
 */
export const ACHIEVEMENTS_CONFIG = {
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
  },
  multi_platform: {
    title: 'Multi-Platform Master',
    description: 'Release games on 3 different platforms',
    reward: 20000,
    condition: (state) => {
      const platforms = new Set((state.completedProjects || []).map(p => p.platform));
      return platforms.size >= 3;
    },
    category: 'milestone'
  },
  genre_explorer: {
    title: 'Genre Explorer',
    description: 'Complete games in 4 different genres',
    reward: 18000,
    condition: (state) => {
      const genres = new Set((state.completedProjects || []).map(p => p.genre));
      return genres.size >= 4;
    },
    category: 'milestone'
  },
  high_roller: {
    title: 'High Roller',
    description: 'Complete a project with revenue over $500k',
    reward: 35000,
    condition: (state) => (state.completedProjects || []).some(p => p.revenue >= 500000),
    category: 'financial'
  },
  veteran_developer: {
    title: 'Veteran Developer',
    description: 'Complete 15 games',
    reward: 60000,
    condition: (state) => (state.completedProjects || []).length >= 15,
    category: 'milestone'
  }
};

/**
 * Check for new achievements based on current game state
 * @param {Object} gameState - Current game state
 * @param {Array} existingAchievements - Array of already unlocked achievements
 * @returns {Array} Array of new achievement data objects
 */
export const checkForNewAchievements = (gameState, existingAchievements = []) => {
  const newAchievements = [];
  const existingAchievementIds = new Set(existingAchievements.map(a => a.id));

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
};

/**
 * Calculate total achievement progress percentage
 * @param {Array} unlockedAchievements - Array of unlocked achievements
 * @returns {number} Progress percentage (0-100)
 */
export const calculateAchievementProgress = (unlockedAchievements = []) => {
  const totalAchievements = Object.keys(ACHIEVEMENTS_CONFIG).length;
  const unlockedCount = unlockedAchievements.length;
  return Math.round((unlockedCount / totalAchievements) * 100);
};

/**
 * Calculate total achievement rewards earned
 * @param {Array} unlockedAchievements - Array of unlocked achievements
 * @returns {number} Total rewards earned
 */
export const calculateTotalAchievementRewards = (unlockedAchievements = []) => {
  return unlockedAchievements.reduce((total, achievement) => {
    return total + (achievement.reward || 0);
  }, 0);
};

/**
 * Get achievements by category
 * @param {string} category - Achievement category
 * @returns {Array} Array of achievement configs in that category
 */
export const getAchievementsByCategory = (category) => {
  return Object.entries(ACHIEVEMENTS_CONFIG)
    .filter(([id, config]) => config.category === category)
    .map(([id, config]) => ({ id, ...config }));
};

/**
 * Check if a specific achievement is unlocked
 * @param {string} achievementId - ID of the achievement to check
 * @param {Array} unlockedAchievements - Array of unlocked achievements
 * @returns {boolean} Whether the achievement is unlocked
 */
export const isAchievementUnlocked = (achievementId, unlockedAchievements = []) => {
  return unlockedAchievements.some(achievement => achievement.id === achievementId);
};

/**
 * Get achievement progress for achievements with numerical conditions
 * @param {string} achievementId - ID of the achievement
 * @param {Object} gameState - Current game state
 * @returns {Object|null} Progress object with current and target values, or null if not applicable
 */
export const getAchievementProgress = (achievementId, gameState) => {
  const config = ACHIEVEMENTS_CONFIG[achievementId];
  if (!config) return null;

  // Define progress calculators for specific achievements
  const progressCalculators = {
    team_player: (state) => ({
      current: (state.employees || []).length,
      target: 10,
      progress: Math.min(100, ((state.employees || []).length / 10) * 100)
    }),
    empire_builder: (state) => ({
      current: (state.employees || []).length,
      target: 25,
      progress: Math.min(100, ((state.employees || []).length / 25) * 100)
    }),
    profitable: (state) => ({
      current: state.money || 0,
      target: 100000,
      progress: Math.min(100, ((state.money || 0) / 100000) * 100)
    }),
    millionaire: (state) => ({
      current: state.money || 0,
      target: 1000000,
      progress: Math.min(100, ((state.money || 0) / 1000000) * 100)
    }),
    speed_demon: (state) => ({
      current: (state.completedProjects || []).length,
      target: 5,
      progress: Math.min(100, ((state.completedProjects || []).length / 5) * 100)
    }),
    veteran_developer: (state) => ({
      current: (state.completedProjects || []).length,
      target: 15,
      progress: Math.min(100, ((state.completedProjects || []).length / 15) * 100)
    }),
    perfectionist: (state) => ({
      current: state.morale || 0,
      target: 95,
      progress: Math.min(100, ((state.morale || 0) / 95) * 100)
    })
  };

  const calculator = progressCalculators[achievementId];
  return calculator ? calculator(gameState) : null;
};