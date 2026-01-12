/**
 * Pure functions for time-related calculations
 * These functions handle game time advancement without side effects
 */

import { GAME_MECHANICS } from '../config/gameConstants.js';

/**
 * Calculate new game date after time advancement
 * @param {Object} currentDate - Current game date {day, month, year}
 * @param {number} dayProgress - Progress to advance (fraction of a day)
 * @returns {Object} New game date or null if no change needed
 */
export const calculateNewGameDate = (currentDate, dayProgress) => {
  const totalDays = currentDate.day + dayProgress;

  let newDay = Math.floor(totalDays);
  let newMonth = currentDate.month;
  let newYear = currentDate.year;

  // Handle month/year transitions
  while (newDay > GAME_MECHANICS.DAYS_PER_MONTH) {
    newDay -= GAME_MECHANICS.DAYS_PER_MONTH;
    newMonth++;
    if (newMonth > GAME_MECHANICS.MONTHS_PER_YEAR) {
      newMonth = 1;
      newYear++;
    }
  }

  // Only return new date if day actually changed
  if (Math.floor(totalDays) !== currentDate.day || newMonth !== currentDate.month || newYear !== currentDate.year) {
    return {
      day: Math.max(1, newDay),
      month: newMonth,
      year: newYear
    };
  }

  return null; // No change needed
};

/**
 * Calculate time step with non-linear scaling
 * @param {number} gameTickDelta - Raw game tick delta in milliseconds
 * @param {number} gameSpeed - Current game speed multiplier
 * @returns {number} Calculated time step
 */
export const calculateTimeStep = (gameTickDelta, gameSpeed) => {
  // Non-linear time scaling to prevent abrupt speed changes
  return Math.max(0, (gameTickDelta / 1000) * Math.pow(gameSpeed, 0.75));
};

/**
 * Calculate day progress from time step
 * @param {number} timeStep - Time step in seconds
 * @returns {number} Day progress (fraction of a day)
 */
export const calculateDayProgress = (timeStep) => {
  const daysPerSecond = GAME_MECHANICS.GAME_DAYS_PER_REAL_SECOND;
  return Math.max(0, timeStep * daysPerSecond);
};

/**
 * Calculate speed-adjusted frame buffer
 * @param {number} fixedTimeStep - Fixed time step in milliseconds
 * @param {number} gameSpeed - Current game speed multiplier
 * @returns {number} Speed-adjusted buffer size
 */
export const calculateSpeedAdjustedBuffer = (fixedTimeStep, gameSpeed) => {
  // More intelligent speed buffer with exponential falloff
  return fixedTimeStep * (10 * Math.log2(gameSpeed + 1));
};

/**
 * Calculate maximum iterations for game loop
 * @param {number} gameSpeed - Current game speed multiplier
 * @returns {number} Maximum iterations to prevent slowdown
 */
export const calculateMaxIterations = (gameSpeed) => {
  // Logarithmic iteration limit to prevent game slowdown
  return Math.max(3, Math.floor(Math.log2(gameSpeed + 1) * 3));
};

/**
 * Calculate daily expenses for all employees
 * @param {Array} employees - Array of employees
 * @param {number} dayProgress - Progress of the day (fraction)
 * @returns {number} Total daily expenses
 */
export const calculateDailyExpenses = (employees, dayProgress) => {
  const dailyExpenses = employees.reduce((total, emp) => {
    return total + (emp.salary / GAME_MECHANICS.DAYS_PER_MONTH);
  }, 0) * dayProgress;

  return dailyExpenses;
};

/**
 * Check if enough time has passed to warrant a significant update
 * @param {number} deltaTime - Time delta in milliseconds
 * @param {number} threshold - Threshold in milliseconds (default: 5000)
 * @returns {boolean} Whether the delta time is within acceptable limits
 */
export const isValidTimeDelta = (deltaTime, threshold = 5000) => {
  return deltaTime <= threshold;
};