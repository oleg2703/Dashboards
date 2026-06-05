import { createFileRoute } from '@tanstack/react-router'
import Dashboard from '../components/layout/Dashboard'
import { StatCard } from '../components/dashboard/StatCard'

export const Route = createFileRoute('/dashboard')({
  component: () => (
    <Dashboard>
      <StatCard 
        title="Revenue" 
        value="$24,580" 
        change="+12%" 
      />
    </Dashboard>
  ),
})