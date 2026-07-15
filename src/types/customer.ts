import type { ReactNode } from "react"

export type Customer = {
  ordersCount: ReactNode
  id: number
  name: string
  email: string
  isActive: boolean
  createdAt: string
  totalSpent: number
}
