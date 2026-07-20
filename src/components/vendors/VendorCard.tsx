import Link from "next/link";
import { Star } from "lucide-react";
import { Vendor } from "@/types/vendor.types";
import FavouriteButton from "./FavouriteButton";

export default function VendorCard({ vendor }: { vendor: Vendor }) {
  return (
    <Link
      href={`/vendors/${vendor.id}`}
      className="block bg-white rounded-xl border border-gold-200/40 overflow-hidden hover:border-plum-400/60 transition-colors relative"
    >
      <div className="absolute top-2 right-2 z-10">
        <FavouriteButton vendorId={vendor.id} />
      </div>
      <div className="h-24 overflow-hidden bg-plum-50">
        {vendor.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={vendor.coverImage} alt={vendor.name} className="w-full h-full object-cover" loading="lazy" />
        ) : null}
      </div>
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
            {(vendor.rating || 0).toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}
