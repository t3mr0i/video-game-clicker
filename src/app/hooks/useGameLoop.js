/**
 * Refactored game loop hook with extracted utility functions
 * This replaces the monolithic useGameLoop with a more maintainable structure
 */

'use client'
import { useEffect, useRef, useCallback } from 'react';
import { useGameContext } from '../contexts/GameContext';
import { GAME_MECHANICS } from '../config/gameConstants';

// Import utility functions
import { advanceGameTime, calculateTimeStep, getFrameLimits } from '../utils/gameLogic/timeManager';
import { processProjectAdvancement, calculateProjectRevenue } from '../utils/gameLogic/projectManager';
import { calculateMoraleChanges, calculateDailyExpenses } from '../utils/gameLogic/moraleManager';
import { checkForNewAchievements } from '../utils/gameLogic/achievementManager';
import {
  processStockPriceFluctuations,
  processDividendPayments,
  checkPriceAlerts,
  processMarketEvents
} from '../utils/gameLogic/stockManager';

export function useGameLoop() {
  const { state, actions } = useGameContext();
  const gameLoopRef = useRef(null);
  const lastUpdateRef = useRef(Date.now());
  const frameAccumulator = useRef(0);
  const fixedTimeStep = useRef(1000 / 60); // 60 FPS fixed timestep
  const maxFrameTime = useRef(50); // Cap frame time to prevent spiral of death

  /**
   * Main game tick processor - handles frame accumulation and tick execution
   */
  const processGameTick = useCallback(() => {
    const now = Date.now();
    const deltaTime = Math.min(now - lastUpdateRef.current, maxFrameTime.current);
    lastUpdateRef.current = now;

    // Skip if game is paused or tab was inactive too long
    if (state.gameSpeed === 0 || deltaTime > 5000) return;

    const { speedAdjustedBuffer, maxIterations } = getFrameLimits(state.gameSpeed, fixedTimeStep.current);

    // Prevent excessive accumulation with speed-adjusted buffer
    frameAccumulator.current = Math.min(frameAccumulator.current + deltaTime, speedAdjustedBuffer);

    let iterations = 0;

    while (frameAccumulator.current >= fixedTimeStep.current && iterations < maxIterations) {
      const dayProgress = calculateTimeStep(fixedTimeStep.current, state.gameSpeed);

      // Error handling for tick processing
      try {
        processGameUpdate(dayProgress);
      } catch (error) {
        console.error('Game tick processing error:', error);
        break; // Exit loop on error to prevent game freeze
      }

      frameAccumulator.current -= fixedTimeStep.current;
      iterations++;
    }

    // Reset accumulator if iterations exceeded
    if (iterations === maxIterations) {
      frameAccumulator.current = 0;
    }
  }, [state.gameSpeed, state.currentDate, state.projects, state.employees, state.money, state.stocks]);

  /**
   * Processes a single game update tick
   */
  const processGameUpdate = useCallback((dayProgress) => {
    // Advance time
    const newDate = advanceGameTime(state.currentDate, dayProgress);
    if (newDate) {
      actions.updateTime(newDate);
    }

    // Process automatic game actions
    processAutomaticActions(dayProgress);
  }, [state.currentDate, actions]);

  /**
   * Processes all automatic game actions for a tick
   */
  const processAutomaticActions = useCallback((dayProgress) => {
    const changes = {
      projectUpdates: [],
      completedProjects: [],
      notifications: [],
      financialChanges: 0,
      moraleChanges: 0,
      achievements: []
    };

    // Process project advancement
    processProjects(changes, dayProgress);

    // Process daily expenses
    const dailyExpenses = calculateDailyExpenses(state.employees, dayProgress);
    if (dailyExpenses > 0) {
      changes.financialChanges -= dailyExpenses;
    }

    // Process morale changes
    const moraleChange = calculateMoraleChanges(state, dayProgress);
    if (Math.abs(moraleChange) > 0.1) {
      changes.moraleChanges = moraleChange;
    }

    // Check for achievements
    changes.achievements = checkForNewAchievements(state);

    // Process stock market features
    processStockMarket(dayProgress);

    // Apply all batched changes
    applyBatchedChanges(changes);
  }, [state, actions]);

  /**
   * Processes project advancement and completion
   */
  const processProjects = useCallback((changes, dayProgress) => {
    const activeProjects = (state.projects || []).filter(p => p.status === 'in-progress');

    activeProjects.forEach(project => {
      const assignedEmployees = (state.employees || []).filter(emp => emp.assignedProjectId === project.id);
      const advancement = processProjectAdvancement(project, assignedEmployees, dayProgress, state.morale);

      if (advancement) {
        changes.projectUpdates.push(advancement);

        // Handle project completion
        if (advancement.isComplete) {
          const revenue = calculateProjectRevenue(project, state);
          changes.completedProjects.push({
            ...project,
            progress: 100,
            revenue,
            completedDate: state.currentDate
          });

          changes.notifications.push({
            message: `Project "${project.name}" completed! Revenue: $${revenue.toLocaleString()}`,
            type: 'success'
          });

          changes.financialChanges += revenue;
        }
      }
    });
  }, [state.projects, state.employees, state.morale, state.currentDate]);

  /**
   * Processes stock market features
   */
  const processStockMarket = useCallback((dayProgress) => {
    // Process stock price fluctuations
    const stockUpdates = processStockPriceFluctuations(state.stocks, state, dayProgress);
    if (stockUpdates.length > 0) {
      actions.updateStockPrices(stockUpdates);
    }

    // Process dividend payments
    const dividendPayments = processDividendPayments(state.portfolio, state.stocks);
    dividendPayments.forEach(payment => {
      actions.payDividends(payment.stockId, payment.amount);
      actions.addNotification({
        message: `Received $${payment.amount.toFixed(2)} dividend from ${payment.symbol}`,
        type: 'success'
      });
    });

    if (dividendPayments.length > 0) {
      actions.updatePortfolio({ lastDividendCheck: new Date().toISOString() });
    }

    // Check price alerts
    const triggeredAlerts = checkPriceAlerts(state.portfolio.priceAlerts, state.stocks);
    triggeredAlerts.forEach(({ alert, message }) => {
      actions.addNotification({
        message,
        type: 'warning'
      });
      actions.removePriceAlert(alert.id);
    });

    // Process market events
    const marketEvent = processMarketEvents(state.stocks, dayProgress);
    if (marketEvent) {
      actions.updateStockPrices(marketEvent.stockUpdates);
      actions.triggerMarketEvent(marketEvent.event);
      actions.addNotification({
        message: `📈 Market Event: ${marketEvent.event.title}`,
        type: 'info'
      });
    }
  }, [state.stocks, state.portfolio, actions]);

  /**
   * Applies all batched changes to the game state
   */
  const applyBatchedChanges = useCallback((changes) => {
    // Apply project updates
    changes.projectUpdates.forEach(update => {
      actions.updateProject(update.id, update.updates);
    });

    // Complete projects
    changes.completedProjects.forEach(project => {
      actions.completeProject(project);
    });

    // Add notifications
    changes.notifications.forEach(notification => {
      actions.addNotification(notification);
    });

    // Update finances
    if (Math.abs(changes.financialChanges) > 0.01) {
      actions.updateFinances({ amount: changes.financialChanges });
    }

    // Update morale
    if (changes.moraleChanges !== 0) {
      const newMorale = Math.max(0, Math.min(100, state.morale + changes.moraleChanges));
      actions.updateMorale(newMorale);
    }

    // Unlock achievements
    changes.achievements.forEach(achievement => {
      actions.unlockAchievement(achievement);
    });
  }, [actions, state.morale]);

  /**
   * Start/stop game loop based on game speed
   */
  useEffect(() => {
    // Clear any existing interval
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
      gameLoopRef.current = null;
    }

    // Reset frame accumulator when starting/stopping
    frameAccumulator.current = 0;
    lastUpdateRef.current = Date.now();

    if (state.gameSpeed > 0) {
      gameLoopRef.current = setInterval(processGameTick, fixedTimeStep.current);
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
    };
  }, [state.gameSpeed, processGameTick]);

  /**
   * Performance monitoring
   */
  const getPerformanceStats = useCallback(() => {
    return {
      frameTime: fixedTimeStep.current,
      maxFrameTime: maxFrameTime.current,
      accumulatedTime: frameAccumulator.current,
      isRunning: state.gameSpeed > 0,
      speed: state.gameSpeed
    };
  }, [state.gameSpeed]);

  return {
    isRunning: state.gameSpeed > 0,
    currentSpeed: state.gameSpeed,
    getPerformanceStats
  };
}