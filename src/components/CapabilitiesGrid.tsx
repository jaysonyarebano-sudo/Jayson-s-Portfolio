import { ChartLine, MessagesSquare, PenLine, Search, ShieldCheck, Workflow, type LucideIcon } from "lucide-react";
import { capabilities, type CapabilityIcon } from "@/data/portfolio";
import { SectionHeader } from "./ui";

const icons: Record<CapabilityIcon, LucideIcon> = {
  search: Search,
  pen: PenLine,
  shield: ShieldCheck,
  messages: MessagesSquare,
  workflow: Workflow,
  chart: ChartLine,
};

export function CapabilitiesGrid() {
  return (
    <section id="capabilities" aria-labelledby="capabilities-title" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          id="capabilities-title"
          eyebrow="Capabilities"
          title="The whole outbound system, not just the sending"
          intro={<p>What the work involves day to day, and why it matters to the business.</p>}
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c) => {
            const Icon = icons[c.icon];
            return (
              <li key={c.title} className="flex flex-col rounded-xl border border-line bg-white p-6">
                <span className="inline-flex size-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <h3 className="mt-5 text-lg leading-snug font-semibold text-ink">{c.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{c.body}</p>
                <div className="mt-auto pt-5">
                  <p className="border-t border-line pt-4 text-sm leading-relaxed text-ink">
                    <span className="font-semibold">Business value: </span>
                    {c.value}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
