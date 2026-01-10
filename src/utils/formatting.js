// Utility functions for formatting and common operations

/**
 * Format a number with currency-like formatting
 * @param {number} num - Number to format
 * @returns {string} Formatted number string
 */
export const formatNumber = (num) =>
  num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });

/**
 * Generate a unique ID
 * @returns {string} Unique identifier
 */
export const generateUniqueId = () =>
  crypto.randomUUID();

/**
 * Create a random subset of items
 * @param {Array} arr - Source array
 * @param {number} count - Number of items to select
 * @returns {Array} Randomly selected items
 */
export const getRandomSubset = (arr, count) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, arr.length));
};

/**
 * Safely check if we're in browser environment
 * @returns {boolean} Whether code is running in browser
 */
export const isBrowser = () => typeof window !== 'undefined';

/**
 * Safely log messages in development
 * @param {string} level - Log level (log, warn, error)
 * @param {*} args - Arguments to log
 */
export const safeLog = (level, ...args) => {
  if (process.env.NODE_ENV === 'development' && isBrowser()) {
    console[level](...args);
  }
};

/**
 * Debounce a function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};