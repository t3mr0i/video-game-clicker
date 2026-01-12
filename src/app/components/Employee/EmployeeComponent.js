import React, { useState } from 'react';
import { useGameContext } from '../../contexts/GameContext';
import { useNotification } from '../../hooks/useNotification';
import Card from '../common/Card';
import Button from '../common/Button';
import EmployeeCard from './EmployeeCard';
import HiringModal from './HiringModal';

const EmployeeComponent = () => {
  const { state, actions } = useGameContext();
  const { gameEvents, notifyInfo } = useNotification();
  const [isHiringModalOpen, setIsHiringModalOpen] = useState(false);

  const handleHireEmployee = (employeeData) => {
    actions.hireEmployee(employeeData);
    gameEvents.employeeHired(employeeData);
  };

  const handleFireEmployee = (employeeId) => {
    const employee = (state.employees || []).find(e => e.id === employeeId);
    if (employee && window.confirm(`Are you sure you want to fire ${employee.name}?`)) {
      actions.fireEmployee(employeeId);
      gameEvents.employeeFired(employee);
    }
  };

  const handleViewDetails = (employee) => {
    // Full employee detail modal would go here
    const skillsText = employee.skills
      ? Object.entries(employee.skills).map(([skill, level]) => `${skill}: ${level}`).join(', ')
      : 'None';

    notifyInfo(`${employee.name} (${employee.type}) - Salary: $${employee.salary?.toLocaleString() || 'N/A'} - Skills: ${skillsText}`);
  };

  const handleAssignEmployee = (employee) => {
    // Project assignment functionality would go here
    // For now, just show info about the employee
    notifyInfo(`${employee.name} is available for assignment to projects. Feature coming soon!`);
  };

  const totalMonthlySalaries = (state.employees || []).reduce((total, emp) => total + (emp.salary || 0), 0);

  return (
    <Card
      title={`Employees (${(state.employees || []).length})`}
      headerActions={
        <Button
          size="small"
          onClick={() => setIsHiringModalOpen(true)}
        >
          + Hire
        </Button>
      }
    >
      <div className="space-y-4">
        {/* Summary */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Total Employees:</span> {(state.employees || []).length}
            </div>
            <div>
              <span className="font-medium">Monthly Salaries:</span> ${totalMonthlySalaries.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Employee List */}
        {(state.employees || []).length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-500 mb-4">
              No employees hired yet
            </div>
            <Button
              variant="primary"
              onClick={() => setIsHiringModalOpen(true)}
            >
              Hire Your First Employee
            </Button>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {(state.employees || []).map(employee => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onFire={handleFireEmployee}
                onViewDetails={handleViewDetails}
                onAssign={handleAssignEmployee}
              />
            ))}
          </div>
        )}

        {/* Hiring Modal */}
        <HiringModal
          isOpen={isHiringModalOpen}
          onClose={() => setIsHiringModalOpen(false)}
          onHire={handleHireEmployee}
        />
      </div>
    </Card>
  );
};

export default EmployeeComponent;