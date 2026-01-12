/**
 * Alerts panel component for managing price alerts and watchlist
 */

import React from 'react';
import { formatCurrency, getChangeColor } from '../../../utils/formatting';
import Button from '../common/Button';

const AlertsPanel = ({ priceAlerts, watchlist, stocks, onCreateAlert, onRemoveAlert, onWatchlistToggle }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h4 className="text-xs font-semibold text-purple-200">Price Alerts</h4>
        <Button
          variant="success"
          size="small"
          onClick={onCreateAlert}
          className="text-xs py-1 px-2"
        >
          + New Alert
        </Button>
      </div>

      {/* Price Alerts */}
      {priceAlerts?.length === 0 ? (
        <div className="text-gray-400 text-xs text-center py-4">No price alerts set</div>
      ) : (
        priceAlerts?.map(alert => {
          const stock = stocks.find(s => s.id === alert.stockId);
          if (!stock) return null;

          return (
            <div key={alert.id} className="bg-gray-700 p-2 rounded border border-gray-600">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="text-white text-xs font-medium">
                    {stock.symbol} {alert.direction} {formatCurrency(alert.targetPrice)}
                  </div>
                  <div className="text-gray-400 text-xs mt-1">
                    Current: {formatCurrency(stock.currentPrice)}
                  </div>
                </div>
                <button
                  onClick={() => onRemoveAlert(alert.id)}
                  className="text-red-400 hover:text-red-300 text-xs"
                >
                  ✕
                </button>
              </div>
            </div>
          );
        })
      )}

      {/* Watchlist */}
      <h4 className="text-xs font-semibold text-purple-200 mt-3 mb-1">Watchlist</h4>
      {watchlist?.length === 0 ? (
        <div className="text-gray-400 text-xs text-center py-4">No stocks in watchlist</div>
      ) : (
        watchlist?.map(stockId => {
          const stock = stocks.find(s => s.id === stockId);
          if (!stock) return null;

          const previousPrice = stock.historicalPrices[stock.historicalPrices.length - 2] || stock.currentPrice;
          const priceChange = stock.currentPrice - previousPrice;

          return (
            <div key={stock.id} className="bg-gray-700 p-2 rounded border border-gray-600">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="text-white text-xs font-medium">{stock.symbol} - {stock.name}</div>
                  <div className={`text-xs mt-1 ${getChangeColor(priceChange)}`}>
                    {formatCurrency(stock.currentPrice)} ({priceChange >= 0 ? '+' : ''}{formatCurrency(priceChange)})
                  </div>
                </div>
                <button
                  onClick={() => onWatchlistToggle(stockId)}
                  className="text-yellow-400 hover:text-yellow-300 text-xs"
                >
                  ⭐
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default AlertsPanel;