import { useMemo, useState } from 'react';
import { HeroSection } from '../components/HeroSection.tsx';
import { CategoryTabs } from '../components/CategoryTabs.tsx';
import { ArticlesSection } from '../components/ArticlesSection.tsx';
import { Footer } from '../components/Footer.tsx';
import { Navbar } from '../components/Navbar.tsx';
import { articles, categories } from '../data/articles.ts';

export function HomePage() {
  const [activeCategory, setActiveCategory] = useState('All Posts');
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredArticles = useMemo(() => {
    if (activeCategory === 'All Posts') {
      return articles;
    }
    return articles.filter((article) => article.category === activeCategory);
  }, [activeCategory]);

  const visibleArticles = filteredArticles.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredArticles.length;

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(6);
  };

  const handleLoadMore = () => {
    setVisibleCount((currentCount) => currentCount + 3);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] py-8 text-[#1f1f1f]">
      <main className="mx-auto w-[92%] max-w-6xl rounded-md bg-white p-6 shadow-sm md:p-10">
        <Navbar />
        <HeroSection />
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
        <ArticlesSection articles={visibleArticles} />

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={handleLoadMore}
            disabled={!canLoadMore}
            className="rounded-md border border-gray-200 px-6 py-2 text-sm font-medium text-gray-600 transition hover:border-gray-300 hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Load more stories
          </button>
        </div>

        <Footer />
      </main>
    </div>
  );
}
