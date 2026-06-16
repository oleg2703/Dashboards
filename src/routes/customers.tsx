import { createFileRoute } from '@tanstack/react-router'
import Sidebar from '#/components/layout/Sidebar'
import { useCustomers } from '#/components/customers/hooks/useCustomers'
import CustomersTable from '#/components/customers/CustomersTable'
import Header from '#/components/layout/Header'
import { useState } from 'react'
import type { Customer } from '#/types/customer'


const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
const [editingCustomer, setEditingCustomer] =useState<Customer | null>(null)
const [deletingCustomer, setDeletingCustomer] =useState<Customer | null>(null)
export const Route = createFileRoute('/customers')({
  component: RouteComponent,
})


function RouteComponent() {
  
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

    <CustomersTable customers={data}
     onView={setSelectedCustomer}
     onEdit={setEditingCustomer}
     onDelete={setDeletingCustomer}/>
        </div>
     
    </main>
   
    </>
    
  )
}