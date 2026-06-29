import { createFileRoute } from '@tanstack/react-router'
import Sidebar from '#/components/layout/Sidebar'
import Header from '#/components/layout/Header'
import { useState } from 'react'
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
import { toast } from 'react-toastify'
import TableToolbar from '#/components/common/TableToolbar'
import { useTable } from '#/hooks/useTable'
import { useCrud } from '#/hooks/useCrud'

export const Route = createFileRoute('/orders')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: orders = [], isLoading, isError } = useOrders()

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [editingOrder, setEditingOrder] = useState<Order | null>(null)
  const [deletingOrder, setDeletingOrder] = useState<Order | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

 

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

const crud = useCrud<
  Order,
  Omit<Order, 'id'>
>({
  entityName: 'Order',

  createMutation,
  updateMutation,
  deleteMutation,

  onCreateSuccess: () => setIsAddModalOpen(false),
  onUpdateSuccess: () => setEditingOrder(null),
  onDeleteSuccess: () => setDeletingOrder(null),
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
          onAdd={() => setIsAddModalOpen(true)}
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

        {isLoading && <div>Loading orders...</div>}
        {isError && <div>Failed to load orders</div>}

        <OrdersTable
          orders={table.paginatedData}
          onView={setSelectedOrder}
          onEdit={setEditingOrder}
          onDelete={setDeletingOrder}
        />
        
        <Pagination
          currentPage={table.currentPage}
          totalPages={table.totalPages}
          onPageChange={table.setCurrentPage}
        />

        <OrderModal 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
        />

        {isAddModalOpen && (
          <AddOrderModal
            onClose={() => setIsAddModalOpen(false)}
            onAdd={crud.handleCreate}
          />
        )}

        {editingOrder && (
          <EditOrderModal
            order={editingOrder}
            onClose={() => setEditingOrder(null)}
            onSave={crud.handleUpdate}
          />
        )}

        {deletingOrder && (
          <DeleteOrderModal
            order={deletingOrder}
            onClose={() => setDeletingOrder(null)}
            onDelete={crud.handleDelete}
          />
        )}
      </div>
    </main>
  )
}