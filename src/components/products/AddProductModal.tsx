import { useState } from 'react'
import type { Product } from '../../types/product'

interface AddProductModalProps {
  onClose: () => void
  onAdd: (product: Product) => void
}

export default function AddProductModal({
  onClose,
  onAdd,
}: AddProductModalProps) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)

  function handleAdd() {
    const newProduct: Product = {
      id: Date.now(),
      name,
      price,
      stock,
      status: stock > 5 ? 'Active' : 'Low Stock',
      description: '',
    }

    onAdd(newProduct)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-(--card-bg) p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-xl font-bold">
          Add Product
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-(--border) px-4 py-2"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) =>
              setPrice(Number(e.target.value))
            }
            className="w-full rounded-xl border border-(--border) px-4 py-2"
          />

          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) =>
              setStock(Number(e.target.value))
            }
            className="w-full rounded-xl border border-(--border) px-4 py-2"
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border border-(--border) px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={handleAdd}
            className="rounded-xl bg-blue-500 px-4 py-2 text-white"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  )
}