"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LogOut, User } from "lucide-react";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

function formatSearchSummary(
  location: string | null,
  when: string | null,
  guests: string | null,
) {
  const parts: string[] = [];

  if (location?.trim()) {
    parts.push(location.trim());
  }

  if (when) {
    const date = new Date(when);
    if (!Number.isNaN(date.getTime())) {
      parts.push(
        date.toLocaleDateString(undefined, {
          day: "numeric",
          month: "short",
        }),
      );
    }
  }

  if (guests) {
    const count = Number(guests);
    if (!Number.isNaN(count) && count > 0) {
      parts.push(`${count} ${count === 1 ? "Guest" : "Guests"}`);
    }
  }

  if (parts.length === 0) {
    return "Any destination · Any dates · Guests";
  }

  return parts.join(" · ");
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

  const summary = formatSearchSummary(
    searchParams.get("location"),
    searchParams.get("when"),
    searchParams.get("guests"),
  );

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
            <div
              className="max-w-md truncate rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-5 py-2 text-center text-sm font-medium text-[var(--color-ink)]"
              aria-label={`Current search: ${summary}`}
            >
              {summary}
            </div>
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
        <div className="border-t border-[var(--color-border)] px-4 py-2 md:hidden">
          <div className="truncate rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-2 text-center text-sm font-medium text-[var(--color-ink)]">
            {summary}
          </div>
        </div>
      ) : null}
    </header>
  );
}
