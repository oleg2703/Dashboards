import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js'

import { Line } from 'react-chartjs-2'
import { useOrders } from '#/components/orders/hooks/useOrders'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
)

const options = {
  responsive: true,
  maintainAspectRatio: false,
}

export default function RevenueChart() {
  const { data: orders = [] } = useOrders()

  const chartData = [...orders]
    .sort(
      (a, b) =>
        new Date(a.date).getTime() -
        new Date(b.date).getTime()
    )

  const data = {
    labels: chartData.map(
      (order) => order.date
    ),

    datasets: [
      {
        label: 'Revenue',
        data: chartData.map(
          (order) => order.amount
        ),

        borderColor: '#3b82f6',
        backgroundColor:
          'rgba(59,130,246,0.2)',

        tension: 0.4,
      },
    ],
  }

  return (
    <div className="h-50">
      <Line
        data={data}
        options={options}
      />
    </div>
  )
}