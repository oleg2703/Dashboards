import { createFileRoute } from '@tanstack/react-router'
import Sidebar from '#/components/layout/Sidebar'
import { useCustomers } from '#/components/customers/hooks/useCustomers'
import CustomersTable from '#/components/customers/CustomersTable'
import Header from '#/components/layout/Header'
import { useState } from 'react'
import type { Customer } from '#/types/customer'
import AddCustomerModal from '#/components/customers/AddCustomerModal'
import CustomerModal from '#/components/customers/CustomerModal'


export const Route = createFileRoute('/customers')({
  component: RouteComponent,
})


function RouteComponent() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
const [editingCustomer, setEditingCustomer] =useState<Customer | null>(null)
const [deletingCustomer, setDeletingCustomer] =useState<Customer | null>(null)
const [isAddModalOpen, setIsAddModalOpen] =useState(false)
  
  const { data = [], isLoading, isError } = useCustomers()

  if (isLoading) return <div>Loading customers...</div>

  if (isError) return <div>Failed to load customers</div>

  return (
    <>
    <main className="flex h-screen w-full overflow-hidden">
       <Sidebar />
        <div className="w-full overflow-y-auto p-2">
    <Header />
        <h1 className="text-2xl font-bold">
      Customers
    </h1>
    <div clsassName='flex justify-end'>
          <div className="my-4">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="rounded-xl bg-blue-500 px-4 py-2 text-white">
              Add Customer
            </button>
        </div>
    </div>
          <CustomersTable customers={data}
          onView={setSelectedCustomer}
          onEdit={setEditingCustomer}
          onDelete={setDeletingCustomer}/>
        </div>
     <CustomerModal
        customer={selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
      />
    </main>
   
    </>
    
  )
}