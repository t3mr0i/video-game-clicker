/**
 * Price alert modal component for creating price alerts
 */

import React from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';

const PriceAlertModal = ({
  isOpen,
  onClose,
  stocks,
  alertTarget,
  setAlertTarget,
  onCreateAlert
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
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
            {stocks.map(stock => (
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
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={onCreateAlert}
            disabled={!alertTarget.stockId || !alertTarget.targetPrice}
            className="flex-1"
          >
            Create Alert
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PriceAlertModal;