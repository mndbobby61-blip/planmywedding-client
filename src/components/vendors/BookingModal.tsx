"use client";

import { useState } from "react";
import { X, CheckCircle } from "lucide-react";

export default function BookingModal({
  vendorId,
  priceFrom,
  onClose,
}: {
  vendorId: string;
  priceFrom: number;
  onClose: () => void;
}) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [eventDate, setEventDate] = useState("");
  const [guestCount, setGuestCount] = useState(100);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!eventDate) return setError("Please select an event date");
    setError("");
    setStep(2);
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    setError("");
    try {
      const token = localStorage.getItem("pmw_token");
      if (!token) throw new Error("Please log in to book a vendor");

      const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";
      const res = await fetch(`${API_BASE}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          vendorId,
          eventDate,
          guestCount,
          totalAmount: priceFrom,
          paymentStatus: "paid", // MOCK payment success
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Booking failed");
      }

      setStep(3);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-fade-in-up">
        <div className="flex items-center justify-between p-4 border-b border-gold-200/40">
          <h2 className="font-display text-xl text-plum-700">
            {step === 1 && "Booking Details"}
            {step === 2 && "Payment"}
            {step === 3 && "Success!"}
          </h2>
          {step !== 3 && (
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          )}
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
              {error}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-charcoal/70 mb-1">
                  Event Date
                </label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-gold-200 focus:border-plum-500 focus:ring-1 focus:ring-plum-500 outline-none transition-all font-body text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal/70 mb-1">
                  Estimated Guests
                </label>
                <input
                  type="number"
                  min={1}
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-xl border border-gold-200 focus:border-plum-500 focus:ring-1 focus:ring-plum-500 outline-none transition-all font-body text-sm"
                />
              </div>
              <button onClick={handleNext} className="btn-primary w-full mt-4">
                Continue to Payment
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="p-4 bg-plum-50 rounded-xl mb-4">
                <div className="flex justify-between mb-2 font-body text-sm">
                  <span className="text-charcoal/70">Total Amount:</span>
                  <span className="font-medium text-plum-700">৳{priceFrom.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-body text-xs text-charcoal/50">
                  <span>Booking Deposit (Mock)</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal/70 mb-1">
                  Card Number (Mock)
                </label>
                <input
                  type="text"
                  placeholder="4242 4242 4242 4242"
                  className="w-full px-4 py-2 rounded-xl border border-gold-200 focus:border-plum-500 focus:ring-1 focus:ring-plum-500 outline-none transition-all font-body text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal/70 mb-1">Expiry</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-4 py-2 rounded-xl border border-gold-200 focus:border-plum-500 outline-none font-body text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal/70 mb-1">CVC</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-4 py-2 rounded-xl border border-gold-200 focus:border-plum-500 outline-none font-body text-sm"
                  />
                </div>
              </div>
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="btn-primary w-full mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isProcessing ? "Processing..." : `Pay ৳${priceFrom.toLocaleString()}`}
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-6">
              <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
              <h3 className="font-display text-2xl text-plum-700 mb-2">Booking Confirmed!</h3>
              <p className="font-body text-sm text-charcoal/70 mb-6">
                Your payment was successful and the vendor has been notified.
              </p>
              <button onClick={onClose} className="btn-primary w-full">
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
