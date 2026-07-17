"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/shared/ProtectedRoute";

export default function AddItemPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: POST to /api/vendors once backend is ready
    setSubmitted(true);
  };

  return (
    <ProtectedRoute>
      <section className="container-page py-10 max-w-2xl mx-auto">
        <h1 className="font-display text-2xl text-plum-700 mb-6">List your service</h1>

        {submitted && (
          <p className="font-body text-sm text-charcoal bg-plum-50 rounded-md px-4 py-3 mb-6">
            Your service was submitted for review.
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-body text-xs text-charcoal/60 block mb-1">Title</label>
            <input
              required
              placeholder="Riverside manor"
              className="w-full border border-gold-200/60 rounded-md px-4 py-2.5 text-sm font-body focus:outline-none focus:ring-2 focus:ring-plum-400"
            />
          </div>

          <div>
            <label className="font-body text-xs text-charcoal/60 block mb-1">Short description</label>
            <input
              required
              placeholder="One line that appears on the vendor card"
              className="w-full border border-gold-200/60 rounded-md px-4 py-2.5 text-sm font-body focus:outline-none focus:ring-2 focus:ring-plum-400"
            />
          </div>

          <div>
            <label className="font-body text-xs text-charcoal/60 block mb-1">Full description</label>
            <textarea
              required
              rows={4}
              placeholder="Describe the venue, packages and what makes it unique"
              className="w-full border border-gold-200/60 rounded-md px-4 py-2.5 text-sm font-body focus:outline-none focus:ring-2 focus:ring-plum-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-body text-xs text-charcoal/60 block mb-1">Category</label>
              <select className="w-full border border-gold-200/60 rounded-md px-4 py-2.5 text-sm font-body">
                <option value="venue">Venue</option>
                <option value="photography">Photography</option>
                <option value="catering">Catering</option>
                <option value="bridal">Bridal</option>
                <option value="decor">Decor</option>
              </select>
            </div>
            <div>
              <label className="font-body text-xs text-charcoal/60 block mb-1">Starting price (BDT)</label>
              <input
                required
                type="number"
                min={0}
                placeholder="45000"
                className="w-full border border-gold-200/60 rounded-md px-4 py-2.5 text-sm font-body focus:outline-none focus:ring-2 focus:ring-plum-400"
              />
            </div>
          </div>

          <div>
            <label className="font-body text-xs text-charcoal/60 block mb-1">Image URL (optional)</label>
            <input
              placeholder="https://..."
              className="w-full border border-gold-200/60 rounded-md px-4 py-2.5 text-sm font-body focus:outline-none focus:ring-2 focus:ring-plum-400"
            />
          </div>

          <button type="submit" className="btn-primary w-full">
            Submit
          </button>
        </form>
      </section>
    </ProtectedRoute>
  );
}
