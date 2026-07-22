import { useEffect, useMemo, useState } from 'react'
import { AuthContext } from './AuthContext'
import type { Permission, User } from '#/types/user'
import { supabase } from '#/lib/supabase'
import { getRole, hasPermission } from './permissions'

interface Props {
  children: React.ReactNode
}

async function toUser(user: {
  id: string
  email?: string
  user_metadata: Record<string, unknown>
}): Promise<User> {
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, role')
    .eq('id', user.id)
    .maybeSingle()

  const metadataName = user.user_metadata.full_name ?? user.user_metadata.name
  const name = profile?.full_name ?? metadataName

  return {
    id: user.id,
    name:
      typeof name === 'string' && name.trim() ? name : (user.email ?? 'User'),
    email: user.email ?? '',
    role: getRole(profile?.role),
  }
}

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    const restoreSession = async () => {
      const { data } = await supabase.auth.getSession()
      const restoredUser = data.session?.user
        ? await toUser(data.session.user)
        : null

      if (active) {
        setUser(restoredUser)
        setLoading(false)
      }
    }

    void restoreSession()

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        void (async () => {
          const authenticatedUser = session?.user
            ? await toUser(session.user)
            : null

          if (active) {
            setUser(authenticatedUser)
            setLoading(false)
          }
        })()
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

  const register = async (name: string, email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
      },
    })

    if (error) {
      return { error: error.message, requiresEmailConfirmation: false }
    }

    if (data.user?.identities?.length === 0) {
      return {
        error: 'An account with this email already exists.',
        requiresEmailConfirmation: false,
      }
    }

    return {
      error: null,
      requiresEmailConfirmation: !data.session,
    }
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
      hasPermission: (permission: Permission) =>
        user ? hasPermission(user.role, permission) : false,
      login,
      register,
      logout,
    }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
