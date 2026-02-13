import { CheckCircle, Clock, Lock, Rocket } from 'lucide-react';

const steps = [
  { icon: CheckCircle, color: 'text-success', title: 'Account created', desc: 'Completed', done: true },
  { icon: Clock, color: 'text-primary', title: 'Infrastructure setup', desc: 'Our team will reach out within 24 hours', active: true },
  { icon: Lock, color: 'text-muted-foreground', title: 'Domain warmup', desc: '4 weeks' },
  { icon: Lock, color: 'text-muted-foreground', title: 'First campaign', desc: 'Week 5' },
];

export function OnboardingTimeline() {
  return (
    <div className="glass-card p-6">
      <h2 className="font-display font-semibold text-lg mb-4">Getting Started</h2>
      <div className="space-y-4">
        {steps.map((step, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="relative">
              <step.icon className={`h-5 w-5 ${step.color} flex-shrink-0`} />
              {step.active && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-primary rounded-full animate-pulse" />
              )}
            </div>
            <div>
              <p className={`text-sm font-medium ${step.done ? 'text-success' : ''}`}>{step.title}</p>
              <p className="text-xs text-muted-foreground">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
