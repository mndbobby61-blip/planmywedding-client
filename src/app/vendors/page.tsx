"use client";

import { useMemo, useState } from "react";
import VendorCard from "@/components/vendors/VendorCard";
import VendorCardSkeleton from "@/components/vendors/VendorCardSkeleton";
import VendorFilterBar from "@/components/vendors/VendorFilterBar";
import Pagination from "@/components/shared/Pagination";
import { MOCK_VENDORS } from "@/lib/mock-vendors";
import { VendorFilters } from "@/types/vendor.types";

const PAGE_SIZE = 8;

export default function VendorsPage() {
  const [filters, setFilters] = useState<VendorFilters>({});
  const [page, setPage] = useState(1);
  const [isLoading] = useState(false);

  const filtered = useMemo(() => {
    return MOCK_VENDORS.filter((vendor) => {
      if (filters.search && !vendor.name.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      if (filters.location && vendor.location !== filters.location) {
        return false;
      }
      return true;
    });
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  return (
    <section className="container-page py-10">
      <h1 className="font-display text-2xl text-plum-700 mb-6">Find vendors</h1>
      <VendorFilterBar onChange={(next) => setFilters((prev) => ({ ...prev, ...next }))} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: PAGE_SIZE }).map((_, i) => <VendorCardSkeleton key={i} />)
          : filtered.map((vendor) => <VendorCard key={vendor.id} vendor={vendor} />)}
      </div>

      {!isLoading && filtered.length === 0 && (
        <p className="font-body text-sm text-charcoal/60 text-center py-16">
          No vendors match your search. Try a different filter.
        </p>
      )}

      {totalPages > 1 && <Pagination page={page} totalPages={totalPages} onChange={setPage} />}
    </section>
  );
}
