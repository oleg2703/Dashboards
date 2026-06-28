import { http } from './http'

export class BaseApi<T> {
  constructor(private endpoint: string) {}

  getAll = async (): Promise<T[]> => {
    const { data } = await http.get(this.endpoint)
    return data
  }

  create = async (item: Omit<T, 'id'>): Promise<T> => {
    const { data } = await http.post(this.endpoint, item)
    return data
  }

  update = async (
    item: T & { id: number }
  ): Promise<T> => {
    const { data } = await http.put(
      `${this.endpoint}/${item.id}`,
      item
    )

    return data
  }

  delete = async (id: number): Promise<void> => {
    await http.delete(`${this.endpoint}/${id}`)
  }
}