import { cymateTotals, otherResults, resultsDisclaimer } from "@/data/portfolio";
import { InlineMetric, MetricCard } from "./MetricCard";
import { SectionHeader } from "./ui";

export function ResultsOverview() {
  return (
    <section id="results" aria-labelledby="results-title" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          id="results-title"
          eyebrow="Results overview"
          title="Recorded campaign results"
          intro={
            <p>
              <strong className="font-semibold text-ink">{cymateTotals.scope}</strong>, combined totals for{" "}
              {cymateTotals.period}.
            </p>
          }
        />

        <dl className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {cymateTotals.metrics.map((m) => (
            <MetricCard key={m.label} metric={m} />
          ))}
        </dl>

        <div className="mt-4 flex flex-col gap-4 rounded-xl border border-line bg-paper-2/60 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <dl className="flex gap-8">
            {cymateTotals.infrastructure.map((m) => (
              <InlineMetric key={m.label} metric={m} valueClass="text-2xl text-ink" labelClass="text-sm text-muted" />
            ))}
          </dl>
          <p className="max-w-md text-sm leading-relaxed text-muted">
            Sending infrastructure configured across the same six accounts, with SPF, DKIM, DMARC, warmup and inbox
            rotation.
          </p>
        </div>

        <h3 className="mt-14 text-lg font-semibold text-ink">Other campaigns, reported separately</h3>
        <p className="mt-1 text-sm text-muted">Each card is a single campaign. Figures are never combined across clients.</p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {otherResults.map((r) => (
            <li key={r.label} className="flex flex-col rounded-xl border border-line bg-white p-5">
              <p className="text-sm font-semibold text-ink">{r.label}</p>
              {r.platform && (
                <p className="font-mono text-[11px] tracking-wider text-slate-500 uppercase">{r.platform}</p>
              )}
              <dl className="mt-4 grid grid-cols-2 gap-3">
                {r.metrics.map((m) => (
                  <InlineMetric
                    key={m.label}
                    metric={m}
                    valueClass="text-xl text-ink"
                    labelClass="text-xs leading-snug text-muted"
                  />
                ))}
              </dl>
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-slate-500">{resultsDisclaimer}</p>
      </div>
    </section>
  );
}
