"use client";

import { useEffect, useState } from "react";

/**
 * Returns the id of the element currently crossing a thin band in the middle of the viewport,
 * so navigation can highlight where the reader is. Null until one is in view.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join("|");

  useEffect(() => {
    const els = key
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // A band from 35% to 45% down the screen: the step being read, not the one peeking in.
      { rootMargin: "-35% 0px -55% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key]);

  return active;
}
