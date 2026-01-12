import React, { useEffect } from 'react';
import { useGameContext } from '../../contexts/GameContext';
import { useProjectCreation } from '../../hooks/useProjectCreation';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Tooltip from '../common/Tooltip';
import Loading from '../common/Loading';

const ProjectCreationModal = ({ isOpen, onClose, onCreateProject }) => {
  const { state } = useGameContext();
  const {
    formData,
    developmentPoints,
    isCreating,
    handleInputChange,
    resetForm,
    submitProject,
    isFormValid,
    validationErrors,
    projectSummary
  } = useProjectCreation(state.currentDate);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitProject(onCreateProject, onClose);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Project"
      size="large"
    >
      <div className="relative">
        {isCreating && (
          <Loading
            overlay
            size="large"
            color="blue"
            message="Creating your project..."
          />
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
        {/* Project Name */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Project Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter project name..."
            required
          />
        </div>

        {/* Game Size */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Game Size
            <Tooltip content="A = Small indie game, AA = Medium budget game, AAA = Large budget game">
              <span className="ml-1 text-gray-400 cursor-help">ⓘ</span>
            </Tooltip>
          </label>
          <select
            value={formData.size}
            onChange={(e) => handleInputChange('size', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="A">A - Small Game</option>
            <option value="AA">AA - Medium Game</option>
            <option value="AAA">AAA - Large Game</option>
          </select>
        </div>

        {/* Platform */}
        <div>
          <label className="block text-sm font-medium mb-2">Platform</label>
          <select
            value={formData.platform}
            onChange={(e) => handleInputChange('platform', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Platform</option>
            {state.platforms.filter(p => p.unlocked).map(platform => (
              <option key={platform.id} value={platform.name}>
                {platform.name}
              </option>
            ))}
          </select>
        </div>

        {/* Genre */}
        <div>
          <label className="block text-sm font-medium mb-2">Genre</label>
          <select
            value={formData.genre}
            onChange={(e) => handleInputChange('genre', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Genre</option>
            {state.genres.filter(g => g.unlocked).map(genre => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        {/* Game Engine (if available) */}
        {state.technologies.length > 0 && (
          <div>
            <label className="block text-sm font-medium mb-2">
              Game Engine (Optional)
              <Tooltip content="Game engines can improve development efficiency">
                <span className="ml-1 text-gray-400 cursor-help">ⓘ</span>
              </Tooltip>
            </label>
            <select
              value={formData.gameEngine}
              onChange={(e) => handleInputChange('gameEngine', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">No Engine</option>
              {state.technologies.filter(tech => tech.type === 'engine').map(engine => (
                <option key={engine.id} value={engine.id}>
                  {engine.name} (Efficiency: {engine.efficiency}x)
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Development Points Display */}
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Required Development Points:</span>
            <span className="text-lg font-bold text-blue-600">
              {developmentPoints.toLocaleString()}
            </span>
          </div>
          <div className="text-xs text-gray-600 mt-1">
            This represents the total work needed to complete the project
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3 pt-4">
          <Button
            variant="secondary"
            onClick={onClose}
            type="button"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={!isFormValid || isCreating}
          >
            {isCreating ? 'Creating Project...' : 'Create Project'}
          </Button>
        </div>
      </form>
      </div>
    </Modal>
  );
};

export default ProjectCreationModal;