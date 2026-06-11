
import ThemeToggle from './ThemeToggle'
import { Bell, CirclePlus, Gift } from 'lucide-react'

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between border-b bg-background px-1">
     
     <ul className="flex items-left place-content-end gap-2 py-2">
     <li className="position-relative">
        <input type="text" placeholder="Search..." className="bg-background text-sm placeholder:text-sm  align-center " />
      </li>
     </ul>
     <ul className="flex items-right gap-7 items-center">
        <li><Bell /></li>
        <li><CirclePlus /></li>
        <li><Gift /></li>
        <li><ThemeToggle /></li>
      </ul>
    </header>
  )
}
