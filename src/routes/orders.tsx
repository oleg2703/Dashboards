import { createFileRoute } from '@tanstack/react-router'
import Sidebar from '#/components/layout/Sidebar'
import Header from '#/components/layout/Header'
import type { Order } from '#/types/order'

import { useCreateOrder } from '#/components/orders/hooks/useCreateOrder'
import { useOrders } from '#/components/orders/hooks/useOrders'
import OrdersTable from '#/components/orders/OrdersTable'
import OrderModal from '#/components/orders/OrderModal'
import AddOrderModal from '#/components/orders/AddOrderModal'
import EditOrderModal from '#/components/orders/EditOrderModal'
import { useUpdateOrder } from '#/components/orders/hooks/useUpdateOrder'
import DeleteOrderModal from '#/components/orders/DeleteOrderModal'
import { useDeleteOrder } from '#/components/orders/hooks/useDeleteOrder'
import Pagination from '#/components/common/Pagination'
import TableToolbar from '#/components/common/TableToolbar'
import { useTable } from '#/hooks/useTable'
import { useCrud } from '#/hooks/useCrud'
import { useModal } from '#/hooks/useModal'
import TableSkeleton from '#/components/common/TableSkeleton'
import EmptyState from '#/components/common/EmptyState'
import ErrorState from '#/components/common/ErrorState'

export const Route = createFileRoute('/orders')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: orders = [], isLoading, isError, refetch } = useOrders()

 

 

  const createMutation = useCreateOrder()
  const updateMutation = useUpdateOrder()
  const deleteMutation = useDeleteOrder()

const table = useTable({
  data: orders,

  defaultSort: 'desc',

  searchFn: (order, search) =>
    order.id.toString().includes(search) ||
    order.customerId.toString().includes(search),

  filterFn: (order, filter) =>
    filter === 'All'
      ? true
      : order.status === filter,

  sortFn: (a, b, order) =>
    order === 'asc'
      ? a.amount - b.amount
      : b.amount - a.amount,
})
const modal = useModal<Order>()
const crud = useCrud<
  Order,
  Omit<Order, 'id'>
>({
  entityName: 'Order',

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
        <h1 className="text-2xl font-bold">Orders</h1>
     <TableToolbar
          search={table.search}
          onSearchChange={table.setSearch}
          addLabel="Add Order"
          onAdd={modal.openAdd}
          sortOrder={table.sortOrder}
          onSort={table.toggleSort}
          filterValue={table.filter}
          onFilterChange={table.setFilter}
          filterOptions={[
            'All',
            'paid',
            'pending',
            'cancelled',
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
                  <OrdersTable
                      orders={table.paginatedData}
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
        <OrderModal 
          order={modal.selected}
          onClose={modal.closeView}
        />

        {modal.isAddOpen && (
          <AddOrderModal
            onClose={modal.closeAdd}
            onAdd={crud.handleCreate}
          />
        )}

        {modal.editing && (
          <EditOrderModal
            order={modal.editing}
            onClose={modal.closeEdit}
            onSave={crud.handleUpdate}
          />
        )}

        {modal.deleting && (
          <DeleteOrderModal
            order={modal.deleting}
            onClose={modal.closeDelete}
            onDelete={crud.handleDelete}
          />
        )}
      </div>
    </main>
  )
}