import { ArrowRight } from "lucide-react";
import { caseStudies, links } from "@/data/portfolio";
import { CaseStudyCard } from "./CaseStudyCard";
import { ExternalLink, SectionHeader } from "./ui";

export function CaseStudies() {
  const featured = caseStudies.filter((c) => c.featured);
  const more = caseStudies.filter((c) => !c.featured);

  return (
    <section id="work" aria-labelledby="work-title" className="border-t border-line bg-paper-2/50 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          id="work-title"
          eyebrow="Case studies"
          title="How the results were produced"
          intro={
            <p>
              Each case study covers one client or one account group, with its own numbers. Client names are withheld
              where permission has not been given.
            </p>
          }
        />

        <div className="mt-10 space-y-5">
          {featured.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>

        {more.length > 0 && (
          <>
            <h3 className="mt-16 text-lg font-semibold text-ink">More case studies</h3>
            <div className="mt-5 space-y-5">
              {more.map((study) => (
                <CaseStudyCard key={study.slug} study={study} />
              ))}
            </div>
          </>
        )}

        <div className="on-dark mt-14 flex flex-col gap-6 rounded-2xl bg-navy-900 p-7 text-white sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h3 className="text-2xl font-semibold tracking-tight">Need this process running on your pipeline?</h3>
            <p className="mt-2 text-slate-300">
              Research, infrastructure, campaigns, reply handling and reporting, managed end to end.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className="btn-primary">
              Get in touch
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
            <ExternalLink href={links.resume} className="btn-outline-dark">
              View Resume
            </ExternalLink>
          </div>
        </div>
      </div>
    </section>
  );
}
