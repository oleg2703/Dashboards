interface TableSkeletonProps {
  rows?: number
  columns?: number
}

export default function TableSkeleton({
  rows = 5,
  columns = 6,
}: TableSkeletonProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-(--border)">
      <table className="w-full">
        <thead>
          <tr>
            {Array.from({ length: columns }).map((_, i) => (
              <th key={i} className="border-b border-(--border) p-4">
                <div className="h-4 w-20 animate-pulse rounded bg-gray-300 dark:bg-gray-700" />
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: rows }).map((_, row) => (
            <tr key={row}>
              {Array.from({ length: columns }).map((_, col) => (
                <td key={col} className="border-b border-(--border) p-4">
                  <div className="h-4 w-full animate-pulse rounded bg-gray-300 dark:bg-gray-700" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
