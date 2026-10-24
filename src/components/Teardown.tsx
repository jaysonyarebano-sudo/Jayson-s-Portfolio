import { CalendarDays, Check, ClipboardList, FileText, Link2, Mail } from "lucide-react";
import { links, profile, teardownCopy } from "@/data/portfolio";
import { ExternalLink } from "./ui";

/** Closing CTA: what the free strategy covers, with the Google Form and booking link as the next steps. */
export function Teardown() {
  return (
    <section id="teardown" aria-labelledby="teardown-title" className="on-dark relative overflow-hidden bg-navy-900 py-20 text-white sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_top,black,transparent_80%)]"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <p className="eyebrow text-accent-bright">{teardownCopy.eyebrow}</p>
            <h2 id="teardown-title" className="mt-3 text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-[2.6rem]">
              {teardownCopy.headline}
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-slate-300 lg:col-span-5">{teardownCopy.body}</p>
        </div>

        <p className="mt-12 font-mono text-xs tracking-wider text-slate-400 uppercase">What you get back</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {teardownCopy.deliverables.map((d) => (
            <li key={d} className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-5 text-[15px] leading-relaxed text-slate-200">
              <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-accent-bright" />
              {d}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ExternalLink href={links.strategyForm} className="btn-primary px-6 py-3.5 text-base">
            <ClipboardList aria-hidden="true" className="size-5" />
            Get my free strategy preview
          </ExternalLink>
          {links.booking && (
            <ExternalLink href={links.booking} className="btn-outline-dark px-6 py-3.5 text-base">
              <CalendarDays aria-hidden="true" className="size-5" />
              Book a 30-minute strategy call
            </ExternalLink>
          )}
          <p className="text-sm text-slate-400 sm:ml-2">The form takes about 4 minutes.</p>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <li>
              <a href={`mailto:${links.email}`} className="inline-flex items-center gap-2 text-slate-300 hover:text-white">
                <Mail aria-hidden="true" className="size-4" />
                {links.email}
              </a>
            </li>
            {links.linkedin && (
              <li>
                <ExternalLink href={links.linkedin} className="inline-flex items-center gap-2 text-slate-300 hover:text-white">
                  <Link2 aria-hidden="true" className="size-4" />
                  LinkedIn
                </ExternalLink>
              </li>
            )}
            <li>
              <ExternalLink href={links.resume} className="inline-flex items-center gap-2 text-slate-300 hover:text-white">
                <FileText aria-hidden="true" className="size-4" />
                Resume
              </ExternalLink>
            </li>
          </ul>
          <p className="text-sm text-slate-400">
            Based in {profile.location}. {profile.workPreference}.
          </p>
        </div>
      </div>
    </section>
  );
}
