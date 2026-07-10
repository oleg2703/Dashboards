interface ModalFooterProps {
  children: React.ReactNode
}

export function ModalFooter({
  children,
}: ModalFooterProps) {
  return (
    <div className="flex justify-end gap-3 border-t p-5">
      {children}
    </div>
  )
}