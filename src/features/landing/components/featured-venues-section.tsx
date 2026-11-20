"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  featuredFilters,
  featuredVenues,
} from "@/features/landing/data/landing-content";
import { SectionNavArrows } from "@/features/landing/components/section-nav-arrows";
import { FeaturedVenueCard } from "@/components/shared/featured-venue-card";
import { cn } from "@/lib/utils/cn";

// Landing featured cards stay static (Figma assets) rather than useVenues/mock API data.
export function FeaturedVenuesSection() {
  const [activeFilter, setActiveFilter] = useState<(typeof featuredFilters)[number]>("Gallery");
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

      <div className="relative mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
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
            <FeaturedVenueCard
              key={venue.id}
              className="min-w-[280px] sm:min-w-0"
              venue={{
                id: venue.id,
                title: venue.title,
                location: venue.location,
                image: venue.image,
                guests: venue.guests,
                size: venue.size,
                perk: venue.perk,
                pricePerHour: venue.pricePerHour,
                extrasLabel: "+25 more",
                href: `/search?location=${encodeURIComponent(venue.location)}`,
              }}
            />
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
