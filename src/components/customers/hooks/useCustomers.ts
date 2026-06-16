import { customersApi } from "#/api/customers.api"
import { useQuery } from "@tanstack/react-query"

export const useCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: customersApi.getAll,
  })
}