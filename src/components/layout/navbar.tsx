"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LogOut, Search, User } from "lucide-react";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

function formatWhen(when: string | null) {
  if (!when) return "Anytime";
  const date = new Date(when);
  if (!Number.isNaN(date.getTime())) {
    return date.toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
    });
  }
  return when;
}

function formatGuests(guests: string | null) {
  if (!guests?.trim()) return "Guests";
  const value = guests.trim();
  if (/guests?/i.test(value)) return value;
  return `${value} Guests`;
}

function SearchSummaryBar({
  location,
  when,
  guests,
  className,
}: {
  location: string;
  when: string;
  guests: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex max-w-full items-center rounded-lg border border-[var(--color-border)] bg-white py-1.5 pl-5 pr-1.5 shadow-[0_4px_18px_rgba(0,0,0,0.08)]",
        className,
      )}
      aria-label={`Current search: ${location}, ${when}, ${guests}`}
    >
      <span className="truncate text-sm font-medium text-[var(--color-ink)]">{location}</span>
      <span className="mx-3 h-4 w-px shrink-0 bg-[var(--color-border)]" />
      <span className="shrink-0 text-sm font-medium text-[var(--color-ink)]">{when}</span>
      <span className="mx-3 h-4 w-px shrink-0 bg-[var(--color-border)]" />
      <span className="truncate text-sm font-medium text-[var(--color-ink)]">{guests}</span>
      <span className="ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[var(--color-brand)] text-white">
        <Search className="h-3.5 w-3.5" />
      </span>
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, user, logout } = useAuthStore();

  const isHome = pathname === "/";
  const isSearch = pathname === "/search";

  function handleLogout() {
    logout();
    router.push("/login");
  }

  const locationLabel = searchParams.get("location")?.trim() || "Any destination";
  const whenLabel = formatWhen(searchParams.get("when"));
  const guestsLabel = formatGuests(searchParams.get("guests"));

  return (
    <header
      className={cn(
        "z-50 w-full",
        isHome
          ? "absolute inset-x-0 top-0 border-transparent bg-transparent"
          : "sticky top-0 border-b border-[var(--color-border)]/70 bg-white/95 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="relative block h-9 w-9 sm:h-10 sm:w-10">
            <Image
              src="/images/VenuzeLogo.png"
              alt=""
              fill
              priority
              className="object-contain"
              sizes="40px"
            />
          </span>
          <span
            className={cn(
              "text-xl font-bold tracking-tight",
              isHome ? "text-white" : "text-[var(--color-ink)]",
            )}
          >
            Venuze
          </span>
        </Link>

        {isSearch ? (
          <div className="hidden min-w-0 flex-1 justify-center px-4 md:flex">
            <SearchSummaryBar
              location={locationLabel}
              when={whenLabel}
              guests={guestsLabel}
            />
          </div>
        ) : (
          <div className="flex-1" />
        )}

        <div className="flex shrink-0 items-center gap-2">
          {isAuthenticated ? (
            <>
              <Button
                variant={isHome ? "secondary" : "outline"}
                size="sm"
                onClick={handleLogout}
                className={cn(
                  "gap-2",
                  isHome && "border-transparent bg-white/15 text-white hover:bg-white/25",
                )}
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Log out</span>
              </Button>
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold",
                  isHome
                    ? "bg-white/20 text-white"
                    : "bg-[var(--color-brand-soft)] text-[var(--color-brand)]",
                )}
                title={user?.email ?? "Account"}
              >
                {user?.email?.[0]?.toUpperCase() ?? <User className="h-4 w-4" />}
              </div>
            </>
          ) : (
            <Button
              size="sm"
              variant={isHome ? "secondary" : "primary"}
              className={cn(isHome && "bg-white text-[var(--color-ink)] hover:bg-white/90")}
              onClick={() => router.push("/login")}
            >
              Log in
            </Button>
          )}
        </div>
      </div>

      {isSearch ? (
        <div className="flex justify-center border-t border-[var(--color-border)] px-4 py-2 md:hidden">
          <SearchSummaryBar
            location={locationLabel}
            when={whenLabel}
            guests={guestsLabel}
            className="w-full max-w-md justify-between"
          />
        </div>
      ) : null}
    </header>
  );
}
