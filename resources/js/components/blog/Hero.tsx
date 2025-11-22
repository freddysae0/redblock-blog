export function Hero() {
  const goToRedblockOnline = () => {
    window.location.href = 'https://redblock.online';
  };

  return (
    <section className="bg-background max-w-7xl mx-auto pt-16 pb-12 md:pt-24 md:pb-20 h-[85dvh] flex items-center">
      <div className=" px-8 flex justify-between flex-wrap gap-8">
        <div className="space-y-6 shrink-0" >
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


        <div className="bg-white/20 backdrop-blur-sm border border-white/20 shadow-xl  rounded-sm h-71 flex items-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-transparent pointer-events-none" />
          <video className="h-70 w-[98%] mx-auto rounded-lg" autoPlay loop muted src="demo.mp4"></video>
        </div>
      </div>
    </section>
  );
}
