import { useEffect, useMemo, useState } from 'react'
import { AuthContext } from './AuthContext'
import type { User } from '#/types/user'
import { supabase } from '#/lib/supabase'

interface Props {
  children: React.ReactNode
}

function toUser(user: {
  id: string
  email?: string
  user_metadata: Record<string, unknown>
}): User {
  const name = user.user_metadata.full_name ?? user.user_metadata.name

  return {
    id: user.id,
    name:
      typeof name === 'string' && name.trim() ? name : (user.email ?? 'User'),
    email: user.email ?? '',
  }
}

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    const restoreSession = async () => {
      const { data } = await supabase.auth.getSession()

      if (active) {
        setUser(data.session?.user ? toUser(data.session.user) : null)
        setLoading(false)
      }
    }

    void restoreSession()

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ? toUser(session.user) : null)
        setLoading(false)
      },
    )

    return () => {
      active = false
      subscription.subscription.unsubscribe()
    }
  }, [])

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    return error?.message ?? null
  }

  const register = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    return error?.message ?? null
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      throw error
    }
  }

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      register,
      logout,
    }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
