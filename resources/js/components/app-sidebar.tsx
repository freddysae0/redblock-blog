import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { FileText, Folder, LayoutGrid, MessageSquare, Users } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
        permission: 'all',
    },
    {
        title: 'Articles',
        href: '/articles',
        icon: FileText,
        permission: 'is_mantainer',
    },
    {
        title: 'Categories',
        href: '/categories',
        icon: Folder,
        permission: 'is_mantainer',
    },
    {
        title: 'Users',
        href: '/users',
        icon: Users,
        permission: 'is_mantainer',
    },
    {
        title: 'Comments',
        href: '/comments',
        icon: MessageSquare,
        permission: 'is_mantainer',
    },
];

const footerNavItems: NavItem[] = [
    /*   {
          title: 'Repositoryss',
          href: 'https://github.com/laravel/react-starter-kit',
          icon: Folder,
      },
      {
          title: 'Documentation',
          href: 'https://laravel.com/docs/starter-kits#react',
          icon: BookOpen,
      }, */
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
