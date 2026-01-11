import { describe, it, expect } from 'vitest';
import {
  calculateEmployeeCost,
  calculateProjectCost,
  calculateResearchCost,
  calculateDevelopmentPoints,
  calculateGameRevenue,
  calculateSkillGain,
  calculateProjectDuration,
  calculateMoraleChange,
  calculateMarketDemand
} from './gameFormulas';
import { GAME_MECHANICS, GAME_SIZES } from './gameConstants';

describe('Cost Calculation Formulas', () => {
  describe('calculateEmployeeCost', () => {
    it('should calculate base cost for first employee', () => {
      const cost = calculateEmployeeCost(0);
      expect(cost).toBe(Math.floor(GAME_MECHANICS.BASE_EMPLOYEE_COST));
    });

    it('should increase cost exponentially with more employees', () => {
      const cost1 = calculateEmployeeCost(1);
      const cost2 = calculateEmployeeCost(2);
      expect(cost2).toBeGreaterThan(cost1);
    });

    it('should return integer values', () => {
      const cost = calculateEmployeeCost(3);
      expect(Number.isInteger(cost)).toBe(true);
    });
  });

  describe('calculateProjectCost', () => {
    it('should calculate base cost for single platform', () => {
      const cost = calculateProjectCost(1, 1);
      expect(cost).toBe(Math.floor(GAME_MECHANICS.BASE_PROJECT_COST * 1 * 1));
    });

    it('should scale with size and platform count', () => {
      const smallCost = calculateProjectCost(1, 1);
      const largeCost = calculateProjectCost(3, 2);
      expect(largeCost).toBeGreaterThan(smallCost);
    });

    it('should default to 1 platform if not specified', () => {
      const cost1 = calculateProjectCost(2);
      const cost2 = calculateProjectCost(2, 1);
      expect(cost1).toBe(cost2);
    });
  });

  describe('calculateResearchCost', () => {
    it('should calculate base cost for first research', () => {
      const cost = calculateResearchCost(0);
      expect(cost).toBe(Math.floor(GAME_MECHANICS.BASE_RESEARCH_COST));
    });

    it('should increase exponentially with research count', () => {
      const cost1 = calculateResearchCost(1);
      const cost2 = calculateResearchCost(2);
      expect(cost2).toBeGreaterThan(cost1);
    });
  });
});

describe('Development Calculation Formulas', () => {
  describe('calculateDevelopmentPoints', () => {
    it('should calculate base points for A-sized game', () => {
      const points = calculateDevelopmentPoints('PC', 'Action', GAME_SIZES.A, 2020);
      expect(points).toBeGreaterThan(0);
    });

    it('should apply platform modifiers correctly', () => {
      const pcPoints = calculateDevelopmentPoints('PC', 'Action', GAME_SIZES.A, 2020);
      const vrPoints = calculateDevelopmentPoints('VR', 'Action', GAME_SIZES.A, 2020);
      expect(vrPoints).toBeGreaterThan(pcPoints); // VR has 1.5 multiplier vs PC's 1.0
    });

    it('should apply genre modifiers correctly', () => {
      const puzzlePoints = calculateDevelopmentPoints('PC', 'Puzzle', GAME_SIZES.A, 2020);
      const rpgPoints = calculateDevelopmentPoints('PC', 'RPG', GAME_SIZES.A, 2020);
      expect(rpgPoints).toBeGreaterThan(puzzlePoints); // RPG has 1.3 vs Puzzle's 0.9
    });

    it('should account for year progression', () => {
      const oldPoints = calculateDevelopmentPoints('PC', 'Action', GAME_SIZES.A, 2020);
      const newPoints = calculateDevelopmentPoints('PC', 'Action', GAME_SIZES.A, 2025);
      expect(newPoints).toBeGreaterThan(oldPoints);
    });

    it('should handle employee skills', () => {
      const noSkills = calculateDevelopmentPoints('PC', 'Action', GAME_SIZES.A, 2020);
      const withSkills = calculateDevelopmentPoints('PC', 'Action', GAME_SIZES.A, 2020, {
        programming: 80,
        design: 70
      });
      expect(withSkills).toBeGreaterThan(noSkills);
    });

    it('should handle invalid inputs gracefully', () => {
      const points = calculateDevelopmentPoints('InvalidPlatform', 'InvalidGenre', 999, 2020);
      expect(points).toBeGreaterThan(0);
    });
  });
});

describe('Revenue Calculation Formulas', () => {
  describe('calculateGameRevenue', () => {
    it('should calculate revenue based on quality and hype', () => {
      const revenue = calculateGameRevenue(80, 60, 'PC', 'Action', 1000000);
      expect(revenue).toBeGreaterThan(0);
    });

    it('should apply platform multipliers', () => {
      const pcRevenue = calculateGameRevenue(80, 60, 'PC', 'Action', 1000000);
      const mobileRevenue = calculateGameRevenue(80, 60, 'Mobile', 'Action', 1000000);
      expect(mobileRevenue).toBeGreaterThan(pcRevenue); // Mobile has 1.5 vs PC's 0.8
    });

    it('should handle zero quality/hype gracefully', () => {
      const revenue = calculateGameRevenue(0, 0, 'PC', 'Action', 1000000);
      expect(revenue).toBeGreaterThanOrEqual(0);
    });

    it('should handle high quality/hype values', () => {
      const revenue = calculateGameRevenue(100, 100, 'Mobile', 'Action', 1000000);
      expect(revenue).toBeGreaterThan(0);
    });
  });
});

describe('Skill Improvement Formulas', () => {
  describe('calculateSkillGain', () => {
    it('should calculate skill gain based on difficulty and time', () => {
      const gain = calculateSkillGain(50, 80, 10);
      expect(gain).toBeGreaterThan(0);
    });

    it('should apply diminishing returns for high skills', () => {
      const lowSkillGain = calculateSkillGain(20, 80, 10);
      const highSkillGain = calculateSkillGain(90, 80, 10);
      expect(lowSkillGain).toBeGreaterThan(highSkillGain);
    });

    it('should round to 1 decimal place', () => {
      const gain = calculateSkillGain(50, 75, 8);
      const decimalPlaces = (gain.toString().split('.')[1] || '').length;
      expect(decimalPlaces).toBeLessThanOrEqual(1);
    });

    it('should handle zero inputs', () => {
      const gain = calculateSkillGain(0, 0, 0);
      expect(gain).toBe(0);
    });
  });
});

describe('Time Calculation Formulas', () => {
  describe('calculateProjectDuration', () => {
    it('should calculate duration for different game sizes', () => {
      const aDuration = calculateProjectDuration(GAME_SIZES.A, 5, 50);
      const aaaDuration = calculateProjectDuration(GAME_SIZES.AAA, 5, 50);
      expect(aaaDuration).toBeGreaterThan(aDuration);
    });

    it('should reduce duration with more skilled employees', () => {
      const lowSkillDuration = calculateProjectDuration(GAME_SIZES.A, 5, 30);
      const highSkillDuration = calculateProjectDuration(GAME_SIZES.A, 5, 80);
      expect(lowSkillDuration).toBeGreaterThan(highSkillDuration);
    });

    it('should reduce duration with more employees', () => {
      const smallTeam = calculateProjectDuration(GAME_SIZES.A, 2, 50);
      const largeTeam = calculateProjectDuration(GAME_SIZES.A, 10, 50);
      expect(smallTeam).toBeGreaterThan(largeTeam);
    });

    it('should return integer values', () => {
      const duration = calculateProjectDuration(GAME_SIZES.A, 5, 50);
      expect(Number.isInteger(duration)).toBe(true);
    });

    it('should handle unknown game sizes', () => {
      const duration = calculateProjectDuration(999, 5, 50);
      expect(duration).toBeGreaterThan(0);
    });
  });
});

describe('Morale Calculation Formulas', () => {
  describe('calculateMoraleChange', () => {
    it('should handle positive events', () => {
      const events = [
        { type: 'project_success' },
        { type: 'bonus_payment' }
      ];
      const change = calculateMoraleChange(events);
      expect(change).toBeGreaterThan(0);
    });

    it('should handle negative events', () => {
      const events = [
        { type: 'project_failure' },
        { type: 'layoff' }
      ];
      const change = calculateMoraleChange(events);
      expect(change).toBeLessThan(0);
    });

    it('should handle mixed events', () => {
      const events = [
        { type: 'project_success' }, // +10
        { type: 'overtime' }          // -3
      ];
      const change = calculateMoraleChange(events);
      expect(change).toBe(7);
    });

    it('should handle empty events array', () => {
      const change = calculateMoraleChange([]);
      expect(change).toBe(0);
    });

    it('should ignore unknown event types', () => {
      const events = [
        { type: 'unknown_event' },
        { type: 'project_success' }
      ];
      const change = calculateMoraleChange(events);
      expect(change).toBe(10); // Only project_success should count
    });
  });
});

describe('Market Analysis Formulas', () => {
  describe('calculateMarketDemand', () => {
    it('should calculate demand based on genre and platform', () => {
      const demand = calculateMarketDemand('Action', 'PC', 2020);
      expect(demand).toBeGreaterThan(0);
    });

    it('should apply genre modifiers', () => {
      const shooterDemand = calculateMarketDemand('Shooter', 'PC', 2020);
      const puzzleDemand = calculateMarketDemand('Puzzle', 'PC', 2020);
      expect(shooterDemand).toBeGreaterThan(puzzleDemand); // Shooter 1.3 vs Puzzle 0.7
    });

    it('should apply platform modifiers', () => {
      const mobileDemand = calculateMarketDemand('Action', 'Mobile', 2020);
      const webDemand = calculateMarketDemand('Action', 'Web', 2020);
      expect(mobileDemand).toBeGreaterThan(webDemand); // Mobile 1.5 vs Web 0.4
    });

    it('should apply year trend modifiers', () => {
      const demand2020 = calculateMarketDemand('Action', 'PC', 2020);
      const demand2021 = calculateMarketDemand('Action', 'PC', 2021);
      expect(demand2021).not.toBe(demand2020); // Should vary with year
    });

    it('should handle unknown genres and platforms', () => {
      const demand = calculateMarketDemand('UnknownGenre', 'UnknownPlatform', 2020);
      expect(demand).toBeGreaterThan(0);
    });
  });
});