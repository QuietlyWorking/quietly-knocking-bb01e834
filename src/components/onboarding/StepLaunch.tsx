import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Lock, Rocket, Loader2 } from 'lucide-react';

interface Props {
  data: {
    businessName: string;
    selectedPurposeName: string;
    targetLeads: number;
    personaName: string;
  };
  onComplete: () => Promise<void>;
  onBack: () => void;
}

export function StepLaunch({ data, onComplete, onBack }: Props) {
  const [loading, setLoading] = useState(false);
  const target = data.targetLeads || 50;
  const accounts = Math.ceil((target * 5 * 3) / (20 * 22));
  const domains = Math.ceil(accounts / 3);

  const handleComplete = async () => {
    setLoading(true);
    await onComplete();
    setLoading(false);
  };

  const timeline = [
    { icon: CheckCircle, color: 'text-success', title: 'Account created', desc: 'Just now' },
    { icon: Clock, color: 'text-primary', title: 'Infrastructure setup', desc: 'Our team will configure your domains, DNS, and sending accounts. We\'ll be in touch within 24 hours.' },
    { icon: Clock, color: 'text-muted-foreground', title: 'Warmup period', desc: '4 weeks — your domains build sender reputation automatically' },
    { icon: Rocket, color: 'text-muted-foreground', title: 'First campaign launches', desc: 'Week 5 — with enriched leads, approved sequences, and personalized landing pages' },
  ];

  return (
    <div className="text-center">
      <div className="mb-6">
        <CheckCircle className="h-16 w-16 text-success mx-auto animate-fade-in" />
      </div>
      <h2 className="font-display text-2xl font-bold mb-2">Your outreach engine is warming up</h2>

      {/* Summary */}
      <div className="glass-card p-6 text-left mt-8 mb-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><span className="text-muted-foreground">Business</span><p className="font-semibold">{data.businessName}</p></div>
          <div><span className="text-muted-foreground">Strategy</span><p className="font-semibold">{data.selectedPurposeName}</p></div>
          <div><span className="text-muted-foreground">Target</span><p className="font-semibold">{target} leads/month</p></div>
          <div><span className="text-muted-foreground">Audience</span><p className="font-semibold">{data.personaName}</p></div>
          <div className="col-span-2"><span className="text-muted-foreground">Infrastructure</span><p className="font-semibold">{domains} domains, {accounts} sending accounts</p></div>
        </div>
      </div>

      {/* Timeline */}
      <div className="glass-card p-6 text-left mb-8">
        <div className="space-y-4">
          {timeline.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <item.icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${item.color}`} />
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-3">
        <Button onClick={handleComplete} disabled={loading} size="lg">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Go to Dashboard →'}
        </Button>
        <Button variant="ghost" onClick={onBack} size="sm">Back</Button>
        <p className="text-xs text-muted-foreground">Questions? Reach out to support@quietlyworking.org</p>
      </div>
    </div>
  );
}
