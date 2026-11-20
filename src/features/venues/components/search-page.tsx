"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Map as MapIcon, List } from "lucide-react";
import { VenueCard } from "@/components/shared/venue-card";
import { MapPanel } from "@/components/shared/map-panel";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useVenues } from "@/features/venues/hooks/use-venues";
import { cn } from "@/lib/utils/cn";

const filters = ["Price", "Type of event", "Instant Book", "More filters"] as const;

export function SearchPage() {
  const searchParams = useSearchParams();
  const location = searchParams.get("location") ?? "";
  const guests = searchParams.get("guests") ?? "";
  const category = searchParams.get("category") ?? "";

  const [instantOnly, setInstantOnly] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<"list" | "map">("list");

  const queryParams = useMemo(
    () => ({
      location: location || undefined,
      guests: guests ? Number(guests) : undefined,
      category: category || undefined,
      instantBook: instantOnly || undefined,
    }),
    [location, guests, category, instantOnly],
  );

  const { data, isLoading, isError, refetch, isFetching } = useVenues(queryParams);

  function handleFilterClick(filter: (typeof filters)[number]) {
    if (filter === "Instant Book") {
      setInstantOnly((v) => !v);
      setActiveFilter(instantOnly ? null : filter);
      return;
    }
    setActiveFilter((prev) => (prev === filter ? null : filter));
  }

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-5 flex flex-wrap items-center gap-2">
        {filters.map((filter) => {
          const active =
            activeFilter === filter || (filter === "Instant Book" && instantOnly);
          return (
            <button
              key={filter}
              type="button"
              onClick={() => handleFilterClick(filter)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition",
                active
                  ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-white"
                  : "border-[var(--color-border)] bg-white text-[var(--color-ink)] hover:border-[var(--color-ink)]/40",
              )}
            >
              {filter}
            </button>
          );
        })}
        {isFetching && !isLoading ? (
          <span className="text-xs text-[var(--color-muted)]">Updating…</span>
        ) : null}
      </div>

      <div className="mb-4 flex items-center justify-between gap-3 lg:hidden">
        <p className="text-sm text-[var(--color-muted)]">
          {data ? `${data.length} venues` : "Searching venues"}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setMobileView((v) => (v === "list" ? "map" : "list"))}
          className="gap-2"
        >
          {mobileView === "list" ? (
            <>
              <MapIcon className="h-4 w-4" /> Show map
            </>
          ) : (
            <>
              <List className="h-4 w-4" /> Show list
            </>
          )}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,42%)]">
        <div className={cn(mobileView === "map" && "hidden lg:block")}>
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="aspect-[4/3] w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : null}

          {isError ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
              <p className="text-sm text-red-700">Failed to load venues.</p>
              <Button className="mt-3" variant="outline" onClick={() => refetch()}>
                Retry
              </Button>
            </div>
          ) : null}

          {data && data.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[var(--color-border)] p-10 text-center">
              <p className="font-semibold text-[var(--color-ink)]">No venues found</p>
              <p className="mt-1 text-sm text-[var(--color-muted)]">
                Try adjusting your filters or search location.
              </p>
            </div>
          ) : null}

          {data && data.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {data.map((venue) => (
                <div
                  key={venue.id}
                  onMouseEnter={() => setSelectedId(venue.id)}
                  className={cn(
                    "rounded-2xl transition",
                    selectedId === venue.id && "ring-2 ring-[var(--color-brand)]/30",
                  )}
                >
                  <VenueCard venue={venue} />
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div
          className={cn(
            "sticky top-20 h-[calc(100vh-6.5rem)]",
            mobileView === "list" ? "hidden lg:block" : "block min-h-[60vh]",
          )}
        >
          <MapPanel
            venues={data ?? []}
            selectedId={selectedId}
            onSelect={setSelectedId}
            className="h-full"
          />
        </div>
      </div>
    </div>
  );
}
