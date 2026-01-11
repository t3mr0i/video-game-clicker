import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Card from '../common/Card';
import Button from '../common/Button';
import Tooltip from '../common/Tooltip';

// Imported game icons
import developerIcon from '../../../assets/icons/employees/perspective-dice-six-faces-random.svg';
import designerIcon from '../../../assets/icons/employees/paint-brush.svg';
import marketerIcon from '../../../assets/icons/employees/bar-chart.svg';
import artistIcon from '../../../assets/icons/employees/graphic-design.svg';
import soundDesignerIcon from '../../../assets/icons/employees/music.svg';
import producerIcon from '../../../assets/icons/employees/movie-director.svg';
import defaultIcon from '../../../assets/icons/employees/player.svg';

const getTypeIcon = (type) => {
  switch (type) {
    case 'Developer': return developerIcon;
    case 'Designer': return designerIcon;
    case 'Marketer': return marketerIcon;
    case 'Artist': return artistIcon;
    case 'Sound Designer': return soundDesignerIcon;
    case 'Producer': return producerIcon;
    default: return defaultIcon;
  }
};

const getSkillColor = (skill) => {
  if (skill >= 80) return 'text-green-600';
  if (skill >= 60) return 'text-yellow-600';
  if (skill >= 40) return 'text-orange-600';
  return 'text-red-600';
};

const EmployeeCard = ({ employee, onFire, onViewDetails, onAssign }) => {
  const averageSkill = useMemo(() =>
    (employee.skills && Object.keys(employee.skills).length > 0)
      ? Math.round(Object.values(employee.skills).reduce((sum, skill) => sum + skill, 0) / Object.keys(employee.skills).length)
      : 50
  , [employee.skills]);

  return (
    <Card className="mb-3">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <img
              src={getTypeIcon(employee.type)}
              alt={`${employee.type} icon`}
              className="w-8 h-8 mr-2"
            />
            <div>
              <h4 className="font-bold text-lg">{employee.name}</h4>
              <p className="text-sm text-gray-600">{employee.type}</p>
            </div>
          </div>

          {employee.personality && (
            <div className="mb-2">
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                {employee.personality}
              </span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 text-sm mb-3">
            <div>
              <span className="font-medium">Salary:</span> ${employee.salary?.toLocaleString() || '0'}/month
            </div>
            <div>
              <span className="font-medium">Avg Skill:</span>{' '}
              <span className={getSkillColor(averageSkill)}>
                {averageSkill}%
              </span>
            </div>
            {employee.skillPoints > 0 && (
              <div className="col-span-2">
                <span className="font-medium">Skill Points:</span>{' '}
                <span className="text-blue-600">{employee.skillPoints}</span>
              </div>
            )}
            {employee.assignedProject && (
              <div className="col-span-2">
                <span className="font-medium">Assigned to:</span>{' '}
                <span className="text-green-600">{employee.assignedProject}</span>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <Tooltip content="View detailed employee information">
                <Button
                  size="small"
                  variant="secondary"
                  onClick={() => onViewDetails(employee)}
                >
                  Details
                </Button>
              </Tooltip>
              <Tooltip content="Assign to a project">
                <Button
                  size="small"
                  variant="primary"
                  onClick={() => onAssign(employee)}
                >
                  Assign
                </Button>
              </Tooltip>
            </div>

            <Tooltip content="Fire this employee">
              <Button
                size="small"
                variant="danger"
                onClick={() => onFire(employee.id)}
              >
                Fire
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
    </Card>
  );
};

EmployeeCard.propTypes = {
  employee: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    salary: PropTypes.number,
    skills: PropTypes.objectOf(PropTypes.number),
    skillPoints: PropTypes.number,
    personality: PropTypes.string,
    assignedProject: PropTypes.string
  }).isRequired,
  onFire: PropTypes.func.isRequired,
  onViewDetails: PropTypes.func.isRequired,
  onAssign: PropTypes.func.isRequired
};

export default React.memo(EmployeeCard);