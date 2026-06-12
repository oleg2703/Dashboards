import type { Product } from '../../types/product'

interface ProductsTableProps {
  products: Product[]
}

export default function ProductsTable({
  products,
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}