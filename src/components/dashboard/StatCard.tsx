interface StatCardProps {
  title: string
  value: string | number
  change?: string
  tone?: 'positive' | 'warning' | 'neutral'
}

const toneClassMap: Record<NonNullable<StatCardProps['tone']>, string> = {
  positive: 'text-green-500',
  warning: 'text-amber-500',
  neutral: 'text-(--text-secondary)',
}

export function StatCard({ title, value, change, tone = 'positive' }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-(--border) bg-(--card-bg) p-4">
      <h3 className="text-sm text-(--text-secondary)">{title}</h3>

      <p className="mt-2 text-2xl font-bold">{value}</p>

      {change && (
        <p className={`mt-1 text-sm ${toneClassMap[tone]}`}>{change}</p>
      )}
    </div>
  )
}
