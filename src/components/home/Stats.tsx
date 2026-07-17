const STATS = [
  { value: "1,200+", label: "verified vendors" },
  { value: "8,500+", label: "weddings planned" },
  { value: "64", label: "cities covered" },
  { value: "4.8/5", label: "average vendor rating" },
];

export default function Stats() {
  return (
    <section className="container-page py-14">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-plum-50 rounded-xl p-5 text-center">
            <p className="font-display text-2xl text-plum-700">{stat.value}</p>
            <p className="font-body text-xs text-charcoal/60 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
