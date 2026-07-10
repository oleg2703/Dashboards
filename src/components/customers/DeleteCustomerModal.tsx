import type { Customer } from '#/types/customer'
import { Button } from '../ui/Button'

interface Props {
  customer: Customer | null
  onClose: () => void
  onDelete: (id: number) => void
}

export default function DeleteCustomerModal({
  customer,
  onClose,
  onDelete,
}: Props) {
  if (!customer) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-2xl bg-(--card-bg) p-6">
        <h2 className="mb-4 text-xl font-bold">
          Delete Customer
        </h2>

        <p>
          Are you sure you want to delete{' '}
          <strong>{customer.name}</strong>?
        </p>

        <div className="mt-6 flex justify-end gap-2">
         <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            variant="danger"
            onClick={() =>onDelete(customer.id)}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}