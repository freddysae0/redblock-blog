
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Header as BlogHeader } from '@/components/blog/Header';
import { Hero } from '@/components/blog/Hero';
import { Footer } from '@/components/blog/Footer';
import { BlogCard } from '@/components/blog/BlogCard';
import { isVideo } from '@/components/ui/media';

interface BlogGridArticleCategory {
    id: number;
    title: string;
    description: string;
}

interface BlogGridArticle {
    id: number;
    slug: string;
    title: string;
    short_description: string | null;
    body: string;
    media_url: string | null;
    created_at: string;
    time_to_read: number;
    categories: BlogGridArticleCategory[];
}

interface WelcomeProps {
    canRegister?: boolean;
    articles: BlogGridArticle[];
}

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const page = usePage<SharedData & WelcomeProps>();
    const { articles } = page.props;

    return (
        <>
            <Head title="Redblock Online - FPS Aim Training Platform">
                <meta name="description" content="Redblock Online is a community-driven FPS aim training platform with a powerful world editor, multiplayer training, and custom game modes." />
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col bg-background text-foreground">
                <div className="flex flex-1 flex-col">
                    <BlogHeader canRegister={canRegister} />
                    <main className="flex-1">
                        <Hero />

                        {/* Popular Articles Section */}
                        <section className="bg-background py-12 md:py-20">
                            <div className="max-w-7xl mx-auto px-6">
                                <div className="space-y-8">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-3xl md:text-4xl font-bold mb-2">Popular Articles</h2>
                                            <p className="text-muted-foreground">Latest tips and guides for FPS training</p>
                                        </div>
                                        <a
                                            href="/blog"
                                            className="px-6 py-3 text-sm font-medium bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors"
                                        >
                                            View All Articles
                                        </a>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {articles.map((article) => (
                                            <BlogCard
                                                key={article.id}
                                                post={{
                                                    id: article.id,
                                                    title: article.title,
                                                    excerpt: article.short_description || article.body,
                                                    slug: article.slug,
                                                    time_to_read: article.time_to_read,
                                                    category: article.categories[0]?.title ?? 'Uncategorized',
                                                    image: article.media_url ?? '/placeholder.svg',
                                                    date: new Date(article.created_at).toLocaleDateString(),
                                                    hasVideo: isVideo(article.media_url ?? ''),
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                    <Footer />
                </div>
            </div>
        </>
    );
}