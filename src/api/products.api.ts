import axios from 'axios'
import type { Product } from '#/types/product'

const API_URL = 'http://localhost:3001/products'

export const productsApi = {
  getAll: async (): Promise<Product[]> => {
    const { data } = await axios.get(API_URL)
    return data
  },

  create: async (
    product: Product
  ): Promise<Product> => {
    const { data } = await axios.post(
      API_URL,
      product
    )

    return data
  },

  update: async (
    product: Product
  ): Promise<Product> => {
    const { data } = await axios.put(
      `${API_URL}/${product.id}`,
      product
    )

    return data
  },

  delete: async (
    id: number
  ): Promise<void> => {
    await axios.delete(
      `${API_URL}/${id}`
    )
  },
}