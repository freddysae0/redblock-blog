import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { type BreadcrumbItem, type User } from '@/types';

interface Comment {
    id: number;
    body: string;
    created_at: string;
    user: User;
    article: {
        id: number;
        title: string;
    };
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

export default function Index({ comments }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Comments" />
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Comments</h1>
                </div>

                <div className="bg-white dark:bg-sidebar rounded-xl border border-sidebar-border shadow-sm overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-sidebar-accent/50 text-sidebar-foreground/70 font-medium border-b border-sidebar-border">
                            <tr>
                                <th className="px-6 py-4">Author</th>
                                <th className="px-6 py-4">Comment</th>
                                <th className="px-6 py-4">Article</th>
                                <th className="px-6 py-4">Created At</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-sidebar-border">
                            {comments.data.map((comment) => (
                                <tr key={comment.id} className="hover:bg-sidebar-accent/20 transition-colors">
                                    <td className="px-6 py-4 font-medium">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                {comment.user.name.charAt(0)}
                                            </div>
                                            {comment.user.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 max-w-md truncate" title={comment.body}>
                                        {comment.body}
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">
                                        <Link href={`/articles/${comment.article.id}`} className="hover:underline">
                                            {comment.article.title}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">
                                        {new Date(comment.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link
                                            href={`/comments/${comment.id}`}
                                            method="delete"
                                            as="button"
                                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 text-destructive hover:text-destructive"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {comments.data.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                                        No comments found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Simple Pagination */}
                <div className="mt-6 flex justify-center gap-1">
                    {comments.links.map((link, i) => (
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
