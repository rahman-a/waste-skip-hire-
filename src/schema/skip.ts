import { z } from 'zod'

export const skipSchema = z.object({
  id: z.string().optional(),
  size: z.number(),
  hire_period_days: z.number(),
  transport_cost: z.number().nullable(),
  per_tonne_cost: z.number().nullable(),
  price_before_vat: z.number(),
  vat: z.number(),
  postcode: z.string(),
  area: z.string(),
  forbidden: z.boolean(),
  allowed_on_road: z.boolean(),
  allows_heavy_waste: z.boolean(),
  created_at: z
    .union([z.string(), z.date()])
    .optional()
    .transform((val: undefined | string | Date) =>
      val ? (val instanceof Date ? val : new Date(val)) : undefined
    ),
  updated_at: z
    .union([z.string(), z.date()])
    .optional()
    .transform((val: undefined | string | Date) =>
      val ? (val instanceof Date ? val : new Date(val)) : undefined
    ),
})

export type SkipType = z.infer<typeof skipSchema>
