"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const LOGGED_OUT_LINKS = [
  { href: "/vendors", label: "Vendors" },
  { href: "/ai-planner", label: "AI planner" },
  { href: "/blog", label: "Blog" },
];

const LOGGED_IN_LINKS = [
  ...LOGGED_OUT_LINKS,
  { href: "/ai-chat", label: "AI chat" },
  { href: "/items/manage", label: "My services" },
];

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = isAuthenticated ? LOGGED_IN_LINKS : LOGGED_OUT_LINKS;

  return (
    <header className="sticky top-0 z-50 bg-ivory border-b border-gold-200/40">
      <nav className="container-page flex items-center justify-between h-16">
        <Link href="/" className="font-display text-xl text-plum-700">
          PlanMyWedding<span className="text-gold-600">.ai</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 font-body text-sm text-charcoal">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-plum-600 transition-colors">
              {link.label}
            </Link>
          ))}

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-plum-600 text-ivory flex items-center justify-center text-xs font-medium">
                  {user?.name?.[0]?.toUpperCase() ?? "U"}
                </div>
              )}
              <button onClick={logout} className="btn-secondary">
                Log out
              </button>
            </div>
          ) : (
            <Link href="/login" className="btn-primary">
              Get started
            </Link>
          )}
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
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <button onClick={logout} className="btn-secondary text-center">
              Log out
            </button>
          ) : (
            <Link href="/login" onClick={() => setIsMenuOpen(false)} className="btn-primary text-center">
              Get started
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
