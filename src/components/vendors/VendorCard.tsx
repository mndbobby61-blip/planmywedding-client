import Link from "next/link";
import { Star } from "lucide-react";
import { Vendor } from "@/types/vendor.types";

const CATEGORY_GRADIENT: Record<Vendor["category"], string> = {
  venue: "from-[#6E4C87] to-[#3C2A4D]",
  photography: "from-[#D9B26C] to-[#8A6234]",
  bridal: "from-[#9C3D6B] to-[#5A1F3D]",
  catering: "from-[#8C6BA0] to-[#5A3D74]",
  decor: "from-[#E0C68F] to-[#B8894A]",
};

export default function VendorCard({ vendor }: { vendor: Vendor }) {
  return (
    <Link
      href={`/vendors/${vendor.id}`}
      className="block bg-white rounded-xl border border-gold-200/40 overflow-hidden hover:border-plum-400/60 transition-colors"
    >
      <div className={`h-24 bg-gradient-to-br ${CATEGORY_GRADIENT[vendor.category]}`} />
      <div className="p-3">
        <p className="text-sm font-medium text-charcoal mb-1 truncate">{vendor.name}</p>
        <p className="text-xs text-charcoal/60 mb-2 truncate">
          {vendor.location}
          {vendor.guestCapacity ? ` · up to ${vendor.guestCapacity} guests` : ""}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-plum-600">
            ৳{(vendor.priceFrom / 1000).toFixed(0)}k
          </span>
          <span className="flex items-center gap-1 text-xs text-gold-600">
            <Star size={12} fill="currentColor" strokeWidth={0} />
            {vendor.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}
