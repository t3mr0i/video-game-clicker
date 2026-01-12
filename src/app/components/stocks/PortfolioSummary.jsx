/**
 * Portfolio summary component showing overall portfolio metrics
 * Optimized with React.memo and useMemo for better performance
 */

import React, { useMemo } from 'react';
import { formatCurrency, formatPercentage, getChangeColor } from '../../../utils/formatting';

const PortfolioSummary = React.memo(({ portfolio, stocks }) => {
  // Memoize portfolio calculations to prevent unnecessary recalculation
  const portfolioMetrics = useMemo(() => {
    const portfolioValue = portfolio.holdings.reduce((total, holding) => {
      const stock = stocks.find(s => s.id === holding.stockId);
      return total + (stock ? stock.currentPrice * holding.quantity : 0);
    }, 0);

    const unrealizedGainLoss = portfolioValue - portfolio.totalInvested;
    const totalGainLoss = unrealizedGainLoss + portfolio.realizedGainLoss;
    const gainLossPercentage = portfolio.totalInvested > 0
      ? (totalGainLoss / portfolio.totalInvested) * 100
      : 0;

    return {
      portfolioValue,
      unrealizedGainLoss,
      totalGainLoss,
      gainLossPercentage
    };
  }, [portfolio.holdings, portfolio.totalInvested, portfolio.realizedGainLoss, stocks]);

  const { portfolioValue, totalGainLoss, gainLossPercentage } = portfolioMetrics;

  return (
    <div className="mb-3 p-2 bg-gray-900 rounded border border-gray-700">
      <h4 className="text-xs font-semibold text-purple-200 mb-1">Portfolio Summary</h4>
      <div className="space-y-1 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-300">Portfolio Value:</span>
          <span className="font-medium text-white">{formatCurrency(portfolioValue)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">Total Invested:</span>
          <span className="font-medium text-white">{formatCurrency(portfolio.totalInvested)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">Total Gain/Loss:</span>
          <span className={`font-medium ${getChangeColor(totalGainLoss)}`}>
            {totalGainLoss >= 0 ? '+' : '-'}{formatCurrency(Math.abs(totalGainLoss))} ({formatPercentage(gainLossPercentage)})
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">Dividends Received:</span>
          <span className="font-medium text-green-400">{formatCurrency(portfolio.totalDividendsReceived || 0)}</span>
        </div>
      </div>
    </div>
  );
});

// Add display name for debugging
PortfolioSummary.displayName = 'PortfolioSummary';

export default PortfolioSummary;