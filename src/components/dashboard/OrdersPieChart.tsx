import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'

import { Pie } from 'react-chartjs-2'

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
)

const data = {
  labels: ['Completed', 'Pending', 'Cancelled'],
  datasets: [
    {
      data: [73, 17, 10],
      backgroundColor: [
        '#22c55e',
        '#f59e0b',
        '#ef4444',
      ],
      borderWidth: 0,
    },
  ],
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
}

export default function OrdersPieChart() {
  return (
    <div className=" ">
      <Pie data={data} options={options}  />
    </div>
  )
}