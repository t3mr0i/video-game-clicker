/**
 * Stock market management utilities for the game loop
 * Handles stock price fluctuations, dividends, alerts, and market events
 */

/**
 * Processes stock price fluctuations based on market conditions and game state
 * @param {Array} stocks - Current stock list
 * @param {Object} gameState - Current game state
 * @param {number} dayProgress - Days to process
 * @returns {Array} Stock updates to apply
 */
export function processStockPriceFluctuations(stocks, gameState, dayProgress) {
  // Only update stock prices occasionally to prevent excessive volatility
  // Update roughly every game hour (1/24 of a day)
  const updateChance = dayProgress * 24; // Convert to hourly chance
  if (Math.random() > updateChance) return [];

  return stocks.map(stock => {
    // Base volatility affects price movement range
    const volatility = stock.volatility || 0.03;

    // Random walk with trend influence
    const randomFactor = (Math.random() - 0.5) * 2; // -1 to 1
    const trendFactor = (stock.trend - 1.0) * 0.5; // Trend bias

    // Combine random and trend for price change
    const priceChangePercent = (randomFactor + trendFactor) * volatility;

    // Calculate new price (with minimum floor of $1.00)
    const newPrice = Math.max(1.0, stock.currentPrice * (1 + priceChangePercent));

    // Update trend based on price movement (momentum effect)
    const momentumFactor = priceChangePercent > 0 ? 1.001 : 0.999;
    const newTrend = Math.max(0.95, Math.min(1.05, stock.trend * momentumFactor));

    // Add sector-based correlation and influences
    const sectorInfluence = calculateSectorInfluence(stock, gameState);
    const finalPrice = Math.max(1.0, newPrice * (1 + sectorInfluence));

    // Update historical prices (keep last 30 prices)
    const newHistoricalPrices = [...(stock.historicalPrices || []), finalPrice];
    if (newHistoricalPrices.length > 30) {
      newHistoricalPrices.shift(); // Remove oldest price
    }

    return {
      id: stock.id,
      currentPrice: parseFloat(finalPrice.toFixed(2)),
      trend: parseFloat(newTrend.toFixed(4)),
      historicalPrices: newHistoricalPrices
    };
  });
}

/**
 * Calculates sector-specific influences on stock prices
 * @param {Object} stock - Individual stock
 * @param {Object} gameState - Current game state
 * @returns {number} Sector influence factor
 */
function calculateSectorInfluence(stock, gameState) {
  let sectorInfluence = 0;

  switch (stock.sector) {
    case 'gaming':
      // Gaming stocks are influenced by overall game industry success
      const recentCompletedProjects = gameState.completedProjects.filter(p => {
        const projectDate = new Date(2024, 0, 1); // Base date
        projectDate.setMonth(projectDate.getMonth() + (gameState.currentDate.year - 2024) * 12 + gameState.currentDate.month - 1);
        const cutoffDate = new Date(projectDate);
        cutoffDate.setMonth(cutoffDate.getMonth() - 3); // Last 3 months
        return p.completedDate >= cutoffDate;
      });

      if (recentCompletedProjects.length > 0) {
        const avgSuccess = recentCompletedProjects.reduce((sum, p) => sum + (p.revenue || 0), 0) / recentCompletedProjects.length;
        sectorInfluence = avgSuccess > 100000 ? 0.002 : -0.001;
      }
      break;

    case 'tech':
      // Tech stocks are influenced by studio growth and technology adoption
      const studioGrowthFactor = gameState.employees.length / 10;
      const technologyUnlocks = gameState.platforms.filter(p => p.unlocked).length;
      sectorInfluence = (studioGrowthFactor + technologyUnlocks) * 0.0001;
      break;

    case 'hardware':
      // Hardware stocks influenced by platform diversity and high-end game development
      const platformDiversity = gameState.platforms.filter(p => p.unlocked).length;
      const aaaProjects = gameState.completedProjects.filter(p => p.size === 3).length;
      sectorInfluence = (platformDiversity * 0.0002) + (aaaProjects * 0.0005);
      break;

    case 'media':
      // Media stocks influenced by game success and reputation
      const reputationFactor = (gameState.reputation - 50) / 100;
      sectorInfluence = reputationFactor * 0.001;
      break;

    case 'crypto':
      // Crypto stocks are more volatile and influenced by tech sector performance
      const techStocks = gameState.stocks.filter(s => s.sector === 'tech');
      const avgTechTrend = techStocks.reduce((sum, s) => sum + s.trend, 0) / techStocks.length;
      sectorInfluence = (avgTechTrend - 1.0) * 0.002;

      // Add extra volatility for crypto
      const extraVolatility = (Math.random() - 0.5) * 0.01;
      sectorInfluence += extraVolatility;
      break;
  }

  return sectorInfluence;
}

/**
 * Processes dividend payments for eligible stocks
 * @param {Object} portfolio - Portfolio object with holdings
 * @param {Array} stocks - Stock list
 * @returns {Array} Dividend payments to process
 */
export function processDividendPayments(portfolio, stocks) {
  if (!portfolio.holdings.length) return [];

  const currentTime = new Date();
  const timeSinceLastCheck = portfolio.lastDividendCheck
    ? (currentTime - new Date(portfolio.lastDividendCheck)) / (1000 * 60 * 60 * 24) // days
    : 90; // First time, assume 90 days passed

  // Check dividends quarterly (every 90 game days)
  if (timeSinceLastCheck < 90) return [];

  const dividendPayments = [];

  portfolio.holdings.forEach(holding => {
    const stock = stocks.find(s => s.id === holding.stockId);
    if (stock && stock.dividendYield && stock.dividendYield > 0) {
      const quarterlyDividendRate = stock.dividendYield / 4; // Quarterly payment
      const dividendAmount = holding.quantity * stock.currentPrice * quarterlyDividendRate;

      if (dividendAmount > 0.01) { // Only pay if significant amount
        dividendPayments.push({
          stockId: stock.id,
          amount: dividendAmount,
          symbol: stock.symbol
        });
      }
    }
  });

  return dividendPayments;
}

/**
 * Checks price alerts and returns triggered alerts
 * @param {Array} priceAlerts - Array of price alerts
 * @param {Array} stocks - Stock list
 * @returns {Array} Triggered alerts
 */
export function checkPriceAlerts(priceAlerts, stocks) {
  if (!priceAlerts.length) return [];

  const triggeredAlerts = [];

  priceAlerts.forEach(alert => {
    if (!alert.active) return;

    const stock = stocks.find(s => s.id === alert.stockId);
    if (!stock) return;

    let triggered = false;
    if (alert.direction === 'above' && stock.currentPrice >= alert.targetPrice) {
      triggered = true;
    } else if (alert.direction === 'below' && stock.currentPrice <= alert.targetPrice) {
      triggered = true;
    }

    if (triggered) {
      triggeredAlerts.push({
        alert,
        stock,
        message: `🚨 Price Alert: ${stock.symbol} is ${alert.direction} $${alert.targetPrice.toFixed(2)} (Current: $${stock.currentPrice.toFixed(2)})`
      });
    }
  });

  return triggeredAlerts;
}

/**
 * Generates random market events
 * @param {Array} stocks - Stock list
 * @param {number} dayProgress - Days to process
 * @returns {Object} Market event or null
 */
export function processMarketEvents(stocks, dayProgress) {
  // Generate market events randomly (roughly once per month)
  const eventChance = dayProgress * 0.033; // ~1% chance per day
  if (Math.random() > eventChance) return null;

  const marketEvents = [
    {
      title: "Gaming Industry Growth",
      description: "Reports show strong gaming industry growth this quarter",
      affectedSectors: ['gaming'],
      priceImpact: 0.05, // +5%
      duration: 3 // days
    },
    {
      title: "Tech Stock Rally",
      description: "Major breakthrough in AI technology drives tech stocks higher",
      affectedSectors: ['tech'],
      priceImpact: 0.08,
      duration: 2
    },
    {
      title: "Market Volatility",
      description: "Global economic uncertainty causes market-wide volatility",
      affectedSectors: ['gaming', 'tech', 'hardware', 'media'],
      priceImpact: -0.03,
      duration: 5
    },
    {
      title: "Hardware Shortage",
      description: "Global chip shortage impacts hardware manufacturers",
      affectedSectors: ['hardware'],
      priceImpact: -0.06,
      duration: 7
    },
    {
      title: "Crypto Surge",
      description: "Cryptocurrency market experiences major rally",
      affectedSectors: ['crypto'],
      priceImpact: 0.12,
      duration: 1
    }
  ];

  const selectedEvent = marketEvents[Math.floor(Math.random() * marketEvents.length)];

  // Get affected stocks
  const affectedStocks = stocks.filter(stock =>
    selectedEvent.affectedSectors.includes(stock.sector)
  );

  if (affectedStocks.length === 0) return null;

  // Calculate stock updates
  const stockUpdates = affectedStocks.map(stock => ({
    id: stock.id,
    currentPrice: Math.max(1.0, stock.currentPrice * (1 + selectedEvent.priceImpact)),
    trend: Math.max(0.95, Math.min(1.05, stock.trend + selectedEvent.priceImpact * 0.5))
  }));

  return {
    event: selectedEvent,
    stockUpdates
  };
}