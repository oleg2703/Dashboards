import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createFileRoute, Navigate } from '@tanstack/react-router'
import { useAuth } from '#/auth/useAuth'
import { getProfiles, updateProfileRole } from '#/api/profilesApi'
import type { UserRole } from '#/types/user'
import Sidebar from '#/components/layout/Sidebar'
import Header from '#/components/layout/Header'
import { toast } from 'react-toastify'

export const Route = createFileRoute('/_authenticated/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  const { hasPermission } = useAuth()
  const queryClient = useQueryClient()
  const canManageRoles = hasPermission('settings:view')
  const {
    data: profiles = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['profiles'],
    queryFn: getProfiles,
    enabled: canManageRoles,
  })
  const updateRole = useMutation({
    mutationFn: ({ id, role }: { id: string; role: UserRole }) =>
      updateProfileRole(id, role),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['profiles'] })
      toast.success('Role updated')
    },
    onError: () => toast.error('Could not update the role'),
  })

  if (!canManageRoles) return <Navigate to="/dashboard" />

  return (
    <main className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <div className="w-full overflow-y-auto p-2">
        <Header />
        <h1 className="mt-4 text-2xl font-bold">User roles</h1>
        <p className="mt-1 text-(--text-secondary)">
          Assign access levels for registered users.
        </p>

        {isLoading ? (
          <p className="mt-6">Loading users...</p>
        ) : isError ? (
          <p className="mt-6 text-red-500">Could not load users.</p>
        ) : (
          <div className="mt-6 overflow-hidden rounded-2xl border border-(--border)">
            <table className="w-full">
              <thead>
                <tr className="border-b border-(--border)">
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Role</th>
                </tr>
              </thead>
              <tbody>
                {profiles.map((profile) => (
                  <tr key={profile.id} className="border-b border-(--border)">
                    <td className="p-4">{profile.full_name || '—'}</td>
                    <td className="p-4">{profile.email}</td>
                    <td className="p-4">
                      <select
                        value={profile.role}
                        disabled={updateRole.isPending}
                        onChange={(event) =>
                          updateRole.mutate({
                            id: profile.id,
                            role: event.target.value as UserRole,
                          })
                        }
                        className="rounded-xl border border-(--border) bg-(--card-bg) px-3 py-2"
                      >
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="viewer">Viewer</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  )
}
