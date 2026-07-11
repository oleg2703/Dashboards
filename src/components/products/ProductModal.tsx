
import type { Product } from '../../types/product'
import { Button } from '../ui/Button'
import { Modal } from '../ui/Modal'

interface ProductModalProps {
  product: Product | null
  onClose: () => void
  onEdit?: (product: Product) => void
}

export default function ProductModal({
  product,
  onClose,

}: ProductModalProps) {
  if (!product) return null

  return (
    <Modal 
      title="Product Details"
      onClose={onClose}
      footer={<Button
          onClick={onClose}
          className="mt-6 w-full cursor-pointer"
          variant="outline"
        >
          Close
        </Button> }
      >
    
        <div className="space-y-3">
          <p><strong>Name:</strong> {product.name}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
          <p><strong>Status:</strong> {product.status}</p>
          <p><strong>Description:</strong>{' '}{product.description}</p>
        </div>
    </Modal>
  )
}