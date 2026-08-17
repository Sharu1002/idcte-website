export default function StatStrip({
  stats,
}: {
  stats: { value: string; label: string }[];
}) {
  return (
    <div className="flex flex-col items-center gap-10 text-center sm:flex-row sm:justify-center sm:gap-24">
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
