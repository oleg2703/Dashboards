
import type { Product } from '../../types/product'
import { Button } from '../ui/Button'

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
    <div className="fixed inset-0 flex items-center justify-center  bg-black/50 z-50"onClick={onClose}>
      <div className=" w-full max-w-md rounded-2xl bg-(--card-bg) p-6" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            Product Details
          </h2>
       
        </div>

        <div className="space-y-3">
          <p><strong>Name:</strong> {product.name}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
          <p><strong>Status:</strong> {product.status}</p>
          <p><strong>Description:</strong>{' '}{product.description}</p>
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