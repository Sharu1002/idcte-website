export default function StatStrip({
  stats,
}: {
  stats: { value: string; label: string }[];
}) {
  return (
    <div className="grid grid-cols-1 gap-10 text-center sm:grid-cols-3 sm:gap-6">
      {stats.map((stat) => (
        <div key={stat.label}>
          <p className="font-display text-5xl uppercase leading-none text-brand-500 sm:text-6xl">
            {stat.value}
          </p>
          <p className="mx-auto mt-4 max-w-[220px] text-sm font-semibold uppercase tracking-wide leading-snug text-brand-900">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
