"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { useState } from "react";
import type { Venue } from "@/types/venue";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";

interface VenueCardProps {
  venue: Venue;
  className?: string;
}

export function VenueCard({ venue, className }: VenueCardProps) {
  const [saved, setSaved] = useState(Boolean(venue.saved));

  return (
    <article className={cn("group flex flex-col", className)}>
      <Link href={`/venues/${venue.id}`} className="relative block overflow-hidden rounded-2xl">
        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-surface-muted)]">
          <Image
            src={venue.image}
            alt={venue.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <button
            type="button"
            aria-label={saved ? "Remove from saved" : "Save venue"}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setSaved((prev) => !prev);
            }}
            className="absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow-sm backdrop-blur transition hover:scale-105"
          >
            <Heart
              className={cn(
                "h-4 w-4",
                saved ? "fill-[var(--color-brand)] text-[var(--color-brand)]" : "text-[var(--color-ink)]",
              )}
            />
          </button>
          {venue.instantBook ? (
            <Badge className="absolute left-3 top-3">Instant Book</Badge>
          ) : null}
        </div>
      </Link>

      <div className="mt-3 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/venues/${venue.id}`} className="min-w-0">
            <h3 className="truncate font-semibold text-[var(--color-ink)]">{venue.name}</h3>
            <p className="truncate text-sm text-[var(--color-muted)]">
              {venue.location}, {venue.city}
            </p>
          </Link>
          <div className="flex shrink-0 items-center gap-1 text-sm font-medium">
            <Star className="h-3.5 w-3.5 fill-current text-[var(--color-ink)]" />
            <span>{venue.rating.toFixed(1)}</span>
            <span className="text-[var(--color-muted)]">({venue.reviewCount})</span>
          </div>
        </div>
        <p className="pt-1 text-sm text-[var(--color-ink)]">
          <span className="font-semibold">${venue.pricePerHour}</span>
          <span className="text-[var(--color-muted)]"> /hr</span>
        </p>
      </div>
    </article>
  );
}
