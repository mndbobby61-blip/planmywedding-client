"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fillDemoCredentials = () => {
    setEmail("demo@planmywedding.ai");
    setPassword("demo1234");
  };

  return (
    <section className="container-page py-16 max-w-md mx-auto">
      <h1 className="font-display text-2xl text-plum-700 mb-6 text-center">Welcome back</h1>

      <form className="space-y-4">
        <div>
          <label className="font-body text-xs text-charcoal/60 block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full border border-gold-200/60 rounded-md px-4 py-2.5 text-sm font-body focus:outline-none focus:ring-2 focus:ring-plum-400"
          />
        </div>
        <div>
          <label className="font-body text-xs text-charcoal/60 block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full border border-gold-200/60 rounded-md px-4 py-2.5 text-sm font-body focus:outline-none focus:ring-2 focus:ring-plum-400"
          />
        </div>

        <button type="submit" className="btn-primary w-full">
          Log in
        </button>
        <button type="button" onClick={fillDemoCredentials} className="btn-secondary w-full">
          Use demo login
        </button>
        <button type="button" className="w-full border border-gold-200/60 rounded-md py-3 text-sm font-body">
          Continue with Google
        </button>
      </form>

      <p className="font-body text-sm text-charcoal/60 text-center mt-6">
        New here?{" "}
        <Link href="/register" className="text-plum-600 hover:underline">
          Create an account
        </Link>
      </p>
    </section>
  );
}
