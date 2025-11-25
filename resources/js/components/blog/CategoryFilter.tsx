import { router } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { Input } from '../ui/input';

interface Category {
  id: number;
  title: string;
  description: string | null;
}

interface CategoryFilterProps {
  categories: Category[];
  activeCategory?: string;
  searchQuery?: string;
  sortBy?: string;
}

export function CategoryFilter({ categories, activeCategory, searchQuery, sortBy }: CategoryFilterProps) {
  const [search, setSearch] = useState(searchQuery || '');
  const [active, setActive] = useState(activeCategory || 'All');
  const [sort, setSort] = useState(sortBy || 'latest');

  const handleCategoryClick = (category: string) => {
    setActive(category);
    const params = new URLSearchParams();

    if (category !== 'All') {
      params.set('category', category);
    }

    if (search) {
      params.set('search', search);
    }

    if (sort !== 'latest') {
      params.set('sort', sort);
    }

    router.get(`/blog?${params.toString()}`, {}, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    const params = new URLSearchParams();

    if (active !== 'All') {
      params.set('category', active);
    }

    if (value) {
      params.set('search', value);
    }

    if (sort !== 'latest') {
      params.set('sort', sort);
    }

    router.get(`/blog?${params.toString()}`, {}, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleSortChange = (value: string) => {
    setSort(value);
    const params = new URLSearchParams();

    if (active !== 'All') {
      params.set('category', active);
    }

    if (search) {
      params.set('search', search);
    }

    if (value !== 'latest') {
      params.set('sort', value);
    }

    router.get(`/blog?${params.toString()}`, {}, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const allCategories = ['All', ...categories.map(c => c.title)];

  return (
    <div className="space-y-6">
      {/* Active Filter Indicator */}
      {(active !== 'All' || search) && (
        <div className="flex items-center gap-3 p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-foreground">Filtering by:</span>
            {active !== 'All' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                {active}
                <button
                  onClick={() => handleCategoryClick('All')}
                  className="ml-1 hover:bg-primary-foreground/20 rounded-full p-0.5"
                  title="Clear category filter"
                >
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
            {search && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm font-medium">
                "{search}"
                <button
                  onClick={() => handleSearch('')}
                  className="ml-1 hover:bg-accent-foreground/20 rounded-full p-0.5"
                  title="Clear search"
                >
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
          </div>
        </div>
      )}



      {/* Sort Dropdown */}
      <div className="flex items-center gap-3 justify-between">
        <div className='shrink-0 flex gap-3 items-center'>

          <label htmlFor="sort" className="text-sm font-semibold text-foreground">
            Sort by:
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="px-4 py-2 bg-muted text-foreground border border-border rounded-lg text-sm font-medium hover:bg-border transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <option value="latest">Latest</option>
            <option value="popular">Most Popular</option>
            <option value="liked">Most Liked</option>
          </select>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Categories</h3>
        <div className="flex flex-wrap gap-3">
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-all ${active === category
                ? 'bg-primary text-primary-foreground shadow-md ring-2 ring-primary ring-offset-2 ring-offset-background'
                : 'bg-muted text-foreground hover:bg-border hover:shadow-sm'
                }`}
            >
              {category}
              {active === category && (
                <span className="ml-2 inline-block">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
