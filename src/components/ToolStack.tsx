import { toolGroups } from "@/data/portfolio";
import { SectionHeader } from "./ui";

export function ToolStack() {
  return (
    <section id="tools" aria-labelledby="tools-title" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          id="tools-title"
          eyebrow="Technical stack"
          title="Tools, grouped by the job they do"
          intro={<p>Tools change from client to client. These are the ones I have worked with, grouped by use case.</p>}
        />
        <dl className="mt-10 divide-y divide-line border-y border-line">
          {toolGroups.map((g) => (
            <div key={g.category} className="grid gap-3 py-5 md:grid-cols-12 md:gap-6">
              <dt className="text-sm font-semibold text-ink md:col-span-3">{g.category}</dt>
              <dd className="md:col-span-9">
                <ul className="flex flex-wrap gap-2">
                  {g.tools.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
