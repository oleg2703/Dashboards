import { useMemo } from 'react'

import { useCustomers } from '#/components/customers/hooks/useCustomers'
import { useProducts } from '#/components/products/hooks/useProducts'
import { useOrders } from '#/components/orders/hooks/useOrders'

export const useDashboardStats = () => {
  const customers = useCustomers()
  const products = useProducts()
  const orders = useOrders()

  return useMemo(() => {
    const customersData = customers.data ?? []
    const productsData = products.data ?? []
    const ordersData = orders.data ?? []

    const totalRevenue = ordersData.reduce(
      (sum, order) => sum + order.amount,
      0
    )

    return {
      totalCustomers: customersData.length,

      activeCustomers: customersData.filter(
        (customer) => customer.isActive
      ).length,

      totalProducts: productsData.length,

      totalOrders: ordersData.length,

      totalRevenue,

      lowStockProducts: productsData.filter(
        (product) => product.status === 'Low Stock'
      ).length,

      pendingOrders: ordersData.filter(
        (order) => order.status === 'pending'
      ).length,

      averageOrder:
        ordersData.length > 0
          ? Math.round(totalRevenue / ordersData.length)
          : 0,

      isLoading:
        customers.isLoading ||
        products.isLoading ||
        orders.isLoading,
    }
  }, [
    customers.data,
    products.data,
    orders.data,
    customers.isLoading,
    products.isLoading,
    orders.isLoading,
  ])
}