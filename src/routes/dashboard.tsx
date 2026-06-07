import { createFileRoute } from '@tanstack/react-router'
import Dashboard from '../components/layout/Dashboard'
import { StatCard } from '../components/dashboard/StatCard'
import  Header  from '../components/layout/Header'

export const Route = createFileRoute('/dashboard')({
  component: () => (
    <main className="flex w-full h-screen">
    <Dashboard>
      
      <div className=" w-full">
        <Header />
        <div className="w-full flex items-center justify-between px-4 py-2">
          <h1>Dashboard</h1> 
          <ul className='flex gap-4'>
            <li>Overview</li>
            <li>Analytics</li>
            <li>Reports</li>
          </ul>
        </div>
         
      <div className="flex gap-4">
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
      </div>
      
     
    </Dashboard>
    </main>
    
  ),
})