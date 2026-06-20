import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ordersApi } from '#/api/orders.api'

export const useCreateOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ordersApi.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['orders'],
      })
    },
  })
}