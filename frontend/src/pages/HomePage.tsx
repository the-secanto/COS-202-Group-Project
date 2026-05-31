import { useEffect, useMemo, useState } from 'react';
import { HeroSection } from '../components/HeroSection.tsx';
import { CategoryTabs } from '../components/CategoryTabs.tsx';
import { ArticlesSection } from '../components/ArticlesSection.tsx';
import { Footer } from '../components/Footer.tsx';
import { Navbar } from '../components/Navbar.tsx';
import { PageLayout } from '../components/PageLayout.tsx';
import { categories } from '../data/articles.ts';
import type { BlogArticle } from '../data/articles.ts';
import { fetchFeed } from '../utils/api.ts';

const defaultImage = 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80';

function mapBackendPostToArticle(post: any): BlogArticle {
  const excerpt = post.content ? post.content.slice(0, 120) : 'No description available.';
  const category = Array.isArray(post.tags) && post.tags.length > 0 ? post.tags[0] : 'Technology';
  const author = post.author?.name || 'Anonymous';

  return {
    id: post.id,
    title: post.title || 'Untitled post',
    excerpt: `${excerpt}${excerpt.length >= 120 ? '…' : ''}`,
    category,
    author,
    readTime: post.content ? `${Math.max(1, Math.ceil(post.content.length / 250))} min read` : '1 min read',
    image: post.coverPhoto || defaultImage,
  };
}

export function HomePage() {
  const [activeCategory, setActiveCategory] = useState('All Posts');
  const [visibleCount, setVisibleCount] = useState(6);
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadFeed = async () => {
      try {
        const feed = await fetchFeed();
        const mappedArticles = Array.isArray(feed) ? feed.map(mapBackendPostToArticle) : [];
        setArticles(mappedArticles);
      } catch (err) {
        setError((err as Error).message || 'Unable to load the homepage feed.');
      } finally {
        setLoading(false);
      }
    };

    loadFeed();
  }, []);

  const filteredArticles = useMemo(() => {
    if (activeCategory === 'All Posts') {
      return articles;
    }
    return articles.filter((article) => article.category === activeCategory);
  }, [activeCategory, articles]);

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
    <PageLayout>
      <Navbar />
      <HeroSection />
      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {loading ? (
        <section className="py-14 text-center text-gray-500">Loading stories…</section>
      ) : error ? (
        <section className="py-14 text-center text-red-500">{error}</section>
      ) : (
        <ArticlesSection articles={visibleArticles} />
      )}

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
    </PageLayout>
  );
}
