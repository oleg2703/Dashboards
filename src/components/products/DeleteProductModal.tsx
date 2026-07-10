import type { Product } from '../../types/product'
import { Button } from '../ui/Button'

interface DeleteProductModalProps {
  product: Product | null
  onClose: () => void
  onDelete: (id: number) => void
}

export default function DeleteProductModal({
  product,
  onClose,
  onDelete,
}: DeleteProductModalProps) {
  if (!product) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl bg-(--card-bg) p-6"
        onClick={(e) => e.stopPropagation()}>
        <h2 className="mb-4 text-xl font-bold">
          Delete Product
        </h2>

        <p className="mb-6 text-(--text-secondary)">
          Are you sure you want to delete
          <strong> {product.name}</strong>?
        </p>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className=" rounded-xl border border-(--border) px-4 py-2">
            Cancel
          </button>
          <Button onClick={() => {onDelete(product.id) 
            onClose()}} variant="danger">
              Delete
          </Button>
        </div>
      </div>
    </div>
  )
}