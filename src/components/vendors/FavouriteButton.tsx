"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

export default function FavouriteButton({ vendorId }: { vendorId: string }) {
  const [isFavourited, setIsFavourited] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkStatus() {
      try {
        const token = localStorage.getItem("pmw_token");
        if (!token) {
          setIsLoading(false);
          return;
        }
        const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";
        const res = await fetch(`${API_BASE}/favourites/check/${vendorId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setIsFavourited(data.favorited);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    checkStatus();
  }, [vendorId]);

  const toggleFavourite = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating if inside a Link
    e.stopPropagation();

    const token = localStorage.getItem("pmw_token");
    if (!token) {
      alert("Please log in to favourite vendors.");
      return;
    }

    try {
      setIsFavourited(!isFavourited); // Optimistic UI update
      const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";
      const res = await fetch(`${API_BASE}/favourites/toggle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ vendorId }),
      });
      if (!res.ok) {
        setIsFavourited(!isFavourited); // Revert on failure
        throw new Error("Failed to toggle favourite");
      }
      const data = await res.json();
      setIsFavourited(data.favorited);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <div className="w-8 h-8 rounded-full bg-white/80 animate-pulse" />;
  }

  return (
    <button
      onClick={toggleFavourite}
      className="p-1.5 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm transition-all shadow-sm"
      aria-label="Toggle favourite"
    >
      <Heart
        size={16}
        className={isFavourited ? "text-red-500 fill-red-500" : "text-gray-500"}
      />
    </button>
  );
}
