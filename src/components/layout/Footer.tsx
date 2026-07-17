import Link from "next/link";

const COLUMNS = [
  {
    title: "Explore",
    links: [
      { href: "/vendors", label: "Vendors" },
      { href: "/ai-planner", label: "AI planner" },
      { href: "/ai-chat", label: "AI chat assistant" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/terms", label: "Terms" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-plum-900 text-ivory mt-24">
      <div className="container-page py-14 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2">
          <p className="font-display text-lg mb-3">
            PlanMyWedding<span className="text-gold-400">.ai</span>
          </p>
          <p className="text-sm text-plum-200 max-w-xs">
            AI-matched venues, photographers and caterers for your wedding day.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-medium mb-3 text-gold-400">{col.title}</p>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-plum-200 hover:text-ivory transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-plum-700 py-5 text-center text-xs text-plum-200">
        © {new Date().getFullYear()} PlanMyWedding.ai. All rights reserved.
      </div>
    </footer>
  );
}
