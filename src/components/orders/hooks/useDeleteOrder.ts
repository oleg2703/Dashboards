import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ordersApi } from '#/api/orders.api'

export const useDeleteOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ordersApi.delete,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['orders'],
      })
    },
  })
}