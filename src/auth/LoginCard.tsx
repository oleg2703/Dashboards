import LoginForm from './LoginForm'

export default function LoginCard() {
  return (
    <div className="w-full max-w-md rounded-xl border bg-background p-8 shadow-lg">
      <h1 className="mb-2 text-3xl font-bold">Dashboard</h1>

      <p className="mb-8 text-muted-foreground">Sign in to continue</p>

      <LoginForm />
    </div>
  )
}
