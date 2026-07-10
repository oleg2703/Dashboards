import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { Customer } from '#/types/customer'
import { customerSchema} from '#/validation/customer.schema'
import type {CustomerFormData} from '#/validation/customer.schema'
import { Button } from '../ui/Button'

interface AddCustomerModalProps {
  onClose: () => void
  onAdd: (
    customer: Omit<Customer, 'id'>
  ) => void
}

export default function AddCustomerModal({
  onClose,
  onAdd,
}: AddCustomerModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  })

  const handleAdd = (
    data: CustomerFormData
  ) => {
    onAdd({
      name: data.name,
      email: data.email,
      isActive: true,
      ordersCount: 0,
      totalSpent: 0,
      createdAt: new Date()
        .toISOString()
        .split('T')[0],
      orders: [],
    })

    onClose()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-2xl bg-(--card-bg) p-6">
        <h2 className="mb-4 text-xl font-bold">
          Add Customer
        </h2>

        <form
          onSubmit={handleSubmit(handleAdd)}
          className="space-y-4"
        >
          <div>
            <input
              {...register('name')}
              placeholder="Customer name"
              className="w-full rounded border p-2"
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register('email')}
              placeholder="Email"
              className="w-full rounded border p-2"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2">
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