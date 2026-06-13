import { useEffect, useState } from 'react'
import type { Product } from '../../types/product'

interface EditProductModalProps {
  product: Product | null
  onClose: () => void
  onSave: (product: Product) => void
}

export default function EditProductModal({
  product,
  onClose,
  onSave,
}: EditProductModalProps) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)

  useEffect(() => {
    if (product) {
      setName(product.name)
      setPrice(product.price)
      setStock(product.stock)
    }
  }, [product])

  if (!product) return null

function handleSave() {
  if (!product) return

  const updatedProduct: Product = {
    id: product.id,
    name,
    price,
    stock,
    status: product.status,
    description: product.description,
  }

  onSave(updatedProduct)
  onClose()
}


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl bg-(--card-bg) p-6" onClick={(e) => e.stopPropagation()}>
        <h2 className="mb-4 text-xl font-bold">
          Edit Product
        </h2>
        <div className="space-y-4">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)}
            placeholder="Product Name" className=" w-full rounded-xl border border-(--border) px-4 py-2"/>
          <input type="number" value={price}onChange={(e) =>setPrice(Number(e.target.value))}
            placeholder="Price" className="w-full rounded-xl border border-(--border) px-4 py-2"/>
          <input type="number" value={stock} onChange={(e) => setStock(Number(e.target.value))}
            placeholder="Stock" className=" w-full rounded-xl border border-(--border) px-4 py-2"/>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className=" rounded-xl border border-(--border) px-4 py-2">
            Cancel
          </button>
          <button onClick={handleSave} className="rounded-xl bg-blue-500 px-4 py-2 text-white">
            Save
          </button>
        </div>
      </div>
    </div>
  )
}