import { cn } from "@/lib/utils/cn";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-[var(--color-ink)] shadow-sm backdrop-blur",
        className,
      )}
    >
      {children}
    </span>
  );
}
