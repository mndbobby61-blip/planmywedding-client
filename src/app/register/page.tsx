"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
  };

  return (
    <section className="container-page py-16 max-w-md mx-auto">
      <h1 className="font-display text-2xl text-plum-700 mb-6 text-center">Create your account</h1>

      {error && <p className="font-body text-sm text-blush-800 bg-blush-400/10 rounded-md px-4 py-2 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-body text-xs text-charcoal/60 block mb-1">Full name</label>
          <input
            required
            placeholder="Your name"
            className="w-full border border-gold-200/60 rounded-md px-4 py-2.5 text-sm font-body focus:outline-none focus:ring-2 focus:ring-plum-400"
          />
        </div>
        <div>
          <label className="font-body text-xs text-charcoal/60 block mb-1">Email</label>
          <input
            required
            type="email"
            placeholder="you@example.com"
            className="w-full border border-gold-200/60 rounded-md px-4 py-2.5 text-sm font-body focus:outline-none focus:ring-2 focus:ring-plum-400"
          />
        </div>
        <div>
          <label className="font-body text-xs text-charcoal/60 block mb-1">Password</label>
          <input
            required
            type="password"
            minLength={8}
            placeholder="At least 8 characters"
            className="w-full border border-gold-200/60 rounded-md px-4 py-2.5 text-sm font-body focus:outline-none focus:ring-2 focus:ring-plum-400"
          />
        </div>

        <button type="submit" className="btn-primary w-full">
          Create account
        </button>
        <button type="button" className="w-full border border-gold-200/60 rounded-md py-3 text-sm font-body">
          Continue with Google
        </button>
      </form>

      <p className="font-body text-sm text-charcoal/60 text-center mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-plum-600 hover:underline">
          Log in
        </Link>
      </p>
    </section>
  );
}
