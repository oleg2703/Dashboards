import { toast } from 'react-toastify'
import type { UseMutationResult } from '@tanstack/react-query'

// eslint-disable-next-line @typescript-eslint/naming-convention
interface UseCrudProps<T, CreateDto = T> {
  entityName: string

  createMutation: UseMutationResult<any, any, CreateDto>
  updateMutation: UseMutationResult<any, any, T>
  deleteMutation: UseMutationResult<any, any, number>

  onCreateSuccess?: () => void
  onUpdateSuccess?: () => void
  onDeleteSuccess?: () => void
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function useCrud<T, CreateDto = T>({
  entityName,

  createMutation,
  updateMutation,
  deleteMutation,

  onCreateSuccess,
  onUpdateSuccess,
  onDeleteSuccess,
}: UseCrudProps<T, CreateDto>) {
  const handleCreate = (item: CreateDto) => {
    createMutation.mutate(item, {
      onSuccess: () => {
        toast.success(`${entityName} created successfully`)
        onCreateSuccess?.()
      },

      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message ??
            `Failed to create ${entityName.toLowerCase()}`,
        )
      },
    })
  }

  const handleUpdate = (item: T) => {
    updateMutation.mutate(item, {
      onSuccess: () => {
        toast.success(`${entityName} updated successfully`)
        onUpdateSuccess?.()
      },

      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message ??
            `Failed to update ${entityName.toLowerCase()}`,
        )
      },
    })
  }

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast.success(`${entityName} deleted successfully`)
        onDeleteSuccess?.()
      },

      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message ??
            `Failed to delete ${entityName.toLowerCase()}`,
        )
      },
    })
  }

  return {
    handleCreate,
    handleUpdate,
    handleDelete,
  }
}
