import { isVideo } from '../ui/media';
import { BlogCard } from './BlogCard';
import { CategoryFilter } from './CategoryFilter';

export interface BlogGridArticleCategory {
  id: number;
  title: string;
  description: string;
}

export interface BlogGridArticle {
  id: number;
  slug: string;
  title: string;
  body: string;
  media_url: string | null;
  created_at: string;
  time_to_read: number;
  categories: BlogGridArticleCategory[];
}

export interface BlogGridProps {
  articles: BlogGridArticle[];
}

export function BlogGrid({ articles }: BlogGridProps) {
  const categories = articles.map((article) => article.categories).flat().map((category) => category.title);
  return (
    <section className="bg-background py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-12">
          <CategoryFilter categories={categories} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <BlogCard
                key={article.id}
                post={{
                  id: article.id,
                  title: article.title,
                  excerpt: article.body,
                  slug: article.slug,
                  time_to_read: article.time_to_read,
                  category: article.categories[0]?.title ?? 'Uncategorized',
                  image: article.media_url ?? '/placeholder.svg',
                  date: new Date(article.created_at).toLocaleDateString(),
                  hasVideo: isVideo(article.media_url ?? ''),
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
