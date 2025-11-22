import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { type BreadcrumbItem, type User } from '@/types';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    users: {
        data: User[];
        links: PaginationLink[];
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Users',
        href: '/users',
    },
];

export default function Index({ users }: Props) {
    const { auth } = usePage().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Users</h1>
                </div>

                <div className="bg-white dark:bg-sidebar rounded-xl border border-sidebar-border shadow-sm overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-sidebar-accent/50 text-sidebar-foreground/70 font-medium border-b border-sidebar-border">
                            <tr>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Joined At</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-sidebar-border">
                            {users.data.map((user) => (
                                <tr key={user.id} className="hover:bg-sidebar-accent/20 transition-colors">
                                    <td className="px-6 py-4 font-medium">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                {user.name.charAt(0)}
                                            </div>
                                            {user.name}
                                            {auth.user.id === user.id && (
                                                <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                                    You
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">{user.email}</td>
                                    <td className="px-6 py-4 text-muted-foreground">
                                        {new Date(user.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {auth.user.id !== user.id && (
                                            <Link
                                                href={`/users/${user.id}`}
                                                method="delete"
                                                as="button"
                                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 text-destructive hover:text-destructive"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Link>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {users.data.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Simple Pagination */}
                <div className="mt-6 flex justify-center gap-1">
                    {users.links.map((link, i) => (
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
