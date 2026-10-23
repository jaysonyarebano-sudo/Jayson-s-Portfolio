import { processIntro, processSteps, type ProcessStep } from "@/data/portfolio";
import { Screenshot } from "./Screenshot";
import { Bullets, Label, SectionHeader, StatRow } from "./ui";

function StepBody({ step }: { step: ProcessStep }) {
  return (
    <div className="mt-7 space-y-8">
      {step.points && (
        <dl className="grid gap-3 sm:grid-cols-2">
          {step.points.map((p) => (
            <div key={p.label} className="rounded-xl border border-line bg-white p-5">
              <dt className="text-sm font-semibold text-ink">{p.label}</dt>
              <dd className="mt-1.5 text-[15px] leading-relaxed text-muted">{p.body}</dd>
            </div>
          ))}
        </dl>
      )}

      {step.pipeline && (
        <ol className="relative grid gap-3">
          {step.pipeline.map((p, i) => (
            <li key={p.title} className="flex gap-4 rounded-xl border border-line bg-white p-4 sm:p-5">
              <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-accent-soft font-mono text-sm text-accent-strong">
                {i + 1}
              </span>
              <div>
                <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-semibold text-ink">{p.title}</span>
                  <span className="font-mono text-[11px] tracking-wider text-slate-500 uppercase">{p.tool}</span>
                </p>
                <p className="mt-1 text-[15px] leading-relaxed text-muted">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      )}

      {step.bullets && (
        <div>
          <Label>{step.bullets.title}</Label>
          <Bullets items={step.bullets.items} className="mt-3" />
        </div>
      )}

      {step.callout && (
        <div className="rounded-xl border-l-4 border-accent bg-accent-soft/60 px-5 py-4">
          <p className="text-sm font-semibold text-accent-strong">{step.callout.title}</p>
          <p className="mt-1 text-[15px] leading-relaxed text-ink">{step.callout.body}</p>
        </div>
      )}

      {step.stats && <StatRow metrics={step.stats} className="border-y border-line py-5" />}

      {step.shot && <Screenshot shot={step.shot} />}
    </div>
  );
}

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          id="process-title"
          eyebrow="Process and methodology"
          title="How I work: a pipeline, not just emails"
          intro={<p>{processIntro}</p>}
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <nav aria-label="Process steps" className="hidden lg:col-span-3 lg:block">
            <ol className="sticky top-24 space-y-1 border-l border-line">
              {processSteps.map((step, i) => (
                <li key={step.id}>
                  <a
                    href={`#step-${step.id}`}
                    className="-ml-px flex gap-3 border-l-2 border-transparent py-1.5 pl-4 text-sm text-muted transition-colors hover:border-accent hover:text-ink"
                  >
                    <span className="font-mono text-xs text-slate-400">{String(i + 1).padStart(2, "0")}</span>
                    {step.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <ol className="space-y-16 lg:col-span-9 lg:space-y-20">
            {processSteps.map((step, i) => (
              <li key={step.id}>
                <article id={`step-${step.id}`} aria-labelledby={`step-${step.id}-title`} className="scroll-mt-24">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-10 items-center justify-center rounded-full bg-navy-950 font-mono text-sm text-accent-bright">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="eyebrow">{step.kicker}</p>
                  </div>
                  <h3
                    id={`step-${step.id}-title`}
                    className="mt-4 text-2xl font-semibold tracking-tight text-ink sm:text-[1.75rem]"
                  >
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-3xl text-[17px] leading-relaxed text-muted">{step.summary}</p>
                  <StepBody step={step} />
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
