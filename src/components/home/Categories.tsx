import Link from "next/link";
import { Building2, Camera, ChefHat, Sparkles, Flower2 } from "lucide-react";

const CATEGORIES = [
  { label: "Venues", href: "/vendors?category=venue", icon: Building2 },
  { label: "Photography", href: "/vendors?category=photography", icon: Camera },
  { label: "Catering", href: "/vendors?category=catering", icon: ChefHat },
  { label: "Bridal", href: "/vendors?category=bridal", icon: Sparkles },
  { label: "Decor", href: "/vendors?category=decor", icon: Flower2 },
];

export default function Categories() {
  return (
    <section className="container-page py-14">
      <h2 className="font-display text-2xl text-plum-700 mb-8 text-center">Browse by category</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {CATEGORIES.map(({ label, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="flex flex-col items-center gap-2 bg-white rounded-xl border border-gold-200/40 py-6 hover:border-plum-400/60 transition-colors"
          >
            <Icon size={22} className="text-plum-600" />
            <span className="font-body text-sm text-charcoal">{label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
