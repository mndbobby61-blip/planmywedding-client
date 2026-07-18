"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/axios";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadUser = async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("pmw_token") : null;
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }
    try {
      const { data } = await api.get<{ user: AuthUser }>("/auth/me");
      setUser(data.user);
    } catch {
      localStorage.removeItem("pmw_token");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("pmw_token");
    setUser(null);
  };

  return { user, isLoading, isAuthenticated: Boolean(user), refetch: loadUser, logout };
}
