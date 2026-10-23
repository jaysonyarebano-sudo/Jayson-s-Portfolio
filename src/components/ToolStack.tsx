import { toolGroups } from "@/data/portfolio";
import { SectionHeader } from "./ui";

/** Each platform's own icon, served by Google's favicon service. */
const logoUrl = (domain: string) => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

export function ToolStack() {
  return (
    <section id="tools" aria-labelledby="tools-title" className="on-dark bg-navy-950 py-20 text-white sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          id="tools-title"
          eyebrow="Tool stack"
          title="The platforms behind the pipeline"
          intro={<p>Grouped by the job each one does. Tools change from client to client; the process doesn&apos;t.</p>}
          dark
        />
        <div className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {toolGroups.map((g) => (
            <div key={g.category}>
              <h3 className="font-mono text-xs tracking-[0.14em] text-slate-400 uppercase">{g.category}</h3>
              <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-3 xl:grid-cols-4">
                {g.tools.map((t) => (
                  <li key={t.name} className="group flex flex-col items-center gap-2 text-center" title={t.name}>
                    <span className="flex size-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-white/10 transition-transform group-hover:-translate-y-0.5">
                      {/* eslint-disable-next-line @next/next/no-img-element -- tiny remote icons, no optimization needed */}
                      <img src={logoUrl(t.domain)} alt="" width={32} height={32} loading="lazy" className="size-8 rounded-md" />
                    </span>
                    <span className="text-xs leading-tight text-slate-300">{t.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
