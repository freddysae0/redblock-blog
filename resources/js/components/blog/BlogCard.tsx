import { Play } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  readTime: number;
  date: string;
  hasVideo?: boolean;
  slug?: string;
}

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const postSlug = post.slug ?? `post-${post.id}`;

  return (
    <a href={`#/blog/${postSlug}`}>
      <article className="group cursor-pointer h-full">
        <div className="relative overflow-hidden rounded-sm mb-4 bg-muted">
          <img
            src={post.image || '/placeholder.svg'}
            alt={post.title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {post.hasVideo && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                <Play className="w-5 h-5 text-accent-foreground fill-accent-foreground" />
              </div>
            </div>
          )}
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-accent uppercase tracking-wide">{post.category}</span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">{post.readTime} min read</span>
          </div>
          <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
          <div className="pt-2 border-t border-border">
            <time className="text-xs text-muted-foreground">{post.date}</time>
          </div>
        </div>
      </article>
    </a>
  );
}
