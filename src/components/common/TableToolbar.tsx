import { Plus } from 'lucide-react'
import { Button } from '../ui/Button'
import { SearchInput } from '../ui/SearchInput'

interface TableToolbarProps {
  search?: string
  onSearchChange?: (value: string) => void

  addLabel?: string
  onAdd?: () => void

  sortOrder?: 'asc' | 'desc'
  onSort?: () => void

  filterValue?: string
  onFilterChange?: (value: string) => void
  filterOptions?: string[]
}

export default function TableToolbar({
  search,
  onSearchChange,
  addLabel,
  onAdd,
  sortOrder,
  onSort,
  filterValue,
  onFilterChange,
  filterOptions,
}: TableToolbarProps) {
  return (
    <div className="my-4 flex flex-wrap items-center gap-4">
      {addLabel && onAdd && (
        <Button onClick={onAdd} leftIcon={<Plus size={18} />}>
          {addLabel}
        </Button>
      )}

      {onSort && (
        <button
          onClick={onSort}
          className="rounded-xl border border-(--border) bg-(--card-bg) px-4 py-2"
        >
          {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      )}
      {search !== undefined && onSearchChange && (
        <SearchInput
          value={search}
          placeholder="Search..."
          onChange={(e) => onSearchChange(e.target.value)}
          onClear={() => onSearchChange('')}
        />
      )}

      {filterOptions && onFilterChange && (
        <select
          value={filterValue}
          onChange={(e) => onFilterChange(e.target.value)}
          className="rounded-xl border border-(--border) bg-(--card-bg) px-4 py-2"
        >
          {filterOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}
