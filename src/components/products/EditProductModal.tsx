import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { Product } from '#/types/product'
import { productSchema } from '#/validation/product.schema'
import type { ProductFormData } from '#/validation/product.schema'

interface EditProductModalProps {
  product: Product | null
  onClose: () => void
  onSave: (product: Product) => void
}

export default function EditProductModal({
  product,
  onClose,
  onSave,
}: EditProductModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  })

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        price: product.price,
        stock: product.stock,
      })
    }
  }, [product, reset])

  if (!product) return null

  const handleSave = (data: ProductFormData) => {
    onSave({
      ...product,
      ...data,
      status:
        data.stock > 5
          ? 'Active'
          : 'Low Stock',
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
          Edit Product
        </h2>

        <form
          onSubmit={handleSubmit(handleSave)}
          className="space-y-4"
        >
          <div>
            <input
              {...register('name')}
              placeholder="Product Name"
              className="w-full rounded-xl border border-(--border) px-4 py-2"
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="number"
              {...register('price', {
                valueAsNumber: true,
              })}
              placeholder="Price"
              className="w-full rounded-xl border border-(--border) px-4 py-2"
            />

            {errors.price && (
              <p className="mt-1 text-sm text-red-500">
                {errors.price.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="number"
              {...register('stock', {
                valueAsNumber: true,
              })}
              placeholder="Stock"
              className="w-full rounded-xl border border-(--border) px-4 py-2"
            />

            {errors.stock && (
              <p className="mt-1 text-sm text-red-500">
                {errors.stock.message}
              </p>
            )}
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-(--border) px-4 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-500 px-4 py-2 text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}