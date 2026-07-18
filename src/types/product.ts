export interface Product {
  id: number
  name: string
  price: number
  stock: number
  status: 'Active' | 'Low Stock'
  description?: string
}
