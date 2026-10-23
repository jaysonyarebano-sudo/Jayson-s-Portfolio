"use client";

import { useId, useRef, useState } from "react";
import { strategyDive as s } from "@/data/portfolio";
import { Bullets, Label } from "./ui";

const tabs = ["Targeting", "List and costs", "Market and maths", "Sequence", "Replies"] as const;

function Targeting() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 lg:grid-cols-3">
        {s.segments.map((seg) => (
          <div key={seg.name} className="flex flex-col rounded-xl border border-line bg-white p-5">
            <p className="font-mono text-[11px] tracking-wider text-accent uppercase">Rank {seg.rank}</p>
            <h4 className="mt-1 text-lg font-semibold text-ink">{seg.name}</h4>
            <p className="text-sm text-slate-500">{seg.size}</p>
            <dl className="mt-4 space-y-3 text-sm leading-relaxed">
              <div>
                <dt className="font-semibold text-ink">Who I email</dt>
                <dd className="text-muted">{seg.deciders}</dd>
              </div>
              <div>
                <dt className="font-semibold text-ink">Signal that qualifies them</dt>
                <dd className="text-muted">{seg.signal}</dd>
              </div>
              <div>
                <dt className="font-semibold text-ink">Excluded</dt>
                <dd className="text-muted">{seg.exclude}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
      <div>
        <Label>Why support roles first</Label>
        <Bullets items={s.whyFirst} className="mt-3" />
      </div>
    </div>
  );
}

function ListAndCosts() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <Label>Cost per 1,000 leads</Label>
        <table className="mt-3 w-full text-left text-sm">
          <tbody className="divide-y divide-line border-y border-line">
            {s.costs.map((c) => (
              <tr key={c.item}>
                <th scope="row" className="py-3 pr-4 font-normal text-ink">
                  {c.item}
                </th>
                <td className="py-3 text-right font-semibold text-ink tabular-nums">{c.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          The Claygent check is the main cost, so at scale it only runs on firms that already passed the Apollo filters
          and have a verified decision-maker email.
        </p>
      </div>
      <div className="space-y-4">
        <div className="rounded-xl border border-line bg-white p-5">
          <Label>Spend control: test before the full run</Label>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-paper-2 p-4">
              <p className="text-sm text-muted line-through decoration-slate-400">{s.testPlan.full}</p>
            </div>
            <div className="rounded-lg bg-accent-soft p-4">
              <p className="text-sm font-semibold text-accent-strong">{s.testPlan.test}</p>
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted">{s.testPlan.body}</p>
        </div>
        <div className="rounded-xl border-l-4 border-accent bg-accent-soft/60 px-5 py-4">
          <p className="text-sm font-semibold text-accent-strong">The real sample</p>
          <p className="mt-1 text-[15px] leading-relaxed text-ink">{s.sampleNote}</p>
          <a href="#step-lists" className="mt-2 inline-block text-sm font-semibold text-accent hover:text-accent-strong">
            See the Clay table in step 2 of the process
          </a>
        </div>
      </div>
    </div>
  );
}

function MarketAndMaths() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-line bg-white p-5">
          <Label>What the inboxes can reach</Label>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-ink">{s.maths.capacity}</p>
          <p className="mt-1 text-sm text-muted">{s.maths.capacityNote}</p>
        </div>
        <div className="rounded-xl border border-accent bg-accent-soft/50 p-5">
          <Label className="text-accent-strong">What actually has a reason to hear from us</Label>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-ink">{s.maths.market}</p>
          <p className="mt-1 text-sm text-muted">{s.maths.marketNote}</p>
        </div>
      </div>
      <p className="max-w-3xl text-[15px] leading-relaxed text-ink">{s.maths.conclusion}</p>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <caption className="mb-3 text-left">
            <Label>Market size by segment (Apollo, United States)</Label>
          </caption>
          <thead>
            <tr className="border-b border-line text-slate-500">
              <th scope="col" className="py-2 pr-4 font-medium">Segment</th>
              <th scope="col" className="py-2 pr-4 text-right font-medium">Companies that fit</th>
              <th scope="col" className="py-2 pr-4 text-right font-medium">Hiring in last 30 days</th>
              <th scope="col" className="py-2 text-right font-medium">Share</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {s.market.map((row) => {
              const total = row.segment === "Total";
              return (
                <tr key={row.segment} className={total ? "font-semibold" : ""}>
                  <th scope="row" className={`py-3 pr-4 text-ink ${total ? "font-semibold" : "font-normal"}`}>
                    {row.segment}
                  </th>
                  <td className="py-3 pr-4 text-right text-ink tabular-nums">{row.fit}</td>
                  <td className="py-3 pr-4 text-right text-ink tabular-nums">{row.hiring}</td>
                  <td className="py-3 text-right text-accent-strong tabular-nums">{row.share}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <caption className="mb-3 text-left">
            <Label>Forecast from the 713 hiring firms, as a range</Label>
          </caption>
          <thead>
            <tr className="border-b border-line text-slate-500">
              <th scope="col" className="py-2 pr-4 font-medium">Scenario</th>
              <th scope="col" className="py-2 pr-4 text-right font-medium">Reply rate</th>
              <th scope="col" className="py-2 pr-4 text-right font-medium">Interested rate</th>
              <th scope="col" className="py-2 text-right font-medium">Per month</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {s.forecast.map((row) => (
              <tr key={row.scenario}>
                <th scope="row" className="py-3 pr-4 font-normal text-ink">
                  {row.scenario}
                </th>
                <td className="py-3 pr-4 text-right text-ink tabular-nums">{row.reply}</td>
                <td className="py-3 pr-4 text-right text-ink tabular-nums">{row.interested}</td>
                <td className="py-3 text-right text-ink tabular-nums">{row.perMonth}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-3 text-sm text-muted">
          A live job opening is a strong, timely reason to write, but recruiting is a crowded inbox. The real result
          should land between the two, and week three data shows where.
        </p>
      </div>
    </div>
  );
}

function Sequence() {
  return (
    <ol className="grid gap-4 lg:grid-cols-3">
      {s.sequence.map((e) => (
        <li key={e.step} className="flex flex-col rounded-xl border border-line bg-white p-5">
          <p className="font-mono text-[11px] tracking-wider text-accent uppercase">{e.step}</p>
          <p className="mt-2 font-semibold text-ink">{e.purpose}</p>
          <p className="mt-3 border-l-2 border-line pl-3 text-sm leading-relaxed text-muted italic">{e.excerpt}</p>
        </li>
      ))}
    </ol>
  );
}

function Replies() {
  return (
    <div className="space-y-6">
      <p className="max-w-3xl text-[15px] leading-relaxed text-ink">
        Interested replies get an answer within the hour, in the CEO&apos;s voice, with a specific next step. I drafted
        answers to the four replies a recruiter hears most:
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {s.replies.map((r) => (
          <div key={r.objection} className="rounded-xl border border-line bg-white p-5">
            <p className="font-semibold text-ink">{r.objection}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{r.reply}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl border-l-4 border-accent bg-accent-soft/60 px-5 py-4">
        <p className="text-sm font-semibold text-accent-strong">Caught before launch</p>
        <p className="mt-1 text-[15px] leading-relaxed text-ink">{s.clientQuestion}</p>
      </div>
    </div>
  );
}

const panels = [Targeting, ListAndCosts, MarketAndMaths, Sequence, Replies];

export function StrategyDive() {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (active + delta + tabs.length) % tabs.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const Panel = panels[active];

  return (
    <div className="rounded-2xl border border-line bg-paper p-5 sm:p-8">
      <p className="eyebrow">Strategy deep dive</p>
      <h4 className="mt-2 text-xl font-semibold tracking-tight text-ink sm:text-2xl">{s.title}</h4>
      <p className="mt-2 max-w-3xl leading-relaxed text-muted">{s.intro}</p>

      <div
        role="tablist"
        aria-label="Strategy sections"
        onKeyDown={onKeyDown}
        className="mt-6 -mx-1 flex gap-1 overflow-x-auto border-b border-line px-1"
      >
        {tabs.map((t, i) => (
          <button
            key={t}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${baseId}-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${baseId}-panel`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            className={`-mb-px shrink-0 border-b-2 px-3 py-2.5 text-sm font-medium whitespace-nowrap transition-colors ${
              active === i ? "border-accent text-ink" : "border-transparent text-muted hover:text-ink"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`${baseId}-panel`} aria-labelledby={`${baseId}-tab-${active}`} className="pt-7">
        <Panel />
      </div>
    </div>
  );
}
