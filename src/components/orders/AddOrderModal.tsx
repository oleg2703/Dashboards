import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { Order } from '#/types/order'
import {orderSchema} from '#/validation/orders.schema'
import type {OrderFormData} from '#/validation/orders.schema'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Modal } from '../ui/Modal'

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
    <Modal
      title="Add Order"
      onClose={onClose}
     footer={<>
            <Button
              type="button"
              variant="outline"
              onClick={onClose} 
            >
              Cancel
            </Button>

            <Button type="submit"
            form="add-order-form">
              Create Order
            </Button>
          </>}
    >
      <form
         id="add-order-form"
          onSubmit={handleSubmit(handleAdd)}
          className="space-y-4"
        >
          <div>
            <label className="mb-1 block text-sm font-medium">
              Customer ID
            </label>

            <Input
              type="number"
              {...register('customerId')}
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

           <Input
          type="number"
          step="1"
          {...register('amount', {
            valueAsNumber: true,
          })}></Input>

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

          
        </form>
    </Modal>
  )
}