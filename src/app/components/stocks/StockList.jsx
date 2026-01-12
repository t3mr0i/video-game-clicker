/**
 * Stock list component showing available stocks for trading
 */

import React from 'react';
import { formatCurrency, formatPercentage, getChangeColor } from '../../../utils/formatting';
import Button from '../common/Button';

const StockList = ({ stocks, holdings, watchlist, onTradeClick, onWatchlistToggle }) => {
  return (
    <div className="space-y-1">
      {stocks.map(stock => {
        const holding = holdings.find(h => h.stockId === stock.id);
        const isWatched = watchlist?.includes(stock.id);

        // Calculate price change from previous price
        const previousPrice = stock.historicalPrices[stock.historicalPrices.length - 2] || stock.currentPrice;
        const priceChange = stock.currentPrice - previousPrice;
        const priceChangePercent = previousPrice > 0 ? (priceChange / previousPrice) * 100 : 0;

        return (
          <div key={stock.id} className="bg-gray-700 p-2 rounded border border-gray-600">
            <div className="flex justify-between items-center mb-1">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onWatchlistToggle(stock.id)}
                    className={`text-xs ${isWatched ? 'text-yellow-400' : 'text-gray-500'} hover:text-yellow-300`}
                  >
                    ⭐
                  </button>
                  <span className="font-semibold text-white text-xs">{stock.symbol}</span>
                  <span className="text-gray-300 text-xs truncate">{stock.name}</span>
                  {stock.dividendYield && (
                    <span className="text-green-400 text-xs">💰</span>
                  )}
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-white font-medium text-xs">{formatCurrency(stock.currentPrice)}</span>
                  <span className={`text-xs ${getChangeColor(priceChange)}`}>
                    {priceChange >= 0 ? '+' : ''}{formatCurrency(priceChange)} ({formatPercentage(priceChangePercent)})
                  </span>
                </div>
                {stock.dividendYield && (
                  <div className="text-xs text-green-400 mt-1">
                    Dividend: {(stock.dividendYield * 100).toFixed(1)}% yield
                  </div>
                )}
              </div>
              <Button
                variant="outline"
                size="small"
                onClick={() => onTradeClick(stock)}
                className="text-xs py-1 px-2"
              >
                Trade
              </Button>
            </div>
            {holding && (
              <div className="text-xs text-purple-200 bg-gray-800 p-1 rounded mt-1">
                Holdings: {holding.quantity} shares @ {formatCurrency(holding.averagePurchasePrice)} avg
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StockList;