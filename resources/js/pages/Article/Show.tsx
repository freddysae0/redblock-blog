import { Head } from '@inertiajs/react';
import { Header as BlogHeader } from '@/components/blog/Header';
import { Footer } from '@/components/blog/Footer';

import { Calendar, Clock } from 'lucide-react';
import { CommentSection } from '@/components/blog/CommentSection';

interface Comment {
    id: number;
    body: string;
    created_at: string;
    user: {
        name: string;
    };
}

interface Category {
    id: number;
    title: string;
}

interface Article {
    id: number;
    title: string;
    slug: string;
    body: string;
    media_url: string | null;
    created_at: string;
    categories: Category[];
    comments: Comment[];
    time_to_read?: number; // Assuming this might be available or calculated
}

interface Props {
    article: Article;
    canRegister?: boolean;
}

export default function Show({ article, canRegister = true }: Props) {

    return (
        <>
            <Head title={article.title} />
            <div className="flex min-h-screen flex-col bg-background text-foreground">
                <div className="flex flex-1 flex-col">
                    <BlogHeader canRegister={canRegister} />
                    <main className="flex-1">
                        <article className="max-w-4xl mx-auto px-6 py-12 md:py-20">
                            {/* Header */}
                            <div className="space-y-6 mb-12 text-center">
                                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                                    {article.categories.map((category) => (
                                        <span key={category.id} className="bg-secondary px-3 py-1 rounded-full text-secondary-foreground font-medium">
                                            {category.title}
                                        </span>
                                    ))}
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                                    {article.title}
                                </h1>
                                <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>{new Date(article.created_at).toLocaleDateString()}</span>
                                    </div>
                                    {/* Placeholder for time to read if not available */}
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        <span>5 min read</span>
                                    </div>
                                </div>
                            </div>

                            {/* Featured Image */}
                            {article.media_url && (
                                <div className="mb-12 rounded-xl overflow-hidden shadow-lg">
                                    <img
                                        src={article.media_url}
                                        alt={article.title}
                                        className="w-full h-[400px] md:h-[500px] object-cover"
                                    />
                                </div>
                            )}

                            {/* Content */}
                            <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
                                <p className="whitespace-pre-wrap leading-relaxed">
                                    {article.body}
                                </p>
                            </div>

                            {/* Comments Section */}
                            <CommentSection articleId={article.id} comments={article.comments} />
                        </article>
                    </main>
                    <Footer />
                </div>
            </div>
        </>
    );
}
