import type { Customer } from '#/types/customer'
import { Button } from '../ui/Button'

interface CustomerModalProps {
  customer: Customer | null
  onClose: () => void
}

export default function CustomerModal({
  customer,
  onClose,
}: CustomerModalProps) {
  if (!customer) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-2xl bg-(--card-bg) p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            Customer Details
          </h2>

          <button
            onClick={onClose}
            className="text-xl"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <span className="font-semibold">
              Name:
            </span>{' '}
            {customer.name}
          </div>

          <div>
            <span className="font-semibold">
              Email:
            </span>{' '}
            {customer.email}
          </div>

          <div>
            <span className="font-semibold">
              Orders:
            </span>{' '}
            {customer.ordersCount}
          </div>

          <div>
            <span className="font-semibold">
              Total Spent:
            </span>{' '}
            ${customer.totalSpent}
          </div>

          <div>
            <span className="font-semibold">
              Status:
            </span>{' '}
            <span
              className={`rounded-full px-2 py-1 text-sm ${
                customer.isActive
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-red-500/20 text-red-400'
              }`}
            >
              {customer.isActive
                ? 'Active'
                : 'Inactive'}
            </span>
          </div>

          <div>
            <span className="font-semibold">
              Created:
            </span>{' '}
            {customer.createdAt}
          </div>
        </div>

      <Button
          onClick={onClose}
          className="mt-6 w-full cursor-pointer"
          variant="outline"
        >
          Close
        </Button>
      </div>
    </div>
  )
}