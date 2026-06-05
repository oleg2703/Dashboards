import { Link } from '@tanstack/react-router'
import ThemeToggle from './ThemeToggle'
import { ChevronDown, ChevronUp, House,LayoutDashboard,FolderKanban, UsersRound,Settings, Headphones } from 'lucide-react'

export default function Sidebar() {
  return (
    <aside className="sticky top-0 left-0 h-screen w-64 border-r bg-background p-4 justify-between flex flex-col">
      <div>
      <div className="flex items-center gap-4 mb-8 cursor-pointer">
        <span>#</span>
        <article >
        <p>Dashboard Inc.</p>
        <p>email@example.com</p>
        </article>
        <div>
          <span><ChevronUp /></span>
          <span><ChevronDown /></span>
        </div>
      </div>
      <div>
        <ThemeToggle/>
      </div>
      <ul className="flex flex-col gap-4 ">
        <li className='flex items-center gap-2'><House /><Link to={'/'} className='text-lg font-bold'>Home</Link></li>
        <li className='flex items-center gap-2'><LayoutDashboard /><Link to={'/dashboard'} className='text-lg font-bold'>Dashboard</Link></li>
        <li className='flex items-center gap-2'><FolderKanban /><Link to={'/products'} className='text-lg font-bold'>Products</Link></li>
        <li className='flex items-center gap-2'><UsersRound /><Link to={'/customers'} className='text-lg font-bold'>Customers</Link></li>
      </ul>
      </div>
      
      <ul className="flex flex-col gap-2 ">
        <li className='flex items-center gap-2'><Settings /><Link to={'/settings'} className='text-lg font-bold'>Settings</Link></li>
        <li className='flex items-center gap-2'><Headphones /><Link to={'/help'} className='text-lg font-bold'>Help Center</Link></li>
      </ul>

    </aside>
  )
}
