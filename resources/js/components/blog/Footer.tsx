import { Mail, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-background border-t border-border mt-12">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-accent rounded-sm flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-xs">M</span>
              </div>
              <span className="font-bold text-foreground">ModernBlog</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Thoughtful stories on design and technology.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide">Explore</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Home</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Stories</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Topics</a></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">About</a></li>
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
            © 2025 ModernBlog. All rights reserved. Built with care.
          </p>
        </div>
      </div>
    </footer>
  );
}
