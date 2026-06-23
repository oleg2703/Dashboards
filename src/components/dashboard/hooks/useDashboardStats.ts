import { useCustomers } from '#/components/customers/hooks/useCustomers'
import { useProducts } from '#/components/products/hooks/useProducts'
import { useOrders } from '#/components/orders/hooks/useOrders'

export const useDashboardStats = () => {
  const customers = useCustomers()
  const products = useProducts()
  const orders = useOrders()

  const totalCustomers =
    customers.data?.length ?? 0

  const totalProducts =
    products.data?.length ?? 0

  const totalRevenue =
    orders.data?.reduce(
      (sum, order) => sum + order.amount,
      0
    ) ?? 0

  const totalOrders =
    orders.data?.length ?? 0

  const activeCustomers =
    customers.data?.filter(
      (customer) => customer.isActive
    ).length ?? 0

  return {
    totalCustomers,
    totalProducts,
    totalOrders,
    totalRevenue,
    activeCustomers,

    isLoading:
      customers.isLoading ||
      products.isLoading ||
      orders.isLoading,
  }
}