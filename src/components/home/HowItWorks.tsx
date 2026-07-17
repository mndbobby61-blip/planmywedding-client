const STEPS = [
  { title: "Tell us your plan", body: "Share your budget, guest count and city." },
  { title: "Get AI matches", body: "Our AI recommends vendors that fit your plan." },
  { title: "Book with confidence", body: "Compare, chat and book directly on the platform." },
];

export default function HowItWorks() {
  return (
    <section className="bg-plum-50 py-14">
      <div className="container-page">
        <h2 className="font-display text-2xl text-plum-700 mb-8 text-center">How it works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map((step, i) => (
            <div key={step.title} className="bg-white rounded-xl border border-gold-200/40 p-6">
              <p className="font-display text-2xl text-gold-600 mb-3">{i + 1}</p>
              <p className="font-body text-sm font-medium text-charcoal mb-1">{step.title}</p>
              <p className="font-body text-sm text-charcoal/60">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
