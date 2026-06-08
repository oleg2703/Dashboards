interface StatCardProps {
  title: string
  value: string | number
  change: string
}

export function StatCard({
  title,
  value,
  change,
}: StatCardProps) {
  return (
    <div className="stat-card rounded-2xl p-6">
      <h3 className="text-sm text-(--text-secondary)">
        {title}
      </h3>

      <p className="mt-2 text-3xl font-bold">
        {value}
      </p>

      <p className="mt-2 text-sm text-green-500">
        {change}
      </p>
    </div>
  )
}