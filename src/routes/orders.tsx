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
const createOrder = useCreateOrder()
const updateOrder = useUpdateOrder()
const deleteOrder = useDeleteOrder()

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
        <button onClick={() =>setIsAddModalOpen(true)}
          className="rounded-xl bg-blue-500 px-4 py-2 text-white"> Add Order
        </button>
        <h1 className="text-2xl font-bold">
          Orders
        </h1>

        {isLoading && (
          <div>Loading orders...</div>
        )}

        {isError && (
          <div>Failed to load orders</div>
        )}

      <OrdersTable
        orders={orders}
        onView={setSelectedOrder}
        onEdit={setEditingOrder}
        onDelete={setDeletingOrder}
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