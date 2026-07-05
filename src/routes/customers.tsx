import { createFileRoute } from '@tanstack/react-router'
import Sidebar from '#/components/layout/Sidebar'
import { useCustomers } from '#/components/customers/hooks/useCustomers'
import CustomersTable from '#/components/customers/CustomersTable'
import Header from '#/components/layout/Header'

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
import { useCrud } from '#/hooks/useCrud'
import { useModal } from '#/hooks/useModal'
import TableSkeleton from '#/components/common/TableSkeleton'

export const Route = createFileRoute('/customers')({
  component: RouteComponent,
})


function RouteComponent() {


  
  const {data = [],isFetching} = useCustomers()
  const createMutation = useCreateCustomer()
  const updateMutation = useUpdateCustomer()
  const deleteMutation = useDeleteCustomer()
  const modal = useModal<Customer>()
const crud = useCrud<
  Customer,
  Omit<Customer, 'id'>
>({
  entityName: 'Customer',

  createMutation,
  updateMutation,
  deleteMutation,

  onCreateSuccess: modal.closeAdd,
  onUpdateSuccess: modal.closeEdit,
  onDeleteSuccess: modal.closeDelete,
})



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
          onAdd={modal.openAdd}
        />
             {isFetching ? (
              <TableSkeleton
                rows={5}
                columns={7}
              />
            ) : (
              <>
                <CustomersTable
                    customers={table.paginatedData}
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
        <CustomerModal
         customer={modal.selected}
         onClose={modal.closeView}/>
        <EditCustomerModal
        customer={modal.editing}
        onClose={modal.closeEdit}
        onSave={crud.handleUpdate}/>
        <DeleteCustomerModal
        customer={modal.deleting}
        onClose={modal.closeDelete}
        onDelete={crud.handleDelete}/>
        {modal.isAddOpen && (
        <AddCustomerModal
        onClose={modal.closeAdd} 
        onAdd={crud.handleCreate}/>
        )}
    </main>
   
    </>
    
  )
}