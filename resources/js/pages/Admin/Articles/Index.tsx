import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Plus } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';

interface Category {
    id: number;
    title: string;
}

interface Article {
    id: number;
    title: string;
    created_at: string;
    categories: Category[];
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    articles: {
        data: Article[];
        links: PaginationLink[];
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Articles',
        href: '/articles',
    },
];

export default function Index({ articles }: Props) {
    const { flash } = usePage().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Articles" />
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Articles</h1>
                    <Button asChild>
                        <Link href="/articles/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Create Article
                        </Link>
                    </Button>
                </div>

                <div className="bg-white dark:bg-sidebar rounded-xl border border-sidebar-border shadow-sm overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-sidebar-accent/50 text-sidebar-foreground/70 font-medium border-b border-sidebar-border">
                            <tr>
                                <th className="px-6 py-4">Title</th>
                                <th className="px-6 py-4">Categories</th>
                                <th className="px-6 py-4">Created At</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-sidebar-border">
                            {articles.data.map((article) => (
                                <tr key={article.id} className="hover:bg-sidebar-accent/20 transition-colors">
                                    <td className="px-6 py-4 font-medium">{article.title}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2 flex-wrap">
                                            {article.categories.map((category) => (
                                                <Badge key={category.id} variant="secondary">
                                                    {category.title}
                                                </Badge>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">
                                        {new Date(article.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link href={`/articles/${article.id}/edit`}>
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Link
                                                href={`/articles/${article.id}`}
                                                method="delete"
                                                as="button"
                                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 text-destructive hover:text-destructive"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {articles.data.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                                        No articles found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Simple Pagination */}
                <div className="mt-6 flex justify-center gap-1">
                    {articles.links.map((link, i) => (
                        <Button
                            key={i}
                            variant={link.active ? 'default' : 'outline'}
                            size="sm"
                            asChild
                            disabled={!link.url}
                            className={!link.url ? 'opacity-50 pointer-events-none' : ''}
                        >
                            <Link href={link.url || '#'}>
                                <span dangerouslySetInnerHTML={{ __html: link.label }} />
                            </Link>
                        </Button>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
