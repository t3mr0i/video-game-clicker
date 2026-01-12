'use client'
import React, { createContext, useContext, useReducer } from 'react';
import { defaultGameState } from '../config/defaultGameState';
import {
  combinedGameReducer,
  ACTIONS,
  projectActions,
  employeeActions,
  stockActions,
  notificationActions,
  studioActions
} from './reducers';

// Use the default game state from config
const initialState = defaultGameState;

const GameContext = createContext();

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(combinedGameReducer, initialState);

  // Organized action creators using domain-specific action creators
  const actions = {
    // Studio management
    setStudioLevel: (level) => dispatch(studioActions.setStudioLevel(level)),
    updateTime: (timeUpdate) => dispatch(studioActions.updateTime(timeUpdate)),
    updateFinances: (financeUpdate) => dispatch(studioActions.updateFinances(financeUpdate)),
    updateMorale: (morale) => dispatch(studioActions.updateMorale(morale)),
    updateReputation: (reputation) => dispatch(studioActions.updateReputation(reputation)),
    updateStats: (stats) => dispatch(studioActions.updateStats(stats)),
    unlockPlatform: (platformId) => dispatch(studioActions.unlockPlatform(platformId)),
    unlockGenre: (genreId) => dispatch(studioActions.unlockGenre(genreId)),
    unlockTechnology: (tech) => dispatch(studioActions.unlockTechnology(tech)),
    toggleGameSpeed: (speed) => dispatch(studioActions.toggleGameSpeed(speed)),
    resetGame: () => dispatch(studioActions.resetGame()),

    // Project management
    addProject: (project) => dispatch(projectActions.addProject(project)),
    updateProject: (id, updates) => dispatch(projectActions.updateProject(id, updates)),
    completeProject: (project) => dispatch(projectActions.completeProject(project)),
    deleteProject: (id) => dispatch(projectActions.deleteProject(id)),

    // Employee management
    hireEmployee: (employee) => dispatch(employeeActions.hireEmployee(employee)),
    fireEmployee: (id) => dispatch(employeeActions.fireEmployee(id)),
    updateEmployee: (id, updates) => dispatch(employeeActions.updateEmployee(id, updates)),
    assignEmployee: (employeeId, projectId) => dispatch(employeeActions.assignEmployee(employeeId, projectId)),

    // Notifications and achievements
    addNotification: (notification) => {
      const id = crypto.randomUUID();
      dispatch(notificationActions.addNotification({ ...notification, id }));
      return id;
    },
    removeNotification: (id) => dispatch(notificationActions.removeNotification(id)),
    clearAllNotifications: () => dispatch(notificationActions.clearAllNotifications()),
    unlockAchievement: (achievement) => dispatch(notificationActions.unlockAchievement(achievement)),

    // Stock market management
    buyStock: (stockId, quantity, price) => dispatch(stockActions.buyStock(stockId, quantity, price)),
    sellStock: (stockId, quantity, price) => dispatch(stockActions.sellStock(stockId, quantity, price)),
    updateStockPrices: (stockUpdates) => dispatch(stockActions.updateStockPrices(stockUpdates)),
    updatePortfolio: (portfolioUpdate) => dispatch(stockActions.updatePortfolio(portfolioUpdate)),
    payDividends: (stockId, dividendAmount) => dispatch(stockActions.payDividends(stockId, dividendAmount)),
    addToWatchlist: (stockId) => dispatch(stockActions.addToWatchlist(stockId)),
    removeFromWatchlist: (stockId) => dispatch(stockActions.removeFromWatchlist(stockId)),
    createPriceAlert: (stockId, targetPrice, direction) => dispatch(stockActions.createPriceAlert(stockId, targetPrice, direction)),
    removePriceAlert: (alertId) => dispatch(stockActions.removePriceAlert(alertId)),
    triggerMarketEvent: (eventData) => dispatch(stockActions.triggerMarketEvent(eventData)),
    updateMarketStatus: (statusUpdate) => dispatch(stockActions.updateMarketStatus(statusUpdate))
  };

  return React.createElement(
    GameContext.Provider,
    { value: { state, actions } },
    children
  );
}

// Custom hook for easier context consumption
export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
}

export { ACTIONS };