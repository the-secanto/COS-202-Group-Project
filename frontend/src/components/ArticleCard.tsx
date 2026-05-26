import { Link } from 'react-router-dom';
import type { BlogArticle } from '../data/articles.ts';

type ArticleCardProps = {
  article: BlogArticle;
  variant?: 'default' | 'compact';
};

export function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  if (variant === 'compact') {
    return (
      <Link
        to={`/post/${article.id}`}
        className="group flex gap-4 no-underline"
      >
        <img
          src={article.image}
          alt={article.title}
          className="h-20 w-24 shrink-0 rounded-md object-cover"
        />
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">{article.category}</p>
          <h4 className="mt-1 font-serif text-base font-semibold leading-snug text-foreground group-hover:underline">
            {article.title}
          </h4>
          <p className="mt-1 text-xs text-muted-foreground">{article.author} · {article.readTime}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/post/${article.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface no-underline transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">{article.category}</span>
        <h3 className="font-serif text-xl font-semibold leading-snug text-foreground">{article.title}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{article.excerpt}</p>
        <div className="mt-auto flex items-center gap-2 pt-2 text-xs text-muted-foreground">
          <img src={article.authorAvatar} alt="" className="h-6 w-6 rounded-full bg-muted object-cover" />
          <span className="text-foreground/80">{article.author}</span>
          <span>·</span>
          <span>{article.date}</span>
          <span>·</span>
          <span>{article.readTime}</span>
        </div>
      </div>
    </Link>
  );
}
