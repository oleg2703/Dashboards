import { useEffect, useMemo, useState } from 'react'
import { useDebounce } from './useDebounce'

interface UseTableProps<T> {
  data: T[]
  itemsPerPage?: number

  searchFn?: (
    item: T,
    search: string
  ) => boolean

  filterFn?: (
    item: T,
    filter: string
  ) => boolean

  sortFn?: (
    a: T,
    b: T,
    order: 'asc' | 'desc'
  ) => number

  defaultFilter?: string
  defaultSort?: 'asc' | 'desc'
}

export function useTable<T>({
  data,
  itemsPerPage = 5,
  searchFn,
  filterFn,
  sortFn,
  defaultFilter = 'All',
  defaultSort = 'asc',
}: UseTableProps<T>) {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)
  const [filter, setFilter] =
    useState(defaultFilter)

 const [sortOrder, setSortOrder] =
  useState<'asc' | 'desc'>(defaultSort)
    const toggleSort = () => {
  setSortOrder((prev) =>
    prev === 'asc' ? 'desc' : 'asc'
  )
}

  const [currentPage, setCurrentPage] =
    useState(1)

 useEffect(() => {
  setCurrentPage(1)
}, [debouncedSearch, filter])

  const processedData = useMemo(() => {
    let result = [...data]

    if (searchFn) {
        result = result.filter((item) =>
          searchFn(item, debouncedSearch)
        )
      }

    if (filterFn) {
      result = result.filter((item) =>
        filterFn(item, filter)
      )
    }

    if (sortFn) {
      result.sort((a, b) =>
        sortFn(a, b, sortOrder)
      )
    }

    return result
  }, [
  data,
  debouncedSearch,
  filter,
  sortOrder,
  searchFn,
  filterFn,
  sortFn,
])

  const totalPages = Math.max(
    1,
    Math.ceil(
      processedData.length /
        itemsPerPage
    )
  )

  const paginatedData =
    processedData.slice(
      (currentPage - 1) *
        itemsPerPage,
      currentPage * itemsPerPage
    )

  return {
  data: processedData,
  paginatedData,

  search,
  setSearch,

  filter,
  setFilter,

  sortOrder,
  setSortOrder,
  toggleSort,

  currentPage,
  setCurrentPage,

  totalPages,
}
}