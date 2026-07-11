import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { Product } from '#/types/product'
import { productSchema } from '#/validation/product.schema'
import type { ProductFormData } from '#/validation/product.schema'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Modal } from '../ui/Modal'

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
    <Modal
      title="Edit Product"
      onClose={onClose}
      footer={
          <>
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button type="submit"
            form='edit-product-form'>
              Save
            </Button>
          </>
      }
      >
    
      <form
       id="edit-product-form"
          onSubmit={handleSubmit(handleSave)}
          className="space-y-4"
        >
          <div>
            <Input
              {...register('name')}
              placeholder="Product Name"
             
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <Input
              type="number"
              {...register('price', {
                valueAsNumber: true,
              })}
              placeholder="Price"
              
            />

            {errors.price && (
              <p className="mt-1 text-sm text-red-500">
                {errors.price.message}
              </p>
            )}
          </div>

          <div>
            <Input
              type="number"
              {...register('stock', {
                valueAsNumber: true,
              })}
              placeholder="Stock"
              
            />

            {errors.stock && (
              <p className="mt-1 text-sm text-red-500">
                {errors.stock.message}
              </p>
            )}
          </div>

         
        </form>
    </Modal>
  )
}