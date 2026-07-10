import { X } from 'lucide-react'

interface ModalHeaderProps {
  title: string
  onClose: () => void
}

export function ModalHeader({
  title,
  onClose,
}: ModalHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b p-5">
      <h2 className="text-xl font-semibold">
        {title}
      </h2>

      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="rounded-md p-2 hover:bg-muted"
      >
        <X size={18} />
      </button>
    </div>
  )
}