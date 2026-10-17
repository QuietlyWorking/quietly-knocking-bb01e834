import { useEffect, useState } from 'react';
import { Archive, Calculator, CalendarRange, Crosshair, DoorOpen, Fingerprint, Globe, Handshake, Link2, PenTool, Plug, Sparkles } from 'lucide-react';
import { ORBIT_FALLBACK, currentFirst, loadOrbitApps, type OrbitApp } from '@/lib/orbitFeed';

interface Card {
  id: string;
  icon: React.ElementType;
  name: string;
  chips: string[];
  desc: string;
  link?: { label: string; url: string };
  active?: boolean;
}

// This page's app.
const CURRENT_ID = 'qkn';

// Why: which apps appear, their words, links and stages come from the shared QWF list
// (src/lib/orbitFeed.ts). Only the icon per app is this page's choice; a new app gets the default.
const ICONS: Record<string, React.ElementType> = {
  qwr: PenTool,
  qqt: Calculator,
  qtr: Link2,
  qnt: Handshake,
  qkn: DoorOpen,
  qwb: Globe,
  qst: Archive,
  qpn: CalendarRange,
};

const HUB: Card = {
  id: 'qsp',
  icon: Crosshair,
  name: 'Quietly Spotting',
  chips: ['Free'],
  desc: 'Your command center. One dashboard for every QWF tool, every metric, every connection. Free with any subscription.',
  link: { label: 'Explore your dashboard', url: 'https://quietlyspotting.org' },
};

const FEATURES: Card[] = [
  {
    id: 'passport',
    icon: Fingerprint,
    name: 'QWF Passport',
    chips: ['One account'],
    desc: 'One login. Every QWF tool. Seamlessly connected. Your data follows you across the entire ecosystem.',
  },
  {
    id: 'tools',
    icon: Plug,
    name: 'Your Tools',
    chips: ['Connect'],
    desc: 'Your CRM. Your accounting software. Your reporting tools. If it has an API, it belongs in your SPOT. One dashboard... everything that matters to your work.',
    link: { label: 'See integrations', url: 'https://quietlyspotting.org' },
  },
];

function toCard(a: OrbitApp): Card {
  const active = a.id === CURRENT_ID;
  return {
    id: a.id,
    icon: ICONS[a.id] ?? Sparkles,
    name: a.name,
    chips: active ? ['You are here', a.stage] : [a.stage],
    desc: a.blurb,
    link: a.url && a.cta && !active ? { label: a.cta, url: a.url } : undefined,
    active,
  };
}

export function EcosystemSection() {
  // Starts as the built-in copy, then the live list replaces it; on any failure the copy simply stays.
  const [apps, setApps] = useState<OrbitApp[]>(() => currentFirst(ORBIT_FALLBACK, CURRENT_ID));

  useEffect(() => {
    let alive = true;
    loadOrbitApps().then(live => {
      if (alive && live) setApps(currentFirst(live, CURRENT_ID));
    });
    return () => {
      alive = false;
    };
  }, []);

  const cards = [HUB, ...apps.map(toCard), ...FEATURES];

  return (
    <section id="ecosystem" className="py-24 px-6 bg-card/30">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">Part of something bigger</h2>
        <p className="text-muted-foreground mb-16 max-w-2xl mx-auto">
          Every QWF tool stands on its own. Together? They're something else entirely.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((p) => (
            <div
              key={p.id}
              data-card-id={p.id}
              className={`glass-card p-8 transition-colors flex flex-col ${p.active ? 'border-primary/40 shadow-lg shadow-primary/5' : 'border-accent/20'}`}
            >
              <p.icon className={`h-10 w-10 mb-4 mx-auto ${p.active ? 'text-primary' : 'text-accent'}`} />
              <h3 className="font-display font-semibold text-lg mb-1">{p.name}</h3>
              <div className="flex flex-wrap justify-center gap-1 mb-3">
                {p.chips.map((c) => (
                  <span
                    key={c}
                    className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${p.active ? 'bg-primary/20 text-primary' : 'bg-accent/20 text-accent'}`}
                  >
                    {c}
                  </span>
                ))}
              </div>
              <p className="text-muted-foreground text-sm flex-1">{p.desc}</p>
              {p.link && (
                <a
                  href={p.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 text-sm text-primary hover:underline"
                >
                  {p.link.label}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
