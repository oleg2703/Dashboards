import { BaseApi } from './base.api'
import type { Product } from '#/types/product'

export const productsApi =
  new BaseApi<Product>(
    'http://localhost:3001/products'
  )