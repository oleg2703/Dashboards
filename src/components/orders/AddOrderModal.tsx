import { useState } from 'react'
import type { Order } from '#/types/order'

interface AddOrderModalProps {
  onClose: () => void
  onAdd: (order: Omit<Order, 'id'>) => void
}

export default function AddOrderModal({ onClose, onAdd }: AddOrderModalProps) {
  const [customerId, setCustomerId] = useState('')
  const [amount, setAmount] = useState('')
  const [status, setStatus] = useState<'paid' | 'pending' | 'cancelled'>('pending')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    
    if (!customerId || !amount) {
      return
    }
    const parsedCustomerId = Number(customerId)
    const parsedAmount = Number(amount)
    if (isNaN(parsedCustomerId) || isNaN(parsedAmount)) {
      return
    }
    onAdd({
      customerId: parsedCustomerId,
      amount: parsedAmount,
      status,
      date: new Date().toISOString().split('T')[0],
    })

    onClose()
  }

  return (
    
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md rounded-2xl bg-(--card-bg) p-6 border border-(--border) shadow-xl mx-4"
        onClick={(e) => e.stopPropagation()} 
      >
        <h2 className="mb-4 text-xl font-bold">Add Order</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Customer ID</label>
            <input
              type="number"
              required
              min="1"
              placeholder="e.g. 12345"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              className="w-full rounded-xl border border-(--border) bg-(--card-bg) p-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Amount ($)</label>
            <input
              type="number"
              required
              min="0.01"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-xl border border-(--border) bg-(--card-bg) p-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select 
              value={status}
              onChange={(e) => setStatus(e.target.value as 'paid' | 'pending' | 'cancelled')}
              className="w-full rounded-xl border border-(--border) bg-(--card-bg) p-2 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button 
              type="button" 
              onClick={onClose} 
              className="rounded-xl border border-(--border) px-4 py-2 hover:bg-(--border) transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="rounded-xl bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition-colors"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}