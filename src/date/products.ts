import type { Product } from '../types/product'

export const products: Product[] = [
  {
    id: 1,
    name: 'Pizza',
    price: 12,
    stock: 35,
    status: 'Active',
    description: 'Classic Italian pizza',
  },
  {
    id: 2,
    name: 'Burger',
    price: 10,
    stock: 20,
    status: 'Active',
    description: 'Delicious beef burger',
  },
  {
    id: 3,
    name: 'Pasta',
    price: 15,
    stock: 4,
    status: 'Low Stock',
    description: 'Delicious pasta dish',
  },
  {
    id: 4,
    name: 'Steak',
    price: 22,
    stock: 8,
    status: 'Active',
    description: 'Juicy beef steak',
  },
]