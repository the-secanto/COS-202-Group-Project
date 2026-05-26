import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer.tsx';
import { Navbar } from '../components/Navbar.tsx';
import { PageLayout } from '../components/PageLayout.tsx';
import { ArticleCard } from '../components/ArticleCard.tsx';
import { articles } from '../data/articles.ts';

export function HomePage() {
  const recent = articles.slice(0, 3);

  return (
    <PageLayout mainClassName="px-0">
      <Navbar />

      <section className="px-6 pt-16 pb-12 md:px-10 md:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">
            Welcome to Musk
          </p>
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-foreground md:text-6xl">
            A quieter corner of the internet for thoughtful writing.
          </h1>
          <p className="mt-6 text-base text-muted-foreground md:text-lg">
            Musk is a modern blog platform for stories on technology, startups, lifestyle and finance —
            written by people who care about the craft.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/feed"
              className="rounded-full bg-foreground px-6 py-2.5 text-sm font-semibold text-surface no-underline transition hover:opacity-90"
            >
              Read the feed
            </Link>
            <Link
              to="/register"
              className="rounded-full border border-border bg-surface px-6 py-2.5 text-sm font-semibold text-foreground no-underline transition hover:bg-muted"
            >
              Start writing
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 md:px-10">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Fresh reads</p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-foreground md:text-3xl">
              Recent stories
            </h2>
          </div>
          <Link to="/feed" className="text-sm text-muted-foreground no-underline hover:text-foreground">
            View all →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recent.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      </section>

      <Footer />
    </PageLayout>
  );
}
