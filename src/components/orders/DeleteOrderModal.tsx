import type { Order } from '#/types/order'

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
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-2xl bg-(--card-bg) p-6">
        <h2 className="mb-4 text-xl font-bold">
          Delete Order
        </h2>

        <p>
          Are you sure you want to delete order
          #{order.id}?
        </p>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-xl border px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={() =>
              onDelete(order.id)
            }
            className="rounded-xl bg-red-500 px-4 py-2 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}