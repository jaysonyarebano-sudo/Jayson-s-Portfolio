"use client";

import { FileText, Link2, Mail, Send } from "lucide-react";
import { useState } from "react";
import { links, profile, teardownCopy } from "@/data/portfolio";
import { ExternalLink } from "./ui";

/**
 * Micro-commitment CTA. There is no backend, so submitting opens the visitor's
 * email app with the request addressed to Jayson and ready to send.
 */
export function Teardown() {
  const [email, setEmail] = useState("");
  const [sequence, setSequence] = useState("");
  const [opened, setOpened] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = "Free cold email teardown request";
    const body = [
      `Reply to: ${email}`,
      "",
      "My current first email (or a link to it):",
      sequence || "(not included)",
    ].join("\n");
    window.location.href = `mailto:${links.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  };

  return (
    <section id="teardown" aria-labelledby="teardown-title" className="on-dark relative overflow-hidden bg-navy-900 py-20 text-white sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_top,black,transparent_80%)]"
      />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <p className="eyebrow text-accent-bright">{teardownCopy.eyebrow}</p>
          <h2 id="teardown-title" className="mt-3 text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-[2.6rem]">
            {teardownCopy.headline}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-300">{teardownCopy.body}</p>

          <ul className="mt-8 flex flex-wrap gap-3">
            <li>
              <a href={`mailto:${links.email}`} className="btn-outline-dark">
                <Mail aria-hidden="true" className="size-4" />
                {links.email}
              </a>
            </li>
            <li>
              <ExternalLink href={links.resume} className="btn-outline-dark">
                <FileText aria-hidden="true" className="size-4" />
                Resume
              </ExternalLink>
            </li>
            {links.linkedin && (
              <li>
                <ExternalLink href={links.linkedin} className="btn-outline-dark">
                  <Link2 aria-hidden="true" className="size-4" />
                  LinkedIn
                </ExternalLink>
              </li>
            )}
          </ul>
          <p className="mt-6 text-sm text-slate-400">
            Based in {profile.location}. {profile.workPreference}.
          </p>
        </div>

        <form onSubmit={onSubmit} className="rounded-2xl bg-white p-6 text-ink shadow-2xl shadow-black/30 sm:p-8 lg:col-span-6">
          <label htmlFor="teardown-email" className="text-sm font-semibold">
            Your work email
          </label>
          <input
            id="teardown-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="mt-2 w-full rounded-lg border border-line bg-paper px-4 py-3 text-base outline-none focus:border-accent focus:bg-white"
          />

          <label htmlFor="teardown-sequence" className="mt-5 block text-sm font-semibold">
            Your current first email <span className="font-normal text-muted">(optional)</span>
          </label>
          <textarea
            id="teardown-sequence"
            rows={5}
            value={sequence}
            onChange={(e) => setSequence(e.target.value)}
            placeholder="Paste the subject line and body, or describe your sequence."
            className="mt-2 w-full resize-y rounded-lg border border-line bg-paper px-4 py-3 text-base outline-none focus:border-accent focus:bg-white"
          />

          <button type="submit" className="btn-primary mt-6 w-full">
            <Send aria-hidden="true" className="size-4" />
            Send me my teardown
          </button>
          <p className="mt-3 text-xs leading-relaxed text-muted" aria-live="polite">
            {opened
              ? `Your email app should have opened with the request ready to send. If it didn't, email ${links.email} directly.`
              : "Opens your email app with the request ready to send. Your details are only used to reply."}
          </p>
        </form>
      </div>
    </section>
  );
}
