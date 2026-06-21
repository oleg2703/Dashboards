import { useState } from 'react'
import type { Order } from '#/types/order'

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
  const [customerId, setCustomerId] =
    useState('')
    

  const [amount, setAmount] =
    useState('')

 const [status, setStatus] = useState<'paid' | 'pending' | 'cancelled'>('pending')

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    onAdd({
      customerId: Number(customerId),
      amount: Number(amount),
      status,
      date: new Date()
        .toISOString()
        .split('T')[0],
    })

    onClose()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-2xl bg-(--card-bg) p-6">
        <h2 className="mb-4 text-xl font-bold">
          Add Order
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="number"
            placeholder="Customer ID"
            value={customerId}
            onChange={(e) =>
              setCustomerId(
                e.target.value
              )
            }
            className="w-full rounded-xl border p-2"
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) =>
              setAmount(
                e.target.value
              )
            }
            className="w-full rounded-xl border p-2"
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value as 'paid' | 'pending' | 'cancelled'
              )
            }
            className="w-full rounded-xl border p-2"
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

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border px-4 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-500 px-4 py-2 text-white"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}