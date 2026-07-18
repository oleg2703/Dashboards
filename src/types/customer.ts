import type { ReactNode } from 'react'

export type Customer = {
  ordersCount: number
  id: number
  name: string
  email: string
  isActive: boolean
  createdAt: string
  totalSpent: number
}
