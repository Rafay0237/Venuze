import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface ChipProps {
  label: string;
  onRemove?: () => void;
  className?: string;
}

export function Chip({ label, onRemove, className }: ChipProps) {
  if (onRemove) {
    return (
      <button
        type="button"
        onClick={onRemove}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--color-ink)] transition hover:bg-black/[0.03]",
          className,
        )}
      >
        {label}
        <X className="h-3 w-3 text-[var(--color-muted)]" />
      </button>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--color-ink)]",
        className,
      )}
    >
      {label}
    </span>
  );
}
