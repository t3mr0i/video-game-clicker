import React, { useState, useEffect } from 'react';
import Modal from './common/Modal';
import Button from './common/Button';

const StocksTradingModal = ({
    isOpen,
    onClose,
    stock,
    currentMoney,
    currentHolding,
    onTrade
}) => {
    const [action, setAction] = useState('buy'); // 'buy' or 'sell'
    const [quantity, setQuantity] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);

    // Reset form when modal opens
    useEffect(() => {
        if (isOpen) {
            setAction('buy');
            setQuantity(1);
        }
    }, [isOpen]);

    if (!stock) return null;

    const formatCurrency = (amount) => {
        return `$${Math.abs(amount).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;
    };

    const totalCost = quantity * stock.currentPrice;
    const maxBuyQuantity = Math.floor(currentMoney / stock.currentPrice);
    const maxSellQuantity = currentHolding ? currentHolding.quantity : 0;

    const canExecuteTrade = () => {
        if (action === 'buy') {
            return quantity > 0 && quantity <= maxBuyQuantity && currentMoney >= totalCost;
        } else {
            return quantity > 0 && quantity <= maxSellQuantity;
        }
    };

    const handleQuantityChange = (value) => {
        const newQuantity = Math.max(1, parseInt(value) || 1);
        setQuantity(newQuantity);
    };

    const handleMaxQuantity = () => {
        if (action === 'buy') {
            setQuantity(maxBuyQuantity);
        } else {
            setQuantity(maxSellQuantity);
        }
    };

    const handleTrade = async () => {
        if (!canExecuteTrade()) return;

        setIsProcessing(true);

        try {
            onTrade(stock.id, action, quantity, stock.currentPrice);
        } finally {
            setIsProcessing(false);
        }
    };

    const getGainLoss = () => {
        if (action === 'sell' && currentHolding) {
            const costBasis = quantity * currentHolding.averagePurchasePrice;
            const proceeds = quantity * stock.currentPrice;
            const gainLoss = proceeds - costBasis;
            const gainLossPercent = costBasis > 0 ? (gainLoss / costBasis) * 100 : 0;

            return {
                amount: gainLoss,
                percent: gainLossPercent,
                isGain: gainLoss >= 0
            };
        }
        return null;
    };

    const gainLoss = getGainLoss();

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`Trade ${stock.symbol} - ${stock.name}`}
            size="medium"
        >
            <div className="space-y-4">
                {/* Stock Information */}
                <div className="bg-gray-700 p-3 rounded border border-gray-600">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                            <span className="text-gray-300">Current Price:</span>
                            <div className="font-semibold text-white">{formatCurrency(stock.currentPrice)}</div>
                        </div>
                        <div>
                            <span className="text-gray-300">Sector:</span>
                            <div className="font-semibold text-white capitalize">{stock.sector}</div>
                        </div>
                    </div>
                    {currentHolding && (
                        <div className="mt-2 pt-2 border-t border-gray-600 text-sm">
                            <span className="text-gray-300">Current Holdings:</span>
                            <div className="text-white">
                                {currentHolding.quantity} shares @ {formatCurrency(currentHolding.averagePurchasePrice)} avg
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Selection */}
                <div>
                    <label className="block text-sm font-medium text-white mb-2">Action</label>
                    <div className="flex space-x-2">
                        <Button
                            variant={action === 'buy' ? 'success' : 'outline'}
                            onClick={() => setAction('buy')}
                            className="flex-1"
                        >
                            Buy
                        </Button>
                        <Button
                            variant={action === 'sell' ? 'danger' : 'outline'}
                            onClick={() => setAction('sell')}
                            disabled={!currentHolding || currentHolding.quantity === 0}
                            className="flex-1"
                        >
                            Sell
                        </Button>
                    </div>
                </div>

                {/* Quantity Input */}
                <div>
                    <label className="block text-sm font-medium text-white mb-2">Quantity</label>
                    <div className="flex space-x-2">
                        <input
                            type="number"
                            min="1"
                            max={action === 'buy' ? maxBuyQuantity : maxSellQuantity}
                            value={quantity}
                            onChange={(e) => handleQuantityChange(e.target.value)}
                            className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter quantity"
                        />
                        <Button
                            variant="outline"
                            onClick={handleMaxQuantity}
                            disabled={action === 'buy' ? maxBuyQuantity <= 0 : maxSellQuantity <= 0}
                        >
                            Max
                        </Button>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                        {action === 'buy'
                            ? `Max affordable: ${maxBuyQuantity} shares`
                            : `Max available: ${maxSellQuantity} shares`
                        }
                    </div>
                </div>

                {/* Trade Summary */}
                <div className="bg-gray-700 p-3 rounded border border-gray-600">
                    <h4 className="text-sm font-medium text-white mb-2">Trade Summary</h4>
                    <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-300">Quantity:</span>
                            <span className="text-white">{quantity} shares</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-300">Price per share:</span>
                            <span className="text-white">{formatCurrency(stock.currentPrice)}</span>
                        </div>
                        <div className="flex justify-between border-t border-gray-600 pt-1">
                            <span className="text-gray-300 font-medium">
                                Total {action === 'buy' ? 'Cost' : 'Proceeds'}:
                            </span>
                            <span className={`font-medium ${action === 'buy' ? 'text-red-400' : 'text-green-400'}`}>
                                {formatCurrency(totalCost)}
                            </span>
                        </div>
                        {gainLoss && (
                            <div className="flex justify-between">
                                <span className="text-gray-300">Gain/Loss:</span>
                                <span className={`font-medium ${gainLoss.isGain ? 'text-green-400' : 'text-red-400'}`}>
                                    {gainLoss.isGain ? '+' : '-'}{formatCurrency(gainLoss.amount)} ({gainLoss.percent.toFixed(2)}%)
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Error Messages */}
                {!canExecuteTrade() && (
                    <div className="bg-red-900 border border-red-600 text-red-200 p-2 rounded text-sm">
                        {action === 'buy' && currentMoney < totalCost && 'Insufficient funds for this purchase.'}
                        {action === 'buy' && quantity > maxBuyQuantity && 'Quantity exceeds maximum affordable amount.'}
                        {action === 'sell' && quantity > maxSellQuantity && 'Quantity exceeds available shares.'}
                        {quantity <= 0 && 'Quantity must be greater than 0.'}
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="flex-1"
                        disabled={isProcessing}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant={action === 'buy' ? 'success' : 'danger'}
                        onClick={handleTrade}
                        disabled={!canExecuteTrade() || isProcessing}
                        className="flex-1"
                        loading={isProcessing}
                    >
                        {action === 'buy' ? 'Buy Shares' : 'Sell Shares'}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default StocksTradingModal;