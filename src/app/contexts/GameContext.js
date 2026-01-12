'use client'
import React, { createContext, useContext, useReducer } from 'react';
import { defaultGameState } from '../config/defaultGameState';

// Centralized action types
const ACTIONS = {
  // Existing actions
  SET_STUDIO_LEVEL: 'SET_STUDIO_LEVEL',
  UPDATE_TIME: 'UPDATE_TIME',
  ADD_PROJECT: 'ADD_PROJECT',
  HIRE_EMPLOYEE: 'HIRE_EMPLOYEE',
  UPDATE_FINANCE: 'UPDATE_FINANCE',
  TOGGLE_GAME_SPEED: 'TOGGLE_GAME_SPEED',
  UNLOCK_TECHNOLOGY: 'UNLOCK_TECHNOLOGY',

  // New comprehensive actions
  UPDATE_PROJECT: 'UPDATE_PROJECT',
  COMPLETE_PROJECT: 'COMPLETE_PROJECT',
  DELETE_PROJECT: 'DELETE_PROJECT',
  FIRE_EMPLOYEE: 'FIRE_EMPLOYEE',
  UPDATE_EMPLOYEE: 'UPDATE_EMPLOYEE',
  ASSIGN_EMPLOYEE: 'ASSIGN_EMPLOYEE',
  UPDATE_MORALE: 'UPDATE_MORALE',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  UNLOCK_ACHIEVEMENT: 'UNLOCK_ACHIEVEMENT',
  UPDATE_REPUTATION: 'UPDATE_REPUTATION',
  UNLOCK_PLATFORM: 'UNLOCK_PLATFORM',
  UNLOCK_GENRE: 'UNLOCK_GENRE',
  UPDATE_STATS: 'UPDATE_STATS',
  RESET_GAME: 'RESET_GAME',

  // Stock market actions
  BUY_STOCK: 'BUY_STOCK',
  SELL_STOCK: 'SELL_STOCK',
  UPDATE_STOCK_PRICES: 'UPDATE_STOCK_PRICES',
  UPDATE_PORTFOLIO: 'UPDATE_PORTFOLIO'
};

// Use the default game state from config
const initialState = defaultGameState;

// Comprehensive reducer with clear, predictable state updates
function gameReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_STUDIO_LEVEL:
      return { ...state, studioLevel: action.payload };

    case ACTIONS.UPDATE_TIME:
      return {
        ...state,
        currentDate: { ...state.currentDate, ...action.payload }
      };

    case ACTIONS.ADD_PROJECT:
      return {
        ...state,
        projects: [...(state.projects || []), { ...action.payload, id: `project_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` }]
      };

    case ACTIONS.UPDATE_PROJECT:
      return {
        ...state,
        projects: (state.projects || []).map(project =>
          project.id === action.payload.id
            ? { ...project, ...action.payload.updates }
            : project
        )
      };

    case ACTIONS.COMPLETE_PROJECT:
      return {
        ...state,
        projects: (state.projects || []).filter(p => p.id !== action.payload.id),
        completedProjects: [...(state.completedProjects || []), action.payload],
        money: state.money + (action.payload.revenue || 0),
        stats: {
          ...state.stats,
          totalProjectsCompleted: state.stats.totalProjectsCompleted + 1,
          totalRevenue: state.stats.totalRevenue + (action.payload.revenue || 0)
        }
      };

    case ACTIONS.DELETE_PROJECT:
      return {
        ...state,
        projects: (state.projects || []).filter(p => p.id !== action.payload)
      };

    case ACTIONS.HIRE_EMPLOYEE:
      return {
        ...state,
        employees: [...(state.employees || []), { ...action.payload, id: `employee_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` }],
        money: state.money - (action.payload.hiringCost || 0),
        stats: {
          ...state.stats,
          totalEmployeesHired: state.stats.totalEmployeesHired + 1
        }
      };

    case ACTIONS.FIRE_EMPLOYEE:
      return {
        ...state,
        employees: (state.employees || []).filter(e => e.id !== action.payload)
      };

    case ACTIONS.UPDATE_EMPLOYEE:
      return {
        ...state,
        employees: (state.employees || []).map(employee =>
          employee.id === action.payload.id
            ? { ...employee, ...action.payload.updates }
            : employee
        )
      };

    case ACTIONS.UPDATE_FINANCE:
      return {
        ...state,
        money: typeof action.payload.money !== 'undefined'
          ? action.payload.money
          : state.money + (action.payload.amount || 0)
      };

    case ACTIONS.UPDATE_MORALE:
      return {
        ...state,
        morale: Math.max(0, Math.min(100, action.payload))
      };

    case ACTIONS.UPDATE_REPUTATION:
      return {
        ...state,
        reputation: Math.max(0, Math.min(100, action.payload))
      };

    case ACTIONS.ADD_NOTIFICATION:
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

    case ACTIONS.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: (state.notifications || []).filter(n => n.id !== action.payload)
      };

    case ACTIONS.UNLOCK_ACHIEVEMENT:
      if ((state.achievements || []).find(a => a.id === action.payload.id)) {
        return state; // Already unlocked
      }
      return {
        ...state,
        achievements: [...(state.achievements || []), { ...action.payload, unlocked: true }],
        money: state.money + (action.payload.reward || 0)
      };

    case ACTIONS.UNLOCK_PLATFORM:
      return {
        ...state,
        platforms: (state.platforms || []).map(platform =>
          platform.id === action.payload
            ? { ...platform, unlocked: true }
            : platform
        )
      };

    case ACTIONS.UNLOCK_GENRE:
      return {
        ...state,
        genres: (state.genres || []).map(genre =>
          genre.id === action.payload
            ? { ...genre, unlocked: true }
            : genre
        )
      };

    case ACTIONS.TOGGLE_GAME_SPEED:
      return {
        ...state,
        gameSpeed: action.payload
      };

    case ACTIONS.UNLOCK_TECHNOLOGY:
      return {
        ...state,
        technologies: [...(state.technologies || []), action.payload]
      };

    case ACTIONS.UPDATE_STATS:
      return {
        ...state,
        stats: { ...state.stats, ...action.payload }
      };

    case ACTIONS.RESET_GAME:
      return initialState;

    case ACTIONS.BUY_STOCK:
      {
        const { stockId, quantity, price } = action.payload;
        const totalCost = quantity * price;

        if (state.money < totalCost) {
          return state; // Not enough money
        }

        const existingHolding = state.portfolio.holdings.find(h => h.stockId === stockId);
        let newHoldings;

        if (existingHolding) {
          // Update existing holding with average cost basis
          const newQuantity = existingHolding.quantity + quantity;
          const newAveragePurchasePrice =
            (existingHolding.averagePurchasePrice * existingHolding.quantity + price * quantity) / newQuantity;

          newHoldings = state.portfolio.holdings.map(h =>
            h.stockId === stockId
              ? { ...h, quantity: newQuantity, averagePurchasePrice: newAveragePurchasePrice }
              : h
          );
        } else {
          // Create new holding
          newHoldings = [
            ...state.portfolio.holdings,
            { stockId, quantity, averagePurchasePrice: price }
          ];
        }

        return {
          ...state,
          money: state.money - totalCost,
          portfolio: {
            ...state.portfolio,
            holdings: newHoldings,
            totalInvested: state.portfolio.totalInvested + totalCost
          }
        };
      }

    case ACTIONS.SELL_STOCK:
      {
        const { stockId, quantity, price } = action.payload;
        const existingHolding = state.portfolio.holdings.find(h => h.stockId === stockId);

        if (!existingHolding || existingHolding.quantity < quantity) {
          return state; // Not enough shares
        }

        const saleProceeds = quantity * price;
        const costBasis = quantity * existingHolding.averagePurchasePrice;
        const realizedGain = saleProceeds - costBasis;

        let newHoldings;
        if (existingHolding.quantity === quantity) {
          // Remove holding entirely
          newHoldings = state.portfolio.holdings.filter(h => h.stockId !== stockId);
        } else {
          // Reduce quantity
          newHoldings = state.portfolio.holdings.map(h =>
            h.stockId === stockId
              ? { ...h, quantity: h.quantity - quantity }
              : h
          );
        }

        return {
          ...state,
          money: state.money + saleProceeds,
          portfolio: {
            ...state.portfolio,
            holdings: newHoldings,
            totalInvested: state.portfolio.totalInvested - costBasis,
            realizedGainLoss: state.portfolio.realizedGainLoss + realizedGain
          }
        };
      }

    case ACTIONS.UPDATE_STOCK_PRICES:
      {
        const updatedStocks = action.payload;
        return {
          ...state,
          stocks: state.stocks.map(stock => {
            const update = updatedStocks.find(u => u.id === stock.id);
            return update ? { ...stock, ...update } : stock;
          })
        };
      }

    case ACTIONS.UPDATE_PORTFOLIO:
      return {
        ...state,
        portfolio: { ...state.portfolio, ...action.payload }
      };

    default:
      return state;
  }
}

const GameContext = createContext();

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Comprehensive action creators with clear intent
  const actions = {
    // Studio management
    setStudioLevel: (level) => dispatch({
      type: ACTIONS.SET_STUDIO_LEVEL,
      payload: level
    }),

    // Time management
    updateTime: (timeUpdate) => dispatch({
      type: ACTIONS.UPDATE_TIME,
      payload: timeUpdate
    }),

    // Project management
    addProject: (project) => dispatch({
      type: ACTIONS.ADD_PROJECT,
      payload: project
    }),

    updateProject: (id, updates) => dispatch({
      type: ACTIONS.UPDATE_PROJECT,
      payload: { id, updates }
    }),

    completeProject: (project) => dispatch({
      type: ACTIONS.COMPLETE_PROJECT,
      payload: project
    }),

    deleteProject: (id) => dispatch({
      type: ACTIONS.DELETE_PROJECT,
      payload: id
    }),

    // Employee management
    hireEmployee: (employee) => dispatch({
      type: ACTIONS.HIRE_EMPLOYEE,
      payload: employee
    }),

    fireEmployee: (id) => dispatch({
      type: ACTIONS.FIRE_EMPLOYEE,
      payload: id
    }),

    updateEmployee: (id, updates) => dispatch({
      type: ACTIONS.UPDATE_EMPLOYEE,
      payload: { id, updates }
    }),

    // Finance management
    updateFinances: (financeUpdate) => dispatch({
      type: ACTIONS.UPDATE_FINANCE,
      payload: financeUpdate
    }),

    // Studio stats
    updateMorale: (morale) => dispatch({
      type: ACTIONS.UPDATE_MORALE,
      payload: morale
    }),

    updateReputation: (reputation) => dispatch({
      type: ACTIONS.UPDATE_REPUTATION,
      payload: reputation
    }),

    // Notifications
    addNotification: (notification) => {
      const id = crypto.randomUUID();
      dispatch({
        type: ACTIONS.ADD_NOTIFICATION,
        payload: { ...notification, id }
      });
      return id;
    },

    removeNotification: (id) => dispatch({
      type: ACTIONS.REMOVE_NOTIFICATION,
      payload: id
    }),

    // Achievements and unlocks
    unlockAchievement: (achievement) => dispatch({
      type: ACTIONS.UNLOCK_ACHIEVEMENT,
      payload: achievement
    }),

    unlockPlatform: (platformId) => dispatch({
      type: ACTIONS.UNLOCK_PLATFORM,
      payload: platformId
    }),

    unlockGenre: (genreId) => dispatch({
      type: ACTIONS.UNLOCK_GENRE,
      payload: genreId
    }),

    unlockTechnology: (tech) => dispatch({
      type: ACTIONS.UNLOCK_TECHNOLOGY,
      payload: tech
    }),

    // Game settings
    toggleGameSpeed: (speed) => dispatch({
      type: ACTIONS.TOGGLE_GAME_SPEED,
      payload: speed
    }),

    // Statistics
    updateStats: (stats) => dispatch({
      type: ACTIONS.UPDATE_STATS,
      payload: stats
    }),

    // Stock market management
    buyStock: (stockId, quantity, price) => dispatch({
      type: ACTIONS.BUY_STOCK,
      payload: { stockId, quantity, price }
    }),

    sellStock: (stockId, quantity, price) => dispatch({
      type: ACTIONS.SELL_STOCK,
      payload: { stockId, quantity, price }
    }),

    updateStockPrices: (stockUpdates) => dispatch({
      type: ACTIONS.UPDATE_STOCK_PRICES,
      payload: stockUpdates
    }),

    updatePortfolio: (portfolioUpdate) => dispatch({
      type: ACTIONS.UPDATE_PORTFOLIO,
      payload: portfolioUpdate
    }),

    // Game management
    resetGame: () => dispatch({
      type: ACTIONS.RESET_GAME
    })
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