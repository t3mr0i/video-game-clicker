import React, { useState, useEffect } from 'react';
import { useGameContext } from '../../contexts/GameContext';
import { calculateDevelopmentPoints } from '../../config/gameFormulas';
import { GAME_SIZES } from '../../config/gameConstants';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Tooltip from '../common/Tooltip';
import Loading from '../common/Loading';

const ProjectCreationModal = ({ isOpen, onClose, onCreateProject }) => {
  const { state } = useGameContext();
  const [formData, setFormData] = useState({
    name: '',
    size: 'A',
    platform: '',
    genre: '',
    gameEngine: '',
    franchise: ''
  });
  const [developmentPoints, setDevelopmentPoints] = useState(0);
  const [isCreating, setIsCreating] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        size: 'A',
        platform: '',
        genre: '',
        gameEngine: '',
        franchise: ''
      });
    }
  }, [isOpen]);

  // Recalculate development points when relevant form data changes
  useEffect(() => {
    if (formData.platform && formData.genre) {
      const points = calculateDevelopmentPoints(
        formData.platform,
        formData.genre,
        GAME_SIZES[formData.size],
        state.currentDate.year
      );
      setDevelopmentPoints(points);
    } else {
      setDevelopmentPoints(0);
    }
  }, [formData.size, formData.platform, formData.genre, state.currentDate.year]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateEstimatedRevenue = (size, platform, genre) => {
    const baseMoney = { 'A': 50000, 'AA': 200000, 'AAA': 1000000 };
    const platformMultiplier = { 'PC': 1.0, 'Mobile': 0.8, 'Console': 1.5, 'Web': 0.5, 'VR': 2.0 };

    return (baseMoney[size] || 50000) * (platformMultiplier[platform] || 1.0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((formData.name || '').trim() && formData.platform && formData.genre) {
      setIsCreating(true);

      try {
        // Simulate project creation processing time
        await new Promise(resolve => setTimeout(resolve, 1200));

        const projectData = {
          ...formData,
          estimatedDays: Math.max(30, developmentPoints / 100), // Estimate based on development points
          estimatedRevenue: calculateEstimatedRevenue(formData.size, formData.platform, formData.genre),
          progress: 0,
          status: 'planning',
          phase: 'concept',
          startDate: state.currentDate
        };
        onCreateProject(projectData);
        onClose();
      } finally {
        setIsCreating(false);
      }
    }
  };

  const isFormValid = (formData.name || '').trim() && formData.platform && formData.genre;

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