import Sidebar from '#/components/layout/Sidebar'
import { createFileRoute } from '@tanstack/react-router'
import Header from '../components/layout/Header'
import ProductsTable from '#/components/products/ProductsTable'
import { products } from '#/date/products'
import { useState } from 'react'
import type { Product } from '#/types/product'
import ProductModal from '#/components/products/ProductModal'
import EditProductModal from '#/components/products/EditProductModal'
import AddProductModal from '#/components/products/AddProductModal'
import DeleteProductModal from '#/components/products/DeleteProductModal'
import { Search } from 'lucide-react'

export const Route = createFileRoute('/products')({
  component: RouteComponent,
})

function RouteComponent() {
   const [search, setSearch] = useState('')
   const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
   const [statusFilter, setStatusFilter] = useState('All')
   const [selectedProduct, setSelectedProduct] =useState<Product | null>(null)
   const [editingProduct, setEditingProduct] = useState<Product | null>(null)
   const [productsState, setProductsState] = useState(products)
   const [isAddModalOpen, setIsAddModalOpen] = useState(false)
   const [deletingProduct, setDeletingProduct] =useState<Product | null>(null)
  

const filteredProducts = productsState
  .filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  )
  .filter((product) =>
    statusFilter === 'All'
      ? true
      : product.status === statusFilter
  )
  const handleAddProduct = (
  newProduct: Product
) => {
  setProductsState((prev) => [
    ...prev,
    newProduct,
  ])
}
const handleDeleteProduct = (
  id: number
) => {
  setProductsState((prev) =>
    prev.filter(
      (product) => product.id !== id
    )
  )
}

const sortedProducts = [...filteredProducts].sort((a, b) =>
  sortOrder === 'asc'
    ? a.price - b.price
    : b.price - a.price
)
const handleSaveProduct = (
  updatedProduct: Product
) => {
  setProductsState((prev) =>
    prev.map((product) =>
      product.id === updatedProduct.id
        ? updatedProduct
        : product
    )
  )
}

  return (<>
  
  <main className="flex h-screen w-full overflow-hidden">
    <Sidebar />
    <div className="w-full overflow-y-auto p-2 ">
      <Header />
      <h1 className="text-2xl font-bold">Products</h1>
      <div className="my-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-xl border border-(--border) bg-(--card-bg) px-3">
          <Search size={18} />
          <input type="text" placeholder="Search products..."  value={search}
            onChange={(e) => setSearch(e.target.value)} className="bg-transparent py-2 outline-none"/>
        </div>
         <button onClick={() => setIsAddModalOpen(true)}
          className="rounded-xl bg-blue-500 px-4 py-2 text-white">Add Product
        </button>
        <button onClick={() =>setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
         className=" rounded-xl border border-(--border) bg-(--card-bg) px-4 py-2 ">{sortOrder === 'asc' ? '↑' : '↓'}
        </button>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          className=" rounded-xl border border-(--border) bg-(--card-bg) px-4 py-2">
          <option value="All">All Products</option>
          <option value="Active">Active</option>
          <option value="Low Stock">Low Stock</option>
        </select>
      </div>
      
      
      </div>
      <ProductsTable
        products={sortedProducts}
        onView={setSelectedProduct}
        onEdit={setEditingProduct}
        onDelete={setDeletingProduct}
      />
     
    </div>
     <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
      <EditProductModal
        product={editingProduct}
        onClose={() => setEditingProduct(null)}
        onSave={handleSaveProduct}
      />
        {
        isAddModalOpen && (
          <AddProductModal
            onClose={() => setIsAddModalOpen(false)}
            onAdd={handleAddProduct}
          />
        )
      }
            {
        deletingProduct && (
          <DeleteProductModal
            product={deletingProduct}
            onClose={() =>
              setDeletingProduct(null)
            }
            onDelete={handleDeleteProduct}
          />
        )
      }
      
  </main>
  
  </>)
}
