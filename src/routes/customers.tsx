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
import Pagination from '#/components/common/Pagination'
import TableToolbar from '#/components/common/TableToolbar'
import { useTable } from '#/hooks/useTable'
import { toast } from 'react-toastify'

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




const handleAddCustomer = (customer: any) => {
    createCustomer.mutate(customer, {
    onSuccess: () => {
      toast.success('Customer created successfully')
      setIsAddModalOpen(false)
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message || 'Failed to create customer'
      toast.error(msg)
    }
  })
  }

  const handleSaveCustomer = (customer: Customer) => {
   updateCustomer.mutate(customer, {
    onSuccess: () => {
      toast.success('Customer update successfully')
      setEditingCustomer(null)
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message || 'Failed to update customer'
      toast.error(msg)
    }
  })
  }
    const handleDeleteCustomer = (id: number) => {
   deleteCustomer.mutate(id, {
    onSuccess: () => {
      toast.success('Customer delete successfully')
     setDeletingCustomer(null)
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message || 'Failed to delete customer'
      toast.error(msg)
    }
  })
  }
const table = useTable({
  data,

  searchFn: (customer, search) =>
    customer.name
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    customer.email
      .toLowerCase()
      .includes(search.toLowerCase()),
})

  return (
    <>
    <main className="flex h-screen w-full overflow-hidden">
       <Sidebar />
        <div className="w-full overflow-y-auto p-2">
    <Header />
        <h1 className="text-2xl font-bold">
      Customers
    </h1>
          <TableToolbar
          search={table.search}
          onSearchChange={table.setSearch}
          addLabel="Add Customer"
          onAdd={() => setIsAddModalOpen(true)}
        />
              {isFetching && (
          <div className="mb-2 text-sm text-gray-500">
            Updating...
          </div>
        )}
           <CustomersTable
         customers={table.paginatedData}
          onView={setSelectedCustomer}
          onEdit={setEditingCustomer}
          onDelete={setDeletingCustomer}
        />
       <Pagination
          currentPage={table.currentPage}
          totalPages={table.totalPages}
          onPageChange={table.setCurrentPage}
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