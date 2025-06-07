import { z } from 'zod'
import { skipSchema } from './skip'

// Address schema
export const addressSchema = z.object({
  postcode: z.string(),
  city: z.string(),
  streetName: z.string(),
  houseNumber: z.string(),
  fullAddress: z.string(),
})

// Permit info schema
export const permitInfoSchema = z.object({
  id: z.number(),
  council_permit_days: z.number(),
  council_permit_clear_working_days: z.number(),
  price_before_vat: z.number(),
  postcode: z.string(),
  area: z.string(),
  forbidden: z.boolean(),
  created_at: z
    .union([z.string(), z.date()])
    .transform((val: string | Date) =>
      val instanceof Date ? val : new Date(val)
    ),
  updated_at: z
    .union([z.string(), z.date()])
    .transform((val: string | Date) =>
      val instanceof Date ? val : new Date(val)
    ),
})

// Percentage range enum
export const heavyWastePercentageRangeSchema = z.enum([
  'none',
  '<5',
  '5-10',
  '10-20',
  '>20',
])
export const plasterBoardPercentageRangeSchema = z.enum([
  'none',
  '<5',
  '5-10',
  '>10',
])

// Main booking flow schema
export const bookingFlowSchema = z.object({
  step: z.number(),
  address: addressSchema.nullable().optional(),
  selectedCategories: z.array(z.number()).default([]),
  hasHeavyWaste: z.boolean().default(false),
  tonneBags: z.number().default(0),
  selectedSkip: skipSchema.nullable(),
  needsPermit: z.boolean().nullable(),
  permitInfo: permitInfoSchema.nullable(),
  selectedDate: z
    .union([z.string(), z.date()])
    .nullable()
    .transform((val: undefined | null | string | Date) => {
      if (!val) return null
      return val instanceof Date ? val : new Date(val)
    }),
  selectedCollectionDate: z
    .union([z.string(), z.date()])
    .nullable()
    .transform((val: undefined | null | string | Date) => {
      if (!val) return null
      return val instanceof Date ? val : new Date(val)
    }),
  heavyWasteTypes: z.array(z.string()).default([]),
  popsCompleted: z.boolean().default(false),
  selectedWasteTypes: z.array(z.string()).default([]),
  heavyWastePercentageRange: heavyWastePercentageRangeSchema.default('none'),
  plasterboardPercentageRange:
    plasterBoardPercentageRangeSchema.default('none'),
})

// Exported types
export type AddressType = z.infer<typeof addressSchema>
export type PermitInfoType = z.infer<typeof permitInfoSchema>
export type HeavyWastePercentageRangeType = z.infer<
  typeof heavyWastePercentageRangeSchema
>
export type PlasterBoardPercentageRangeType = z.infer<
  typeof plasterBoardPercentageRangeSchema
>
export type BookingFlowType = z.infer<typeof bookingFlowSchema>

// Helper function to create initial booking flow state
export const createInitialBookingFlow = (): BookingFlowType => ({
  step: 1,
  address: {
    postcode: 'NR32',
    city: 'Lowestoft',
    streetName: '',
    houseNumber: '',
    fullAddress: '',
  },
  selectedCategories: [],
  hasHeavyWaste: false,
  tonneBags: 0,
  selectedSkip: null,
  needsPermit: null,
  permitInfo: null,
  selectedDate: null,
  selectedCollectionDate: null,
  heavyWasteTypes: [],
  popsCompleted: false,
  selectedWasteTypes: [],
  heavyWastePercentageRange: 'none',
  plasterboardPercentageRange: 'none',
})
