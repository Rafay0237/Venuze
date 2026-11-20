"use client";

import Image from "next/image";
import { SearchBar } from "@/components/shared/search-bar";
import { VenueCategoriesSection } from "@/features/landing/components/venue-categories-section";
import { FeaturedVenuesSection } from "@/features/landing/components/featured-venues-section";
import { TrustedVendorsSection } from "@/features/landing/components/trusted-vendors-section";
import { HowItWorksSection } from "@/features/landing/components/how-it-works-section";
import { TrustSection } from "@/features/landing/components/trust-section";

export function LandingPage() {
  return (
    <div>
      <section className="relative isolate min-h-[78vh] overflow-hidden">
        <Image
          src="/images/celebration-venue.jpg"
          alt="Celebration venue atmosphere"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/30 to-black/50" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-7xl flex-col items-center justify-center px-4 pb-20 pt-28 text-center sm:px-6 lg:px-8">
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Celebrate in venues
            <br className="hidden sm:block" /> big and small
          </h1>
          <div className="mt-14 w-full max-w-3xl">
            <SearchBar />
          </div>
        </div>
      </section>

      <VenueCategoriesSection />
      <FeaturedVenuesSection />
      <TrustedVendorsSection />
      <HowItWorksSection />
      <TrustSection />
    </div>
  );
}
