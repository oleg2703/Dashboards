import Sidebar from '#/components/layout/Sidebar'
import { createFileRoute } from '@tanstack/react-router'
import Header from '../components/layout/Header'
import ProductsTable from '#/components/products/ProductsTable'
import { products } from '#/date/products'
import { useState } from 'react'

export const Route = createFileRoute('/products')({
  component: RouteComponent,
})

function RouteComponent() {
   const [search, setSearch] = useState('')
   const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
   const [statusFilter, setStatusFilter] = useState('All')

const filteredProducts = products
  .filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  )
  .filter((product) =>
    statusFilter === 'All'
      ? true
      : product.status === statusFilter
  )

const sortedProducts = [...filteredProducts].sort((a, b) =>
  sortOrder === 'asc'
    ? a.price - b.price
    : b.price - a.price
)

  return (<>
  
  <main className="flex h-screen w-full overflow-hidden">
    <Sidebar />
    <div className="w-full overflow-y-auto p-2 ">
      <Header />
      <h1 className="text-2xl font-bold">Products</h1>
       <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            rounded-xl
            border
            border-(--border)
            bg-(--card-bg)
            px-4
            py-2
            outline-none
          "
        />
        <button
    onClick={() =>
      setSortOrder(
        sortOrder === 'asc' ? 'desc' : 'asc'
      )
    }
    className="
      rounded-xl
      border
      border-(--border)
      bg-(--card-bg)
      px-4
      py-2
    "
  >
     {sortOrder === 'asc' ? '↑' : '↓'}
  </button>
  <select
  value={statusFilter}
  onChange={(e) => setStatusFilter(e.target.value)}
  className="
    rounded-xl
    border
    border-(--border)
    bg-(--card-bg)
    px-4
    py-2
  "
>
  <option value="All">All Products</option>
  <option value="Active">Active</option>
  <option value="Low Stock">Low Stock</option>
</select>
      <ProductsTable products={sortedProducts} />
    </div>
  </main>
  </>)
}
