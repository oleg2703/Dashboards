import type { Order } from '#/types/order'
import { Button } from '../ui/Button'
import { Modal } from '../ui/Modal'

interface OrderModalProps {
  order: Order | null
  onClose: () => void
}

export default function OrderModal({ order, onClose }: OrderModalProps) {
  if (!order) return null

  return (
    <Modal
      title="Order Details"
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
        <p>
          <strong>ID:</strong> {order.id}
        </p>

        <p>
          <strong>Customer ID:</strong> {order.customerId}
        </p>

        <p>
          <strong>Amount:</strong> ${order.amount}
        </p>

        <p>
          <strong>Status:</strong> {order.status}
        </p>

        <p>
          <strong>Date:</strong> {order.date}
        </p>

        {order.items && order.items.length > 0 && (
          <div>
            <strong>Items:</strong>
            <ul className="mt-2 space-y-1">
              {order.items.map((item) => (
                <li key={item.productId}>
                  Product #{item.productId} × {item.quantity} — $
                  {item.priceAtOrderTime.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Modal>
  )
}
