import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { GameProvider, useGameContext } from './GameContext';
import { GAME_MECHANICS } from '../config/gameConstants';

describe('Game State Management Integration', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = ({ children }: { children: React.ReactNode }) => {
      return (
        <GameProvider>
          {children}
        </GameProvider>
      );
    };
  });

  it('should correctly track game state through entire project lifecycle', () => {
    const { result } = renderHook(() => useGameContext(), { wrapper });

    // Initial state checks
    expect(result.current.state.money).toBe(10000);
    expect(result.current.state.projects.length).toBe(0);
    expect(result.current.state.studioLevel).toBe(1);

    // Create a new project
    act(() => {
      result.current.actions.addProject({
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
    expect(createdProject.status).toBeUndefined();

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
      result.current.actions.updateEmployee(hiredEmployee.id, { assignedProjectId: createdProject.id });
    });

    // Simulate project development progress
    act(() => {
      // Mock time progression and development
      for (let i = 0; i < 10; i++) {
        // Simulate a day passing
        result.current.actions.updateTime({ day: result.current.state.currentDate.day + 1 });
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
      result.current.actions.setStudioLevel(2);
    });

    // Unlock game engine framework
    const engineFrameworkId = GAME_MECHANICS.TECHNOLOGY_IDS.GAME_ENGINE_FRAMEWORK;

    act(() => {
      result.current.actions.unlockTechnology(engineFrameworkId);
    });

    // Verify technology unlocked
    const unlockedTech = result.current.state.technologies.find(
      tech => tech === engineFrameworkId
    );
    expect(unlockedTech).toBe(engineFrameworkId);

  });

});