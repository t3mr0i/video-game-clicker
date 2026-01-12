/**
 * Main game logic processor that coordinates all game calculations
 * This module processes a complete game tick and returns changes to be applied
 */

import {
  calculateProjectProgress,
  calculateProjectRevenue,
  shouldCompleteProject,
  calculateWorkloadRatio
} from './projectCalculations.js';

import {
  calculateMoraleChanges,
  applyMoraleBounds
} from './moraleCalculations.js';

import {
  calculateNewGameDate,
  calculateDailyExpenses
} from './timeCalculations.js';

import {
  checkForNewAchievements
} from './achievementCalculations.js';

import {
  processStockPriceFluctuations,
  calculateDividendPayment,
  shouldPayDividends,
  checkStockPriceAlerts,
  generateMarketEvents
} from './stockCalculations.js';

/**
 * Process automatic game actions for a time period
 * @param {Object} gameState - Current game state
 * @param {number} dayProgress - Progress of the day (fraction)
 * @returns {Object} Changes to be applied to the game state
 */
export const processGameTick = (gameState, dayProgress) => {
  const changes = {
    timeUpdates: null,
    projectUpdates: [],
    completedProjects: [],
    notifications: [],
    financialChanges: 0,
    moraleChanges: 0,
    achievements: [],
    stockUpdates: [],
    dividendPayments: [],
    triggeredAlerts: [],
    marketEvents: []
  };

  // Process time advancement
  const newDate = calculateNewGameDate(gameState.currentDate, dayProgress);
  if (newDate) {
    changes.timeUpdates = newDate;
  }

  // Process project advancement
  const activeProjects = (gameState.projects || []).filter(p => p.status === 'in-progress');
  activeProjects.forEach(project => {
    const assignedEmployees = (gameState.employees || []).filter(emp => emp.assignedProjectId === project.id);

    if (assignedEmployees.length > 0) {
      const progressIncrement = calculateProjectProgress(
        project,
        assignedEmployees,
        gameState.morale || 50,
        dayProgress
      );

      const newProgress = Math.min(100, project.progress + progressIncrement);

      // Only update if progress changed significantly
      if (Math.abs(newProgress - project.progress) > 0.01) {
        changes.projectUpdates.push({
          id: project.id,
          updates: { progress: newProgress }
        });

        // Auto-complete if progress reaches 100%
        if (shouldCompleteProject(project, newProgress)) {
          const revenue = calculateProjectRevenue(project, gameState.morale || 50);
          const completedProject = {
            ...project,
            progress: 100,
            revenue,
            completedDate: gameState.currentDate
          };

          changes.completedProjects.push(completedProject);
          changes.notifications.push({
            message: `Project "${project.name}" completed! Revenue: $${revenue.toLocaleString()}`,
            type: 'success'
          });
          changes.financialChanges += revenue;
        }
      }
    }
  });

  // Process daily expenses (employee salaries)
  const dailyExpenses = calculateDailyExpenses(gameState.employees || [], dayProgress);
  if (dailyExpenses > 0) {
    changes.financialChanges -= dailyExpenses;
  }

  // Process morale changes
  const moraleChange = calculateMoraleChanges(gameState, dayProgress);
  if (Math.abs(moraleChange) > 0.1) {
    changes.moraleChanges = moraleChange;
  }

  // Check for achievements
  const newAchievements = checkForNewAchievements(gameState, gameState.achievements || []);
  changes.achievements = newAchievements;

  // Process stock market
  const stockUpdates = processStockPriceFluctuations(
    gameState.stocks || [],
    gameState,
    dayProgress
  );
  if (stockUpdates) {
    changes.stockUpdates = stockUpdates;
  }

  // Process dividend payments
  if (gameState.portfolio && gameState.portfolio.holdings.length > 0) {
    const dividendPayments = processDividendPayments(gameState);
    changes.dividendPayments = dividendPayments;

    // Add dividend income to financial changes
    const totalDividends = dividendPayments.reduce((sum, payment) => sum + payment.amount, 0);
    changes.financialChanges += totalDividends;
  }

  // Check price alerts
  if (gameState.portfolio && gameState.portfolio.priceAlerts.length > 0) {
    const triggeredAlerts = processePriceAlerts(gameState);
    changes.triggeredAlerts = triggeredAlerts;

    // Add notifications for triggered alerts
    triggeredAlerts.forEach(alert => {
      const stock = gameState.stocks.find(s => s.id === alert.stockId);
      if (stock) {
        changes.notifications.push({
          message: `Price alert: ${stock.symbol} reached $${alert.actualPrice.toFixed(2)}`,
          type: 'info'
        });
      }
    });
  }

  // Generate market events
  const marketEvents = generateMarketEvents(gameState, dayProgress);
  changes.marketEvents = marketEvents;

  // Add market event notifications
  marketEvents.forEach(event => {
    changes.notifications.push({
      message: event.message,
      type: 'warning'
    });
  });

  return changes;
};

/**
 * Process dividend payments for portfolio holdings
 * @param {Object} gameState - Current game state
 * @returns {Array} Array of dividend payment objects
 */
export const processDividendPayments = (gameState) => {
  if (!gameState.portfolio || !gameState.portfolio.holdings.length) return [];

  const payments = [];
  const currentTime = new Date();

  gameState.portfolio.holdings.forEach(holding => {
    const stock = gameState.stocks.find(s => s.id === holding.stockId);
    if (!stock || !stock.dividendYield) return;

    const lastPayment = holding.lastDividendDate ? new Date(holding.lastDividendDate) : null;

    if (shouldPayDividends(lastPayment, gameState.currentDate)) {
      const dividendAmount = calculateDividendPayment(stock, holding);

      if (dividendAmount > 0) {
        payments.push({
          holdingId: holding.id,
          stockId: stock.id,
          stockSymbol: stock.symbol,
          amount: dividendAmount,
          date: currentTime,
          sharesOwned: holding.quantity
        });
      }
    }
  });

  return payments;
};

/**
 * Process price alerts and return triggered alerts
 * @param {Object} gameState - Current game state
 * @returns {Array} Array of triggered alert objects
 */
export const processePriceAlerts = (gameState) => {
  if (!gameState.portfolio || !gameState.portfolio.priceAlerts.length) return [];

  const triggeredAlerts = [];

  gameState.stocks.forEach(stock => {
    const alerts = checkStockPriceAlerts(stock, gameState.portfolio.priceAlerts);
    triggeredAlerts.push(...alerts);
  });

  return triggeredAlerts;
};

/**
 * Calculate performance metrics for the current game state
 * @param {Object} gameState - Current game state
 * @returns {Object} Performance metrics
 */
export const calculatePerformanceMetrics = (gameState) => {
  const metrics = {
    totalRevenue: 0,
    totalProjects: 0,
    averageProjectRevenue: 0,
    employeeEfficiency: 0,
    portfolioValue: 0,
    portfolioGainLoss: 0,
    monthlyBurnRate: 0,
    runwayMonths: 0
  };

  // Project metrics
  const completedProjects = gameState.completedProjects || [];
  metrics.totalProjects = completedProjects.length;
  metrics.totalRevenue = completedProjects.reduce((sum, p) => sum + (p.revenue || 0), 0);
  metrics.averageProjectRevenue = metrics.totalProjects > 0
    ? metrics.totalRevenue / metrics.totalProjects
    : 0;

  // Employee efficiency
  const employees = gameState.employees || [];
  if (employees.length > 0) {
    const avgProductivity = employees.reduce((sum, emp) => sum + (emp.productivity || 1), 0) / employees.length;
    const workloadRatio = calculateWorkloadRatio(
      (gameState.projects || []).filter(p => p.status === 'in-progress'),
      employees
    );
    metrics.employeeEfficiency = avgProductivity * Math.max(0.5, 1 - Math.max(0, workloadRatio - 1));
  }

  // Portfolio metrics
  if (gameState.portfolio && gameState.portfolio.holdings.length > 0) {
    metrics.portfolioValue = gameState.portfolio.holdings.reduce((total, holding) => {
      const stock = gameState.stocks.find(s => s.id === holding.stockId);
      return total + (stock ? stock.currentPrice * holding.quantity : 0);
    }, 0);

    metrics.portfolioGainLoss = metrics.portfolioValue - (gameState.portfolio.totalInvested || 0);
  }

  // Financial runway
  const monthlyExpenses = employees.reduce((total, emp) => total + (emp.salary || 0), 0);
  metrics.monthlyBurnRate = monthlyExpenses;
  metrics.runwayMonths = monthlyExpenses > 0 ? (gameState.money || 0) / monthlyExpenses : Infinity;

  return metrics;
};