import { useState } from 'react'
import type { Customer } from '#/types/customer'

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
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = () => {
    onAdd({
      name,
      email,
      isActive: true,
      ordersCount: 0,
      totalSpent: 0,
      createdAt: new Date()
        .toISOString()
        .split('T')[0],
    })

    onClose()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-2xl bg-(--card-bg) p-6">
        <h2 className="mb-4 text-xl font-bold">
          Add Customer
        </h2>

        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Customer name"
          className="mb-3 w-full rounded border p-2"
        />

        <input
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          placeholder="Email"
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
            Add
          </button>
        </div>
      </div>
    </div>
  )
}