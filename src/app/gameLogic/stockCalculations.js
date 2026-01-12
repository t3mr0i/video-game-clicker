/**
 * Pure functions for stock market calculations
 * These functions handle stock price movements, dividends, and market dynamics without side effects
 */

/**
 * Calculate stock price change based on volatility and trend
 * @param {Object} stock - Stock object with currentPrice, volatility, and trend
 * @returns {number} New stock price
 */
export const calculateStockPriceChange = (stock) => {
  const volatility = stock.volatility || 0.03;

  // Random walk with trend influence
  const randomFactor = (Math.random() - 0.5) * 2; // -1 to 1
  const trendFactor = (stock.trend - 1.0) * 0.5; // Trend bias

  // Combine random and trend for price change
  const priceChangePercent = (randomFactor + trendFactor) * volatility;

  // Calculate new price (with minimum floor of $1.00)
  return Math.max(1.0, stock.currentPrice * (1 + priceChangePercent));
};

/**
 * Update stock trend based on price movement (momentum effect)
 * @param {Object} stock - Stock object
 * @param {number} priceChangePercent - Price change percentage
 * @returns {number} New trend value
 */
export const calculateNewTrend = (stock, priceChangePercent) => {
  const momentumFactor = priceChangePercent > 0 ? 1.001 : 0.999;
  return Math.max(0.95, Math.min(1.05, stock.trend * momentumFactor));
};

/**
 * Calculate sector influence on stock price
 * @param {Object} stock - Stock object
 * @param {Object} gameState - Current game state
 * @returns {number} Sector influence factor
 */
export const calculateSectorInfluence = (stock, gameState) => {
  let sectorInfluence = 0;

  switch (stock.sector) {
    case 'gaming':
      sectorInfluence = calculateGamingSectorInfluence(gameState);
      break;
    case 'tech':
      sectorInfluence = calculateTechSectorInfluence(gameState);
      break;
    case 'hardware':
      sectorInfluence = calculateHardwareSectorInfluence(gameState);
      break;
    case 'media':
      sectorInfluence = calculateMediaSectorInfluence(gameState);
      break;
    case 'crypto':
      sectorInfluence = calculateCryptoSectorInfluence(gameState);
      break;
    default:
      sectorInfluence = 0;
  }

  return sectorInfluence;
};

/**
 * Calculate gaming sector influence based on recent project success
 * @param {Object} gameState - Current game state
 * @returns {number} Gaming sector influence
 */
export const calculateGamingSectorInfluence = (gameState) => {
  // Filter projects from last 3 months (simplified calculation)
  const recentProjects = (gameState.completedProjects || []).filter(p => {
    if (!p.completedDate) return false;
    const projectDate = new Date(p.completedDate);
    const cutoffDate = new Date();
    cutoffDate.setMonth(cutoffDate.getMonth() - 3);
    return projectDate >= cutoffDate;
  });

  if (recentProjects.length === 0) return 0;

  const avgSuccess = recentProjects.reduce((sum, p) => sum + (p.revenue || 0), 0) / recentProjects.length;
  return avgSuccess > 100000 ? 0.002 : -0.001;
};

/**
 * Calculate tech sector influence based on studio growth and technology adoption
 * @param {Object} gameState - Current game state
 * @returns {number} Tech sector influence
 */
export const calculateTechSectorInfluence = (gameState) => {
  const studioGrowthFactor = (gameState.employees || []).length / 10;
  const technologyUnlocks = (gameState.platforms || []).filter(p => p.unlocked).length;
  return (studioGrowthFactor + technologyUnlocks) * 0.0001;
};

/**
 * Calculate hardware sector influence based on platform diversity and AAA development
 * @param {Object} gameState - Current game state
 * @returns {number} Hardware sector influence
 */
export const calculateHardwareSectorInfluence = (gameState) => {
  const platformDiversity = (gameState.platforms || []).filter(p => p.unlocked).length;
  const aaaProjects = (gameState.completedProjects || []).filter(p => p.size === 3).length;
  return (platformDiversity * 0.0002) + (aaaProjects * 0.0005);
};

/**
 * Calculate media sector influence based on reputation
 * @param {Object} gameState - Current game state
 * @returns {number} Media sector influence
 */
export const calculateMediaSectorInfluence = (gameState) => {
  const reputationFactor = ((gameState.reputation || 50) - 50) / 100;
  return reputationFactor * 0.001;
};

/**
 * Calculate crypto sector influence with tech correlation and extra volatility
 * @param {Object} gameState - Current game state
 * @returns {number} Crypto sector influence
 */
export const calculateCryptoSectorInfluence = (gameState) => {
  const techStocks = (gameState.stocks || []).filter(s => s.sector === 'tech');
  if (techStocks.length === 0) return 0;

  const avgTechTrend = techStocks.reduce((sum, s) => sum + s.trend, 0) / techStocks.length;
  let influence = (avgTechTrend - 1.0) * 0.002;

  // Add extra crypto volatility
  const extraVolatility = (Math.random() - 0.5) * 0.01;
  influence += extraVolatility;

  return influence;
};

/**
 * Update historical prices array
 * @param {Array} historicalPrices - Current historical prices array
 * @param {number} newPrice - New price to add
 * @param {number} maxHistory - Maximum number of prices to keep (default: 30)
 * @returns {Array} Updated historical prices array
 */
export const updateHistoricalPrices = (historicalPrices = [], newPrice, maxHistory = 30) => {
  const newPrices = [...historicalPrices, newPrice];
  if (newPrices.length > maxHistory) {
    newPrices.shift(); // Remove oldest price
  }
  return newPrices;
};

/**
 * Process stock price fluctuations for all stocks
 * @param {Array} stocks - Array of stock objects
 * @param {Object} gameState - Current game state
 * @param {number} dayProgress - Progress of the day (fraction)
 * @returns {Array|null} Array of stock updates or null if no updates needed
 */
export const processStockPriceFluctuations = (stocks, gameState, dayProgress) => {
  // Only update stock prices occasionally to prevent excessive volatility
  // Update roughly every game hour (1/24 of a day)
  const updateChance = dayProgress * 24; // Convert to hourly chance
  if (Math.random() > updateChance) return null;

  const stockUpdates = stocks.map(stock => {
    const newPrice = calculateStockPriceChange(stock);
    const priceChangePercent = (newPrice - stock.currentPrice) / stock.currentPrice;
    const newTrend = calculateNewTrend(stock, priceChangePercent);
    const sectorInfluence = calculateSectorInfluence(stock, gameState);

    const finalPrice = Math.max(1.0, newPrice * (1 + sectorInfluence));
    const newHistoricalPrices = updateHistoricalPrices(stock.historicalPrices, finalPrice);

    return {
      id: stock.id,
      currentPrice: parseFloat(finalPrice.toFixed(2)),
      trend: parseFloat(newTrend.toFixed(4)),
      historicalPrices: newHistoricalPrices
    };
  });

  return stockUpdates;
};

/**
 * Calculate dividend payment for a stock holding
 * @param {Object} stock - Stock object with dividend info
 * @param {Object} holding - Portfolio holding object
 * @returns {number} Dividend amount
 */
export const calculateDividendPayment = (stock, holding) => {
  if (!stock.dividendYield || stock.dividendYield <= 0) return 0;

  // Annual dividend per share
  const annualDividendPerShare = stock.currentPrice * stock.dividendYield;

  // Quarterly payment (assuming dividends paid quarterly)
  const quarterlyDividendPerShare = annualDividendPerShare / 4;

  return quarterlyDividendPerShare * holding.quantity;
};

/**
 * Check if dividends should be paid based on time elapsed
 * @param {Date} lastDividendDate - Date of last dividend payment
 * @param {Object} currentDate - Current game date
 * @returns {boolean} Whether dividends should be paid
 */
export const shouldPayDividends = (lastDividendDate, currentDate) => {
  if (!lastDividendDate) return true; // First time

  const monthsSinceLastPayment =
    (currentDate.year - lastDividendDate.getFullYear()) * 12 +
    (currentDate.month - (lastDividendDate.getMonth() + 1));

  return monthsSinceLastPayment >= 3; // Pay every 3 months
};

/**
 * Check price alerts for a stock
 * @param {Object} stock - Stock object
 * @param {Array} priceAlerts - Array of price alert objects
 * @returns {Array} Array of triggered alert objects
 */
export const checkStockPriceAlerts = (stock, priceAlerts = []) => {
  return priceAlerts.filter(alert => {
    if (alert.stockId !== stock.id || alert.triggered) return false;

    if (alert.direction === 'above' && stock.currentPrice >= alert.targetPrice) {
      return true;
    } else if (alert.direction === 'below' && stock.currentPrice <= alert.targetPrice) {
      return true;
    }

    return false;
  }).map(alert => ({
    ...alert,
    triggered: true,
    triggeredAt: Date.now(),
    actualPrice: stock.currentPrice
  }));
};

/**
 * Generate market events based on current conditions
 * @param {Object} gameState - Current game state
 * @param {number} dayProgress - Progress of the day (fraction)
 * @returns {Array} Array of market event objects
 */
export const generateMarketEvents = (gameState, dayProgress) => {
  const events = [];
  const eventChance = dayProgress * 0.1; // 10% chance per day

  if (Math.random() < eventChance) {
    const possibleEvents = [
      {
        type: 'tech_boom',
        message: 'Tech sector surge! Technology stocks are rising.',
        affectedSectors: ['tech'],
        impact: 0.05, // 5% positive impact
        duration: 3 // 3 game days
      },
      {
        type: 'gaming_crash',
        message: 'Gaming market correction. Gaming stocks decline.',
        affectedSectors: ['gaming'],
        impact: -0.03, // 3% negative impact
        duration: 2
      },
      {
        type: 'crypto_volatility',
        message: 'Cryptocurrency market experiencing high volatility.',
        affectedSectors: ['crypto'],
        impact: 0, // No direct impact, but increases volatility
        extraVolatility: 0.02,
        duration: 1
      },
      {
        type: 'hardware_shortage',
        message: 'Global hardware shortage affects component prices.',
        affectedSectors: ['hardware'],
        impact: -0.02,
        duration: 5
      }
    ];

    const randomEvent = possibleEvents[Math.floor(Math.random() * possibleEvents.length)];
    events.push({
      ...randomEvent,
      id: `${randomEvent.type}_${Date.now()}`,
      startDate: gameState.currentDate,
      endDate: {
        ...gameState.currentDate,
        day: gameState.currentDate.day + randomEvent.duration
      }
    });
  }

  return events;
};