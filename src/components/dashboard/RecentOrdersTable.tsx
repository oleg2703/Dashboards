import { useOrders } from '../orders/hooks/useOrders'

export default function RecentOrdersTable() {
  const { data: orders = [] } = useOrders()

  const recentOrders = [...orders]
    .sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    )
    .slice(0, 5)

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-(--border)">
            <th className="px-3 py-2 text-left">
              Order ID
            </th>
            <th className="px-3 py-2 text-left">
              Customer ID
            </th>
            <th className="px-3 py-2 text-left">
              Status
            </th>
            <th className="px-3 py-2 text-right">
              Amount
            </th>
          </tr>
        </thead>

        <tbody>
          {recentOrders.map((order) => (
            <tr
              key={order.id}
              className="border-b border-(--border)"
            >
              <td className="px-3 py-2">
                #{order.id}
              </td>

              <td className="px-3 py-2">
                {order.customerId}
              </td>

              <td className="px-3 py-2">
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium
                  ${
                    order.status === 'paid'
                      ? 'bg-green-500/15 text-green-500'
                      : order.status === 'pending'
                        ? 'bg-yellow-500/15 text-yellow-500'
                        : 'bg-red-500/15 text-red-500'
                  }`}
                >
                  {order.status}
                </span>
              </td>

              <td className="px-3 py-2 text-right">
                ${order.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}