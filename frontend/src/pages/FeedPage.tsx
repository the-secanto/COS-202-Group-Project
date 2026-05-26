import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArticlesSection } from '../components/ArticlesSection.tsx';
import { CategoryTabs } from '../components/CategoryTabs.tsx';
import { Footer } from '../components/Footer.tsx';
import { Navbar } from '../components/Navbar.tsx';
import { PageLayout } from '../components/PageLayout.tsx';
import { articles, categories } from '../data/articles.ts';

export function FeedPage() {
  const [activeCategory, setActiveCategory] = useState('All Posts');
  const [visibleCount, setVisibleCount] = useState(6);

  // "Most liked" — top 3 by id descending as a stand-in
  const mostLiked = useMemo(
    () => [...articles].sort((a, b) => b.id - a.id).slice(0, 3),
    [],
  );

  const filtered = useMemo(() => {
    if (activeCategory === 'All Posts') return articles;
    return articles.filter((a) => a.category === activeCategory);
  }, [activeCategory]);

  const visible = filtered.slice(0, visibleCount);
  const canLoadMore = visibleCount < filtered.length;

  return (
    <PageLayout mainClassName="px-0">
      <Navbar />

      <div className="px-6 py-10 md:px-10">
        <section className="mb-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Most liked</p>
          <h2 className="mt-2 mb-6 font-serif text-2xl font-semibold text-foreground md:text-3xl">
            Reader favourites this week
          </h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {mostLiked.map((a) => (
              <Link
                key={a.id}
                to={`/post/${a.id}`}
                className="group flex gap-4 rounded-xl border border-border bg-surface p-3 no-underline transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <img src={a.image} alt={a.title} className="h-20 w-24 shrink-0 rounded-lg object-cover" />
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">{a.category}</p>
                  <h3 className="mt-1 font-serif text-base font-semibold leading-snug text-foreground group-hover:underline">
                    {a.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">{a.author} · {a.readTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Latest stories</p>
          <h2 className="mt-2 font-serif text-2xl font-semibold text-foreground md:text-3xl">
            Fresh from the journal
          </h2>
        </div>

        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={(c) => {
            setActiveCategory(c);
            setVisibleCount(6);
          }}
        />

        <ArticlesSection articles={visible} />

        {canLoadMore && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((c) => c + 3)}
              className="rounded-full border border-border bg-surface px-6 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
            >
              Load more stories
            </button>
          </div>
        )}
      </div>

      <Footer />
    </PageLayout>
  );
}
