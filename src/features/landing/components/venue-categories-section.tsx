"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { venueCategories } from "@/features/landing/data/landing-content";
import { SectionNavArrows } from "@/features/landing/components/section-nav-arrows";

export function VenueCategoriesSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByPage(direction: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <section id="categories" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--color-ink)] sm:text-4xl">
            Find The Best Venue For Any Occasion
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">
            Explore venues by category, from timeless ballrooms and rooftops with a view to
            modern studios and outdoor gardens, discover spaces designed to inspire
            unforgettable experiences.
          </p>
        </div>

        <div
          ref={scrollerRef}
          className="mt-10 flex gap-4 overflow-x-auto pb-2 scrollbar-none sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4"
        >
          {venueCategories.map((category) => (
            <Link
              key={category.id}
              href={`/search?category=${encodeURIComponent(category.id)}`}
              className="group relative min-w-[240px] flex-1 overflow-hidden rounded-2xl sm:min-w-0"
            >
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={category.image}
                  alt={category.label}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 80vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                <span className="absolute left-3 top-3 rounded-full bg-black/80 px-3 py-1 text-xs font-medium text-white">
                  {category.count} Venues
                </span>
                <h3 className="absolute bottom-4 left-4 right-4 text-xl font-bold text-white sm:text-2xl">
                  {category.label}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        <SectionNavArrows
          className="mt-6"
          onPrev={() => scrollByPage(-1)}
          onNext={() => scrollByPage(1)}
        />
      </div>
    </section>
  );
}
