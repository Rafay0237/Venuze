import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  rightSlot?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, rightSlot, id, ...props }, ref) => {
    const inputId = id ?? props.name;

    return (
      <div className="w-full">
        {label ? (
          <label
            htmlFor={inputId}
            className="mb-2 block text-sm font-semibold text-[var(--color-ink)]"
          >
            {label}
          </label>
        ) : null}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "h-12 w-full rounded-xl border border-[var(--color-border)] bg-white px-4 text-[var(--color-ink)] placeholder:text-[var(--color-muted)] transition focus:border-[var(--color-brand)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]/20",
              rightSlot ? "pr-11" : undefined,
              error ? "border-red-400 focus:border-red-400 focus:ring-red-200" : undefined,
              className,
            )}
            {...props}
          />
          {rightSlot ? (
            <div className="absolute inset-y-0 right-3 flex items-center">{rightSlot}</div>
          ) : null}
        </div>
        {error ? <p className="mt-1.5 text-sm text-red-500">{error}</p> : null}
      </div>
    );
  },
);

Input.displayName = "Input";
