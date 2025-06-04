import React, { createContext, useContext, useReducer, type ReactNode } from 'react'
import type { SkipType } from '../schema/skip'
import { SKIP_ACTIONS } from '../constants/skip-actions'
import { 
  skipReducer, 
  initialSkipState, 
  type SkipState, 
  type SkipAction 
} from '../reducers/skip-reducer'

// Context interface
interface SkipContextType {
  state: SkipState
  dispatch: React.Dispatch<SkipAction>
  // Helper functions
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setSkips: (skips: SkipType[]) => void
  addSkip: (skip: SkipType) => void
  updateSkip: (skip: SkipType) => void
  deleteSkip: (id: string) => void
  clearSkips: () => void
}

// Create context
const SkipContext = createContext<SkipContextType | undefined>(undefined)

// Provider component
interface SkipProviderProps {
  children: ReactNode
}

export function SkipProvider({ children }: SkipProviderProps) {
  const [state, dispatch] = useReducer(skipReducer, initialSkipState)

  // Helper functions
  const setLoading = (loading: boolean) => {
    dispatch({ type: SKIP_ACTIONS.SET_LOADING, payload: loading })
  }

  const setError = (error: string | null) => {
    dispatch({ type: SKIP_ACTIONS.SET_ERROR, payload: error })
  }

  const setSkips = (skips: SkipType[]) => {
    dispatch({ type: SKIP_ACTIONS.SET_SKIPS, payload: skips })
  }

  const addSkip = (skip: SkipType) => {
    dispatch({ type: SKIP_ACTIONS.ADD_SKIP, payload: skip })
  }

  const updateSkip = (skip: SkipType) => {
    dispatch({ type: SKIP_ACTIONS.UPDATE_SKIP, payload: skip })
  }

  const deleteSkip = (id: string) => {
    dispatch({ type: SKIP_ACTIONS.DELETE_SKIP, payload: id })
  }

  const clearSkips = () => {
    dispatch({ type: SKIP_ACTIONS.CLEAR_SKIPS })
  }

  const value: SkipContextType = {
    state,
    dispatch,
    setLoading,
    setError,
    setSkips,
    addSkip,
    updateSkip,
    deleteSkip,
    clearSkips,
  }

  return (
    <SkipContext.Provider value={value}>
      {children}
    </SkipContext.Provider>
  )
}

// Custom hook to use the context
export function useSkip() {
  const context = useContext(SkipContext)
  if (context === undefined) {
    throw new Error('useSkip must be used within a SkipProvider')
  }
  return context
}

// Export types for external use
export type { SkipAction, SkipState, SkipContextType }
