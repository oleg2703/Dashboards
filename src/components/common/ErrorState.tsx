import { AlertTriangle } from 'lucide-react'

interface ErrorStateProps {
  title?: string
  description?: string
  onRetry: () => void
}

export default function ErrorState({
  title = 'Something went wrong',
  description = 'Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-red-200 bg-red-50 py-16 text-center">
      <AlertTriangle size={48} className="mb-4 text-red-500" />

      <h2 className="text-xl font-semibold">{title}</h2>

      <p className="mt-2 text-gray-600">{description}</p>

      <button
        onClick={onRetry}
        className="mt-6 rounded-xl bg-red-500 px-5 py-2 text-white transition hover:bg-red-600"
      >
        Retry
      </button>
    </div>
  )
}
