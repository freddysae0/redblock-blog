import { type ReactNode } from 'react';

interface Column<T> {
    header: string;
    accessor: (item: T) => ReactNode;
    headerClassName?: string;
    cellClassName?: string;
}

interface AdminTableProps<T> {
    columns: Column<T>[];
    data: T[];
    keyExtractor: (item: T) => string | number;
    emptyMessage?: string;
}

export function AdminTable<T>({ columns, data, keyExtractor, emptyMessage = 'No items found.' }: AdminTableProps<T>) {
    return (
        <div className="bg-white dark:bg-sidebar rounded-xl border border-sidebar-border shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm">
                <thead className="bg-sidebar-accent/50 text-sidebar-foreground/70 font-medium border-b border-sidebar-border">
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index} className={column.headerClassName || 'px-6 py-4'}>
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-sidebar-border">
                    {data.map((item) => (
                        <tr key={keyExtractor(item)} className="hover:bg-sidebar-accent/20 transition-colors">
                            {columns.map((column, index) => (
                                <td key={index} className={column.cellClassName || 'px-6 py-4'}>
                                    {column.accessor(item)}
                                </td>
                            ))}
                        </tr>
                    ))}
                    {data.length === 0 && (
                        <tr>
                            <td colSpan={columns.length} className="px-6 py-8 text-center text-muted-foreground">
                                {emptyMessage}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
