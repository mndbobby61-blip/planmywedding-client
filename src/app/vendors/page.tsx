"use client";

import { useState } from "react";
import VendorCard from "@/components/vendors/VendorCard";
import VendorCardSkeleton from "@/components/vendors/VendorCardSkeleton";
import VendorFilterBar from "@/components/vendors/VendorFilterBar";
import Pagination from "@/components/shared/Pagination";
import { useVendors } from "@/features/vendors/useVendors";
import { VendorFilters } from "@/types/vendor.types";

const PAGE_SIZE = 8;

export default function VendorsPage({ searchParams }: { searchParams: { category?: string } }) {
  const [filters, setFilters] = useState<VendorFilters>({
    category: (searchParams?.category as any) || undefined,
  });
  const [page, setPage] = useState(1);

  // useVendors hook will now fetch from backend with filters applied
  const { data, isLoading, isError } = useVendors({ ...filters, page });
  
  const vendors = data?.vendors || [];
  const totalPages = data?.pagination?.totalPages || 1;

  return (
    <section className="container-page py-10">
      <h1 className="font-display text-2xl text-plum-700 mb-6">Find vendors</h1>
      <VendorFilterBar 
        initialCategory={searchParams?.category}
        onChange={(next) => setFilters((prev) => ({ ...prev, ...next, page: 1 }))} 
      />

      {isError && (
        <p className="font-body text-sm text-blush-800 bg-blush-400/10 rounded-md px-4 py-3 mb-6">
          Failed to load vendors. Please try again.
        </p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: PAGE_SIZE }).map((_, i) => <VendorCardSkeleton key={i} />)
          : vendors.map((vendor) => <VendorCard key={vendor.id} vendor={vendor} />)}
      </div>

      {!isLoading && vendors.length === 0 && (
        <p className="font-body text-sm text-charcoal/60 text-center py-16">
          No vendors match your search. Try a different filter.
        </p>
      )}

      {totalPages > 1 && <Pagination page={page} totalPages={totalPages} onChange={setPage} />}
    </section>
  );
}
