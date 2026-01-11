import React, { useState } from 'react';
import { useGameContext } from '../../contexts/GameContext';
import Card from '../common/Card';
import Button from '../common/Button';
import ProjectCreationModal from './ProjectCreationModal';
import ProjectCard from './ProjectCard';
import EmployeeAssignmentModal from './EmployeeAssignmentModal';

const ProjectComponent = () => {
  const { state, actions } = useGameContext();
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [assignmentModal, setAssignmentModal] = useState({ isOpen: false, projectId: null });

  const handleCreateProject = (projectData) => {
    actions.addProject(projectData);
    actions.addNotification({
      message: `Started development of "${projectData.name}"`,
      type: 'info'
    });
  };

  const handleCancelProject = (projectId) => {
    const project = (state.projects || []).find(p => p.id === projectId);
    if (project && window.confirm(`Are you sure you want to cancel "${project.name}"? This cannot be undone.`)) {
      actions.deleteProject(projectId);
      actions.addNotification({
        message: `Cancelled project "${project.name}"`,
        type: 'warning'
      });
    }
  };

  const handleShipProject = (project) => {
    // Calculate game quality based on development and team
    const quality = Math.min(100, (project.progress / project.maxDevelopmentPoints) * 100);

    // Calculate revenue (simplified)
    const baseRevenue = 10000 * (project.size === 'AAA' ? 5 : project.size === 'AA' ? 2 : 1);
    const revenue = Math.floor(baseRevenue * (quality / 100));

    const completedProject = {
      ...project,
      quality,
      revenue,
      releaseDate: state.currentDate,
      status: 'shipped'
    };

    actions.completeProject(completedProject);
    actions.addNotification({
      message: `"${project.name}" shipped successfully! Revenue: $${revenue.toLocaleString()}`,
      type: 'success'
    });
  };

  const handleOpenDetails = (project) => {
    // Show project details in notification for now
    actions.addNotification({
      message: `Project: ${project.name} | Phase: ${project.phase} | Progress: ${Math.floor((project.progress / project.maxDevelopmentPoints) * 100)}%`,
      type: 'info'
    });
  };

  const handleAssignEmployee = (projectId) => {
    setAssignmentModal({ isOpen: true, projectId });
  };

  return (
    <Card
      title="Projects"
      headerActions={
        <Button
          size="small"
          onClick={() => setIsCreationModalOpen(true)}
        >
          + New Project
        </Button>
      }
    >
      <div className="space-y-4">
        {(state.projects || []).length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-500 mb-4">
              No active projects
            </div>
            <Button
              variant="primary"
              onClick={() => setIsCreationModalOpen(true)}
            >
              Start Your First Project
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {(state.projects || []).map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onCancel={handleCancelProject}
                onShip={handleShipProject}
                onOpenDetails={handleOpenDetails}
                onAssignEmployee={handleAssignEmployee}
              />
            ))}
          </div>
        )}

        {/* Project Creation Modal */}
        <ProjectCreationModal
          isOpen={isCreationModalOpen}
          onClose={() => setIsCreationModalOpen(false)}
          onCreateProject={handleCreateProject}
        />

        {/* Employee Assignment Modal */}
        <EmployeeAssignmentModal
          isOpen={assignmentModal.isOpen}
          onClose={() => setAssignmentModal({ isOpen: false, projectId: null })}
          projectId={assignmentModal.projectId}
        />
      </div>
    </Card>
  );
};

export default ProjectComponent;