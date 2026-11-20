export type VenueCategory =
  | "Wedding"
  | "Corporate"
  | "Party"
  | "Rooftop"
  | "Garden"
  | "Studio"
  | "Loft"
  | "Mansion";

export interface Venue {
  id: string;
  name: string;
  location: string;
  city: string;
  pricePerHour: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  category: VenueCategory;
  guests: number;
  amenities: string[];
  description: string;
  host: string;
  lat: number;
  lng: number;
  instantBook: boolean;
  size?: string;
  featured?: boolean;
  saved?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
}

export interface CategoryItem {
  id: string;
  label: string;
  image: string;
}

export interface BookingRequestPayload {
  venueId: string;
  date: string;
  guests: number;
  hours: number;
}

export interface BookingRequestResponse {
  id: string;
  status: "pending";
  venueId: string;
  date: string;
  guests: number;
  hours: number;
  total: number;
}
