export function MissionSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">
          Built by a nonprofit. <span className="gradient-text-amber">Powered by students.</span>
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Quietly Knocking is a fundraising program of the Quietly Working Foundation, a 501(c)(3) nonprofit.
          Every subscription funds student training in marketing technology, data analysis, and professional
          communication through The Missing Pixel Project. When you use QKN, you're not just improving your
          outreach — you're investing in the next generation.
        </p>
        <a
          href="https://quietlyworking.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary/80 text-sm transition-colors"
        >
          Learn more about our mission →
        </a>
      </div>
    </section>
  );
}
