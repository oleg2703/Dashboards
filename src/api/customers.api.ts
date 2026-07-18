import { supabase } from '#/lib/supabase'
import type { Customer } from '#/types/customer'

export const customersApi = {
  async getAll(): Promise<Customer[]> {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('id')

    if (error) throw error

    return data as Customer[]
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
