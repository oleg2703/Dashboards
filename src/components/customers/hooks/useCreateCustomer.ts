import { useMutation, useQueryClient } from '@tanstack/react-query'
import { customersApi } from '#/api/customers.api'

export const useCreateCustomer = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: customersApi.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['customers'],
      })
    },
  })
}
