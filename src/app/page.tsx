import { CaseStudies } from "@/components/CaseStudies";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Process } from "@/components/Process";
import { SwipeFile } from "@/components/SwipeFile";
import { Teardown } from "@/components/Teardown";
import { ToolStack } from "@/components/ToolStack";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Process />
        <CaseStudies />
        <SwipeFile />
        <ToolStack />
        <Teardown />
      </main>
      <Footer buildYear={new Date().getFullYear()} />
    </>
  );
}
