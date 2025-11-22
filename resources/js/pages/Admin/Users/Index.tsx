import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Ban, CheckCircle } from 'lucide-react';
import { type BreadcrumbItem, type User } from '@/types';
import { AdminTable } from '@/components/admin/AdminTable';
import { AdminPagination } from '@/components/admin/AdminPagination';

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

interface ExtendedUser extends User {
    is_disabled: boolean;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    users: {
        data: ExtendedUser[];
        links: PaginationLink[];
    };
}

export default function Index({ users }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this user?')) {
            router.delete(`/users/${id}`);
        }
    };

    const handleToggleStatus = (id: number) => {
        router.patch(`/users/${id}/toggle-status`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Users</h1>
                </div>

                <AdminTable
                    columns={[
                        {
                            header: 'Name',
                            accessor: (user) => <span className="font-medium">{user.name}</span>,
                        },
                        {
                            header: 'Email',
                            accessor: (user) => <span className="text-muted-foreground">{user.email}</span>,
                        },
                        {
                            header: 'Status',
                            accessor: (user) => (
                                <Badge variant={user.is_disabled ? 'destructive' : 'default'}>
                                    {user.is_disabled ? 'Disabled' : 'Active'}
                                </Badge>
                            ),
                        },
                        {
                            header: 'Joined At',
                            accessor: (user) => (
                                <span className="text-muted-foreground">
                                    {new Date(user.created_at).toLocaleDateString()}
                                </span>
                            ),
                        },
                        {
                            header: 'Actions',
                            accessor: (user) => (
                                <div className="flex justify-end gap-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleToggleStatus(user.id)}
                                        title={user.is_disabled ? 'Enable User' : 'Disable User'}
                                    >
                                        {user.is_disabled ? (
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                        ) : (
                                            <Ban className="h-4 w-4 text-orange-500" />
                                        )}
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDelete(user.id)}
                                        className="text-destructive hover:text-destructive"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ),
                            cellClassName: 'px-6 py-4 text-right',
                        },
                    ]}
                    data={users.data}
                    keyExtractor={(user) => user.id}
                    emptyMessage="No users found."
                />

                <AdminPagination links={users.links} />
            </div>
        </AppLayout>
    );
}
