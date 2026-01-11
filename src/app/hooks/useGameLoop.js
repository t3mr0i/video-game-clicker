'use client'
import { useEffect, useRef, useCallback } from 'react';
import { useGameContext } from '../contexts/GameContext';
import { GAME_MECHANICS } from '../config/gameConstants';

export function useGameLoop() {
  const { state, actions } = useGameContext();
  const gameLoopRef = useRef(null);
  const lastUpdateRef = useRef(Date.now());
  const frameAccumulator = useRef(0);
  const fixedTimeStep = useRef(1000 / 60); // 60 FPS fixed timestep
  const maxFrameTime = useRef(50); // Cap frame time to prevent spiral of death

  const processGameTick = useCallback(() => {
    const now = Date.now();
    const deltaTime = Math.min(now - lastUpdateRef.current, maxFrameTime.current);
    lastUpdateRef.current = now;

    // Skip if game is paused
    if (state.gameSpeed === 0) return;

    // Skip if tab was inactive for too long (> 5 seconds)
    if (deltaTime > 5000) return;

    // Fixed timestep with accumulator for stable updates
    frameAccumulator.current += deltaTime;

    while (frameAccumulator.current >= fixedTimeStep.current) {
      const gameTickDelta = fixedTimeStep.current;

      // Calculate time progression
      const timeStep = (gameTickDelta / 1000) * state.gameSpeed;
      const daysPerSecond = GAME_MECHANICS.GAME_DAYS_PER_REAL_SECOND;
      const dayProgress = timeStep * daysPerSecond;

      advanceTime(dayProgress);
      processAutomaticActions(dayProgress);

      frameAccumulator.current -= fixedTimeStep.current;
    }
  }, [state.gameSpeed, state.currentDate, state.projects, state.employees, state.money]);

  const advanceTime = useCallback((dayProgress) => {
    const current = state.currentDate;
    let totalDays = current.day + dayProgress;

    let newDay = Math.floor(totalDays);
    let newMonth = current.month;
    let newYear = current.year;

    // Handle month/year transitions
    while (newDay > GAME_MECHANICS.DAYS_PER_MONTH) {
      newDay -= GAME_MECHANICS.DAYS_PER_MONTH;
      newMonth++;
      if (newMonth > GAME_MECHANICS.MONTHS_PER_YEAR) {
        newMonth = 1;
        newYear++;
      }
    }

    // Only update if day actually changed
    if (Math.floor(totalDays) !== current.day || newMonth !== current.month || newYear !== current.year) {
      actions.updateTime({
        day: Math.max(1, newDay),
        month: newMonth,
        year: newYear
      });
    }
  }, [state.currentDate, actions]);

  const processAutomaticActions = useCallback((dayProgress) => {
    const changes = {
      projectUpdates: [],
      completedProjects: [],
      notifications: [],
      financialChanges: 0,
      moraleChanges: 0,
      achievements: []
    };

    // Process project advancement
    const activeProjects = (state.projects || []).filter(p => p.status === 'in-progress');
    activeProjects.forEach(project => {
      const assignedEmployees = (state.employees || []).filter(emp => emp.assignedProjectId === project.id);

      if (assignedEmployees.length > 0) {
        // Calculate work progress based on employee skills and project complexity
        const totalProductivity = assignedEmployees.reduce((sum, emp) => {
          const skillMatch = calculateSkillMatch(emp, project);
          const moraleBonus = Math.max(0.1, state.morale / 100); // Ensure minimum productivity
          return sum + (emp.productivity * skillMatch * moraleBonus);
        }, 0);

        const progressIncrement = (totalProductivity * dayProgress) / project.estimatedDays;
        const newProgress = Math.min(100, project.progress + progressIncrement);

        // Only update if progress changed significantly
        if (Math.abs(newProgress - project.progress) > 0.01) {
          changes.projectUpdates.push({
            id: project.id,
            updates: { progress: newProgress }
          });

          // Auto-complete if progress reaches 100%
          if (newProgress >= 100 && project.progress < 100) {
            const revenue = calculateProjectRevenue(project);
            changes.completedProjects.push({
              ...project,
              progress: 100,
              revenue,
              completedDate: state.currentDate
            });

            changes.notifications.push({
              message: `Project "${project.name}" completed! Revenue: $${revenue.toLocaleString()}`,
              type: 'success'
            });

            changes.financialChanges += revenue;
          }
        }
      }
    });

    // Process daily expenses (employee salaries)
    const dailyExpenses = (state.employees || []).reduce((total, emp) => total + (emp.salary / GAME_MECHANICS.DAYS_PER_MONTH), 0) * dayProgress;
    if (dailyExpenses > 0) {
      changes.financialChanges -= dailyExpenses;
    }

    // Process morale changes
    const moraleChange = calculateMoraleChanges(dayProgress);
    if (Math.abs(moraleChange) > 0.1) {
      changes.moraleChanges = moraleChange;
    }

    // Check for achievements
    changes.achievements = checkForNewAchievements();

    // Batch apply all changes
    applyBatchedChanges(changes);
  }, [state.projects, state.employees, state.morale, state.currentDate, state.money, actions]);

  const applyBatchedChanges = useCallback((changes) => {
    // Apply project updates
    changes.projectUpdates.forEach(update => {
      actions.updateProject(update.id, update.updates);
    });

    // Complete projects
    changes.completedProjects.forEach(project => {
      actions.completeProject(project);
    });

    // Add notifications
    changes.notifications.forEach(notification => {
      actions.addNotification(notification);
    });

    // Update finances
    if (Math.abs(changes.financialChanges) > 0.01) {
      actions.updateFinances({ amount: changes.financialChanges });
    }

    // Update morale
    if (changes.moraleChanges !== 0) {
      const newMorale = Math.max(0, Math.min(100, state.morale + changes.moraleChanges));
      actions.updateMorale(newMorale);
    }

    // Unlock achievements
    changes.achievements.forEach(achievement => {
      actions.unlockAchievement(achievement);
    });
  }, [actions, state.morale]);

  const calculateSkillMatch = (employee, project) => {
    // Simple skill matching - could be expanded based on project requirements
    const relevantSkills = ['programming', 'design', 'testing'];
    const skillSum = relevantSkills.reduce((sum, skill) => sum + (employee.skills[skill] || 50), 0);
    return skillSum / (relevantSkills.length * 100); // Normalize to 0-1
  };

  const calculateProjectRevenue = (project) => {
    // Base revenue calculation with quality-based variance
    const baseRevenue = project.estimatedRevenue || 50000;

    // Factor in project size and complexity
    const sizeMultiplier = project.size === 3 ? 2.5 : project.size === 2 ? 1.5 : 1.0;

    // Quality variance based on team composition and morale
    const teamQuality = state.morale / 100;
    const qualityVariance = 0.2 + (teamQuality * 0.3); // 0.2-0.5 range
    const randomFactor = 0.8 + (Math.random() * 0.4); // 0.8-1.2 range

    return Math.floor(baseRevenue * sizeMultiplier * qualityVariance * randomFactor);
  };

  const calculateMoraleChanges = (dayProgress) => {
    let moraleChange = 0;

    // Workload pressure - more nuanced calculation
    const activeProjects = (state.projects || []).filter(p => p.status === 'in-progress').length;
    const employeeCount = Math.max(1, (state.employees || []).length);
    const workloadRatio = activeProjects / employeeCount;

    if (workloadRatio > 2.5) {
      moraleChange -= 8 * dayProgress; // Severe overwork
    } else if (workloadRatio > 1.5) {
      moraleChange -= 3 * dayProgress; // Moderate overwork
    } else if (workloadRatio < 0.5) {
      moraleChange += 2 * dayProgress; // Well-staffed bonus
    }

    // Financial stress affects morale
    if (state.money < 5000) {
      moraleChange -= 5 * dayProgress; // Critical financial situation
    } else if (state.money < 25000) {
      moraleChange -= 2 * dayProgress; // Moderate financial pressure
    } else if (state.money > 100000) {
      moraleChange += 1 * dayProgress; // Financial security bonus
    }

    // Recent project completions boost morale (check completed in last few updates)
    const recentCompletions = (state.completedProjects || []).filter(p => {
      // Simple check - could be improved with actual date comparison
      return true; // Simplified for now
    }).length;

    if (recentCompletions > 0) {
      moraleChange += 0.5 * dayProgress; // Success breeds morale
    }

    return moraleChange;
  };

  const checkForNewAchievements = () => {
    const newAchievements = [];

    const achievementConditions = {
      first_game: () => (state.completedProjects || []).length >= 1,
      profitable: () => state.money >= 100000,
      team_player: () => (state.employees || []).length >= 10,
      aaa_developer: () => (state.completedProjects || []).some(p => p.size === 3),
      millionaire: () => state.money >= 1000000,
      speed_demon: () => (state.completedProjects || []).length >= 5,
      empire_builder: () => (state.employees || []).length >= 25,
      perfectionist: () => state.morale >= 95
    };

    Object.entries(achievementConditions).forEach(([id, condition]) => {
      if (condition() && !(state.achievements || []).some(a => a.id === id)) {
        const achievementData = {
          id,
          title: getAchievementTitle(id),
          description: getAchievementDescription(id),
          reward: getAchievementReward(id),
          unlockedAt: Date.now()
        };
        newAchievements.push(achievementData);
      }
    });

    return newAchievements;
  };

  const getAchievementTitle = (id) => {
    const titles = {
      first_game: 'First Steps',
      profitable: 'In the Black',
      team_player: 'Team Player',
      aaa_developer: 'AAA Developer',
      millionaire: 'Millionaire',
      speed_demon: 'Speed Demon',
      empire_builder: 'Empire Builder',
      perfectionist: 'Perfectionist'
    };
    return titles[id] || 'Achievement';
  };

  const getAchievementDescription = (id) => {
    const descriptions = {
      first_game: 'Complete your first game',
      profitable: 'Reach $100,000 in funds',
      team_player: 'Hire 10 employees',
      aaa_developer: 'Complete a AAA game',
      millionaire: 'Reach $1,000,000 in funds',
      speed_demon: 'Complete 5 games',
      empire_builder: 'Hire 25 employees',
      perfectionist: 'Achieve 95+ team morale'
    };
    return descriptions[id] || 'Achievement unlocked';
  };

  const getAchievementReward = (id) => {
    const rewards = {
      first_game: 5000,
      profitable: 10000,
      team_player: 15000,
      aaa_developer: 50000,
      millionaire: 100000,
      speed_demon: 25000,
      empire_builder: 75000,
      perfectionist: 30000
    };
    return rewards[id] || 0;
  };

  // Start/stop game loop based on game speed
  useEffect(() => {
    // Clear any existing interval
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
      gameLoopRef.current = null;
    }

    // Reset frame accumulator when starting/stopping
    frameAccumulator.current = 0;
    lastUpdateRef.current = Date.now();

    if (state.gameSpeed > 0) {
      gameLoopRef.current = setInterval(processGameTick, fixedTimeStep.current);
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
    };
  }, [state.gameSpeed, processGameTick]);

  // Performance monitoring
  const getPerformanceStats = useCallback(() => {
    return {
      frameTime: fixedTimeStep.current,
      maxFrameTime: maxFrameTime.current,
      accumulatedTime: frameAccumulator.current,
      isRunning: state.gameSpeed > 0,
      speed: state.gameSpeed
    };
  }, [state.gameSpeed]);

  return {
    isRunning: state.gameSpeed > 0,
    currentSpeed: state.gameSpeed,
    getPerformanceStats
  };
}