import { useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { AppSidebar } from './Sidebar';
import { AppHeader } from './Header';
import { BottomNav } from './BottomNav';
import { useIsMobile } from '@/hooks/use-mobile';

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);
  return matches;
}

export function AppLayout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem('qkn-sidebar-collapsed') === 'true');
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const location = useLocation();

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem('qkn-sidebar-collapsed', String(collapsed));
  }, [collapsed]);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop sidebar */}
      {!isMobile && (
        <AppSidebar
          collapsed={isTablet ? true : collapsed}
          onToggle={() => setCollapsed(!collapsed)}
          overlay={isTablet}
          open={isTablet ? mobileOpen : true}
          onClose={() => setMobileOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-h-screen">
        <AppHeader
          onMenuClick={() => setMobileOpen(true)}
          showMenu={isMobile || isTablet}
        />
        <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 md:px-6 py-6 pb-20 md:pb-6">
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      {isMobile && <BottomNav />}
    </div>
  );
}
