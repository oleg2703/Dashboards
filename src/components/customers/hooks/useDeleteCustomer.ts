import { useMutation, useQueryClient } from '@tanstack/react-query'
import { customersApi } from '#/api/customers.api'

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: customersApi.delete,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['customers'],
      })
    },
  })
}