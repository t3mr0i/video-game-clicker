/**
 * Employee-specific reducer for managing studio workforce
 * Handles all employee-related state updates
 */

// Employee action types
export const EMPLOYEE_ACTIONS = {
  HIRE_EMPLOYEE: 'HIRE_EMPLOYEE',
  FIRE_EMPLOYEE: 'FIRE_EMPLOYEE',
  UPDATE_EMPLOYEE: 'UPDATE_EMPLOYEE',
  ASSIGN_EMPLOYEE: 'ASSIGN_EMPLOYEE'
};

export function employeeReducer(state, action) {
  switch (action.type) {
    case EMPLOYEE_ACTIONS.HIRE_EMPLOYEE:
      return {
        ...state,
        employees: [...(state.employees || []), {
          ...action.payload,
          id: `employee_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        }],
        money: state.money - (action.payload.hiringCost || 0),
        stats: {
          ...state.stats,
          totalEmployeesHired: state.stats.totalEmployeesHired + 1
        }
      };

    case EMPLOYEE_ACTIONS.FIRE_EMPLOYEE:
      return {
        ...state,
        employees: (state.employees || []).filter(e => e.id !== action.payload)
      };

    case EMPLOYEE_ACTIONS.UPDATE_EMPLOYEE:
      return {
        ...state,
        employees: (state.employees || []).map(employee =>
          employee.id === action.payload.id
            ? { ...employee, ...action.payload.updates }
            : employee
        )
      };

    case EMPLOYEE_ACTIONS.ASSIGN_EMPLOYEE:
      return {
        ...state,
        employees: (state.employees || []).map(employee =>
          employee.id === action.payload.employeeId
            ? { ...employee, assignedProjectId: action.payload.projectId }
            : employee
        )
      };

    default:
      return state;
  }
}

// Action creators
export const employeeActions = {
  hireEmployee: (employee) => ({
    type: EMPLOYEE_ACTIONS.HIRE_EMPLOYEE,
    payload: employee
  }),

  fireEmployee: (id) => ({
    type: EMPLOYEE_ACTIONS.FIRE_EMPLOYEE,
    payload: id
  }),

  updateEmployee: (id, updates) => ({
    type: EMPLOYEE_ACTIONS.UPDATE_EMPLOYEE,
    payload: { id, updates }
  }),

  assignEmployee: (employeeId, projectId) => ({
    type: EMPLOYEE_ACTIONS.ASSIGN_EMPLOYEE,
    payload: { employeeId, projectId }
  })
};