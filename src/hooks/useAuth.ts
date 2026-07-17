"use client";

import { useState, useEffect } from "react";

interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("pmw_token") : null;
    // TODO: replace with real /api/auth/me call once backend is ready
    setUser(token ? { id: "1", name: "Demo user", email: "demo@planmywedding.ai" } : null);
    setIsLoading(false);
  }, []);

  return { user, isLoading, isAuthenticated: Boolean(user) };
}
