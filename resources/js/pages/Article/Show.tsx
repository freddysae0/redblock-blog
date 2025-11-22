import { Head } from '@inertiajs/react';
import { Calendar } from 'lucide-react';
import { CommentSection } from '@/components/blog/CommentSection';
import { type Article } from '@/types';
import { Media } from '@/components/ui/media';
import { Header as BlogHeader } from '@/components/blog/Header';
import { Footer } from '@/components/blog/Footer';
import { Clock } from 'lucide-react';

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
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        <span>5 min read</span>
                                    </div>
                                </div>
                            </div>

                            {article.media_url && (
                                <div className="mb-12 rounded-xl overflow-hidden shadow-lg">
                                    <Media
                                        src={article.media_url}
                                        alt={article.title}
                                        className="h-[400px] md:h-[500px]"
                                    />
                                </div>
                            )}

                            <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
                                <p className="whitespace-pre-wrap leading-relaxed">
                                    {article.body}
                                </p>
                            </div>

                            <CommentSection articleId={article.id} comments={article.comments} />
                        </article>
                    </main>
                    <Footer />
                </div>
            </div>
        </>
    );
}
