export interface Order {
  id: number
  customerId: number
  amount: number
  status: 'paid' | 'pending' | 'cancelled'
  date: string
  items?: OrderItem[]
}

export interface OrderItem {
  productId: number
  quantity: number
  priceAtOrderTime: number
}
