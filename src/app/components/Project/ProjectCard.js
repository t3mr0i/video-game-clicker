import React from 'react';
import { useGameContext } from '../../contexts/GameContext';
import { PROJECT_PHASES, PHASE_COLORS } from '../../config/gameConstants';
import Card from '../common/Card';
import ProgressBar from '../common/ProgressBar';
import Button from '../common/Button';
import Tooltip from '../common/Tooltip';

const ProjectCard = ({
  project,
  onCancel,
  onShip,
  onAssignEmployee,
  onOpenDetails
}) => {
  const { state } = useGameContext();

  const progressPercentage = project.progress || 0;

  const getPhaseColor = (phase) => {
    // Find the matching phase constant (case insensitive)
    const phaseKey = Object.keys(PROJECT_PHASES).find(
      key => PROJECT_PHASES[key].toLowerCase() === phase?.toLowerCase()
    );
    return phaseKey ? PHASE_COLORS[PROJECT_PHASES[phaseKey]] : 'gray';
  };

  const getPhaseDisplay = (phase) => {
    return phase.charAt(0).toUpperCase() + phase.slice(1).replace('-', ' ');
  };

  const assignedEmployees = (state.employees || []).filter(emp =>
    emp.assignedProjectId === project.id
  );

  const canShip = progressPercentage >= 100;
  const isInDevelopment = [
    PROJECT_PHASES.PRODUCTION.toLowerCase(),
    PROJECT_PHASES.ALPHA.toLowerCase(),
    PROJECT_PHASES.BETA.toLowerCase()
  ].includes(project.phase?.toLowerCase());

  return (
    <Card
      title={
        <div className="flex items-center justify-between">
          <span className="font-bold">{project.name}</span>
          <span className={`px-2 py-1 rounded text-sm bg-${getPhaseColor(project.phase)}-100 text-${getPhaseColor(project.phase)}-800`}>
            {getPhaseDisplay(project.phase)}
          </span>
        </div>
      }
      className="mb-4"
    >
      <div className="space-y-3">
        {/* Project Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Size:</span> {project.size}
          </div>
          <div>
            <span className="font-medium">Platform:</span> {project.platform}
          </div>
          <div>
            <span className="font-medium">Genre:</span> {project.genre}
          </div>
          {project.gameEngine && (
            <div>
              <span className="font-medium">Engine:</span> {project.gameEngine}
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <ProgressBar
          current={project.progress || 0}
          max={100}
          label="Development Progress"
          color={getPhaseColor(project.phase || PROJECT_PHASES.CONCEPT)}
          showPercentage={true}
        />

        {/* Assigned Employees */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              Assigned Team ({assignedEmployees.length})
            </span>
            <Tooltip content="Assign employees to work on this project">
              <Button
                size="small"
                variant="outline"
                onClick={() => onAssignEmployee && onAssignEmployee(project.id)}
              >
                Assign
              </Button>
            </Tooltip>
          </div>
          {assignedEmployees.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {assignedEmployees.map(emp => (
                <span
                  key={emp.id}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                >
                  {emp.name}
                </span>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-sm italic">
              No employees assigned
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-2">
          <div className="flex space-x-2">
            <Tooltip content="View detailed project information">
              <Button
                size="small"
                variant="secondary"
                onClick={() => onOpenDetails && onOpenDetails(project)}
              >
                Details
              </Button>
            </Tooltip>
            <Tooltip content="Cancel this project (no refund)">
              <Button
                size="small"
                variant="danger"
                onClick={() => onCancel && onCancel(project.id)}
              >
                Cancel
              </Button>
            </Tooltip>
          </div>

          <Tooltip content={
            canShip
              ? "Ship this game to market"
              : `Need ${Math.round(100 - (project.progress || 0))}% more development progress`
          }>
            <Button
              size="small"
              variant="success"
              disabled={!canShip}
              onClick={() => onShip && onShip(project)}
            >
              {canShip ? 'Ship Game' : 'In Development'}
            </Button>
          </Tooltip>
        </div>

        {/* Development Speed Indicator */}
        {assignedEmployees.length > 0 && (
          <div className="text-xs text-gray-600 border-t pt-2">
            <span className="font-medium">Development Speed:</span> {' '}
            {assignedEmployees.reduce((total, emp) => total + ((emp.productivity || 1) * 100), 0).toFixed(1)}%/day
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProjectCard;