import type { Venue } from "@/types/venue";
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
      const loc = params.location.toLowerCase();
      const matchesLocation =
        venue.city.toLowerCase().includes(loc) ||
        venue.location.toLowerCase().includes(loc);
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

export async function fetchFeaturedVenues(): Promise<Venue[]> {
  await delay(500);
  return venues.filter((v) => v.featured);
}

export async function fetchVenueById(id: string): Promise<Venue | null> {
  await delay(450);
  return venues.find((v) => v.id === id) ?? null;
}

export async function fetchSavedVenues(): Promise<Venue[]> {
  await delay(550);
  return venues.filter((v) => v.saved);
}
