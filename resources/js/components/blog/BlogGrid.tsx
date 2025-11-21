import { BlogCard } from './BlogCard';
import { CategoryFilter } from './CategoryFilter';

export function BlogGrid() {
  const posts = [
    {
      id: 1,
      title: 'The Future of Minimalist Design',
      excerpt: 'Exploring how simplicity and elegance continue to shape modern interfaces.',
      category: 'Design',
      image: '/minimalist-workspace.png',
      readTime: 5,
      date: 'Nov 14, 2024',
    },
    {
      id: 2,
      title: 'Building with Next.js and React Server Components',
      excerpt: 'A deep dive into modern server-side rendering and its impact on web performance.',
      category: 'Technology',
      image: '/code-editor-with-react.jpg',
      readTime: 8,
      date: 'Nov 12, 2024',
      hasVideo: true,
    },
    {
      id: 3,
      title: 'Color Theory for Digital Products',
      excerpt: 'Understanding color psychology and how to create compelling visual hierarchies.',
      category: 'Design',
      image: '/color-palette-design.png',
      readTime: 6,
      date: 'Nov 10, 2024',
    },
    {
      id: 4,
      title: 'Sustainable Web Development Practices',
      excerpt: 'Building faster, greener websites that benefit users and the planet.',
      category: 'Technology',
      image: '/eco-friendly-technology.jpg',
      readTime: 7,
      date: 'Nov 8, 2024',
    },
    {
      id: 5,
      title: 'The Art of Typography',
      excerpt: 'Mastering typeface selection and kerning for exceptional digital experiences.',
      category: 'Design',
      image: '/typography-design-aesthetic.jpg',
      readTime: 5,
      date: 'Nov 6, 2024',
      hasVideo: true,
    },
    {
      id: 6,
      title: 'API Design Best Practices',
      excerpt: 'Creating intuitive, scalable, and maintainable REST APIs.',
      category: 'Technology',
      image: '/api-development-architecture.jpg',
      readTime: 9,
      date: 'Nov 4, 2024',
    },
  ];

  const categories = ['All', 'Design', 'Technology', 'Innovation'];

  return (
    <section className="bg-background py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-12">
          <CategoryFilter categories={categories} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
