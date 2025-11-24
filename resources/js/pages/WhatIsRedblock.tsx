import { Head } from '@inertiajs/react';
import { Header as BlogHeader } from '@/components/blog/Header';
import { Footer } from '@/components/blog/Footer';
import { Box, Users, Globe, Target, Gamepad2, Trophy } from 'lucide-react';

export default function WhatIsRedblock() {
    return (
        <>
            <Head title="What is Redblock Online? | FPS Aim Training Platform">
                <meta name="description" content="Redblock Online is a community-driven FPS aim training platform with a powerful world editor, multiplayer training, and custom game modes. Join the Circuitbreakers beta program today." />
                <meta name="keywords" content="aim trainer, FPS training, Valorant aim, CS2 aim, Apex Legends, aim lab alternative, multiplayer aim trainer, world editor" />

                {/* Open Graph */}
                <meta property="og:title" content="What is Redblock Online? | FPS Aim Training Platform" />
                <meta property="og:description" content="Train smarter with Redblock Online. Build custom scenarios, compete with friends, and improve your aim with game-specific profiles for Valorant, CS2, and more." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://redblock.online/what-is-redblock" />
                <meta property="og:image" content="https://redblock.online/demo.mp4" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="What is Redblock Online? | FPS Aim Training Platform" />
                <meta name="twitter:description" content="Train smarter with Redblock Online. Build custom scenarios, compete with friends, and improve your aim." />
                <meta name="twitter:image" content="https://redblock.online/demo.mp4" />
            </Head>
            <div className="flex min-h-screen flex-col bg-background text-foreground font-sans">
                <BlogHeader />
                <main className="flex-1">

                    {/* Hero Section */}
                    <section className="relative py-20 md:py-32 overflow-hidden min-h-[80vh] flex items-center">
                        {/* Video Background */}
                        <div className="absolute inset-0 ">
                            <video
                                className="w-full h-full object-cover"
                                autoPlay
                                loop
                                muted
                                playsInline
                                src="/demo.mp4"
                            >
                                Your browser does not support the video tag.
                            </video>
                            {/* Dark overlay for text readability */}
                            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background"></div>
                        </div>

                        <div className="max-w-5xl mx-auto px-6 text-center space-y-8 relative z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent border border-accent/20 text-sm font-medium backdrop-blur-sm">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                                </span>
                                The Future of FPS Training
                            </div>
                            <h1 className="text-4xl md:text-7xl font-bold tracking-tight leading-tight drop-shadow-lg">
                                Train Smarter <br />
                                <span className="text-primary">Build Together</span>
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                                Redblock Online is not just another aim trainer. It's a community-driven sandbox where you can design immersive scenarios, compete with friends, and train in worlds that feel like real games.
                            </p>
                        </div>
                    </section>

                    {/* Features Grid */}
                    <section className="py-16 px-6 max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Feature 1 */}
                            <div className="bg-card p-8 rounded-2xl border border-border hover:border-primary/50 transition-colors group">
                                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                                    <Box className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Powerful World Editor</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Forget simple gray boxes. Build complex, realistic environments with our intuitive visual editor. No coding required—just drag, drop, and design your perfect training ground.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="bg-card p-8 rounded-2xl border border-border hover:border-primary/50 transition-colors group">
                                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                                    <Users className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Multiplayer Training</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Why train alone? Challenge your friends in 1v1 aim duels, compete in real-time lobbies, or practice co-op scenarios. Improvement is faster when it's competitive.
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="bg-card p-8 rounded-2xl border border-border hover:border-primary/50 transition-colors group">
                                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                                    <Gamepad2 className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Cross-Game Training</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Game-specific profiles for Valorant, CS2, Apex, and more. Train with the exact sensitivity, weapon mechanics, and movement physics of your favorite FPS.
                                </p>
                            </div>

                            {/* Feature 4 */}
                            <div className="bg-card p-8 rounded-2xl border border-border hover:border-primary/50 transition-colors group">
                                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                                    <Trophy className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Custom Game Modes</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Go beyond traditional aim drills. Create and play Capture the Flag, King of the Hill, tactical scenarios, and any custom mode you can imagine.
                                </p>
                            </div>

                            {/* Feature 5 */}
                            <div className="bg-card p-8 rounded-2xl border border-border hover:border-primary/50 transition-colors group">
                                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                                    <Globe className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Community Ecosystem</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Share your creations with the world. Play top-rated community maps, compete on global leaderboards, and discover new ways to train every single day.
                                </p>
                            </div>

                            {/* Feature 6 */}
                            <div className="bg-card p-8 rounded-2xl border border-border hover:border-primary/50 transition-colors group">
                                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                                    <Target className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Realism First</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    We focus on simulating real in-game situations. From recoil patterns to movement physics, Redblock is designed to translate directly to your favorite FPS games.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Mission Section */}
                    <section className="py-20 relative overflow-hidden">
                        {/* Background decorations */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5"></div>
                        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>

                        <div className="max-w-6xl mx-auto px-6 relative z-10">
                            <div className="text-center mb-16">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium mb-6">
                                    Our Mission
                                </div>
                                <h2 className="text-3xl md:text-5xl font-bold mb-6">Why We Are Building This</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                {/* Left side - Main message */}
                                <div className="space-y-6">
                                    <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-lg">
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="h-12 w-12 bg-red-500/10 rounded-lg flex items-center justify-center text-red-500 shrink-0">
                                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold mb-2">The Problem</h3>
                                                <p className="text-muted-foreground leading-relaxed">
                                                    Current aim trainers feel like clinical tests—repetitive and disconnected from the games we love. Improvement shouldn't be boring.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-lg">
                                        <div className="flex items-start gap-4">
                                            <div className="h-12 w-12 bg-green-500/10 rounded-lg flex items-center justify-center text-green-500 shrink-0">
                                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold mb-2">Our Solution</h3>
                                                <p className="text-muted-foreground leading-relaxed">
                                                    By combining the creativity of a sandbox with the precision of an aim trainer, we're creating a place where training feels like playing.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right side - Key points */}
                                <div className="bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 shadow-xl">
                                    <h3 className="text-2xl font-bold mb-6">Built For</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center shrink-0 mt-1">
                                                <svg className="h-4 w-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="font-semibold">Competitive Players</p>
                                                <p className="text-sm text-muted-foreground">Looking to rank up with efficient, engaging training</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center shrink-0 mt-1">
                                                <svg className="h-4 w-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="font-semibold">Creators & Map Designers</p>
                                                <p className="text-sm text-muted-foreground">Who want to build the next viral training scenario</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center shrink-0 mt-1">
                                                <svg className="h-4 w-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="font-semibold">Communities</p>
                                                <p className="text-sm text-muted-foreground">That want to train together and compete</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* What's Next Section */}
                    <section className="py-20 px-6 max-w-4xl mx-auto">
                        <div className="text-center space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-3xl md:text-5xl font-bold">What's Next?</h2>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    Join the <span className="text-primary font-semibold">Circuitbreakersrs Program</span>
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-background border border-primary/20 rounded-2xl p-8 md:p-12 space-y-6">
                                <div className="space-y-4">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary border border-primary/30 text-sm font-medium">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                        </span>
                                        Beta Testing Program
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold">Be Among the First</h3>
                                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                        The <strong className="text-foreground">Circuitbreakersrs Program</strong> is our exclusive beta testing community. Get early access to Redblock Online, help shape the future of the platform, and train with cutting-edge features before anyone else.
                                    </p>
                                </div>

                                <div className="pt-4 space-y-4">
                                    <p className="text-sm text-muted-foreground">
                                        Join today and start training with preliminary versions of the game
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                        <a
                                            href="/register"
                                            className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all w-full sm:w-auto text-center"
                                        >
                                            Register Now
                                        </a>
                                        <a
                                            href="/login"
                                            className="px-8 py-4 bg-card border-2 border-border text-foreground font-semibold rounded-lg hover:bg-muted transition-colors w-full sm:w-auto text-center"
                                        >
                                            Login
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </main>
                <Footer />
            </div>
        </>
    );
}
