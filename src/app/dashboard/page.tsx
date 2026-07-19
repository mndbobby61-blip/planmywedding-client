"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, CreditCard, Clock, CheckCircle, XCircle } from "lucide-react";

interface Booking {
  _id: string;
  vendor: { name: string; category: string; location: string };
  eventDate: string;
  guestCount: number;
  status: "pending" | "confirmed" | "cancelled";
  paymentStatus: "pending" | "paid" | "failed";
  totalAmount: number;
  createdAt: string;
}

export default function UserDashboard() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBookings() {
      const token = localStorage.getItem("pmw_token");
      if (!token) {
        router.push("/login");
        return;
      }
      
      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";
        const res = await fetch(`${API_BASE}/bookings/mine`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setBookings(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBookings();
  }, [router]);

  if (isLoading) return <div className="container-page py-10">Loading...</div>;

  return (
    <div className="container-page py-10 min-h-screen">
      <h1 className="font-display text-3xl text-plum-700 mb-8">My Bookings</h1>
      
      {bookings.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border border-gold-200/40 text-center">
          <p className="text-charcoal/60 mb-4">You have no bookings yet.</p>
          <button onClick={() => router.push("/vendors")} className="btn-primary">
            Explore Vendors
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white p-6 rounded-2xl border border-gold-200/40 shadow-sm flex flex-col md:flex-row justify-between gap-4">
              <div>
                <h3 className="font-display text-xl text-plum-700">{booking.vendor?.name || "Unknown Vendor"}</h3>
                <p className="text-sm text-charcoal/60 mb-3 capitalize">{booking.vendor?.category || "Venue"}</p>
                <div className="flex flex-wrap gap-4 text-sm text-charcoal/80">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} className="text-gold-600" />
                    {new Date(booking.eventDate).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <CreditCard size={14} className="text-gold-600" />
                    ৳{booking.totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-2">
                <span className={`px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${
                  booking.status === "confirmed" ? "bg-green-100 text-green-700" :
                  booking.status === "cancelled" ? "bg-red-100 text-red-700" :
                  "bg-orange-100 text-orange-700"
                }`}>
                  {booking.status === "confirmed" && <CheckCircle size={12} />}
                  {booking.status === "cancelled" && <XCircle size={12} />}
                  {booking.status === "pending" && <Clock size={12} />}
                  Approval: {booking.status}
                </span>
                
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  booking.paymentStatus === "paid" ? "bg-green-50 text-green-600 border border-green-200" : "bg-gray-50 text-gray-600 border border-gray-200"
                }`}>
                  Payment: {booking.paymentStatus}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
