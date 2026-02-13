import { Megaphone, Users, Mail, CheckCircle } from 'lucide-react';

const metrics = [
  { label: 'Active Campaigns', value: 0, icon: Megaphone },
  { label: 'Leads in Pipeline', value: 0, icon: Users },
  { label: 'Emails Sent', value: 0, icon: Mail, sub: 'This Month' },
  { label: 'Conversions', value: 0, icon: CheckCircle, sub: 'Landing Page' },
];

export function HeroMetrics() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((m) => (
        <div key={m.label} className="glass-card p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">{m.sub || m.label}</p>
              <p className="text-3xl font-display font-bold text-muted-foreground/40">{m.value}</p>
              {m.sub && <p className="text-xs text-muted-foreground mt-1">{m.label}</p>}
            </div>
            <m.icon className="h-5 w-5 text-muted-foreground/30" />
          </div>
        </div>
      ))}
    </div>
  );
}
