import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './AuthContext';

interface Tenant {
  id: string;
  name: string;
  slug: string;
  website: string | null;
  industry: string | null;
  logo_url: string | null;
  plan: string;
  onboarding_complete: boolean;
  target_leads_per_month: number | null;
  brand_colors: Record<string, unknown>;
  settings: Record<string, unknown>;
}

interface TenantContextType {
  tenant: Tenant | null;
  loading: boolean;
  refreshTenant: () => Promise<void>;
}

const TenantContext = createContext<TenantContextType>({
  tenant: null,
  loading: true,
  refreshTenant: async () => {},
});

export const useTenant = () => useContext(TenantContext);

export function TenantProvider({ children }: { children: ReactNode }) {
  const { profile } = useAuth();
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchTenant = async () => {
    if (!profile?.tenant_id) {
      setTenant(null);
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from('tenants')
      .select('*')
      .eq('id', profile.tenant_id)
      .maybeSingle();
    setTenant(data);
    setLoading(false);
  };

  const refreshTenant = async () => {
    await fetchTenant();
  };

  useEffect(() => {
    fetchTenant();
  }, [profile?.tenant_id]);

  return (
    <TenantContext.Provider value={{ tenant, loading, refreshTenant }}>
      {children}
    </TenantContext.Provider>
  );
}
