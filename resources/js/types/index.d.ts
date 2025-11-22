import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}


export interface Category {
    id: number;
    title: string;
    slug?: string;
}

export interface Comment {
    id: number;
    body: string;
    created_at: string;
    user: {
        name: string;
    };
}

export interface Article {
    id: number;
    title: string;
    slug: string;
    body: string;
    media_url: string | null;
    created_at: string;
    categories: Category[];
    comments: Comment[];
    time_to_read?: number; // Assuming this might be available or calculated
}