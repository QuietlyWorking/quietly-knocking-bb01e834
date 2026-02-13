import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const INDUSTRIES = ['Construction', 'Real Estate', 'Marketing', 'Technology', 'Healthcare', 'Professional Services', 'Home Services', 'Financial Services', 'Other'];

interface Props {
  data: { businessName: string; website: string; industry: string };
  updateData: (d: Partial<Props['data']>) => void;
  onNext: () => void;
}

export function StepBusiness({ data, updateData, onNext }: Props) {
  const { profile, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    if (!data.businessName.trim()) {
      toast.error('Business name is required');
      return;
    }
    setLoading(true);
    try {
      const slug = data.businessName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      const { data: tenant, error } = await supabase
        .from('tenants')
        .insert({
          name: data.businessName.trim(),
          slug: `${slug}-${Date.now().toString(36)}`,
          website: data.website.trim() || null,
          industry: data.industry || null,
        })
        .select()
        .single();

      if (error) throw error;

      await supabase
        .from('profiles')
        .update({ tenant_id: tenant.id, role: 'owner', onboarding_step: 1 })
        .eq('id', profile!.id);

      await refreshProfile();
      onNext();
    } catch (err: any) {
      toast.error(err.message || 'Failed to create business');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="font-display text-2xl font-bold mb-2">Let's set up your outreach engine</h2>
      <p className="text-muted-foreground mb-8">Tell us about your business</p>
      <div className="space-y-4">
        <div>
          <Label htmlFor="biz-name">Business name *</Label>
          <Input id="biz-name" value={data.businessName} onChange={(e) => updateData({ businessName: e.target.value })} placeholder="Your business name" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="biz-website">Website</Label>
          <Input id="biz-website" type="url" value={data.website} onChange={(e) => updateData({ website: e.target.value })} placeholder="https://yourbusiness.com" className="mt-1" />
        </div>
        <div>
          <Label>Industry</Label>
          <Select value={data.industry} onValueChange={(v) => updateData({ industry: v })}>
            <SelectTrigger className="mt-1"><SelectValue placeholder="Select industry" /></SelectTrigger>
            <SelectContent>
              {INDUSTRIES.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-end mt-8">
        <Button onClick={handleNext} disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Next'}
        </Button>
      </div>
    </div>
  );
}
