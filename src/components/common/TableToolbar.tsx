import { Plus, Search } from 'lucide-react'
import { Button } from '../ui/Button'

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
      <Button
        onClick={onAdd} 
        leftIcon={<Plus size={18}/>}>
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
        <div className="flex items-center gap-2 rounded-xl border border-(--border) bg-(--card-bg) px-3">
          <Search size={18} />

          <input
            value={search}
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
            placeholder="Search..."
            className="bg-transparent py-2 outline-none"
          />
        </div>
      )}

      {filterOptions && onFilterChange && (
        <select
          value={filterValue}
          onChange={(e) =>
            onFilterChange(e.target.value)
          }
          className="rounded-xl border border-(--border) bg-(--card-bg) px-4 py-2"
        >
          {filterOptions.map((option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}