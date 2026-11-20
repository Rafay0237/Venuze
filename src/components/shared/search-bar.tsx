"use client";

import { useRouter } from "next/navigation";
import { Armchair, ChevronDown, Search, Sparkles } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";

type SearchMode = "venue" | "vendors";

const ACCENT = "#FF5037";
const ACCENT_HOVER = "#e84730";

const locationOptions = ["Dubai, UAE", "Abu Dhabi, UAE", "Doha, Qatar", "Riyadh, KSA"];
const whenOptions = ["Anytime", "This weekend", "Next week", "Next month"];
const guestOptions = ["1-10", "10-20", "20-50", "50-100", "100+"];

interface SearchBarProps {
  className?: string;
  initialLocation?: string;
  initialGuests?: string;
}

export function SearchBar({
  className,
  initialLocation = "Dubai, UAE",
  initialGuests = "10-20",
}: SearchBarProps) {
  const router = useRouter();
  const [mode, setMode] = useState<SearchMode>("venue");
  const [location, setLocation] = useState(
    initialLocation || "Dubai, UAE",
  );
  const [when, setWhen] = useState("Anytime");
  const [guests, setGuests] = useState(initialGuests || "10-20");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location.trim()) params.set("location", location.trim());
    if (when && when !== "Anytime") params.set("when", when);
    if (guests) params.set("guests", guests);
    if (mode === "vendors") params.set("type", "vendors");
    router.push(`/search?${params.toString()}`);
  }

  return (
    <div className={cn("relative mx-auto w-full max-w-[740px] sm:pt-5", className)}>
      <div className="absolute left-1/2 top-4 z-10 flex -translate-x-1/2 items-center rounded-lg bg-white p-1 px-2 shadow-[0_8px_28px_rgba(0,0,0,0.16)] sm:-top-2.5">
        <button
          type="button"
          onClick={() => setMode("venue")}
          className={cn(
            "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition",
            mode === "venue"
              ? "text-white"
              : "bg-transparent text-[var(--color-ink)] hover:bg-black/5",
          )}
          style={mode === "venue" ? { backgroundColor: ACCENT } : undefined}
        >
          <Armchair className="h-4 w-4" />
          Venue
        </button>
        <button
          type="button"
          onClick={() => setMode("vendors")}
          className={cn(
            "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition",
            mode === "vendors"
              ? "text-white"
              : "bg-transparent text-[var(--color-ink)] hover:bg-black/5",
          )}
          style={mode === "vendors" ? { backgroundColor: ACCENT } : undefined}
        >
          <Sparkles className="h-4 w-4" />
          Vendors
        </button>
      </div>

      <form
        onSubmit={onSubmit}
        className="flex w-full flex-col gap-2 rounded-lg bg-white p-3 pt-14 shadow-[0_16px_50px_rgba(0,0,0,0.22)] sm:flex-row sm:items-center sm:gap-0 sm:p-2 sm:pl-3"
      >
        <FieldSelect
          label="Where"
          value={location}
          options={locationOptions}
          onChange={setLocation}
        />
        <Divider />
        <FieldSelect
          label="When"
          value={when}
          options={whenOptions}
          onChange={setWhen}
        />
        <Divider />
        <FieldSelect
          label="Guests"
          value={guests}
          options={guestOptions}
          onChange={setGuests}
        />

        <button
          type="submit"
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg px-6 text-sm font-semibold text-white transition sm:ml-1"
          style={{ backgroundColor: ACCENT }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = ACCENT_HOVER;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = ACCENT;
          }}
        >
          <Search className="h-4 w-4" />
          Search
        </button>
      </form>
    </div>
  );
}

function Divider() {
  return <div className="hidden h-10 w-px shrink-0 bg-[var(--color-border)] sm:block" />;
}

function FieldSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="relative flex min-w-0 flex-1 cursor-pointer items-center justify-between gap-2 rounded-lg px-4 py-2.5">
      <div className="min-w-0 text-left">
        <span className="block text-xs font-medium text-[var(--color-muted)]">{label}</span>
        <span className="mt-0.5 block truncate text-sm font-semibold text-[var(--color-ink)]">
          {value}
        </span>
      </div>
      <ChevronDown className="h-4 w-4 shrink-0 text-[var(--color-muted)]" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 cursor-pointer opacity-0"
        aria-label={label}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
