import { PenTool, DoorOpen, Crosshair } from 'lucide-react';

const products = [
  { icon: PenTool, name: 'Quietly Writing', slug: 'QWR', desc: 'Import brand voices and customer personas. Your outreach sounds exactly like your published content.', active: false },
  { icon: DoorOpen, name: 'Quietly Knocking', slug: 'QKN', desc: 'You are here. The outreach engine.', active: true },
  { icon: Crosshair, name: 'Quietly Spotting', slug: 'QSP', desc: 'Campaign results flow to your Single Point of Truth. See outreach alongside quotes, content, and contacts.', active: false },
];

export function EcosystemSection() {
  return (
    <section className="py-24 px-6 bg-card/30">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">Part of something bigger</h2>
        <p className="text-muted-foreground mb-16 max-w-2xl mx-auto">
          QKN works standalone, but it's even more powerful with the QWF product family.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p.slug}
              className={`glass-card p-8 transition-colors ${p.active ? 'border-primary/40 shadow-lg shadow-primary/5' : 'border-accent/20'}`}
            >
              <p.icon className={`h-10 w-10 mb-4 mx-auto ${p.active ? 'text-primary' : 'text-accent'}`} />
              <h3 className="font-display font-semibold text-lg mb-1">{p.name}</h3>
              <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-3 ${p.active ? 'bg-primary/20 text-primary' : 'bg-accent/20 text-accent'}`}>
                {p.slug}
              </span>
              <p className="text-muted-foreground text-sm">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
