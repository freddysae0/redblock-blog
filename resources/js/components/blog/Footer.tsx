import { Mail, Twitter, Linkedin } from 'lucide-react';
import AppLogoIcon from '../app-logo-icon';

export function Footer() {
  return (
    <footer className="bg-background border-t border-border mt-12">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
            
           <AppLogoIcon className="h-6" />
            </div>
            <p className="text-sm text-muted-foreground">
              The official blog of Redblock Online, a free and minimalist aim trainer to sharpen your precision and reaction time.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide">Explore</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Blog home</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Aim training</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Warmup routines</a></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide">About</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">What is Redblock Online?</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Contact</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Privacy</a></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide">Follow</h4>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-muted rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-muted rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-muted rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
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
