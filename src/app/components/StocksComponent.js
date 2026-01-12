import React, { useState } from 'react';
import { useGameContext } from '../contexts/GameContext';
import Button from './common/Button';
import StocksTradingModal from './StocksTradingModal';
import Modal from './common/Modal';

const StocksComponent = () => {
    const { state, actions } = useGameContext();
    const [isTradingModalOpen, setIsTradingModalOpen] = useState(false);
    const [selectedStock, setSelectedStock] = useState(null);
    const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
    const [alertTarget, setAlertTarget] = useState({ stockId: '', targetPrice: '', direction: 'above' });
    const [activeTab, setActiveTab] = useState('portfolio');

    // Calculate portfolio metrics
    const calculatePortfolioValue = () => {
        return state.portfolio.holdings.reduce((total, holding) => {
            const stock = state.stocks.find(s => s.id === holding.stockId);
            return total + (stock ? stock.currentPrice * holding.quantity : 0);
        }, 0);
    };

    const portfolioValue = calculatePortfolioValue();
    const unrealizedGainLoss = portfolioValue - state.portfolio.totalInvested;
    const totalGainLoss = unrealizedGainLoss + state.portfolio.realizedGainLoss;
    const gainLossPercentage = state.portfolio.totalInvested > 0
        ? (totalGainLoss / state.portfolio.totalInvested) * 100
        : 0;

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
            actions.addNotification({
                message: `Price alert created for ${state.stocks.find(s => s.id === alertTarget.stockId)?.symbol}`,
                type: 'success'
            });
            setIsAlertModalOpen(false);
            setAlertTarget({ stockId: '', targetPrice: '', direction: 'above' });
        }
    };

    const getDividendInfo = (stock) => {
        const holding = state.portfolio.holdings.find(h => h.stockId === stock.id);
        if (!holding || !stock.dividendYield) return null;

        const annualDividend = holding.quantity * stock.currentPrice * stock.dividendYield;
        return {
            annual: annualDividend,
            quarterly: annualDividend / 4
        };
    };

    const formatCurrency = (amount) => {
        return `$${Math.abs(amount).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;
    };

    const formatPercentage = (percent) => {
        return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;
    };

    const getChangeColor = (value) => {
        if (value > 0) return 'text-green-400';
        if (value < 0) return 'text-red-400';
        return 'text-gray-400';
    };

    const handleTradeClick = (stock) => {
        setSelectedStock(stock);
        setIsTradingModalOpen(true);
    };

    const handleTrade = (stockId, action, quantity, price) => {
        if (action === 'buy') {
            actions.buyStock(stockId, quantity, price);
            actions.addNotification({
                message: `Bought ${quantity} shares of ${selectedStock.symbol}`,
                type: 'success'
            });
        } else {
            actions.sellStock(stockId, quantity, price);
            actions.addNotification({
                message: `Sold ${quantity} shares of ${selectedStock.symbol}`,
                type: 'success'
            });
        }
        setIsTradingModalOpen(false);
    };

    return (
        <div className="game-card bg-gray-800 border-2 border-purple-700 text-white p-3 rounded-lg shadow-xl text-sm">
            <h3 className="text-base font-bold text-purple-300 mb-1 border-b border-purple-700 pb-1">Investment Center</h3>

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
                    {/* Portfolio Summary */}
                    <div className="mb-3 p-2 bg-gray-900 rounded border border-gray-700">
                        <h4 className="text-xs font-semibold text-purple-200 mb-1">Portfolio Summary</h4>
                        <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                                <span className="text-gray-300">Portfolio Value:</span>
                                <span className="font-medium text-white">{formatCurrency(portfolioValue)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-300">Total Invested:</span>
                                <span className="font-medium text-white">{formatCurrency(state.portfolio.totalInvested)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-300">Total Gain/Loss:</span>
                                <span className={`font-medium ${getChangeColor(totalGainLoss)}`}>
                                    {totalGainLoss >= 0 ? '+' : '-'}{formatCurrency(totalGainLoss)} ({formatPercentage(gainLossPercentage)})
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-300">Dividends Received:</span>
                                <span className="font-medium text-green-400">{formatCurrency(state.portfolio.totalDividendsReceived || 0)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Holdings */}
                    <div className="space-y-1">
                        <h4 className="text-xs font-semibold text-purple-200 mb-1">Your Holdings</h4>
                        {state.portfolio.holdings.length === 0 ? (
                            <div className="text-gray-400 text-xs text-center py-4">No holdings yet. Start investing!</div>
                        ) : (
                            state.portfolio.holdings.map(holding => {
                                const stock = state.stocks.find(s => s.id === holding.stockId);
                                if (!stock) return null;

                                const currentValue = holding.quantity * stock.currentPrice;
                                const costBasis = holding.quantity * holding.averagePurchasePrice;
                                const gainLoss = currentValue - costBasis;
                                const gainLossPercent = costBasis > 0 ? (gainLoss / costBasis) * 100 : 0;
                                const dividend = getDividendInfo(stock);

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
                                                    {gainLoss >= 0 ? '+' : '-'}{formatCurrency(gainLoss)}
                                                </div>
                                                <div className={`text-xs ${getChangeColor(gainLoss)}`}>
                                                    {formatPercentage(gainLossPercent)}
                                                </div>
                                            </div>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="small"
                                            onClick={() => handleTradeClick(stock)}
                                            className="text-xs py-1 px-2 w-full"
                                        >
                                            Trade
                                        </Button>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </>
            )}

            {activeTab === 'market' && (
                <>
                    {/* Market Status */}
                    <div className="mb-3 p-2 bg-gray-900 rounded border border-gray-700">
                        <h4 className="text-xs font-semibold text-purple-200 mb-1">Market Status</h4>
                        <div className="flex justify-between text-xs">
                            <span className="text-gray-300">Status:</span>
                            <span className={`font-medium ${
                                state.stockMarket?.marketStatus === 'open' ? 'text-green-400' :
                                state.stockMarket?.marketStatus === 'volatile' ? 'text-yellow-400' : 'text-red-400'
                            }`}>
                                {state.stockMarket?.marketStatus?.toUpperCase() || 'OPEN'}
                            </span>
                        </div>
                        <div className="flex justify-between text-xs mt-1">
                            <span className="text-gray-300">Sentiment:</span>
                            <span className={`font-medium ${
                                state.stockMarket?.marketSentiment === 'bullish' ? 'text-green-400' :
                                state.stockMarket?.marketSentiment === 'bearish' ? 'text-red-400' : 'text-gray-400'
                            }`}>
                                {state.stockMarket?.marketSentiment?.toUpperCase() || 'NEUTRAL'}
                            </span>
                        </div>
                    </div>

                    {/* All Stocks */}
                    <div className="space-y-1">
                        <div className="flex justify-between items-center mb-1">
                            <h4 className="text-xs font-semibold text-purple-200">Available Stocks</h4>
                            <Button
                                variant="outline"
                                size="small"
                                onClick={() => setIsAlertModalOpen(true)}
                                className="text-xs py-1 px-2"
                            >
                                + Alert
                            </Button>
                        </div>
                        {state.stocks.map(stock => {
                            const holding = state.portfolio.holdings.find(h => h.stockId === stock.id);
                            const isWatched = state.portfolio.watchlist?.includes(stock.id);

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
                                                    onClick={() => handleWatchlistToggle(stock.id)}
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
                                            onClick={() => handleTradeClick(stock)}
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
                </>
            )}

            {activeTab === 'alerts' && (
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <h4 className="text-xs font-semibold text-purple-200">Price Alerts</h4>
                        <Button
                            variant="success"
                            size="small"
                            onClick={() => setIsAlertModalOpen(true)}
                            className="text-xs py-1 px-2"
                        >
                            + New Alert
                        </Button>
                    </div>

                    {state.portfolio.priceAlerts?.length === 0 ? (
                        <div className="text-gray-400 text-xs text-center py-4">No price alerts set</div>
                    ) : (
                        state.portfolio.priceAlerts?.map(alert => {
                            const stock = state.stocks.find(s => s.id === alert.stockId);
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
                                            onClick={() => actions.removePriceAlert(alert.id)}
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
                    {state.portfolio.watchlist?.length === 0 ? (
                        <div className="text-gray-400 text-xs text-center py-4">No stocks in watchlist</div>
                    ) : (
                        state.portfolio.watchlist?.map(stockId => {
                            const stock = state.stocks.find(s => s.id === stockId);
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
                                            onClick={() => handleWatchlistToggle(stockId)}
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
            )}

            {activeTab === 'analytics' && (
                <div className="space-y-3">
                    <h4 className="text-xs font-semibold text-purple-200 mb-2">Portfolio Analytics</h4>

                    {/* Sector Allocation */}
                    <div className="bg-gray-900 p-2 rounded border border-gray-700">
                        <h5 className="text-xs font-medium text-purple-200 mb-2">Sector Allocation</h5>
                        {Object.entries(
                            state.portfolio.holdings.reduce((acc, holding) => {
                                const stock = state.stocks.find(s => s.id === holding.stockId);
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
                        {state.stockMarket?.marketEvents?.slice(-3).map(event => (
                            <div key={event.id} className="text-xs text-gray-300 mb-1">
                                <div className="font-medium text-white">{event.title}</div>
                                <div className="text-gray-400">{event.description}</div>
                            </div>
                        )) || <div className="text-gray-400 text-xs">No recent events</div>}
                    </div>

                    {/* Top Performers */}
                    <div className="bg-gray-900 p-2 rounded border border-gray-700">
                        <h5 className="text-xs font-medium text-purple-200 mb-2">Top Performers (24h)</h5>
                        {state.stocks
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
            <Modal
                isOpen={isAlertModalOpen}
                onClose={() => setIsAlertModalOpen(false)}
                title="Create Price Alert"
                size="small"
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-white mb-2">Stock</label>
                        <select
                            value={alertTarget.stockId}
                            onChange={(e) => setAlertTarget({ ...alertTarget, stockId: e.target.value })}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="">Select a stock</option>
                            {state.stocks.map(stock => (
                                <option key={stock.id} value={stock.id}>
                                    {stock.symbol} - {stock.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white mb-2">Target Price</label>
                        <input
                            type="number"
                            min="0.01"
                            step="0.01"
                            value={alertTarget.targetPrice}
                            onChange={(e) => setAlertTarget({ ...alertTarget, targetPrice: e.target.value })}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="0.00"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white mb-2">Alert When</label>
                        <div className="flex space-x-2">
                            <Button
                                variant={alertTarget.direction === 'above' ? 'success' : 'outline'}
                                onClick={() => setAlertTarget({ ...alertTarget, direction: 'above' })}
                                className="flex-1"
                            >
                                Above
                            </Button>
                            <Button
                                variant={alertTarget.direction === 'below' ? 'danger' : 'outline'}
                                onClick={() => setAlertTarget({ ...alertTarget, direction: 'below' })}
                                className="flex-1"
                            >
                                Below
                            </Button>
                        </div>
                    </div>

                    <div className="flex space-x-2 pt-2">
                        <Button
                            variant="outline"
                            onClick={() => setIsAlertModalOpen(false)}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="success"
                            onClick={handleCreateAlert}
                            disabled={!alertTarget.stockId || !alertTarget.targetPrice}
                            className="flex-1"
                        >
                            Create Alert
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default StocksComponent;