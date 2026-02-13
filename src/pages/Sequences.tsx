import { Mail } from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';

const Sequences = () => (
  <div className="animate-fade-in">
    <EmptyState icon={Mail} title="Sequences" description="Coming in the next update" />
  </div>
);

export default Sequences;
