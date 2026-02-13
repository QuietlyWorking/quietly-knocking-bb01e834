import { Target, Link2, BarChart3 } from 'lucide-react';

const problems = [
  { icon: Target, title: 'Generic messaging', desc: "Batch-and-blast emails get ignored. People can smell a template." },
  { icon: Link2, title: 'Dead-end links', desc: "You get them to click... and send them to a homepage that has nothing to do with your email." },
  { icon: BarChart3, title: 'No intelligence loop', desc: "You send emails into the void. No idea what's working, what isn't, or what to do next." },
];

export function ProblemSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-16">
          Cold email is broken. <span className="text-muted-foreground">Here's why.</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((p) => (
            <div key={p.title} className="glass-card p-8 animate-fade-in">
              <p.icon className="h-10 w-10 text-destructive/70 mb-4" />
              <h3 className="font-display font-semibold text-lg mb-2">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
