import { z } from 'zod'

export const orderSchema = z.object({
  customerId: z
    .number(),

  amount: z
    .number()
    .positive(),

  status: z.enum([
    'paid',
    'pending',
    'cancelled',
  ]),
})

export type OrderFormData =
  z.infer<typeof orderSchema>