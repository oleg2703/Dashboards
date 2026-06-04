import { Link } from '@tanstack/react-router'
import ThemeToggle from './ThemeToggle'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function Sidebar() {
  return (
    <aside className="sticky top-0 left-0 h-screen w-64 border-r bg-background p-4 justify-between flex flex-col">
      <div>
      <div className="flex items-center gap-4 mb-8 pointer-events-auto">
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
      <div className="flex flex-col gap-4 ">
        <Link to={'/'} className='text-lg font-bold'>Home</Link>
        <Link to={'/dashboard'} className='text-lg font-bold'>Dashboard</Link>
        <Link to={'/products'} className='text-lg font-bold'>Products</Link>
        <Link to={'/customers'} className='text-lg font-bold'>Customers</Link>
      </div>
      </div>
      
      <div className="flex flex-col gap-2 ">
        <Link to={'/settings'} className='text-lg font-bold'>Settings</Link>
        <Link to={'/help'} className='text-lg font-bold'>Help Center</Link>
      </div>

    </aside>
  )
}
