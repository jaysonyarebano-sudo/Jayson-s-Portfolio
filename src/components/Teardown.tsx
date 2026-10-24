"use client";

import { ArrowLeft, ArrowRight, CalendarDays, Check, CheckCircle2, FileText, Link2, Mail, Send } from "lucide-react";
import { useRef, useState } from "react";
import { googleFormAction, links, profile, strategyForm, teardownCopy, type FormField } from "@/data/portfolio";
import { ExternalLink } from "./ui";

type Values = Record<string, string | string[]>;

const inputClass =
  "mt-2 w-full rounded-lg border border-line bg-paper px-4 py-3 text-base outline-none placeholder:text-slate-400 focus:border-accent focus:bg-white";

/** Google's value for a checked "Other" option; its text goes in `<entry>.other_option_response`. */
const OTHER = "__other_option__";

const allFields = strategyForm.flatMap((s) => s.fields);
// The Google Form opens on an intro page, then one page per section.
const pageHistory = Array.from({ length: strategyForm.length + 1 }, (_, i) => i).join(",");

const asList = (v: Values[string] | undefined) => (Array.isArray(v) ? v : []);
const asText = (v: Values[string] | undefined) => (typeof v === "string" ? v : "");

function isVisible(field: FormField, values: Values) {
  if (!field.showWhen) return true;
  return field.showWhen.anyOf.includes(asText(values[field.showWhen.key]));
}

function readable(field: FormField, values: Values, other: Record<string, string>) {
  const v = values[field.key];
  if (Array.isArray(v)) return v.map((c) => (c === OTHER ? `Other: ${other[field.key] ?? ""}` : c)).join(", ");
  return v ?? "";
}

function buildBody(values: Values, other: Record<string, string>) {
  const body = new URLSearchParams();
  for (const field of allFields) {
    if (!isVisible(field, values)) continue;
    const v = values[field.key];
    if (Array.isArray(v)) {
      for (const choice of v) body.append(field.entry, choice);
      if (v.includes(OTHER)) body.append(`${field.entry}.other_option_response`, other[field.key] ?? "");
    } else if (v) {
      body.append(field.entry, v.trim());
    }
  }
  body.append("pageHistory", pageHistory);
  return body;
}

function emailSummary(values: Values, other: Record<string, string>) {
  return strategyForm
    .map((step) => {
      const lines = step.fields
        .filter((f) => isVisible(f, values) && readable(f, values, other))
        .map((f) => `${f.label}\n${readable(f, values, other)}`);
      return lines.length ? `${step.title.toUpperCase()}\n\n${lines.join("\n\n")}` : "";
    })
    .filter(Boolean)
    .join("\n\n");
}

function FieldInput({
  field,
  values,
  other,
  onValue,
  onOther,
}: {
  field: FormField;
  values: Values;
  other: Record<string, string>;
  onValue: (key: string, value: string | string[]) => void;
  onOther: (key: string, value: string) => void;
}) {
  const id = `sf-${field.key}`;
  const label = (
    <>
      {field.label} {!field.required && <span className="font-normal text-muted">(optional)</span>}
    </>
  );
  const hint = field.hint && <p className="mt-0.5 text-xs text-muted">{field.hint}</p>;

  if (field.kind === "checkboxes") {
    const selected = asList(values[field.key]);
    const toggle = (choice: string) =>
      onValue(field.key, selected.includes(choice) ? selected.filter((c) => c !== choice) : [...selected, choice]);
    // Requiring every box until one is ticked gives a "pick at least one" check with native validation.
    const needOne = field.required && selected.length === 0;
    const options = field.other ? [...(field.choices ?? []), OTHER] : (field.choices ?? []);
    const single = options.length === 1;

    return (
      <fieldset>
        <legend className="text-sm font-semibold">{single ? null : label}</legend>
        {!single && hint}
        <div className={single ? "" : "mt-3 flex flex-wrap gap-2"}>
          {options.map((choice) => {
            const checked = selected.includes(choice);
            return (
              <label
                key={choice}
                className={
                  single
                    ? "flex cursor-pointer items-start gap-3 text-sm leading-relaxed"
                    : `inline-flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-2 text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent ${
                        checked ? "border-accent bg-accent-soft font-medium text-accent-strong" : "border-line bg-paper hover:border-slate-400"
                      }`
                }
              >
                <input
                  type="checkbox"
                  checked={checked}
                  required={needOne}
                  onChange={() => toggle(choice)}
                  className={single ? "mt-0.5 size-4 accent-[var(--color-accent)]" : "sr-only"}
                />
                {!single && checked && <Check aria-hidden="true" className="size-3.5" />}
                {single ? label : choice === OTHER ? "Other" : choice}
              </label>
            );
          })}
        </div>
        {selected.includes(OTHER) && (
          <input
            aria-label={`${field.label}: other`}
            type="text"
            required
            value={other[field.key] ?? ""}
            onChange={(e) => onOther(field.key, e.target.value)}
            placeholder="Please specify"
            className={inputClass}
          />
        )}
      </fieldset>
    );
  }

  if (field.kind === "radio" || field.kind === "pills") {
    const current = asText(values[field.key]);
    return (
      <fieldset>
        <legend className="text-sm font-semibold">{label}</legend>
        {hint}
        <div className={`mt-3 grid gap-2 ${field.kind === "pills" ? "sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-4"}`}>
          {(field.choices ?? []).map((choice) => (
            <label
              key={choice}
              className={`flex cursor-pointer items-center justify-center rounded-lg border px-3 py-2.5 text-center text-sm font-medium transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent ${
                current === choice ? "border-accent bg-accent-soft text-accent-strong" : "border-line bg-paper hover:border-slate-400"
              }`}
            >
              <input
                type="radio"
                name={field.key}
                value={choice}
                required={field.required}
                checked={current === choice}
                onChange={() => onValue(field.key, choice)}
                className="sr-only"
              />
              {choice}
            </label>
          ))}
        </div>
      </fieldset>
    );
  }

  const common = {
    id,
    required: field.required,
    value: asText(values[field.key]),
    placeholder: field.placeholder,
    className: field.kind === "textarea" ? `${inputClass} resize-y` : inputClass,
  };

  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      {hint}
      {field.kind === "textarea" ? (
        <textarea rows={3} {...common} onChange={(e) => onValue(field.key, e.target.value)} />
      ) : (
        <input
          type={field.kind === "email" ? "email" : "text"}
          inputMode={field.kind === "url" ? "url" : undefined}
          autoComplete={field.kind === "email" ? "email" : field.key === "name" ? "name" : field.kind === "url" ? "url" : undefined}
          {...common}
          onChange={(e) => onValue(field.key, e.target.value)}
        />
      )}
    </div>
  );
}

/**
 * Multi-step strategy request that mirrors the Google Form question for question and posts to it,
 * so answers land in the form's responses (and its email notifications). If the post fails at the
 * network level, it falls back to the visitor's email app with every answer filled in.
 */
export function Teardown() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Values>({});
  const [other, setOther] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "mailto">("idle");
  const topRef = useRef<HTMLDivElement>(null);

  const last = strategyForm.length - 1;
  const current = strategyForm[step];
  const onValue = (key: string, value: string | string[]) => setValues((prev) => ({ ...prev, [key]: value }));
  const onOther = (key: string, value: string) => setOther((prev) => ({ ...prev, [key]: value }));

  const goTo = (next: number) => {
    setStep(next);
    topRef.current?.scrollIntoView({ block: "nearest" });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Only the current step's inputs are rendered, so native validation checks exactly this step.
    if (step < last) {
      goTo(step + 1);
      return;
    }
    setStatus("sending");
    try {
      // Google Forms sends no CORS headers, so the response is opaque; only a network error is visible.
      await fetch(googleFormAction, { method: "POST", mode: "no-cors", body: buildBody(values, other) });
      setStatus("sent");
    } catch {
      const subject = `Strategy request: ${asText(values.company) || asText(values.name)}`;
      window.location.href = `mailto:${links.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        emailSummary(values, other),
      )}`;
      setStatus("mailto");
    }
  };

  const reset = () => {
    setValues({});
    setOther({});
    setStep(0);
    setStatus("idle");
  };

  const firstName = asText(values.name).split(" ")[0];

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

            {links.booking && (
              <div className="mt-9 rounded-xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-sm text-slate-300">Prefer to talk it through?</p>
                <ExternalLink href={links.booking} className="btn-primary mt-3">
                  <CalendarDays aria-hidden="true" className="size-4" />
                  Book a 30-minute strategy call
                </ExternalLink>
              </div>
            )}

            <ul className="mt-6 flex flex-wrap gap-3">
              <li>
                <a href={`mailto:${links.email}`} className="btn-outline-dark">
                  <Mail aria-hidden="true" className="size-4" />
                  {links.email}
                </a>
              </li>
              {links.linkedin && (
                <li>
                  <ExternalLink href={links.linkedin} className="btn-outline-dark">
                    <Link2 aria-hidden="true" className="size-4" />
                    LinkedIn
                  </ExternalLink>
                </li>
              )}
              <li>
                <ExternalLink href={links.resume} className="btn-outline-dark">
                  <FileText aria-hidden="true" className="size-4" />
                  Resume
                </ExternalLink>
              </li>
            </ul>
            <p className="mt-6 text-sm text-slate-400">
              Based in {profile.location}. {profile.workPreference}.
            </p>
          </div>
        </div>

        <div ref={topRef} className="scroll-mt-24 self-start rounded-2xl bg-white p-6 text-ink shadow-2xl shadow-black/30 sm:p-8 lg:col-span-7">
          {status === "sent" ? (
            <div className="flex flex-col items-center py-16 text-center" role="status">
              <CheckCircle2 aria-hidden="true" className="size-12 text-accent" />
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">Request received</h3>
              <p className="mt-2 max-w-sm leading-relaxed text-muted">
                Thanks{firstName ? `, ${firstName}` : ""}. I&apos;ll reply to {asText(values.email)} with your strategy preview.
              </p>
              {links.booking && (
                <ExternalLink href={links.booking} className="btn-primary mt-8">
                  <CalendarDays aria-hidden="true" className="size-4" />
                  Want to talk sooner? Book a call
                </ExternalLink>
              )}
              <button type="button" onClick={reset} className="mt-4 text-sm font-semibold text-accent hover:text-accent-strong">
                Send another request
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit}>
              <div className="flex items-baseline justify-between gap-4">
                <p className="font-mono text-[11px] tracking-[0.14em] text-accent uppercase">
                  Step {step + 1} of {strategyForm.length}
                </p>
                <p className="text-xs text-muted">About 4 minutes</p>
              </div>
              <ol className="mt-3 grid gap-1.5" style={{ gridTemplateColumns: `repeat(${strategyForm.length}, minmax(0, 1fr))` }} aria-label="Form progress">
                {strategyForm.map((s, i) => (
                  <li key={s.title} aria-current={i === step ? "step" : undefined} title={s.title}>
                    <span className={`block h-1.5 rounded-full transition-colors duration-300 ${i <= step ? "bg-accent" : "bg-line"}`} />
                    <span className="sr-only">
                      {s.title}
                      {i < step ? " (done)" : ""}
                    </span>
                  </li>
                ))}
              </ol>

              <h3 className="mt-6 text-2xl font-semibold tracking-tight">{current.title}</h3>
              {current.intro && <p className="mt-1 text-sm text-muted">{current.intro}</p>}

              <div key={step} className="mt-6 space-y-6 motion-safe:animate-rise">
                {current.fields
                  .filter((f) => isVisible(f, values))
                  .map((f) => (
                    <FieldInput key={f.key} field={f} values={values} other={other} onValue={onValue} onOther={onOther} />
                  ))}
              </div>

              <div className="mt-8 flex items-center gap-3 border-t border-line pt-6">
                {step > 0 && (
                  <button type="button" onClick={() => goTo(step - 1)} className="btn-outline">
                    <ArrowLeft aria-hidden="true" className="size-4" />
                    Back
                  </button>
                )}
                <button type="submit" disabled={status === "sending"} className="btn-primary flex-1 disabled:opacity-60">
                  {step < last ? (
                    <>
                      Next: {strategyForm[step + 1].title}
                      <ArrowRight aria-hidden="true" className="size-4" />
                    </>
                  ) : (
                    <>
                      <Send aria-hidden="true" className="size-4" />
                      {status === "sending" ? "Sending…" : "Get my free strategy preview"}
                    </>
                  )}
                </button>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted" aria-live="polite">
                {status === "mailto"
                  ? `Your email app should have opened with your answers ready to send. If it didn't, email ${links.email} directly.`
                  : "Your answers go straight to me and are only used to prepare your strategy."}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
