import { Users, PenTool, LayoutTemplate } from 'lucide-react';

const solutions = [
  { icon: Users, title: 'Know who you\'re writing to', desc: "AI-powered enrichment builds deep profiles — company intel, decision makers, personalization hooks, competitor context." },
  { icon: PenTool, title: 'Write in your real voice', desc: "Connect your brand voice from Quietly Writing, or let our templates adapt to your tone. Every email sounds like you wrote it." },
  { icon: LayoutTemplate, title: 'Land them somewhere that converts', desc: "Dynamic landing pages with per-lead personalization. Variables with smart fallbacks. Three delivery modes: hosted, embeddable, or WordPress shortcode." },
];

export function SolutionSection() {
  return (
    <section className="py-24 px-6 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-16">
          What if every email felt personal —{' '}
          <span className="gradient-text-amber">because it was?</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {solutions.map((s) => (
            <div key={s.title} className="glass-card p-8 border-primary/20 hover:border-primary/40 transition-colors animate-fade-in">
              <s.icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-display font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
