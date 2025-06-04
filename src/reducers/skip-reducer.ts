import type { SkipType } from '../schema/skip'
import { SKIP_ACTIONS } from '../constants/skip-actions'

// Define the state interface
export interface SkipState {
  skips: SkipType[]
  loading: boolean
  error: string | null
}

// Define action types
export type SkipAction =
  | { type: typeof SKIP_ACTIONS.SET_LOADING; payload: boolean }
  | { type: typeof SKIP_ACTIONS.SET_ERROR; payload: string | null }
  | { type: typeof SKIP_ACTIONS.SET_SKIPS; payload: SkipType[] }
  | { type: typeof SKIP_ACTIONS.ADD_SKIP; payload: SkipType }
  | { type: typeof SKIP_ACTIONS.UPDATE_SKIP; payload: SkipType }
  | { type: typeof SKIP_ACTIONS.DELETE_SKIP; payload: string }
  | { type: typeof SKIP_ACTIONS.CLEAR_SKIPS }

// Initial state
export const initialSkipState: SkipState = {
  skips: [],
  loading: false,
  error: null,
}

// Reducer function
export function skipReducer(state: SkipState, action: SkipAction): SkipState {
  switch (action.type) {
    case SKIP_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      }
    case SKIP_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case SKIP_ACTIONS.SET_SKIPS:
      return {
        ...state,
        skips: action.payload,
        loading: false,
        error: null,
      }
    case SKIP_ACTIONS.ADD_SKIP:
      return {
        ...state,
        skips: [...state.skips, action.payload],
        error: null,
      }
    case SKIP_ACTIONS.UPDATE_SKIP:
      return {
        ...state,
        skips: state.skips.map(skip => 
          skip.id === action.payload.id ? action.payload : skip
        ),
        error: null,
      }
    case SKIP_ACTIONS.DELETE_SKIP:
      return {
        ...state,
        skips: state.skips.filter(skip => skip.id !== action.payload),
        error: null,
      }
    case SKIP_ACTIONS.CLEAR_SKIPS:
      return {
        ...state,
        skips: [],
        error: null,
      }
    default:
      return state
  }
} 