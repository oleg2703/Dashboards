import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute()({ component: Orders })

function Orders() {
  return <div>Orders</div>
}