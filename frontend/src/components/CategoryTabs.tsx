type CategoryTabsProps = {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
};

export function CategoryTabs({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-2 border-b border-border pb-3">
      {categories.map((category) => {
        const isActive = category === activeCategory;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onCategoryChange(category)}
            className={`rounded-full px-4 py-1.5 text-sm transition ${
              isActive
                ? 'bg-foreground text-surface'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
