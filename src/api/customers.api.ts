import { http } from "./http"

export const customersApi = {
  getAll: () => http.get("/customers"),
  getById: (id: string) => http.get(`/customers/${id}`),
}