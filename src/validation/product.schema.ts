import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().min(3, 'Name must contain at least 3 characters'),

  price: z.number().positive('Price must be greater than 0'),

  stock: z.number().min(0, 'Stock cannot be negative'),
})

export type ProductFormData = z.infer<typeof productSchema>
