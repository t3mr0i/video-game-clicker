/**
 * Custom hook for employee hiring business logic
 * Extracts employee generation, cost calculation, and hiring logic
 */

import { useState, useCallback, useMemo } from 'react';
import { EMPLOYEE_TYPES, EMPLOYEE_PERSONALITIES } from '../config/gameConstants';
import { calculateEmployeeCost } from '../config/gameFormulas';

export function useEmployeeHiring(currentMoney, currentEmployees, currentDate) {
  const [selectedType, setSelectedType] = useState(EMPLOYEE_TYPES.DEVELOPER);
  const [isHiring, setIsHiring] = useState(false);

  // Calculate hiring cost and affordability
  const hiringMetrics = useMemo(() => {
    const hiringCost = calculateEmployeeCost((currentEmployees || []).length);
    const monthlySalary = Math.floor(hiringCost * 0.1);
    const canAfford = currentMoney >= hiringCost;

    return {
      hiringCost,
      monthlySalary,
      canAfford
    };
  }, [currentMoney, currentEmployees]);

  // Generate random name
  const generateRandomName = useCallback(() => {
    const firstNames = [
      'Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Avery', 'Quinn',
      'Sam', 'Jamie', 'Reese', 'Blake', 'Drew', 'Sage', 'Rowan', 'Finley'
    ];
    const lastNames = [
      'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller',
      'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez'
    ];
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${firstName} ${lastName}`;
  }, []);

  // Generate skills based on employee type
  const generateRandomSkills = useCallback((type) => {
    const baseSkill = 30 + Math.floor(Math.random() * 40); // 30-70 base skill
    const variation = () => baseSkill + Math.floor(Math.random() * 20) - 10; // ±10 variation

    switch (type) {
      case EMPLOYEE_TYPES.DEVELOPER:
        return {
          programming: variation(),
          debugging: variation(),
          testing: variation(),
          architecture: variation()
        };
      case EMPLOYEE_TYPES.DESIGNER:
        return {
          ui_design: variation(),
          ux_design: variation(),
          prototyping: variation(),
          creativity: variation()
        };
      case EMPLOYEE_TYPES.MARKETER:
        return {
          market_research: variation(),
          advertising: variation(),
          social_media: variation(),
          analytics: variation()
        };
      default:
        return {
          general: variation(),
          communication: variation(),
          problem_solving: variation(),
          teamwork: variation()
        };
    }
  }, []);

  // Generate complete employee
  const generateRandomEmployee = useCallback((employeeType = selectedType) => {
    const personalities = EMPLOYEE_PERSONALITIES[employeeType] || [];
    const personality = personalities[Math.floor(Math.random() * personalities.length)];

    return {
      name: generateRandomName(),
      type: employeeType,
      personality,
      salary: hiringMetrics.monthlySalary,
      skills: generateRandomSkills(employeeType),
      skillPoints: 2, // Starting skill points
      hireDate: currentDate,
      experience: 0
    };
  }, [selectedType, hiringMetrics.monthlySalary, currentDate, generateRandomName, generateRandomSkills]);

  // Create preview employee for display
  const previewEmployee = useMemo(() => {
    return generateRandomEmployee();
  }, [generateRandomEmployee]);

  // Execute hiring
  const executeHiring = useCallback(async (onHire, onSuccess) => {
    if (!hiringMetrics.canAfford) return false;

    setIsHiring(true);

    try {
      // Simulate hiring processing time
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newEmployee = generateRandomEmployee();
      await onHire(newEmployee);

      if (onSuccess) {
        onSuccess();
      }

      return true;
    } catch (error) {
      console.error('Hiring failed:', error);
      return false;
    } finally {
      setIsHiring(false);
    }
  }, [hiringMetrics.canAfford, generateRandomEmployee]);

  // Reset hiring state
  const resetHiring = useCallback(() => {
    setIsHiring(false);
    setSelectedType(EMPLOYEE_TYPES.DEVELOPER);
  }, []);

  // Get available employee types with descriptions
  const getEmployeeTypes = useCallback(() => {
    return Object.values(EMPLOYEE_TYPES).map(type => ({
      id: type,
      name: type,
      description: `Specializes in ${type.toLowerCase()} work`,
      personalities: EMPLOYEE_PERSONALITIES[type] || []
    }));
  }, []);

  // Get hiring cost breakdown
  const getHiringBreakdown = useCallback(() => {
    return {
      hiringCost: hiringMetrics.hiringCost,
      monthlySalary: hiringMetrics.monthlySalary,
      currentMoney: currentMoney,
      canAfford: hiringMetrics.canAfford,
      employeeCount: (currentEmployees || []).length
    };
  }, [hiringMetrics, currentMoney, currentEmployees]);

  return {
    // State
    selectedType,
    isHiring,
    previewEmployee,

    // Actions
    setSelectedType,
    executeHiring,
    resetHiring,

    // Calculations
    hiringMetrics,
    canAfford: hiringMetrics.canAfford,

    // Utilities
    generateRandomEmployee,
    getEmployeeTypes,
    getHiringBreakdown
  };
}