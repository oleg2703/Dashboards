import type { Order } from '#/types/order'
import { Button } from '../ui/Button'

interface OrderModalProps {
  order: Order | null
  onClose: () => void
}

export default function OrderModal({
  order,
  onClose,
}: OrderModalProps) {
  if (!order) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-2xl bg-(--card-bg) p-6">
        <h2 className="mb-4 text-xl font-bold">
          Order Details
        </h2>

        <div className="space-y-3">
          <p>
            <strong>ID:</strong> {order.id}
          </p>

          <p>
            <strong>Customer ID:</strong>{' '}
            {order.customerId}
          </p>

          <p>
            <strong>Amount:</strong> $
            {order.amount}
          </p>

          <p>
            <strong>Status:</strong>{' '}
            {order.status}
          </p>

          <p>
            <strong>Date:</strong> {order.date}
          </p>
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