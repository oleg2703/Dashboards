import { useEffect, useState } from 'react'
import type { Customer } from '#/types/customer'

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
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (customer) {
      setName(customer.name)
      setEmail(customer.email)
    }
  }, [customer])

  if (!customer) return null

  const handleSubmit = () => {
    onSave({
      ...customer,
      name,
      email,
    })
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-2xl bg-(--card-bg) p-6">
        <h2 className="mb-4 text-xl font-bold">
          Edit Customer
        </h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-3 w-full rounded border p-2"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded border p-2"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded border px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}