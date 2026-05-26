import { Link } from 'react-router-dom';
import type { BlogArticle } from '../data/articles.ts';

type HeroSectionProps = {
  featured: BlogArticle;
  secondary: BlogArticle[];
};

export function HeroSection({ featured, secondary }: HeroSectionProps) {
  return (
    <section className="mb-14">
      <div className="mb-8 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">The Musk Journal</p>
        <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-foreground md:text-5xl">
          Stories, ideas and craft for curious readers.
        </h1>
        <p className="mt-4 text-base text-muted-foreground">
          A modern publication covering technology, startups, lifestyle and finance — written by people who care about
          getting the details right.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <Link to={`/post/${featured.id}`} className="group block overflow-hidden rounded-2xl border border-border bg-surface no-underline">
          <div className="aspect-[16/10] overflow-hidden">
            <img
              src={featured.image}
              alt={featured.title}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
            />
          </div>
          <div className="p-6 md:p-8">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
              Featured · {featured.category}
            </span>
            <h2 className="mt-3 font-serif text-2xl font-semibold leading-snug text-foreground md:text-3xl">
              {featured.title}
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">{featured.excerpt}</p>
            <div className="mt-5 flex items-center gap-3 text-xs text-muted-foreground">
              <img src={featured.authorAvatar} alt="" className="h-8 w-8 rounded-full bg-muted object-cover" />
              <span className="font-medium text-foreground">{featured.author}</span>
              <span>·</span>
              <span>{featured.date}</span>
              <span>·</span>
              <span>{featured.readTime}</span>
            </div>
          </div>
        </Link>

        <div className="flex flex-col gap-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Editor's picks</p>
          <div className="flex flex-col gap-5">
            {secondary.map((a) => (
              <Link
                key={a.id}
                to={`/post/${a.id}`}
                className="group flex gap-4 no-underline"
              >
                <img src={a.image} alt={a.title} className="h-24 w-28 shrink-0 rounded-lg object-cover" />
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">{a.category}</p>
                  <h3 className="mt-1 font-serif text-lg font-semibold leading-snug text-foreground group-hover:underline">
                    {a.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">{a.author} · {a.readTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
