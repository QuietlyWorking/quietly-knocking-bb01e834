import { Link, useLocation } from 'react-router-dom';
import { DoorOpen, LayoutDashboard, Megaphone, Users, Mail, Layout, Server, BarChart3, Settings, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { RoleBadge } from '@/components/ui/RoleBadge';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Campaigns', icon: Megaphone, path: '/campaigns' },
  { label: 'Leads', icon: Users, path: '/leads' },
  { label: 'Sequences', icon: Mail, path: '/sequences' },
  { label: 'Landing Pages', icon: Layout, path: '/landing-pages' },
  { label: 'Infrastructure', icon: Server, path: '/infrastructure' },
  { label: 'Analytics', icon: BarChart3, path: '/analytics' },
];

interface Props {
  collapsed: boolean;
  onToggle: () => void;
  overlay?: boolean;
  open?: boolean;
  onClose?: () => void;
}

export function AppSidebar({ collapsed, onToggle, overlay, open = true, onClose }: Props) {
  const location = useLocation();
  const { profile, signOut } = useAuth();

  const initials = profile?.full_name
    ? profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : profile?.email?.slice(0, 2).toUpperCase() || '??';

  const sidebarContent = (
    <div className="flex flex-col h-full bg-sidebar border-r border-sidebar-border">
      {/* Logo */}
      <div className="h-14 flex items-center px-4 gap-2 border-b border-sidebar-border">
        <Link to="/dashboard" className="flex items-center gap-2 text-sidebar-foreground">
          <DoorOpen className="h-6 w-6 text-sidebar-primary flex-shrink-0" />
          {!collapsed && <span className="font-display font-bold text-sm">Quietly Knocking</span>}
        </Link>
        {!overlay && (
          <button onClick={onToggle} className="ml-auto text-sidebar-foreground/60 hover:text-sidebar-foreground">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-2 px-2 space-y-0.5">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                active ? 'bg-sidebar-accent text-sidebar-primary font-medium' : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
              )}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
        <div className="my-2 border-t border-sidebar-border" />
        <Link
          to="/settings"
          className={cn(
            'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
            location.pathname === '/settings' ? 'bg-sidebar-accent text-sidebar-primary font-medium' : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
          )}
        >
          <Settings className="h-4 w-4 flex-shrink-0" />
          {!collapsed && <span>Settings</span>}
        </Link>
      </nav>

      {/* User */}
      <div className="p-3 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-semibold flex-shrink-0">
            {initials}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate text-sidebar-foreground">{profile?.full_name || profile?.email}</p>
              <RoleBadge role={profile?.role || 'member'} />
            </div>
          )}
          <button onClick={signOut} className="text-sidebar-foreground/50 hover:text-sidebar-foreground" title="Log out">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  if (overlay) {
    return (
      <>
        {open && <div className="fixed inset-0 bg-background/50 z-40" onClick={onClose} />}
        <div className={cn(
          'fixed left-0 top-0 h-full z-50 w-60 transition-transform duration-300',
          open ? 'translate-x-0' : '-translate-x-full'
        )}>
          {sidebarContent}
        </div>
      </>
    );
  }

  return (
    <div className={cn('flex-shrink-0 transition-all duration-300', collapsed ? 'w-16' : 'w-60')}>
      {sidebarContent}
    </div>
  );
}
