import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Plus } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';

interface Category {
    id: number;
    title: string;
    description: string;
    created_at: string;
}

interface Props {
    categories: Category[];
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

                <div className="bg-white dark:bg-sidebar rounded-xl border border-sidebar-border shadow-sm overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-sidebar-accent/50 text-sidebar-foreground/70 font-medium border-b border-sidebar-border">
                            <tr>
                                <th className="px-6 py-4">Title</th>
                                <th className="px-6 py-4">Description</th>
                                <th className="px-6 py-4">Created At</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-sidebar-border">
                            {categories.map((category) => (
                                <tr key={category.id} className="hover:bg-sidebar-accent/20 transition-colors">
                                    <td className="px-6 py-4 font-medium">{category.title}</td>
                                    <td className="px-6 py-4 text-muted-foreground">{category.description}</td>
                                    <td className="px-6 py-4 text-muted-foreground">
                                        {new Date(category.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
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
                                    </td>
                                </tr>
                            ))}
                            {categories.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                                        No categories found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
