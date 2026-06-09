import { createFileRoute } from '@tanstack/react-router'
import Dashboard from '../components/layout/Dashboard'
import Header from '../components/layout/Header'
import { StatCard } from '../components/dashboard/StatCard'
import RevenueChart from '../components/dashboard/RevenueChart'
import OrdersPieChart from '../components/dashboard/OrdersPieChart'
import TopProducts from '../components/dashboard/TopProducts'
import RecentOrdersTable from '../components/dashboard/RecentOrdersTable'

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  return (
    <main className="flex h-screen w-full">
      <Dashboard>
        <div className="w-full p-2">
          <Header />

          <div className="mb-1 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Dashboard</h1>

            <ul className="flex gap-6 text-sm text-(--text-secondary)">
              <li>Overview</li>
              <li>Analytics</li>
              <li>Reports</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total Revenue"
              value="$24,580"
              change="+12%"
            />

            <StatCard
              title="Total Orders"
              value="154"
              change="+8 this week"
            />

            <StatCard
              title="Customers"
              value="1,248"
              change="+24 this week"
            />

            <StatCard
              title="Products"
              value="34"
              change="5 low stock"
            />
          </div>

              <div className="mt-3 rounded-2xl border border-(--border) bg-(--card-bg) p-3">
        <h2 className="mb-4 text-md font-semibold">
          Revenue Overview
        </h2>

        <RevenueChart />
      </div>
      <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2">
        <div className="rounded-2xl border border-(--border) bg-(--card-bg) p-3">
          <h2 className="mb-1 text-lg font-semibold">
            Order Status
          </h2>

          <OrdersPieChart />
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