import { Megaphone } from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/button';

export function CampaignSummary() {
  return (
    <div className="glass-card p-6">
      <h2 className="font-display font-semibold text-lg mb-4">Your Campaigns</h2>
      <EmptyState
        icon={Megaphone}
        title="No campaigns yet"
        description="Once your infrastructure is ready, you'll create your first campaign here."
        action={<Button variant="outline" disabled>Learn about campaigns →</Button>}
      />
    </div>
  );
}
