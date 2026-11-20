"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Car, Heart, MapPin, Maximize2, Share2, Users } from "lucide-react";
import type { Venue } from "@/types/venue";
import { cn } from "@/lib/utils/cn";

export interface FeaturedVenueCardData {
  id: string;
  title: string;
  location: string;
  image: string;
  guests: string;
  size: string;
  perk: string;
  pricePerHour: number;
  extrasLabel?: string;
  href?: string;
  saved?: boolean;
}

interface FeaturedVenueCardProps {
  venue: FeaturedVenueCardData | Venue;
  className?: string;
  onHover?: () => void;
}

function isVenue(venue: FeaturedVenueCardData | Venue): venue is Venue {
  return "name" in venue && "city" in venue;
}

export function toFeaturedVenueCard(venue: Venue): FeaturedVenueCardData {
  const parking = venue.amenities.find((a) => /park/i.test(a));
  return {
    id: venue.id,
    title: venue.name,
    location: `${venue.location}, ${venue.city}`,
    image: venue.image,
    guests: `${venue.guests}+`,
    size: venue.size ?? `${(venue.guests * 12).toLocaleString()} sq ft`,
    perk: parking ? "Free parking" : (venue.amenities[0] ?? "Amenities"),
    pricePerHour: venue.pricePerHour,
    extrasLabel: "+25 more",
    href: `/venues/${venue.id}`,
    saved: venue.saved,
  };
}

export function FeaturedVenueCard({ venue, className, onHover }: FeaturedVenueCardProps) {
  const data = isVenue(venue) ? toFeaturedVenueCard(venue) : venue;
  const [saved, setSaved] = useState(Boolean(data.saved));
  const href = data.href ?? `/search?location=${encodeURIComponent(data.location)}`;

  return (
    <article
      className={cn(
        "overflow-hidden rounded-2xl bg-white shadow-lg",
        className,
      )}
      onMouseEnter={onHover}
    >
      <div className="relative aspect-[4/3]">
        <Image
          src={data.image}
          alt={data.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 80vw, 25vw"
        />
        <span className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          Verified
        </span>
        <div className="absolute right-3 top-3 flex items-center gap-2">
          <button
            type="button"
            aria-label="Share venue"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition hover:bg-black/55"
          >
            <Share2 className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            aria-label="Save venue"
            onClick={() => setSaved((prev) => !prev)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition hover:bg-black/55"
          >
            <Heart
              className={cn(
                "h-3.5 w-3.5",
                saved && "fill-[var(--color-brand)] text-[var(--color-brand)]",
              )}
            />
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="line-clamp-2 text-sm font-semibold text-[var(--color-ink)]">
          {data.title}
        </h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-[var(--color-brand)]">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          {data.location}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-gray-800">
          <span className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-2 py-1">
            <Users className="h-3.5 w-3.5" />
            {data.guests}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-2 py-1">
            <Maximize2 className="h-3.5 w-3.5" />
            {data.size}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-2 py-1">
            <Car className="h-3.5 w-3.5" />
            {data.perk}
          </span>
          <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 font-semibold">
            {data.extrasLabel ?? "+25 more"}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-[var(--color-border)] pt-3">
          <p className="text-sm text-[var(--color-ink)]">
            From{" "}
            <span className="font-semibold">${data.pricePerHour}/hour</span>
          </p>
          <Link
            href={href}
            className="rounded-md border border-[var(--color-brand)] px-3 py-1.5 text-xs font-semisemibold text-[var(--color-brand)] transition hover:bg-[var(--color-brand-soft)]"
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}
