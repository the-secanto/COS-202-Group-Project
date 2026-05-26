import { type FormEvent, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { articles } from '../data/articles.ts';
import type { BlogArticle } from '../data/articles.ts';
import { Footer } from './Footer.tsx';
import { Navbar } from './Navbar.tsx';
import { PageLayout } from './PageLayout.tsx';
import { ArticleCard } from './ArticleCard.tsx';

type CommentEntry = {
  id: string;
  author: string;
  avatar: string;
  body: string;
  timeLabel: string;
};

const initialComments: CommentEntry[] = [
  {
    id: 'c1',
    author: 'Emma J.',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Emma&backgroundColor=e8ecf1',
    body: 'This perspective helped me rethink my entire setup. Fewer tools really do reduce friction.',
    timeLabel: '2 hours ago',
  },
  {
    id: 'c2',
    author: 'Julien V.',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Julien&backgroundColor=e8ecf1',
    body: 'I started a no-notification workday after reading this. The difference in concentration is huge.',
    timeLabel: '6 hours ago',
  },
];

function resolveArticle(articleId: string | undefined): BlogArticle | undefined {
  if (!articleId) return undefined;
  const n = Number.parseInt(articleId, 10);
  return Number.isFinite(n) ? articles.find((a) => a.id === n) : undefined;
}

export function PostPage() {
  const { articleId } = useParams();
  const article = useMemo(() => resolveArticle(articleId) ?? articles[0], [articleId]);

  const related = useMemo(
    () => articles.filter((a) => a.id !== article.id && a.category === article.category).slice(0, 3),
    [article],
  );

  const paragraphs = useMemo(
    () => [
      article.excerpt,
      'Modern software often asks for constant attention, but thoughtful design asks for restraint. The less your tools demand from you, the more your work can demand from you.',
      'Simplicity is not the absence of choice; it is the presence of enough.',
      'The architecture of focus is built from small decisions repeated daily. Fewer tabs. Clearer files. More complete thoughts. Over time, the discipline of subtraction reshapes not just our workflow but our attention itself.',
      'There is a quiet confidence to writing in a single, well-lit page — no banners, no badges, no nudges. Just the cursor, and the next sentence.',
    ],
    [article],
  );

  const [comments, setComments] = useState<CommentEntry[]>(initialComments);
  const [commentName, setCommentName] = useState('');
  const [commentBody, setCommentBody] = useState('');

  const handlePostComment = (e: FormEvent) => {
    e.preventDefault();
    const body = commentBody.trim();
    if (!body) return;
    const author = commentName.trim() || 'Reader';
    setComments((prev) => [
      {
        id: `c-${Date.now()}`,
        author,
        avatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(author)}&backgroundColor=e8ecf1`,
        body,
        timeLabel: 'Just now',
      },
      ...prev,
    ]);
    setCommentBody('');
    setCommentName('');
  };

  return (
    <PageLayout mainClassName="px-0">
      <Navbar />

      <article className="mx-auto max-w-3xl px-6 py-12 md:px-10">
        <Link to="/" className="text-xs text-muted-foreground no-underline hover:text-foreground">← Back to journal</Link>

        <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
          {article.category} · {article.readTime}
        </p>
        <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-foreground md:text-5xl">
          {article.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{article.excerpt}</p>

        <div className="mt-6 flex items-center gap-3 border-y border-border py-4">
          <Link
            to={`/profile/${encodeURIComponent(article.author)}`}
            aria-label={`View ${article.author}'s profile`}
            className="no-underline"
          >
            <img
              src={article.authorAvatar}
              alt=""
              className="h-10 w-10 rounded-full bg-muted object-cover transition hover:opacity-80"
            />
          </Link>
          <div className="flex-1">
            <Link
              to={`/profile/${encodeURIComponent(article.author)}`}
              className="text-sm font-semibold text-foreground no-underline hover:underline"
            >
              {article.author}
            </Link>
            <p className="text-xs text-muted-foreground">{article.date} · {article.readTime}</p>
          </div>
          <button
            type="button"
            className="rounded-full border border-border px-4 py-1.5 text-xs font-semibold text-foreground transition hover:bg-muted"
          >
            Follow
          </button>
        </div>

        <figure className="mt-8">
          <img src={article.image} alt="" className="h-72 w-full rounded-xl object-cover md:h-96" />
        </figure>

        <div className="prose mt-10 space-y-6 font-serif text-lg leading-relaxed text-foreground/90">
          {paragraphs.map((p, i) =>
            i === 2 ? (
              <blockquote
                key={i}
                className="border-l-4 border-primary pl-5 font-serif text-xl italic text-foreground"
              >
                {p}
              </blockquote>
            ) : (
              <p key={i}>{p}</p>
            ),
          )}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3 border-y border-border py-4 text-sm">
          <button className="rounded-full bg-muted px-4 py-1.5 text-foreground hover:bg-border">♥ 408</button>
          <button className="rounded-full bg-muted px-4 py-1.5 text-foreground hover:bg-border">💬 {comments.length}</button>
          <button className="rounded-full bg-muted px-4 py-1.5 text-foreground hover:bg-border">Share</button>
          <button className="ml-auto rounded-full bg-muted px-4 py-1.5 text-foreground hover:bg-border">Save</button>
        </div>

        <section className="mt-12">
          <h2 className="font-serif text-2xl font-semibold text-foreground">
            Comments ({comments.length})
          </h2>

          <form
            onSubmit={handlePostComment}
            className="mt-5 rounded-xl border border-border bg-surface p-4 md:p-5"
          >
            <input
              type="text"
              value={commentName}
              onChange={(e) => setCommentName(e.target.value)}
              placeholder="Your name (optional)"
              className="mb-3 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
            />
            <textarea
              value={commentBody}
              onChange={(e) => setCommentBody(e.target.value)}
              required
              rows={3}
              placeholder="Share your thoughts…"
              className="w-full resize-y rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
            />
            <div className="mt-3 flex justify-end">
              <button
                type="submit"
                className="rounded-full bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
              >
                Publish comment
              </button>
            </div>
          </form>

          <div className="mt-6 space-y-5">
            {comments.map((c) => (
              <div key={c.id} className="flex items-start gap-3">
                <img src={c.avatar} alt="" className="h-9 w-9 shrink-0 rounded-full bg-muted object-cover" />
                <div className="min-w-0 flex-1 rounded-xl bg-surface border border-border p-4">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{c.author}</p>
                    <span className="text-xs text-subtle">· {c.timeLabel}</span>
                  </div>
                  <p className="mt-1 text-sm text-foreground/80">{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 font-serif text-2xl font-semibold text-foreground">More in {article.category}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <ArticleCard key={r.id} article={r} />
              ))}
            </div>
          </section>
        )}
      </article>

      <Footer />
    </PageLayout>
  );
}
