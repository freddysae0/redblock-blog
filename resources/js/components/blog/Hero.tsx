export function Hero() {
  const goToRedblockOnline = () => {
    window.location.href = 'https://redblock.online';
  };
  
  return (
    <section className="bg-background pt-16 pb-12 md:pt-24 md:pb-20">
      <div className="max-w-4xl px-8">
        <div className="space-y-6">
          <div className="flex gap-2">
            <div className="w-1 h-8 bg-accent rounded-full" />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Train your <span className="text-primary">aim</span> smarter
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl px-4 leading-relaxed">
            The Redblock Online blog shares short, practical pieces about aim training, reaction time, and building better warmup routines for competitive games.
          </p>
          <div className="flex gap-3 pt-4">
            <button className="px-6 py-3 bg-accent text-accent-foreground font-medium rounded-sm hover:bg-accent/90 transition-colors">
              Read training guides
            </button>
            <button onClick={goToRedblockOnline} className="flex items-center gap-2 px-6 py-3 border border-border text-foreground font-medium rounded-sm hover:bg-muted transition-colors">
              Go to Redblock Online <p>🎮</p>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
