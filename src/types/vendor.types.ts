export type VendorCategory =
  | "venue"
  | "photography"
  | "catering"
  | "bridal"
  | "decor";

export interface Vendor {
  id: string;
  name: string;
  category: VendorCategory;
  location: string;
  priceFrom: number;
  rating: number;
  guestCapacity?: number;
  coverImage: string;
  gallery: string[];
  description: string;
  createdAt: string;
}

export interface VendorFilters {
  search?: string;
  category?: VendorCategory;
  location?: string;
  minBudget?: number;
  maxBudget?: number;
  sortBy?: "rating" | "priceAsc" | "priceDesc" | "newest";
  page?: number;
}
