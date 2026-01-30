import { Mail, MessageSquare } from 'lucide-react';
import AppLogoIcon from '../app-logo-icon';
import { WeatherBcn } from './WeatherBcn';

export function Footer() {
  return (
    <footer className="bg-background border-t border-border mt-12">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <AppLogoIcon className="h-6" />
            </div>
            <p className="text-sm text-muted-foreground">
              The official website of Redblock Online, a free and minimalist aim trainer to sharpen your precision and reaction time.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide">Explore</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-sm text-muted-foreground hover:text-accent transition-colors">Home</a></li>
              <li><a href="/blog" className="text-sm text-muted-foreground hover:text-accent transition-colors">Blog</a></li>
              <li><a href="/faq" className="text-sm text-muted-foreground hover:text-accent transition-colors">FAQ</a></li>
              <li><a href="/what-is-redblock" className="text-sm text-muted-foreground hover:text-accent transition-colors">What is Redblock Online?</a></li>
              <li><a href="/contact" className="text-sm text-muted-foreground hover:text-accent transition-colors">Contact</a></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide">Account</h4>
            <ul className="space-y-2">
              <li><a href="/login" className="text-sm text-muted-foreground hover:text-accent transition-colors">Login</a></li>
              <li><a href="/register" className="text-sm text-muted-foreground hover:text-accent transition-colors">Register</a></li>
              <li><a href="/dashboard" className="text-sm text-muted-foreground hover:text-accent transition-colors">Dashboard</a></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide">Follow</h4>
            <div className="flex gap-3">
              <a href="https://t.me/+8LeLpqzWwiBiYWZh" target="_blank" rel="noopener noreferrer" className="p-2 bg-muted rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors" title="Telegram">
                <MessageSquare className="w-4 h-4" />
              </a>
              <a href="https://instagram.com/redblock.online" target="_blank" rel="noopener noreferrer" className="p-2 bg-muted rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors" title="Instagram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="mailto:support@redblock.online" className="p-2 bg-muted rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors" title="Email">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
          <WeatherBcn />
        </div>
        <div className="border-t border-border pt-8">
          <p className="text-xs text-muted-foreground text-center">
            © 2025 Redblock Online. All rights reserved. Built with ❤️.
          </p>
        </div>
      </div>
    </footer>
  );
}
