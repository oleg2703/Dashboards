import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js'

import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
)

export default function TopProducts() {
  const data = {
    labels: [
      'Pizza',
      'Burger',
      'Caesar Salad',
      'Pasta',
      'Steak',
    ],
    datasets: [
      {
        label: 'Sales',
        data: [124, 98, 76, 64, 51],
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
  }

  return (
    <div className="h-300px">
      <Bar
        data={data}
        options={options}
      />
    </div>
  )
}