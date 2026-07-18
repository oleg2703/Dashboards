import type { Customer } from '#/types/customer'
import { Button } from '../ui/Button'
import { Modal } from '../ui/Modal'

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
    <Modal
      title="Customer Details"
      onClose={onClose}
      footer={
        <Button
          onClick={onClose}
          className="mt-6 w-full cursor-pointer"
          variant="outline"
        >
          Close
        </Button>
      }
    >
      <div className="space-y-3">
        <div>
          <span className="font-semibold">Name:</span> {customer.name}
        </div>

        <div>
          <span className="font-semibold">Email:</span> {customer.email}
        </div>

        <div>
          <span className="font-semibold">Orders:</span> {customer.ordersCount}
        </div>

        <div>
          <span className="font-semibold">Total Spent:</span> $
          {customer.totalSpent}
        </div>

        <div>
          <span className="font-semibold">Status:</span>{' '}
          <span
            className={`rounded-full px-2 py-1 text-sm ${
              customer.isActive
                ? 'bg-green-500/20 text-green-400'
                : 'bg-red-500/20 text-red-400'
            }`}
          >
            {customer.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>

        <div>
          <span className="font-semibold">Created:</span> {customer.createdAt}
        </div>
      </div>
    </Modal>
  )
}
