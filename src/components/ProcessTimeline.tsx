import { processSteps } from "@/data/portfolio";
import { SectionHeader } from "./ui";

export function ProcessTimeline() {
  return (
    <section id="process" aria-labelledby="process-title" className="on-dark bg-navy-950 py-20 text-white sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          id="process-title"
          eyebrow="Outbound workflow"
          title="Six steps from research to booked meetings"
          intro={<p>The sequence behind each campaign. Every step feeds the next one.</p>}
          dark
        />

        <ol className="relative mt-12 grid gap-0 lg:grid-cols-6 lg:gap-6">
          {/* Connector: vertical on mobile, horizontal on desktop. */}
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[17px] w-px bg-white/15 lg:hidden" />
          <span
            aria-hidden="true"
            className="absolute top-[18px] right-[8%] left-[8%] hidden h-px bg-white/15 lg:block"
          />
          {processSteps.map((step, i) => (
            <li key={step.title} className="relative flex gap-5 pb-8 last:pb-0 lg:flex-col lg:gap-4 lg:pb-0">
              <span className="relative z-10 inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-accent-bright/60 bg-navy-950 font-mono text-sm text-accent-bright">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-semibold text-white">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
