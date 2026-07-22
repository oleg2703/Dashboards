import { useAuth } from '#/auth/useAuth'
import { Link } from '@tanstack/react-router'
import {

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
  const { user, hasPermission } = useAuth()

  return (
    <aside
      className={`sidebar h-screen border-r p-4 mr-10 flex flex-col justify-between transition-all duration-500 ${
        collapsed ? 'w-15' : 'w-70'
      }`}
    >
      <div>
        <div className="flex items-center mb-8 gap-3 justify-around">
          {!collapsed && (
            <article className="flex flex-col">
              <p>{user?.email}</p>
              <p className="text-medium capitalize text-(--text-muted)">
                {user?.role}
              </p>
            </article>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className=" cursor-pointer"
          >
            <ArrowLeftFromLine
              className={` transition-transform ${
                collapsed ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
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
          {hasPermission('settings:view') && (
            <li className="flex items-center gap-2">
              <Link
                to={'/settings'}
                className="text-lg font-bold flex items-center gap-2"
              >
                <Settings />
                {!collapsed && <span className="font-bold">Settings</span>}
              </Link>
            </li>
          )}
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
