import React, { useState } from 'react';
import { useGameContext } from '../../contexts/GameContext';
import { EMPLOYEE_TYPES, EMPLOYEE_PERSONALITIES } from '../../config/gameConstants';
import { calculateEmployeeCost } from '../../config/gameFormulas';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Card from '../common/Card';

const HiringModal = ({ isOpen, onClose, onHire }) => {
  const { state } = useGameContext();
  const [selectedType, setSelectedType] = useState(EMPLOYEE_TYPES.DEVELOPER);

  const hiringCost = calculateEmployeeCost((state.employees || []).length);
  const canAfford = state.money >= hiringCost;

  const generateRandomEmployee = () => {
    const personalities = EMPLOYEE_PERSONALITIES[selectedType] || [];
    const personality = personalities[Math.floor(Math.random() * personalities.length)];

    return {
      name: generateRandomName(),
      type: selectedType,
      personality,
      salary: Math.floor(hiringCost * 0.1), // 10% of hiring cost as monthly salary
      skills: generateRandomSkills(selectedType),
      skillPoints: 2, // Starting skill points
      hireDate: state.currentDate,
      experience: 0
    };
  };

  const generateRandomName = () => {
    const firstNames = [
      'Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Avery', 'Quinn',
      'Sam', 'Jamie', 'Reese', 'Blake', 'Drew', 'Sage', 'Rowan', 'Finley'
    ];
    const lastNames = [
      'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller',
      'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez'
    ];
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${firstName} ${lastName}`;
  };

  const generateRandomSkills = (type) => {
    const baseSkill = 30 + Math.floor(Math.random() * 40); // 30-70 base skill
    const variation = () => baseSkill + Math.floor(Math.random() * 20) - 10; // ±10 variation

    switch (type) {
      case EMPLOYEE_TYPES.DEVELOPER:
        return {
          programming: variation(),
          debugging: variation(),
          testing: variation(),
          architecture: variation()
        };
      case EMPLOYEE_TYPES.DESIGNER:
        return {
          ui_design: variation(),
          ux_design: variation(),
          prototyping: variation(),
          creativity: variation()
        };
      case EMPLOYEE_TYPES.MARKETER:
        return {
          market_research: variation(),
          advertising: variation(),
          social_media: variation(),
          analytics: variation()
        };
      default:
        return {
          general: variation(),
          communication: variation(),
          problem_solving: variation(),
          teamwork: variation()
        };
    }
  };

  const handleHire = () => {
    if (canAfford) {
      const newEmployee = generateRandomEmployee();
      onHire(newEmployee);
      onClose();
    }
  };

  const [previewEmployee] = useState(generateRandomEmployee);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Hire New Employee"
      size="large"
    >
      <div className="space-y-6">
        {/* Employee Type Selection */}
        <div>
          <label className="block text-sm font-medium mb-3">
            Employee Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            {Object.values(EMPLOYEE_TYPES).map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`p-3 border rounded-lg text-left transition-colors ${
                  selectedType === type
                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="font-medium">{type}</div>
                <div className="text-sm text-gray-600">
                  Specializes in {type.toLowerCase()} work
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
              <span className="font-bold">${hiringCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Monthly Salary:</span>
              <span>${Math.floor(hiringCost * 0.1).toLocaleString()}</span>
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
            disabled={!canAfford}
          >
            {canAfford ? 'Hire Employee' : 'Not Enough Money'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default HiringModal;