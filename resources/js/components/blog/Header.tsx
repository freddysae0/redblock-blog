import { Link, usePage } from "@inertiajs/react";
import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import AppLogoIcon from '@/components/app-logo-icon';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  canRegister?: boolean;
}

export function Header({ canRegister = true }: HeaderProps) {
  const { auth } = usePage<SharedData>().props;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get user initials
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <AppLogoIcon className="h-6" />
          </a>
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="text-sm font-medium text-foreground hover:text-accent transition-colors">
              Home
            </a>
            <a href="/blog" className="text-sm font-medium text-foreground hover:text-accent transition-colors">
              Blog
            </a>
            <a href="/what-is-redblock" className="text-sm font-medium text-foreground hover:text-accent transition-colors">
              What is Redblock Online?
            </a>
            <a href="/contact" className="text-sm font-medium text-foreground hover:text-accent transition-colors">
              Contact
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {auth?.user ? (
            <Link
              href={dashboard()}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              title={auth.user.name}
            >
              <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
                {getInitials(auth.user.name)}
              </div>
            </Link>
          ) : (
            <>
              <a href="/login" className="hidden md:block text-sm font-medium text-foreground hover:text-accent transition-colors">
                Login
              </a>
              {canRegister && (
                <a href="/register" className="hidden md:block px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors">
                  Register
                </a>
              )}
            </>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-accent transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="px-6 py-4 space-y-3">
            <a
              href="/"
              className="block py-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="/blog"
              className="block py-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </a>
            <a
              href="/what-is-redblock"
              className="block py-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              What is Redblock Online?
            </a>
            <a
              href="/contact"
              className="block py-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>

            {!auth?.user && (
              <>
                <div className="border-t border-border my-3"></div>
                <a
                  href="/login"
                  className="block py-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </a>
                {canRegister && (
                  <a
                    href="/register"
                    className="block py-2 px-4 text-sm font-medium bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Register
                  </a>
                )}
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
