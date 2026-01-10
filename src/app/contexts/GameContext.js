import React, { createContext, useContext, useReducer } from 'react';

// Centralized action types
const ACTIONS = {
  SET_STUDIO_LEVEL: 'SET_STUDIO_LEVEL',
  UPDATE_TIME: 'UPDATE_TIME',
  ADD_PROJECT: 'ADD_PROJECT',
  HIRE_EMPLOYEE: 'HIRE_EMPLOYEE',
  UPDATE_FINANCE: 'UPDATE_FINANCE',
  TOGGLE_GAME_SPEED: 'TOGGLE_GAME_SPEED',
  UNLOCK_TECHNOLOGY: 'UNLOCK_TECHNOLOGY'
};

// Initial game state with sensible defaults
const initialState = {
  studioLevel: 1,
  time: {
    day: 1,
    week: 1,
    month: 1,
    year: 1985
  },
  projects: [],
  employees: [],
  finances: {
    bankBalance: 100000,
    monthlySalaryCosts: 0
  },
  gameSpeed: 1,
  unlockedTechnologies: []
};

// Simplified reducer with clear, predictable state updates
function gameReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_STUDIO_LEVEL:
      return { ...state, studioLevel: action.payload };

    case ACTIONS.UPDATE_TIME:
      return {
        ...state,
        time: { ...state.time, ...action.payload }
      };

    case ACTIONS.ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload]
      };

    case ACTIONS.HIRE_EMPLOYEE:
      return {
        ...state,
        employees: [...state.employees, action.payload],
        finances: {
          ...state.finances,
          monthlySalaryCosts: state.finances.monthlySalaryCosts + action.payload.salary
        }
      };

    case ACTIONS.UPDATE_FINANCE:
      return {
        ...state,
        finances: { ...state.finances, ...action.payload }
      };

    case ACTIONS.TOGGLE_GAME_SPEED:
      return {
        ...state,
        gameSpeed: action.payload
      };

    case ACTIONS.UNLOCK_TECHNOLOGY:
      return {
        ...state,
        unlockedTechnologies: [...state.unlockedTechnologies, action.payload]
      };

    default:
      return state;
  }
}

const GameContext = createContext();

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Simplified action creators with clear intent
  const actions = {
    setStudioLevel: (level) => dispatch({
      type: ACTIONS.SET_STUDIO_LEVEL,
      payload: level
    }),

    updateTime: (timeUpdate) => dispatch({
      type: ACTIONS.UPDATE_TIME,
      payload: timeUpdate
    }),

    addProject: (project) => dispatch({
      type: ACTIONS.ADD_PROJECT,
      payload: project
    }),

    hireEmployee: (employee) => dispatch({
      type: ACTIONS.HIRE_EMPLOYEE,
      payload: employee
    }),

    updateFinances: (financeUpdate) => dispatch({
      type: ACTIONS.UPDATE_FINANCE,
      payload: financeUpdate
    }),

    toggleGameSpeed: (speed) => dispatch({
      type: ACTIONS.TOGGLE_GAME_SPEED,
      payload: speed
    }),

    unlockTechnology: (tech) => dispatch({
      type: ACTIONS.UNLOCK_TECHNOLOGY,
      payload: tech
    })
  };

  return (
    <GameContext.Provider value={{ state, actions }}>
      {children}
    </GameContext.Provider>
  );
}

// Custom hook for easier context consumption
export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
}

export { ACTIONS };