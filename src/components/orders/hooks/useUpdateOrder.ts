import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ordersApi } from '#/api/orders.api'

export const useUpdateOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ordersApi.update,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['orders'],
      })
    },
  })
}