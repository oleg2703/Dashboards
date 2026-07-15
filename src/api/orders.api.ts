import { supabase } from '#/lib/supabase'
import type { Order } from '#/types/order'

export const ordersApi = {
  async getAll(): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('id')

    if (error) throw error

    return data as Order[]
  },

  async getById(
    id: number,
  ): Promise<Order | null> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .maybeSingle()

    if (error) throw error

    return data as Order | null
  },

  async create(
    order: Omit<Order, 'id'>,
  ): Promise<Order> {
    const { data, error } = await supabase
      .from('orders')
      .insert(order)
      .select()
      .single()

    if (error) throw error

    return data as Order
  },

  async update(
    order: Order,
  ): Promise<Order> {
    const { data, error } = await supabase
      .from('orders')
      .update(order)
      .eq('id', order.id)
      .select()
      .single()

    if (error) throw error

    return data as Order
  },

  async delete(
    id: number,
  ): Promise<void> {
    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', id)

    if (error) throw error
  },
}