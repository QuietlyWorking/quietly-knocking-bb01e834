import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function FinalCtaSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">Ready to knock quietly?</h2>
        <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
          Set up takes about 30 minutes. Your first campaign launches in 4 weeks
          (while domains warm up, we'll help you nail your strategy).
        </p>
        <Link to="/signup">
          <Button size="lg" className="text-base px-8 py-6">
            Start Your First Campaign
          </Button>
        </Link>
      </div>
    </section>
  );
}
