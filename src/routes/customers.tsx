import { createFileRoute } from '@tanstack/react-router'
import Sidebar from '#/components/layout/Sidebar'
import { useCustomers } from '#/components/customers/hooks/useCustomers'
import CustomersTable from '#/components/customers/CustomersTable'
import Header from '#/components/layout/Header'
import { useState } from 'react'
import type { Customer } from '#/types/customer'
import AddCustomerModal from '#/components/customers/AddCustomerModal'
import CustomerModal from '#/components/customers/CustomerModal'
import { useCreateCustomer } from '#/components/customers/hooks/useCreateCustomer'
import EditCustomerModal from '#/components/customers/EditCustomerModal'
import { useUpdateCustomer } from '#/components/customers/hooks/useUpdateCustomer'
import DeleteCustomerModal from '#/components/customers/DeleteCustomerModal'
import { useDeleteCustomer } from '#/components/customers/hooks/useDeleteCustomer'

export const Route = createFileRoute('/customers')({
  component: RouteComponent,
})


function RouteComponent() {
const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
const [editingCustomer, setEditingCustomer] =useState<Customer | null>(null)
const [deletingCustomer, setDeletingCustomer] =useState<Customer | null>(null)
const [isAddModalOpen, setIsAddModalOpen] =useState(false)
  
  const {data = [],isFetching} = useCustomers()
  const createCustomer = useCreateCustomer()
  const updateCustomer = useUpdateCustomer()
  const deleteCustomer = useDeleteCustomer()

  const handleAddCustomer = (
  customer: any
) => {
  createCustomer.mutate(customer)
}
const handleSaveCustomer = (
  customer: Customer
) => {
  updateCustomer.mutate(customer)
  setEditingCustomer(null)
}
const handleDeleteCustomer = (
  id: number
) => {
  deleteCustomer.mutate(id)
  setDeletingCustomer(null)
}

  return (
    <>
    <main className="flex h-screen w-full overflow-hidden">
       <Sidebar />
        <div className="w-full overflow-y-auto p-2">
    <Header />
        <h1 className="text-2xl font-bold">
      Customers
    </h1>
    <div className='flex justify-left gap-3'>
          <div className="my-4">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="rounded-xl bg-blue-500 px-4 py-2 text-white">
              Add Customer
            </button>
        </div>
    </div>
         {isFetching && (
          <div className="mb-2 text-sm text-gray-500">
            Updating...
          </div>
        )}
            <CustomersTable
              customers={data}
              onView={setSelectedCustomer}
              onEdit={setEditingCustomer}
              onDelete={setDeletingCustomer}
            />
        
        </div>
        <CustomerModal
         customer={selectedCustomer}
         onClose={() => setSelectedCustomer(null)}/>
        <EditCustomerModal
        customer={editingCustomer}
        onClose={() =>setEditingCustomer(null)}
        onSave={handleSaveCustomer}/>
        <DeleteCustomerModal
        customer={deletingCustomer}
        onClose={() =>setDeletingCustomer(null)}
        onDelete={handleDeleteCustomer}/>
        {
        isAddModalOpen && (
        <AddCustomerModal
        onClose={() =>setIsAddModalOpen(false)}onAdd={handleAddCustomer}/>
        )}
    </main>
   
    </>
    
  )
}