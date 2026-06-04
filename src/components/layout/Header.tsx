import { Link } from '@tanstack/react-router'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b bg-background px-4 py-2">
     <div className="text-xl font-bold">Logo</div>
     <ul className="flex items-center place-content-end gap-4 py-4">
      <ThemeToggle />
      <li>Login </li>
      <li>Sign Up</li>
      <li>Profile</li>
     </ul>
    </header>
  )
}
