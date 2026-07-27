import { useMemo } from 'react'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

import { useOrders } from '#/components/orders/hooks/useOrders'
import { useProducts } from '#/components/products/hooks/useProducts'
import EmptyState from '#/components/common/EmptyState'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

export default function TopProducts() {
  const { data: products = [] } = useProducts()
  const { data: orders = [] } = useOrders()

  const { labels, values, hasData } = useMemo(() => {
    const productMap = new Map(products.map((product) => [product.id, product]))
    const totals = new Map<number, { name: string; quantity: number }> ()

    for (const order of orders) {
      for (const item of order.items ?? []) {
        const product = productMap.get(item.productId)
        const name = product?.name ?? `Product #${item.productId}`
        const current = totals.get(item.productId) ?? { name, quantity: 0 }
        current.quantity += item.quantity
        totals.set(item.productId, current)
      }
    }

    const sortedTopProducts = Array.from(totals.values())
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5)

    const labels = sortedTopProducts.map((item) => item.name)
    const values = sortedTopProducts.map((item) => item.quantity)

    return {
      labels,
      values,
      hasData: values.some((qty) => qty > 0),
    }
  }, [orders, products])

  const data = {
    labels,
    datasets: [
      {
        label: 'Units Sold',
        data: values,
        borderRadius: 8,
        backgroundColor: '#3b82f6',
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y' as const,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          precision: 0,
        },
      },
    },
  }

  return (
    <div className="h-300px">
      {hasData ? (
        <Bar data={data} options={options} />
      ) : (
        <EmptyState
          title="No sales data yet"
          description="Top products will appear once orders are placed."
        />
      )}
    </div>
  )
}
