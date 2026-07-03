import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { Order } from '#/types/order'
import {orderSchema} from '#/validation/orders.schema'
import type {OrderFormData} from '#/validation/orders.schema'

interface EditOrderModalProps {
  order: Order | null
  onClose: () => void
  onSave: (order: Order) => void
}

export default function EditOrderModal({
  order,
  onClose,
  onSave,
}: EditOrderModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
  })

  useEffect(() => {
    if (order) {
      reset({
        customerId: order.customerId,
        amount: order.amount,
        status: order.status,
      })
    }
  }, [order, reset])

  if (!order) return null

  const handleSave = (
    data: OrderFormData
  ) => {
    onSave({
      ...order,
      customerId: data.customerId,
      amount: data.amount,
      status: data.status,
    })

    onClose()
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-(--card-bg) p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-xl font-bold">
          Edit Order
        </h2>

        <form
          onSubmit={handleSubmit(handleSave)}
          className="space-y-4"
        >
          <div>
            <input
              type="number"
              placeholder="Customer ID"
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
            <input
              type="number"
              step="0.01"
              placeholder="Amount"
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
            <select
              {...register('status')}
              className="w-full rounded-xl border border-(--border) bg-(--card-bg) p-2"
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

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border px-4 py-2"
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