import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { Order } from '#/types/order'
import {orderSchema} from '#/validation/orders.schema'
import type {OrderFormData} from '#/validation/orders.schema'
import { Button } from '../ui/Button'

interface AddOrderModalProps {
  onClose: () => void
  onAdd: (
    order: Omit<Order, 'id'>
  ) => void
}

export default function AddOrderModal({
  onClose,
  onAdd,
}: AddOrderModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),

    defaultValues: {
      customerId: 1,
      amount: 0,
      status: 'pending',
    },
  })

  const handleAdd = (
    data: OrderFormData
  ) => {
    onAdd({
      customerId: data.customerId,
      amount: data.amount,
      status: data.status,
      date: new Date()
        .toISOString()
        .split('T')[0],
    })

    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="mx-4 w-full max-w-md rounded-2xl border border-(--border) bg-(--card-bg) p-6 shadow-xl"
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <h2 className="mb-4 text-xl font-bold">
          Add Order
        </h2>

        <form
          onSubmit={handleSubmit(handleAdd)}
          className="space-y-4"
        >
          <div>
            <label className="mb-1 block text-sm font-medium">
              Customer ID
            </label>

            <input
              type="number"
              {...register('customerId')}
              className="w-full rounded-xl border border-(--border) p-2"
            />

            {errors.customerId && (
              <p className="mt-1 text-sm text-red-500">
                {errors.customerId.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Amount
            </label>

            <input
              type="number"
              step="0.01"
              {...register('amount')}
              className="w-full rounded-xl border border-(--border) p-2"
            />

            {errors.amount && (
              <p className="mt-1 text-sm text-red-500">
                {errors.amount.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Status
            </label>

            <select
              {...register('status')}
              className="w-full rounded-xl border border-(--border) p-2"
            >
              <option value="paid">
                Paid
              </option>

              <option value="pending">
                Pending
              </option>

              <option value="cancelled">
                Cancelled
              </option>
            </select>

            {errors.status && (
              <p className="mt-1 text-sm text-red-500">
                {errors.status.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose} 
            >
              Cancel
            </Button>

            <Button type="submit">
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}