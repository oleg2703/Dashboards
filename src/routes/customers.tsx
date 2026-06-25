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
import { Search } from 'lucide-react'
import Pagination from '#/components/common/Pagination'

export const Route = createFileRoute('/customers')({
  component: RouteComponent,
})


function RouteComponent() {
const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
const [editingCustomer, setEditingCustomer] =useState<Customer | null>(null)
const [deletingCustomer, setDeletingCustomer] =useState<Customer | null>(null)
const [isAddModalOpen, setIsAddModalOpen] =useState(false)
const [search, setSearch] = useState('')
const [currentPage, setCurrentPage] = useState(1)
const itemsPerPage = 5
  
  const {data = [],isFetching} = useCustomers()
  const createCustomer = useCreateCustomer()
  const updateCustomer = useUpdateCustomer()
  const deleteCustomer = useDeleteCustomer()


  
  const filteredCustomers = data.filter(
  (customer) =>
    customer.name
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    customer.email
      .toLowerCase()
      .includes(search.toLowerCase())
)
const totalPages = Math.max(
  1,
  Math.ceil(
    filteredCustomers.length /
      itemsPerPage
  )
)

const paginatedCustomers =
  filteredCustomers.slice(
    (currentPage - 1) *
      itemsPerPage,
    currentPage * itemsPerPage
  )
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
   <div className="my-4 flex items-center gap-4">
  <div className="flex items-center gap-2 rounded-xl border border-(--border) bg-(--card-bg) px-3">
    <Search size={18} />

    <input
      type="text"
      placeholder="Search customers..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      className="bg-transparent py-2 outline-none"
    />
  </div>

  <button
    onClick={() => setIsAddModalOpen(true)}
    className="rounded-xl bg-blue-500 px-4 py-2 text-white"
  >
    Add Customer
  </button>
</div>
         {isFetching && (
          <div className="mb-2 text-sm text-gray-500">
            Updating...
          </div>
        )}
           <CustomersTable
          customers={paginatedCustomers}
          onView={setSelectedCustomer}
          onEdit={setEditingCustomer}
          onDelete={setDeletingCustomer}
        />
        <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
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