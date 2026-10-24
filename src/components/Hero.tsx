import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { heroInfra, heroMetrics, heroScope, links, profile } from "@/data/portfolio";
import { ExternalLink } from "./ui";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="on-dark relative overflow-hidden bg-navy-950 text-white">
      {/* Fine grid texture, static and decorative. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />
      <div className="relative mx-auto max-w-6xl px-4 pt-14 pb-14 sm:px-6 sm:pt-20 lg:pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="motion-safe:animate-rise lg:col-span-7">
            <p className="eyebrow text-accent-bright">
              {profile.name} · {profile.title}
            </p>
            <h1
              id="hero-title"
              className="mt-5 text-[2.1rem] leading-[1.1] font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.2rem]"
            >
              {profile.heroHeadline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">{profile.heroCopy}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#case-studies" className="btn-primary">
                View Case Studies
                <ArrowRight aria-hidden="true" className="size-4" />
              </a>
              <a href="#teardown" className="btn-outline-dark">
                Get a Free Strategy Preview
              </a>
            </div>
            {links.booking && (
              <p className="mt-4 text-sm text-slate-400">
                Or{" "}
                <ExternalLink href={links.booking} showIcon={false} className="font-medium text-accent-bright underline-offset-4 hover:underline">
                  book a 30-minute strategy call
                </ExternalLink>
                .
              </p>
            )}
          </div>

          <div className="motion-safe:animate-rise lg:col-span-5 motion-safe:[animation-delay:120ms]">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-[1.75rem] border border-accent-bright/20 sm:-inset-4"
              />
              <Image
                src={profile.headshot.src}
                alt={`Portrait of ${profile.name}`}
                width={profile.headshot.width}
                height={profile.headshot.height}
                priority
                sizes="(min-width: 1024px) 440px, (min-width: 640px) 384px, 90vw"
                className="relative aspect-[4/5] w-full rounded-2xl object-cover object-[50%_20%] shadow-2xl shadow-black/40"
              />
              <div className="absolute -bottom-5 left-4 rounded-xl border border-white/10 bg-navy-900/95 px-4 py-3 shadow-xl backdrop-blur sm:left-6">
                <p className="font-mono text-[11px] tracking-wider text-accent-bright uppercase">Works with</p>
                <p className="text-sm font-medium text-white">{profile.workPreference}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 rounded-2xl border border-white/10 bg-white/[0.04] p-6 motion-safe:animate-rise sm:p-8 motion-safe:[animation-delay:200ms]">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <p className="font-mono text-xs tracking-wider text-slate-400 uppercase">Track record · {heroScope}</p>
            <p className="text-xs text-slate-400">{heroInfra}</p>
          </div>
          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-7 md:grid-cols-3 lg:grid-cols-5">
            {heroMetrics.map((m) => (
              <div key={m.label} className="flex flex-col">
                <dt className="order-2 mt-1.5 text-sm leading-snug">
                  <span className="block font-medium text-white">{m.label}</span>
                  {m.detail && <span className="text-xs text-slate-400">{m.detail}</span>}
                </dt>
                <dd className="order-1 text-4xl font-semibold tracking-tight text-white tabular-nums sm:text-5xl">
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
