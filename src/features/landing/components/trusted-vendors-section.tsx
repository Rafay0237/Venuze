"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { vendorCategories } from "@/features/landing/data/landing-content";
import { SectionNavArrows } from "@/features/landing/components/section-nav-arrows";

export function TrustedVendorsSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByPage(direction: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <section className="relative z-10 bg-[#FBF6E9] pb-64 pt-16 sm:pb-48 sm:pt-20 md:pb-52">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--color-ink)] sm:text-4xl">
            Complete Your Event with our Trusted Vendors
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink)]/80 sm:text-base">
            Venues are just the beginning. Discover caterers, decorators, photographers,
            entertainment, and more all in one place, ready to bring your event project to
            life.
          </p>
        </div>

        <div
          ref={scrollerRef}
          className="mt-10 flex gap-4 overflow-x-auto pb-2 scrollbar-none sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4"
        >
          {vendorCategories.map((vendor) => (
            <Link
              key={vendor.id}
              href={`/search?type=vendors&category=${encodeURIComponent(vendor.id)}`}
              className="group relative min-w-[240px] flex-1 overflow-hidden rounded-2xl sm:min-w-0"
            >
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={vendor.image}
                  alt={vendor.label}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 80vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                  {vendor.label}
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

      {/* Overlaps 50% into this section and 50% into How It Works */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 translate-y-1/2 px-4 sm:px-6 lg:px-8">
        <div className="pointer-events-auto mx-auto max-w-7xl overflow-hidden rounded-2xl bg-gradient-to-r from-[#FF786A] via-[#FF5037] to-[#FFC331] px-6 py-8 shadow-lg sm:px-10 sm:py-10 lg:px-16">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl text-center lg:text-left">
              <h3 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Grow Your Business with Venuze
              </h3>
              <p className="mt-3 text-sm text-white/90 sm:text-base">
                Showcase your services to thousands of event organizers and creators
                searching for talent like yours.
              </p>
              <button
                type="button"
                className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-black px-5 text-sm font-semibold text-white transition hover:bg-black/85"
              >
                Join as a Vendor
              </button>
            </div>

            <div className="relative h-48 w-full max-w-md sm:h-56 lg:h-64 lg:w-[420px]">
              <Image
                src="/images/grow-business-illustration.png"
                alt="Grow your business with Venuze"
                fill
                className="object-contain object-right"
                sizes="420px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
