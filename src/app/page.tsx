import { HeroSection } from "@/components/ui/hero-section-6";
import { ProblemSolutionSection } from "@/components/landing/problem-solution";
import { FeaturesSection } from "@/components/landing/features";
import { HowItWorksSection } from "@/components/landing/how-it-works";
import { JobListingSection } from "@/components/landing/job-listing";
import { CtaSection } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <main>
        <HeroSection />
        <ProblemSolutionSection />
        <FeaturesSection />
        <HowItWorksSection />
        <JobListingSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
