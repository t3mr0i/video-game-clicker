/**
 * Custom hook for project creation business logic
 * Extracts form state, validation, calculations, and submission logic
 */

import { useState, useEffect, useCallback } from 'react';
import { calculateDevelopmentPoints } from '../config/gameFormulas';
import { GAME_SIZES } from '../config/gameConstants';

export function useProjectCreation(currentDate) {
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

  // Reset form
  const resetForm = useCallback(() => {
    setFormData({
      name: '',
      size: 'A',
      platform: '',
      genre: '',
      gameEngine: '',
      franchise: ''
    });
    setDevelopmentPoints(0);
    setIsCreating(false);
  }, []);

  // Handle input changes
  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  // Recalculate development points when relevant form data changes
  useEffect(() => {
    if (formData.platform && formData.genre) {
      const points = calculateDevelopmentPoints(
        formData.platform,
        formData.genre,
        GAME_SIZES[formData.size],
        currentDate.year
      );
      setDevelopmentPoints(points);
    } else {
      setDevelopmentPoints(0);
    }
  }, [formData.size, formData.platform, formData.genre, currentDate.year]);

  // Calculate estimated revenue
  const calculateEstimatedRevenue = useCallback((size, platform, genre) => {
    const baseMoney = { 'A': 50000, 'AA': 200000, 'AAA': 1000000 };
    const platformMultiplier = {
      'PC': 1.0,
      'Mobile': 0.8,
      'Console': 1.5,
      'Web': 0.5,
      'VR': 2.0
    };

    return (baseMoney[size] || 50000) * (platformMultiplier[platform] || 1.0);
  }, []);

  // Form validation
  const isFormValid = useCallback(() => {
    return !!(formData.name || '').trim() && formData.platform && formData.genre;
  }, [formData.name, formData.platform, formData.genre]);

  // Get validation errors
  const getValidationErrors = useCallback(() => {
    const errors = [];

    if (!(formData.name || '').trim()) {
      errors.push('Project name is required');
    }
    if (!formData.platform) {
      errors.push('Platform selection is required');
    }
    if (!formData.genre) {
      errors.push('Genre selection is required');
    }

    return errors;
  }, [formData]);

  // Create project data object
  const createProjectData = useCallback(() => {
    return {
      ...formData,
      estimatedDays: Math.max(30, developmentPoints / 100),
      estimatedRevenue: calculateEstimatedRevenue(formData.size, formData.platform, formData.genre),
      progress: 0,
      status: 'planning',
      phase: 'concept',
      startDate: currentDate,
      developmentPoints: developmentPoints
    };
  }, [formData, developmentPoints, currentDate, calculateEstimatedRevenue]);

  // Submit project creation
  const submitProject = useCallback(async (onCreateProject, onSuccess) => {
    if (!isFormValid()) return false;

    setIsCreating(true);

    try {
      // Simulate project creation processing time
      await new Promise(resolve => setTimeout(resolve, 1200));

      const projectData = createProjectData();
      await onCreateProject(projectData);

      if (onSuccess) {
        onSuccess();
      }

      return true;
    } catch (error) {
      console.error('Project creation failed:', error);
      return false;
    } finally {
      setIsCreating(false);
    }
  }, [isFormValid, createProjectData]);

  // Get project summary for display
  const getProjectSummary = useCallback(() => {
    if (!formData.platform || !formData.genre) {
      return null;
    }

    return {
      estimatedDays: Math.max(30, developmentPoints / 100),
      estimatedRevenue: calculateEstimatedRevenue(formData.size, formData.platform, formData.genre),
      developmentPoints: developmentPoints,
      complexity: formData.size,
      platform: formData.platform,
      genre: formData.genre
    };
  }, [formData, developmentPoints, calculateEstimatedRevenue]);

  return {
    // State
    formData,
    developmentPoints,
    isCreating,

    // Actions
    handleInputChange,
    resetForm,
    submitProject,

    // Validation
    isFormValid: isFormValid(),
    validationErrors: getValidationErrors(),

    // Calculations
    projectSummary: getProjectSummary(),

    // Utilities
    calculateEstimatedRevenue
  };
}