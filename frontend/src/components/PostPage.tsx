import { type FormEvent, useEffect, useMemo, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { articles } from '../data/articles.ts';
import type { BlogArticle } from '../data/articles.ts';
import { Footer } from './Footer.tsx';
import { Navbar } from './Navbar.tsx';
import { PageLayout } from './PageLayout.tsx';
import { useSavedPosts } from '../hooks/useSavedPosts.ts';
import { fetchComments, fetchPostById, submitComment, likePost, unlikePost, savePost, unsavePost, deleteComment, deletePost } from '../utils/api.ts';
import { useAuth } from '../context/AuthContext';

type CommentEntry = {
  id: number;
  author: string;
  avatar: string;
  body: string;
  timeLabel: string;
  replies: CommentEntry[];
  likesCount: number;
  authorId: number;
};

function CommentItem({ 
  comment, 
  onReply,
  onDelete
}: { 
  comment: CommentEntry; 
  onReply: (parentId: number, authorName: string) => void;
  onDelete: (commentId: number) => void;
}) {
  const { user } = useAuth();
  const isAuthor = user?.id === comment.authorId;

  return (
    <div className="space-y-4">
      <article className="rounded-md border border-gray-100 bg-[#fcfcfd] p-4">
        <div className="flex items-start gap-3">
          <img src={comment.avatar} alt="" className="h-9 w-9 shrink-0 rounded-full object-cover" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-gray-900">{comment.author}</p>
                <span className="text-xs text-gray-400">{comment.timeLabel}</span>
              </div>
              {isAuthor && (
                <button 
                  type="button" 
                  onClick={() => onDelete(comment.id)}
                  className="text-[10px] font-bold uppercase tracking-wider text-red-400 transition hover:text-red-600"
                >
                  Delete
                </button>
              )}
            </div>
            <p className="mt-2 text-sm leading-6 text-gray-600">{comment.body}</p>
            <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
              <button type="button" className="transition hover:text-gray-800">
                Like ({comment.likesCount})
              </button>
              <button 
                type="button" 
                onClick={() => onReply(comment.id, comment.author)}
                className="transition hover:text-gray-800"
              >
                Reply
              </button>
            </div>
          </div>
        </div>
      </article>
      {comment.replies.length > 0 && (
        <div className="ml-6 space-y-4 border-l-2 border-gray-50 pl-4">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} onReply={onReply} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
}

function mapBackendComment(comment: any): CommentEntry {
  const authorName = comment.author?.name || comment.author || 'Reader';
  console.log('DEBUG: Mapping comment:', comment);
  return {
    id: comment.id,
    author: authorName,
    avatar: comment.author?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=e0e7ff&color=3730a3&size=128`,
    body: String(comment.content || comment.body || ''), // Force string
    timeLabel: comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : 'Just now',
    likesCount: comment.likesCount || 0,
    replies: Array.isArray(comment.replies) ? comment.replies.map(mapBackendComment) : [],
    authorId: comment.authorId,
  };
}

function resolveArticle(articleId: string | undefined): BlogArticle | undefined {
  if (articleId === undefined || articleId === '') return undefined;
  const n = Number.parseInt(articleId, 10);
  if (!Number.isFinite(n)) return undefined;
  return articles.find((a) => a.id === n);
}

export function PostPage() {
  const params = useParams();
  const articleId = params.articleId;
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isSaved } = useSavedPosts();
  const article = useMemo(() => resolveArticle(articleId), [articleId]);
  
  // Explicitly reference these to satisfy TS6198
  const _unused = { article, isSaved };
  void _unused;

  const [postData, setPostData] = useState<any>(null);
  const [comments, setComments] = useState<CommentEntry[]>([]);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentBody, setCommentBody] = useState('');
  const [replyingTo, setReplyingTo] = useState<{ id: number; name: string } | null>(null);
  const [actionMessage, setActionMessage] = useState('');
  const [likesCount, setLikesCount] = useState(0);
  const [isPostSaved, setIsPostSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isPublishingComment, setIsPublishingComment] = useState(false);
  const [isLoadingPost, setIsLoadingPost] = useState(true);

  const loadComments = async () => {
    if (!articleId) return;
    try {
      const commentData = await fetchComments(articleId);
      if (Array.isArray(commentData)) {
        setComments(commentData.map(mapBackendComment));
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const loadPost = async () => {
      if (!articleId) return;
      setIsLoadingPost(true);
      try {
        const result = await fetchPostById(articleId);
        setPostData(result);
        setLikesCount(result._count?.likes || 0);
      } catch (err) {
        console.error('Failed to load story:', err);
      } finally {
        setIsLoadingPost(false);
      }
    };

    loadPost();
    loadComments();
  }, [articleId]);

  const handleDeleteComment = async (commentId: number) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;

    try {
      await deleteComment(commentId);
      await loadComments();
      setActionMessage('Comment deleted');
      setTimeout(() => setActionMessage(''), 3000);
    } catch (err) {
      console.error('Unable to delete comment:', err);
    }
  };

  const handleDeletePost = async () => {
    if (!window.confirm('Are you sure you want to delete this story? This action cannot be undone.')) return;

    try {
      await deletePost(Number(articleId));
      navigate('/');
    } catch (err) {
      console.error('Unable to delete story:', err);
    }
  };

  const post = useMemo(() => {
    if (postData) {
      const p = {
        eyebrow: `${(postData.tags?.[0] as string) || 'Technology'} · ${postData.content ? `${Math.max(1, Math.ceil(String(postData.content).length / 250))} min read` : '1 min read'}`,
        title: postData.title || 'Untitled post',
        author: postData.author?.name || 'Anonymous',
        authorMeta: `${postData.createdAt ? new Date(postData.createdAt).toLocaleDateString() : 'No date'}`,
        authorAvatar: postData.author?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(postData.author?.name || 'A')}&background=e0e7ff&color=3730a3&size=128`,
        heroImage: postData.coverPhoto || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80',
        paragraphs: postData.content
          ? String(postData.content).split('\n').filter(p => p.trim() !== '')
          : [],
        quoteIndex: -1, // No quote by default
      };
      return p;
    }

    if (article) {
        return {
          eyebrow: `${article.category} · ${article.readTime}`,
          title: article.title,
          author: article.author,
          authorMeta: `Apr 16, 2026`,
          authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
          heroImage: article.image,
          paragraphs: article.excerpt.split('\n').filter(p => p.trim() !== ''),
          quoteIndex: -1,
        };
    }
    
    return null;
  }, [article, postData]);

  if (isLoadingPost) {
    return (
        <PageLayout>
            <Navbar />
            <div className="flex h-96 items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600"></div>
            </div>
            <Footer />
        </PageLayout>
    );
  }

  if (!post) {
      return (
        <PageLayout>
            <Navbar />
            <div className="flex h-96 items-center justify-center">
                <p className="text-gray-500">Post not found.</p>
            </div>
            <Footer />
        </PageLayout>
      );
  }

  const showLoginPrompt = (action: string) => {
    setActionMessage(`Please login/signup to ${action} this story.`);
    setTimeout(() => setActionMessage(''), 3000);
  };

  const handlePostComment = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) {
      showLoginPrompt('post a comment');
      return;
    }

    const body = commentBody.trim();
    if (!body || !articleId) return;

    setIsPublishingComment(true);
    try {
      await submitComment({
        postId: Number(articleId),
        content: body,
        parentId: replyingTo?.id || undefined,
      });
      await loadComments();
      setCommentBody('');
      setReplyingTo(null);
      setShowCommentForm(false);
      setActionMessage('Comment posted successfully!');
      setTimeout(() => setActionMessage(''), 3000);
    } catch (err) {
      console.error('Unable to post comment:', err);
      setActionMessage('Failed to post comment.');
      setTimeout(() => setActionMessage(''), 3000);
    } finally {
      setIsPublishingComment(false);
    }
  };

  const handleReply = (parentId: number, authorName: string) => {
    if (!user) {
      showLoginPrompt('reply to');
      return;
    }
    setReplyingTo({ id: parentId, name: authorName });
    setShowCommentForm(true);
  };

  const handleCommentButtonClick = () => {
    if (!user) {
      showLoginPrompt('comment on');
    } else {
      setReplyingTo(null);
      setShowCommentForm((open) => !open);
    }
  };

  const handleLike = async () => {
    if (!user) {
      showLoginPrompt('like');
      return;
    }

    if (!articleId) return;

    try {
      if (isLiked) {
        const result = await unlikePost(Number(articleId));
        setLikesCount(result?.likes ?? likesCount - 1);
        setIsLiked(false);
        setActionMessage('Post unliked');
      } else {
        const result = await likePost(Number(articleId));
        setLikesCount(result?.likes ?? likesCount + 1);
        setIsLiked(true);
        setActionMessage('Post liked!');
      }
      setTimeout(() => setActionMessage(''), 2000);
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setActionMessage('Link copied to clipboard!');
      setTimeout(() => setActionMessage(''), 3000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  const handleSave = async () => {
    if (!user) {
      showLoginPrompt('save');
      return;
    }

    if (!articleId) return;

    try {
      if (isPostSaved) {
        await unsavePost(Number(articleId));
        setIsPostSaved(false);
        setActionMessage('Post removed from saves');
      } else {
        await savePost(Number(articleId));
        setIsPostSaved(true);
        setActionMessage('Post saved successfully!');
      }
      setTimeout(() => setActionMessage(''), 3000);
    } catch (err) {
      console.error('Error toggling save:', err);
    }
  };

  return (
    <PageLayout>
        <Navbar />

        <article className="mx-auto max-w-2xl relative">
          {actionMessage && (
            <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 rounded-full bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-lg animate-bounce">
              {actionMessage}
            </div>
          )}

          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.26em] text-gray-400">{post?.eyebrow}</p>

          <h1 className="text-2xl font-semibold leading-tight text-gray-900 md:text-[2rem]">{console.log('Rendering title:', post?.title)}{post?.title}</h1>

          <div className="mt-6 flex items-center gap-3">
            <Link to={`/profile/${encodeURIComponent(post?.author || '')}`} className="shrink-0 transition hover:opacity-80">
              <img
                src={post?.authorAvatar}
                alt=""
                className="h-10 w-10 rounded-full object-cover"
              />
            </Link>
            <div>
              <Link to={`/profile/${encodeURIComponent(post?.author || '')}`} className="text-sm font-medium text-gray-800 no-underline hover:text-indigo-600 transition">
                {post?.author}
              </Link>
              <p className="text-xs text-gray-500">{console.log('Rendering authorMeta:', post?.authorMeta)}{post?.authorMeta}</p>
            </div>
          </div>

          <figure className="mt-8 border-t border-gray-100 pt-6">
            <img
              src={post?.heroImage}
              alt={post?.title}
              className="h-[300px] w-full rounded-sm object-cover md:h-[330px]"
            />
          </figure>

          <div className="mt-8 space-y-5 text-[14px] leading-8 text-gray-700 md:text-[15px]">
            {post?.paragraphs?.map((p, i) => {
              console.log('Rendering paragraph:', p);
              return i === post.quoteIndex ? (
                <p key={i} className="border-l-2 border-indigo-500 pl-4 italic text-gray-600">
                  {p}
                </p>
              ) : (
                <p key={i}>{p}</p>
              );
            })}
          </div>

          <div className="mt-10 border-y border-gray-100 py-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleLike}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all duration-200 md:text-sm ${
                  isLiked && user
                    ? 'border-pink-200 bg-pink-50 text-pink-600 shadow-sm shadow-pink-100'
                    : 'border-gray-200 text-gray-600 hover:border-pink-200 hover:bg-pink-50 hover:text-pink-600'
                }`}
              >
                <svg 
                  className={`h-4 w-4 transition-transform duration-200 ${isLiked && user ? 'scale-110 fill-current' : ''}`} 
                  viewBox="0 0 24 24" 
                  fill={isLiked && user ? "currentColor" : "none"} 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
                <span className="tabular-nums">{likesCount}</span>
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="rounded-md border border-gray-200 px-3.5 py-2 text-xs font-medium text-gray-700 transition hover:border-gray-300 hover:text-gray-900 md:text-sm"
              >
                Share
              </button>
              <button
                type="button"
                onClick={handleSave}
                className={`rounded-md border px-3.5 py-2 text-xs font-medium transition md:text-sm ${
                  isPostSaved && user
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                    : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:text-gray-900'
                }`}
              >
                {isPostSaved && user ? 'Saved' : 'Save'}
              </button>
              {user && postData && user.id === postData.authorId && (
                <button
                  type="button"
                  onClick={handleDeletePost}
                  className="rounded-md border border-red-100 bg-red-50 px-3.5 py-2 text-xs font-medium text-red-600 transition hover:border-red-200 hover:bg-red-100 md:text-sm"
                >
                  Delete Story
                </button>
              )}
            </div>
          </div>

          <section className="mt-10">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-gray-900">Readers Comments</h2>
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
                <p className="mb-3 text-sm font-medium text-gray-900">
                  {replyingTo ? `Reply to ${replyingTo.name}` : 'Add your comment'}
                </p>
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
                    disabled={isPublishingComment}
                    className="rounded-md bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPublishingComment ? (
                      <span className="flex items-center gap-2">
                        <svg className="h-3 w-3 animate-spin text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Publishing...
                      </span>
                    ) : (
                      replyingTo ? 'Post Reply' : 'Publish comment'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCommentForm(false);
                      setCommentBody('');
                      setReplyingTo(null);
                    }}
                    className="rounded-md border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-6 border-t border-gray-100 pt-6">
              {comments.length > 0 ? (
                comments.map((c) => (
                  <CommentItem key={c.id} comment={c} onReply={handleReply} onDelete={handleDeleteComment} />
                ))
              ) : (
                <p className="py-10 text-center text-sm text-gray-500">No comments yet. Be the first to share your thoughts!</p>
              )}
            </div>
          </section>

          <section className="mt-10 rounded-md border border-gray-100 bg-[#fafafa] p-4 md:p-5">
            <div className="flex items-start gap-3">
              <Link to={`/profile/${encodeURIComponent(post?.author || '')}`} className="shrink-0 transition hover:opacity-80">
                <img
                  src={post?.authorAvatar}
                  alt=""
                  className="h-10 w-10 rounded-md object-cover"
                />
              </Link>
              <div>
                <Link to={`/profile/${encodeURIComponent(post?.author || '')}`} className="text-sm font-semibold text-gray-900 no-underline hover:text-indigo-600 transition">
                  {post?.author}
                </Link>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Author of design-philosophy essays and practical note on digital focus. His writing explores how
                  minimal tools shape better thinking.
                </p>
                <Link
                  to={`/profile/${encodeURIComponent(post?.author || '')}`}
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
