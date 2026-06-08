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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
)

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  datasets: [
    {
      label: 'Revenue',
      data: [4000, 3000, 2000, 2780, 1890],
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59,130,246,0.2)',
      tension: 0.4,
    },
  ],
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
}

export default function RevenueChart() {
  return (
    <div className="h-350px">
      <Line data={data} options={options} />
    </div>
  )
}