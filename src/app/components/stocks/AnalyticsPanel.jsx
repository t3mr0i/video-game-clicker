/**
 * Analytics panel component showing portfolio analytics and market insights
 */

import React from 'react';
import { formatCurrency, formatPercentage, getChangeColor } from '../../../utils/formatting';

const AnalyticsPanel = ({ portfolio, stocks, stockMarket }) => {
  const portfolioValue = portfolio.holdings.reduce((total, holding) => {
    const stock = stocks.find(s => s.id === holding.stockId);
    return total + (stock ? stock.currentPrice * holding.quantity : 0);
  }, 0);

  return (
    <div className="space-y-3">
      <h4 className="text-xs font-semibold text-purple-200 mb-2">Portfolio Analytics</h4>

      {/* Sector Allocation */}
      <div className="bg-gray-900 p-2 rounded border border-gray-700">
        <h5 className="text-xs font-medium text-purple-200 mb-2">Sector Allocation</h5>
        {Object.entries(
          portfolio.holdings.reduce((acc, holding) => {
            const stock = stocks.find(s => s.id === holding.stockId);
            if (stock) {
              const value = holding.quantity * stock.currentPrice;
              acc[stock.sector] = (acc[stock.sector] || 0) + value;
            }
            return acc;
          }, {})
        ).map(([sector, value]) => {
          const percentage = portfolioValue > 0 ? (value / portfolioValue * 100) : 0;
          return (
            <div key={sector} className="flex justify-between text-xs mb-1">
              <span className="text-gray-300 capitalize">{sector}:</span>
              <span className="text-white">{formatCurrency(value)} ({percentage.toFixed(1)}%)</span>
            </div>
          );
        })}
      </div>

      {/* Recent Market Events */}
      <div className="bg-gray-900 p-2 rounded border border-gray-700">
        <h5 className="text-xs font-medium text-purple-200 mb-2">Recent Market Events</h5>
        {stockMarket?.marketEvents?.slice(-3).map(event => (
          <div key={event.id} className="text-xs text-gray-300 mb-1">
            <div className="font-medium text-white">{event.title}</div>
            <div className="text-gray-400">{event.description}</div>
          </div>
        )) || <div className="text-gray-400 text-xs">No recent events</div>}
      </div>

      {/* Top Performers */}
      <div className="bg-gray-900 p-2 rounded border border-gray-700">
        <h5 className="text-xs font-medium text-purple-200 mb-2">Top Performers (24h)</h5>
        {stocks
          .map(stock => {
            const previousPrice = stock.historicalPrices[stock.historicalPrices.length - 2] || stock.currentPrice;
            const change = previousPrice > 0 ? ((stock.currentPrice - previousPrice) / previousPrice * 100) : 0;
            return { ...stock, change };
          })
          .sort((a, b) => b.change - a.change)
          .slice(0, 3)
          .map(stock => (
            <div key={stock.id} className="flex justify-between text-xs mb-1">
              <span className="text-white">{stock.symbol}</span>
              <span className={getChangeColor(stock.change === 0 ? 1 : stock.change)}>
                {formatPercentage(stock.change)}
              </span>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default AnalyticsPanel;