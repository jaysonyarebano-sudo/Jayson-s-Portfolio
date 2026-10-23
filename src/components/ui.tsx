import { ArrowUpRight } from "lucide-react";
import type { Metric } from "@/data/portfolio";

/** External link that always opens safely in a new tab and says so to screen readers. */
export function ExternalLink({
  href,
  children,
  className,
  showIcon = true,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  showIcon?: boolean;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      {showIcon && <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" />}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  id,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  intro?: React.ReactNode;
  id: string;
  dark?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <p className={dark ? "eyebrow text-accent-bright" : "eyebrow"}>{eyebrow}</p>
      <h2
        id={id}
        className={`mt-3 text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <div className={`mt-4 text-base leading-relaxed sm:text-lg ${dark ? "text-slate-300" : "text-muted"}`}>
          {intro}
        </div>
      )}
    </div>
  );
}

/** Small uppercase label used for sub-blocks inside sections. */
export function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`font-mono text-[11px] font-medium tracking-[0.14em] text-slate-500 uppercase ${className}`}>
      {children}
    </p>
  );
}

export function Bullets({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-2.5 ${className}`}>
      {items.map((item) => (
        <li key={item} className="relative pl-5 text-[15px] leading-relaxed text-ink">
          <span aria-hidden="true" className="absolute top-[0.6em] left-0 size-1.5 rounded-full bg-accent" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** A row of large numbers. Render on light backgrounds. */
export function StatRow({ metrics, className = "" }: { metrics: Metric[]; className?: string }) {
  return (
    <dl className={`grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 ${className}`}>
      {metrics.map((m) => (
        <div key={m.label} className="flex flex-col">
          <dt className="order-2 mt-1 text-sm leading-snug text-muted">{m.label}</dt>
          <dd className="order-1 text-3xl font-semibold tracking-tight text-ink tabular-nums">{m.value}</dd>
        </div>
      ))}
    </dl>
  );
}
