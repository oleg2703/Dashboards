import { z } from 'zod'

export const orderSchema = z.object({
  customerId: z.number().int().positive('Select a customer'),

  items: z
    .array(
      z.object({
        productId: z.number().int().positive('Select a product'),
        quantity: z.number().int().positive('Quantity must be at least 1'),
      }),
    )
    .min(1, 'Add at least one item to the order'),

  status: z.enum(['paid', 'pending', 'cancelled']),
})

export type OrderFormData = z.infer<typeof orderSchema>

export const editOrderSchema = z.object({
  customerId: z.number().int().positive('Customer ID is required'),
  amount: z.number().nonnegative('Amount cannot be negative'),
  status: z.enum(['paid', 'pending', 'cancelled']),
})

export type EditOrderFormData = z.infer<typeof editOrderSchema>
