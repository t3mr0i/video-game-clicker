/**
 * Studio reducer for managing core studio operations
 * Handles studio level, finances, morale, reputation, and general game state
 */

// Studio action types
export const STUDIO_ACTIONS = {
  SET_STUDIO_LEVEL: 'SET_STUDIO_LEVEL',
  UPDATE_TIME: 'UPDATE_TIME',
  UPDATE_FINANCE: 'UPDATE_FINANCE',
  UPDATE_MORALE: 'UPDATE_MORALE',
  UPDATE_REPUTATION: 'UPDATE_REPUTATION',
  UPDATE_STATS: 'UPDATE_STATS',
  UNLOCK_PLATFORM: 'UNLOCK_PLATFORM',
  UNLOCK_GENRE: 'UNLOCK_GENRE',
  UNLOCK_TECHNOLOGY: 'UNLOCK_TECHNOLOGY',
  TOGGLE_GAME_SPEED: 'TOGGLE_GAME_SPEED',
  RESET_GAME: 'RESET_GAME'
};

export function studioReducer(state, action) {
  switch (action.type) {
    case STUDIO_ACTIONS.SET_STUDIO_LEVEL:
      return { ...state, studioLevel: action.payload };

    case STUDIO_ACTIONS.UPDATE_TIME:
      return {
        ...state,
        currentDate: { ...state.currentDate, ...action.payload }
      };

    case STUDIO_ACTIONS.UPDATE_FINANCE:
      return {
        ...state,
        money: typeof action.payload.money !== 'undefined'
          ? action.payload.money
          : state.money + (action.payload.amount || 0)
      };

    case STUDIO_ACTIONS.UPDATE_MORALE:
      return {
        ...state,
        morale: Math.max(0, Math.min(100, action.payload))
      };

    case STUDIO_ACTIONS.UPDATE_REPUTATION:
      return {
        ...state,
        reputation: Math.max(0, Math.min(100, action.payload))
      };

    case STUDIO_ACTIONS.UPDATE_STATS:
      return {
        ...state,
        stats: { ...state.stats, ...action.payload }
      };

    case STUDIO_ACTIONS.UNLOCK_PLATFORM:
      return {
        ...state,
        platforms: (state.platforms || []).map(platform =>
          platform.id === action.payload
            ? { ...platform, unlocked: true }
            : platform
        )
      };

    case STUDIO_ACTIONS.UNLOCK_GENRE:
      return {
        ...state,
        genres: (state.genres || []).map(genre =>
          genre.id === action.payload
            ? { ...genre, unlocked: true }
            : genre
        )
      };

    case STUDIO_ACTIONS.UNLOCK_TECHNOLOGY:
      return {
        ...state,
        technologies: [...(state.technologies || []), action.payload]
      };

    case STUDIO_ACTIONS.TOGGLE_GAME_SPEED:
      return {
        ...state,
        gameSpeed: action.payload
      };

    case STUDIO_ACTIONS.RESET_GAME:
      // This will be handled by the main context to reset to initial state
      return state;

    default:
      return state;
  }
}

// Action creators
export const studioActions = {
  setStudioLevel: (level) => ({
    type: STUDIO_ACTIONS.SET_STUDIO_LEVEL,
    payload: level
  }),

  updateTime: (timeUpdate) => ({
    type: STUDIO_ACTIONS.UPDATE_TIME,
    payload: timeUpdate
  }),

  updateFinances: (financeUpdate) => ({
    type: STUDIO_ACTIONS.UPDATE_FINANCE,
    payload: financeUpdate
  }),

  updateMorale: (morale) => ({
    type: STUDIO_ACTIONS.UPDATE_MORALE,
    payload: morale
  }),

  updateReputation: (reputation) => ({
    type: STUDIO_ACTIONS.UPDATE_REPUTATION,
    payload: reputation
  }),

  updateStats: (stats) => ({
    type: STUDIO_ACTIONS.UPDATE_STATS,
    payload: stats
  }),

  unlockPlatform: (platformId) => ({
    type: STUDIO_ACTIONS.UNLOCK_PLATFORM,
    payload: platformId
  }),

  unlockGenre: (genreId) => ({
    type: STUDIO_ACTIONS.UNLOCK_GENRE,
    payload: genreId
  }),

  unlockTechnology: (tech) => ({
    type: STUDIO_ACTIONS.UNLOCK_TECHNOLOGY,
    payload: tech
  }),

  toggleGameSpeed: (speed) => ({
    type: STUDIO_ACTIONS.TOGGLE_GAME_SPEED,
    payload: speed
  }),

  resetGame: () => ({
    type: STUDIO_ACTIONS.RESET_GAME
  })
};