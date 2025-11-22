import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type BreadcrumbItem } from '@/types';
import { FormEventHandler } from 'react';
import InputError from '@/components/input-error';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Categories',
        href: '/categories',
    },
    {
        title: 'Create',
        href: '/categories/create',
    },
];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/categories');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Category" />
            <div className="p-6 max-w-4xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">Create New Category</h1>
                </div>

                <div className="bg-white dark:bg-sidebar rounded-xl border border-sidebar-border shadow-sm p-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={errors.title} className="mt-2" />
                        </div>

                        <div>
                            <Label htmlFor="description">Description</Label>
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="mt-1 block w-full rounded-md border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[100px]"
                            />
                            <InputError message={errors.description} className="mt-2" />
                        </div>

                        <div className="flex justify-end gap-4">
                            <Button variant="outline" asChild>
                                <Link href="/categories">Cancel</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                Create Category
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
