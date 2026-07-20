import VendorCard from "@/components/vendors/VendorCard";
import Link from "next/link";
import { Vendor } from "@/types/vendor.types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

export default async function FeaturedVendors() {
  let vendors: Vendor[] = [];
  try {
    const res = await fetch(`${API_BASE}/vendors?sortBy=rating&page=1`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      vendors = data.vendors || [];
    }
  } catch (error) {
    console.error("Failed to fetch featured vendors:", error);
  }

  return (
    <section className="container-page py-14">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl text-plum-700">Featured vendors</h2>
        <Link href="/vendors" className="font-body text-sm text-plum-600 hover:underline">
          View all vendors
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {vendors.slice(0, 8).map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
      {vendors.length === 0 && (
        <p className="font-body text-sm text-charcoal/60 text-center py-10">No featured vendors found.</p>
      )}
    </section>
  );
}
