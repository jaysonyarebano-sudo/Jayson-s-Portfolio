import { ArrowUpRight, ImagePlus } from "lucide-react";
import Image from "next/image";

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

/**
 * Shows a real, redacted asset when `src` is set; otherwise a clearly marked placeholder.
 * Never renders simulated screenshots.
 */
export function EvidenceSlot({
  title,
  src,
  alt,
  width = 1200,
  height = 750,
}: {
  title: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
}) {
  if (src) {
    return (
      <figure className="overflow-hidden rounded-lg border border-line bg-white">
        <Image src={src} alt={alt} width={width} height={height} className="h-auto w-full" />
        <figcaption className="border-t border-line px-4 py-2 text-xs text-muted">{title}</figcaption>
      </figure>
    );
  }
  return (
    <div className="flex aspect-[16/9] flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 bg-paper-2/60 p-4 text-center">
      <ImagePlus aria-hidden="true" className="size-5 text-slate-400" />
      <p className="text-sm font-medium text-ink">{title}</p>
      <p className="font-mono text-[11px] tracking-wider text-slate-500 uppercase">Evidence to be added</p>
    </div>
  );
}
