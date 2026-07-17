import Link from "next/link";

const SLIDES = [
  { label: "Ceremony decor", gradient: "from-[#6E4C87] to-[#3C2A4D]" },
  { label: "Riverside venue", gradient: "from-[#D9B26C] to-[#8A6234]" },
  { label: "Bridal moments", gradient: "from-[#9C3D6B] to-[#5A1F3D]" },
  { label: "Table styling", gradient: "from-[#8C6BA0] to-[#3C2A4D]" },
];

export default function HeroSection() {
  return (
    <section className="container-page grid md:grid-cols-2 gap-9 items-center py-14">
      <div>
        <p className="font-body text-xs tracking-[0.2em] text-gold-600 uppercase mb-4">
          AI-powered wedding planning
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-plum-700 leading-tight mb-5">
          Every detail of your day, planned with care
        </h1>
        <p className="font-body text-sm text-charcoal/70 max-w-md mb-7 leading-relaxed">
          Trusted venues, photographers and caterers, matched to your budget and taste by AI.
        </p>
        <div className="flex gap-3 mb-8">
          <Link href="/ai-planner" className="btn-primary">
            Start planning
          </Link>
          <Link href="/ai-chat" className="btn-secondary">
            Ask the AI assistant
          </Link>
        </div>
        <div className="flex gap-7 font-body">
          <div>
            <p className="text-xl font-medium text-plum-700">1,200+</p>
            <p className="text-xs text-charcoal/50">trusted vendors</p>
          </div>
          <div>
            <p className="text-xl font-medium text-plum-700">8,500+</p>
            <p className="text-xs text-charcoal/50">weddings planned</p>
          </div>
        </div>
      </div>

      <div className="relative rounded-2xl overflow-hidden h-80">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.label}
            className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} flex items-end p-4 animate-hero-fade`}
            style={{ animationDelay: `${i * 4}s` }}
          >
            <span className="font-body text-xs text-white bg-black/20 px-3 py-1.5 rounded-full">
              {slide.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
