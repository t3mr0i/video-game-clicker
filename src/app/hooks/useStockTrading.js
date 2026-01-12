/**
 * Custom hook for stock trading business logic
 * Extracts trading calculations, validation, and state management
 */

import { useState, useEffect, useCallback } from 'react';

export function useStockTrading(stock, currentMoney, currentHolding) {
  const [action, setAction] = useState('buy');
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Reset when stock changes or modal opens
  const resetForm = useCallback(() => {
    setAction('buy');
    setQuantity(1);
    setIsProcessing(false);
  }, []);

  // Trading calculations
  const calculations = useCallback(() => {
    if (!stock) return null;

    const totalCost = quantity * stock.currentPrice;
    const maxBuyQuantity = Math.floor(currentMoney / stock.currentPrice);
    const maxSellQuantity = currentHolding ? currentHolding.quantity : 0;

    return {
      totalCost,
      maxBuyQuantity,
      maxSellQuantity
    };
  }, [stock, quantity, currentMoney, currentHolding]);

  // Trade validation
  const canExecuteTrade = useCallback(() => {
    if (!stock) return false;

    const calc = calculations();
    if (!calc) return false;

    if (action === 'buy') {
      return quantity > 0 && quantity <= calc.maxBuyQuantity && currentMoney >= calc.totalCost;
    } else {
      return quantity > 0 && quantity <= calc.maxSellQuantity;
    }
  }, [action, quantity, stock, currentMoney, calculations]);

  // Quantity handlers
  const handleQuantityChange = useCallback((value) => {
    const newQuantity = Math.max(1, parseInt(value) || 1);
    setQuantity(newQuantity);
  }, []);

  const handleMaxQuantity = useCallback(() => {
    const calc = calculations();
    if (!calc) return;

    if (action === 'buy') {
      setQuantity(calc.maxBuyQuantity);
    } else {
      setQuantity(calc.maxSellQuantity);
    }
  }, [action, calculations]);

  // Gain/Loss calculation for selling
  const getGainLoss = useCallback(() => {
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
  }, [action, quantity, currentHolding, stock]);

  // Execute trade
  const executeTrade = useCallback(async (onTrade) => {
    if (!canExecuteTrade()) return false;

    setIsProcessing(true);

    try {
      await onTrade(stock.id, action, quantity, stock.currentPrice);
      return true;
    } catch (error) {
      console.error('Trade execution failed:', error);
      return false;
    } finally {
      setIsProcessing(false);
    }
  }, [canExecuteTrade, stock, action, quantity]);

  // Get validation error message
  const getValidationError = useCallback(() => {
    if (!stock) return null;

    const calc = calculations();
    if (!calc) return null;

    if (quantity <= 0) return 'Quantity must be greater than 0.';

    if (action === 'buy') {
      if (currentMoney < calc.totalCost) return 'Insufficient funds for this purchase.';
      if (quantity > calc.maxBuyQuantity) return 'Quantity exceeds maximum affordable amount.';
    } else {
      if (quantity > calc.maxSellQuantity) return 'Quantity exceeds available shares.';
    }

    return null;
  }, [action, quantity, stock, currentMoney, calculations]);

  return {
    // State
    action,
    quantity,
    isProcessing,

    // Actions
    setAction,
    resetForm,
    handleQuantityChange,
    handleMaxQuantity,
    executeTrade,

    // Calculations
    calculations: calculations(),
    gainLoss: getGainLoss(),
    canExecuteTrade: canExecuteTrade(),
    validationError: getValidationError()
  };
}

export { useStockTrading };