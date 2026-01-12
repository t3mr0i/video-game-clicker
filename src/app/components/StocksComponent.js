import React, { useState } from 'react';
import { useGameContext } from '../contexts/GameContext';
import Button from './common/Button';
import StocksTradingModal from './StocksTradingModal';

const StocksComponent = () => {
    const { state, actions } = useGameContext();
    const [isTradingModalOpen, setIsTradingModalOpen] = useState(false);
    const [selectedStock, setSelectedStock] = useState(null);

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
            <h3 className="text-base font-bold text-purple-300 mb-1 border-b border-purple-700 pb-1">Stock Market</h3>

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
                </div>
            </div>

            {/* Stock Listings */}
            <div className="space-y-1">
                <h4 className="text-xs font-semibold text-purple-200 mb-1">Available Stocks</h4>
                {state.stocks.map(stock => {
                    const holding = state.portfolio.holdings.find(h => h.stockId === stock.id);
                    const hasShares = holding && holding.quantity > 0;

                    // Calculate price change from previous price
                    const previousPrice = stock.historicalPrices[stock.historicalPrices.length - 2] || stock.currentPrice;
                    const priceChange = stock.currentPrice - previousPrice;
                    const priceChangePercent = previousPrice > 0 ? (priceChange / previousPrice) * 100 : 0;

                    return (
                        <div key={stock.id} className="bg-gray-700 p-2 rounded border border-gray-600">
                            <div className="flex justify-between items-center mb-1">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2">
                                        <span className="font-semibold text-white text-xs">{stock.symbol}</span>
                                        <span className="text-gray-300 text-xs truncate">{stock.name}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 mt-1">
                                        <span className="text-white font-medium text-xs">{formatCurrency(stock.currentPrice)}</span>
                                        <span className={`text-xs ${getChangeColor(priceChange)}`}>
                                            {priceChange >= 0 ? '+' : ''}{formatCurrency(priceChange)} ({formatPercentage(priceChangePercent)})
                                        </span>
                                    </div>
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
                            {hasShares && (
                                <div className="text-xs text-purple-200 bg-gray-800 p-1 rounded mt-1">
                                    Holdings: {holding.quantity} shares @ {formatCurrency(holding.averagePurchasePrice)} avg
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Trading Modal */}
            <StocksTradingModal
                isOpen={isTradingModalOpen}
                onClose={() => setIsTradingModalOpen(false)}
                stock={selectedStock}
                currentMoney={state.money}
                currentHolding={selectedStock ? state.portfolio.holdings.find(h => h.stockId === selectedStock.id) : null}
                onTrade={handleTrade}
            />
        </div>
    );
};

export default StocksComponent;