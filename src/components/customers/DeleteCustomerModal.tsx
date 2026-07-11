import type { Customer } from '#/types/customer'
import { Button } from '../ui/Button'
import { Modal } from '../ui/Modal'

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
    <Modal 
    title="Delete Customer"
    onClose={onClose}
    footer={  <>
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
        </>}>
     
        <p>
          Are you sure you want to delete{' '}
          <strong>{customer.name}</strong>?
        </p>

    </Modal>
  )
}