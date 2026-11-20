"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent } from "react";

const columns = [
  {
    title: "Venuze",
    links: [
      { label: "About", href: "#" },
      { label: "News", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Investors", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Listings your venue", href: "#" },
      { label: "Listing your service", href: "#" },
      { label: "Help center", href: "#" },
      { label: "FAQ", href: "#" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Venue types", href: "/search" },
      { label: "Venue features", href: "/search" },
      { label: "Service options", href: "/search" },
      { label: "Locations", href: "/search" },
    ],
  },
  {
    title: "Legal & Privacy",
    links: [
      { label: "Terms of service", href: "#" },
      { label: "Payment & refund policy", href: "#" },
      { label: "Host agreement", href: "#" },
      { label: "Vendor agreement", href: "#" },
    ],
  },
] as const;

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.03H7.9v-2.9h2.4V9.41c0-2.37 1.41-3.68 3.56-3.68 1.03 0 2.12.18 2.12.18v2.34h-1.2c-1.18 0-1.55.73-1.55 1.48v1.78h2.64l-.42 2.9h-2.22V22c4.78-.75 8.44-4.91 8.44-9.93z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
    </svg>
  );
}

export function Footer() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[60%_1fr] lg:gap-16">
          <div className="flex flex-col gap-8">  
          <div className="flex shrink-0 items-start gap-3 lg:gap-5">
            <Image
              src="/images/VenuzeLogo.png"
              alt="Venuze"
              width={44}
              height={44}
              className="h-11 w-11 lg:h-13 lg:w-13 shrink-0 object-contain"
            />
            <p className="text-lg font-bold leading-snug text-white sm:text-xl max-w-md">
              Make it memorable—book the perfect venue and the pros who make it shine.
            </p>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-4 lg:gap-10">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-base font-semibold text-white">{column.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-[#A0A0A0] transition hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          </div>

          <div className="w-full shrink-0 max-w-md ml-auto mt-auto">
            <h3 className="text-xl font-semibold text-white">Get in Touch</h3>
            <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="h-11 w-full rounded-lg border-0 bg-[#1A1A1A] px-3 text-sm text-white outline-none placeholder:text-[#A0A0A0] focus:ring-1 focus:ring-[#FF523B]/50"
              />
              <textarea
                name="message"
                placeholder="Message"
                rows={4}
                required
                className="w-full resize-none rounded-lg border-0 bg-[#1A1A1A] px-3 py-2.5 text-sm text-white outline-none placeholder:text-[#A0A0A0] focus:ring-1 focus:ring-[#FF523B]/50"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex h-10 items-center justify-center rounded-lg bg-[#FF523B] px-5 text-sm font-semibold text-white transition hover:bg-[#e84730]"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 text-white">
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X">
              <XIcon className="h-4 w-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
          </div>
          <p className="text-sm text-[#A0A0A0]">© 2026 Venuze. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
