import Link from "next/link";

const SLIDES = [
  { label: "Ceremony decor", image: "https://picsum.photos/seed/pmw-decor/800/600" },
  { label: "Riverside venue", image: "https://picsum.photos/seed/pmw-venue/800/600" },
  { label: "Bridal moments", image: "https://picsum.photos/seed/pmw-bridal/800/600" },
  { label: "Table styling", image: "https://picsum.photos/seed/pmw-table/800/600" },
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
            className="absolute inset-0 animate-hero-fade"
            style={{ animationDelay: `${i * 4}s` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={slide.image} alt={slide.label} className="w-full h-full object-cover" />
            <span className="absolute bottom-4 left-4 font-body text-xs text-white bg-black/40 px-3 py-1.5 rounded-full">
              {slide.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
