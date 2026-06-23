import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'

import { Pie } from 'react-chartjs-2'
import { useOrders } from '#/components/orders/hooks/useOrders'

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
)

const options = {
  responsive: true,
  maintainAspectRatio: false,
}

export default function OrdersPieChart() {
  const { data: orders = [] } = useOrders()

  const paidCount = orders.filter(
    (o) => o.status === 'paid'
  ).length

  const pendingCount = orders.filter(
    (o) => o.status === 'pending'
  ).length

  const cancelledCount = orders.filter(
    (o) => o.status === 'cancelled'
  ).length

  const data = {
    labels: [
      'Paid',
      'Pending',
      'Cancelled',
    ],
    datasets: [
      {
        data: [
          paidCount,
          pendingCount,
          cancelledCount,
        ],
      },
    ],
  }

  return (
    <div className="h-40">
      <Pie
        data={data}
        options={options}
      />
    </div>
  )
}