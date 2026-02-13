import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: 'Starter',
    price: '$149',
    popular: false,
    features: [
      '1 campaign',
      '1 sending domain',
      '3 sending accounts',
      '500 leads/month',
      'Hosted landing pages',
    ],
    missing: ['QWR Voice integration', 'QSP SPOT sync', 'API access'],
  },
  {
    name: 'Growth',
    price: '$349',
    popular: true,
    features: [
      '5 campaigns',
      '3 sending domains',
      '9 sending accounts',
      '2,000 leads/month',
      'All 3 landing page modes',
      'QWR Voice integration',
      'QSP SPOT sync',
    ],
    missing: ['API access'],
  },
  {
    name: 'Agency',
    price: '$699',
    popular: false,
    features: [
      'Unlimited campaigns',
      '10 sending domains',
      '30 sending accounts',
      '10,000 leads/month',
      'All modes + white-label',
      'QWR Voice integration',
      'QSP SPOT sync',
      'Full REST API',
    ],
    missing: [],
  },
];

export function PricingSection() {
  return (
    <section className="py-24 px-6 bg-card/30">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">Choose your contribution tier</h2>
        <p className="text-muted-foreground mb-16">All proceeds support student training through The Missing Pixel Project.</p>
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`glass-card p-8 text-left relative ${tier.popular ? 'border-primary/50 shadow-lg shadow-primary/10 md:-mt-4 md:mb-4' : ''}`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <h3 className="font-display font-bold text-xl mb-1">{tier.name}</h3>
              <div className="mb-6">
                <span className="font-display text-4xl font-bold">{tier.price}</span>
                <span className="text-muted-foreground text-sm">/mo</span>
              </div>
              <ul className="space-y-3 mb-8">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
                {tier.missing.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground/50">
                    <span className="w-4 text-center">—</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/signup" className="block">
                <Button className="w-full" variant={tier.popular ? 'default' : 'outline'}>
                  Get Started
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
