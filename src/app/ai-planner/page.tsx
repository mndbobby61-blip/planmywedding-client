"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import RecommendationForm, { RecommendationInput } from "@/components/ai/RecommendationForm";
import RecommendationResults from "@/components/ai/RecommendationResults";
import { MOCK_VENDORS } from "@/lib/mock-vendors";
import { Vendor } from "@/types/vendor.types";

export default function AiPlannerPage() {
  const [results, setResults] = useState<Vendor[]>([]);

  const handleSubmit = (input: RecommendationInput) => {
    // TODO: replace with POST /api/ai/recommend { input } once backend is ready.
    // The backend combines this input with vendor data and an LLM prompt to
    // return a ranked, reasoned list of matches.
    const matches = MOCK_VENDORS.filter((v) => v.location === input.location);
    setResults(matches.length > 0 ? matches : MOCK_VENDORS);
  };

  return (
    <ProtectedRoute>
      <section className="container-page py-10 space-y-8">
        <h1 className="font-display text-2xl text-plum-700 text-center">AI wedding planner</h1>
        <RecommendationForm onSubmit={handleSubmit} />
        <RecommendationResults vendors={results} />
      </section>
    </ProtectedRoute>
  );
}
