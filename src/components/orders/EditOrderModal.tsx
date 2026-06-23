import { useEffect, useState } from 'react'
import type { Order } from '#/types/order'

interface EditOrderModalProps {
  order: Order | null
  onClose: () => void
  onSave: (order: Order) => void
}

export default function EditOrderModal({
  order,
  onClose,
  onSave,
}: EditOrderModalProps) {
  const [customerId, setCustomerId] =
    useState('')

  const [amount, setAmount] =
    useState('')

  const [status, setStatus] =
    useState<
      'paid' | 'pending' | 'cancelled'
    >('pending')

  useEffect(() => {
    if (!order) return

    setCustomerId(
      String(order.customerId)
    )

    setAmount(String(order.amount))

    setStatus(order.status)
  }, [order])

  if (!order) return null

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    onSave({
      ...order,
      customerId: Number(customerId),
      amount: Number(amount),
      status,
    })

    onClose()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-2xl bg-(--card-bg) p-6">
        <h2 className="mb-4 text-xl font-bold">
          Edit Order
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="number"
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
                e.target.value as
                  | 'paid'
                  | 'pending'
                  | 'cancelled'
              )
            }
            className="w-full rounded-xl border p-2 bg-(--card-bg)"
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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}