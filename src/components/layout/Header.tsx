import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LogOut, User } from 'lucide-react';

const routeTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/campaigns': 'Campaigns',
  '/leads': 'Leads',
  '/sequences': 'Sequences',
  '/landing-pages': 'Landing Pages',
  '/infrastructure': 'Infrastructure',
  '/analytics': 'Analytics',
  '/settings': 'Settings',
};

interface Props {
  onMenuClick: () => void;
  showMenu: boolean;
}

export function AppHeader({ onMenuClick, showMenu }: Props) {
  const { profile, signOut } = useAuth();
  const location = useLocation();
  const title = routeTitles[location.pathname] || '';

  const initials = profile?.full_name
    ? profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '??';

  return (
    <header className="h-14 border-b border-border flex items-center px-4 gap-4">
      {showMenu && (
        <Button variant="ghost" size="icon" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
        </Button>
      )}
      <h1 className="font-display font-semibold text-lg flex-1">{title}</h1>
      <ThemeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-semibold">
            {initials}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="gap-2" disabled>
            <User className="h-4 w-4" /> Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2" onClick={signOut}>
            <LogOut className="h-4 w-4" /> Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
