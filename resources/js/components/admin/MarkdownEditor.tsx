import { useEffect, useRef } from 'react';
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { cn } from '@/lib/utils';

interface MarkdownEditorProps {
    value: string;
    onChange: (value: string) => void;
    height?: string;
    className?: string;
}

export function MarkdownEditor({ value, onChange, height = '500px', className }: MarkdownEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const editorInstanceRef = useRef<Editor | null>(null);

    useEffect(() => {
        if (!editorRef.current) return;

        // Initialize editor
        const editor = new Editor({
            el: editorRef.current,
            height,
            initialEditType: 'markdown',
            previewStyle: 'vertical',
            initialValue: value,
            events: {
                change: () => {
                    const markdown = editor.getMarkdown();
                    onChange(markdown);
                },
            },
            toolbarItems: [
                ['heading', 'bold', 'italic', 'strike'],
                ['hr', 'quote'],
                ['ul', 'ol', 'task', 'indent', 'outdent'],
                ['table', 'image', 'link'],
                ['code', 'codeblock'],
            ],
        });

        editorInstanceRef.current = editor;

        // Cleanup
        return () => {
            editor.destroy();
        };
    }, []);

    // Update editor content when value prop changes externally
    useEffect(() => {
        if (editorInstanceRef.current && value !== editorInstanceRef.current.getMarkdown()) {
            editorInstanceRef.current.setMarkdown(value);
        }
    }, [value]);

    return (
        <div className={cn('border border-input rounded-md overflow-hidden', className)}>
            <style>{`
                .toastui-editor-contents,
                .ProseMirror {
                    font-family: var(--font-sans) !important;
                }
                .toastui-editor-contents p, 
                .toastui-editor-contents li,
                .ProseMirror p,
                .ProseMirror li {
                    font-family: var(--font-sans) !important;
                }
            `}</style>
            <div ref={editorRef} />
        </div>
    );
}
