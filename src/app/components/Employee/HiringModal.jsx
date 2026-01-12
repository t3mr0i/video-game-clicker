import React, { useEffect } from 'react';
import { useGameContext } from '../../contexts/GameContext';
import { useEmployeeHiring } from '../../hooks/useEmployeeHiring';
import { EMPLOYEE_TYPES } from '../../config/gameConstants';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Card from '../common/Card';
import Loading from '../common/Loading';

const HiringModal = ({ isOpen, onClose, onHire }) => {
  const { state } = useGameContext();
  const {
    selectedType,
    isHiring,
    previewEmployee,
    setSelectedType,
    executeHiring,
    resetHiring,
    hiringMetrics,
    canAfford,
    getEmployeeTypes
  } = useEmployeeHiring(state.money, state.employees, state.currentDate);

  // Reset when modal closes
  useEffect(() => {
    if (!isOpen) {
      resetHiring();
    }
  }, [isOpen, resetHiring]);

  const handleHire = async () => {
    await executeHiring(onHire, onClose);
  };

  const employeeTypes = getEmployeeTypes();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Hire New Employee"
      size="large"
    >
      <div className="relative space-y-6">
        {isHiring && (
          <Loading
            overlay
            size="large"
            color="green"
            message="Processing hire..."
          />
        )}
        {/* Employee Type Selection */}
        <div>
          <label className="block text-sm font-medium mb-3">
            Employee Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            {employeeTypes.map(type => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`p-3 border rounded-lg text-left transition-colors ${
                  selectedType === type.id
                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="font-medium">{type.name}</div>
                <div className="text-sm text-gray-600">
                  {type.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Cost Information */}
        <Card title="Hiring Cost" variant={canAfford ? 'default' : 'warning'}>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Hiring Cost:</span>
              <span className="font-bold">${hiringMetrics.hiringCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Monthly Salary:</span>
              <span>${hiringMetrics.monthlySalary.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Your Money:</span>
              <span className={canAfford ? 'text-green-600' : 'text-red-600'}>
                ${state.money.toLocaleString()}
              </span>
            </div>
          </div>
        </Card>

        {/* Preview Employee */}
        <Card title="Employee Preview">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-medium">Name:</span> {previewEmployee.name}
              </div>
              <div>
                <span className="font-medium">Type:</span> {previewEmployee.type}
              </div>
              <div>
                <span className="font-medium">Personality:</span> {previewEmployee.personality}
              </div>
              <div>
                <span className="font-medium">Skill Points:</span> {previewEmployee.skillPoints}
              </div>
            </div>

            <div>
              <span className="font-medium block mb-2">Skills:</span>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(previewEmployee.skills).map(([skill, value]) => (
                  <div key={skill} className="flex justify-between text-sm">
                    <span className="capitalize">{skill.replace('_', ' ')}:</span>
                    <span className="font-medium">{value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex justify-end space-x-3">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleHire}
            disabled={!canAfford || isHiring}
          >
            {isHiring ? 'Hiring...' : (canAfford ? 'Hire Employee' : 'Not Enough Money')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default HiringModal;