"use client";

import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchVenueById,
  fetchVenues,
  requestBooking,
  type VenueSearchParams,
} from "@/features/venues/services/venue-service";
import { useToastStore } from "@/features/ui/store/toast-store";
import type { BookingRequestPayload, BookingRequestResponse } from "@/types/venue";

export const venueKeys = {
  all: ["venues"] as const,
  list: (params: VenueSearchParams) => ["venues", "list", params] as const,
  detail: (id: string) => ["venues", "detail", id] as const,
};

export function useVenues(params: VenueSearchParams = {}) {
  return useQuery({
    queryKey: venueKeys.list(params),
    queryFn: () => fetchVenues(params),
    placeholderData: keepPreviousData,
  });
}

export function useVenue(id: string) {
  return useQuery({
    queryKey: venueKeys.detail(id),
    queryFn: () => fetchVenueById(id),
    enabled: Boolean(id),
  });
}

export function useRequestBooking() {
  const queryClient = useQueryClient();
  const pushToast = useToastStore((s) => s.push);

  return useMutation<BookingRequestResponse, Error, BookingRequestPayload>({
    mutationFn: requestBooking,
    onSuccess: () => {
      pushToast("Booking request sent (demo)", "success");
      void queryClient.invalidateQueries({ queryKey: venueKeys.all });
    },
    onError: (error) => {
      pushToast(error.message || "Unable to request booking", "error");
    },
  });
}
