import Sidebar from '#/components/layout/Sidebar'
import { createFileRoute } from '@tanstack/react-router'
import Header from '../components/layout/Header'
import ProductsTable from '#/components/products/ProductsTable'
import ErrorState from '#/components/common/ErrorState'
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
import { useModal } from '#/hooks/useModal'
import TableSkeleton from '#/components/common/TableSkeleton'
import EmptyState from '#/components/common/EmptyState'

export const Route = createFileRoute('/_authenticated/products')({
  component: RouteComponent,
})

function RouteComponent() {
const createMutation = useCreateProduct()
const updateMutation = useUpdateProduct()
const deleteMutation = useDeleteProduct()
const modal = useModal<Product>()

 const {
  data: products = [], isLoading ,isError, refetch} = useProducts()

  
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
const crud = useCrud<
  Product,
  Omit<Product, 'id'>
>({
  entityName: 'Product',

  createMutation,
  updateMutation,
  deleteMutation,

  onCreateSuccess: modal.closeAdd,
  onUpdateSuccess: modal.closeEdit,
  onDeleteSuccess: modal.closeDelete,
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
          onAdd={modal.openAdd}
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
       
         

        
          {isLoading ? (
            <TableSkeleton
              rows={5}
              columns={6}
            />
          ) : isError ? (
            <ErrorState
              title="Failed to load products"
              description="Please check your connection."
              onRetry={refetch}
            />
          ) : table.data.length === 0 ? (
            <EmptyState
              title="No products found"
              description="Try changing your search or filter."
            />
          ) : (
            <>
              <ProductsTable
                products={table.paginatedData}
                onView={modal.openView}
                onEdit={modal.openEdit}
                onDelete={modal.openDelete}
              />

              <Pagination
                currentPage={table.currentPage}
                totalPages={table.totalPages}
                onPageChange={table.setCurrentPage}
              />
            </>
          )}
      </div>
      <ProductModal
        product={modal.selected}
        onClose={modal.closeView}
      />

      <EditProductModal
        product={modal.editing}
        onClose={modal.closeEdit}
        onSave={crud.handleUpdate}
      />

      {modal.isAddOpen && (
        <AddProductModal
          onClose={modal.closeAdd}
          onAdd={crud.handleCreate}
        />
      )}

      {modal.deleting && (
      <DeleteProductModal
        product={modal.deleting}
        onClose={modal.closeDelete}
        onDelete={crud.handleDelete}
      />
    )}
    </main>
  )
}