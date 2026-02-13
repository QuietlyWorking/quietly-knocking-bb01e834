import { Settings as SettingsIcon } from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';

const Settings = () => (
  <div className="animate-fade-in">
    <EmptyState icon={SettingsIcon} title="Settings" description="Coming in the next update" />
  </div>
);

export default Settings;
