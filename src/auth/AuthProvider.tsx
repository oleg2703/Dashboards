import { useEffect, useMemo, useState } from 'react'
import { AuthContext } from './AuthContext'
import { fakePassword, fakeUser } from './fakeAuth'
import type { User } from '#/types/user'

const STORAGE_KEY = 'dashboard-user'

interface Props {
  children: React.ReactNode
}

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)

    if (stored) {
      setUser(JSON.parse(stored))
    }

    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (email === fakeUser.email && password === fakePassword) {
      setUser(fakeUser)

      localStorage.setItem(STORAGE_KEY, JSON.stringify(fakeUser))

      return true
    }

    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      logout,
    }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
