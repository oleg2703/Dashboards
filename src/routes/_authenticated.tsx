import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: () => {
    if (typeof window === 'undefined') return

    const user = window.localStorage.getItem('dashboard-user')

    if (!user) {
      throw redirect({
        to: '/login',
      })
    }
  },

  component: AuthenticatedLayout,
})

function AuthenticatedLayout() {
  return <Outlet />
}
