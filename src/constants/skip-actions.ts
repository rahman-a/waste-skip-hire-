// Skip action type constants
export const SKIP_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_SKIPS: 'SET_SKIPS',
  ADD_SKIP: 'ADD_SKIP',
  UPDATE_SKIP: 'UPDATE_SKIP',
  DELETE_SKIP: 'DELETE_SKIP',
  CLEAR_SKIPS: 'CLEAR_SKIPS',
} as const

// Type for the action constants
export type SkipActionType = typeof SKIP_ACTIONS[keyof typeof SKIP_ACTIONS] 