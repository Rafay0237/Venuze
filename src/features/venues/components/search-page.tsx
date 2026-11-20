"use client";

import { useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Armchair,
  ArrowLeft,
  ArrowRight,
  ArrowUpDown,
  Briefcase,
  Building2,
  Clapperboard,
  Frame,
  Grid3x3,
  List,
  Map as MapIcon,
  PartyPopper,
  Search,
  SlidersHorizontal,
  Spotlight,
  Users,
  UtensilsCrossed,
  Warehouse,
} from "lucide-react";
import { FeaturedVenueCard } from "@/components/shared/featured-venue-card";
import { MapPanel } from "@/components/shared/map-panel";
import { Chip } from "@/components/ui/chip";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useVenues } from "@/features/venues/hooks/use-venues";
import {
  defaultSearchFilters,
  SearchFiltersDrawer,
  type SearchFilterState,
} from "@/features/venues/components/search-filters-drawer";
import { parseGuestsParam } from "@/lib/utils/search-params";
import { cn } from "@/lib/utils/cn";

const spaceCategories = [
  { id: "all", label: "All Spaces", icon: Grid3x3 },
  { id: "photo-studio", label: "Photo Studio", icon: Spotlight },
  { id: "film-studio", label: "Film Studio", icon: Clapperboard },
  { id: "warehouse", label: "Warehouse", icon: Warehouse },
  { id: "gallery", label: "Gallery", icon: Frame },
  { id: "restaurant", label: "Restaurant", icon: UtensilsCrossed },
  { id: "apartment", label: "Apartment", icon: Building2 },
  { id: "office", label: "Office Space", icon: Briefcase },
  { id: "venue", label: "Venue", icon: Armchair },
  { id: "private-party", label: "Private Party", icon: PartyPopper },
  { id: "meeting", label: "Meeting", icon: Users },
] as const;

type SpaceCategoryId = (typeof spaceCategories)[number]["id"];

function toSpaceCategoryId(value: string): SpaceCategoryId {
  return spaceCategories.some((item) => item.id === value)
    ? (value as SpaceCategoryId)
    : "all";
}

export function SearchPage() {
  const searchParams = useSearchParams();
  const location = searchParams.get("location") ?? "";
  const guests = searchParams.get("guests") ?? "";
  const category = searchParams.get("category") ?? "";

  const [keyword, setKeyword] = useState("");
  const [activeSpace, setActiveSpace] = useState<SpaceCategoryId>(
    toSpaceCategoryId(category || "all"),
  );
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] =
    useState<SearchFilterState>(defaultSearchFilters);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<"list" | "map">("list");
  const [sortOpen, setSortOpen] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);

  const queryParams = useMemo(
    () => ({
      location: location || undefined,
      guests: Math.max(
        parseGuestsParam(guests) ?? 0,
        appliedFilters.capacityMin,
      ) || undefined,
      category:
        activeSpace !== "all"
          ? activeSpace
          : appliedFilters.venueTypes[0] || category || undefined,
      minPrice: appliedFilters.priceMin,
      maxPrice: appliedFilters.priceMax,
      query: keyword.trim() || undefined,
      instantBook: appliedFilters.verifiedOnly || undefined,
    }),
    [location, guests, category, activeSpace, appliedFilters, keyword],
  );

  const { data, isLoading, isError, refetch, isFetching } = useVenues(queryParams);

  const filteredData = useMemo(() => {
    if (!data) return data;
    return data.filter((venue) => {
      if (venue.guests > appliedFilters.capacityMax) return false;
      if (appliedFilters.venueTypes.length > 0) {
        const matchesType = appliedFilters.venueTypes.some((type) => {
          const t = type.toLowerCase();
          return (
            venue.category.toLowerCase().includes(t.split(" ")[0]) ||
            t.includes(venue.category.toLowerCase())
          );
        });
        if (!matchesType) return false;
      }
      return true;
    });
  }, [data, appliedFilters]);

  const activeChips = useMemo(() => {
    const chips: { id: string; label: string }[] = [];
    if (appliedFilters.verifiedOnly) {
      chips.push({ id: "verified", label: "Verified" });
    }
    chips.push({
      id: "capacity",
      label: `${appliedFilters.capacityMin}-${appliedFilters.capacityMax} guests`,
    });
    appliedFilters.venueTypes.slice(0, 2).forEach((type) => {
      chips.push({ id: `type-${type}`, label: type });
    });
    appliedFilters.occasions.slice(0, 2).forEach((item) => {
      chips.push({ id: `occ-${item}`, label: item });
    });
    return chips;
  }, [appliedFilters]);

  const activeSpaceLabel =
    spaceCategories.find((s) => s.id === activeSpace)?.label.toLowerCase() ??
    "venues";

  function scrollCategories(direction: -1 | 1) {
    categoryRef.current?.scrollBy({
      left: direction * 240,
      behavior: "smooth",
    });
  }

  function removeChip(id: string) {
    setAppliedFilters((prev) => {
      if (id === "verified") return { ...prev, verifiedOnly: false };
      if (id === "capacity") {
        return { ...prev, capacityMin: 10, capacityMax: 1500 };
      }
      if (id.startsWith("type-")) {
        const type = id.replace("type-", "");
        return {
          ...prev,
          venueTypes: prev.venueTypes.filter((t) => t !== type),
        };
      }
      if (id.startsWith("occ-")) {
        const occ = id.replace("occ-", "");
        return {
          ...prev,
          occasions: prev.occasions.filter((t) => t !== occ),
        };
      }
      return prev;
    });
  }

  return (
    <div>
      {/* Full-width keyword + Filters row */}
      <div className="flex w-full items-stretch border-b border-[var(--color-border)] bg-white">
        <label className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Search className="h-4 w-4 shrink-0 text-[var(--color-muted)]" />
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Add keywords..."
            className="w-full bg-transparent text-sm text-[var(--color-ink)] outline-none placeholder:text-[var(--color-muted)]"
          />
        </label>
        <div className="w-px shrink-0 bg-[var(--color-border)]" />
        <button
          type="button"
          onClick={() => setFiltersOpen(true)}
          className="inline-flex shrink-0 items-center gap-2 px-4 text-sm font-medium text-[var(--color-ink)] transition hover:bg-black/[0.03] sm:px-6"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </button>
      </div>

      {/* Full-width category row — no extra Filters button */}
      <div className="flex w-full items-center gap-1 border-b border-[var(--color-border)] bg-white px-2 sm:px-3 lg:px-4">
        <button
          type="button"
          aria-label="Scroll categories left"
          onClick={() => scrollCategories(-1)}
          className="hidden shrink-0 p-2 text-[var(--color-ink)] transition hover:opacity-70 sm:inline-flex"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
        </button>

        <div
          ref={categoryRef}
          className="flex min-w-0 flex-1 gap-0.5 overflow-x-auto py-2 scrollbar-none"
        >
          {spaceCategories.map((item) => {
            const Icon = item.icon;
            const active = activeSpace === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveSpace(item.id)}
                className={cn(
                  "flex min-w-[78px] flex-col items-center gap-1.5 px-3 py-2 text-center transition",
                  active
                    ? "bg-[#F0F0F0] text-[var(--color-brand)]"
                    : "text-[#6B7280] hover:text-[var(--color-ink)]",
                )}
              >
                <Icon className="h-5 w-5" strokeWidth={1.6} />
                <span className="whitespace-nowrap text-[11px] font-medium leading-tight">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          aria-label="Scroll categories right"
          onClick={() => scrollCategories(1)}
          className="hidden shrink-0 p-2 text-[var(--color-ink)] transition hover:opacity-70 sm:inline-flex"
        >
          <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
        </button>
      </div>

      {/* Results summary + chips + sort */}
      <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p className="shrink-0 text-sm text-[var(--color-ink)]">
          {filteredData ? (
            <>
              {filteredData.length.toLocaleString()}{" "}
              <span className="font-semibold">{activeSpaceLabel}</span>
              {location ? ` near ${location.split(",")[0]}` : ""}
            </>
          ) : (
            "Searching venues"
          )}
          {isFetching && !isLoading ? (
            <span className="ml-2 text-xs text-[var(--color-muted)]">Updating…</span>
          ) : null}
        </p>

        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2 lg:justify-end">
          {activeChips.map((chip) => (
            <Chip
              key={chip.id}
              label={chip.label}
              onRemove={() => removeChip(chip.id)}
            />
          ))}

          <div className="relative">
            <button
              type="button"
              onClick={() => setSortOpen((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--color-ink)]"
            >
              <ArrowUpDown className="h-3.5 w-3.5" />
              Sort by: Recommended
            </button>
            {sortOpen ? (
              <div className="absolute right-0 z-20 mt-1 min-w-[180px] rounded-md border border-[var(--color-border)] bg-white py-1 shadow-lg">
                {["Recommended", "Price: Low to High", "Price: High to Low"].map(
                  (option) => (
                    <button
                      key={option}
                      type="button"
                      className="block w-full px-3 py-2 text-left text-xs text-[var(--color-ink)] hover:bg-black/[0.04]"
                      onClick={() => setSortOpen(false)}
                    >
                      {option}
                    </button>
                  ),
                )}
              </div>
            ) : null}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setMobileView((v) => (v === "list" ? "map" : "list"))}
            className="gap-2 lg:hidden"
          >
            {mobileView === "list" ? (
              <>
                <MapIcon className="h-4 w-4" /> Map
              </>
            ) : (
              <>
                <List className="h-4 w-4" /> List
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 pb-8 sm:px-6 lg:px-8">
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

            {filteredData && filteredData.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[var(--color-border)] p-10 text-center">
                <p className="font-semibold text-[var(--color-ink)]">No venues found</p>
                <p className="mt-1 text-sm text-[var(--color-muted)]">
                  Try adjusting your filters or search location.
                </p>
              </div>
            ) : null}

            {filteredData && filteredData.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {filteredData.map((venue) => (
                  <FeaturedVenueCard
                    key={venue.id}
                    venue={venue}
                    onHover={() => setSelectedId(venue.id)}
                    className={cn(
                      "transition",
                      selectedId === venue.id && "ring-2 ring-[var(--color-brand)]/30",
                    )}
                  />
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
              venues={filteredData ?? []}
              selectedId={selectedId}
              onSelect={setSelectedId}
              className="h-full"
            />
          </div>
        </div>
      </div>

      <SearchFiltersDrawer
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        value={appliedFilters}
        onApply={setAppliedFilters}
      />
    </div>
  );
}
