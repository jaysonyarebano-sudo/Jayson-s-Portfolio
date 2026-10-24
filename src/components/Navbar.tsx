"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { links, navItems, profile } from "@/data/portfolio";
import { ExternalLink } from "./ui";
import { useActiveSection } from "./useActiveSection";

const sectionIds = ["top", ...navItems.map((i) => i.href.slice(1)), "teardown"];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="on-dark sticky top-0 z-40 border-b border-white/10 bg-navy-950/95 backdrop-blur supports-[backdrop-filter]:bg-navy-950/85">
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="font-mono text-sm font-medium tracking-[0.2em] text-white">
          {profile.wordmark}
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={active === item.href.slice(1) ? "location" : undefined}
                className={`relative py-5 text-sm transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full after:transition-colors ${
                  active === item.href.slice(1)
                    ? "font-medium text-white after:bg-accent-bright"
                    : "text-slate-300 after:bg-transparent hover:text-white"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ExternalLink
            href={links.resume}
            className="hidden items-center gap-1 text-sm text-slate-300 transition-colors hover:text-white lg:inline-flex"
          >
            Resume
          </ExternalLink>
          <a
            href="#teardown"
            className="hidden items-center rounded-lg bg-accent px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-strong sm:ml-3 sm:inline-flex"
          >
            Free Strategy Preview
          </a>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-lg text-white hover:bg-white/10 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          </button>
        </div>
      </nav>
      {/* Reading progress along the bottom edge of the header. */}
      <div aria-hidden="true" className="absolute inset-x-0 -bottom-px h-0.5 bg-transparent">
        <div className="h-full origin-left bg-accent-bright" style={{ transform: `scaleX(${progress})` }} />
      </div>

      <div id="mobile-menu" hidden={!open} className="border-t border-white/10 md:hidden">
        <ul className="mx-auto max-w-6xl px-4 py-3">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active === item.href.slice(1) ? "location" : undefined}
                className={`block rounded-md px-2 py-3 text-base hover:bg-white/5 hover:text-white ${
                  active === item.href.slice(1) ? "bg-white/5 font-medium text-white" : "text-slate-200"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="mt-2 border-t border-white/10 pt-3">
            <a
              href="#teardown"
              onClick={() => setOpen(false)}
              className="block rounded-md px-2 py-3 text-base font-semibold text-accent-bright hover:bg-white/5"
            >
              Free Strategy Preview
            </a>
          </li>
          <li>
            <ExternalLink
              href={links.resume}
              className="flex items-center gap-1.5 rounded-md px-2 py-3 text-base font-semibold text-white hover:bg-white/5"
            >
              View Resume
            </ExternalLink>
          </li>
        </ul>
      </div>
    </header>
  );
}
