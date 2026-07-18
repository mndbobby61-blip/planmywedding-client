"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handles the redirect back from Google OAuth (?token=...)
  useEffect(() => {
    const token = searchParams.get("token");
    const oauthError = searchParams.get("error");

    if (token) {
      localStorage.setItem("pmw_token", token);
      router.replace("/");
    } else if (oauthError) {
      setError("Google sign-in failed. Please try again.");
    }
  }, [searchParams, router]);

  const login = async (loginEmail: string, loginPassword: string) => {
    setError("");
    setIsLoading(true);
    try {
      const { data } = await api.post("/auth/login", { email: loginEmail, password: loginPassword });
      localStorage.setItem("pmw_token", data.token);
      router.push("/");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  const handleDemoLogin = () => {
    setEmail("demo@planmywedding.ai");
    setPassword("demo1234");
    login("demo@planmywedding.ai", "demo1234");
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE}/auth/google`;
  };

  return (
    <section className="container-page py-16 max-w-md mx-auto">
      <h1 className="font-display text-2xl text-plum-700 mb-6 text-center">Welcome back</h1>

      {error && (
        <p className="font-body text-sm text-blush-800 bg-blush-400/10 rounded-md px-4 py-2 mb-4">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-body text-xs text-charcoal/60 block mb-1">Email</label>
          <input
            type="email"
            required
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
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full border border-gold-200/60 rounded-md px-4 py-2.5 text-sm font-body focus:outline-none focus:ring-2 focus:ring-plum-400"
          />
        </div>

        <button type="submit" disabled={isLoading} className="btn-primary w-full disabled:opacity-60">
          {isLoading ? "Logging in..." : "Log in"}
        </button>
        <button
          type="button"
          onClick={handleDemoLogin}
          disabled={isLoading}
          className="btn-secondary w-full disabled:opacity-60"
        >
          Use demo login
        </button>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full border border-gold-200/60 rounded-md py-3 text-sm font-body flex items-center justify-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
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
