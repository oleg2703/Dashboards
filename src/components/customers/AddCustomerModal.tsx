import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { Customer } from '#/types/customer'
import { customerSchema} from '#/validation/customer.schema'
import type {CustomerFormData} from '#/validation/customer.schema'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Modal } from '../ui/Modal'

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
        .split('T')[0]
    })

    onClose()
  }

  return (
    <Modal 
    title="Add Customer"
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
              form="add-customer-form"
            >
        Add Customer
      </Button>
          </>
    }>
          <form
          id="add-customer-form"
  onSubmit={handleSubmit(handleAdd)}
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