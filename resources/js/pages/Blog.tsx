import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Header as BlogHeader } from '@/components/blog/Header';
import { BlogGrid, type BlogGridArticle } from '@/components/blog/BlogGrid';
import { Footer } from '@/components/blog/Footer';

interface Category {
    id: number;
    title: string;
    description: string | null;
}

interface BlogProps {
    articles: BlogGridArticle[];
    categories: Category[];
    filters: {
        category?: string;
        search?: string;
    };
}

export default function Blog() {
    const page = usePage<SharedData & BlogProps>();
    const { articles, categories, filters } = page.props;

    return (
        <>
            <Head title="Blog">
                <meta
                    name="description"
                    content="Read the latest articles about aim training, FPS tips, and Redblock Online updates."
                />
                {/* Open Graph */}
                <meta property="og:title" content="Blog" />
                <meta
                    property="og:description"
                    content="Read the latest articles about aim training, FPS tips, and Redblock Online updates."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://redblock.online/blog" />
                <meta property="og:image" content="https://redblock.online/og-image.png" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Blog" />
                <meta
                    name="twitter:description"
                    content="Read the latest articles about aim training, FPS tips, and Redblock Online updates."
                />
                <meta name="twitter:image" content="https://redblock.online/og-image.png" />
            </Head>
            <div className="flex min-h-screen flex-col bg-background text-foreground">
                <div className="flex flex-1 flex-col">
                    <BlogHeader />
                    <main className="flex-1">
                        {/* Page Header */}
                        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
                            <div className="max-w-4xl mx-auto px-6 text-center">
                                <h1 className="text-4xl md:text-6xl font-bold mb-4">Blog</h1>
                                <p className="text-xl text-muted-foreground">
                                    Tips, guides, and updates about FPS training and Redblock Online
                                </p>
                            </div>
                        </section>

                        {/* Blog Grid with Filters */}
                        <BlogGrid
                            articles={articles}
                            categories={categories}
                            activeCategory={filters?.category}
                            searchQuery={filters?.search}
                        />
                    </main>
                    <Footer />
                </div>
            </div>
        </>
    );
}
