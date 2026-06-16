import axios from 'axios'
import type { Customer } from '#/types/customer'

const API_URL = 'http://localhost:3001/customers'

export const customersApi = {
  getAll: async (): Promise<Customer[]> => {
    const { data } = await axios.get(API_URL)
    return data
  },

  create: async (
    customer: Omit<Customer, 'id'>
  ) => {
    const { data } = await axios.post(
      API_URL,
      customer
    )

    return data
  },

  update: async (
    customer: Customer
  ) => {
    const { data } = await axios.put(
      `${API_URL}/${customer.id}`,
      customer
    )

    return data
  },

  delete: async (
    id: number
  ) => {
    await axios.delete(
      `${API_URL}/${id}`
    )
  },
}