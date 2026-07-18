import { useMutation, useQueryClient } from '@tanstack/react-query'
import { productsApi } from '#/api/productsApi'
import type { Product } from '#/types/product'

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (product: Product) => productsApi.update(product),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      })
    },
  })
}
