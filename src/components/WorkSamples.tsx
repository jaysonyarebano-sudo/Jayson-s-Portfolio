import { workSamples } from "@/data/portfolio";
import { EvidenceSlot, SectionHeader } from "./ui";

export function WorkSamples() {
  return (
    <section id="samples" aria-labelledby="samples-title" className="border-t border-line bg-paper-2/50 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          id="samples-title"
          eyebrow="Work samples"
          title="Redacted samples of the day to day work"
          intro={
            <p>
              Samples are being redacted to remove client names, prospect data and private domains. Nothing on this
              page is a simulated screenshot.
            </p>
          }
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {workSamples.map((s) => (
            <li key={s.title} className="flex flex-col rounded-xl border border-line bg-white p-4">
              <EvidenceSlot title={s.title} src={s.src} alt={s.alt} width={s.width} height={s.height} />
              <h3 className="mt-4 px-1 font-semibold text-ink">{s.title}</h3>
              <p className="mt-1 px-1 pb-1 text-sm leading-relaxed text-muted">{s.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
