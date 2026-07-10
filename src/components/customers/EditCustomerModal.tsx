import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { Customer } from '#/types/customer'
import { customerSchema} from '#/validation/customer.schema'
import type {CustomerFormData} from '#/validation/customer.schema'
import { Button } from '../ui/Button'


interface Props {
  customer: Customer | null
  onClose: () => void
  onSave: (customer: Customer) => void
}

export default function EditCustomerModal({
  customer,
  onClose,
  onSave,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
  })

  useEffect(() => {
    if (customer) {
      reset({
        name: customer.name,
        email: customer.email,
      })
    }
  }, [customer, reset])

  if (!customer) return null

  const handleSave = (data: CustomerFormData) => {
    onSave({
      ...customer,
      name: data.name,
      email: data.email,
    })

    onClose()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div
        className="w-full max-w-md rounded-2xl bg-(--card-bg) p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-xl font-bold">
          Edit Customer
        </h2>

        <form
          onSubmit={handleSubmit(handleSave)}
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
            Save 
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}