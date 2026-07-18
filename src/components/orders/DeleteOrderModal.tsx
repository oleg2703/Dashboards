import type { Order } from '#/types/order'
import { Button } from '../ui/Button'
import { Modal } from '../ui/Modal'

interface DeleteOrderModalProps {
  order: Order | null
  onClose: () => void
  onDelete: (id: number) => void
}

export default function DeleteOrderModal({
  order,
  onClose,
  onDelete,
}: DeleteOrderModalProps) {
  if (!order) return null

  return (
    <Modal
      title="Delete Order"
      onClose={onClose}
      footer={
        <>
          <button onClick={onClose} className="rounded-xl border px-4 py-2">
            Cancel
          </button>

          <Button onClick={() => onDelete(order.id)} variant="danger">
            Delete
          </Button>
        </>
      }
    >
      <p>Are you sure you want to delete order #{order.id}?</p>
    </Modal>
  )
}
