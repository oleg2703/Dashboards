import { useState } from 'react'

export function useModal<T>() {
  const [selected, setSelected] = useState<T | null>(null)

  const [editing, setEditing] = useState<T | null>(null)

  const [deleting, setDeleting] = useState<T | null>(null)

  const [isAddOpen, setIsAddOpen] = useState(false)

  const openView = (item: T) => setSelected(item)

  const openEdit = (item: T) => setEditing(item)

  const openDelete = (item: T) => setDeleting(item)

  const closeView = () => setSelected(null)

  const closeEdit = () => setEditing(null)

  const closeDelete = () => setDeleting(null)

  const openAdd = () => setIsAddOpen(true)

  const closeAdd = () => setIsAddOpen(false)

  return {
    selected,
    editing,
    deleting,
    isAddOpen,

    openView,
    openEdit,
    openDelete,

    closeView,
    closeEdit,
    closeDelete,

    openAdd,
    closeAdd,
  }
}
