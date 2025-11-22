import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Plus } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';
import { AdminTable } from '@/components/admin/AdminTable';
import { AdminPagination } from '@/components/admin/AdminPagination';

interface Category {
    id: number;
    title: string;
    description: string | null;
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    categories: {
        data: Category[];
        links: PaginationLink[];
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Categories',
        href: '/categories',
    },
];

export default function Index({ categories }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Categories</h1>
                    <Button asChild>
                        <Link href="/categories/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Create Category
                        </Link>
                    </Button>
                </div>

                <AdminTable
                    columns={[
                        {
                            header: 'Title',
                            accessor: (category) => <span className="font-medium">{category.title}</span>,
                        },
                        {
                            header: 'Description',
                            accessor: (category) => (
                                <span className="text-muted-foreground">{category.description || '-'}</span>
                            ),
                        },
                        {
                            header: 'Created At',
                            accessor: (category) => (
                                <span className="text-muted-foreground">
                                    {new Date(category.created_at).toLocaleDateString()}
                                </span>
                            ),
                        },
                        {
                            header: 'Actions',
                            accessor: (category) => (
                                <div className="flex justify-end gap-2">
                                    <Button variant="ghost" size="icon" asChild>
                                        <Link href={`/categories/${category.id}/edit`}>
                                            <Edit className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                    <Link
                                        href={`/categories/${category.id}`}
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
                    data={categories.data}
                    keyExtractor={(category) => category.id}
                    emptyMessage="No categories found."
                />

                <AdminPagination links={categories.links} />
            </div>
        </AppLayout>
    );
}
