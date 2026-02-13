const steps = [
  { num: 1, title: 'Define your strategy', desc: "Choose a campaign purpose, set your target audience, and let the system calculate the infrastructure you need." },
  { num: 2, title: 'Enrich your leads', desc: "We scrape, validate, and personalize — 7 enrichment stages produce outreach-ready profiles with hooks that land." },
  { num: 3, title: 'Launch sequences', desc: "Multi-step email sequences with merge variables, approval workflows, and smart scheduling." },
  { num: 4, title: 'Track everything', desc: "Personalized landing pages capture conversions. Results flow to your SPOT dashboard for the complete picture." },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-16">
          From cold list to warm conversation{' '}
          <span className="text-muted-foreground">in 4 steps</span>
        </h2>
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-border hidden md:block" />
          <div className="space-y-8">
            {steps.map((step) => (
              <div key={step.num} className="flex gap-6 animate-fade-in">
                <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-primary flex items-center justify-center font-display font-bold text-2xl text-primary-foreground">
                  {step.num}
                </div>
                <div className="pt-3">
                  <h3 className="font-display font-semibold text-lg mb-1">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
