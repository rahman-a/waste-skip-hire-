import { BOOKING_FLOW_ACTIONS } from '../constants/booking-flow-actions'
import {
  createInitialBookingFlow,
  type BookingFlowType,
  type AddressType,
  type PermitInfoType,
  type HeavyWastePercentageRangeType,
  type PlasterBoardPercentageRangeType,
} from '../schema/booking-flow'
import type { SkipType } from '../schema/skip'

// Action types
export type BookingFlowAction =
  // Step management
  | { type: typeof BOOKING_FLOW_ACTIONS.SET_STEP; payload: number }
  | { type: typeof BOOKING_FLOW_ACTIONS.NEXT_STEP }
  | { type: typeof BOOKING_FLOW_ACTIONS.PREVIOUS_STEP }
  | { type: typeof BOOKING_FLOW_ACTIONS.RESET_TO_STEP; payload: number }

  // Address
  | { type: typeof BOOKING_FLOW_ACTIONS.SET_ADDRESS; payload: AddressType }
  | { type: typeof BOOKING_FLOW_ACTIONS.CLEAR_ADDRESS }

  // Categories and waste types
  | {
      type: typeof BOOKING_FLOW_ACTIONS.SET_SELECTED_CATEGORIES
      payload: number[]
    }
  | { type: typeof BOOKING_FLOW_ACTIONS.ADD_CATEGORY; payload: number }
  | { type: typeof BOOKING_FLOW_ACTIONS.REMOVE_CATEGORY; payload: number }
  | {
      type: typeof BOOKING_FLOW_ACTIONS.SET_SELECTED_WASTE_TYPES
      payload: string[]
    }
  | { type: typeof BOOKING_FLOW_ACTIONS.ADD_WASTE_TYPE; payload: string }
  | { type: typeof BOOKING_FLOW_ACTIONS.REMOVE_WASTE_TYPE; payload: string }

  // Heavy waste
  | { type: typeof BOOKING_FLOW_ACTIONS.SET_HAS_HEAVY_WASTE; payload: boolean }
  | {
      type: typeof BOOKING_FLOW_ACTIONS.SET_HEAVY_WASTE_TYPES
      payload: string[]
    }
  | { type: typeof BOOKING_FLOW_ACTIONS.ADD_HEAVY_WASTE_TYPE; payload: string }
  | {
      type: typeof BOOKING_FLOW_ACTIONS.REMOVE_HEAVY_WASTE_TYPE
      payload: string
    }
  | {
      type: typeof BOOKING_FLOW_ACTIONS.SET_HEAVY_WASTE_PERCENTAGE_RANGE
      payload: HeavyWastePercentageRangeType
    }
  | {
      type: typeof BOOKING_FLOW_ACTIONS.SET_PLASTERBOARD_PERCENTAGE_RANGE
      payload: PlasterBoardPercentageRangeType
    }

  // Skip and bags
  | {
      type: typeof BOOKING_FLOW_ACTIONS.SET_SELECTED_SKIP
      payload: SkipType | null
    }
  | { type: typeof BOOKING_FLOW_ACTIONS.SET_TONNE_BAGS; payload: number }

  // Permit
  | {
      type: typeof BOOKING_FLOW_ACTIONS.SET_NEEDS_PERMIT
      payload: boolean | null
    }
  | {
      type: typeof BOOKING_FLOW_ACTIONS.SET_PERMIT_INFO
      payload: PermitInfoType | null
    }

  // Dates
  | {
      type: typeof BOOKING_FLOW_ACTIONS.SET_SELECTED_DATE
      payload: Date | null
    }
  | {
      type: typeof BOOKING_FLOW_ACTIONS.SET_SELECTED_COLLECTION_DATE
      payload: Date | null
    }

  // Completion
  | { type: typeof BOOKING_FLOW_ACTIONS.SET_POPS_COMPLETED; payload: boolean }

  // Reset and update
  | { type: typeof BOOKING_FLOW_ACTIONS.RESET_FORM }
  | {
      type: typeof BOOKING_FLOW_ACTIONS.UPDATE_FORM
      payload: Partial<BookingFlowType>
    }

// Initial state
export const initialBookingFlowState: BookingFlowType =
  createInitialBookingFlow()

// Reducer
export function bookingFlowReducer(
  state: BookingFlowType,
  action: BookingFlowAction
): BookingFlowType {
  switch (action.type) {
    // Step management
    case BOOKING_FLOW_ACTIONS.SET_STEP:
      return {
        ...state,
        step: action.payload,
      }

    case BOOKING_FLOW_ACTIONS.NEXT_STEP:
      return {
        ...state,
        step: state.step + 1,
      }

    case BOOKING_FLOW_ACTIONS.PREVIOUS_STEP:
      return {
        ...state,
        step: Math.max(1, state.step - 1),
      }

    case BOOKING_FLOW_ACTIONS.RESET_TO_STEP:
      return {
        ...createInitialBookingFlow(),
        step: action.payload,
      }

    // Address
    case BOOKING_FLOW_ACTIONS.SET_ADDRESS:
      return {
        ...state,
        address: action.payload,
      }

    case BOOKING_FLOW_ACTIONS.CLEAR_ADDRESS:
      return {
        ...state,
        address: null,
      }

    // Categories
    case BOOKING_FLOW_ACTIONS.SET_SELECTED_CATEGORIES:
      return {
        ...state,
        selectedCategories: action.payload,
      }

    case BOOKING_FLOW_ACTIONS.ADD_CATEGORY:
      return {
        ...state,
        selectedCategories: [...state.selectedCategories, action.payload],
      }

    case BOOKING_FLOW_ACTIONS.REMOVE_CATEGORY:
      return {
        ...state,
        selectedCategories: state.selectedCategories.filter(
          (id) => id !== action.payload
        ),
      }

    // Waste types
    case BOOKING_FLOW_ACTIONS.SET_SELECTED_WASTE_TYPES:
      return {
        ...state,
        selectedWasteTypes: action.payload,
      }

    case BOOKING_FLOW_ACTIONS.ADD_WASTE_TYPE:
      return {
        ...state,
        selectedWasteTypes: [...state.selectedWasteTypes, action.payload],
      }

    case BOOKING_FLOW_ACTIONS.REMOVE_WASTE_TYPE:
      return {
        ...state,
        selectedWasteTypes: state.selectedWasteTypes.filter(
          (type) => type !== action.payload
        ),
      }

    // Heavy waste
    case BOOKING_FLOW_ACTIONS.SET_HAS_HEAVY_WASTE:
      return {
        ...state,
        hasHeavyWaste: action.payload,
      }

    case BOOKING_FLOW_ACTIONS.SET_HEAVY_WASTE_TYPES:
      return {
        ...state,
        heavyWasteTypes: action.payload,
      }

    case BOOKING_FLOW_ACTIONS.ADD_HEAVY_WASTE_TYPE:
      return {
        ...state,
        heavyWasteTypes: [...state.heavyWasteTypes, action.payload],
      }

    case BOOKING_FLOW_ACTIONS.REMOVE_HEAVY_WASTE_TYPE:
      return {
        ...state,
        heavyWasteTypes: state.heavyWasteTypes.filter(
          (type) => type !== action.payload
        ),
      }

    case BOOKING_FLOW_ACTIONS.SET_HEAVY_WASTE_PERCENTAGE_RANGE:
      return {
        ...state,
        heavyWastePercentageRange: action.payload,
      }

    case BOOKING_FLOW_ACTIONS.SET_PLASTERBOARD_PERCENTAGE_RANGE:
      return {
        ...state,
        plasterboardPercentageRange: action.payload,
      }

    // Skip and bags
    case BOOKING_FLOW_ACTIONS.SET_SELECTED_SKIP:
      return {
        ...state,
        selectedSkip: action.payload,
      }

    case BOOKING_FLOW_ACTIONS.SET_TONNE_BAGS:
      return {
        ...state,
        tonneBags: action.payload,
      }

    // Permit
    case BOOKING_FLOW_ACTIONS.SET_NEEDS_PERMIT:
      return {
        ...state,
        needsPermit: action.payload,
      }

    case BOOKING_FLOW_ACTIONS.SET_PERMIT_INFO:
      return {
        ...state,
        permitInfo: action.payload,
      }

    // Dates
    case BOOKING_FLOW_ACTIONS.SET_SELECTED_DATE:
      return {
        ...state,
        selectedDate: action.payload,
      }

    case BOOKING_FLOW_ACTIONS.SET_SELECTED_COLLECTION_DATE:
      return {
        ...state,
        selectedCollectionDate: action.payload,
      }

    // Completion
    case BOOKING_FLOW_ACTIONS.SET_POPS_COMPLETED:
      return {
        ...state,
        popsCompleted: action.payload,
      }

    // Reset and update
    case BOOKING_FLOW_ACTIONS.RESET_FORM:
      return createInitialBookingFlow()

    case BOOKING_FLOW_ACTIONS.UPDATE_FORM:
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state
  }
}
