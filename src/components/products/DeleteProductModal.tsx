import type { Product } from '../../types/product'
import { Button } from '../ui/Button'
import { Modal } from '../ui/Modal'

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
    <Modal 
      title="Delete Product"
      onClose={onClose}
      footer={  <>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button onClick={() => {onDelete(product.id) 
            onClose()}} variant="danger">
              Delete
          </Button>
        </>}
    >
      
        <p className="mb-6 text-(--text-secondary)">
          Are you sure you want to delete
          <strong> {product.name}</strong>?
        </p>

    </Modal>
  )
}