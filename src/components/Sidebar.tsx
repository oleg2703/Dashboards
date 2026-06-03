import { Link } from '@tanstack/react-router'
import ThemeToggle from './ThemeToggle'

export default function Sidebar() {
  return (
    <aside className="flex-shrink-0 border-r border-[var(--line)] bg-[var(--sidebar-bg)] p-4">
      <ThemeToggle />
    </aside>
  )
}
