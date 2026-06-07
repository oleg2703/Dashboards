import { Link } from '@tanstack/react-router'
import ThemeToggle from './ThemeToggle'
import { Bell, CirclePlus, Gift } from 'lucide-react'

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between border-b bg-background px-4 py-2">
     
     <ul className="flex items-left place-content-end gap-4 py-4">
     <li><input type="text" placeholder="Search..." /></li>
     </ul>
     <ul className="flex items-right gap-4">
        <li><Bell /></li>
        <li><CirclePlus /></li>
        <li><Gift /></li>
        <li><ThemeToggle /></li>
      </ul>
    </header>
  )
}
