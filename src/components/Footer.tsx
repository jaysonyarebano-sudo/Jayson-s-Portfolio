"use client";

import { useEffect, useState } from "react";
import { links, navItems, profile } from "@/data/portfolio";
import { ExternalLink } from "./ui";

export function Footer({ buildYear }: { buildYear: number }) {
  // Starts with the build year, then corrects to the visitor's current year.
  const [year, setYear] = useState(buildYear);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="on-dark border-t border-white/10 bg-navy-950 text-slate-300">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-mono text-sm tracking-[0.2em] text-white">{profile.wordmark}</p>
          <p className="mt-2 text-sm">{profile.titleLong}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <ExternalLink href={links.resume} className="inline-flex items-center gap-1 hover:text-white">
                Resume
              </ExternalLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-slate-400 sm:px-6">
          © {year} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
