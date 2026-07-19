import { MOCK_VENDORS } from "@/lib/mock-vendors";
import VendorCard from "@/components/vendors/VendorCard";
import Link from "next/link";

export default function FeaturedVendors() {
  return (
    <section className="container-page py-14">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl text-plum-700">Featured vendors</h2>
        <Link href="/vendors" className="font-body text-sm text-plum-600 hover:underline">
          View all vendors
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {MOCK_VENDORS.slice(0, 8).map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
    </section>
  );
}
