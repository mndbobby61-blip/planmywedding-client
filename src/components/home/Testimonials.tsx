const TESTIMONIALS = [
  {
    quote: "The AI planner found our venue and photographer in one afternoon.",
    name: "Nafisa and Rafi",
  },
  {
    quote: "Budget suggestions from the chat assistant kept us on track the whole time.",
    name: "Ishrat and Tanvir",
  },
  {
    quote: "Booking every vendor from one dashboard saved us weeks of calls.",
    name: "Mou and Shanto",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-plum-700 py-14">
      <div className="container-page">
        <h2 className="font-display text-2xl text-ivory mb-8 text-center">Real couples, real weddings</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-plum-600/60 rounded-xl p-6">
              <p className="font-body text-sm text-plum-50 mb-4 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <p className="font-body text-xs text-gold-400">{t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
