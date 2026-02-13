import { BarChart3 } from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';

const Analytics = () => (
  <div className="animate-fade-in">
    <EmptyState icon={BarChart3} title="Analytics" description="Coming in the next update" />
  </div>
);

export default Analytics;
