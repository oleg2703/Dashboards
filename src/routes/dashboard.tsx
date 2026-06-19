import { createFileRoute } from '@tanstack/react-router'
import Dashboard from '../components/layout/Dashboard'
import Header from '../components/layout/Header'
import { StatCard } from '../components/dashboard/StatCard'
import RevenueChart from '../components/dashboard/RevenueChart'
import OrdersPieChart from '../components/dashboard/OrdersPieChart'
import TopProducts from '../components/dashboard/TopProducts'
import RecentOrdersTable from '../components/dashboard/RecentOrdersTable'
import { useDashboardStats } from '#/components/dashboard/hooks/useDashboardStats'

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  
  const {totalCustomers,totalProducts,totalRevenue,activeCustomers} = useDashboardStats()
  return (
    <main className="flex h-screen w-full overflow-hidden">
      <Dashboard>
        <div className="w-full overflow-y-auto p-2 ">
          <Header />

          <div className="mb-3 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>

          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-4">
           <StatCard
              title="Customers"
              value={totalCustomers}
              change={`${activeCustomers} active`}
            />

            <StatCard
              title="Products"
              value={totalProducts}
              change="In catalog"
            />

            <StatCard
              title="Revenue"
              value={`$${totalRevenue}`}
             change="Total earnings"
            />
            <StatCard
            title="Active Customers"
            value={activeCustomers}
            change={`${activeCustomers}/${totalCustomers}`}
          />
          </div>

              <div className="mt-3 rounded-2xl border border-(--border) bg-(--card-bg) p-3">
        <h2 className="mb-4 text-md font-semibold">
          Revenue Overview
        </h2>

        <RevenueChart />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-2 xl:grid-cols-2">
        <div className="rounded-2xl border border-(--border) bg-(--card-bg) p-3">
          <h2 className="mb-1 text-lg font-semibold">
            Order Status
          </h2>

          <OrdersPieChart  />
        </div>

        <div className="rounded-2xl border border-(--border) bg-(--card-bg) p-3">
          <h2 className="mb-1 text-lg font-semibold">
            Top Products
          </h2>

          <TopProducts />
        </div>
      </div>

      <div className="mt-3 rounded-2xl border border-(--border) bg-(--card-bg) p-3">
        <h2 className="mb-2 text-lg font-semibold">
          Recent Orders
        </h2>

        <RecentOrdersTable />
      </div>
        </div>
      </Dashboard>
    </main>
  )
}