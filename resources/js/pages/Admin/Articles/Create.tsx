import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type BreadcrumbItem } from '@/types';
import { FormEventHandler } from 'react';
import InputError from '@/components/input-error';
import { Wand2 } from 'lucide-react';
import { MediaUpload } from '@/components/admin/MediaUpload';
import { MarkdownEditor } from '@/components/admin/MarkdownEditor';

interface Category {
    id: number;
    title: string;
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
        title: 'Articles',
        href: '/articles',
    },
    {
        title: 'Create',
        href: '/articles/create',
    },
];

import { useRef } from 'react';

// ... (imports remain the same, ensure useRef is imported)

export default function Create({ categories }: Props) {
    const actionRef = useRef<'draft' | 'publish'>('draft');
    const { data, setData, post, processing, errors, transform } = useForm({
        title: '',
        slug: '',
        body: '',
        media_file: '',
        category_ids: [] as number[],
        action: 'draft',
    });

    transform((data) => ({
        ...data,
        action: actionRef.current,
    }));

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/articles');
    };

    const toggleCategory = (id: number) => {
        if (data.category_ids.includes(id)) {
            setData('category_ids', data.category_ids.filter(cid => cid !== id));
        } else {
            setData('category_ids', [...data.category_ids, id]);
        }
    };

    const generateSlug = () => {
        const slug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
        setData('slug', slug);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Article" />
            <div className="p-6 max-w-4xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">Create New Article</h1>
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
                            <Label htmlFor="slug">Slug</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="slug"
                                    value={data.slug}
                                    onChange={(e) => setData('slug', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                <Button type="button" variant="outline" size="icon" onClick={generateSlug} className="mt-1 shrink-0" title="Generate Slug">
                                    <Wand2 className="h-4 w-4" />
                                </Button>
                            </div>
                            <InputError message={errors.slug} className="mt-2" />
                        </div>

                        <div>
                            <Label htmlFor="body">Content</Label>
                            <MarkdownEditor
                                value={data.body}
                                onChange={(value) => setData('body', value)}
                                className="mt-1"
                            />
                            <InputError message={errors.body} className="mt-2" />
                        </div>

                        <MediaUpload
                            value={data.media_file}
                            onChange={(url) => setData('media_file', url)}
                            label="Article Media"
                        />
                        <InputError message={errors.media_file} className="mt-2" />

                        <div>
                            <Label className="mb-2 block">Categories</Label>
                            <div className="flex flex-wrap gap-2">
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        type="button"
                                        onClick={() => toggleCategory(category.id)}
                                        className={`px-3 py-1 rounded-full text-sm border transition-colors ${data.category_ids.includes(category.id)
                                            ? 'bg-primary text-primary-foreground border-primary'
                                            : 'bg-background hover:bg-accent border-input'
                                            }`}
                                    >
                                        {category.title}
                                    </button>
                                ))}
                            </div>
                            <InputError message={errors.category_ids} className="mt-2" />
                        </div >

                        <div className="flex justify-end gap-4">
                            <Button variant="outline" asChild>
                                <Link href="/articles">Cancel</Link>
                            </Button>
                            <Button
                                type="submit"
                                variant="secondary"
                                disabled={processing}
                                onClick={() => actionRef.current = 'draft'}
                            >
                                Save Draft
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                                onClick={() => actionRef.current = 'publish'}
                            >
                                Publish
                            </Button>
                        </div>
                    </form >
                </div >
            </div >
        </AppLayout >
    );
}
