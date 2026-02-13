import { Users } from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';

const Leads = () => (
  <div className="animate-fade-in">
    <EmptyState icon={Users} title="Leads" description="Coming in the next update" />
  </div>
);

export default Leads;
