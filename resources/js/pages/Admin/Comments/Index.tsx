import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { type BreadcrumbItem, type User } from '@/types';
import { AdminTable } from '@/components/admin/AdminTable';
import { AdminPagination } from '@/components/admin/AdminPagination';

import { SearchFilter } from '@/components/admin/SearchFilter';

interface Article {
    id: number;
    title: string;
    slug: string;
}

interface Comment {
    id: number;
    body: string;
    created_at: string;
    user: User;
    article: Article;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    comments: {
        data: Comment[];
        links: PaginationLink[];
    };
    filters?: {
        search?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Comments',
        href: '/comments',
    },
];

export default function Index({ comments, filters }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Comments" />
            <div className="p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <h1 className="text-2xl font-bold">Comments</h1>
                    <div className="w-full sm:w-auto">
                        <SearchFilter
                            placeholder="Search comments..."
                            initialValue={filters?.search}
                        />
                    </div>
                </div>

                <AdminTable
                    columns={[
                        {
                            header: 'Author',
                            accessor: (comment) => (
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                        {comment.user.name.charAt(0)}
                                    </div>
                                    <span className="font-medium">{comment.user.name}</span>
                                </div>
                            ),
                        },
                        {
                            header: 'Comment',
                            accessor: (comment) => (
                                <span className="text-muted-foreground line-clamp-2">{comment.body}</span>
                            ),
                        },
                        {
                            header: 'Article',
                            accessor: (comment) => (
                                <Link
                                    href={`/blog/${comment.article.slug}`}
                                    className="text-primary hover:underline"
                                >
                                    {comment.article.title}
                                </Link>
                            ),
                        },
                        {
                            header: 'Date',
                            accessor: (comment) => (
                                <span className="text-muted-foreground">
                                    {new Date(comment.created_at).toLocaleDateString()}
                                </span>
                            ),
                        },
                        {
                            header: 'Actions',
                            accessor: (comment) => (
                                <div className="flex justify-end gap-2">
                                    <Link
                                        href={`/comments/${comment.id}`}
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
                    data={comments.data}
                    keyExtractor={(comment) => comment.id}
                    emptyMessage="No comments found."
                />

                <AdminPagination links={comments.links} />
            </div>
        </AppLayout>
    );
}
