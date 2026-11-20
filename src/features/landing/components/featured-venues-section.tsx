"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  Car,
  Heart,
  MapPin,
  Maximize2,
  Share2,
  Users,
} from "lucide-react";
import {
  featuredFilters,
  featuredVenues,
} from "@/features/landing/data/landing-content";
import { SectionNavArrows } from "@/features/landing/components/section-nav-arrows";
import { cn } from "@/lib/utils/cn";

export function FeaturedVenuesSection() {
  const [activeFilter, setActiveFilter] = useState<(typeof featuredFilters)[number]>("Gallery");
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByPage(direction: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <section className="relative isolate overflow-hidden py-16 sm:py-20">
      <Image
        src="/images/featured-venues-bg.png"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/65" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Featured Venues
        </h2>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {featuredFilters.map((filter) => {
            const active = filter === activeFilter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "rounded-md px-4 py-2 text-xs font-semibold uppercase tracking-wide transition",
                  active
                    ? "bg-[var(--color-brand)] text-white"
                    : "bg-white/15 text-white hover:bg-white/25",
                )}
              >
                {filter}
              </button>
            );
          })}
        </div>

        <div
          ref={scrollerRef}
          className="mt-10 flex gap-4 overflow-x-auto pb-2 scrollbar-none sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4"
        >
          {featuredVenues.map((venue) => (
            <article
              key={venue.id}
              className="min-w-[280px] overflow-hidden rounded-2xl bg-white shadow-lg sm:min-w-0"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={venue.image}
                  alt={venue.title}
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
                    onClick={() =>
                      setSaved((prev) => ({ ...prev, [venue.id]: !prev[venue.id] }))
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition hover:bg-black/55"
                  >
                    <Heart
                      className={cn(
                        "h-3.5 w-3.5",
                        saved[venue.id] && "fill-[var(--color-brand)] text-[var(--color-brand)]",
                      )}
                    />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="line-clamp-2 text-sm font-bold text-[var(--color-ink)]">
                  {venue.title}
                </h3>
                <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-[var(--color-brand)]">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  {venue.location}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--color-muted)]">
                  <span className="inline-flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {venue.guests}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Maximize2 className="h-3.5 w-3.5" />
                    {venue.size}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Car className="h-3.5 w-3.5" />
                    {venue.perk}
                  </span>
                </div>
                <p className="mt-1 text-xs text-[var(--color-muted)]">+25 more</p>

                <div className="mt-4 flex items-center justify-between gap-3 border-t border-[var(--color-border)] pt-3">
                  <p className="text-sm text-[var(--color-ink)]">
                    From{" "}
                    <span className="font-bold">${venue.pricePerHour}/hour</span>
                  </p>
                  <Link
                    href={`/search?location=${encodeURIComponent(venue.location)}`}
                    className="rounded-md border border-[var(--color-brand)] px-3 py-1.5 text-xs font-semibold text-[var(--color-brand)] transition hover:bg-[var(--color-brand-soft)]"
                  >
                    View details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <SectionNavArrows
          className="mt-6"
          light
          onPrev={() => scrollByPage(-1)}
          onNext={() => scrollByPage(1)}
        />
      </div>
    </section>
  );
}
