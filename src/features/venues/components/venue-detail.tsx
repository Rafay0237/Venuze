"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Star, Users, MapPin, Wifi, Car, Utensils, Check } from "lucide-react";
import { useState } from "react";
import { useVenue } from "@/features/venues/hooks/use-venues";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useToastStore } from "@/features/ui/store/toast-store";

const amenityIcons: Record<string, React.ReactNode> = {
  WiFi: <Wifi className="h-4 w-4" />,
  Parking: <Car className="h-4 w-4" />,
  Catering: <Utensils className="h-4 w-4" />,
};

export function VenueDetail() {
  const params = useParams<{ id: string }>();
  const { data: venue, isLoading, isError, refetch } = useVenue(params.id);
  const pushToast = useToastStore((s) => s.push);
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("20");
  const [hours, setHours] = useState("4");

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="aspect-[21/9] w-full" />
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-72 w-full" />
        </div>
      </div>
    );
  }

  if (isError || !venue) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="text-lg font-semibold text-[var(--color-ink)]">Venue not found</p>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          This listing may have been removed or is temporarily unavailable.
        </p>
        <div className="mt-4 flex justify-center gap-3">
          <Button variant="outline" onClick={() => refetch()}>
            Retry
          </Button>
          <Link href="/search">
            <Button>Back to search</Button>
          </Link>
        </div>
      </div>
    );
  }

  const total = venue.pricePerHour * Math.max(1, Number(hours) || 1);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/search"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to search
      </Link>

      <div className="mt-5 grid gap-3 md:grid-cols-4 md:grid-rows-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl md:col-span-2 md:row-span-2 md:aspect-auto md:min-h-[360px]">
          <Image src={venue.images[0]} alt={venue.name} fill className="object-cover" sizes="60vw" priority />
        </div>
        {venue.images.slice(1, 5).map((image, index) => (
          <div key={image} className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl md:block">
            <Image src={image} alt={`${venue.name} ${index + 2}`} fill className="object-cover" sizes="20vw" />
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-3xl font-bold text-[var(--color-ink)]">{venue.name}</h1>
              <p className="mt-2 flex flex-wrap items-center gap-3 text-sm text-[var(--color-muted)]">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {venue.location}, {venue.city}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  Up to {venue.guests} guests
                </span>
                <span className="inline-flex items-center gap-1 font-medium text-[var(--color-ink)]">
                  <Star className="h-4 w-4 fill-current" />
                  {venue.rating.toFixed(1)} ({venue.reviewCount})
                </span>
              </p>
            </div>
            <span className="rounded-full bg-[var(--color-brand-soft)] px-3 py-1 text-sm font-semibold text-[var(--color-brand)]">
              {venue.category}
            </span>
          </div>

          <p className="mt-6 leading-relaxed text-[var(--color-ink)]/90">{venue.description}</p>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-[var(--color-ink)]">Amenities</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {venue.amenities.map((amenity) => (
                <li
                  key={amenity}
                  className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] px-3 py-2.5 text-sm"
                >
                  {amenityIcons[amenity] ?? <Check className="h-4 w-4 text-[var(--color-brand)]" />}
                  {amenity}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 rounded-2xl border border-[var(--color-border)] p-5">
            <p className="text-sm text-[var(--color-muted)]">Hosted by</p>
            <p className="mt-1 font-semibold text-[var(--color-ink)]">{venue.host}</p>
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-[0_12px_40px_rgba(0,0,0,0.08)] lg:sticky lg:top-24">
          <p className="text-[var(--color-ink)]">
            <span className="text-2xl font-bold">${venue.pricePerHour}</span>
            <span className="text-[var(--color-muted)]"> /hr</span>
          </p>

          <div className="mt-5 space-y-3">
            <Input
              label="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <Input
              label="Guests"
              type="number"
              min={1}
              max={venue.guests}
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
            <Input
              label="Hours"
              type="number"
              min={1}
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            />
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-[var(--color-border)] pt-4 text-sm">
            <span className="text-[var(--color-muted)]">Estimated total</span>
            <span className="font-semibold text-[var(--color-ink)]">${total}</span>
          </div>

          <Button
            className="mt-4 w-full"
            size="lg"
            onClick={() => {
              if (!date) {
                pushToast("Please select a date", "error");
                return;
              }
              pushToast("Booking request sent (demo)", "success");
            }}
          >
            Check availability
          </Button>
          <p className="mt-3 text-center text-xs text-[var(--color-muted)]">
            You won’t be charged yet
          </p>
        </aside>
      </div>
    </div>
  );
}
