import { SearchX } from 'lucide-react'

interface EmptyStateProps {
  title: string
  description?: string
}

export default function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-(--border) py-16">
      <SearchX
        size={56}
        className="mb-4 text-gray-400"
      />

      <h2 className="text-xl font-semibold">
        {title}
      </h2>

      {description && (
        <p className="mt-2 text-center text-sm text-gray-500">
          {description}
        </p>
      )}
    </div>
  )
}