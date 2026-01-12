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

/**
 * Format a number as currency with $ sign and proper decimals
 * @param {number} amount - Amount to format
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, decimals = 2) => {
  return `$${Math.abs(amount).toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  })}`;
};

/**
 * Format a number as percentage with proper sign and decimals
 * @param {number} percent - Percentage value to format
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} Formatted percentage string
 */
export const formatPercentage = (percent, decimals = 2) => {
  return `${percent >= 0 ? '+' : ''}${percent.toFixed(decimals)}%`;
};

/**
 * Get appropriate color class based on value change
 * @param {number} value - Value to check (positive, negative, or zero)
 * @returns {string} Tailwind CSS color class
 */
export const getChangeColor = (value) => {
  if (value > 0) return 'text-green-400';
  if (value < 0) return 'text-red-400';
  return 'text-gray-400';
};

/**
 * Format large numbers with suffixes (K, M, B, T)
 * @param {number} num - Number to format
 * @param {number} decimals - Number of decimal places (default: 1)
 * @returns {string} Formatted number string
 */
export const formatNumberWithSuffix = (num, decimals = 1) => {
  const absNum = Math.abs(num);
  const sign = num < 0 ? '-' : '';

  if (absNum >= 1e12) {
    return sign + (absNum / 1e12).toFixed(decimals) + 'T';
  } else if (absNum >= 1e9) {
    return sign + (absNum / 1e9).toFixed(decimals) + 'B';
  } else if (absNum >= 1e6) {
    return sign + (absNum / 1e6).toFixed(decimals) + 'M';
  } else if (absNum >= 1e3) {
    return sign + (absNum / 1e3).toFixed(decimals) + 'K';
  }
  return num.toString();
};

/**
 * Format currency with large number suffixes for compact display
 * @param {number} amount - Amount to format
 * @param {number} decimals - Number of decimal places (default: 1)
 * @returns {string} Formatted currency string with suffix
 */
export const formatCurrencyCompact = (amount, decimals = 1) => {
  return `$${formatNumberWithSuffix(amount, decimals)}`;
};

/**
 * Calculate and format gain/loss information
 * @param {number} currentValue - Current value
 * @param {number} originalValue - Original value
 * @returns {Object} Object with formatted gain/loss info
 */
export const calculateGainLoss = (currentValue, originalValue) => {
  const amount = currentValue - originalValue;
  const percent = originalValue > 0 ? (amount / originalValue) * 100 : 0;
  const isGain = amount >= 0;

  return {
    amount: Math.abs(amount),
    percent: Math.abs(percent),
    isGain,
    formattedAmount: formatCurrency(Math.abs(amount)),
    formattedPercent: formatPercentage(percent),
    colorClass: getChangeColor(amount)
  };
};

/**
 * Format time duration in a human readable way
 * @param {number} seconds - Duration in seconds
 * @returns {string} Formatted duration string
 */
export const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  } else {
    return `${secs}s`;
  }
};