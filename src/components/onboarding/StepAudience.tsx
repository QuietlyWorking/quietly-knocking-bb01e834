import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PenTool } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface Props {
  data: { personaName: string; jobTitles: string; industries: string; locations: string };
  updateData: (d: Partial<Props['data']>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepAudience({ data, updateData, onNext, onBack }: Props) {
  const { profile } = useAuth();

  const handleNext = async () => {
    if (!data.personaName.trim()) {
      toast.error('Persona name is required');
      return;
    }
    if (profile?.tenant_id) {
      await supabase.from('tenants').update({
        settings: {
          initial_audience: {
            persona_name: data.personaName.trim(),
            job_titles: data.jobTitles.trim(),
            industries: data.industries.trim(),
            locations: data.locations.trim(),
          },
        },
      }).eq('id', profile.tenant_id);
    }
    onNext();
  };

  return (
    <div>
      <h2 className="font-display text-2xl font-bold mb-2">Who are you reaching?</h2>
      <p className="text-muted-foreground mb-8">Describe your ideal lead. This helps us find more of them.</p>

      <div className="space-y-4">
        <div>
          <Label htmlFor="persona">Persona name *</Label>
          <Input id="persona" value={data.personaName} onChange={(e) => updateData({ personaName: e.target.value })} placeholder="e.g., Property Manager, Restaurant Owner" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="titles">Job titles to target</Label>
          <Input id="titles" value={data.jobTitles} onChange={(e) => updateData({ jobTitles: e.target.value })} placeholder="e.g., Owner, General Manager, Marketing Director" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="ind">Industries to target</Label>
          <Input id="ind" value={data.industries} onChange={(e) => updateData({ industries: e.target.value })} placeholder="e.g., Restaurants, Construction, Real Estate" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="loc">Locations</Label>
          <Input id="loc" value={data.locations} onChange={(e) => updateData({ locations: e.target.value })} placeholder="e.g., Sacramento CA, Los Angeles CA" className="mt-1" />
        </div>
      </div>

      <div className="glass-card p-4 mt-6 flex items-start gap-3">
        <PenTool className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium">Already use Quietly Writing?</p>
          <p className="text-muted-foreground text-xs mb-2">Connect your QWR account to import brand voices and customer personas.</p>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-accent text-sm hover:text-accent/80 transition-colors cursor-not-allowed opacity-60">
                Connect QWR →
              </button>
            </TooltipTrigger>
            <TooltipContent>Coming soon</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="ghost" onClick={onBack}>Back</Button>
        <Button onClick={handleNext} disabled={!data.personaName.trim()}>Next</Button>
      </div>
    </div>
  );
}
