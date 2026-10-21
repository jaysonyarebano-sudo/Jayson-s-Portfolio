import type { CaseStudy } from "@/data/portfolio";
import { InlineMetric } from "./MetricCard";
import { EvidenceSlot } from "./ui";

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="font-mono text-[11px] font-medium tracking-[0.14em] text-slate-500 uppercase">{title}</h4>
      <div className="mt-2 text-[15px] leading-relaxed text-ink">{children}</div>
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="relative pl-4">
          <span aria-hidden="true" className="absolute top-[0.6em] left-0 size-1.5 rounded-full bg-accent" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function CaseStudyDetail({ study }: { study: CaseStudy }) {
  return (
    <div className="grid gap-8 border-t border-line pt-8 lg:grid-cols-2 lg:gap-x-12">
      <div className="space-y-7">
        <Block title="Business context">
          <p>{study.context}</p>
        </Block>
        <Block title="Challenge">
          <p>{study.challenge}</p>
        </Block>
        <Block title="Jayson's responsibilities">
          <List items={study.responsibilities} />
        </Block>
        <Block title="Strategy and execution">
          <List items={study.execution} />
        </Block>
      </div>
      <div className="space-y-7">
        <Block title="Verified results">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 rounded-lg border border-line bg-paper p-5 sm:grid-cols-3">
            {study.results.map((m) => (
              <InlineMetric
                key={m.label}
                metric={m}
                valueClass="text-xl text-ink"
                labelClass="text-xs leading-snug text-muted"
              />
            ))}
          </dl>
          {study.resultsNote && <p className="mt-3 text-xs leading-relaxed text-slate-500">{study.resultsNote}</p>}
        </Block>
        <Block title="Lessons and next steps">
          <List items={study.lessons} />
        </Block>
        <Block title="Evidence">
          <div className="grid gap-3">
            {study.evidence.map((e) => (
              <EvidenceSlot key={e.title} {...e} />
            ))}
          </div>
        </Block>
      </div>
    </div>
  );
}
