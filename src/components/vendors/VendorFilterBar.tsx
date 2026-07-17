"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { VendorFilters } from "@/types/vendor.types";

export default function VendorFilterBar({
  onChange,
}: {
  onChange: (filters: VendorFilters) => void;
}) {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col md:flex-row gap-3 mb-6">
      <div className="flex-1 flex items-center gap-2 bg-white border border-gold-200/60 rounded-lg px-4 py-2.5">
        <Search size={16} className="text-charcoal/50" />
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            onChange({ search: e.target.value });
          }}
          placeholder="Search venues, photographers, caterers"
          className="flex-1 text-sm font-body focus:outline-none bg-transparent"
        />
      </div>

      <select
        onChange={(e) => onChange({ location: e.target.value || undefined })}
        className="border border-gold-200/60 rounded-lg px-4 py-2.5 text-sm font-body bg-white"
      >
        <option value="">Location</option>
        <option value="Dhaka">Dhaka</option>
        <option value="Chattogram">Chattogram</option>
        <option value="Sylhet">Sylhet</option>
      </select>

      <select
        onChange={(e) =>
          onChange({ sortBy: (e.target.value || undefined) as VendorFilters["sortBy"] })
        }
        className="border border-gold-200/60 rounded-lg px-4 py-2.5 text-sm font-body bg-white"
      >
        <option value="rating">Sort: top rated</option>
        <option value="priceAsc">Price: low to high</option>
        <option value="priceDesc">Price: high to low</option>
        <option value="newest">Newest</option>
      </select>
    </div>
  );
}
