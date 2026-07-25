import { supabase } from '#/lib/supabase'
import type { Customer } from '#/types/customer'
import type { Order } from '#/types/order'

export function buildCustomerSummaries(
  customers: Customer[],
  orders: Order[],
): Customer[] {
  const summaries = orders.reduce(
    (acc, order) => {
      const current = acc.get(order.customerId)

      if (!current) {
        acc.set(order.customerId, { ordersCount: 1, totalSpent: order.amount })
        return acc
      }

      current.ordersCount += 1
      current.totalSpent += order.amount
      acc.set(order.customerId, current)

      return acc
    },
    new Map<number, { ordersCount: number; totalSpent: number }>(),
  )

  return customers.map((customer) => {
    const summary = summaries.get(customer.id)

    if (!summary) {
      return {
        ...customer,
        ordersCount: 0,
        totalSpent: 0,
      }
    }

    return {
      ...customer,
      ordersCount: summary.ordersCount,
      totalSpent: summary.totalSpent,
    }
  })
}

export const customersApi = {
  async getAll(): Promise<Customer[]> {
    const [{ data: customerData, error: customersError }, { data: orderData, error: ordersError }] =
      await Promise.all([
        supabase.from('customers').select('*').order('id'),
        supabase.from('orders').select('*').order('id'),
      ])

    if (customersError) throw customersError
    if (ordersError) throw ordersError

    const customers = customerData as Customer[]
    const orders = orderData as Order[]

    return buildCustomerSummaries(customers, orders)
  },

  async getById(id: number): Promise<Customer | null> {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('id', id)
      .maybeSingle()

    if (error) throw error

    return data as Customer | null
  },

  async create(customer: Omit<Customer, 'id'>): Promise<Customer> {
    const { data, error } = await supabase
      .from('customers')
      .insert(customer)
      .select()
      .single()

    if (error) throw error

    return data as Customer
  },

  async update(customer: Customer): Promise<Customer> {
    const { data, error } = await supabase
      .from('customers')
      .update(customer)
      .eq('id', customer.id)
      .select()
      .single()

    if (error) throw error

    return data as Customer
  },

  async delete(id: number): Promise<void> {
    const { error } = await supabase.from('customers').delete().eq('id', id)

    if (error) throw error
  },
}
