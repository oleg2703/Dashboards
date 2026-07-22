import type { Permission, UserRole } from '#/types/user'

const permissions: Record<UserRole, readonly Permission[]> = {
  admin: [
    'dashboard:view',
    'products:view',
    'products:manage',
    'customers:view',
    'customers:manage',
    'orders:view',
    'orders:manage',
    'settings:view',
  ],
  manager: [
    'dashboard:view',
    'products:view',
    'products:manage',
    'customers:view',
    'customers:manage',
    'orders:view',
    'orders:manage',
  ],
  viewer: ['dashboard:view', 'products:view', 'customers:view', 'orders:view'],
}

export function getRole(role: unknown): UserRole {
  if (role === 'admin' || role === 'manager' || role === 'viewer') {
    return role
  }

  return 'viewer'
}

export function hasPermission(role: UserRole, permission: Permission) {
  return permissions[role].includes(permission)
}
