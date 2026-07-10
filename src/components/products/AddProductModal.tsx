import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { productSchema } from '#/validation/product.schema'
import type { ProductFormData } from '#/validation/product.schema'
import type { Product } from '#/types/product'
import { Button } from '../ui/Button'

interface AddProductModalProps {
  onClose: () => void
  onAdd: (product: Omit<Product, 'id'>) => void
}

export default function AddProductModal({
  onClose,
  onAdd,
}: AddProductModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      price: 0,
      stock: 0,
    },
  })

  const submit = (data: ProductFormData) => {
    onAdd({
      ...data,
      status:
        data.stock > 5
          ? 'Active'
          : 'Low Stock',
      description: '',
    })

    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-(--card-bg) p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-xl font-bold">
          Add Product
        </h2>

        <form
          onSubmit={handleSubmit(submit)}
          className="space-y-4"
        >
          <div>
            <input
              placeholder="Product name"
              {...register('name')}
              className="w-full rounded-xl border border-(--border) px-4 py-2"
            />

            <p className="mt-1 text-sm text-red-500">
              {errors.name?.message}
            </p>
          </div>

          <div>
            <input
              type="number"
              placeholder="Price"
              {...register('price', {
                valueAsNumber: true,
              })}
              className="w-full rounded-xl border border-(--border) px-4 py-2"
            />

            <p className="mt-1 text-sm text-red-500">
              {errors.price?.message}
            </p>
          </div>

          <div>
            <input
              type="number"
              placeholder="Stock"
              {...register('stock', {
                valueAsNumber: true,
              })}
              className="w-full rounded-xl border border-(--border) px-4 py-2"
            />

            <p className="mt-1 text-sm text-red-500">
              {errors.stock?.message}
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button type="submit">
            Add Customer
          </Button>
          </div>
        </form>
      </div>
    </div>
  )
}