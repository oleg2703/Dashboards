import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from "@tanstack/react-query"
import { customersApi } from "../api/customers.api"
import type { Customer } from '#/types/customer'
import Sidebar from '#/components/layout/Sidebar'

export const useCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: customersApi.getAll,
  })
}

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
      <div>
        <h1>Customers</h1>
        <ul>
          {data.map((customer: Customer) => (
            <ul key={customer.id}>
              <li>{customer.name} - {customer.email}</li>
              <li>{customer.totalSpent}</li>
              <li>{customer.ordersCount}</li>
              
            </ul>
          
          ))}
        </ul>
    </div>
    </main>
   
    </>
    
  )
}