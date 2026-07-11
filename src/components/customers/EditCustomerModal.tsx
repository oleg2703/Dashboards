import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { Customer } from '#/types/customer'
import { customerSchema} from '#/validation/customer.schema'
import type {CustomerFormData} from '#/validation/customer.schema'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Modal } from '../ui/Modal'


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
    <Modal 
    title="Edit Customer"
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

            <Button type="submit"
            form="edit-customer-form">
            Save 
            </Button>
          </>
    }>
       <form
        id="edit-customer-form"
          onSubmit={handleSubmit(handleSave)}
          className="space-y-4"
        >
          <div>
            <Input
              {...register('name')}
              placeholder="Customer name"
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
           <Input
                {...register('email')}
                type="email"
                placeholder="Email"
              />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          
        </form>
    </Modal>
  )
}