import { LandingHeader } from "@/components/landing/LandingHeader";
import { AmbientBackground } from "@/components/landing/AmbientBackground";
import { HeroSection } from "@/components/landing/HeroSection";
import { PrDemoSection } from "@/components/landing/PrDemoSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { VisualBreaker } from "@/components/landing/VisualBreaker";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-on-surface">
      <LandingHeader />

      <main className="w-full bg-background pt-16">
        <div className="relative flex w-full flex-col">
          <AmbientBackground />
          <HeroSection />
          <PrDemoSection />
          <FeaturesSection />
          <VisualBreaker />
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
