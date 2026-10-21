import { ArrowRight } from "lucide-react";
import { cymateTotals, heroProof, heroTools, links, profile } from "@/data/portfolio";
import { ExternalLink } from "./ui";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="on-dark relative overflow-hidden bg-navy-950 text-white">
      {/* Fine grid texture, static and decorative. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pt-16 pb-14 sm:px-6 sm:pt-24 lg:grid-cols-12 lg:gap-10 lg:pb-20">
        <div className="motion-safe:animate-rise lg:col-span-7">
          <p className="eyebrow text-accent-bright">{profile.title}</p>
          <h1
            id="hero-title"
            className="mt-5 text-[2.25rem] leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.4rem]"
          >
            {profile.heroHeadline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">{profile.heroCopy}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#results" className="btn-primary">
              Explore Campaign Results
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
            <ExternalLink href={links.resume} className="btn-outline-dark">
              View Resume
            </ExternalLink>
          </div>
        </div>

        <div className="motion-safe:animate-rise lg:col-span-5 lg:pt-4 motion-safe:[animation-delay:120ms]">
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-6 sm:p-7">
            <p className="font-mono text-xs tracking-wider text-slate-400 uppercase">
              Recorded results · {cymateTotals.period}
            </p>
            <dl className="mt-5 divide-y divide-white/10">
              {heroProof.map((m) => (
                <div key={m.label} className="flex items-baseline gap-5 py-4 first:pt-0 last:pb-0">
                  <dt className="order-2 text-sm leading-snug text-slate-300">
                    <span className="block font-medium text-white">{m.label}</span>
                    {m.detail}
                  </dt>
                  <dd className="order-1 w-28 shrink-0 text-4xl font-semibold tracking-tight text-white tabular-nums sm:w-32 sm:text-[2.6rem]">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="lg:col-span-12">
          <div className="flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:gap-5">
            <p className="font-mono text-xs tracking-wider text-slate-400 uppercase">Core tools</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Core tools">
              {heroTools.map((t) => (
                <li key={t} className="text-sm font-medium text-slate-200">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
