"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import type { CaseStudy } from "@/data/portfolio";
import { CaseStudyDetail } from "./CaseStudyDetail";
import { InlineMetric } from "./MetricCard";

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  const [open, setOpen] = useState(false);
  const detailId = useId();
  const pick = study.highlight;
  const highlights = pick ? study.results.filter((m) => pick.includes(m.label)) : study.results.slice(0, 3);

  return (
    <article
      id={`case-${study.slug}`}
      aria-labelledby={`${detailId}-title`}
      className="rounded-2xl border border-line bg-white p-6 transition-shadow hover:shadow-[0_1px_2px_rgba(15,33,64,0.04),0_8px_24px_-12px_rgba(15,33,64,0.18)] sm:p-8"
    >
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] tracking-[0.14em] text-accent uppercase">{study.industry}</span>
            {study.anonymized && (
              <span className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] tracking-wider text-slate-500 uppercase">
                Anonymized
              </span>
            )}
          </div>
          <h3 id={`${detailId}-title`} className="mt-2 text-xl font-semibold tracking-tight text-ink sm:text-2xl">
            {study.client}
          </h3>
          {(study.platform || study.period) && (
            <p className="mt-1 text-sm text-slate-500">{[study.platform, study.period].filter(Boolean).join(" · ")}</p>
          )}
          <p className="mt-4 leading-relaxed text-muted">{study.summary}</p>
        </div>

        <dl className="grid grid-cols-2 content-start gap-x-6 gap-y-5 sm:grid-cols-3 lg:col-span-6 lg:border-l lg:border-line lg:pl-10">
          {highlights.map((m) => (
            <InlineMetric
              key={m.label}
              metric={m}
              valueClass="text-2xl tracking-tight text-ink sm:text-3xl"
              labelClass="mt-1 text-sm leading-snug text-muted"
            />
          ))}
        </dl>
      </div>

      <button
        type="button"
        aria-expanded={open}
        aria-controls={detailId}
        onClick={() => setOpen((v) => !v)}
        className="mt-6 inline-flex items-center gap-1.5 rounded-md text-sm font-semibold text-accent hover:text-accent-strong"
      >
        {open ? "Hide case study" : "Read the full case study"}
        <ChevronDown
          aria-hidden="true"
          className={`size-4 motion-safe:transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div id={detailId} hidden={!open} className="mt-6">
        <CaseStudyDetail study={study} />
      </div>
    </article>
  );
}
