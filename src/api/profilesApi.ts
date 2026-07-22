import { supabase } from '#/lib/supabase'
import type { UserRole } from '#/types/user'

export interface Profile {
  id: string
  email: string
  full_name: string
  role: UserRole
}

export async function getProfiles(): Promise<Profile[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, full_name, role')
    .order('email')

  if (error) throw error

  return data.map((profile) => ({
    ...profile,
    role: profile.role as UserRole,
  }))
}

export async function updateProfileRole(id: string, role: UserRole) {
  const { error } = await supabase
    .from('profiles')
    .update({ role })
    .eq('id', id)

  if (error) throw error
}
