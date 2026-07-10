interface ModalBodyProps {
  children: React.ReactNode
}

export function ModalBody({
  children,
}: ModalBodyProps) {
  return (
    <div className="p-5">
      {children}
    </div>
  )
}