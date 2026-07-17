import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Vendor, VendorFilters } from "@/types/vendor.types";
import { MOCK_VENDORS } from "@/lib/mock-vendors";

export function useVendors(filters: VendorFilters) {
  return useQuery({
    queryKey: ["vendors", filters],
    queryFn: async (): Promise<Vendor[]> => {
      try {
        const { data } = await api.get<Vendor[]>("/vendors", { params: filters });
        return data;
      } catch {
        // Falls back to local mock data until the backend endpoint exists.
        return MOCK_VENDORS;
      }
    },
  });
}
