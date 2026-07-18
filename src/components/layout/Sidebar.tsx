import { useAuth } from '#/auth/useAuth'
import { Link } from '@tanstack/react-router'
import {
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
  FolderKanban,
  UsersRound,
  Settings,
  Headphones,
  ArrowLeftFromLine,
  UserRound,
} from 'lucide-react'
import { useState } from 'react'

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const { user } = useAuth()

  return (
    <aside
      className={`sidebar h-screen border-r p-4 mr-4 flex flex-col justify-between transition-all duration-500 ${
        collapsed ? 'w-15' : 'w-70'
      }`}
    >
      <div>
        <div className="flex items-center gap-4 mb-8  cursor-pointer">
          {!collapsed && <span>#</span>}
          {!collapsed && (
            <article>
              <p>{user?.name}</p>
              <p>{user?.email}</p>
            </article>
          )}
          {!collapsed && (
            <div>
              <span>
                <ChevronUp />
              </span>
              <span>
                <ChevronDown />
              </span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="cursor-pointer"
          >
            <ArrowLeftFromLine
              className={` transition-transform ${
                collapsed ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
        <div></div>
        <ul className="flex flex-col gap-4 ">
          <li className="flex items-center gap-2">
            <Link
              to={'/dashboard'}
              className="text-lg font-bold flex items-center gap-2"
            >
              <LayoutDashboard />
              {!collapsed && <span className="font-bold">Dashboard</span>}
            </Link>
          </li>
          <li className="flex items-center gap-2">
            <Link
              to={'/products'}
              className="text-lg font-bold flex items-center gap-2"
            >
              <FolderKanban />
              {!collapsed && <span className="font-bold">Products</span>}
            </Link>
          </li>
          <li className="flex items-center gap-2">
            <Link
              to={'/customers'}
              className="text-lg font-bold flex items-center gap-2"
            >
              <UsersRound />
              {!collapsed && <span className="font-bold">Customers</span>}
            </Link>
          </li>
          <li className="flex items-center gap-2">
            <Link
              to={'/orders'}
              className="text-lg font-bold flex items-center gap-2"
            >
              <UserRound />
              {!collapsed && <span className="font-bold">Orders</span>}
            </Link>
          </li>
        </ul>
      </div>

      <ul className="flex flex-col gap-2 ">
        <li className="flex items-center gap-2">
          <Link
            to={'/settings'}
            className="text-lg font-bold flex items-center gap-2"
          >
            <Settings />
            {!collapsed && <span className="font-bold">Settings</span>}
          </Link>
        </li>
        <li className="flex items-center gap-2">
          <Link
            to={'/help'}
            className="text-lg font-bold flex items-center gap-2"
          >
            <Headphones />
            {!collapsed && <span className="font-bold">Help Center</span>}
          </Link>
        </li>
      </ul>
    </aside>
  )
}
