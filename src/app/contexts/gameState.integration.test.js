import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react-hooks';
import { GameContextProvider, useGameContext } from './GameContext';
import { GAME_MECHANICS } from '../config/gameConstants';

describe('Game State Management Integration', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = ({ children }) => (
      <GameContextProvider>
        {children}
      </GameContextProvider>
    );
  });

  it('should correctly track game state through entire project lifecycle', () => {
    const { result } = renderHook(() => useGameContext(), { wrapper });

    // Initial state checks
    expect(result.current.state.bankAccount).toBe(50000);
    expect(result.current.state.projects.length).toBe(0);
    expect(result.current.state.studioLevel).toBe(1);

    // Create a new project
    act(() => {
      result.current.actions.createProject({
        name: 'Test Game',
        genre: 'Action',
        platform: 'PC',
        size: 'A'
      });
    });

    // Validate project created
    expect(result.current.state.projects.length).toBe(1);
    const createdProject = result.current.state.projects[0];
    expect(createdProject.name).toBe('Test Game');
    expect(createdProject.genre).toBe('Action');
    expect(createdProject.status).toBe('concept');

    // Hire an employee and assign to project
    act(() => {
      result.current.actions.hireEmployee({
        name: 'Test Developer',
        role: 'Developer',
        skills: { programming: 50 }
      });
    });

    const hiredEmployee = result.current.state.employees[0];
    expect(hiredEmployee).toBeTruthy();

    act(() => {
      result.current.actions.assignEmployeeToProject(hiredEmployee.id, createdProject.id);
    });

    // Simulate project development progress
    act(() => {
      // Mock time progression and development
      for (let i = 0; i < 10; i++) {
        result.current.actions.advanceGameTime();
      }
    });

    // Check project progress
    const updatedProject = result.current.state.projects.find(p => p.id === createdProject.id);
    expect(updatedProject.status).not.toBe('concept');
    expect(updatedProject.developmentProgress).toBeGreaterThan(0);

    // Validate resource changes
    expect(result.current.state.bankAccount).toBeLessThan(50000); // Spent on employee, project
    expect(result.current.state.employees[0].assignedProjectId).toBe(createdProject.id);
  });

  it('should handle technology unlocking and game engine creation', () => {
    const { result } = renderHook(() => useGameContext(), { wrapper });

    // Start with fresh game state (level 2 to unlock tech)
    act(() => {
      result.current.actions.updateStudioLevel(2);
    });

    // Unlock game engine framework
    const engineFrameworkId = GAME_MECHANICS.TECHNOLOGY_IDS.GAME_ENGINE_FRAMEWORK;

    act(() => {
      result.current.actions.unlockTechnology(engineFrameworkId);
    });

    // Verify technology unlocked
    const unlockedTech = result.current.state.technologies.find(
      tech => tech.id === engineFrameworkId
    );
    expect(unlockedTech.unlocked).toBe(true);

    // Create game engine
    act(() => {
      result.current.actions.createGameEngine({
        name: 'Test Engine',
        type: 'Basic'
      });
    });

    // Validate game engine creation
    expect(result.current.state.gameEngines.length).toBe(1);
    const createdEngine = result.current.state.gameEngines[0];
    expect(createdEngine.name).toBe('Test Engine');
    expect(createdEngine.type).toBe('Basic');
  });

  it('should correctly handle studio culture and cultural values', () => {
    const { result } = renderHook(() => useGameContext(), { wrapper });

    // Start at level 2 to allow cultural values
    act(() => {
      result.current.actions.updateStudioLevel(2);
    });

    // Adopt a cultural value
    const culturalValues = [
      {
        id: 'innovation_culture',
        name: 'Innovation Culture',
        description: 'Boost creative thinking',
        bonuses: { qualityBonus: 0.1, developmentSpeed: -0.05 }
      }
    ];

    act(() => {
      result.current.actions.adoptCulturalValue('innovation_culture');
    });

    // Validate cultural value adoption
    expect(result.current.state.studioCulture.values.length).toBe(1);
    const adoptedValue = result.current.state.studioCulture.values[0];
    expect(adoptedValue.id).toBe('innovation_culture');

    // Check applied bonuses
    expect(result.current.state.studioCulture.bonuses.qualityBonus).toBe(1.1);
    expect(result.current.state.studioCulture.bonuses.developmentSpeed).toBe(0.95);
  });
});