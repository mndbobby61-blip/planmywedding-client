"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, X, Shield, Calendar, CreditCard, Users, Clock } from "lucide-react";

interface Booking {
  _id: string;
  vendor: { name: string };
  couple: { name: string; email: string };
  eventDate: string;
  status: "pending" | "confirmed" | "cancelled";
  paymentStatus: "pending" | "paid" | "failed";
  totalAmount: number;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: "couple" | "vendor" | "admin";
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"bookings" | "users">("bookings");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function checkAdminAndFetch() {
      const token = localStorage.getItem("pmw_token");
      if (!token) return router.push("/login");

      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";
        // Check role first
        const meRes = await fetch(`${API_BASE}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const meData = await meRes.json();
        if (meData.user?.role !== "admin") {
          return router.push("/dashboard");
        }
        setIsAdmin(true);
        fetchBookings(token);
        fetchUsers(token);
      } catch (error) {
        console.error(error);
        router.push("/dashboard");
      }
    }
    checkAdminAndFetch();
  }, [router]);

  async function fetchBookings(token: string) {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";
    const res = await fetch(`${API_BASE}/bookings/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) setBookings(await res.json());
    setIsLoading(false);
  }

  async function fetchUsers(token: string) {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";
    const res = await fetch(`${API_BASE}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) setUsers(await res.json());
  }

  async function updateBookingStatus(id: string, status: string) {
    const token = localStorage.getItem("pmw_token");
    const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";
    await fetch(`${API_BASE}/bookings/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    });
    fetchBookings(token!);
  }

  async function updateUserRole(id: string, role: string) {
    const token = localStorage.getItem("pmw_token");
    const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";
    await fetch(`${API_BASE}/users/${id}/role`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ role }),
    });
    fetchUsers(token!);
  }

  if (isLoading || !isAdmin) return <div className="container-page py-10">Loading...</div>;

  return (
    <div className="container-page py-10 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl text-plum-700 flex items-center gap-2">
          <Shield className="text-gold-600" /> Admin Control Panel
        </h1>
        <div className="flex gap-2 bg-white rounded-lg p-1 border border-gold-200/40">
          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === "bookings" ? "bg-plum-50 text-plum-700" : "text-charcoal/60 hover:text-plum-600"
            }`}
          >
            Manage Bookings
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === "users" ? "bg-plum-50 text-plum-700" : "text-charcoal/60 hover:text-plum-600"
            }`}
          >
            Manage Roles
          </button>
        </div>
      </div>

      {activeTab === "bookings" && (
        <div className="bg-white rounded-2xl border border-gold-200/40 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-plum-50/50 border-b border-gold-200/40 text-sm text-plum-700">
                <th className="p-4 font-medium">Couple</th>
                <th className="p-4 font-medium">Vendor</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Amount</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-b border-gold-200/20 last:border-0">
                  <td className="p-4">
                    <p className="font-medium text-charcoal">{booking.couple?.name || "Unknown"}</p>
                    <p className="text-xs text-charcoal/60">{booking.couple?.email}</p>
                  </td>
                  <td className="p-4 text-charcoal">{booking.vendor?.name || "Deleted Vendor"}</td>
                  <td className="p-4 text-charcoal">
                    {new Date(booking.eventDate).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-charcoal">৳{booking.totalAmount.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-md ${
                      booking.status === "confirmed" ? "bg-green-100 text-green-700" :
                      booking.status === "cancelled" ? "bg-red-100 text-red-700" :
                      "bg-orange-100 text-orange-700"
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-4 flex items-center justify-end gap-2">
                    {booking.status === "pending" && (
                      <>
                        <button
                          onClick={() => updateBookingStatus(booking._id, "confirmed")}
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
                          title="Approve"
                        >
                          <Check size={18} />
                        </button>
                        <button
                          onClick={() => updateBookingStatus(booking._id, "cancelled")}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Reject"
                        >
                          <X size={18} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {bookings.length === 0 && (
            <div className="p-8 text-center text-charcoal/50">No bookings found in the system.</div>
          )}
        </div>
      )}

      {activeTab === "users" && (
        <div className="bg-white rounded-2xl border border-gold-200/40 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-plum-50/50 border-b border-gold-200/40 text-sm text-plum-700">
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Email</th>
                <th className="p-4 font-medium">Current Role</th>
                <th className="p-4 font-medium text-right">Change Role</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {users.map((user) => (
                <tr key={user._id} className="border-b border-gold-200/20 last:border-0">
                  <td className="p-4 text-charcoal font-medium">{user.name}</td>
                  <td className="p-4 text-charcoal/70">{user.email}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-md ${
                      user.role === "admin" ? "bg-plum-100 text-plum-700" :
                      "bg-gray-100 text-gray-700"
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <select
                      value={user.role}
                      onChange={(e) => updateUserRole(user._id, e.target.value)}
                      className="px-3 py-1.5 rounded border border-gold-200/60 bg-white text-sm text-charcoal focus:outline-none focus:border-plum-400"
                    >
                      <option value="couple">Couple</option>
                      <option value="vendor">Vendor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
