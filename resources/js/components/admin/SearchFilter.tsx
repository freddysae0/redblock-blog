import { router } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { useDebounce } from '@/hooks/use-debounce';

interface Props {
    placeholder?: string;
    route?: string;
    initialValue?: string;
}

export function SearchFilter({ placeholder = 'Search...', route, initialValue = '' }: Props) {
    const [value, setValue] = useState(initialValue);
    const debouncedValue = useDebounce(value, 300);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const url = route || window.location.pathname;

        router.get(
            url,
            { search: debouncedValue },
            {
                preserveState: true,
                replace: true,
                preserveScroll: true,
            }
        );
    }, [debouncedValue, route]);

    return (
        <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder={placeholder}
                className="pl-9"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
}
