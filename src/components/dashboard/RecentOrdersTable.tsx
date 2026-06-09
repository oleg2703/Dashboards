type Order = {
  id: string
  customer: string
  status: 'Completed' | 'Pending' | 'Cancelled'
  amount: number
}

const orders: Order[] = [
  {
    id: '#1001',
    customer: 'John Doe',
    status: 'Completed',
    amount: 120,
  },
  {
    id: '#1002',
    customer: 'Jane Smith',
    status: 'Pending',
    amount: 85,
  },
  {
    id: '#1003',
    customer: 'Alex Brown',
    status: 'Completed',
    amount: 45,
  },
  {
    id: '#1004',
    customer: 'Emily Davis',
    status: 'Cancelled',
    amount: 70,
  },
]

export default function RecentOrdersTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-(--border)">
            <th className="px-3 py-2 text-left">Order ID</th>
            <th className="px-3 py-2 text-left">Customer</th>
            <th className="px-3 py-2 text-left">Status</th>
            <th className="px-3 py-2 text-right">Amount</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-b border-(--border)"
            >
              <td className="px-3 py-2">{order.id}</td>

              <td className="px-3 py-2">
                {order.customer}
              </td>

              <td className="px-3 py-2">
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium
                  ${
                    order.status === 'Completed'
                      ? 'bg-green-500/15 text-green-500'
                      : order.status === 'Pending'
                        ? 'bg-yellow-500/15 text-yellow-500'
                        : 'bg-red-500/15 text-red-500'
                  }`}
                >
                  {order.status}
                </span>
              </td>

              <td className="px-3 py-3 text-right">
                ${order.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}