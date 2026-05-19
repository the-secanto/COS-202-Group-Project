import type { BlogArticle } from '../data/articles.ts';

type ArticleCardProps = {
  article: BlogArticle;
};

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="overflow-hidden rounded-md border border-gray-100 bg-white shadow-sm">
      <img
        src={article.image}
        alt={article.title}
        className="h-40 w-full object-cover"
      />

      <div className="space-y-3 p-4">
        <span className="inline-block text-[10px] font-semibold uppercase tracking-wide text-indigo-500">
          {article.category}
        </span>
        <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">{article.title}</h3>
        <p className="line-clamp-2 text-xs text-gray-500">{article.excerpt}</p>

        <div className="text-[11px] text-gray-400">
          {article.author} • {article.readTime}
        </div>
      </div>
    </article>
  );
}
