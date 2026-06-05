interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
}

export function StatCard({
  title,
  value,
  change,
}: StatCardProps) {
  return (
    <div className=" w-1/4 justify-start p-4 border rounded shadow">
      <h3>{title}</h3>
      <p>{value}</p>
      <p>{change}</p>
    </div>
  );
}