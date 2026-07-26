import type { Product } from '#/types/product'

export const LOW_STOCK_THRESHOLD = 5

export function getProductStatus(stock: number): Product['status'] {
  return stock > LOW_STOCK_THRESHOLD ? 'Active' : 'Low Stock'
}