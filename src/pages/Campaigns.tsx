import { Megaphone } from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';

const Campaigns = () => (
  <div className="animate-fade-in">
    <EmptyState icon={Megaphone} title="Campaigns" description="Coming in the next update" />
  </div>
);

export default Campaigns;
