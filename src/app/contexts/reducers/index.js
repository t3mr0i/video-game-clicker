/**
 * Combined reducer that orchestrates all domain-specific reducers
 * This replaces the monolithic reducer with a modular, maintainable structure
 */

import { projectReducer, PROJECT_ACTIONS } from './projectReducer';
import { employeeReducer, EMPLOYEE_ACTIONS } from './employeeReducer';
import { stockReducer, STOCK_ACTIONS } from './stockReducer';
import { notificationReducer, NOTIFICATION_ACTIONS } from './notificationReducer';
import { studioReducer, STUDIO_ACTIONS } from './studioReducer';
import { defaultGameState } from '../../config/defaultGameState';

// Export all action types for convenience
export const ACTIONS = {
  ...PROJECT_ACTIONS,
  ...EMPLOYEE_ACTIONS,
  ...STOCK_ACTIONS,
  ...NOTIFICATION_ACTIONS,
  ...STUDIO_ACTIONS
};

/**
 * Combined reducer that delegates to domain-specific reducers
 * Each reducer only handles its own domain, making the code more maintainable
 */
export function combinedGameReducer(state, action) {
  // Handle reset game action at the top level
  if (action.type === STUDIO_ACTIONS.RESET_GAME) {
    return defaultGameState;
  }

  // Determine which reducer(s) should handle this action
  let newState = state;

  // Project-related actions
  if (Object.values(PROJECT_ACTIONS).includes(action.type)) {
    newState = projectReducer(newState, action);
  }

  // Employee-related actions
  if (Object.values(EMPLOYEE_ACTIONS).includes(action.type)) {
    newState = employeeReducer(newState, action);
  }

  // Stock market actions
  if (Object.values(STOCK_ACTIONS).includes(action.type)) {
    newState = stockReducer(newState, action);
  }

  // Notification actions
  if (Object.values(NOTIFICATION_ACTIONS).includes(action.type)) {
    newState = notificationReducer(newState, action);
  }

  // Studio management actions
  if (Object.values(STUDIO_ACTIONS).includes(action.type)) {
    newState = studioReducer(newState, action);
  }

  return newState;
}

// Export action creators from each domain
export {
  projectActions,
  PROJECT_ACTIONS
} from './projectReducer';

export {
  employeeActions,
  EMPLOYEE_ACTIONS
} from './employeeReducer';

export {
  stockActions,
  STOCK_ACTIONS
} from './stockReducer';

export {
  notificationActions,
  NOTIFICATION_ACTIONS
} from './notificationReducer';

export {
  studioActions,
  STUDIO_ACTIONS
} from './studioReducer';