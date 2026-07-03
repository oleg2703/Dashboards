import { useMutation, useQueryClient } from '@tanstack/react-query'
import { productsApi } from '#/api/products.api'
import type { Product } from '#/types/product'


type CreateProductDto = Omit<Product, 'id'>

export const useCreateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (product: CreateProductDto) =>
      productsApi.create(product),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      })
    },
  })
}