import { useState, useRef, type ChangeEvent, type DragEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Link as LinkIcon } from 'lucide-react';
import axios from 'axios';
import { useStorage } from '@/hooks/use-storage';

interface MediaUploadProps {
    value?: string;
    onChange: (url: string) => void;
    label?: string;
    accept?: string;
}

export function MediaUpload({ value, onChange, label = 'Media', accept = 'image/*,video/*' }: MediaUploadProps) {
    const [uploading, setUploading] = useState(false);
    const storage = useStorage();

    const getPreviewUrl = (val: string | undefined) => {
        if (!val) return null;
        if (val.startsWith('http://') || val.startsWith('https://') || val.startsWith('/')) {
            return val;
        }
        return `${storage}${val}`;
    };

    const [preview, setPreview] = useState<string | null>(getPreviewUrl(value));
    const [useUrl, setUseUrl] = useState(false);
    const [urlInput, setUrlInput] = useState(value || '');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleFileSelect = async (file: File) => {
        if (!file) return;

        const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        const validVideoTypes = ['video/mp4', 'video/webm'];
        const validTypes = [...validImageTypes, ...validVideoTypes];

        if (!validTypes.includes(file.type)) {
            alert('Invalid file type. Please upload an image (jpg, png, gif, webp) or video (mp4, webm).');
            return;
        }

        const maxSize = 50 * 1024 * 1024; // 50MB
        if (file.size > maxSize) {
            alert('File is too large. Maximum size is 50MB.');
            return;
        }

        setUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post('/media/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                timeout: 300000, // 5 minutes
                onUploadProgress: (progressEvent) => {
                    console.log('Upload progress:', Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1)));
                },
            });

            const filename = response.data.filename;
            const url = response.data.url;

            // Save filename to form, but show URL in preview
            onChange(filename);
            setPreview(url);
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Failed to upload file. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleRemove = () => {
        setPreview(null);
        setUrlInput('');
        onChange('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleUrlSubmit = () => {
        if (urlInput) {
            setPreview(urlInput);
            onChange(urlInput);
            setUseUrl(false);
        }
    };

    const isVideo = (url: string) => {
        return url.match(/\.(mp4|webm)$/i);
    };
    console.log(preview)
    return (
        <div className="space-y-4">
            <Label>{label}</Label>

            {!preview ? (
                <>
                    {!useUrl ? (
                        <div
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            className="border-2 border-dashed border-sidebar-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                            <p className="text-sm text-muted-foreground mb-2">
                                {uploading ? 'Uploading...' : 'Drag and drop your file here, or click to browse'}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Supports: Images (JPG, PNG, GIF, WebP) and Videos (MP4, WebM) up to 50MB
                            </p>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept={accept}
                                onChange={handleFileChange}
                                className="hidden"
                                disabled={uploading}
                            />
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <div className="flex gap-2">
                                <Input
                                    type="url"
                                    placeholder="https://example.com/image.jpg"
                                    value={urlInput}
                                    onChange={(e) => setUrlInput(e.target.value)}
                                />
                                <Button type="button" onClick={handleUrlSubmit}>
                                    Add
                                </Button>
                            </div>
                        </div>
                    )}

                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setUseUrl(!useUrl)}
                        className="w-full"
                    >
                        <LinkIcon className="mr-2 h-4 w-4" />
                        {useUrl ? 'Upload file instead' : 'Use URL instead'}
                    </Button>
                </>
            ) : (
                <div className="relative">
                    {isVideo(preview) ? (
                        <video src={preview} controls className="w-full rounded-lg max-h-96" />
                    ) : (
                        <img src={preview} alt="Preview" className="w-full rounded-lg max-h-96 object-cover" />
                    )}
                    <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={handleRemove}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            )}
        </div>
    );
}
