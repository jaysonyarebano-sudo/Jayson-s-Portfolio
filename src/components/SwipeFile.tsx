import { swipeFile, swipeIntro } from "@/data/portfolio";
import { EmailCard } from "./EmailCard";
import { SectionHeader } from "./ui";

export function SwipeFile() {
  return (
    <section id="swipe-file" aria-labelledby="swipe-title" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          id="swipe-title"
          eyebrow="Swipe file"
          title="Copy samples, annotated line by line"
          intro={<p>{swipeIntro}</p>}
        />

        <ol className="mt-12 space-y-14">
          {swipeFile.map((t, i) => (
            <li key={t.scenario}>
              <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                <p className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</p>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-ink">{t.scenario}</h3>
                  <p className="mt-0.5 text-sm text-muted">
                    <span className="font-medium text-ink">Use when: </span>
                    {t.when}
                  </p>
                </div>
              </div>
              <EmailCard email={t} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
