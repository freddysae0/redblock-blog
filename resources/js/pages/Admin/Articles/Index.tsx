import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Plus } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';
import { AdminTable } from '@/components/admin/AdminTable';
import { AdminPagination } from '@/components/admin/AdminPagination';

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

                <AdminTable
                    columns={[
                        {
                            header: 'Title',
                            accessor: (article) => <span className="font-medium">{article.title}</span>,
                        },
                        {
                            header: 'Categories',
                            accessor: (article) => (
                                <div className="flex gap-2 flex-wrap">
                                    {article.categories.map((category) => (
                                        <Badge key={category.id} variant="secondary">
                                            {category.title}
                                        </Badge>
                                    ))}
                                </div>
                            ),
                        },
                        {
                            header: 'Created At',
                            accessor: (article) => (
                                <span className="text-muted-foreground">
                                    {new Date(article.created_at).toLocaleDateString()}
                                </span>
                            ),
                        },
                        {
                            header: 'Actions',
                            accessor: (article) => (
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
                            ),
                            cellClassName: 'px-6 py-4 text-right',
                        },
                    ]}
                    data={articles.data}
                    keyExtractor={(article) => article.id}
                    emptyMessage="No articles found."
                />

                <AdminPagination links={articles.links} />
            </div>
        </AppLayout>
    );
}
