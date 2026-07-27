import { useMemo } from 'react'

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js'
import 'chartjs-adapter-date-fns'
import { Line } from 'react-chartjs-2'
import { useOrders } from '#/components/orders/hooks/useOrders'

ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      type: 'time' as const,
      time: {
        unit: 'day',
        tooltipFormat: 'PP',
        displayFormats: {
          day: 'MMM d',
        },
      },
      ticks: {
        autoSkip: true,
        maxTicksLimit: 6,
      },
    },
    y: {
      beginAtZero: true,
    },
  },
}

function formatDateKey(dateString: string) {
  const date = new Date(dateString)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate(),
  ).padStart(2, '0')}`
}

export default function RevenueChart() {
  const { data: orders = [] } = useOrders()

  const aggregated = useMemo(() => {
    const totals = new Map<string, number>()

    for (const order of orders) {
      const dateKey = formatDateKey(order.date)
      totals.set(dateKey, (totals.get(dateKey) ?? 0) + order.amount)
    }

    return Array.from(totals.entries())
      .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
      .map(([date, total]) => ({ date, total }))
  }, [orders])

  const data = {
    labels: aggregated.map((item) => item.date),
    datasets: [
      {
        label: 'Revenue',
        data: aggregated.map((item) => item.total),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59,130,246,0.2)',
        tension: 0.4,
      },
    ],
  }

  return (
    <div className="h-50">
      <Line data={data} options={options} />
    </div>
  )
}
