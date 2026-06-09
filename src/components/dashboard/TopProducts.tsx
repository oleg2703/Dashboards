const products = [
  {
    name: 'Pizza Margherita',
    sales: 124,
  },
  {
    name: 'Classic Burger',
    sales: 98,
  },
  {
    name: 'Caesar Salad',
    sales: 76,
  },
  {
    name: 'Carbonara Pasta',
    sales: 64,
  },
]

export default function TopProducts() {
  return (
    <div className="space-y-2">
      {products.map((product) => (
        <div
          key={product.name}
          className="flex items-center justify-between "
        >
          <span className="font-medium">
            {product.name}
          </span>

          <span className="text-sm text-(--text-secondary)">
            {product.sales} sales
          </span>
        </div>
      ))}
    </div>
  )
}