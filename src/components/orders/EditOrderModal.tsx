import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { Order } from '#/types/order'
import {
  orderSchema
  
} from '#/validation/orders.schema'
import type {OrderFormData} from '#/validation/orders.schema';


import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Modal } from '../ui/Modal'

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

  const handleSave = (data: OrderFormData) => {
    onSave({
      ...order,
      customerId: data.customerId,
      amount: data.amount,
      status: data.status,
    })

    onClose()
  }

  return (
    <Modal
      title="Edit Order"
      onClose={onClose}
      footer={
        <>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            form="edit-order-form"
          >
            Save
          </Button>
        </>
      }
    >
      <form
        id="edit-order-form"
        onSubmit={handleSubmit(handleSave)}
        className="space-y-4"
      >
        <div>
          <Input
            type="number"
            placeholder="Customer ID"
            {...register('customerId', {
              valueAsNumber: true,
            })}
          />

          {errors.customerId && (
            <p className="mt-1 text-sm text-red-500">
              {errors.customerId.message}
            </p>
          )}
        </div>

        <div>
          <Input
            type="number"
            step="0.01"
            placeholder="Amount"
            {...register('amount', {
              valueAsNumber: true,
            })}
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
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {errors.status && (
            <p className="mt-1 text-sm text-red-500">
              {errors.status.message}
            </p>
          )}
        </div>
      </form>
    </Modal>
  )
}