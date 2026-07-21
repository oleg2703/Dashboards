import { supabase } from '#/lib/supabase'
import type { Order, OrderItem } from '#/types/order'

type OrderItemRecord = {
  productId: number
  quantity: number
  priceAtOrderTime: number
}

type OrderRecord = Order & {
  order_items?: OrderItemRecord[]
}

function mapOrder(record: OrderRecord): Order {
  const { order_items, ...order } = record

  return {
    ...order,
    items: order_items?.map(
      ({ productId, quantity, priceAtOrderTime }): OrderItem => ({
        productId,
        quantity,
        priceAtOrderTime,
      }),
    ),
  }
}

export const ordersApi = {
  async getAll(): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(productId, quantity, priceAtOrderTime)')
      .order('id')

    if (error) throw error

    return (data as OrderRecord[]).map(mapOrder)
  },

  async getById(id: number): Promise<Order | null> {
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(productId, quantity, priceAtOrderTime)')
      .eq('id', id)
      .maybeSingle()

    if (error) throw error

    return data ? mapOrder(data as OrderRecord) : null
  },

  async create(order: Omit<Order, 'id'>): Promise<Order> {
    const { items = [], ...orderData } = order
    const { data, error } = await supabase
      .from('orders')
      .insert(orderData)
      .select()
      .single()

    if (error) throw error

    const createdOrder = data as Order
    const { error: itemsError } = await supabase.from('order_items').insert(
      items.map((item) => ({
        orderId: createdOrder.id,
        productId: item.productId,
        quantity: item.quantity,
        priceAtOrderTime: item.priceAtOrderTime,
      })),
    )

    if (itemsError) {
      await supabase.from('orders').delete().eq('id', createdOrder.id)
      throw itemsError
    }

    return { ...createdOrder, items }
  },

  async update(order: Order): Promise<Order> {
    const { data, error } = await supabase
      .from('orders')
      .update(order)
      .eq('id', order.id)
      .select()
      .single()

    if (error) throw error

    return data as Order
  },

  async delete(id: number): Promise<void> {
    const { error } = await supabase.from('orders').delete().eq('id', id)

    if (error) throw error
  },
}
