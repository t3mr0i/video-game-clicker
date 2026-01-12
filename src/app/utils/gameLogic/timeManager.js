/**
 * Time management utilities for the game loop
 * Handles game time progression and calculations
 */

import { GAME_MECHANICS } from '../../config/gameConstants';

/**
 * Advances game time by the specified number of days
 * @param {Object} currentDate - Current game date {day, month, year}
 * @param {number} dayProgress - Number of days to advance
 * @returns {Object} New date object or null if no change needed
 */
export function advanceGameTime(currentDate, dayProgress) {
  let totalDays = currentDate.day + dayProgress;
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

  return null;
}

/**
 * Calculates the time step for game updates based on speed and delta time
 * @param {number} gameTickDelta - Time since last update in milliseconds
 * @param {number} gameSpeed - Current game speed multiplier
 * @returns {number} Time step in game days
 */
export function calculateTimeStep(gameTickDelta, gameSpeed) {
  // Non-linear time scaling to prevent abrupt speed changes
  const timeStep = Math.max(0, (gameTickDelta / 1000) * Math.pow(gameSpeed, 0.75));
  const daysPerSecond = GAME_MECHANICS.GAME_DAYS_PER_REAL_SECOND;
  return Math.max(0, timeStep * daysPerSecond);
}

/**
 * Calculates frame accumulation limits to prevent performance issues
 * @param {number} gameSpeed - Current game speed multiplier
 * @param {number} fixedTimeStep - Fixed timestep in milliseconds
 * @returns {Object} Accumulation limits and iteration caps
 */
export function getFrameLimits(gameSpeed, fixedTimeStep) {
  // More intelligent speed buffer with exponential falloff
  const speedAdjustedBuffer = fixedTimeStep * (10 * Math.log2(gameSpeed + 1));

  // Logarithmic iteration limit to prevent game slowdown
  const maxIterations = Math.max(3, Math.floor(Math.log2(gameSpeed + 1) * 3));

  return {
    speedAdjustedBuffer,
    maxIterations
  };
}