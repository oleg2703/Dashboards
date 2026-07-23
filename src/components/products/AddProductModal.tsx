import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { productSchema } from '#/validation/product.schema'
import type { ProductFormData } from '#/validation/product.schema'
import type { Product } from '#/types/product'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Modal } from '../ui/Modal'

interface AddProductModalProps {
  onClose: () => void
  onAdd: (product: Omit<Product, 'id' | 'status'>) => void
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
      description: '',
    })

    onClose()
  }

  return (
    <Modal
      title="Add Product"
      onClose={onClose}
      footer={
        <>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button type="submit" form="add-product-form">
            Add Product
          </Button>
        </>
      }
    >
      <form
        id="add-product-form"
        onSubmit={handleSubmit(submit)}
        className="space-y-4"
      >
        <div>
          <Input {...register('name')} placeholder="Product name" />

          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Input
            type="number"
            placeholder="Price"
            {...register('price', {
              valueAsNumber: true,
            })}
          />

          {errors.price && (
            <p className="mt-1 text-sm text-red-500">{errors.price.message}</p>
          )}
        </div>

        <div>
          <Input
            type="number"
            placeholder="Stock"
            {...register('stock', {
              valueAsNumber: true,
            })}
          />

          {errors.stock && (
            <p className="mt-1 text-sm text-red-500">{errors.stock.message}</p>
          )}
        </div>
      </form>
    </Modal>
  )
}