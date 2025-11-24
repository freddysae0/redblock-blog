import { useEffect, useRef } from 'react';
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { cn } from '@/lib/utils';

interface MarkdownViewerProps {
    content: string;
    className?: string;
}

export function MarkdownViewer({ content, className }: MarkdownViewerProps) {
    const viewerRef = useRef<HTMLDivElement>(null);
    const viewerInstanceRef = useRef<Viewer | null>(null);

    useEffect(() => {
        if (!viewerRef.current) return;

        // Initialize viewer
        const viewer = new Viewer({
            el: viewerRef.current,
            initialValue: content,
        });

        viewerInstanceRef.current = viewer;

        // Cleanup
        return () => {
            viewer.destroy();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Update viewer content when content prop changes
    useEffect(() => {
        if (viewerInstanceRef.current) {
            viewerInstanceRef.current.setMarkdown(content);
        }
    }, [content]);

    return (
        <div className={cn('prose prose-lg dark:prose-invert max-w-none', className)}>
            <style>{`
                .toastui-editor-contents {
                    font-family: var(--font-sans) !important;
                    font-size: 1.125rem;
                }
                .toastui-editor-contents p,
                .toastui-editor-contents li {
                    font-family: var(--font-sans) !important;
                    color: var(--foreground) !important;
                }
                .toastui-editor-contents h1,
                .toastui-editor-contents h2,
                .toastui-editor-contents h3,
                .toastui-editor-contents h4,
                .toastui-editor-contents h5,
                .toastui-editor-contents h6 {
                    color: var(--foreground) !important;
                }
                .dark .toastui-editor-contents p,
                .dark .toastui-editor-contents li,
                .dark .toastui-editor-contents h1,
                .dark .toastui-editor-contents h2,
                .dark .toastui-editor-contents h3,
                .dark .toastui-editor-contents h4,
                .dark .toastui-editor-contents h5,
                .dark .toastui-editor-contents h6 {
                    color: var(--foreground) !important;
                }
            `}</style>
            <div ref={viewerRef} />
        </div>
    );
}
