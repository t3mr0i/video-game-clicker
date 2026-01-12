/**
 * Holdings list component showing user's stock holdings
 */

import React from 'react';
import { formatCurrency, formatPercentage, getChangeColor } from '../../../utils/formatting';
import Button from '../common/Button';

const HoldingsList = ({ holdings, stocks, onTradeClick }) => {
  const getDividendInfo = (stock, holding) => {
    if (!holding || !stock.dividendYield) return null;

    const annualDividend = holding.quantity * stock.currentPrice * stock.dividendYield;
    return {
      annual: annualDividend,
      quarterly: annualDividend / 4
    };
  };

  if (holdings.length === 0) {
    return (
      <div className="text-gray-400 text-xs text-center py-4">
        No holdings yet. Start investing!
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {holdings.map(holding => {
        const stock = stocks.find(s => s.id === holding.stockId);
        if (!stock) return null;

        const currentValue = holding.quantity * stock.currentPrice;
        const costBasis = holding.quantity * holding.averagePurchasePrice;
        const gainLoss = currentValue - costBasis;
        const gainLossPercent = costBasis > 0 ? (gainLoss / costBasis) * 100 : 0;
        const dividend = getDividendInfo(stock, holding);

        return (
          <div key={holding.stockId} className="bg-gray-700 p-2 rounded border border-gray-600">
            <div className="flex justify-between items-start mb-1">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-white text-xs">{stock.symbol}</span>
                  <span className="text-gray-300 text-xs">{holding.quantity} shares</span>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Value: {formatCurrency(currentValue)} | Avg: {formatCurrency(holding.averagePurchasePrice)}
                </div>
                {dividend && (
                  <div className="text-xs text-green-400 mt-1">
                    Expected dividend: {formatCurrency(dividend.quarterly)}/quarter
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className={`text-xs font-medium ${getChangeColor(gainLoss)}`}>
                  {gainLoss >= 0 ? '+' : '-'}{formatCurrency(Math.abs(gainLoss))}
                </div>
                <div className={`text-xs ${getChangeColor(gainLoss)}`}>
                  {formatPercentage(gainLossPercent)}
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="small"
              onClick={() => onTradeClick(stock)}
              className="text-xs py-1 px-2 w-full"
            >
              Trade
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default HoldingsList;