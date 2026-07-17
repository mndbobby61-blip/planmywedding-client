"use client";

import { useState } from "react";

export interface RecommendationInput {
  budget: number;
  guests: number;
  location: string;
  theme: string;
}

export default function RecommendationForm({
  onSubmit,
}: {
  onSubmit: (input: RecommendationInput) => void;
}) {
  const [form, setForm] = useState<RecommendationInput>({
    budget: 500000,
    guests: 200,
    location: "Dhaka",
    theme: "Classic",
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="bg-white rounded-xl border border-gold-200/60 p-6 grid md:grid-cols-2 gap-4"
    >
      <div>
        <label className="font-body text-xs text-charcoal/60 block mb-1">Budget (BDT)</label>
        <input
          type="number"
          min={0}
          step={1000}
          value={form.budget}
          onChange={(e) => setForm({ ...form, budget: Number(e.target.value) })}
          className="w-full border border-gold-200/60 rounded-md px-4 py-2.5 text-sm font-body"
        />
      </div>

      <div>
        <label className="font-body text-xs text-charcoal/60 block mb-1">Guest count</label>
        <input
          type="number"
          min={1}
          value={form.guests}
          onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })}
          className="w-full border border-gold-200/60 rounded-md px-4 py-2.5 text-sm font-body"
        />
      </div>

      <div>
        <label className="font-body text-xs text-charcoal/60 block mb-1">Location</label>
        <select
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="w-full border border-gold-200/60 rounded-md px-4 py-2.5 text-sm font-body"
        >
          <option>Dhaka</option>
          <option>Chattogram</option>
          <option>Sylhet</option>
        </select>
      </div>

      <div>
        <label className="font-body text-xs text-charcoal/60 block mb-1">Theme</label>
        <select
          value={form.theme}
          onChange={(e) => setForm({ ...form, theme: e.target.value })}
          className="w-full border border-gold-200/60 rounded-md px-4 py-2.5 text-sm font-body"
        >
          <option>Classic</option>
          <option>Garden</option>
          <option>Royal</option>
          <option>Minimal</option>
        </select>
      </div>

      <button type="submit" className="btn-primary md:col-span-2">
        Get AI recommendations
      </button>
    </form>
  );
}
