import type { EmailSample } from "@/data/portfolio";

function NoteMarker({ n }: { n: number }) {
  return (
    <span
      aria-label={`note ${n}`}
      className="ml-1 inline-flex size-[18px] -translate-y-px items-center justify-center rounded-full bg-accent align-middle font-mono text-[10px] font-medium text-white"
    >
      {n}
    </span>
  );
}

function wordCount(email: EmailSample) {
  return email.body
    .flat()
    .map((l) => l.text.replace(/\{\{[^}]*\}\}/g, "x"))
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
}

/** An email rendered like a plain-text draft, with numbered annotations explaining each line. */
export function EmailCard({ email, compact = false }: { email: EmailSample; compact?: boolean }) {
  const words = wordCount(email);
  const maxSentences = Math.max(...email.body.map((p) => p.length));

  return (
    <div className={`grid gap-5 ${compact ? "" : "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-8"}`}>
      <div className="overflow-hidden rounded-xl border border-line bg-white shadow-[0_1px_2px_rgba(15,33,64,0.04),0_12px_32px_-18px_rgba(15,33,64,0.25)]">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-paper px-4 py-2.5">
          <p className="font-mono text-[11px] tracking-wider text-slate-500 uppercase">{email.label}</p>
          <span className="rounded border border-line bg-white px-1.5 py-0.5 font-mono text-[10px] tracking-wider text-slate-500 uppercase">
            {email.source}
          </span>
        </div>
        <div className="border-b border-line px-5 py-3 text-sm">
          <span className="text-slate-500">Subject: </span>
          <span className="font-semibold text-ink">{email.subject}</span>
        </div>
        <div className="space-y-3.5 px-5 py-5 text-[15px] leading-relaxed text-ink">
          {email.body.map((para, i) => (
            <p key={i}>
              {para.map((line, j) => (
                <span key={j}>
                  {j > 0 && " "}
                  {line.text}
                  {line.note && <NoteMarker n={line.note} />}
                </span>
              ))}
            </p>
          ))}
          <p className="text-slate-400">{"{{signature}}"}</p>
        </div>
        <dl className="flex flex-wrap gap-x-5 gap-y-1 border-t border-line bg-paper px-5 py-2.5 font-mono text-[11px] tracking-wide text-slate-500 uppercase">
          <div className="flex gap-1.5">
            <dt>Words</dt>
            <dd className="text-ink">{words}</dd>
          </div>
          <div className="flex gap-1.5">
            <dt>Max sentences / paragraph</dt>
            <dd className="text-ink">{maxSentences}</dd>
          </div>
          <div className="flex gap-1.5">
            <dt>Links</dt>
            <dd className="text-ink">0</dd>
          </div>
        </dl>
      </div>

      <ol className="space-y-3 self-center">
        {email.notes.map((note, i) => (
          <li key={note} className="flex gap-3 text-sm leading-relaxed text-muted">
            <span
              aria-hidden="true"
              className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full border border-accent font-mono text-[11px] text-accent"
            >
              {i + 1}
            </span>
            <span>
              <span className="sr-only">Note {i + 1}: </span>
              {note}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
