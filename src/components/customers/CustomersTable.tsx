import type { Customer } from '#/types/customer'
import { Eye, Pencil, Trash2 } from 'lucide-react'

interface CustomersTableProps {
  customers: Customer[]
  onView: (customer: Customer) => void
  onEdit: (customer: Customer) => void
  onDelete: (customer: Customer) => void
}

export default function CustomersTable({
  customers,
  onView,
  onEdit,
  onDelete
}: CustomersTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-(--border)">
      <table className="w-full">
        <thead>
          <tr className="border-b border-(--border)">
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Orders</th>
            <th className="p-4 text-left">Spent</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr
              key={customer.id}
              className="border-b border-(--border)"
            >
              <td className="p-4">
                {customer.name}
              </td>

              <td className="p-4">
                {customer.email}
              </td>

              <td className="p-4">
                {customer.ordersCount}
              </td>

              <td className="p-4">
                ${customer.totalSpent}
              </td>

              <td className="p-4">
                <span
                  className={`rounded-full px-3 py-1 text-sm ${
                    customer.isActive
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {customer.isActive
                    ? 'Active'
                    : 'Inactive'}
                </span>
              </td>
              <td className="p-4">
                <div className="flex gap-3">
                    <button
                    onClick={() => onView(customer)}
                    className="rounded p-1 hover:bg-(--surface-hover)"
                    >
                    <Eye size={18} />
                    </button>

                    <button
                    onClick={() => onEdit(customer)}
                    className="rounded p-1 hover:bg-(--surface-hover)"
                    >
                    <Pencil size={18} />
                    </button>

                    <button
                    onClick={() => onDelete(customer)}
                    className="rounded p-1 hover:bg-red-500/10"
                    >
                    <Trash2
                        size={18}
                        className="text-red-500"
                    />
                    </button>
                </div>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}