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

    // Prevent excessive accumulation with speed-adjusted buffer
    // More intelligent speed buffer with exponential falloff
    const speedAdjustedBuffer = fixedTimeStep.current * (10 * Math.log2(state.gameSpeed + 1));
    frameAccumulator.current = Math.min(frameAccumulator.current + deltaTime, speedAdjustedBuffer);

    let iterations = 0;
    // Logarithmic iteration limit to prevent game slowdown
    const maxIterations = Math.max(3, Math.floor(Math.log2(state.gameSpeed + 1) * 3));

    while (frameAccumulator.current >= fixedTimeStep.current && iterations < maxIterations) {
      const gameTickDelta = fixedTimeStep.current;

      // Non-linear time scaling to prevent abrupt speed changes
      const timeStep = Math.max(0, (gameTickDelta / 1000) * Math.pow(state.gameSpeed, 0.75));
      const daysPerSecond = GAME_MECHANICS.GAME_DAYS_PER_REAL_SECOND;
      const dayProgress = Math.max(0, timeStep * daysPerSecond);

      // Error handling for tick processing
      try {
        advanceTime(dayProgress);
        processAutomaticActions(dayProgress);
      } catch (error) {
        console.error('Game tick processing error:', error);
        break; // Exit loop on error to prevent game freeze
      }

      frameAccumulator.current -= fixedTimeStep.current;
      iterations++;
    }

    // Reset accumulator if iterations exceeded
    if (iterations === maxIterations) {
      frameAccumulator.current = 0;
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

        // More precise progress calculation with dynamic scaling
        const progressBase = 100 / project.estimatedDays;
        const progressMultiplier = 1 + (totalProductivity * 0.5); // Dynamic multiplier
        const progressIncrement = progressBase * progressMultiplier * dayProgress;
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

    // Process stock price fluctuations
    processStockPriceFluctuations(dayProgress);

    // Process enhanced stock features
    processDividendPayments();
    checkPriceAlerts();
    processMarketEvents(dayProgress);

    // Batch apply all changes
    applyBatchedChanges(changes);
  }, [state.projects, state.employees, state.morale, state.currentDate, state.money, state.stocks, actions]);

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
    // More sophisticated skill matching based on project phase and requirements
    const relevantSkills = project.requiredSkills || ['programming', 'design', 'testing'];
    const phaseMultipliers = {
      'Concept': 0.5,
      'Pre-production': 0.7,
      'Production': 1.0,
      'Alpha': 1.2,
      'Beta': 1.5,
      'Release': 1.0
    };

    const phaseMultiplier = phaseMultipliers[project.phase] || 1.0;

    // Deeper skill calculation with personality and experience factors
    const skillSum = relevantSkills.reduce((sum, skill) => {
      const skillLevel = employee.skills[skill] || 50;
      const personalityBonus = employee.personality.includes('Innovative') ? 1.1 :
                                employee.personality.includes('Perfectionist') ? 1.05 : 1.0;

      return sum + (skillLevel * personalityBonus);
    }, 0);

    // Normalize and apply phase multiplier
    return Math.min(1, (skillSum / (relevantSkills.length * 100)) * phaseMultiplier);
  };

  const calculateProjectRevenue = (project) => {
    // More dynamic revenue calculation with genre and market factors
    const baseRevenue = project.estimatedRevenue || 50000;

    // Sophisticated size and complexity multipliers
    const sizeMultipliers = {
      1: 1.0,  // Small game
      2: 1.5,  // Medium game
      3: 2.5   // Large AAA game
    };
    const sizeMultiplier = sizeMultipliers[project.size] || 1.0;

    // Genre popularity and current market trends
    const genrePopularityMultipliers = {
      'Action': 1.3,
      'RPG': 1.2,
      'Strategy': 1.1,
      'Simulation': 0.9,
      'Puzzle': 0.8
    };
    const genreMultiplier = genrePopularityMultipliers[project.genre] || 1.0;

    // Quality variance based on team composition, morale, and project complexity
    const teamQuality = state.morale / 100;
    const projectComplexityFactor = project.requiredSkills ? project.requiredSkills.length * 0.1 : 0.2;
    const qualityVariance = 0.2 + (teamQuality * 0.3) + projectComplexityFactor;

    // Random market reception factor
    const marketReceptionFactor = 0.8 + (Math.random() * 0.4);

    // Platform factor
    const platformMultipliers = {
      'PC': 1.0,
      'Console': 1.2,
      'Mobile': 0.9,
      'Web': 0.7,
      'VR': 1.5
    };
    const platformMultiplier = platformMultipliers[project.platform] || 1.0;

    return Math.floor(
      baseRevenue *
      sizeMultiplier *
      genreMultiplier *
      qualityVariance *
      marketReceptionFactor *
      platformMultiplier
    );
  };

  const calculateMoraleChanges = (dayProgress) => {
    let moraleChange = 0;

    // Workload pressure - more dynamic calculation
    const activeProjects = (state.projects || []).filter(p => p.status === 'in-progress');
    const employeeCount = Math.max(1, (state.employees || []).length);
    const workloadRatio = activeProjects.length / employeeCount;

    // Project phase complexity impacts workload
    const phaseWorkloadImpact = activeProjects.reduce((impact, project) => {
      const phaseMultipliers = {
        'Concept': 0.2,
        'Pre-production': 0.5,
        'Production': 1.0,
        'Alpha': 1.5,
        'Beta': 2.0,
        'Release': 0.5
      };
      return impact + (phaseMultipliers[project.phase] || 1.0);
    }, 0);

    if (phaseWorkloadImpact > 3.0) {
      moraleChange -= 10 * dayProgress; // Extreme project complexity stress
    } else if (workloadRatio > 2.5) {
      moraleChange -= 8 * dayProgress; // Severe overwork
    } else if (workloadRatio > 1.5) {
      moraleChange -= 3 * dayProgress; // Moderate overwork
    } else if (workloadRatio < 0.5) {
      moraleChange += 2 * dayProgress; // Well-staffed bonus
    }

    // Enhanced financial stress calculation
    const financialStressLevels = [
      { threshold: 5000, impact: -5, description: 'Critical' },
      { threshold: 25000, impact: -2, description: 'Moderate' },
      { threshold: 100000, impact: 1, description: 'Secure' }
    ];

    const financialStress = financialStressLevels.find(level => state.money < level.threshold);
    if (financialStress) {
      moraleChange += financialStress.impact * dayProgress;
    }

    // More sophisticated project completion morale boost
    const recentCompletions = (state.completedProjects || []).filter(p => {
      // Check completions within last game month
      const completionThreshold = new Date(Date.now() - (30 * 24 * 60 * 60 * 1000));
      return new Date(p.completedDate) > completionThreshold;
    });

    if (recentCompletions.length > 0) {
      // Boost depends on project size and quality
      const completionBonus = recentCompletions.reduce((bonus, project) => {
        const sizeBonus = project.size === 3 ? 1.5 : project.size === 2 ? 1.0 : 0.5;
        const qualityBonus = project.progress >= 95 ? 1.2 : 1.0;
        return bonus + (0.5 * sizeBonus * qualityBonus);
      }, 0);

      moraleChange += completionBonus * dayProgress;
    }

    // Team personality dynamics
    const teamPersonalities = (state.employees || []).map(emp => emp.personality);
    const personalityHarmony = calculateTeamPersonalityHarmony(teamPersonalities);
    moraleChange += personalityHarmony * dayProgress;

    return moraleChange;
  };

  const calculateTeamPersonalityHarmony = (personalities) => {
    const personalityGroups = {
      'Team Players': ['Team Player'],
      'Innovators': ['Innovative'],
      'Detail-Oriented': ['Perfectionist', 'Detail-oriented'],
      'Creatives': ['Creative', 'Visionary']
    };

    const groupCounts = Object.keys(personalityGroups).reduce((acc, group) => {
      acc[group] = personalities.filter(p => personalityGroups[group].includes(p)).length;
      return acc;
    }, {});

    // More personalities in a group increase harmony
    const harmonyScore = Object.values(groupCounts).reduce((score, count) => {
      return score + (count > 1 ? (count * 0.5) : 0);
    }, 0);

    return Math.min(2, harmonyScore); // Cap harmony bonus
  };

  const ACHIEVEMENTS_CONFIG = {
    first_game: {
      title: 'First Steps',
      description: 'Complete your first game',
      reward: 5000,
      condition: (state) => (state.completedProjects || []).length >= 1,
      category: 'milestone'
    },
    profitable: {
      title: 'In the Black',
      description: 'Reach $100,000 in funds',
      reward: 10000,
      condition: (state) => state.money >= 100000,
      category: 'financial'
    },
    team_player: {
      title: 'Team Player',
      description: 'Hire 10 employees',
      reward: 15000,
      condition: (state) => (state.employees || []).length >= 10,
      category: 'team'
    },
    aaa_developer: {
      title: 'AAA Developer',
      description: 'Complete a AAA game',
      reward: 50000,
      condition: (state) => (state.completedProjects || []).some(p => p.size === 3),
      category: 'milestone'
    },
    millionaire: {
      title: 'Millionaire',
      description: 'Reach $1,000,000 in funds',
      reward: 100000,
      condition: (state) => state.money >= 1000000,
      category: 'financial'
    },
    speed_demon: {
      title: 'Speed Demon',
      description: 'Complete 5 games',
      reward: 25000,
      condition: (state) => (state.completedProjects || []).length >= 5,
      category: 'milestone'
    },
    empire_builder: {
      title: 'Empire Builder',
      description: 'Hire 25 employees',
      reward: 75000,
      condition: (state) => (state.employees || []).length >= 25,
      category: 'team'
    },
    perfectionist: {
      title: 'Perfectionist',
      description: 'Achieve 95+ team morale',
      reward: 30000,
      condition: (state) => state.morale >= 95,
      category: 'performance'
    }
  };

  const checkForNewAchievements = () => {
    const newAchievements = [];
    const existingAchievementIds = new Set(state.achievements?.map(a => a.id) || []);

    for (const [id, config] of Object.entries(ACHIEVEMENTS_CONFIG)) {
      if (!existingAchievementIds.has(id) && config.condition(state)) {
        const achievementData = {
          id,
          title: config.title,
          description: config.description,
          reward: config.reward,
          category: config.category,
          unlockedAt: Date.now()
        };
        newAchievements.push(achievementData);
      }
    }

    return newAchievements;
  };

  const getAchievementTitle = (id) => ACHIEVEMENTS_CONFIG[id]?.title || 'Achievement';
  const getAchievementDescription = (id) => ACHIEVEMENTS_CONFIG[id]?.description || 'Achievement unlocked';
  const getAchievementReward = (id) => ACHIEVEMENTS_CONFIG[id]?.reward || 0;

  const processStockPriceFluctuations = useCallback((dayProgress) => {
    // Only update stock prices occasionally to prevent excessive volatility
    // Update roughly every game hour (1/24 of a day)
    const updateChance = dayProgress * 24; // Convert to hourly chance
    if (Math.random() > updateChance) return;

    const stockUpdates = state.stocks.map(stock => {
      // Base volatility affects price movement range
      const volatility = stock.volatility || 0.03;

      // Random walk with trend influence
      const randomFactor = (Math.random() - 0.5) * 2; // -1 to 1
      const trendFactor = (stock.trend - 1.0) * 0.5; // Trend bias

      // Combine random and trend for price change
      const priceChangePercent = (randomFactor + trendFactor) * volatility;

      // Calculate new price (with minimum floor of $1.00)
      const newPrice = Math.max(1.0, stock.currentPrice * (1 + priceChangePercent));

      // Update trend based on price movement (momentum effect)
      const momentumFactor = priceChangePercent > 0 ? 1.001 : 0.999;
      const newTrend = Math.max(0.95, Math.min(1.05, stock.trend * momentumFactor));

      // Add sector-based correlation and influences
      let sectorInfluence = 0;

      if (stock.sector === 'gaming') {
        // Gaming stocks are influenced by overall game industry success
        const recentCompletedProjects = state.completedProjects.filter(p => {
          const projectDate = new Date(2024, 0, 1); // Base date
          projectDate.setMonth(projectDate.getMonth() + (state.currentDate.year - 2024) * 12 + state.currentDate.month - 1);
          const cutoffDate = new Date(projectDate);
          cutoffDate.setMonth(cutoffDate.getMonth() - 3); // Last 3 months
          return p.completedDate >= cutoffDate;
        });

        if (recentCompletedProjects.length > 0) {
          const avgSuccess = recentCompletedProjects.reduce((sum, p) => sum + (p.revenue || 0), 0) / recentCompletedProjects.length;
          sectorInfluence = avgSuccess > 100000 ? 0.002 : -0.001; // Stronger positive influence for successful games
        }
      } else if (stock.sector === 'tech') {
        // Tech stocks are influenced by studio growth and technology adoption
        const studioGrowthFactor = state.employees.length / 10; // More employees = tech adoption
        const technologyUnlocks = state.platforms.filter(p => p.unlocked).length;
        sectorInfluence = (studioGrowthFactor + technologyUnlocks) * 0.0001; // Small positive tech influence
      } else if (stock.sector === 'hardware') {
        // Hardware stocks influenced by platform diversity and high-end game development
        const platformDiversity = state.platforms.filter(p => p.unlocked).length;
        const aaaProjects = state.completedProjects.filter(p => p.size === 3).length;
        sectorInfluence = (platformDiversity * 0.0002) + (aaaProjects * 0.0005);
      } else if (stock.sector === 'media') {
        // Media stocks influenced by game success and reputation
        const reputationFactor = (state.reputation - 50) / 100; // Normalize around 50 base reputation
        sectorInfluence = reputationFactor * 0.001;
      } else if (stock.sector === 'crypto') {
        // Crypto stocks are more volatile and influenced by tech sector performance
        const techStocks = state.stocks.filter(s => s.sector === 'tech');
        const avgTechTrend = techStocks.reduce((sum, s) => sum + s.trend, 0) / techStocks.length;
        sectorInfluence = (avgTechTrend - 1.0) * 0.002; // Higher correlation with tech trends

        // Add extra volatility for crypto
        const extraVolatility = (Math.random() - 0.5) * 0.01;
        sectorInfluence += extraVolatility;
      }

      const finalPrice = Math.max(1.0, newPrice * (1 + sectorInfluence));

      // Update historical prices (keep last 30 prices)
      const newHistoricalPrices = [...(stock.historicalPrices || []), finalPrice];
      if (newHistoricalPrices.length > 30) {
        newHistoricalPrices.shift(); // Remove oldest price
      }

      return {
        id: stock.id,
        currentPrice: parseFloat(finalPrice.toFixed(2)),
        trend: parseFloat(newTrend.toFixed(4)),
        historicalPrices: newHistoricalPrices
      };
    });

    // Apply stock updates
    if (stockUpdates.length > 0) {
      actions.updateStockPrices(stockUpdates);
    }
  }, [state.stocks, state.completedProjects, state.currentDate, actions]);

  // Process dividend payments for eligible stocks
  const processDividendPayments = useCallback(() => {
    if (!state.portfolio.holdings.length) return;

    const currentTime = new Date();
    const timeSinceLastCheck = state.portfolio.lastDividendCheck
      ? (currentTime - new Date(state.portfolio.lastDividendCheck)) / (1000 * 60 * 60 * 24) // days
      : 90; // First time, assume 90 days passed

    // Check dividends quarterly (every 90 game days)
    if (timeSinceLastCheck >= 90) {
      state.portfolio.holdings.forEach(holding => {
        const stock = state.stocks.find(s => s.id === holding.stockId);
        if (stock && stock.dividendYield && stock.dividendYield > 0) {
          const quarterlyDividendRate = stock.dividendYield / 4; // Quarterly payment
          const dividendAmount = holding.quantity * stock.currentPrice * quarterlyDividendRate;

          if (dividendAmount > 0.01) { // Only pay if significant amount
            actions.payDividends(stock.id, dividendAmount);
            actions.addNotification({
              message: `Received $${dividendAmount.toFixed(2)} dividend from ${stock.symbol}`,
              type: 'success'
            });
          }
        }
      });

      // Update last dividend check time
      actions.updatePortfolio({ lastDividendCheck: currentTime.toISOString() });
    }
  }, [state.portfolio, state.stocks, actions]);

  // Check price alerts and trigger notifications
  const checkPriceAlerts = useCallback(() => {
    if (!state.portfolio.priceAlerts.length) return;

    state.portfolio.priceAlerts.forEach(alert => {
      if (!alert.active) return;

      const stock = state.stocks.find(s => s.id === alert.stockId);
      if (!stock) return;

      let triggered = false;
      if (alert.direction === 'above' && stock.currentPrice >= alert.targetPrice) {
        triggered = true;
      } else if (alert.direction === 'below' && stock.currentPrice <= alert.targetPrice) {
        triggered = true;
      }

      if (triggered) {
        actions.addNotification({
          message: `🚨 Price Alert: ${stock.symbol} is ${alert.direction} $${alert.targetPrice.toFixed(2)} (Current: $${stock.currentPrice.toFixed(2)})`,
          type: 'warning'
        });
        // Deactivate alert after triggering
        actions.removePriceAlert(alert.id);
      }
    });
  }, [state.portfolio.priceAlerts, state.stocks, actions]);

  // Process random market events that affect stock prices
  const processMarketEvents = useCallback((dayProgress) => {
    // Generate market events randomly (roughly once per month)
    const eventChance = dayProgress * 0.033; // ~1% chance per day
    if (Math.random() > eventChance) return;

    const marketEvents = [
      {
        title: "Gaming Industry Growth",
        description: "Reports show strong gaming industry growth this quarter",
        affectedSectors: ['gaming'],
        priceImpact: 0.05, // +5%
        duration: 3 // days
      },
      {
        title: "Tech Stock Rally",
        description: "Major breakthrough in AI technology drives tech stocks higher",
        affectedSectors: ['tech'],
        priceImpact: 0.08,
        duration: 2
      },
      {
        title: "Market Volatility",
        description: "Global economic uncertainty causes market-wide volatility",
        affectedSectors: ['gaming', 'tech', 'hardware', 'media'],
        priceImpact: -0.03,
        duration: 5
      },
      {
        title: "Hardware Shortage",
        description: "Global chip shortage impacts hardware manufacturers",
        affectedSectors: ['hardware'],
        priceImpact: -0.06,
        duration: 7
      },
      {
        title: "Crypto Surge",
        description: "Cryptocurrency market experiences major rally",
        affectedSectors: ['crypto'],
        priceImpact: 0.12,
        duration: 1
      }
    ];

    const selectedEvent = marketEvents[Math.floor(Math.random() * marketEvents.length)];

    // Apply immediate price impact
    const affectedStocks = state.stocks.filter(stock =>
      selectedEvent.affectedSectors.includes(stock.sector)
    );

    if (affectedStocks.length > 0) {
      const stockUpdates = affectedStocks.map(stock => ({
        id: stock.id,
        currentPrice: Math.max(1.0, stock.currentPrice * (1 + selectedEvent.priceImpact)),
        trend: Math.max(0.95, Math.min(1.05, stock.trend + selectedEvent.priceImpact * 0.5))
      }));

      actions.updateStockPrices(stockUpdates);
      actions.triggerMarketEvent(selectedEvent);
      actions.addNotification({
        message: `📈 Market Event: ${selectedEvent.title}`,
        type: 'info'
      });
    }
  }, [state.stocks, actions]);

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