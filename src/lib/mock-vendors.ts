import { Vendor } from "@/types/vendor.types";

export const MOCK_VENDORS: Vendor[] = [
  {
    id: "v1",
    name: "Riverside manor",
    category: "venue",
    location: "Dhaka",
    priceFrom: 320000,
    rating: 4.9,
    guestCapacity: 300,
    coverImage: "https://picsum.photos/seed/riverside-manor/600/400",
    gallery: [
      "https://picsum.photos/seed/riverside-manor-1/600/400",
      "https://picsum.photos/seed/riverside-manor-2/600/400",
    ],
    description: "A riverside garden venue with indoor and outdoor halls.",
    createdAt: "2026-05-01",
  },
  {
    id: "v2",
    name: "Lensfolk studio",
    category: "photography",
    location: "Dhaka",
    priceFrom: 85000,
    rating: 4.8,
    coverImage: "https://picsum.photos/seed/lensfolk-studio/600/400",
    gallery: [
      "https://picsum.photos/seed/lensfolk-studio-1/600/400",
      "https://picsum.photos/seed/lensfolk-studio-2/600/400",
    ],
    description: "Documentary-style wedding photography and same-day edits.",
    createdAt: "2026-05-10",
  },
  {
    id: "v3",
    name: "Rupashi bridal",
    category: "bridal",
    location: "Chattogram",
    priceFrom: 45000,
    rating: 5.0,
    coverImage: "https://picsum.photos/seed/rupashi-bridal/600/400",
    gallery: [
      "https://picsum.photos/seed/rupashi-bridal-1/600/400",
      "https://picsum.photos/seed/rupashi-bridal-2/600/400",
    ],
    description: "Bridal makeup and attire styling with trial sessions.",
    createdAt: "2026-04-20",
  },
];
