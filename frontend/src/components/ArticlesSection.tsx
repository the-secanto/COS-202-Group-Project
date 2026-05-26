import type { BlogArticle } from '../data/articles.ts';
import { ArticleCard } from './ArticleCard.tsx';

type ArticlesSectionProps = {
  articles: BlogArticle[];
};

export function ArticlesSection({ articles }: ArticlesSectionProps) {
  if (articles.length === 0) {
    return (
      <section className="rounded-xl border border-dashed border-border py-14 text-center text-sm text-muted-foreground">
        No articles in this category yet.
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </section>
  );
}
