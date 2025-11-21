export function Hero() {
  return (
    <section className="bg-background pt-16 pb-12 md:pt-24 md:pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="space-y-6">
          <div className="flex gap-2">
            <div className="w-1 h-8 bg-accent rounded-full" />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Stories that <span className="text-accent">matter</span>
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Explore thoughtfully crafted articles on design, technology, and innovation. Discover insights that shape the way we create and think.
          </p>
          <div className="flex gap-3 pt-4">
            <button className="px-6 py-3 bg-accent text-accent-foreground font-medium rounded-sm hover:bg-accent/90 transition-colors">
              Explore Topics
            </button>
            <button className="px-6 py-3 border border-border text-foreground font-medium rounded-sm hover:bg-muted transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
