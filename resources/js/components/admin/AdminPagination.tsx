import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface AdminPaginationProps {
    links: PaginationLink[];
}

export function AdminPagination({ links }: AdminPaginationProps) {
    return (
        <div className="mt-6 flex justify-center gap-1">
            {links.map((link, i) => (
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
    );
}
