import type { ReactNode } from "react"

export type Customer = {
  ordersCount: ReactNode
  id: string
  name: string
  email: string
  isActive: boolean
  createdAt: string
  orders: Order[]
  totalSpent: number
}
export type Order = {
  id: string
  date: string
  amount: number
  status: "paid" | "pending" | "failed"
}