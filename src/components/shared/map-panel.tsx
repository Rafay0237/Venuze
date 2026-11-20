"use client";

import type { Venue } from "@/types/venue";
import { cn } from "@/lib/utils/cn";

interface MapPanelProps {
  venues: Venue[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  className?: string;
}

export function MapPanel({ venues, selectedId, onSelect, className }: MapPanelProps) {
  return (
    <div
      className={cn(
        "relative h-full min-h-[320px] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[#e8efe9]",
        className,
      )}
    >
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(#d5dfd8 1px, transparent 1px), linear-gradient(90deg, #d5dfd8 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,90,95,0.08),transparent_45%),radial-gradient(circle_at_70%_70%,rgba(34,90,60,0.12),transparent_40%)]" />

      {venues.map((venue, index) => {
        const left = 18 + ((index * 17) % 64);
        const top = 16 + ((index * 23) % 58);
        const active = selectedId === venue.id;

        return (
          <button
            key={venue.id}
            type="button"
            onClick={() => onSelect?.(venue.id)}
            className={cn(
              "absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-1.5 text-xs font-semibold shadow-md transition",
              active
                ? "z-10 scale-110 bg-[var(--color-brand)] text-white"
                : "bg-white text-[var(--color-ink)] hover:scale-105",
            )}
            style={{ left: `${left}%`, top: `${top}%` }}
          >
            ${venue.pricePerHour}
          </button>
        );
      })}

      <div className="absolute bottom-3 left-3 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-medium text-[var(--color-muted)] shadow-sm backdrop-blur">
        Map preview · {venues.length} venues
      </div>
    </div>
  );
}
