export function LandingFooter() {
  return (
    <footer className="border-t border-border/50 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <span>© 2026 Quietly Working Foundation</span>
        <div className="flex items-center gap-4">
          <a href="https://quietlyworking.org/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Privacy</a>
          <span>·</span>
          <a href="https://quietlyworking.org/terms" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Terms</a>
          <span>·</span>
          <a href="https://quietlyworking.org" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Mission</a>
        </div>
        <span>A QWF fundraising program</span>
      </div>
    </footer>
  );
}
