import { BaseApi } from './base.api'
import type { Order } from '#/types/order'

export const ordersApi =
  new BaseApi<Order>(
    'http://localhost:3001/orders'
  )