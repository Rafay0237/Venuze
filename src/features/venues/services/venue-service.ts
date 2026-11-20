import type {
  BookingRequestPayload,
  BookingRequestResponse,
  Venue,
} from "@/types/venue";
import { delay, venues } from "@/features/venues/data/mock-venues";

export interface VenueSearchParams {
  location?: string;
  guests?: number;
  category?: string;
  instantBook?: boolean;
  minPrice?: number;
  maxPrice?: number;
  query?: string;
}

export async function fetchVenues(params: VenueSearchParams = {}): Promise<Venue[]> {
  await delay(700);

  return venues.filter((venue) => {
    if (params.location) {
      const tokens = params.location
        .toLowerCase()
        .split(/[,\s/]+/)
        .map((t) => t.trim())
        .filter((t) => t.length > 1);
      const haystack = `${venue.city} ${venue.location}`.toLowerCase();
      const matchesLocation = tokens.some((token) => haystack.includes(token));
      if (!matchesLocation) return false;
    }
    if (params.guests && venue.guests < params.guests) return false;
    if (params.category) {
      const cat = params.category.toLowerCase();
      const matchesCategory =
        venue.category.toLowerCase() === cat ||
        venue.category.toLowerCase() === `${cat}s` ||
        `${venue.category.toLowerCase()}s` === cat;
      if (!matchesCategory) return false;
    }
    if (params.instantBook && !venue.instantBook) return false;
    if (params.minPrice && venue.pricePerHour < params.minPrice) return false;
    if (params.maxPrice && venue.pricePerHour > params.maxPrice) return false;
    if (params.query) {
      const q = params.query.toLowerCase();
      const haystack = `${venue.name} ${venue.location} ${venue.city} ${venue.category}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

export async function fetchVenueById(id: string): Promise<Venue | null> {
  await delay(450);
  return venues.find((v) => v.id === id) ?? null;
}

export async function requestBooking(
  payload: BookingRequestPayload,
): Promise<BookingRequestResponse> {
  await delay(600);

  const venue = venues.find((v) => v.id === payload.venueId);
  if (!venue) {
    throw new Error("Venue not found");
  }
  if (!payload.date) {
    throw new Error("Please select a date");
  }

  const hours = Math.max(1, payload.hours);
  const guests = Math.max(1, payload.guests);

  return {
    id: `booking-${payload.venueId}-${Date.now()}`,
    status: "pending",
    venueId: payload.venueId,
    date: payload.date,
    guests,
    hours,
    total: venue.pricePerHour * hours,
  };
}
