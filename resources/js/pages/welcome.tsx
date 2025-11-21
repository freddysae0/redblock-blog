
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Header as BlogHeader } from '@/components/blog/Header';
import { Hero } from '@/components/blog/Hero';
import { BlogGrid, type BlogGridArticle } from '@/components/blog/BlogGrid';
import { Footer } from '@/components/blog/Footer';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const page = usePage<SharedData & { articles: BlogGridArticle[] }>();
    const { auth, articles } = page.props;

    return (
        <>
            <Head title="Welcome">
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
                        <BlogGrid articles={articles} />
                    </main>
                    <Footer />
                </div>
            </div>
        </>
    );
}