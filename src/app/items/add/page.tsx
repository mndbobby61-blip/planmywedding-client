"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import { useCreateVendor } from "@/features/vendors/useVendorMutations";
import { VendorCategory } from "@/types/vendor.types";

export default function AddItemPage() {
  const { mutateAsync: createVendor, isPending } = useCreateVendor();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    fullDescription: "",
    location: "",
    category: "venue" as VendorCategory,
    priceFrom: "",
    coverImage: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await createVendor({
        name: formData.name,
        description: formData.fullDescription || formData.description, // API takes description
        category: formData.category,
        location: formData.location,
        priceFrom: Number(formData.priceFrom),
        ...(formData.coverImage ? { coverImage: formData.coverImage } : {}),
      });
      setSubmitted(true);
      setFormData({
        name: "",
        description: "",
        fullDescription: "",
        location: "",
        category: "venue",
        priceFrom: "",
        coverImage: "",
      });
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <ProtectedRoute>
      <section className="container-page py-10 max-w-2xl mx-auto">
        <h1 className="font-display text-2xl text-plum-700 mb-6">List your service</h1>

        {submitted && (
          <p className="font-body text-sm text-charcoal bg-plum-50 rounded-md px-4 py-3 mb-6">
            Your service was successfully added!
          </p>
        )}
        {error && (
          <p className="font-body text-sm text-blush-800 bg-blush-400/10 rounded-md px-4 py-3 mb-6">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-body text-xs text-charcoal/60 block mb-1">Title</label>
            <input
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Riverside manor"
              className="w-full border border-gold-200/60 rounded-md px-4 py-2.5 text-sm font-body focus:outline-none focus:ring-2 focus:ring-plum-400"
            />
          </div>

          <div>
            <label className="font-body text-xs text-charcoal/60 block mb-1">Short description</label>
            <input
              required
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="One line that appears on the vendor card"
              className="w-full border border-gold-200/60 rounded-md px-4 py-2.5 text-sm font-body focus:outline-none focus:ring-2 focus:ring-plum-400"
            />
          </div>

          <div>
            <label className="font-body text-xs text-charcoal/60 block mb-1">Full description</label>
            <textarea
              required
              name="fullDescription"
              value={formData.fullDescription}
              onChange={handleChange}
              rows={4}
              placeholder="Describe the venue, packages and what makes it unique"
              className="w-full border border-gold-200/60 rounded-md px-4 py-2.5 text-sm font-body focus:outline-none focus:ring-2 focus:ring-plum-400"
            />
          </div>

          <div>
            <label className="font-body text-xs text-charcoal/60 block mb-1">Location</label>
            <input
              required
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Dhaka, Bangladesh"
              className="w-full border border-gold-200/60 rounded-md px-4 py-2.5 text-sm font-body focus:outline-none focus:ring-2 focus:ring-plum-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-body text-xs text-charcoal/60 block mb-1">Category</label>
              <select 
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gold-200/60 rounded-md px-4 py-2.5 text-sm font-body"
              >
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
                name="priceFrom"
                value={formData.priceFrom}
                onChange={handleChange}
                min={0}
                placeholder="45000"
                className="w-full border border-gold-200/60 rounded-md px-4 py-2.5 text-sm font-body focus:outline-none focus:ring-2 focus:ring-plum-400"
              />
            </div>
          </div>

          <div>
            <label className="font-body text-xs text-charcoal/60 block mb-1">Image URL (optional)</label>
            <input
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full border border-gold-200/60 rounded-md px-4 py-2.5 text-sm font-body focus:outline-none focus:ring-2 focus:ring-plum-400"
            />
          </div>

          <button type="submit" disabled={isPending} className="btn-primary w-full disabled:opacity-60">
            {isPending ? "Submitting..." : "Submit"}
          </button>
        </form>
      </section>
    </ProtectedRoute>
  );
}
