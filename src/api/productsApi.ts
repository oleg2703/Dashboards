import { supabase } from '#/lib/supabase.ts'
import type { Product } from '#/types/product'

export const productsApi = {
  async getAll(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id')

    if (error) {
      throw error
    }

    return data as Product[]
  },

  async getById(id: number): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .maybeSingle()

    if (error) {
      throw error
    }

    return data as Product
  },

  async create(product: Omit<Product, 'id'>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select()
      .single()

    if (error) {
      throw error
    }

    return data as Product
  },

  async update(product: Product): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .update({
        name: product.name,
        price: product.price,
        stock: product.stock,
        status: product.status,
        description: product.description,
      })
      .eq('id', product.id)
      .select()
      .single()

    if (error) {
      throw error
    }

    return data as Product
  },

  async delete(id: number): Promise<void> {
    const { error } = await supabase.from('products').delete().eq('id', id)

    if (error) {
      throw error
    }
  },
}
