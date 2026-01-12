/**
 * Refactored game loop hook that uses pure game logic functions
 * This version separates React concerns from game logic for better testability
 */

'use client'
import { useEffect, useRef, useCallback } from 'react';
import { useGameContext } from '../contexts/GameContext';
import { GAME_MECHANICS } from '../config/gameConstants';
import {
  calculateTimeStep,
  calculateDayProgress,
  calculateSpeedAdjustedBuffer,
  calculateMaxIterations,
  isValidTimeDelta
} from '../gameLogic/timeCalculations';
import { processGameTick } from '../gameLogic/gameTickProcessor';

export function useGameLoopRefactored() {
  const { state, actions } = useGameContext();
  const gameLoopRef = useRef(null);
  const lastUpdateRef = useRef(Date.now());
  const frameAccumulator = useRef(0);
  const fixedTimeStep = useRef(1000 / 60); // 60 FPS fixed timestep
  const maxFrameTime = useRef(50); // Cap frame time to prevent spiral of death

  /**
   * Main game tick processor
   * Now much cleaner since complex logic is extracted to pure functions
   */
  const processGameTickReact = useCallback(() => {
    const now = Date.now();
    const deltaTime = Math.min(now - lastUpdateRef.current, maxFrameTime.current);
    lastUpdateRef.current = now;

    // Skip if game is paused
    if (state.gameSpeed === 0) return;

    // Skip if tab was inactive for too long
    if (!isValidTimeDelta(deltaTime)) return;

    // Calculate speed-adjusted buffer
    const speedAdjustedBuffer = calculateSpeedAdjustedBuffer(fixedTimeStep.current, state.gameSpeed);
    frameAccumulator.current = Math.min(frameAccumulator.current + deltaTime, speedAdjustedBuffer);

    let iterations = 0;
    const maxIterations = calculateMaxIterations(state.gameSpeed);

    while (frameAccumulator.current >= fixedTimeStep.current && iterations < maxIterations) {
      const gameTickDelta = fixedTimeStep.current;
      const timeStep = calculateTimeStep(gameTickDelta, state.gameSpeed);
      const dayProgress = calculateDayProgress(timeStep);

      // Error handling for tick processing
      try {
        processGameActions(dayProgress);
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
  }, [state.gameSpeed]);

  /**
   * Process game actions using pure game logic functions
   * This function handles applying changes returned by the game logic
   */
  const processGameActions = useCallback((dayProgress) => {
    // Get changes from pure game logic
    const changes = processGameTick(state, dayProgress);

    // Apply time updates
    if (changes.timeUpdates) {
      actions.updateTime(changes.timeUpdates);
    }

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

    // Update stock prices
    if (changes.stockUpdates.length > 0) {
      actions.updateStockPrices(changes.stockUpdates);
    }

    // Process dividend payments
    changes.dividendPayments.forEach(payment => {
      actions.processDividendPayment(payment);
    });

    // Handle triggered price alerts
    changes.triggeredAlerts.forEach(alert => {
      actions.triggerPriceAlert(alert.id);
    });

    // Process market events
    changes.marketEvents.forEach(event => {
      actions.addMarketEvent(event);
    });
  }, [state, actions]);

  /**
   * Start the game loop
   */
  const startGameLoop = useCallback(() => {
    if (gameLoopRef.current) return; // Already running

    const loop = () => {
      processGameTickReact();
      gameLoopRef.current = requestAnimationFrame(loop);
    };

    gameLoopRef.current = requestAnimationFrame(loop);
  }, [processGameTickReact]);

  /**
   * Stop the game loop
   */
  const stopGameLoop = useCallback(() => {
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
      gameLoopRef.current = null;
    }
  }, []);

  /**
   * Toggle game loop on/off based on game speed
   */
  useEffect(() => {
    if (state.gameSpeed > 0) {
      startGameLoop();
    } else {
      stopGameLoop();
    }

    // Cleanup on unmount
    return () => stopGameLoop();
  }, [state.gameSpeed, startGameLoop, stopGameLoop]);

  return {
    isRunning: state.gameSpeed > 0,
    currentSpeed: state.gameSpeed,
    startGameLoop,
    stopGameLoop
  };
}