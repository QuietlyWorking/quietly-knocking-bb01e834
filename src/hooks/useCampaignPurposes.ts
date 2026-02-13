import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

interface CampaignPurpose {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  is_active: boolean;
  sort_order: number;
}

export function useCampaignPurposes() {
  return useQuery({
    queryKey: ['campaign-purposes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('campaign_purposes')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
      if (error) throw error;
      return data as CampaignPurpose[];
    },
  });
}
