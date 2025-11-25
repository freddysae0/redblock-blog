import { Head } from '@inertiajs/react';
import { Header as BlogHeader } from '@/components/blog/Header';
import { Footer } from '@/components/blog/Footer';
import { FaqSection } from '@/components/FaqSection';

export default function FAQ() {
    return (
        <>
            <Head title="Frequently Asked Questions">
                <meta
                    name="description"
                    content="Frequently asked questions about Redblock Online, the free and minimalist FPS aim training platform."
                />
            </Head>
            <div className="flex min-h-screen flex-col bg-background text-foreground font-sans">
                <BlogHeader />
                <main className="flex-1">
                    <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
                        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium">
                                Help Center
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                                Frequently Asked Questions
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                Everything you need to know about Redblock Online, from pricing and features to profiles and community tools.
                            </p>
                        </div>
                    </section>

                    <section className="py-16 px-6 max-w-6xl mx-auto">
                        <FaqSection />
                    </section>
                </main>
                <Footer />
            </div>
        </>
    );
}
