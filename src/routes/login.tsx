import { createFileRoute, Navigate } from '@tanstack/react-router'
import { useAuth } from '#/auth/useAuth'
import LoginCard from '#/auth/LoginCard.tsx'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  const { user, loading } = useAuth()

  if (loading) {
    return null
  }

  if (user) {
    return <Navigate to="/dashboard" />
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoginCard />
    </div>
  )
}