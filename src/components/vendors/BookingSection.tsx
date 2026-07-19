"use client";

import { useState } from "react";
import BookingModal from "./BookingModal";

interface BookingSectionProps {
  vendorId: string;
  priceFrom: number;
}

export default function BookingSection({ vendorId, priceFrom }: BookingSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <aside className="bg-white rounded-xl border border-gold-200/60 p-5 h-fit">
        <p className="font-body text-xs text-charcoal/50 mb-1">Starting from</p>
        <p className="font-display text-2xl text-plum-700 mb-4">
          ৳{priceFrom.toLocaleString()}
        </p>
        <button className="btn-primary w-full" onClick={() => setIsModalOpen(true)}>
          Request booking
        </button>
      </aside>

      {isModalOpen && (
        <BookingModal
          vendorId={vendorId}
          priceFrom={priceFrom}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
