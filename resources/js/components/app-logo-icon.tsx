import { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
       <img src="/logo.webp" alt="Logo" className="h-6" {...props} />
    );
}
