import { HeroMetrics } from '@/components/dashboard/HeroMetrics';
import { CampaignSummary } from '@/components/dashboard/CampaignSummary';
import { OnboardingTimeline } from '@/components/dashboard/OnboardingTimeline';
import { EcosystemCards } from '@/components/dashboard/EcosystemCards';

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <HeroMetrics />
      <OnboardingTimeline />
      <CampaignSummary />
      <EcosystemCards />
    </div>
  );
};

export default Dashboard;
