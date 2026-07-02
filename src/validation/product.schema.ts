import { z } from 'zod'

export const productSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must contain at least 3 characters'),

  category: z
    .string()
    .min(2, 'Category is required'),

  price: z
    .number({
      error: 'Price is required',
    })
    .positive('Price must be greater than 0'),

  stock: z
    .number()
    .min(0, 'Stock cannot be negative'),

  status: z.enum([
    'Active',
    'Low Stock',
  ]),
})

export type ProductFormData =
  z.infer<typeof productSchema>