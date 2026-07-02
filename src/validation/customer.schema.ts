import { z } from 'zod'

export const customerSchema = z.object({
  name: z
    .string()
    .min(3, 'Name is too short'),

  email: z
    .email('Invalid email'),
})

export type CustomerFormData =
  z.infer<typeof customerSchema>