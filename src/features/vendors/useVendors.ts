import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Vendor, VendorFilters } from "@/types/vendor.types";

export interface VendorSearchResponse {
  vendors: Vendor[];
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalResults: number;
  };
}

export function useVendors(filters: VendorFilters) {
  return useQuery({
    queryKey: ["vendors", filters],
    queryFn: async (): Promise<VendorSearchResponse> => {
      const { data } = await api.get<VendorSearchResponse>("/vendors", { params: filters });
      return data;
    },
  });
}

export function useMyVendors() {
  return useQuery({
    queryKey: ["vendors", "mine"],
    queryFn: async (): Promise<Vendor[]> => {
      const { data } = await api.get<Vendor[]>("/vendors/mine");
      return data;
    },
  });
}
