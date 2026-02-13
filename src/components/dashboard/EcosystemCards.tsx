import { PenTool, Crosshair } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

const cards = [
  { icon: PenTool, name: 'Quietly Writing', slug: 'QWR', desc: 'Import brand voices and personas for voice-matched sequences' },
  { icon: Crosshair, name: 'Quietly Spotting', slug: 'QSP', desc: 'Push campaign results to your SPOT dashboard' },
];

export function EcosystemCards() {
  return (
    <div className="glass-card p-6">
      <h2 className="font-display font-semibold text-lg mb-4">Ecosystem</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {cards.map((c) => (
          <div key={c.slug} className="rounded-lg border border-border p-4 flex items-start gap-3">
            <c.icon className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium">{c.name}</p>
              <p className="text-xs text-muted-foreground mb-2">{c.desc}</p>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" disabled className="text-xs">
                    Connect →
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Coming Soon</TooltipContent>
              </Tooltip>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
