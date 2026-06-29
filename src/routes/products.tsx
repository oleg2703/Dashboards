import Sidebar from '#/components/layout/Sidebar'
import { createFileRoute } from '@tanstack/react-router'
import Header from '../components/layout/Header'
import ProductsTable from '#/components/products/ProductsTable'
import { useState } from 'react'
import type { Product } from '#/types/product'
import ProductModal from '#/components/products/ProductModal'
import EditProductModal from '#/components/products/EditProductModal'
import AddProductModal from '#/components/products/AddProductModal'
import DeleteProductModal from '#/components/products/DeleteProductModal'
import Pagination from '#/components/common/Pagination'

import { useProducts } from '#/components/products/hooks/useProducts'
import TableToolbar from '#/components/common/TableToolbar'
import { useTable } from '#/hooks/useTable'
import { useCrud } from '#/hooks/useCrud'
import { useCreateProduct } from '#/components/products/hooks/useCreateProduct'
import { useDeleteProduct } from '#/components/products/hooks/useDeleteProduct'
import { useUpdateProduct } from '#/components/products/hooks/useUpdateProduct'

export const Route = createFileRoute('/products')({
  component: RouteComponent,
})

function RouteComponent() {
const createMutation = useCreateProduct()
const updateMutation = useUpdateProduct()
const deleteMutation = useDeleteProduct()

const crud = useCrud<Product>({
  entityName: 'Product',

  createMutation,
  updateMutation,
  deleteMutation,

  onCreateSuccess: () => setIsAddModalOpen(false),
  onUpdateSuccess: () => setEditingProduct(null),
  onDeleteSuccess: () => setDeletingProduct(null),
})

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null)

  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null)

  const [deletingProduct, setDeletingProduct] =
    useState<Product | null>(null)

  const [isAddModalOpen, setIsAddModalOpen] =
    useState(false)

 const {
  data: products = [], isLoading} = useProducts()

  
 const table = useTable({
  data: products,

  defaultSort: 'asc',

  searchFn: (product, search) =>
    product.name
      .toLowerCase()
      .includes(search.toLowerCase()),

  filterFn: (product, filter) =>
    filter === 'All'
      ? true
      : product.status === filter,

  sortFn: (a, b, order) =>
    order === 'asc'
      ? a.price - b.price
      : b.price - a.price,
})


  
  return (
    <main className="flex h-screen w-full overflow-hidden">
      <Sidebar />

      <div className="w-full overflow-y-auto p-2">
        <Header />

        <h1 className="text-2xl font-bold">
          Products
        </h1>
        <TableToolbar
          search={table.search}
          onSearchChange={table.setSearch}
          addLabel="Add Product"
          onAdd={() => setIsAddModalOpen(true)}
          sortOrder={table.sortOrder}
          onSort={() =>
            table.setSortOrder(
              table.sortOrder === 'asc'
                ? 'desc'
                : 'asc'
            )
          }
          filterValue={table.filter}
          onFilterChange={table.setFilter}
          filterOptions={[
            'All',
            'Active',
            'Low Stock',
          ]}
        />
       
            {isLoading && (
          <div>Loading product...</div>
        )}

        

        <ProductsTable
          products={table.paginatedData}
          onView={setSelectedProduct}
          onEdit={setEditingProduct}
          onDelete={setDeletingProduct}
        />
       <Pagination
          currentPage={table.currentPage}
          totalPages={table.totalPages}
          onPageChange={
            table.setCurrentPage
          }
      />
      </div>
      <ProductModal
        product={selectedProduct}
        onClose={() =>
          setSelectedProduct(null)
        }
      />

      <EditProductModal
        product={editingProduct}
        onClose={() =>
          setEditingProduct(null)
        }
        onSave={crud.handleUpdate}
      />

      {isAddModalOpen && (
        <AddProductModal
          onClose={() =>
            setIsAddModalOpen(false)
          }
          onAdd={crud.handleCreate}
        />
      )}

      {deletingProduct && (
        <DeleteProductModal
          product={deletingProduct}
          onClose={() =>
            setDeletingProduct(null)
          }
          onDelete={crud.handleDelete}
        />
      )}
    </main>
  )
}