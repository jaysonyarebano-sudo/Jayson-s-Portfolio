import { About } from "@/components/About";
import { CapabilitiesGrid } from "@/components/CapabilitiesGrid";
import { CaseStudies } from "@/components/CaseStudies";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { ResultsOverview } from "@/components/ResultsOverview";
import { ToolStack } from "@/components/ToolStack";
import { WorkSamples } from "@/components/WorkSamples";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <ResultsOverview />
        <CaseStudies />
        <CapabilitiesGrid />
        <ProcessTimeline />
        <ToolStack />
        <WorkSamples />
        <About />
        <Contact />
      </main>
      <Footer buildYear={new Date().getFullYear()} />
    </>
  );
}
