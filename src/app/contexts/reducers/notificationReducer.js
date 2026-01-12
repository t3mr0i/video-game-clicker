/**
 * Notification reducer for managing notifications and achievements
 * Handles all notification-related state updates
 */

// Notification action types
export const NOTIFICATION_ACTIONS = {
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  CLEAR_ALL_NOTIFICATIONS: 'CLEAR_ALL_NOTIFICATIONS',
  UNLOCK_ACHIEVEMENT: 'UNLOCK_ACHIEVEMENT'
};

export function notificationReducer(state, action) {
  switch (action.type) {
    case NOTIFICATION_ACTIONS.ADD_NOTIFICATION:
      {
        const newNotification = {
          ...action.payload,
          id: crypto.randomUUID(),
          timestamp: Date.now()
        };
        const notifications = [
          ...(state.notifications || []).slice(-49), // Keep only last 50 notifications
          newNotification
        ];
        return {
          ...state,
          notifications
        };
      }

    case NOTIFICATION_ACTIONS.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: (state.notifications || []).filter(n => n.id !== action.payload)
      };

    case NOTIFICATION_ACTIONS.CLEAR_ALL_NOTIFICATIONS:
      return {
        ...state,
        notifications: []
      };

    case NOTIFICATION_ACTIONS.UNLOCK_ACHIEVEMENT:
      if ((state.achievements || []).find(a => a.id === action.payload.id)) {
        return state; // Already unlocked
      }
      return {
        ...state,
        achievements: [...(state.achievements || []), { ...action.payload, unlocked: true }],
        money: state.money + (action.payload.reward || 0)
      };

    default:
      return state;
  }
}

// Action creators
export const notificationActions = {
  addNotification: (notification) => ({
    type: NOTIFICATION_ACTIONS.ADD_NOTIFICATION,
    payload: notification
  }),

  removeNotification: (id) => ({
    type: NOTIFICATION_ACTIONS.REMOVE_NOTIFICATION,
    payload: id
  }),

  clearAllNotifications: () => ({
    type: NOTIFICATION_ACTIONS.CLEAR_ALL_NOTIFICATIONS
  }),

  unlockAchievement: (achievement) => ({
    type: NOTIFICATION_ACTIONS.UNLOCK_ACHIEVEMENT,
    payload: achievement
  })
};