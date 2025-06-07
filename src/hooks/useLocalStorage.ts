import { useEffect, useCallback } from 'react'
import type { BookingFlowType } from '../schema/booking-flow'

// LocalStorage key
const BOOKING_FLOW_STORAGE_KEY = 'booking-flow-state'

// Utility functions for localStorage
const loadFromLocalStorage = (): BookingFlowType | null => {
  try {
    const stored = localStorage.getItem(BOOKING_FLOW_STORAGE_KEY)
    if (!stored) return null

    const parsed = JSON.parse(stored)

    // Convert date strings back to Date objects
    if (parsed.selectedDate) {
      parsed.selectedDate = new Date(parsed.selectedDate)
    }
    if (parsed.selectedCollectionDate) {
      parsed.selectedCollectionDate = new Date(parsed.selectedCollectionDate)
    }

    return parsed
  } catch (error) {
    console.error('Error loading booking flow from localStorage:', error)
    return null
  }
}

const saveToLocalStorage = (state: BookingFlowType): void => {
  try {
    localStorage.setItem(BOOKING_FLOW_STORAGE_KEY, JSON.stringify(state))
  } catch (error) {
    console.error('Error saving booking flow to localStorage:', error)
  }
}

const clearLocalStorage = (): void => {
  try {
    localStorage.removeItem(BOOKING_FLOW_STORAGE_KEY)
  } catch (error) {
    console.error('Error clearing booking flow from localStorage:', error)
  }
}

// Custom hook for localStorage operations
export const useLocalStorage = () => {
  // Load initial state from localStorage
  const getInitialState = useCallback((): BookingFlowType | null => {
    return loadFromLocalStorage()
  }, [])

  // Save state to localStorage
  const saveState = useCallback((state: BookingFlowType): void => {
    saveToLocalStorage(state)
  }, [])

  // Clear localStorage
  const clearState = useCallback((): void => {
    clearLocalStorage()
  }, [])

  // Auto-sync with localStorage
  const useSyncWithLocalStorage = (state: BookingFlowType): void => {
    useEffect(() => {
      saveState(state)
    }, [state, saveState])
  }

  return {
    getInitialState,
    saveState,
    clearState,
    useSyncWithLocalStorage,
  }
}
