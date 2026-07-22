export type UserRole = 'admin' | 'manager' | 'viewer'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

export interface AuthContextType {
  user: User | null
  loading: boolean
  hasPermission: (permission: Permission) => boolean
  login: (email: string, password: string) => Promise<string | null>
  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<RegisterResult>
  logout: () => Promise<void>
}

export interface RegisterResult {
  error: string | null
  requiresEmailConfirmation: boolean
}

export type Permission =
  | 'dashboard:view'
  | 'products:view'
  | 'products:manage'
  | 'customers:view'
  | 'customers:manage'
  | 'orders:view'
  | 'orders:manage'
  | 'settings:view'
