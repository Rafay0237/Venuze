"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchFeaturedVenues,
  fetchSavedVenues,
  fetchVenueById,
  fetchVenues,
  type VenueSearchParams,
} from "@/features/venues/services/venue-service";

export const venueKeys = {
  all: ["venues"] as const,
  list: (params: VenueSearchParams) => ["venues", "list", params] as const,
  featured: ["venues", "featured"] as const,
  detail: (id: string) => ["venues", "detail", id] as const,
  saved: ["venues", "saved"] as const,
};

export function useVenues(params: VenueSearchParams = {}) {
  return useQuery({
    queryKey: venueKeys.list(params),
    queryFn: () => fetchVenues(params),
  });
}

export function useFeaturedVenues() {
  return useQuery({
    queryKey: venueKeys.featured,
    queryFn: fetchFeaturedVenues,
  });
}

export function useVenue(id: string) {
  return useQuery({
    queryKey: venueKeys.detail(id),
    queryFn: () => fetchVenueById(id),
    enabled: Boolean(id),
  });
}

export function useSavedVenues() {
  return useQuery({
    queryKey: venueKeys.saved,
    queryFn: fetchSavedVenues,
  });
}
