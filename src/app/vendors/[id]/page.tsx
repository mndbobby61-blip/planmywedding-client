import { notFound } from "next/navigation";
import { MOCK_VENDORS } from "@/lib/mock-vendors";
import { Star, MapPin, Users } from "lucide-react";

export default function VendorDetailsPage({ params }: { params: { id: string } }) {
  const vendor = MOCK_VENDORS.find((v) => v.id === params.id);
  if (!vendor) return notFound();

  return (
    <section className="container-page py-10">
      <div className="h-64 rounded-2xl overflow-hidden mb-6 bg-plum-50">
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
              <Star size={14} fill="currentColor" strokeWidth={0} /> {vendor.rating}
            </span>
          </div>

          <h2 className="font-display text-lg text-plum-700 mb-2">Overview</h2>
          <p className="font-body text-sm text-charcoal/70 leading-relaxed mb-8">{vendor.description}</p>

          <h2 className="font-display text-lg text-plum-700 mb-2">Reviews</h2>
          <p className="font-body text-sm text-charcoal/50">No reviews yet. Be the first to book and review.</p>
        </div>

        <aside className="bg-white rounded-xl border border-gold-200/60 p-5 h-fit">
          <p className="font-body text-xs text-charcoal/50 mb-1">Starting from</p>
          <p className="font-display text-2xl text-plum-700 mb-4">
            ৳{vendor.priceFrom.toLocaleString()}
          </p>
          <button className="btn-primary w-full">Request booking</button>
        </aside>
      </div>
    </section>
  );
}
