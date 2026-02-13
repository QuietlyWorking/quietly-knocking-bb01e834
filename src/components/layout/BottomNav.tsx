import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Megaphone, Users, BarChart3, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const items = [
  { icon: LayoutDashboard, path: '/dashboard', label: 'Dashboard' },
  { icon: Megaphone, path: '/campaigns', label: 'Campaigns' },
  { icon: Users, path: '/leads', label: 'Leads' },
  { icon: BarChart3, path: '/analytics', label: 'Analytics' },
  { icon: Settings, path: '/settings', label: 'Settings' },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
      <div className="flex items-center justify-around h-14">
        {items.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center gap-0.5 text-xs transition-colors',
                active ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
