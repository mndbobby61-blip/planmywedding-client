import VendorCard from "@/components/vendors/VendorCard";
import { Vendor } from "@/types/vendor.types";

export default function RecommendationResults({ vendors }: { vendors: Vendor[] }) {
  if (vendors.length === 0) {
    return (
      <p className="font-body text-sm text-charcoal/50 text-center py-10">
        Fill in your plan above to see AI-matched vendors.
      </p>
    );
  }

  return (
    <div>
      <h2 className="font-display text-lg text-plum-700 mb-4">Matched for your plan</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {vendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
    </div>
  );
}
