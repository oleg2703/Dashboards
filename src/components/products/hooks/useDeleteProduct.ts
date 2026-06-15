import { useMutation, useQueryClient } from '@tanstack/react-query'
import { productsApi } from '#/api/products.api'

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) =>
      productsApi.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      })
    },
  })
}