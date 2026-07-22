import type { Order } from '#/types/order'
import { Eye, Pencil, Trash2 } from 'lucide-react'

interface OrdersTableProps {
  orders: Order[]
  onView: (order: Order) => void
  onEdit: (order: Order) => void
  onDelete: (order: Order) => void
  canManage: boolean
}

export default function OrdersTable({
  orders,
  onView,
  onEdit,
  onDelete,
  canManage,
}: OrdersTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-(--border)">
      <table className="w-full">
        <thead>
          <tr className="border-b border-(--border)">
            <th className="p-4 text-left">ID</th>
            <th className="p-4 text-left">Customer</th>
            <th className="p-4 text-left">Amount</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Date</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-(--border)">
              <td className="p-4">{order.id}</td>
              <td className="p-4">{order.customerId}</td>
              <td className="p-4">${order.amount}</td>
              <td className="p-4">{order.status}</td>
              <td className="p-4">{order.date}</td>

              <td className="p-4">
                <div className="flex gap-3">
                  <button onClick={() => onView(order)}>
                    <Eye size={18} />
                  </button>

                  {canManage && (
                    <>
                      <button onClick={() => onEdit(order)}>
                        <Pencil size={18} />
                      </button>

                      <button onClick={() => onDelete(order)}>
                        <Trash2 size={18} className="text-red-500" />
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
