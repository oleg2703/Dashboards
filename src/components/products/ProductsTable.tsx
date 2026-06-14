import { Eye, Pencil, Trash2 } from 'lucide-react'
import type { Product } from '../../types/product'

interface ProductsTableProps {
  products: Product[]
  onView: (product: Product) => void
  onEdit: (product: Product) => void
  onDelete: (product: Product) => void
}

export default function ProductsTable({
  products,
  onView,
  onEdit,
  onDelete
}: ProductsTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-(--border)">
      <table className="w-full">
        <thead>
          <tr className="border-b border-(--border)">
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Price</th>
            <th className="p-4 text-left">Stock</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-b border-(--border)"
            >
              <td className="p-4">{product.name}</td>
              <td className="p-4">${product.price}</td>
              <td className="p-4">{product.stock}</td>

              <td className="p-4">
                <span
                  className={`rounded-full px-3 py-1 text-sm ${
                    product.status === 'Active'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}
                >
                  {product.status}
                </span>
              </td>
             <td className="p-4">
                <div className="flex gap-3">
                  <div onClick={() => onView(product)}
                    className="rounded p-1 hover:bg-(--surface-hover)">
                    <Eye size={18} />
                  </div>
                  <div className="rounded p-1 hover:bg-(--surface-hover)">
                    <button onClick={() => onEdit(product)}>
                     <Pencil size={18} />
                    </button>
                  </div>
                  <div className="rounded p-1 hover:bg-red-500/10">
                    <button onClick={() => onDelete(product)}>
                      <Trash2 size={18} className="cursor-pointer text-red-500"/>
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}