/**
 * Unit tests for game logic functions
 * These tests demonstrate how pure functions can be easily tested
 */

import { describe, test, expect } from 'vitest';
import {
  calculateSkillMatch,
  calculateProjectRevenue,
  calculateProjectProgress,
  shouldCompleteProject
} from '../src/app/gameLogic/projectCalculations.js';
import {
  calculateMoraleChanges,
  calculateTeamPersonalityHarmony,
  applyMoraleBounds
} from '../src/app/gameLogic/moraleCalculations.js';
import {
  calculateNewGameDate,
  calculateTimeStep,
  calculateDayProgress
} from '../src/app/gameLogic/timeCalculations.js';
import {
  checkForNewAchievements,
  calculateAchievementProgress
} from '../src/app/gameLogic/achievementCalculations.js';

describe('Project Calculations', () => {
  test('calculateSkillMatch should return correct skill match score', () => {
    const employee = {
      skills: { programming: 80, design: 60, testing: 40 },
      personality: ['Innovative']
    };
    const project = {
      requiredSkills: ['programming', 'design'],
      phase: 'Production'
    };

    const skillMatch = calculateSkillMatch(employee, project);
    expect(skillMatch).toBeGreaterThan(0);
    expect(skillMatch).toBeLessThanOrEqual(1);
  });

  test('calculateProjectProgress should return progress increment', () => {
    const project = {
      estimatedDays: 30,
      progress: 20
    };
    const employees = [{
      productivity: 1.2,
      skills: { programming: 80 }
    }];

    const progress = calculateProjectProgress(project, employees, 75, 0.1);
    expect(progress).toBeGreaterThan(0);
  });

  test('shouldCompleteProject should detect project completion', () => {
    const project = { progress: 95 };
    expect(shouldCompleteProject(project, 100)).toBe(true);
    expect(shouldCompleteProject(project, 99)).toBe(false);
  });

  test('calculateProjectRevenue should return reasonable revenue', () => {
    const project = {
      estimatedRevenue: 100000,
      size: 2,
      genre: 'Action',
      platform: 'PC',
      requiredSkills: ['programming', 'design']
    };

    const revenue = calculateProjectRevenue(project, 75);
    expect(revenue).toBeGreaterThan(0);
    expect(revenue).toBeGreaterThan(50000); // Should be at least half of base
  });
});

describe('Morale Calculations', () => {
  test('calculateTeamPersonalityHarmony should return harmony score', () => {
    const personalities = ['Creative', 'Innovative', 'Perfectionist'];
    const harmony = calculateTeamPersonalityHarmony(personalities);
    expect(typeof harmony).toBe('number');
    expect(harmony).toBeGreaterThanOrEqual(-1);
    expect(harmony).toBeLessThanOrEqual(1);
  });

  test('calculateMoraleChanges should handle workload stress', () => {
    const gameState = {
      projects: [
        { status: 'in-progress', phase: 'Production' },
        { status: 'in-progress', phase: 'Beta' }
      ],
      employees: [{ id: 1 }, { id: 2 }],
      money: 50000,
      completedProjects: []
    };

    const moraleChange = calculateMoraleChanges(gameState, 0.1);
    expect(typeof moraleChange).toBe('number');
  });

  test('applyMoraleBounds should constrain morale within 0-100', () => {
    expect(applyMoraleBounds(50, 60)).toBe(100);
    expect(applyMoraleBounds(50, -60)).toBe(0);
    expect(applyMoraleBounds(50, 20)).toBe(70);
  });
});

describe('Time Calculations', () => {
  test('calculateNewGameDate should advance time correctly', () => {
    const currentDate = { day: 15, month: 6, year: 2024 };
    const newDate = calculateNewGameDate(currentDate, 1.5);

    expect(newDate).toEqual({ day: 16, month: 6, year: 2024 });
  });

  test('calculateTimeStep should apply speed scaling', () => {
    const timeStep = calculateTimeStep(16.67, 2); // ~60fps frame at 2x speed
    expect(timeStep).toBeGreaterThan(0);
    expect(timeStep).toBeLessThan(1);
  });

  test('calculateDayProgress should convert time to day fraction', () => {
    const dayProgress = calculateDayProgress(1); // 1 second
    expect(dayProgress).toBeGreaterThan(0);
    expect(dayProgress).toBeLessThan(1);
  });
});

describe('Achievement Calculations', () => {
  test('checkForNewAchievements should detect first game completion', () => {
    const gameState = {
      completedProjects: [{ id: 1, name: 'My First Game' }],
      money: 50000,
      employees: [],
      morale: 50
    };

    const achievements = checkForNewAchievements(gameState, []);
    const firstGameAchievement = achievements.find(a => a.id === 'first_game');
    expect(firstGameAchievement).toBeDefined();
    expect(firstGameAchievement.title).toBe('First Steps');
  });

  test('calculateAchievementProgress should calculate progress percentage', () => {
    const unlockedAchievements = [
      { id: 'first_game' },
      { id: 'profitable' }
    ];

    const progress = calculateAchievementProgress(unlockedAchievements);
    expect(progress).toBeGreaterThan(0);
    expect(progress).toBeLessThanOrEqual(100);
  });
});

describe('Integration Tests', () => {
  test('Game logic should handle empty/invalid states gracefully', () => {
    const emptyGameState = {
      projects: [],
      employees: [],
      money: 0,
      morale: 50,
      currentDate: { day: 1, month: 1, year: 2024 }
    };

    // Should not throw errors with empty state
    expect(() => calculateMoraleChanges(emptyGameState, 0.1)).not.toThrow();
    expect(() => checkForNewAchievements(emptyGameState, [])).not.toThrow();
    expect(() => calculateNewGameDate(emptyGameState.currentDate, 0.1)).not.toThrow();
  });
});