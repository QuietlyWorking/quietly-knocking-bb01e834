import { LandingHeader } from '@/components/landing/LandingHeader';
import { HeroSection } from '@/components/landing/HeroSection';
import { ProblemSection } from '@/components/landing/ProblemSection';
import { SolutionSection } from '@/components/landing/SolutionSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { EcosystemSection } from '@/components/landing/EcosystemSection';
import { MissionSection } from '@/components/landing/MissionSection';
import { PricingSection } from '@/components/landing/PricingSection';
import { FinalCtaSection } from '@/components/landing/FinalCtaSection';
import { LandingFooter } from '@/components/landing/LandingFooter';

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <EcosystemSection />
      <MissionSection />
      <PricingSection />
      <FinalCtaSection />
      <LandingFooter />
    </div>
  );
};

export default Landing;
