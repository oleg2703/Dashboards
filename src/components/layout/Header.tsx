
import ThemeToggle from './ThemeToggle'
import { Bell, CirclePlus, Gift } from 'lucide-react'

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between border-b bg-background ">
     
     <div className="flex items-left place-content-end">
     <h1 className="text-2xl font-bold">
      DashboardBY
      </h1>
     </div>
     <ul className="flex items-right gap-7 items-center">
        <li><Bell /></li>
        <li><CirclePlus /></li>
        <li><Gift /></li>
        <li><ThemeToggle /></li>
      </ul>
    </header>
  )
}
