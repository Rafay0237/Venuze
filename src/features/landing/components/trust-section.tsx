"use client";

import Image from "next/image";
import { useRef } from "react";
import { Star } from "lucide-react";
import {
  landingTestimonials,
  trustStats,
} from "@/features/landing/data/landing-content";
import { SectionNavArrows } from "@/features/landing/components/section-nav-arrows";

export function TrustSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByPage(direction: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: "smooth" });
  }

  return (
    <section className="bg-gradient-to-b from-[#FFF1EC] to-[#FFE4DC] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--color-ink)] sm:text-4xl">
            Trusted by Event Creators Who Demand Excellence
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">
            Join thousands of planners and hosts who love our seamless discovery and booking
            experience.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl px-5 py-6 text-center shadow-sm"
              style={{ backgroundColor: stat.color }}
            >
              <p className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-medium text-white">{stat.label}</p>
            </div>
          ))}
        </div>

        <div
          ref={scrollerRef}
          className="mt-8 flex gap-4 overflow-x-auto pb-2 scrollbar-none md:grid md:grid-cols-2 md:overflow-visible"
        >
          {landingTestimonials.map((item) => (
            <article
              key={item.id}
              className="flex min-h-[280px] min-w-[300px] overflow-hidden rounded-2xl bg-white shadow-sm md:min-w-0"
            >
              <div className="relative w-[110px] shrink-0 self-stretch sm:w-[200px]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover object-top"
                  sizes="120px"
                />
              </div>
              <div className="flex flex-1 flex-col justify-center p-5 sm:p-6">
                <p className="text-sm leading-relaxed text-[var(--color-ink)]">
                  “{item.quote}”
                </p>
                <p className="mt-4 text-sm font-bold text-[var(--color-ink)]">{item.name}</p>
                <div className="mt-2 flex items-center gap-0.5 text-[#F5B942]">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
            </article>
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
