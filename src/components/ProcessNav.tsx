"use client";

import { useActiveSection } from "./useActiveSection";

type Step = { id: string; title: string };

/** Step index for the process section that follows the reader: a sticky sidebar on desktop, a slim bar on mobile. */
export function ProcessNav({ steps }: { steps: Step[] }) {
  const ids = steps.map((s) => `step-${s.id}`);
  const activeId = useActiveSection(ids);
  const activeIndex = Math.max(0, ids.indexOf(activeId ?? ""));
  const progress = ((activeIndex + 1) / steps.length) * 100;

  return (
    <>
      <nav aria-label="Process steps" className="hidden lg:col-span-3 lg:block">
        <div className="sticky top-24">
          <ol className="space-y-1 border-l border-line">
            {steps.map((step, i) => {
              const isActive = activeId === ids[i];
              return (
                <li key={step.id}>
                  <a
                    href={`#${ids[i]}`}
                    aria-current={isActive ? "step" : undefined}
                    className={`-ml-px flex gap-3 border-l-2 py-1.5 pl-4 text-sm transition-colors duration-200 ${
                      isActive
                        ? "border-accent font-semibold text-ink"
                        : "border-transparent text-muted hover:border-line hover:text-ink"
                    }`}
                  >
                    <span className={`font-mono text-xs ${isActive ? "text-accent" : "text-slate-400"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {step.title}
                  </a>
                </li>
              );
            })}
          </ol>
          <div className="mt-6 pl-4">
            <p className="font-mono text-[11px] tracking-wider text-slate-500 uppercase">
              Step {activeIndex + 1} of {steps.length}
            </p>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-line" aria-hidden="true">
              <div className="h-full rounded-full bg-accent transition-[width] duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile: a slim sticky bar under the header naming the current step. */}
      <div aria-hidden="true" className="sticky top-16 z-30 -mx-4 border-b border-line bg-paper/95 px-4 py-2.5 backdrop-blur sm:-mx-6 sm:px-6 lg:hidden">
        <p className="flex items-baseline gap-2 text-sm">
          <span className="font-mono text-xs text-accent">
            {String(activeIndex + 1).padStart(2, "0")}/{String(steps.length).padStart(2, "0")}
          </span>
          <span className="truncate font-medium text-ink">{steps[activeIndex].title}</span>
        </p>
        <div className="mt-2 h-0.5 overflow-hidden rounded-full bg-line">
          <div className="h-full bg-accent transition-[width] duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </>
  );
}
