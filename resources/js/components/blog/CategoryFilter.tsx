import { useState } from 'react';

interface CategoryFilterProps {
  categories: string[];
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const [active, setActive] = useState('All');

  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActive(category)}
          className={`px-5 py-2 text-sm font-medium rounded-sm transition-all ${
            active === category
              ? 'bg-accent text-accent-foreground'
              : 'bg-muted text-foreground hover:bg-border'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
