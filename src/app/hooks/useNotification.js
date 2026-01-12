import { useCallback } from 'react';
import { useGameContext } from '../contexts/GameContext';

/**
 * Custom hook for standardized notification handling with auto-dismiss
 * @param {number} defaultDuration - Default auto-dismiss duration in milliseconds (default: 8000)
 * @returns {Object} Notification management functions
 */
export const useNotification = (defaultDuration = 8000) => {
  const { actions } = useGameContext();

  /**
   * Add a notification with auto-dismiss functionality
   * @param {string} message - Notification message
   * @param {string} type - Notification type ('success', 'error', 'warning', 'info')
   * @param {number} duration - Auto-dismiss duration in milliseconds (optional)
   * @param {boolean} persistent - Whether the notification should persist (no auto-dismiss)
   * @returns {Object} Object with notification ID and timeout ID for manual control
   */
  const notify = useCallback((message, type = 'info', duration = null, persistent = false) => {
    const notification = {
      message,
      type,
      timestamp: Date.now()
    };

    // Create and get the new notification's ID
    const notificationId = actions.addNotification(notification);

    let timeoutId = null;

    // Set up auto-dismiss unless notification is persistent
    if (!persistent) {
      const dismissAfter = duration !== null ? duration : defaultDuration;
      timeoutId = setTimeout(() => {
        actions.removeNotification(notificationId);
      }, dismissAfter);
    }

    // Return the notification id and timeout id for external control
    return { id: notificationId, timeoutId };
  }, [actions, defaultDuration]);

  /**
   * Convenience method for success notifications
   * @param {string} message - Success message
   * @param {number} duration - Auto-dismiss duration (optional)
   * @returns {Object} Notification control object
   */
  const notifySuccess = useCallback((message, duration = null) => {
    return notify(message, 'success', duration);
  }, [notify]);

  /**
   * Convenience method for error notifications
   * @param {string} message - Error message
   * @param {number} duration - Auto-dismiss duration (optional, defaults to longer for errors)
   * @returns {Object} Notification control object
   */
  const notifyError = useCallback((message, duration = 12000) => {
    return notify(message, 'error', duration);
  }, [notify]);

  /**
   * Convenience method for warning notifications
   * @param {string} message - Warning message
   * @param {number} duration - Auto-dismiss duration (optional)
   * @returns {Object} Notification control object
   */
  const notifyWarning = useCallback((message, duration = 10000) => {
    return notify(message, 'warning', duration);
  }, [notify]);

  /**
   * Convenience method for info notifications
   * @param {string} message - Info message
   * @param {number} duration - Auto-dismiss duration (optional)
   * @returns {Object} Notification control object
   */
  const notifyInfo = useCallback((message, duration = null) => {
    return notify(message, 'info', duration);
  }, [notify]);

  /**
   * Convenience method for persistent notifications (no auto-dismiss)
   * @param {string} message - Notification message
   * @param {string} type - Notification type
   * @returns {Object} Notification control object
   */
  const notifyPersistent = useCallback((message, type = 'info') => {
    return notify(message, type, null, true);
  }, [notify]);

  /**
   * Manually dismiss a notification
   * @param {string} notificationId - ID of notification to dismiss
   */
  const dismiss = useCallback((notificationId) => {
    actions.removeNotification(notificationId);
  }, [actions]);

  /**
   * Cancel the auto-dismiss timeout for a notification
   * @param {number} timeoutId - Timeout ID returned from notification creation
   */
  const cancelAutoDismiss = useCallback((timeoutId) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }, []);

  /**
   * Clear all notifications
   */
  const clearAll = useCallback(() => {
    if (actions.clearAllNotifications) {
      actions.clearAllNotifications();
    }
  }, [actions]);

  /**
   * Create notifications for common game events
   */
  const gameEvents = {
    /**
     * Notify when employee is hired
     * @param {Object} employee - Employee object
     */
    employeeHired: useCallback((employee) => {
      return notifySuccess(`Hired ${employee.name} as ${employee.type}`);
    }, [notifySuccess]),

    /**
     * Notify when employee is fired
     * @param {Object} employee - Employee object
     */
    employeeFired: useCallback((employee) => {
      return notifyWarning(`Fired ${employee.name}`);
    }, [notifyWarning]),

    /**
     * Notify when achievement is unlocked
     * @param {Object} achievement - Achievement object
     */
    achievementUnlocked: useCallback((achievement) => {
      return notifySuccess(`Achievement Unlocked: ${achievement.title} (+$${achievement.reward})`);
    }, [notifySuccess]),

    /**
     * Notify when project is completed
     * @param {Object} project - Project object
     */
    projectCompleted: useCallback((project) => {
      return notifySuccess(`Project "${project.name}" completed! Revenue: $${project.revenue?.toLocaleString() || 'TBD'}`);
    }, [notifySuccess]),

    /**
     * Notify about stock trading
     * @param {string} action - 'bought' or 'sold'
     * @param {number} quantity - Number of shares
     * @param {Object} stock - Stock object
     */
    stockTraded: useCallback((action, quantity, stock) => {
      const message = `${action === 'buy' ? 'Bought' : 'Sold'} ${quantity} shares of ${stock.symbol}`;
      return notifySuccess(message);
    }, [notifySuccess]),

    /**
     * Notify about insufficient funds
     * @param {string} context - Context where funds are insufficient
     */
    insufficientFunds: useCallback((context = 'this action') => {
      return notifyError(`Insufficient funds for ${context}`);
    }, [notifyError]),

    /**
     * Notify about generic game status updates
     * @param {string} message - Status message
     */
    gameStatus: useCallback((message) => {
      return notifyInfo(message);
    }, [notifyInfo])
  };

  return {
    // Core notification functions
    notify,
    notifySuccess,
    notifyError,
    notifyWarning,
    notifyInfo,
    notifyPersistent,

    // Control functions
    dismiss,
    cancelAutoDismiss,
    clearAll,

    // Game event helpers
    gameEvents,

    // Legacy compatibility (matches current addNotification pattern)
    addNotification: notify
  };
};