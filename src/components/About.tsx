import { Clock, GraduationCap, MapPin } from "lucide-react";
import { aboutParagraphs, profile, timeline } from "@/data/portfolio";
import { SectionHeader } from "./ui";

export function About() {
  const facts = [
    { icon: GraduationCap, label: "Education", value: `${profile.education.degree}, ${profile.education.school}` },
    { icon: MapPin, label: "Location", value: profile.location },
    { icon: Clock, label: "Availability", value: profile.workPreference },
  ];

  return (
    <section id="about" aria-labelledby="about-title" className="py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHeader id="about-title" eyebrow="About" title="Outbound as a complete system" />
          <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-muted">
            {aboutParagraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-xl border border-line bg-white p-4">
                <dt className="flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-slate-500 uppercase">
                  <Icon aria-hidden="true" className="size-4 text-accent" />
                  {label}
                </dt>
                <dd className="mt-2 text-sm leading-snug text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-5">
          <h3 className="text-lg font-semibold text-ink">Professional timeline</h3>
          <ol className="mt-6 space-y-0 border-l border-line">
            {timeline.map((t) => (
              <li key={t.org} className="relative pb-8 pl-6 last:pb-0">
                <span
                  aria-hidden="true"
                  className={`absolute top-1.5 -left-[5px] size-[9px] rounded-full ${
                    t.secondary ? "border border-slate-400 bg-paper" : "bg-accent"
                  }`}
                />
                <p className="font-mono text-xs tracking-wider text-slate-500 uppercase">{t.period}</p>
                <h4 className="mt-1 font-semibold text-ink">
                  {t.role} <span className="font-normal text-muted">· {t.org}</span>
                </h4>
                <p className={`mt-1.5 text-sm leading-relaxed ${t.secondary ? "text-slate-500" : "text-muted"}`}>
                  {t.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
