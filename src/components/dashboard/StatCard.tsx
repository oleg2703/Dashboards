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
    <div className="stat-card rounded-1xl">
      <h3 className="text-sm text-(--text-secondary)">
        {title}
      </h3>

      <p className=" text-1xl font-bold">
        {value}
      </p>

      <p className="text-sm text-green-500">
        {change}
      </p>
    </div>
  )
}