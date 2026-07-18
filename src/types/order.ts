export interface Order {
  id: number
  customerId: number
  amount: number
  status: 'paid' | 'pending' | 'cancelled'
  date: string
}
