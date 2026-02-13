import { Button } from '@/components/ui/button';
import { useCampaignPurposes } from '@/hooks/useCampaignPurposes';
import { Target, Heart, RefreshCw, Zap } from 'lucide-react';
import { Loader2 } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  target: Target,
  heart: Heart,
  'refresh-cw': RefreshCw,
  zap: Zap,
};

interface Props {
  data: { selectedPurpose: string; selectedPurposeName: string };
  updateData: (d: Partial<Props['data']>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepStrategy({ data, updateData, onNext, onBack }: Props) {
  const { data: purposes, isLoading } = useCampaignPurposes();

  return (
    <div>
      <h2 className="font-display text-2xl font-bold mb-2">What's your outreach goal?</h2>
      <p className="text-muted-foreground mb-8">Pick the campaign purpose that fits. You can run multiple types later.</p>

      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {purposes?.map((p) => {
            const Icon = iconMap[p.icon] || Target;
            const selected = data.selectedPurpose === p.id;
            return (
              <button
                key={p.id}
                onClick={() => updateData({ selectedPurpose: p.id, selectedPurposeName: p.name })}
                className={`glass-card p-6 text-left transition-all ${selected ? 'border-primary shadow-lg shadow-primary/10' : 'hover:border-border'}`}
              >
                <Icon className="h-8 w-8 mb-3" style={{ color: p.color }} />
                <h3 className="font-display font-semibold mb-1">{p.name}</h3>
                <p className="text-muted-foreground text-sm">{p.description}</p>
              </button>
            );
          })}
        </div>
      )}

      <div className="flex justify-between mt-8">
        <Button variant="ghost" onClick={onBack}>Back</Button>
        <Button onClick={onNext} disabled={!data.selectedPurpose}>Next</Button>
      </div>
    </div>
  );
}
