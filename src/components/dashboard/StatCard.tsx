interface StatCardProps {
  title: string
  value: string | number
  change?: string
}

export function StatCard({ title, value, change }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-(--border) bg-(--card-bg) p-4">
      <h3 className="text-sm text-(--text-secondary)">{title}</h3>

      <p className="mt-2 text-2xl font-bold">{value}</p>

      {change && <p className="mt-1 text-sm text-green-500">{change}</p>}
    </div>
  )
}
