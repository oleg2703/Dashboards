import { createFileRoute } from '@tanstack/react-router'
import LoginCard from '#/auth/LoginCard'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <LoginCard />
    </div>
  )
}