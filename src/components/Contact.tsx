import { CalendarDays, FileText, Link2, Mail } from "lucide-react";
import { contactCopy, links, profile } from "@/data/portfolio";
import { ExternalLink } from "./ui";

export function Contact() {
  // Unset links stay hidden in the published site.
  const missing = [
    !links.email && "email",
    !links.linkedin && "linkedin",
    !links.booking && "booking",
    !links.siteUrl && "siteUrl",
  ].filter(Boolean);

  return (
    <section id="contact" aria-labelledby="contact-title" className="on-dark bg-navy-950 py-20 text-white sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <p className="eyebrow text-accent-bright">Contact</p>
          <h2 id="contact-title" className="mt-3 text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-5xl">
            {contactCopy.headline}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-300">{contactCopy.body}</p>
        </div>

        <ul className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {links.email && (
            <li>
              <a href={`mailto:${links.email}`} className="btn-primary w-full sm:w-auto">
                <Mail aria-hidden="true" className="size-4" />
                Email {links.email}
              </a>
            </li>
          )}
          <li>
            <ExternalLink href={links.resume} className={`${links.email ? "btn-outline-dark" : "btn-primary"} w-full sm:w-auto`}>
              <FileText aria-hidden="true" className="size-4" />
              View Resume
            </ExternalLink>
          </li>
          {links.linkedin && (
            <li>
              <ExternalLink href={links.linkedin} className="btn-outline-dark w-full sm:w-auto">
                <Link2 aria-hidden="true" className="size-4" />
                LinkedIn
              </ExternalLink>
            </li>
          )}
          {links.booking && (
            <li>
              <ExternalLink href={links.booking} className="btn-outline-dark w-full sm:w-auto">
                <CalendarDays aria-hidden="true" className="size-4" />
                Book a call
              </ExternalLink>
            </li>
          )}
        </ul>

        <p className="mt-8 text-sm text-slate-400">
          Based in {profile.location}. {profile.workPreference}.
        </p>

        {process.env.NODE_ENV === "development" && missing.length > 0 && (
          <p className="mt-8 rounded-lg border border-dashed border-amber-300/50 p-4 font-mono text-xs leading-relaxed text-amber-200">
            Development only, hidden in production: set {missing.join(", ")} in src/data/portfolio.ts to show them.
          </p>
        )}
      </div>
    </section>
  );
}
