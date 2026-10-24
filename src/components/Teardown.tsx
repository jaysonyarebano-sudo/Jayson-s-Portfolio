"use client";

import { Check, CheckCircle2, FileText, Link2, Mail, Send } from "lucide-react";
import { useState } from "react";
import {
  googleForm,
  infraChoices,
  links,
  platformChoices,
  profile,
  teardownCopy,
  type StrategyField,
} from "@/data/portfolio";
import { ExternalLink } from "./ui";

type Values = Record<StrategyField, string>;

const empty: Values = {
  email: "",
  name: "",
  website: "",
  offer: "",
  industries: "",
  locations: "",
  hasInfra: "",
  domains: "",
  mailboxes: "",
  platform: "",
  currentEmail: "",
};

const inputClass =
  "mt-2 w-full rounded-lg border border-line bg-paper px-4 py-3 text-base outline-none placeholder:text-slate-400 focus:border-accent focus:bg-white";

/** True once the Google Form is connected (see scripts/google-form-setup.gs). */
const formConnected = Boolean(googleForm.action) && Object.keys(googleForm.entries).length > 0;

function Field({
  id,
  label,
  optional,
  hint,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold">
        {label} {optional && <span className="font-normal text-muted">(optional)</span>}
      </label>
      {hint && <p className="mt-0.5 text-xs text-muted">{hint}</p>}
      {children}
    </div>
  );
}

function summary(v: Values) {
  const lines = [
    `Email: ${v.email}`,
    `Name: ${v.name || "-"}`,
    `Website: ${v.website || "-"}`,
    "",
    `What we sell: ${v.offer}`,
    `Target industries / niches: ${v.industries}`,
    `Target locations: ${v.locations}`,
    "",
    `Existing cold email infrastructure: ${v.hasInfra}`,
  ];
  if (v.hasInfra === "Yes") {
    lines.push(`Domains: ${v.domains || "-"}`, `Mailboxes: ${v.mailboxes || "-"}`, `Sending platform: ${v.platform || "-"}`);
  }
  lines.push("", "Current first email:", v.currentEmail || "(not included)");
  return lines.join("\n");
}

/**
 * Strategy preview request. Posts to a Google Form (which emails Jayson) once connected;
 * until then it opens the visitor's email app with every answer filled in.
 */
export function Teardown() {
  const [v, setV] = useState<Values>(empty);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "mailto">("idle");

  const set = (key: StrategyField) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setV((prev) => ({ ...prev, [key]: e.target.value }));

  const hasInfra = v.hasInfra === "Yes";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const values: Values = hasInfra ? v : { ...v, domains: "", mailboxes: "", platform: "" };

    if (formConnected) {
      setStatus("sending");
      const body = new URLSearchParams();
      for (const [key, entry] of Object.entries(googleForm.entries)) {
        const value = values[key as StrategyField];
        if (entry && value) body.append(entry, value);
      }
      try {
        // Google Forms sends no CORS headers, so the response is opaque; a network error is the only failure we can see.
        await fetch(googleForm.action, { method: "POST", mode: "no-cors", body });
        setStatus("sent");
        return;
      } catch {
        // Fall through to email.
      }
    }

    const subject = `Strategy preview request: ${values.industries.slice(0, 60)}`;
    window.location.href = `mailto:${links.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(summary(values))}`;
    setStatus("mailto");
  };

  return (
    <section id="teardown" aria-labelledby="teardown-title" className="on-dark relative overflow-hidden bg-navy-900 py-20 text-white sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_top,black,transparent_80%)]"
      />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow text-accent-bright">{teardownCopy.eyebrow}</p>
            <h2 id="teardown-title" className="mt-3 text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-[2.6rem]">
              {teardownCopy.headline}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-300">{teardownCopy.body}</p>

            <p className="mt-8 font-mono text-xs tracking-wider text-slate-400 uppercase">What you get back</p>
            <ul className="mt-3 space-y-3">
              {teardownCopy.deliverables.map((d) => (
                <li key={d} className="flex gap-3 text-[15px] leading-relaxed text-slate-200">
                  <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-accent-bright" />
                  {d}
                </li>
              ))}
            </ul>

            <ul className="mt-9 flex flex-wrap gap-3">
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
        </div>

        <div className="rounded-2xl bg-white p-6 text-ink shadow-2xl shadow-black/30 sm:p-8 lg:col-span-7">
          {status === "sent" ? (
            <div className="flex flex-col items-center py-16 text-center" role="status">
              <CheckCircle2 aria-hidden="true" className="size-12 text-accent" />
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">Request received</h3>
              <p className="mt-2 max-w-sm leading-relaxed text-muted">
                Thanks{v.name ? `, ${v.name.split(" ")[0]}` : ""}. I&apos;ll reply to {v.email} with your strategy preview.
              </p>
              <button type="button" onClick={() => { setV(empty); setStatus("idle"); }} className="btn-outline mt-8">
                Send another request
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-6">
              <fieldset className="space-y-5">
                <legend className="font-mono text-[11px] tracking-[0.14em] text-accent uppercase">1 · About you</legend>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="sp-email" label="Work email">
                    <input id="sp-email" type="email" required autoComplete="email" value={v.email} onChange={set("email")} placeholder="you@company.com" className={inputClass} />
                  </Field>
                  <Field id="sp-name" label="Name" optional>
                    <input id="sp-name" type="text" autoComplete="name" value={v.name} onChange={set("name")} className={inputClass} />
                  </Field>
                </div>
                <Field id="sp-website" label="Company website" optional>
                  <input id="sp-website" type="text" inputMode="url" autoComplete="url" value={v.website} onChange={set("website")} placeholder="yourcompany.com" className={inputClass} />
                </Field>
                <Field id="sp-offer" label="What do you sell?" hint="One or two sentences on the offer, and any results you can prove.">
                  <textarea id="sp-offer" required rows={2} value={v.offer} onChange={set("offer")} className={`${inputClass} resize-y`} />
                </Field>
              </fieldset>

              <div className="border-t border-line pt-6">
              <fieldset className="space-y-5">
                <legend className="font-mono text-[11px] tracking-[0.14em] text-accent uppercase">2 · Who you want to reach</legend>
                <Field id="sp-industries" label="Target industries or niches" hint="e.g. law firms with 11 to 200 staff, dental practices, Shopify brands">
                  <textarea id="sp-industries" required rows={2} value={v.industries} onChange={set("industries")} className={`${inputClass} resize-y`} />
                </Field>
                <Field id="sp-locations" label="Target locations" hint="Countries, states or cities">
                  <input id="sp-locations" type="text" required value={v.locations} onChange={set("locations")} placeholder="e.g. United States, Texas and Florida" className={inputClass} />
                </Field>
              </fieldset>
              </div>

              <div className="border-t border-line pt-6">
              <fieldset className="space-y-5">
                <legend className="font-mono text-[11px] tracking-[0.14em] text-accent uppercase">3 · Your infrastructure</legend>
                <div role="radiogroup" aria-labelledby="sp-infra-label">
                  <p id="sp-infra-label" className="text-sm font-semibold">Do you already have cold email infrastructure?</p>
                  <p className="mt-0.5 text-xs text-muted">Sending domains and mailboxes set up for outreach.</p>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {infraChoices.map((c) => (
                      <label
                        key={c}
                        className={`flex cursor-pointer items-center justify-center rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent ${
                          v.hasInfra === c ? "border-accent bg-accent-soft text-accent-strong" : "border-line bg-paper hover:border-slate-400"
                        }`}
                      >
                        <input type="radio" name="hasInfra" value={c} required checked={v.hasInfra === c} onChange={set("hasInfra")} className="sr-only" />
                        {c}
                      </label>
                    ))}
                  </div>
                </div>

                {hasInfra && (
                  <div className="grid gap-5 rounded-xl border border-line bg-paper/60 p-4 sm:grid-cols-3 motion-safe:animate-rise">
                    <Field id="sp-domains" label="Domains">
                      <input id="sp-domains" type="number" min={0} inputMode="numeric" value={v.domains} onChange={set("domains")} placeholder="e.g. 10" className={inputClass} />
                    </Field>
                    <Field id="sp-mailboxes" label="Mailboxes">
                      <input id="sp-mailboxes" type="number" min={0} inputMode="numeric" value={v.mailboxes} onChange={set("mailboxes")} placeholder="e.g. 30" className={inputClass} />
                    </Field>
                    <Field id="sp-platform" label="Sending platform">
                      <select id="sp-platform" value={v.platform} onChange={set("platform")} className={inputClass}>
                        <option value="">Select…</option>
                        {platformChoices.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>
                )}
                {v.hasInfra === "No" && (
                  <p className="text-sm text-muted">No problem. The preview will include a setup plan sized to your market.</p>
                )}
              </fieldset>
              </div>

              <div className="border-t border-line pt-6">
              <fieldset className="space-y-5">
                <legend className="font-mono text-[11px] tracking-[0.14em] text-accent uppercase">4 · For the teardown</legend>
                <div>
                  <Field id="sp-current" label="Your current first email" optional hint="Paste the subject line and body, and I'll annotate it like the swipe file.">
                    <textarea id="sp-current" rows={4} value={v.currentEmail} onChange={set("currentEmail")} className={`${inputClass} resize-y`} />
                  </Field>
                </div>
              </fieldset>
              </div>

              <div>
                <button type="submit" disabled={status === "sending"} className="btn-primary w-full disabled:opacity-60">
                  <Send aria-hidden="true" className="size-4" />
                  {status === "sending" ? "Sending…" : "Get my free strategy preview"}
                </button>
                <p className="mt-3 text-xs leading-relaxed text-muted" aria-live="polite">
                  {status === "mailto"
                    ? `Your email app should have opened with your answers ready to send. If it didn't, email ${links.email} directly.`
                    : formConnected
                      ? "Sent straight to my inbox. Your details are only used to prepare your preview."
                      : "Opens your email app with your answers ready to send. Your details are only used to prepare your preview."}
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
