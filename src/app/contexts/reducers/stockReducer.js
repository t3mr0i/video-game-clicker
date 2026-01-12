/**
 * Stock market reducer for managing trading and portfolio
 * Handles all stock market related state updates
 */

// Stock action types
export const STOCK_ACTIONS = {
  BUY_STOCK: 'BUY_STOCK',
  SELL_STOCK: 'SELL_STOCK',
  UPDATE_STOCK_PRICES: 'UPDATE_STOCK_PRICES',
  UPDATE_PORTFOLIO: 'UPDATE_PORTFOLIO',
  PAY_DIVIDENDS: 'PAY_DIVIDENDS',
  ADD_WATCHLIST: 'ADD_WATCHLIST',
  REMOVE_WATCHLIST: 'REMOVE_WATCHLIST',
  CREATE_PRICE_ALERT: 'CREATE_PRICE_ALERT',
  REMOVE_PRICE_ALERT: 'REMOVE_PRICE_ALERT',
  TRIGGER_MARKET_EVENT: 'TRIGGER_MARKET_EVENT',
  UPDATE_MARKET_STATUS: 'UPDATE_MARKET_STATUS'
};

export function stockReducer(state, action) {
  switch (action.type) {
    case STOCK_ACTIONS.BUY_STOCK:
      {
        const { stockId, quantity, price } = action.payload;
        const totalCost = quantity * price;

        if (state.money < totalCost) {
          return state; // Not enough money
        }

        const existingHolding = state.portfolio.holdings.find(h => h.stockId === stockId);
        let newHoldings;

        if (existingHolding) {
          // Update existing holding with average cost basis
          const newQuantity = existingHolding.quantity + quantity;
          const newAveragePurchasePrice =
            (existingHolding.averagePurchasePrice * existingHolding.quantity + price * quantity) / newQuantity;

          newHoldings = state.portfolio.holdings.map(h =>
            h.stockId === stockId
              ? { ...h, quantity: newQuantity, averagePurchasePrice: newAveragePurchasePrice }
              : h
          );
        } else {
          // Create new holding
          newHoldings = [
            ...state.portfolio.holdings,
            { stockId, quantity, averagePurchasePrice: price }
          ];
        }

        return {
          ...state,
          money: state.money - totalCost,
          portfolio: {
            ...state.portfolio,
            holdings: newHoldings,
            totalInvested: state.portfolio.totalInvested + totalCost
          }
        };
      }

    case STOCK_ACTIONS.SELL_STOCK:
      {
        const { stockId, quantity, price } = action.payload;
        const existingHolding = state.portfolio.holdings.find(h => h.stockId === stockId);

        if (!existingHolding || existingHolding.quantity < quantity) {
          return state; // Not enough shares
        }

        const saleProceeds = quantity * price;
        const costBasis = quantity * existingHolding.averagePurchasePrice;
        const realizedGain = saleProceeds - costBasis;

        let newHoldings;
        if (existingHolding.quantity === quantity) {
          // Remove holding entirely
          newHoldings = state.portfolio.holdings.filter(h => h.stockId !== stockId);
        } else {
          // Reduce quantity
          newHoldings = state.portfolio.holdings.map(h =>
            h.stockId === stockId
              ? { ...h, quantity: h.quantity - quantity }
              : h
          );
        }

        return {
          ...state,
          money: state.money + saleProceeds,
          portfolio: {
            ...state.portfolio,
            holdings: newHoldings,
            totalInvested: state.portfolio.totalInvested - costBasis,
            realizedGainLoss: state.portfolio.realizedGainLoss + realizedGain
          }
        };
      }

    case STOCK_ACTIONS.UPDATE_STOCK_PRICES:
      {
        const updatedStocks = action.payload;
        return {
          ...state,
          stocks: state.stocks.map(stock => {
            const update = updatedStocks.find(u => u.id === stock.id);
            return update ? { ...stock, ...update } : stock;
          })
        };
      }

    case STOCK_ACTIONS.UPDATE_PORTFOLIO:
      return {
        ...state,
        portfolio: { ...state.portfolio, ...action.payload }
      };

    case STOCK_ACTIONS.PAY_DIVIDENDS:
      {
        const { stockId, dividendAmount } = action.payload;
        return {
          ...state,
          money: state.money + dividendAmount,
          portfolio: {
            ...state.portfolio,
            totalDividendsReceived: state.portfolio.totalDividendsReceived + dividendAmount
          },
          stocks: state.stocks.map(stock =>
            stock.id === stockId ? { ...stock, lastDividendDate: new Date().toISOString() } : stock
          )
        };
      }

    case STOCK_ACTIONS.ADD_WATCHLIST:
      return {
        ...state,
        portfolio: {
          ...state.portfolio,
          watchlist: [...state.portfolio.watchlist, action.payload]
        }
      };

    case STOCK_ACTIONS.REMOVE_WATCHLIST:
      return {
        ...state,
        portfolio: {
          ...state.portfolio,
          watchlist: state.portfolio.watchlist.filter(stockId => stockId !== action.payload)
        }
      };

    case STOCK_ACTIONS.CREATE_PRICE_ALERT:
      return {
        ...state,
        portfolio: {
          ...state.portfolio,
          priceAlerts: [...state.portfolio.priceAlerts, {
            id: Date.now().toString(),
            ...action.payload,
            active: true,
            createdDate: new Date().toISOString()
          }]
        }
      };

    case STOCK_ACTIONS.REMOVE_PRICE_ALERT:
      return {
        ...state,
        portfolio: {
          ...state.portfolio,
          priceAlerts: state.portfolio.priceAlerts.filter(alert => alert.id !== action.payload)
        }
      };

    case STOCK_ACTIONS.TRIGGER_MARKET_EVENT:
      return {
        ...state,
        stockMarket: {
          ...state.stockMarket,
          marketEvents: [...state.stockMarket.marketEvents, {
            id: Date.now().toString(),
            ...action.payload,
            timestamp: new Date().toISOString()
          }],
          lastEventDate: new Date().toISOString()
        }
      };

    case STOCK_ACTIONS.UPDATE_MARKET_STATUS:
      return {
        ...state,
        stockMarket: {
          ...state.stockMarket,
          ...action.payload
        }
      };

    default:
      return state;
  }
}

// Action creators
export const stockActions = {
  buyStock: (stockId, quantity, price) => ({
    type: STOCK_ACTIONS.BUY_STOCK,
    payload: { stockId, quantity, price }
  }),

  sellStock: (stockId, quantity, price) => ({
    type: STOCK_ACTIONS.SELL_STOCK,
    payload: { stockId, quantity, price }
  }),

  updateStockPrices: (stockUpdates) => ({
    type: STOCK_ACTIONS.UPDATE_STOCK_PRICES,
    payload: stockUpdates
  }),

  updatePortfolio: (portfolioUpdate) => ({
    type: STOCK_ACTIONS.UPDATE_PORTFOLIO,
    payload: portfolioUpdate
  }),

  payDividends: (stockId, dividendAmount) => ({
    type: STOCK_ACTIONS.PAY_DIVIDENDS,
    payload: { stockId, dividendAmount }
  }),

  addToWatchlist: (stockId) => ({
    type: STOCK_ACTIONS.ADD_WATCHLIST,
    payload: stockId
  }),

  removeFromWatchlist: (stockId) => ({
    type: STOCK_ACTIONS.REMOVE_WATCHLIST,
    payload: stockId
  }),

  createPriceAlert: (stockId, targetPrice, direction) => ({
    type: STOCK_ACTIONS.CREATE_PRICE_ALERT,
    payload: { stockId, targetPrice, direction }
  }),

  removePriceAlert: (alertId) => ({
    type: STOCK_ACTIONS.REMOVE_PRICE_ALERT,
    payload: alertId
  }),

  triggerMarketEvent: (eventData) => ({
    type: STOCK_ACTIONS.TRIGGER_MARKET_EVENT,
    payload: eventData
  }),

  updateMarketStatus: (statusUpdate) => ({
    type: STOCK_ACTIONS.UPDATE_MARKET_STATUS,
    payload: statusUpdate
  })
};