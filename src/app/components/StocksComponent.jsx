/**
 * Refactored StocksComponent with extracted sub-components
 * This replaces the monolithic component with a more maintainable structure
 */

import React, { useState } from 'react';
import { useGameContext } from '../contexts/GameContext';
import { useNotification } from '../hooks/useNotification';
import Button from './common/Button';
import StocksTradingModal from './StocksTradingModalComponent';

// Import sub-components
import PortfolioSummary from './stocks/PortfolioSummary';
import HoldingsList from './stocks/HoldingsList';
import MarketStatus from './stocks/MarketStatus';
import StockList from './stocks/StockList';
import AlertsPanel from './stocks/AlertsPanel';
import AnalyticsPanel from './stocks/AnalyticsPanel';
import PriceAlertModal from './stocks/PriceAlertModal';

const StocksComponent = () => {
  const { state, actions } = useGameContext();
  const { gameEvents, notifySuccess } = useNotification();

  // Modal states
  const [isTradingModalOpen, setIsTradingModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertTarget, setAlertTarget] = useState({
    stockId: '',
    targetPrice: '',
    direction: 'above'
  });

  // Active tab state
  const [activeTab, setActiveTab] = useState('portfolio');

  // Event handlers
  const handleWatchlistToggle = (stockId) => {
    if (state.portfolio.watchlist.includes(stockId)) {
      actions.removeFromWatchlist(stockId);
    } else {
      actions.addToWatchlist(stockId);
    }
  };

  const handleCreateAlert = () => {
    if (alertTarget.stockId && alertTarget.targetPrice) {
      actions.createPriceAlert(
        alertTarget.stockId,
        parseFloat(alertTarget.targetPrice),
        alertTarget.direction
      );

      const stock = state.stocks.find(s => s.id === alertTarget.stockId);
      notifySuccess(`Price alert created for ${stock?.symbol}`);

      setIsAlertModalOpen(false);
      setAlertTarget({ stockId: '', targetPrice: '', direction: 'above' });
    }
  };

  const handleTradeClick = (stock) => {
    setSelectedStock(stock);
    setIsTradingModalOpen(true);
  };

  const handleTrade = (stockId, action, quantity, price) => {
    if (action === 'buy') {
      actions.buyStock(stockId, quantity, price);
      gameEvents.stockTraded('buy', quantity, selectedStock);
    } else {
      actions.sellStock(stockId, quantity, price);
      gameEvents.stockTraded('sell', quantity, selectedStock);
    }
    setIsTradingModalOpen(false);
  };

  const handleRemoveAlert = (alertId) => {
    actions.removePriceAlert(alertId);
  };

  const handleOpenAlertModal = () => {
    setIsAlertModalOpen(true);
  };

  const handleCloseAlertModal = () => {
    setIsAlertModalOpen(false);
    setAlertTarget({ stockId: '', targetPrice: '', direction: 'above' });
  };

  return (
    <div className="game-card bg-gray-800 border-2 border-purple-700 text-white p-3 rounded-lg shadow-xl text-sm">
      <h3 className="text-base font-bold text-purple-300 mb-1 border-b border-purple-700 pb-1">
        Investment Center
      </h3>

      {/* Enhanced Tab Navigation */}
      <div className="mb-3 flex space-x-1 bg-gray-900 p-1 rounded">
        {['portfolio', 'market', 'alerts', 'analytics'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-2 py-1 text-xs font-medium rounded transition-all ${
              activeTab === tab
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-transparent text-gray-400 hover:text-purple-300'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'portfolio' && (
        <>
          <PortfolioSummary
            portfolio={state.portfolio}
            stocks={state.stocks}
          />
          <div className="space-y-1">
            <h4 className="text-xs font-semibold text-purple-200 mb-1">Your Holdings</h4>
            <HoldingsList
              holdings={state.portfolio.holdings}
              stocks={state.stocks}
              onTradeClick={handleTradeClick}
            />
          </div>
        </>
      )}

      {activeTab === 'market' && (
        <>
          <MarketStatus stockMarket={state.stockMarket} />
          <div className="space-y-1">
            <div className="flex justify-between items-center mb-1">
              <h4 className="text-xs font-semibold text-purple-200">Available Stocks</h4>
              <Button
                variant="outline"
                size="small"
                onClick={handleOpenAlertModal}
                className="text-xs py-1 px-2"
              >
                + Alert
              </Button>
            </div>
            <StockList
              stocks={state.stocks}
              holdings={state.portfolio.holdings}
              watchlist={state.portfolio.watchlist}
              onTradeClick={handleTradeClick}
              onWatchlistToggle={handleWatchlistToggle}
            />
          </div>
        </>
      )}

      {activeTab === 'alerts' && (
        <AlertsPanel
          priceAlerts={state.portfolio.priceAlerts}
          watchlist={state.portfolio.watchlist}
          stocks={state.stocks}
          onCreateAlert={handleOpenAlertModal}
          onRemoveAlert={handleRemoveAlert}
          onWatchlistToggle={handleWatchlistToggle}
        />
      )}

      {activeTab === 'analytics' && (
        <AnalyticsPanel
          portfolio={state.portfolio}
          stocks={state.stocks}
          stockMarket={state.stockMarket}
        />
      )}

      {/* Trading Modal */}
      <StocksTradingModal
        isOpen={isTradingModalOpen}
        onClose={() => setIsTradingModalOpen(false)}
        stock={selectedStock}
        currentMoney={state.money}
        currentHolding={selectedStock ? state.portfolio.holdings.find(h => h.stockId === selectedStock.id) : null}
        onTrade={handleTrade}
      />

      {/* Price Alert Modal */}
      <PriceAlertModal
        isOpen={isAlertModalOpen}
        onClose={handleCloseAlertModal}
        stocks={state.stocks}
        alertTarget={alertTarget}
        setAlertTarget={setAlertTarget}
        onCreateAlert={handleCreateAlert}
      />
    </div>
  );
};

export default StocksComponent;