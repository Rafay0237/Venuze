"use client";

import { X } from "lucide-react";
import { useToastStore } from "@/features/ui/store/toast-store";
import { cn } from "@/lib/utils/cn";

export function ToastViewport() {
  const { toasts, dismiss } = useToastStore();

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-[min(100%-2rem,22rem)] flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3 text-sm shadow-lg",
            toast.type === "success" && "border-emerald-200 bg-emerald-50 text-emerald-900",
            toast.type === "error" && "border-red-200 bg-red-50 text-red-900",
            toast.type === "info" && "border-[var(--color-border)] bg-white text-[var(--color-ink)]",
          )}
        >
          <p className="flex-1 leading-snug">{toast.message}</p>
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => dismiss(toast.id)}
            className="rounded p-0.5 opacity-70 hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
