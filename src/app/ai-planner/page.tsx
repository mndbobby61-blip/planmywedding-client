"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import RecommendationForm, { RecommendationInput } from "@/components/ai/RecommendationForm";
import RecommendationResults from "@/components/ai/RecommendationResults";
import { Vendor } from "@/types/vendor.types";

export default function AiPlannerPage() {
  const [results, setResults] = useState<Vendor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (input: RecommendationInput) => {
    setIsLoading(true);
    setError("");
    setResults([]);
    try {
      const token = localStorage.getItem("pmw_token") || "";
      const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";
      const res = await fetch(`${API_BASE}/ai/recommend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(input),
      });

      if (!res.ok) {
        if (res.status === 429) {
          throw new Error("AI is currently overloaded with requests. Please try again in a minute.");
        }
        throw new Error("Failed to get recommendations");
      }
      
      const data = await res.json();
      setResults(data.matches?.map((m: any) => ({ ...m.vendor, aiReason: m.reason })) || []);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <section className="container-page py-10 space-y-8">
        <h1 className="font-display text-2xl text-plum-700 text-center">AI wedding planner</h1>
        <RecommendationForm onSubmit={handleSubmit} />
        
        {isLoading && (
          <div className="text-center py-10 animate-pulse">
            <p className="font-display text-xl text-plum-600 mb-2">Analyzing your preferences...</p>
            <p className="font-body text-sm text-charcoal/60">Our AI is finding the perfect vendors for your wedding.</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200 text-center font-body text-sm">
            {error}
          </div>
        )}

        {!isLoading && !error && <RecommendationResults vendors={results} />}
      </section>
    </ProtectedRoute>
  );
}
