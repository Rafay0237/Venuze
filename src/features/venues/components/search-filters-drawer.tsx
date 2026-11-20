"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const venueTypes = [
  "Office Space",
  "Meeting",
  "Private Party",
  "Villa",
  "Bar",
  "Loft",
  "Apartment",
  "Ballroom",
  "Restaurant",
  "Studio",
  "House",
  "Gallery",
] as const;

const occasions = [
  "Wedding",
  "Reception",
  "Ceremony",
  "Engagement",
  "Birthday",
  "Babyshower",
  "Concert/Performance",
  "Brand Launch",
  "Fashion Show",
  "Corporate Event",
  "Conference",
  "Pop-up",
] as const;

export interface SearchFilterState {
  venueTypes: string[];
  capacityMin: number;
  capacityMax: number;
  priceMin: number;
  priceMax: number;
  occasions: string[];
  verifiedOnly: boolean;
}

export const defaultSearchFilters: SearchFilterState = {
  venueTypes: [],
  capacityMin: 10,
  capacityMax: 1500,
  priceMin: 10,
  priceMax: 30000,
  occasions: [],
  verifiedOnly: false,
};

interface SearchFiltersDrawerProps {
  open: boolean;
  onClose: () => void;
  value: SearchFilterState;
  onApply: (next: SearchFilterState) => void;
}

export function SearchFiltersDrawer({
  open,
  onClose,
  value,
  onApply,
}: SearchFiltersDrawerProps) {
  const [draft, setDraft] = useState<SearchFilterState>(value);

  useEffect(() => {
    if (open) setDraft(value);
  }, [open, value]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  function toggleChip(key: "venueTypes" | "occasions", item: string) {
    setDraft((prev) => {
      const list = prev[key];
      return {
        ...prev,
        [key]: list.includes(item) ? list.filter((v) => v !== item) : [...list, item],
      };
    });
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80]">
      <button
        type="button"
        aria-label="Close filters overlay"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      <aside
        className={cn(
          "absolute inset-y-0 right-0 flex w-full max-w-[420px] flex-col bg-white shadow-2xl",
          "animate-in slide-in-from-right duration-200",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
      >
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-4">
          <h2 className="text-lg font-bold text-[var(--color-ink)]">Filters</h2>
          <button
            type="button"
            aria-label="Close filters"
            onClick={onClose}
            className="rounded-md p-1.5 text-[var(--color-muted)] transition hover:bg-black/5 hover:text-[var(--color-ink)]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
          <section>
            <h3 className="text-sm font-bold text-[var(--color-ink)]">Venue Type</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {venueTypes.map((type) => {
                const active = draft.venueTypes.includes(type);
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleChip("venueTypes", type)}
                    className={cn(
                      "rounded-md px-3 py-1.5 text-sm transition",
                      active
                        ? "bg-[var(--color-brand)] text-white"
                        : "bg-[#F3F4F6] text-[var(--color-ink)] hover:bg-[#E5E7EB]",
                    )}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </section>

          <hr className="border-[var(--color-border)]" />

          <section>
            <h3 className="text-sm font-bold text-[var(--color-ink)]">Capacity</h3>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              Showing venues for {draft.capacityMin} - {draft.capacityMax} guests.
            </p>
            <div className="mt-4 space-y-3">
              <label className="block text-xs text-[var(--color-muted)]">
                Min guests
                <input
                  type="range"
                  min={10}
                  max={1500}
                  step={10}
                  value={draft.capacityMin}
                  onChange={(e) =>
                    setDraft((prev) => ({
                      ...prev,
                      capacityMin: Math.min(Number(e.target.value), prev.capacityMax),
                    }))
                  }
                  className="mt-2 w-full accent-[var(--color-brand)]"
                />
              </label>
              <label className="block text-xs text-[var(--color-muted)]">
                Max guests
                <input
                  type="range"
                  min={10}
                  max={1500}
                  step={10}
                  value={draft.capacityMax}
                  onChange={(e) =>
                    setDraft((prev) => ({
                      ...prev,
                      capacityMax: Math.max(Number(e.target.value), prev.capacityMin),
                    }))
                  }
                  className="mt-2 w-full accent-[var(--color-brand)]"
                />
              </label>
            </div>
          </section>

          <hr className="border-[var(--color-border)]" />

          <section>
            <h3 className="text-sm font-bold text-[var(--color-ink)]">Price per hour (AED)</h3>
            <div className="mt-2 flex items-center justify-between text-sm font-medium text-[var(--color-ink)]">
              <span>AED {draft.priceMin.toFixed(2)}</span>
              <span>AED {draft.priceMax.toFixed(2)}</span>
            </div>
            <div className="mt-3 space-y-3">
              <label className="block text-xs text-[var(--color-muted)]">
                Min price
                <input
                  type="range"
                  min={10}
                  max={30000}
                  step={10}
                  value={draft.priceMin}
                  onChange={(e) =>
                    setDraft((prev) => ({
                      ...prev,
                      priceMin: Math.min(Number(e.target.value), prev.priceMax),
                    }))
                  }
                  className="mt-2 w-full accent-[var(--color-brand)]"
                />
              </label>
              <label className="block text-xs text-[var(--color-muted)]">
                Max price
                <input
                  type="range"
                  min={10}
                  max={30000}
                  step={10}
                  value={draft.priceMax}
                  onChange={(e) =>
                    setDraft((prev) => ({
                      ...prev,
                      priceMax: Math.max(Number(e.target.value), prev.priceMin),
                    }))
                  }
                  className="mt-2 w-full accent-[var(--color-brand)]"
                />
              </label>
            </div>
          </section>

          <hr className="border-[var(--color-border)]" />

          <section>
            <h3 className="text-sm font-bold text-[var(--color-ink)]">Event / Occasion</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {occasions.map((item) => {
                const active = draft.occasions.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleChip("occasions", item)}
                    className={cn(
                      "rounded-md px-3 py-1.5 text-sm transition",
                      active
                        ? "bg-[var(--color-brand)] text-white"
                        : "bg-[#F3F4F6] text-[var(--color-ink)] hover:bg-[#E5E7EB]",
                    )}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </section>

          <hr className="border-[var(--color-border)]" />

          <section className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-[var(--color-ink)]">Verified Only</h3>
              <p className="mt-1 text-sm text-[var(--color-muted)]">
                Show only verified venues.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={draft.verifiedOnly}
              onClick={() =>
                setDraft((prev) => ({ ...prev, verifiedOnly: !prev.verifiedOnly }))
              }
              className={cn(
                "relative h-7 w-12 shrink-0 rounded-full transition",
                draft.verifiedOnly ? "bg-[var(--color-brand)]" : "bg-[#D1D5DB]",
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow transition",
                  draft.verifiedOnly && "translate-x-5",
                )}
              />
            </button>
          </section>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-[var(--color-border)] px-5 py-4">
          <button
            type="button"
            onClick={() => setDraft(defaultSearchFilters)}
            className="h-11 rounded-md bg-[#F3F4F6] px-4 text-sm font-semibold text-[var(--color-ink)] transition hover:bg-[#E5E7EB]"
          >
            Clear All
          </button>
          <button
            type="button"
            onClick={() => {
              onApply(draft);
              onClose();
            }}
            className="h-11 rounded-md bg-[var(--color-brand)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--color-brand-hover)]"
          >
            Apply Filters
          </button>
        </div>
      </aside>
    </div>
  );
}
