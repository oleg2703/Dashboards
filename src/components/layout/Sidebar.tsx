import { Link } from '@tanstack/react-router'
import { ChevronDown, ChevronUp, House,LayoutDashboard,FolderKanban, UsersRound,Settings, Headphones, ArrowLeftFromLine } from 'lucide-react'
import { useState } from 'react'


export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <aside
  className={`sidebar h-full border-r p-4 flex flex-col justify-between transition-all duration-500 ${
    collapsed ? 'w-15' : 'w-70'
  }`}
>
      <div>
      <div className="flex items-center gap-4 mb-8 cursor-pointer">
        {!collapsed && (
        <span>#</span>
         )}
       {!collapsed && (
        <article>
          <p>Dashboard Inc.</p>
          <p>email@example.com</p>
        </article>
      )}
      {!collapsed && (
        <div>
          <span><ChevronUp /></span>
          <span><ChevronDown /></span>
        </div>
         )}
            <button
        onClick={() => setCollapsed(!collapsed)}
        className="cursor-pointer"
      >
        <ArrowLeftFromLine
          className={`transition-transform ${
            collapsed ? 'rotate-180' : ''
          }`}
        />
      </button>
      </div>
      <div>
      </div>
      <ul className="flex flex-col gap-4 ">
        <li className='flex items-center gap-2'><House/><Link to="/"className={`${collapsed ? 'hidden' : 'block'} text-lg font-bold`}> Home</Link></li>
        <li className='flex items-center gap-2'><LayoutDashboard /><Link to={'/dashboard'}  className={`${collapsed ? 'hidden' : 'block'} text-lg font-bold`}>Dashboard</Link></li>
        <li className='flex items-center gap-2'><FolderKanban /><Link to={'/products'}  className={`${collapsed ? 'hidden' : 'block'} text-lg font-bold`}>Products</Link></li>
        <li className='flex items-center gap-2'><UsersRound /><Link to={'/customers'} className={`${collapsed ? 'hidden' : 'block'} text-lg font-bold`}>Customers</Link></li>
      </ul>
      </div>
      
      <ul className="flex flex-col gap-2 ">
        <li className='flex items-center gap-2'><Settings /><Link to={'/settings'}  className={`${collapsed ? 'hidden' : 'block'} text-lg font-bold`}>Settings</Link></li>
        <li className='flex items-center gap-2'><Headphones /><Link to={'/help'} className={`${collapsed ? 'hidden' : 'block'} text-lg font-bold`}>Help Center</Link></li>
      </ul>

    </aside>
  )
}
