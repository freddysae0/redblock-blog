import { cn } from '@/lib/utils';
import { Play } from 'lucide-react';
import { useRef, useState } from 'react';

interface MediaProps {
    src: string | null;
    alt?: string;
    className?: string;
    isPreview?: boolean;
}

export const isVideo = (url: string) => {
    return url.match(/\.(mp4|webm)$/i) ? true : false;
};

export function Media({ src, alt = 'Media', className = '', isPreview = false }: MediaProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    if (!src) return null;

    const baseClasses = 'w-full object-cover transition-transform duration-500';

    const handleMouseEnter = () => {
        if (isPreview && videoRef.current) {
            videoRef.current.play();
        }
    };

    const handleMouseLeave = () => {
        if (isPreview && videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    const handleVideoClick = () => {
        if (!isPreview && videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
                setIsPlaying(false);
            } else {
                videoRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    if (isVideo(src)) {
        return (
            <div
                className="relative group"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <video
                    ref={videoRef}
                    src={src}
                    controls={!isPreview}
                    className={cn(baseClasses, className)}
                    preload="metadata"
                    loop={isPreview}
                    muted={isPreview}
                    onClick={handleVideoClick}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                >
                    Your browser does not support the video tag.
                </video>

                {isPreview && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-all pointer-events-none group-hover:opacity-0">
                        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center transition-transform">
                            <Play className="w-5 h-5 text-gray-900 fill-gray-900 ml-0.5" />
                        </div>
                    </div>
                )}

                {!isPreview && !isPlaying && (
                    <div
                        className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors cursor-pointer"
                        onClick={handleVideoClick}
                    >
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                            <Play className="w-7 h-7 text-gray-900 fill-gray-900 ml-1" />
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={cn(baseClasses, className)}
        />
    );
}
