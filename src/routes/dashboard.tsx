import { createFileRoute } from '@tanstack/react-router'
import Dashboard from '../components/layout/Dashboard'
import { StatCard } from '../components/dashboard/StatCard'

export const Route = createFileRoute('/dashboard')({
  component: () => (
    <main className="flex w-full h-screen">
    <Dashboard>
      <div className="flex gap-4">
         <StatCard 
        title="Revenue" 
        value="$24,580" 
        change="+12%" 
      />
       <StatCard 
        title="Revenue" 
        value="$24,580" 
        change="+12%" 
      />
       <StatCard 
        title="Revenue" 
        value="$24,580" 
        change="+12%" 
      />
      </div>
     
    </Dashboard>
    </main>
    
  ),
})