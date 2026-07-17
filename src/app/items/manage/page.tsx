"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, Trash2 } from "lucide-react";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import { MOCK_VENDORS } from "@/lib/mock-vendors";

export default function ManageItemsPage() {
  const [items, setItems] = useState(MOCK_VENDORS);

  const handleDelete = (id: string) => {
    // TODO: call DELETE /api/vendors/:id once backend is ready
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <ProtectedRoute>
      <section className="container-page py-10">
        <h1 className="font-display text-2xl text-plum-700 mb-6">My listed services</h1>

        {items.length === 0 ? (
          <p className="font-body text-sm text-charcoal/60">
            You haven&apos;t listed anything yet.{" "}
            <Link href="/items/add" className="text-plum-600 hover:underline">
              Add your first service
            </Link>
          </p>
        ) : (
          <div className="bg-white rounded-xl border border-gold-200/60 overflow-hidden">
            <table className="w-full text-left font-body text-sm">
              <thead className="bg-plum-50 text-charcoal/60">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Rating</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-t border-gold-200/40">
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3 capitalize">{item.category}</td>
                    <td className="px-4 py-3">৳{item.priceFrom.toLocaleString()}</td>
                    <td className="px-4 py-3">{item.rating.toFixed(1)}</td>
                    <td className="px-4 py-3 flex gap-3">
                      <Link href={`/vendors/${item.id}`} aria-label="View" className="text-plum-600">
                        <Eye size={16} />
                      </Link>
                      <button onClick={() => handleDelete(item.id)} aria-label="Delete" className="text-blush-800">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </ProtectedRoute>
  );
}
