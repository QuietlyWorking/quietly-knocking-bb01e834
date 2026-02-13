import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTenant } from '@/contexts/TenantContext';
import { Loader2 } from 'lucide-react';

/**
 * Redirects authenticated users based on their onboarding state.
 * If unauthenticated, renders children (landing page).
 */
export function AuthRedirect({ children }: { children: React.ReactNode }) {
  const { session, profile, loading: authLoading } = useAuth();
  const { tenant, loading: tenantLoading } = useTenant();
  const navigate = useNavigate();

  useEffect(() => {
    if (authLoading || tenantLoading) return;
    if (!session) return; // Show landing page

    if (profile?.tenant_id && tenant?.onboarding_complete) {
      navigate('/dashboard', { replace: true });
    } else {
      navigate('/onboarding', { replace: true });
    }
  }, [authLoading, tenantLoading, session, profile, tenant]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
