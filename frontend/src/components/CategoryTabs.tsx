type CategoryTabsProps = {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
};

export function CategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  return (
    <section className="mb-8 border-b border-gray-100">
      <div className="flex flex-wrap items-center gap-6">
        {categories.map((category) => {
          const isActive = category === activeCategory;

          return (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryChange(category)}
              className={`border-b-2 pb-3 text-sm transition ${
                isActive
                  ? 'border-indigo-600 font-semibold text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </section>
  );
}
