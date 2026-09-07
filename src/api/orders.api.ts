import { supabase } from '#/lib/supabase'
import type { Order, OrderItem } from '#/types/order'

type OrderItemRecord = {
  productId: number
  quantity: number
  priceAtOrderTime: number
}

type OrderRecord = Order & {
  customers?: { name: string } | null
  order_items?: OrderItemRecord[]
}

function mapOrder(record: OrderRecord): Order {
  const { customers, order_items, ...order } = record

  return {
    ...order,
    customerName: customers?.name ?? 'Unknown customer',
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
      .select(
        '*, customers(name), order_items(productId, quantity, priceAtOrderTime)',
      )
      .order('id')

    if (error) throw error

    return (data as OrderRecord[]).map(mapOrder)
  },

  async getById(id: number): Promise<Order | null> {
    const { data, error } = await supabase
      .from('orders')
      .select(
        '*, customers(name), order_items(productId, quantity, priceAtOrderTime)',
      )
      .eq('id', id)
      .maybeSingle()

    if (error) throw error

    return data ? mapOrder(data as OrderRecord) : null
  },

  async create(order: Omit<Order, 'id'>): Promise<Order> {
    const { customerId, items = [] } = order

    const { data, error } = await supabase
      .rpc('create_order_with_items', {
        customer_id: customerId,
        items: items.map(({ productId, quantity }) => ({
          productId,
          quantity,
        })),
      })
      .single()

    if (error) throw error

    // amount/priceAtOrderTime are now calculated by the database, not
    // sent from the client — re-fetch the full order (with items) so
    // the UI shows the real, server-computed values.
    const created = data as Order
    const full = await ordersApi.getById(created.id)
    return full ?? created
  },

  async update(order: Order): Promise<Order> {
    const { customerName: _customerName, items: _items, ...orderData } = order
    const { data, error } = await supabase
      .from('orders')
      .update(orderData)
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