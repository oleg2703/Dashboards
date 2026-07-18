import { useAuth } from '#/auth/useAuth'
import { useNavigate } from '@tanstack/react-router'
import ThemeToggle from './ThemeToggle'
import { LogOut } from 'lucide-react'

export default function Header() {
  const { logout } = useAuth()

  const navigate = useNavigate()

  const handleLogout = () => {
    logout()

    navigate({
      to: '/login',
    })
  }
  return (
    <header className="w-full flex items-center justify-between border-b bg-background ">
      <div className="flex items-left place-content-end gap-3">
        <h1 className="text-2xl font-bold">DashboardBY</h1>
      </div>
      <ul className="flex items-right gap-7 items-center">
        <li>
          <ThemeToggle />
        </li>
        <button onClick={handleLogout}>
          <LogOut />
        </button>
      </ul>
    </header>
  )
}
