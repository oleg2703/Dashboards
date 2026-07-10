import { createPortal } from 'react-dom'
import { useEffect } from 'react'

interface ModalProps {
  open: boolean
  children: React.ReactNode
  onClose: () => void
}

export function Modal({
  open,
  children,
  onClose,
}: ModalProps) {
  useEffect(() => {
    if (!open) return

    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl bg-background shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}