import React, { useState, useEffect } from 'react';
import { useGameContext } from '../../contexts/GameContext';
import Modal from '../common/Modal';
import Button from '../common/Button';

const EmployeeAssignmentModal = ({ isOpen, onClose, projectId }) => {
  const { state, actions } = useGameContext();
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const project = state.projects.find(p => p.id === projectId);
  const availableEmployees = state.employees.filter(emp =>
    !emp.assignedProjectId || emp.assignedProjectId === projectId
  );
  const currentlyAssigned = state.employees.filter(emp =>
    emp.assignedProjectId === projectId
  );

  useEffect(() => {
    if (isOpen) {
      setSelectedEmployees(currentlyAssigned.map(emp => emp.id));
    }
  }, [isOpen, currentlyAssigned]);

  const handleEmployeeToggle = (employeeId) => {
    setSelectedEmployees(prev =>
      prev.includes(employeeId)
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleSave = () => {
    // First, unassign all employees from this project
    currentlyAssigned.forEach(emp => {
      actions.updateEmployee(emp.id, { assignedProjectId: null });
    });

    // Then assign selected employees to this project
    selectedEmployees.forEach(empId => {
      actions.updateEmployee(empId, { assignedProjectId: projectId });
    });

    // Update project status to in-progress if it has employees
    if (selectedEmployees.length > 0 && project.status !== 'in-progress') {
      actions.updateProject(projectId, { status: 'in-progress' });
    }

    actions.addNotification({
      message: `Updated team assignment for "${project?.name}"`,
      type: 'success'
    });

    onClose();
  };

  const getEmployeeRole = (employee) => {
    const skills = employee.skills || {};
    const maxSkill = Math.max(
      skills.programming || 0,
      skills.design || 0,
      skills.testing || 0,
      skills.management || 0
    );

    if (skills.programming === maxSkill) return 'Programmer';
    if (skills.design === maxSkill) return 'Designer';
    if (skills.testing === maxSkill) return 'Tester';
    if (skills.management === maxSkill) return 'Manager';
    return 'General';
  };

  const calculateTeamProductivity = () => {
    const assigned = availableEmployees.filter(emp =>
      selectedEmployees.includes(emp.id)
    );

    if (assigned.length === 0) return 0;

    const totalProductivity = assigned.reduce((sum, emp) =>
      sum + (emp.productivity || 1), 0
    );

    return (totalProductivity * 100).toFixed(1);
  };

  if (!project) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Assign Team to "${project.name}"`}
      size="large"
    >
      <div className="space-y-6">
        {/* Project Info */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Size:</span> {project.size}
            </div>
            <div>
              <span className="font-medium">Genre:</span> {project.genre}
            </div>
            <div>
              <span className="font-medium">Current Progress:</span> {(project.progress || 0).toFixed(1)}%
            </div>
            <div>
              <span className="font-medium">Team Productivity:</span> {calculateTeamProductivity()}%/day
            </div>
          </div>
        </div>

        {/* Employee List */}
        <div>
          <h4 className="font-medium mb-3">Available Employees ({availableEmployees.length})</h4>

          {availableEmployees.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No employees available. Hire some employees first!
            </div>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {availableEmployees.map(employee => {
                const isSelected = selectedEmployees.includes(employee.id);
                const isCurrentlyAssigned = employee.assignedProjectId === projectId;

                return (
                  <div
                    key={employee.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleEmployeeToggle(employee.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleEmployeeToggle(employee.id)}
                          className="h-4 w-4 text-blue-600"
                        />
                        <div>
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-sm text-gray-600">
                            {getEmployeeRole(employee)} • Productivity: {((employee.productivity || 1) * 100).toFixed(0)}%
                          </div>
                        </div>
                      </div>

                      <div className="text-right text-sm">
                        <div className="font-medium">${employee.salary?.toLocaleString() || '0'}/month</div>
                        {isCurrentlyAssigned && (
                          <div className="text-blue-600">Currently assigned</div>
                        )}
                        {employee.assignedProjectId && employee.assignedProjectId !== projectId && (
                          <div className="text-yellow-600">Assigned elsewhere</div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Team Summary */}
        {selectedEmployees.length > 0 && (
          <div className="bg-green-50 p-4 rounded-lg">
            <h5 className="font-medium text-green-800 mb-2">Team Summary</h5>
            <div className="text-sm text-green-700">
              <div>Selected Employees: {selectedEmployees.length}</div>
              <div>Expected Development Speed: {calculateTeamProductivity()}% per day</div>
              <div>
                Estimated Time to Complete: {' '}
                {selectedEmployees.length > 0
                  ? `${Math.ceil((100 - (project.progress || 0)) / parseFloat(calculateTeamProductivity()))} days`
                  : 'N/A'
                }
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Update Assignment
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EmployeeAssignmentModal;