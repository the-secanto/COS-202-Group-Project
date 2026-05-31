import { type FormEvent, useEffect, useMemo, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { articles } from '../data/articles.ts';
import type { BlogArticle } from '../data/articles.ts';
import { Footer } from './Footer.tsx';
import { Navbar } from './Navbar.tsx';
import { PageLayout } from './PageLayout.tsx';
import { useSavedPosts } from '../hooks/useSavedPosts.ts';
import { fetchComments, fetchPostById, submitComment } from '../utils/api.ts';
import { useAuth } from '../context/AuthContext';

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
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    body: 'This perspective helped me rethink my entire setup. Fewer tools really do reduce friction and improve the quality of focused work.',
    timeLabel: '2 hours ago',
  },
  {
    id: 'c2',
    author: 'Julien V.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    body: 'I started a no-notification workday after reading this. The difference in concentration is huge, especially for long-form writing sessions.',
    timeLabel: '6 hours ago',
  },
  {
    id: 'c3',
    author: 'Noah K.',
    avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=120&q=80',
    body: 'Great read. Minimal computing feels less like a trend and more like a practical design philosophy for modern creators.',
    timeLabel: '1 day ago',
  },
];

const defaultPost = {
  eyebrow: 'Technology · 6 min read',
  title: 'The Quiet Revolution of Minimal Computing',
  author: 'Marcus Thorne',
  authorMeta: 'Design Philosopher · Apr 16, 2026',
  authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  heroImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80',
  heroCaption: 'The beauty of a focused environment.',
  paragraphs: [
    'It was on a rain-soaked afternoon I first powered this machine. No notifications, no startup banners, no digital noise. Just one cursor, one text field, and the sound of keys striking with intention.',
    'Modern software often asks for constant attention, but this discipline asks for restraint. The less your tools demand from you, the more your work can demand from you.',
    'Simplicity is not the absence of choice; it is the presence of enough.',
    'The architecture of focus is built from small decisions repeated daily. Fewer tabs. Clearer files. More complete thoughts.',
  ],
  quoteIndex: 2,
};

function mapBackendComment(comment: any): CommentEntry {
  const authorName = comment.author?.name || comment.author || 'Reader';
  return {
    id: String(comment.id),
    author: authorName,
    avatar: comment.author?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=e0e7ff&color=3730a3&size=128`,
    body: comment.content || comment.body || '',
    timeLabel: comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : 'Just now',
  };
}

function resolveArticle(articleId: string | undefined): BlogArticle | undefined {
  if (articleId === undefined || articleId === '') return undefined;
  const n = Number.parseInt(articleId, 10);
  if (!Number.isFinite(n)) return undefined;
  return articles.find((a) => a.id === n);
}

export function PostPage() {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toggleSave, isSaved } = useSavedPosts();
  const article = useMemo(() => resolveArticle(articleId), [articleId]);
  const [postData, setPostData] = useState<any>(null);
  const [comments, setComments] = useState<CommentEntry[]>([]);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentBody, setCommentBody] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPost = async () => {
      if (!articleId) return;
      try {
        const result = await fetchPostById(articleId);
        setPostData(result);
      } catch (err) {
        setError((err as Error).message || 'Unable to load the story.');
      }
    };

    const loadComments = async () => {
      if (!articleId) return;
      try {
        const commentData = await fetchComments(articleId);
        if (Array.isArray(commentData)) {
          setComments(commentData.map(mapBackendComment));
        } else {
          setComments(initialComments);
        }
      } catch {
        setComments(initialComments);
      }
    };

    loadPost();
    loadComments();
  }, [articleId]);

  const saved = article ? isSaved(article.id) : false;

  const post = useMemo(() => {
    if (postData) {
      const excerpt = postData.content ? String(postData.content).slice(0, 120) : '';
      return {
        eyebrow: `${(postData.tags?.[0] as string) || 'Technology'} · ${postData.content ? `${Math.max(1, Math.ceil(String(postData.content).length / 250))} min read` : '1 min read'}`,
        title: postData.title || 'Untitled post',
        author: postData.author?.name || 'Anonymous',
        authorMeta: `${(postData.tags?.[0] as string) || 'Technology'} · ${postData.createdAt ? new Date(postData.createdAt).toLocaleDateString() : 'No date'}`,
        authorAvatar: postData.author?.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        heroImage: postData.coverPhoto || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80',
        heroCaption: excerpt,
        paragraphs: postData.content
          ? [
              String(postData.content),
              'Modern software often asks for constant attention, but thoughtful design asks for restraint. The less your tools demand from you, the more your work can demand from you.',
              'Simplicity is not the absence of choice; it is the presence of enough.',
              'The architecture of focus is built from small decisions repeated daily. Fewer tabs. Clearer files. More complete thoughts.',
            ]
          : defaultPost.paragraphs,
        quoteIndex: 2,
      };
    }

    if (!article) {
      return defaultPost;
    }

    return {
      eyebrow: `${article.category} · ${article.readTime}`,
      title: article.title,
      author: article.author,
      authorMeta: `${article.category} · Apr 16, 2026`,
      authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      heroImage: article.image,
      heroCaption: article.excerpt.slice(0, 120) + (article.excerpt.length > 120 ? '…' : ''),
      paragraphs: [
        article.excerpt,
        'Modern software often asks for constant attention, but thoughtful design asks for restraint. The less your tools demand from you, the more your work can demand from you.',
        'Simplicity is not the absence of choice; it is the presence of enough.',
        'The architecture of focus is built from small decisions repeated daily. Fewer tabs. Clearer files. More complete thoughts.',
      ],
      quoteIndex: 2,
    };
  }, [article, postData]);

  const handlePostComment = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    const body = commentBody.trim();
    if (!body || !articleId) return;

    try {
      const newComment = await submitComment({
        postId: Number(articleId),
        author: user.name,
        content: body,
      });
      setComments((prev) => [mapBackendComment(newComment), ...prev]);
      setCommentBody('');
      setShowCommentForm(false);
    } catch (err) {
      setError((err as Error).message || 'Unable to post your comment.');
    }
  };

  const handleCommentButtonClick = () => {
    if (!user) {
      navigate('/login');
    } else {
      setShowCommentForm((open) => !open);
    }
  };

  return (
    <PageLayout>
        <Navbar />

        <article className="mx-auto max-w-2xl">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.26em] text-gray-400">{post.eyebrow}</p>

          <h1 className="text-2xl font-semibold leading-tight text-gray-900 md:text-[2rem]">{post.title}</h1>

          <div className="mt-6 flex items-center gap-3">
            <Link to={`/profile/${encodeURIComponent(post.author)}`} className="shrink-0 transition hover:opacity-80">
              <img
                src={post.authorAvatar}
                alt=""
                className="h-10 w-10 rounded-full object-cover"
              />
            </Link>
            <div>
              <Link to={`/profile/${encodeURIComponent(post.author)}`} className="text-sm font-medium text-gray-800 no-underline hover:text-indigo-600 transition">
                {post.author}
              </Link>
              <p className="text-xs text-gray-500">{post.authorMeta}</p>
            </div>
          </div>

          <figure className="mt-8 border-t border-gray-100 pt-6">
            <img
              src={post.heroImage}
              alt=""
              className="h-[300px] w-full rounded-sm object-cover md:h-[330px]"
            />
            <figcaption className="mt-2 text-center text-xs text-gray-400">{post.heroCaption}</figcaption>
          </figure>

          <div className="mt-8 space-y-5 text-[14px] leading-8 text-gray-700 md:text-[15px]">
            {post.paragraphs.map((p, i) =>
              i === post.quoteIndex ? (
                <p key={i} className="border-l-2 border-indigo-500 pl-4 italic text-gray-600">
                  {p}
                </p>
              ) : (
                <p key={i}>{p}</p>
              ),
            )}
          </div>

          <div className="mt-10 border-y border-gray-100 py-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                className="rounded-md border border-gray-200 px-3.5 py-2 text-xs font-medium text-gray-700 transition hover:border-gray-300 hover:text-gray-900 md:text-sm"
              >
                Likes (408)
              </button>
              <button
                type="button"
                className="rounded-md border border-gray-200 px-3.5 py-2 text-xs font-medium text-gray-700 transition hover:border-gray-300 hover:text-gray-900 md:text-sm"
              >
                Share
              </button>
              {article && (
                <button
                  type="button"
                  onClick={() => toggleSave(article.id)}
                  className={`rounded-md border px-3.5 py-2 text-xs font-medium transition md:text-sm ${
                    saved
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:text-gray-900'
                  }`}
                >
                  {saved ? 'Saved' : 'Save'}
                </button>
              )}
            </div>
          </div>

          <section className="mt-10">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-gray-900">Readers Comments ({comments.length})</h2>
              <button
                type="button"
                onClick={handleCommentButtonClick}
                className="rounded-md bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-500"
              >
                {showCommentForm ? 'Close' : 'Post a comment'}
              </button>
            </div>

            {showCommentForm && (
              <form
                onSubmit={handlePostComment}
                className="mb-6 rounded-md border border-indigo-100 bg-indigo-50/40 p-4 md:p-5"
              >
                <p className="mb-3 text-sm font-medium text-gray-900">Add your comment</p>
                <label className="block">
                  <span className="sr-only">Comment</span>
                  <textarea
                    value={commentBody}
                    onChange={(e) => setCommentBody(e.target.value)}
                    required
                    rows={4}
                    placeholder="Write your comment…"
                    className="w-full resize-y rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none ring-indigo-500/30 placeholder:text-gray-400 focus:ring-2"
                  />
                </label>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-500"
                  >
                    Publish comment
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCommentForm(false);
                      setCommentBody('');
                    }}
                    className="rounded-md border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-4 border-t border-gray-100 pt-6">
              {comments.map((c) => (
                <article key={c.id} className="rounded-md border border-gray-100 bg-[#fcfcfd] p-4">
                  <div className="flex items-start gap-3">
                    <img src={c.avatar} alt="" className="h-9 w-9 shrink-0 rounded-full object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <p className="text-sm font-semibold text-gray-900">{c.author}</p>
                        <span className="text-xs text-gray-400">{c.timeLabel}</span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-gray-600">{c.body}</p>
                      <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                        <button type="button" className="transition hover:text-gray-800">
                          Like
                        </button>
                        <button type="button" className="transition hover:text-gray-800">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-10 rounded-md border border-gray-100 bg-[#fafafa] p-4 md:p-5">
            <div className="flex items-start gap-3">
              <Link to={`/profile/${encodeURIComponent(post.author)}`} className="shrink-0 transition hover:opacity-80">
                <img
                  src={post.authorAvatar}
                  alt=""
                  className="h-10 w-10 rounded-md object-cover"
                />
              </Link>
              <div>
                <Link to={`/profile/${encodeURIComponent(post.author)}`} className="text-sm font-semibold text-gray-900 no-underline hover:text-indigo-600 transition">
                  {post.author}
                </Link>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Author of design-philosophy essays and practical note on digital focus. His writing explores how
                  minimal tools shape better thinking.
                </p>
                <Link
                  to={`/profile/${encodeURIComponent(post.author)}`}
                  className="mt-3 inline-block text-xs font-semibold text-indigo-600 no-underline transition hover:text-indigo-500"
                >
                  View all publications
                </Link>
              </div>
            </div>
          </section>
        </article>

        <Footer />
    </PageLayout>
  );
}

