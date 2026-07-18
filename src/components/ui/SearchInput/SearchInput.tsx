import { Search, X } from 'lucide-react'
import type { InputHTMLAttributes } from 'react'

import { Input } from '../Input'

interface SearchInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  onClear?: () => void
}

export function SearchInput({
  value,
  onClear,
  className,
  ...props
}: SearchInputProps) {
  return (
    <div className="relative">
      <Search
        size={18}
        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
      />

      <Input
        {...props}
        value={value}
        className={`pl-10 pr-10 ${className ?? ''}`}
      />

      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={onClear}
          className="absolute top-1/2 right-3 -translate-y-1/2 rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <X size={16} />
        </button>
      )}
    </div>
  )
}
