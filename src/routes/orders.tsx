import { createFileRoute } from '@tanstack/react-router'
import Sidebar from '#/components/layout/Sidebar'
import Header from '#/components/layout/Header'
import { useEffect, useState } from 'react'
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
import { Search } from 'lucide-react'
import Pagination from '#/components/common/Pagination'

export const Route = createFileRoute('/orders')({
  component: RouteComponent,
})

function RouteComponent() {
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useOrders()
const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
const [editingOrder, setEditingOrder] = useState<Order | null>(null)
const [deletingOrder, setDeletingOrder] = useState<Order | null>(null)
const [isAddModalOpen, setIsAddModalOpen] = useState(false)
const [statusFilter, setStatusFilter] = useState('All')
const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
const [currentPage, setCurrentPage] = useState(1)
const itemsPerPage = 5
const createOrder = useCreateOrder()
const updateOrder = useUpdateOrder()
const deleteOrder = useDeleteOrder()
const [search, setSearch] = useState('')


useEffect(() => {
  setCurrentPage(1)
}, [search])
const filteredOrders = orders
  .filter(
    (order) =>
      order.id
        .toString()
        .includes(search) ||
      order.customerId
        .toString()
        .includes(search) ||
      order.status
        .toLowerCase()
        .includes(search.toLowerCase())
  )
      const totalPages = Math.max(
      1,
      Math.ceil(
        filteredOrders.length /
          itemsPerPage
      )
    )

    const startIndex =
      (currentPage - 1) * itemsPerPage

    const endIndex =
      startIndex + itemsPerPage

    const paginatedOrders =
      filteredOrders.slice(
        startIndex,
        endIndex
      )
  
  .filter((order) =>
    statusFilter === 'All'
      ? true
      : order.status === statusFilter
  )
   
  const sortedOrders = [...filteredOrders].sort(
  (a, b) =>
    sortOrder === 'asc'
      ? a.amount - b.amount
      : b.amount - a.amount
)
const handleAddOrder = (
  order: Omit<Order, 'id'>
) => {
  createOrder.mutate(order)
  setIsAddModalOpen(false)
}
const handleSaveOrder = (
  order: Order
) => {
  updateOrder.mutate(order)
  setEditingOrder(null)
}
const handleDeleteOrder = (
  id: number
) => {
  deleteOrder.mutate(id)
  setDeletingOrder(null)
}

  return (
    <main className="flex h-screen w-full overflow-hidden">
      <Sidebar />

      <div className="w-full overflow-y-auto p-2">
        <Header />
         <h1 className="text-2xl font-bold">
          Orders
        </h1>
       <div className="my-4 flex items-center gap-4">
          <button onClick={() => setIsAddModalOpen(true)}
            className="rounded-xl bg-blue-500 px-4 py-2 text-white">
            Add Order
          </button>
          <button onClick={() => setSortOrder( sortOrder === 'asc' ? 'desc' : 'asc')}
          className="rounded-xl border border-(--border) bg-(--card-bg) px-4 py-2">
          {sortOrder === 'asc'? '↑ Amount': '↓ Amount'}
        </button>
          <div className="flex items-center gap-2 rounded-xl border border-(--border) bg-(--card-bg) px-3">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent py-2 outline-none"
            />
          </div>
          <select value={statusFilter} onChange={(e) =>setStatusFilter(e.target.value)}
            className="rounded-xl border border-(--border) bg-(--card-bg) px-4 py-2">
            <option value="All">All Orders</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

       

        {isLoading && (
          <div>Loading orders...</div>
        )}

        {isError && (
          <div>Failed to load orders</div>
        )}

        <OrdersTable
        orders={paginatedOrders}
        onView={setSelectedOrder}
        onEdit={setEditingOrder}
        onDelete={setDeletingOrder}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
            <OrderModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
            {
        isAddModalOpen && (
          <AddOrderModal
            onClose={() =>
              setIsAddModalOpen(false)
            }
            onAdd={handleAddOrder}
          />
        )
      }
      <EditOrderModal
        order={editingOrder}
        onClose={() =>
          setEditingOrder(null)
        }
        onSave={handleSaveOrder}
      />
      <DeleteOrderModal
        order={deletingOrder}
        onClose={() =>
          setDeletingOrder(null)
        }
        onDelete={handleDeleteOrder}
      />
      </div>
    </main>
  )
}