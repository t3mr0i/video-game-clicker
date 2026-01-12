/**
 * Project-specific reducer for managing game development projects
 * Handles all project-related state updates
 */

// Project action types
export const PROJECT_ACTIONS = {
  ADD_PROJECT: 'ADD_PROJECT',
  UPDATE_PROJECT: 'UPDATE_PROJECT',
  COMPLETE_PROJECT: 'COMPLETE_PROJECT',
  DELETE_PROJECT: 'DELETE_PROJECT'
};

export function projectReducer(state, action) {
  switch (action.type) {
    case PROJECT_ACTIONS.ADD_PROJECT:
      return {
        ...state,
        projects: [...(state.projects || []), {
          ...action.payload,
          id: `project_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        }]
      };

    case PROJECT_ACTIONS.UPDATE_PROJECT:
      return {
        ...state,
        projects: (state.projects || []).map(project =>
          project.id === action.payload.id
            ? { ...project, ...action.payload.updates }
            : project
        )
      };

    case PROJECT_ACTIONS.COMPLETE_PROJECT:
      return {
        ...state,
        projects: (state.projects || []).filter(p => p.id !== action.payload.id),
        completedProjects: [...(state.completedProjects || []), action.payload],
        money: state.money + (action.payload.revenue || 0),
        stats: {
          ...state.stats,
          totalProjectsCompleted: state.stats.totalProjectsCompleted + 1,
          totalRevenue: state.stats.totalRevenue + (action.payload.revenue || 0)
        }
      };

    case PROJECT_ACTIONS.DELETE_PROJECT:
      return {
        ...state,
        projects: (state.projects || []).filter(p => p.id !== action.payload)
      };

    default:
      return state;
  }
}

// Action creators
export const projectActions = {
  addProject: (project) => ({
    type: PROJECT_ACTIONS.ADD_PROJECT,
    payload: project
  }),

  updateProject: (id, updates) => ({
    type: PROJECT_ACTIONS.UPDATE_PROJECT,
    payload: { id, updates }
  }),

  completeProject: (project) => ({
    type: PROJECT_ACTIONS.COMPLETE_PROJECT,
    payload: project
  }),

  deleteProject: (id) => ({
    type: PROJECT_ACTIONS.DELETE_PROJECT,
    payload: id
  })
};