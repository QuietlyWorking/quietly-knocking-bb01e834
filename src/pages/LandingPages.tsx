import { Layout } from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';

const LandingPages = () => (
  <div className="animate-fade-in">
    <EmptyState icon={Layout} title="Landing Pages" description="Coming in the next update" />
  </div>
);

export default LandingPages;
