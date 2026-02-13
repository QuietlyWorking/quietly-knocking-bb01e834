import { Server } from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';

const Infrastructure = () => (
  <div className="animate-fade-in">
    <EmptyState icon={Server} title="Infrastructure" description="Coming in the next update" />
  </div>
);

export default Infrastructure;
