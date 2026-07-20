import { notFound } from "next/navigation";
import { Star, MapPin, Users } from "lucide-react";
import BookingSection from "@/components/vendors/BookingSection";
import FavouriteButton from "@/components/vendors/FavouriteButton";
import VendorCard from "@/components/vendors/VendorCard";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

async function getVendor(id: string) {
  try {
    const res = await fetch(`${API_BASE}/vendors/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function getRelatedVendors(category: string, currentId: string) {
  try {
    const res = await fetch(`${API_BASE}/vendors?category=${category}&limit=5`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.vendors || []).filter((v: any) => v.id !== currentId).slice(0, 4);
  } catch {
    return [];
  }
}

export default async function VendorDetailsPage({ params }: { params: { id: string } }) {
  const vendor = await getVendor(params.id);
  if (!vendor) return notFound();

  const relatedVendors = await getRelatedVendors(vendor.category, vendor.id);
  const uniqueGallery = Array.from(new Set(vendor.gallery || [])).filter(
    (img: any) => img !== vendor.coverImage
  );

  return (
    <section className="container-page py-10">
      <div className="h-64 rounded-2xl overflow-hidden mb-6 bg-plum-50 relative">
        <div className="absolute top-4 right-4 z-10">
          <FavouriteButton vendorId={vendor.id} />
        </div>
        {vendor.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={vendor.coverImage} alt={vendor.name} className="w-full h-full object-cover" />
        ) : null}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="font-display text-3xl text-plum-700 mb-3">{vendor.name}</h1>
          <div className="flex items-center gap-4 font-body text-sm text-charcoal/60 mb-6">
            <span className="flex items-center gap-1">
              <MapPin size={14} /> {vendor.location}
            </span>
            {vendor.guestCapacity && (
              <span className="flex items-center gap-1">
                <Users size={14} /> up to {vendor.guestCapacity} guests
              </span>
            )}
            <span className="flex items-center gap-1 text-gold-600">
              <Star size={14} fill="currentColor" strokeWidth={0} /> {vendor.rating || 0}
            </span>
          </div>

          <h2 className="font-display text-lg text-plum-700 mb-2">Overview</h2>
          <p className="font-body text-sm text-charcoal/70 leading-relaxed mb-8">{vendor.description}</p>

          {uniqueGallery.length > 0 && (
            <div className="mb-8">
              <h2 className="font-display text-lg text-plum-700 mb-4">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {uniqueGallery.map((img: any, idx: number) => (
                  <div key={idx} className="h-32 rounded-lg overflow-hidden bg-plum-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={`${vendor.name} - ${idx}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          <h2 className="font-display text-lg text-plum-700 mb-2">Reviews</h2>
          <p className="font-body text-sm text-charcoal/50">No reviews yet. Be the first to book and review.</p>
        </div>

        <BookingSection vendorId={vendor.id} priceFrom={vendor.priceFrom} />
      </div>

      {relatedVendors.length > 0 && (
        <div className="mt-16 pt-10 border-t border-gold-200/40">
          <h2 className="font-display text-2xl text-plum-700 mb-6">Related items</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedVendors.map((relVendor: any) => (
              <VendorCard key={relVendor.id} vendor={relVendor} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
