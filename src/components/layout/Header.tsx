
import ThemeToggle from './ThemeToggle'
import { Bell, Gift } from 'lucide-react'

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between border-b bg-background ">
     
     <div className="flex items-left place-content-end gap-3">
     <h1 className="text-2xl font-bold">
      DashboardBY
      </h1>
     </div>
     <ul className="flex items-right gap-7 items-center">
        <li><Bell /></li>
        <li><ThemeToggle /></li>
        <li><Gift /></li>
      </ul>
    </header>
  )
}
