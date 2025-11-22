declare module '@toast-ui/editor' {
    export interface EditorOptions {
        el: HTMLElement;
        height?: string;
        initialEditType?: 'markdown' | 'wysiwyg';
        previewStyle?: 'vertical' | 'tab';
        initialValue?: string;
        events?: {
            change?: () => void;
            [key: string]: any;
        };
        toolbarItems?: string[][];
        [key: string]: any;
    }

    export default class Editor {
        constructor(options: EditorOptions);
        getMarkdown(): string;
        setMarkdown(markdown: string): void;
        destroy(): void;
        [key: string]: any;
    }
}

declare module '@toast-ui/editor/dist/toastui-editor-viewer' {
    export interface ViewerOptions {
        el: HTMLElement;
        initialValue?: string;
        events?: {
            [key: string]: any;
        };
        [key: string]: any;
    }

    export default class Viewer {
        constructor(options: ViewerOptions);
        setMarkdown(markdown: string): void;
        destroy(): void;
        [key: string]: any;
    }
}
