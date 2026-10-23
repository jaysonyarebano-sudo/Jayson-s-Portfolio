import { Check, X } from "lucide-react";
import {
  caseDropCase,
  moreCampaigns,
  otherDashboards,
  replyProof,
  resultsDisclaimer,
  triggerCase,
} from "@/data/portfolio";
import { EmailCard } from "./EmailCard";
import { Screenshot } from "./Screenshot";
import { StrategyDive } from "./StrategyDive";
import { Label, SectionHeader, StatRow } from "./ui";

function CaseHeader({ number, name, angle, id }: { number: string; name: string; angle: string; id: string }) {
  return (
    <div className="max-w-3xl">
      <p className="font-mono text-xs tracking-[0.14em] text-accent uppercase">Case study {number}</p>
      <h3 id={id} className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
        {name}
      </h3>
      <p className="mt-3 text-[17px] leading-relaxed text-muted">
        <span className="font-semibold text-ink">The angle: </span>
        {angle}
      </p>
    </div>
  );
}

function ProofBlock({
  client,
  audience,
  platform,
  approach,
  children,
}: {
  client: string;
  audience: string;
  platform: string;
  approach: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-line bg-paper p-5 sm:p-7">
      <Label>Proof from a live campaign</Label>
      <p className="mt-2 text-lg font-semibold text-ink">{client}</p>
      <p className="text-sm text-slate-500">
        {audience} · {platform}
      </p>
      <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-ink">{approach}</p>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function TriggerCase() {
  const c = triggerCase;
  return (
    <article aria-labelledby="case-trigger-title" className="rounded-2xl border border-line bg-white p-5 sm:p-10">
      <CaseHeader number={c.number} name={c.name} angle={c.angle} id="case-trigger-title" />

      <div className="mt-8">
        <Label>Signals I build lists from</Label>
        <ul className="mt-3 grid gap-3 md:grid-cols-3">
          {c.signals.map((sig) => (
            <li key={sig.title} className="rounded-xl border border-line p-4">
              <p className="font-semibold text-ink">{sig.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{sig.body}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <ProofBlock {...c.proof}>
          <StatRow metrics={c.proof.metrics} />
          <p className="mt-4 text-sm font-medium text-accent-strong">{c.proof.accountNote}</p>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {c.proof.shots.map((shot) => (
              <Screenshot key={shot.src} shot={shot} sizes="(min-width: 1024px) 520px, 100vw" />
            ))}
          </div>
        </ProofBlock>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Label>How the list is filtered on the signal</Label>
          <ol className="mt-3 space-y-3">
            {c.listBuild.map((step, i) => (
              <li key={step} className="flex gap-3 text-[15px] leading-relaxed text-ink">
                <span className="font-mono text-sm text-accent">{i + 1}.</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
        <div className="lg:col-span-8">
          <Label>How the signal becomes a soft pitch</Label>
          <div className="mt-3">
            <EmailCard email={c.email} compact />
          </div>
        </div>
      </div>

      <div className="mt-10">
        <StrategyDive />
      </div>
    </article>
  );
}

function CaseDropCase() {
  const c = caseDropCase;
  return (
    <article aria-labelledby="case-drop-title" className="rounded-2xl border border-line bg-white p-5 sm:p-10">
      <CaseHeader number={c.number} name={c.name} angle={c.angle} id="case-drop-title" />

      <div className="mt-6 rounded-xl bg-navy-950 px-5 py-4 sm:px-6">
        <p className="font-mono text-[11px] tracking-wider text-accent-bright uppercase">The formula</p>
        <p className="mt-1 font-mono text-sm leading-relaxed text-white sm:text-base">{c.formula}</p>
      </div>

      <div className="mt-8">
        <ProofBlock {...c.proof}>
          <StatRow metrics={c.proof.metrics} />
          <div className="mt-6">
            <Screenshot shot={c.proof.shot} />
          </div>
        </ProofBlock>
      </div>

      <div className="mt-10">
        <Label>The drop email: under 120 words, one low-friction ask</Label>
        <div className="mt-3">
          <EmailCard email={c.email} />
        </div>
      </div>

      <div className="mt-10">
        <Label>Why the CTA matters</Label>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-line bg-paper-2/60 p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-slate-500">
              <X aria-hidden="true" className="size-4 text-red-700" />
              High friction
            </p>
            <p className="mt-2 text-lg text-muted">“{c.ctaCompare.high}”</p>
          </div>
          <div className="rounded-xl border border-accent bg-accent-soft/50 p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-accent-strong">
              <Check aria-hidden="true" className="size-4" />
              Low friction
            </p>
            <p className="mt-2 text-lg font-medium text-ink">“{c.ctaCompare.low}”</p>
          </div>
        </div>
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted">{c.ctaCompare.why}</p>
      </div>
    </article>
  );
}

export function CaseStudies() {
  return (
    <section
      id="case-studies"
      aria-labelledby="case-studies-title"
      className="border-t border-line bg-paper-2/50 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          id="case-studies-title"
          eyebrow="Core case studies"
          title="The two campaign types I run most, with the numbers behind them"
          intro={
            <p>
              Each one shows the angle, how the list was built, the copy, and recorded results with the dashboards they
              came from. Client names are withheld unless the client has agreed to be named.
            </p>
          }
        />

        <div className="mt-12 space-y-8">
          <TriggerCase />
          <CaseDropCase />
        </div>

        <div className="mt-16">
          <h3 className="text-xl font-semibold tracking-tight text-ink">More campaigns, reported separately</h3>
          <p className="mt-1 text-sm text-muted">
            Each card is one client account. Figures are never combined across clients.
          </p>
          <ul className="mt-6 grid items-start gap-5 md:grid-cols-2">
            {moreCampaigns.map((c) => (
              <li key={c.client} className="flex flex-col rounded-2xl border border-line bg-white p-5 sm:p-6">
                <p className="font-semibold text-ink">{c.client}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{c.what}</p>
                <dl className="mt-4 grid grid-cols-4 gap-3 border-t border-line pt-4">
                  {c.metrics.map((m) => (
                    <div key={m.label} className="flex flex-col">
                      <dt className="order-2 text-xs leading-snug text-muted">{m.label}</dt>
                      <dd className="order-1 text-xl font-semibold text-ink tabular-nums">{m.value}</dd>
                    </div>
                  ))}
                </dl>
                {c.shot && (
                  <div className="mt-5">
                    <Screenshot shot={c.shot} sizes="(min-width: 768px) 520px, 100vw" />
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[...otherDashboards, replyProof].map((shot) => (
              <Screenshot key={shot.src} shot={shot} sizes="(min-width: 768px) 360px, 100vw" />
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-xs leading-relaxed text-slate-500">{resultsDisclaimer}</p>
        </div>
      </div>
    </section>
  );
}
