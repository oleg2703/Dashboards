import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { Order } from '#/types/order'
import type { Customer } from '#/types/customer'
import type { Product } from '#/types/product'
import { orderSchema } from '#/validation/orders.schema'
import type { OrderFormData } from '#/validation/orders.schema'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Modal } from '../ui/Modal'

interface AddOrderModalProps {
  onClose: () => void
  onAdd: (order: Omit<Order, 'id'>) => void
  customers: Customer[]
  products: Product[]
}

export default function AddOrderModal({
  onClose,
  onAdd,
  customers,
  products,
}: AddOrderModalProps) {
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      customerId: 0,
      items: [{ productId: 0, quantity: 1 }],
      status: 'pending',
    },
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'items' })
  const items = useWatch({ control, name: 'items' }) ?? []
  const amount = items.reduce((total, item) => {
    const product = products.find((current) => current.id === item.productId)
    return total + (product?.price ?? 0) * (item.quantity || 0)
  }, 0)

  const handleAdd = (data: OrderFormData) => {
    const invalidItemIndex = data.items.findIndex((item) => {
      const product = products.find((current) => current.id === item.productId)
      return !product || item.quantity > product.stock
    })

    if (invalidItemIndex >= 0) {
      const product = products.find(
        (current) => current.id === data.items[invalidItemIndex].productId,
      )
      setError(`items.${invalidItemIndex}.quantity`, {
        message: product
          ? `Only ${product.stock} units are available`
          : 'Selected product is unavailable',
      })
      return
    }

    onAdd({
      customerId: data.customerId,
      amount,
      status: data.status,
      date: new Date().toISOString().split('T')[0],
      items: data.items.map((item) => ({
        ...item,
        priceAtOrderTime: products.find(
          (product) => product.id === item.productId,
        )!.price,
      })),
    })
  }

  return (
    <Modal
      title="Add Order"
      onClose={onClose}
      footer={
        <>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button type="submit" form="add-order-form">
            Create Order
          </Button>
        </>
      }
    >
      <form
        id="add-order-form"
        onSubmit={handleSubmit(handleAdd)}
        className="space-y-4"
      >
        <div>
          <label className="mb-1 block text-sm font-medium">Customer</label>

          <select
            {...register('customerId', { valueAsNumber: true })}
            className="w-full rounded-xl border border-(--border) bg-(--card-bg) p-2"
          >
            <option value={0}>Select customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name} ({customer.email})
              </option>
            ))}
          </select>

          {errors.customerId && (
            <p className="mt-1 text-sm text-red-500">
              {errors.customerId.message}
            </p>
          )}
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium">Items</label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ productId: 0, quantity: 1 })}
            >
              Add item
            </Button>
          </div>

          <div className="space-y-3">
            {fields.map((field, index) => {
              const selectedProductId = items[index]?.productId
              const selectedProduct = products.find(
                (product) => product.id === selectedProductId,
              )

              return (
                <div key={field.id} className="rounded-xl border p-3">
                  <div className="grid grid-cols-[1fr_100px_auto] gap-2">
                    <select
                      {...register(`items.${index}.productId`, {
                        valueAsNumber: true,
                      })}
                      className="min-w-0 rounded-xl border border-(--border) bg-(--card-bg) p-2"
                    >
                      <option value={0}>Select product</option>
                      {products.map((product) => (
                        <option
                          key={product.id}
                          value={product.id}
                          disabled={
                            product.stock === 0 ||
                            (items.some(
                              (item, itemIndex) =>
                                itemIndex !== index &&
                                item.productId === product.id,
                            ) &&
                              selectedProductId !== product.id)
                          }
                        >
                          {product.name} — ${product.price} ({product.stock} in
                          stock)
                        </option>
                      ))}
                    </select>

                    <Input
                      type="number"
                      min="1"
                      max={selectedProduct?.stock}
                      aria-label={`Quantity for item ${index + 1}`}
                      {...register(`items.${index}.quantity`, {
                        valueAsNumber: true,
                      })}
                    />

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => remove(index)}
                      disabled={fields.length === 1}
                    >
                      Remove
                    </Button>
                  </div>

                  {errors.items?.[index]?.productId && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.items[index].productId.message}
                    </p>
                  )}
                  {errors.items?.[index]?.quantity && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.items[index].quantity.message}
                    </p>
                  )}
                </div>
              )
            })}
          </div>

          <p className="mt-3 text-right text-lg font-semibold">
            Total: ${amount.toFixed(2)}
          </p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Status</label>

          <select
            {...register('status')}
            className="w-full rounded-xl border border-(--border) bg-(--card-bg) p-2"
          >
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {errors.status && (
            <p className="mt-1 text-sm text-red-500">{errors.status.message}</p>
          )}
        </div>
      </form>
    </Modal>
  )
}
