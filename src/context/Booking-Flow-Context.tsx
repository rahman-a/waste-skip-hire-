import React, {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from 'react'
import { BOOKING_FLOW_ACTIONS } from '../constants/booking-flow-actions'
import {
  bookingFlowReducer,
  initialBookingFlowState,
  type BookingFlowAction,
} from '../reducers/booking-flow-reducer'
import type {
  BookingFlowType,
  AddressType,
  PermitInfoType,
  HeavyWastePercentageRangeType,
  PlasterBoardPercentageRangeType,
} from '../schema/booking-flow'
import type { SkipType } from '../schema/skip'
import { useLocalStorage } from '../hooks/useLocalStorage'

// Context interface
interface BookingFlowContextType {
  state: BookingFlowType
  dispatch: React.Dispatch<BookingFlowAction>

  // Step management functions
  setStep: (step: number) => void
  nextStep: () => void
  previousStep: () => void
  resetToStep: (step: number) => void

  // Address functions
  setAddress: (address: AddressType) => void
  clearAddress: () => void

  // Category functions
  setSelectedCategories: (categories: number[]) => void
  addCategory: (categoryId: number) => void
  removeCategory: (categoryId: number) => void

  // Waste type functions
  setSelectedWasteTypes: (wasteTypes: string[]) => void
  addWasteType: (wasteType: string) => void
  removeWasteType: (wasteType: string) => void

  // Heavy waste functions
  setHasHeavyWaste: (hasHeavyWaste: boolean) => void
  setHeavyWasteTypes: (heavyWasteTypes: string[]) => void
  addHeavyWasteType: (wasteType: string) => void
  removeHeavyWasteType: (wasteType: string) => void
  setHeavyWastePercentageRange: (range: HeavyWastePercentageRangeType) => void
  setPlasterboardPercentageRange: (
    range: PlasterBoardPercentageRangeType
  ) => void

  // Skip and bags functions
  setSelectedSkip: (skip: SkipType | null) => void
  setTonneBags: (tonneBags: number) => void

  // Permit functions
  setNeedsPermit: (needsPermit: boolean | null) => void
  setPermitInfo: (permitInfo: PermitInfoType | null) => void

  // Date functions
  setSelectedDate: (date: Date | null) => void
  setSelectedCollectionDate: (date: Date | null) => void

  // Completion functions
  setPopsCompleted: (completed: boolean) => void

  // Utility functions
  resetForm: () => void
  updateForm: (updates: Partial<BookingFlowType>) => void
  clearLocalStorage: () => void
}

// Create context
const BookingFlowContext = createContext<BookingFlowContextType | undefined>(
  undefined
)

// Provider component
interface BookingFlowProviderProps {
  children: ReactNode
}

export function BookingFlowProvider({ children }: BookingFlowProviderProps) {
  const { getInitialState, clearState, useSyncWithLocalStorage } =
    useLocalStorage()

  // Load initial state from localStorage or use default
  const initialState = (): BookingFlowType => {
    const savedState = getInitialState()
    return savedState || initialBookingFlowState
  }

  const [state, dispatch] = useReducer(bookingFlowReducer, initialState())

  // Sync with localStorage whenever state changes
  useSyncWithLocalStorage(state)

  // Step management functions
  const setStep = (step: number) => {
    dispatch({ type: BOOKING_FLOW_ACTIONS.SET_STEP, payload: step })
  }

  const nextStep = () => {
    dispatch({ type: BOOKING_FLOW_ACTIONS.NEXT_STEP })
  }

  const previousStep = () => {
    dispatch({ type: BOOKING_FLOW_ACTIONS.PREVIOUS_STEP })
  }

  const resetToStep = (step: number) => {
    dispatch({ type: BOOKING_FLOW_ACTIONS.RESET_TO_STEP, payload: step })
  }

  // Address functions
  const setAddress = (address: AddressType) => {
    dispatch({ type: BOOKING_FLOW_ACTIONS.SET_ADDRESS, payload: address })
  }

  const clearAddress = () => {
    dispatch({ type: BOOKING_FLOW_ACTIONS.CLEAR_ADDRESS })
  }

  // Category functions
  const setSelectedCategories = (categories: number[]) => {
    dispatch({
      type: BOOKING_FLOW_ACTIONS.SET_SELECTED_CATEGORIES,
      payload: categories,
    })
  }

  const addCategory = (categoryId: number) => {
    dispatch({ type: BOOKING_FLOW_ACTIONS.ADD_CATEGORY, payload: categoryId })
  }

  const removeCategory = (categoryId: number) => {
    dispatch({
      type: BOOKING_FLOW_ACTIONS.REMOVE_CATEGORY,
      payload: categoryId,
    })
  }

  // Waste type functions
  const setSelectedWasteTypes = (wasteTypes: string[]) => {
    dispatch({
      type: BOOKING_FLOW_ACTIONS.SET_SELECTED_WASTE_TYPES,
      payload: wasteTypes,
    })
  }

  const addWasteType = (wasteType: string) => {
    dispatch({ type: BOOKING_FLOW_ACTIONS.ADD_WASTE_TYPE, payload: wasteType })
  }

  const removeWasteType = (wasteType: string) => {
    dispatch({
      type: BOOKING_FLOW_ACTIONS.REMOVE_WASTE_TYPE,
      payload: wasteType,
    })
  }

  // Heavy waste functions
  const setHasHeavyWaste = (hasHeavyWaste: boolean) => {
    dispatch({
      type: BOOKING_FLOW_ACTIONS.SET_HAS_HEAVY_WASTE,
      payload: hasHeavyWaste,
    })
  }

  const setHeavyWasteTypes = (heavyWasteTypes: string[]) => {
    dispatch({
      type: BOOKING_FLOW_ACTIONS.SET_HEAVY_WASTE_TYPES,
      payload: heavyWasteTypes,
    })
  }

  const addHeavyWasteType = (wasteType: string) => {
    dispatch({
      type: BOOKING_FLOW_ACTIONS.ADD_HEAVY_WASTE_TYPE,
      payload: wasteType,
    })
  }

  const removeHeavyWasteType = (wasteType: string) => {
    dispatch({
      type: BOOKING_FLOW_ACTIONS.REMOVE_HEAVY_WASTE_TYPE,
      payload: wasteType,
    })
  }

  const setHeavyWastePercentageRange = (
    range: HeavyWastePercentageRangeType
  ) => {
    dispatch({
      type: BOOKING_FLOW_ACTIONS.SET_HEAVY_WASTE_PERCENTAGE_RANGE,
      payload: range,
    })
  }

  const setPlasterboardPercentageRange = (
    range: PlasterBoardPercentageRangeType
  ) => {
    dispatch({
      type: BOOKING_FLOW_ACTIONS.SET_PLASTERBOARD_PERCENTAGE_RANGE,
      payload: range,
    })
  }

  // Skip and bags functions
  const setSelectedSkip = (skip: SkipType | null) => {
    dispatch({ type: BOOKING_FLOW_ACTIONS.SET_SELECTED_SKIP, payload: skip })
  }

  const setTonneBags = (tonneBags: number) => {
    dispatch({ type: BOOKING_FLOW_ACTIONS.SET_TONNE_BAGS, payload: tonneBags })
  }

  // Permit functions
  const setNeedsPermit = (needsPermit: boolean | null) => {
    dispatch({
      type: BOOKING_FLOW_ACTIONS.SET_NEEDS_PERMIT,
      payload: needsPermit,
    })
  }

  const setPermitInfo = (permitInfo: PermitInfoType | null) => {
    dispatch({
      type: BOOKING_FLOW_ACTIONS.SET_PERMIT_INFO,
      payload: permitInfo,
    })
  }

  // Date functions
  const setSelectedDate = (date: Date | null) => {
    dispatch({ type: BOOKING_FLOW_ACTIONS.SET_SELECTED_DATE, payload: date })
  }

  const setSelectedCollectionDate = (date: Date | null) => {
    dispatch({
      type: BOOKING_FLOW_ACTIONS.SET_SELECTED_COLLECTION_DATE,
      payload: date,
    })
  }

  // Completion functions
  const setPopsCompleted = (completed: boolean) => {
    dispatch({
      type: BOOKING_FLOW_ACTIONS.SET_POPS_COMPLETED,
      payload: completed,
    })
  }

  // Utility functions
  const resetForm = () => {
    dispatch({ type: BOOKING_FLOW_ACTIONS.RESET_FORM })
    clearState()
  }

  const updateForm = (updates: Partial<BookingFlowType>) => {
    dispatch({ type: BOOKING_FLOW_ACTIONS.UPDATE_FORM, payload: updates })
  }

  const handleClearLocalStorage = () => {
    clearState()
  }

  const value: BookingFlowContextType = {
    state,
    dispatch,

    // Step management
    setStep,
    nextStep,
    previousStep,
    resetToStep,

    // Address
    setAddress,
    clearAddress,

    // Categories
    setSelectedCategories,
    addCategory,
    removeCategory,

    // Waste types
    setSelectedWasteTypes,
    addWasteType,
    removeWasteType,

    // Heavy waste
    setHasHeavyWaste,
    setHeavyWasteTypes,
    addHeavyWasteType,
    removeHeavyWasteType,
    setHeavyWastePercentageRange,
    setPlasterboardPercentageRange,

    // Skip and bags
    setSelectedSkip,
    setTonneBags,

    // Permit
    setNeedsPermit,
    setPermitInfo,

    // Dates
    setSelectedDate,
    setSelectedCollectionDate,

    // Completion
    setPopsCompleted,

    // Utility
    resetForm,
    updateForm,
    clearLocalStorage: handleClearLocalStorage,
  }

  return (
    <BookingFlowContext.Provider value={value}>
      {children}
    </BookingFlowContext.Provider>
  )
}

// Custom hook to use the context
export function useBookingFlow() {
  const context = useContext(BookingFlowContext)
  if (context === undefined) {
    throw new Error('useBookingFlow must be used within a BookingFlowProvider')
  }
  return context
}

// Export types for external use
export type { BookingFlowAction, BookingFlowContextType }
