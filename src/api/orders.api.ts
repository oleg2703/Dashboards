import { http } from './http'
import type { Order } from '#/types/order'

export const ordersApi = {
  getAll: async (): Promise<Order[]> => {
    const { data } = await http.get('/orders')
    return data
  },

  create: async (
    order: Omit<Order, 'id'>
  ): Promise<Order> => {
    const { data } = await http.post(
      '/orders',
      order
    )
    return data
  },

  update: async (
    order: Order
  ): Promise<Order> => {
    const { data } = await http.put(
      `/orders/${order.id}`,
      order
    )
    return data
  },

  delete: async (id: number) => {
    await http.delete(`/orders/${id}`)
  },
}