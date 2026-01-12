/**
 * Market status component showing overall market conditions
 */

import React from 'react';

const MarketStatus = ({ stockMarket }) => {
  return (
    <div className="mb-3 p-2 bg-gray-900 rounded border border-gray-700">
      <h4 className="text-xs font-semibold text-purple-200 mb-1">Market Status</h4>
      <div className="flex justify-between text-xs">
        <span className="text-gray-300">Status:</span>
        <span className={`font-medium ${
          stockMarket?.marketStatus === 'open' ? 'text-green-400' :
          stockMarket?.marketStatus === 'volatile' ? 'text-yellow-400' : 'text-red-400'
        }`}>
          {stockMarket?.marketStatus?.toUpperCase() || 'OPEN'}
        </span>
      </div>
      <div className="flex justify-between text-xs mt-1">
        <span className="text-gray-300">Sentiment:</span>
        <span className={`font-medium ${
          stockMarket?.marketSentiment === 'bullish' ? 'text-green-400' :
          stockMarket?.marketSentiment === 'bearish' ? 'text-red-400' : 'text-gray-400'
        }`}>
          {stockMarket?.marketSentiment?.toUpperCase() || 'NEUTRAL'}
        </span>
      </div>
    </div>
  );
};

export default MarketStatus;