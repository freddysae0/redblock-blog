declare module '@toast-ui/editor' {
    export interface EditorOptions {
        el: HTMLElement;
        height?: string;
        initialEditType?: 'markdown' | 'wysiwyg';
        previewStyle?: 'vertical' | 'tab';
        initialValue?: string;
        events?: {
            change?: () => void;
            [key: string]: unknown;
        };
        toolbarItems?: string[][];
        [key: string]: unknown;
    }

    export default class Editor {
        constructor(options: EditorOptions);
        getMarkdown(): string;
        setMarkdown(markdown: string): void;
        destroy(): void;
        [key: string]: unknown;
    }
}

declare module '@toast-ui/editor/dist/toastui-editor-viewer' {
    export interface ViewerOptions {
        el: HTMLElement;
        initialValue?: string;
        events?: {
            [key: string]: unknown;
        };
        [key: string]: unknown;
    }

    export default class Viewer {
        constructor(options: ViewerOptions);
        setMarkdown(markdown: string): void;
        destroy(): void;
        [key: string]: unknown;
    }
}
