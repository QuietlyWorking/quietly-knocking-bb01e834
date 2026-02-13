import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface Props {
  data: { targetLeads: number };
  updateData: (d: Partial<Props['data']>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepGoals({ data, updateData, onNext, onBack }: Props) {
  const { profile } = useAuth();
  const target = data.targetLeads || 0;
  const leadsToContact = target * 5;
  const emailsToSend = leadsToContact * 3;
  const sendingAccounts = Math.ceil(emailsToSend / (20 * 22));
  const sendingDomains = Math.ceil(sendingAccounts / 3);

  const recommendedTier = sendingDomains <= 1 ? 'Starter' : sendingDomains <= 3 ? 'Growth' : 'Agency';
  const tierPrice = sendingDomains <= 1 ? '$149/mo' : sendingDomains <= 3 ? '$349/mo' : '$699/mo';

  const handleNext = async () => {
    if (target < 10) {
      toast.error('Minimum 10 leads per month');
      return;
    }
    if (profile?.tenant_id) {
      await supabase.from('tenants').update({ target_leads_per_month: target }).eq('id', profile.tenant_id);
    }
    onNext();
  };

  return (
    <div>
      <h2 className="font-display text-2xl font-bold mb-2">Let's do the math</h2>
      <p className="text-muted-foreground mb-8">How many new leads do you want per month? We'll calculate what you need.</p>

      <div className="text-center mb-8">
        <Label htmlFor="target" className="text-sm text-muted-foreground">Target leads per month</Label>
        <Input
          id="target"
          type="number"
          min={10}
          max={10000}
          value={target || ''}
          onChange={(e) => updateData({ targetLeads: parseInt(e.target.value) || 0 })}
          placeholder="50"
          className="mt-2 text-center text-3xl font-display font-bold h-16 max-w-xs mx-auto"
        />
      </div>

      {target >= 10 && (
        <div className="glass-card p-6 animate-fade-in">
          <h3 className="font-display font-semibold mb-4">Your infrastructure plan</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Leads to contact</span>
              <span className="font-semibold">{leadsToContact.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Emails to send</span>
              <span className="font-semibold">{emailsToSend.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sending accounts</span>
              <span className="font-semibold">{sendingAccounts}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sending domains</span>
              <span className="font-semibold">{sendingDomains}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estimated warmup time</span>
              <span className="font-semibold">4 weeks</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm">Recommended tier</span>
              <span className="bg-primary/20 text-primary text-sm font-semibold px-3 py-1 rounded-full">
                {recommendedTier} — {tierPrice}
              </span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">These are estimates. We'll fine-tune your setup together.</p>
        </div>
      )}

      <div className="flex justify-between mt-8">
        <Button variant="ghost" onClick={onBack}>Back</Button>
        <Button onClick={handleNext} disabled={target < 10}>Next</Button>
      </div>
    </div>
  );
}
