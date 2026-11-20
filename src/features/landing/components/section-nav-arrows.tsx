"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface SectionNavArrowsProps {
  onPrev: () => void;
  onNext: () => void;
  className?: string;
  light?: boolean;
}

export function SectionNavArrows({
  onPrev,
  onNext,
  className,
  light = false,
}: SectionNavArrowsProps) {
  return (
    <div className={cn("flex items-center justify-end gap-3", className)}>
      <button
        type="button"
        aria-label="Previous"
        onClick={onPrev}
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-full border transition",
          light
            ? "border-white/40 text-white hover:bg-white/10"
            : "border-[var(--color-border)] bg-white text-[var(--color-ink)] hover:bg-black/5",
        )}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={onNext}
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-full border transition",
          light
            ? "border-white/40 text-white hover:bg-white/10"
            : "border-[var(--color-border)] bg-white text-[var(--color-ink)] hover:bg-black/5",
        )}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
