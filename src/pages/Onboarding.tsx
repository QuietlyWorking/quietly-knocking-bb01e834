import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTenant } from '@/contexts/TenantContext';
import { OnboardingWizard } from '@/components/onboarding/OnboardingWizard';
import { Loader2 } from 'lucide-react';

const Onboarding = () => {
  const { profile, loading: authLoading } = useAuth();
  const { tenant, loading: tenantLoading } = useTenant();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !tenantLoading) {
      if (tenant?.onboarding_complete) {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [authLoading, tenantLoading, tenant]);

  if (authLoading || tenantLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return <OnboardingWizard />;
};

export default Onboarding;
