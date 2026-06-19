import { useCustomers } from '#/components/customers/hooks/useCustomers'
import { useProducts } from '#/components/products/hooks/useProducts'

export const useDashboardStats = () => {
  const customers = useCustomers()
  const products = useProducts()

  const totalCustomers =
    customers.data?.length ?? 0

  const totalProducts =
    products.data?.length ?? 0

  const totalRevenue =
    customers.data?.reduce(
      (sum, customer) =>
        sum + customer.totalSpent,
      0
    ) ?? 0
const activeCustomers =
  customers.data?.filter(
    (customer) => customer.isActive
  ).length ?? 0
  return {
    activeCustomers,
    totalCustomers,
    totalProducts,
    totalRevenue,
    isLoading:
      customers.isLoading ||
      products.isLoading,
  }
}