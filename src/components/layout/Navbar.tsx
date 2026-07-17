"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const LOGGED_OUT_LINKS = [
  { href: "/vendors", label: "Vendors" },
  { href: "/ai-planner", label: "AI planner" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const [isLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ivory border-b border-gold-200/40">
      <nav className="container-page flex items-center justify-between h-16">
        <Link href="/" className="font-display text-xl text-plum-700">
          PlanMyWedding<span className="text-gold-600">.ai</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 font-body text-sm text-charcoal">
          {LOGGED_OUT_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-plum-600 transition-colors">
              {link.label}
            </Link>
          ))}
          {isLoggedIn ? (
            <Link href="/dashboard" className="hover:text-plum-600 transition-colors">
              Dashboard
            </Link>
          ) : null}
          <Link href="/login" className="btn-primary">
            {isLoggedIn ? "My account" : "Get started"}
          </Link>
        </div>

        <button
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label="Toggle menu"
          className="md:hidden text-plum-700"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden container-page pb-4 flex flex-col gap-3 font-body text-sm text-charcoal">
          {LOGGED_OUT_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link href="/login" onClick={() => setIsMenuOpen(false)} className="btn-primary text-center">
            {isLoggedIn ? "My account" : "Get started"}
          </Link>
        </div>
      )}
    </header>
  );
}
