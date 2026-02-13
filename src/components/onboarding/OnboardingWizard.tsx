import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTenant } from '@/contexts/TenantContext';
import { supabase } from '@/lib/supabase';
import { StepBusiness } from './StepBusiness';
import { StepStrategy } from './StepStrategy';
import { StepGoals } from './StepGoals';
import { StepAudience } from './StepAudience';
import { StepLaunch } from './StepLaunch';
import { Loader2 } from 'lucide-react';

const STEP_LABELS = ['Business', 'Strategy', 'Goals', 'Audience', 'Launch'];

interface OnboardingData {
  businessName: string;
  website: string;
  industry: string;
  selectedPurpose: string;
  selectedPurposeName: string;
  targetLeads: number;
  personaName: string;
  jobTitles: string;
  industries: string;
  locations: string;
}

export function OnboardingWizard() {
  const { profile, refreshProfile } = useAuth();
  const { tenant, refreshTenant } = useTenant();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<OnboardingData>({
    businessName: '',
    website: '',
    industry: '',
    selectedPurpose: '',
    selectedPurposeName: '',
    targetLeads: 50,
    personaName: '',
    jobTitles: '',
    industries: '',
    locations: '',
  });

  useEffect(() => {
    if (profile) {
      const s = profile.onboarding_step || 0;
      // If tenant exists, skip step 0
      if (profile.tenant_id && s === 0) {
        setStep(1);
      } else {
        setStep(s);
      }
      setLoading(false);
    }
  }, [profile]);

  useEffect(() => {
    if (tenant) {
      setData(prev => ({
        ...prev,
        businessName: tenant.name || prev.businessName,
        website: tenant.website || prev.website,
        industry: tenant.industry || prev.industry,
        targetLeads: tenant.target_leads_per_month || prev.targetLeads,
      }));
    }
  }, [tenant]);

  const updateStep = async (newStep: number) => {
    setStep(newStep);
    if (profile) {
      await supabase.from('profiles').update({ onboarding_step: newStep }).eq('id', profile.id);
    }
  };

  const updateData = (partial: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...partial }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const handleComplete = async () => {
    if (profile?.tenant_id) {
      await supabase.from('tenants').update({ onboarding_complete: true }).eq('id', profile.tenant_id);
      await refreshTenant();
    }
    await refreshProfile();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress bar */}
      <div className="w-full px-6 pt-8 pb-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            {STEP_LABELS.map((label, i) => (
              <div key={label} className="flex flex-col items-center flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  i < step ? 'bg-primary text-primary-foreground' :
                  i === step ? 'bg-primary text-primary-foreground' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className={`text-xs mt-1 hidden sm:block ${i <= step ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-500" style={{ width: `${(step / (STEP_LABELS.length - 1)) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 flex items-center justify-center px-6 pb-8">
        <div className="w-full max-w-2xl animate-fade-in">
          {step === 0 && (
            <StepBusiness data={data} updateData={updateData} onNext={() => updateStep(1)} />
          )}
          {step === 1 && (
            <StepStrategy data={data} updateData={updateData} onNext={() => updateStep(2)} onBack={() => updateStep(0)} />
          )}
          {step === 2 && (
            <StepGoals data={data} updateData={updateData} onNext={() => updateStep(3)} onBack={() => updateStep(1)} />
          )}
          {step === 3 && (
            <StepAudience data={data} updateData={updateData} onNext={() => updateStep(4)} onBack={() => updateStep(2)} />
          )}
          {step === 4 && (
            <StepLaunch data={data} onComplete={handleComplete} onBack={() => updateStep(3)} />
          )}
        </div>
      </div>
    </div>
  );
}
