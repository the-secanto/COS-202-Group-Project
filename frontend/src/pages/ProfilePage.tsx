import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar.tsx';
import { PageLayout } from '../components/PageLayout.tsx';
import { articles } from '../data/articles.ts';
import type { BlogArticle } from '../data/articles.ts';
import { useSavedPosts } from '../hooks/useSavedPosts.ts';
import { fetchProfile, followUser, unfollowUser, updateProfile, deletePost } from '../utils/api.ts';
import { useAuth } from '../context/AuthContext';

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const topics = [
// ... (rest of topics)

  {
    label: 'Technology',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M9 9h6v6H9z" />
        <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
      </svg>
    ),
  },
  {
    label: 'Start Up',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <rect x="3" y="4" width="18" height="12" rx="1" />
        <path d="M8 20h8M12 16v4" />
      </svg>
    ),
  },
  {
    label: 'Finance',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M12 8v4M10.5 10.5h3" />
      </svg>
    ),
  },
  {
    label: 'Lifestyle',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
];

type ProfileTab = 'published' | 'saved' | 'drafts';

function ProfileStoryRow({ 
  article, 
  date,
  onDelete
}: { 
  article: BlogArticle; 
  date: string;
  onDelete?: (id: number) => void;
}) {
  const { toggleSave, isSaved } = useSavedPosts();
  const saved = isSaved(article.id);

  return (
    <article className="flex flex-col gap-5 border-b border-gray-100 py-8 last:border-b-0 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
          {article.category} <span className="font-normal text-gray-400">·</span> {article.readTime}
        </p>
        <h2 className="mt-2 font-serif text-xl font-semibold leading-snug tracking-tight text-[#111] sm:text-2xl">
          <Link to={`/post/${article.id}`} className="text-inherit no-underline hover:text-gray-700">
            {article.title}
          </Link>
        </h2>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-600">{article.excerpt}</p>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-500">
          <time dateTime={date}>{date}</time>
          <button
            type="button"
            onClick={() => toggleSave(article.id)}
            className={`rounded p-1 transition hover:bg-gray-100 ${
              saved ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-700'
            }`}
            aria-label={saved ? "Unsave story" : "Save story"}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>

          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(article.id)}
              className="text-[10px] font-bold uppercase tracking-wider text-red-400 transition hover:text-red-600"
            >
              Delete Post
            </button>
          )}

          <button
            type="button"
            className="rounded p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            aria-label="More options"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <circle cx="5" cy="12" r="1.5" />
              <circle cx="12" cy="12" r="1.5" />
              <circle cx="19" cy="12" r="1.5" />
            </svg>
          </button>
        </div>
      </div>
      <Link to={`/post/${article.id}`} className="shrink-0 no-underline sm:pt-1" tabIndex={-1} aria-hidden>
        <img
          src={article.image}
          alt=""
          className="h-28 w-full rounded-md object-cover grayscale sm:h-24 sm:w-40"
        />
      </Link>
    </article>
  );
}

function ProfileFooter() {
  return (
    <footer className="border-t border-gray-100 p-6 md:p-10 pt-10">
      <div className="flex flex-col justify-between gap-8 text-sm text-gray-500 md:flex-row md:items-end">
        <div>
          <p className="text-base font-semibold tracking-wide text-[#111]">MUSK</p>
          <p className="mt-2 max-w-sm text-xs leading-relaxed text-gray-500">
            Crafting stories and ideas for the modern reader. Discover high-quality articles across inspiring themes.
          </p>
          <p className="mt-4 text-xs text-gray-400">© 2026 MUSK. All rights reserved.</p>
        </div>
        <div className="grid grid-cols-2 gap-10 text-xs">
          <div className="space-y-2">
            <p className="font-semibold uppercase tracking-wider text-gray-700">Company</p>
            <p className="cursor-pointer hover:text-gray-800">About</p>
            <p className="cursor-pointer hover:text-gray-800">Careers</p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold uppercase tracking-wider text-gray-700">Support</p>
            <p className="cursor-pointer hover:text-gray-800">Contact</p>
            <p className="cursor-pointer hover:text-gray-800">Privacy Policy</p>
            <p className="cursor-pointer hover:text-gray-800">Terms of Service</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function ProfilePage() {
  const { authorName } = useParams();
  const navigate = useNavigate();
  const { user: authUser } = useAuth();
  const currentAuthorName = authorName ? decodeURIComponent(authorName) : (authUser?.name || 'Elena Vance');
  const isOwnProfile = authUser?.name === currentAuthorName;
  const { savedIds } = useSavedPosts();

  const [tab, setTab] = useState<ProfileTab>('published');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  // Profile editing state
  const [isEditing, setIsEditing] = useState(false);
  const [profileId, setProfileId] = useState<number | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: currentAuthorName,
    bio: 'Creative Director & Design Philosopher. Exploring the intersection of digital ethics, minimalist aesthetics, and the future of human-computer interaction. Currently archiving thoughts on Lumina.',
    location: 'San Francisco',
    website: currentAuthorName.toLowerCase().replace(/\s+/g, '') + '.design',
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(currentAuthorName)}&background=8b5cf6&color=fff&size=200`,
  });
  const [profileCounts, setProfileCounts] = useState({ stories: 0, followers: 0, following: 0 });
  const [authorArticles, setAuthorArticles] = useState<{ article: BlogArticle; date: string }[]>([]);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState('');

  const [savedArticles, setSavedArticles] = useState<{ article: BlogArticle; date: string }[]>([]);
  const [isSaving, setIsEditingSaving] = useState(false);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        setProfileData((prev) => ({ ...prev, avatar: base64 }));
      } catch (err) {
        console.error('File conversion failed:', err);
      }
    }
  };

  const handleSaveChanges = async () => {
    setIsEditingSaving(true);
    try {
      await updateProfile({
        location: profileData.location,
        avatar: profileData.avatar,
      });
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update profile:', err);
    } finally {
      setIsEditingSaving(false);
    }
  };

  useEffect(() => {
    const loadProfile = async () => {
      setProfileLoading(true);
      setProfileError('');

      try {
        const profile: any = await fetchProfile(currentAuthorName);
        setProfileId(profile.id);
        setIsFollowing(profile.isFollowing);
        setProfileData((prev) => ({
          ...prev,
          name: profile.name || currentAuthorName,
          avatar: profile.avatar || prev.avatar,
        }));
        setProfileCounts({
          stories: profile.stories ?? 0,
          followers: profile.followers ?? 0,
          following: profile.following ?? 0,
        });

        if (Array.isArray(profile.posts)) {
          setAuthorArticles(
            profile.posts.map((post: any) => ({
              article: {
                id: post.id,
                title: post.title || 'Untitled post',
                excerpt: post.content ? String(post.content).slice(0, 120) + '…' : 'No excerpt available.',
                category: Array.isArray(post.tags) && post.tags.length > 0 ? post.tags[0] : 'Technology',
                author: profile.name || currentAuthorName,
                readTime: post.content ? `${Math.max(1, Math.ceil(String(post.content).length / 250))} min read` : '1 min read',
                image: post.coverPhoto || 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
                published: post.published,
              },
              date: post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Jan 1, 2026',
            })),
          );
        }
      } catch (err) {
        setProfileError((err as Error).message || 'Unable to load profile');
        setAuthorArticles([]);
      } finally {
        setProfileLoading(false);
      }
    };

    loadProfile();
  }, [currentAuthorName]);

  const handleDeletePost = async (postId: number) => {
    if (!window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) return;

    try {
      await deletePost(postId);
      // Refresh profile data to remove the post from state
      setAuthorArticles((prev) => prev.filter((a) => a.article.id !== postId));
      setProfileCounts((prev) => ({ ...prev, stories: prev.stories - 1 }));
    } catch (err) {
      console.error('Failed to delete post:', err);
      alert('Failed to delete post. Please try again.');
    }
  };

  const handleFollowToggle = async () => {
    if (!authUser) {
      navigate('/login');
      return;
    }
    if (!profileId) return;

    try {
      if (isFollowing) {
        await unfollowUser(profileId);
        setProfileCounts((prev) => ({ ...prev, followers: prev.followers - 1 }));
      } else {
        await followUser(profileId);
        setProfileCounts((prev) => ({ ...prev, followers: prev.followers + 1 }));
      }
      setIsFollowing(!isFollowing);
    } catch (err) {
      console.error('Follow toggle failed:', err);
    }
  };

  useEffect(() => {
    setSavedArticles(
      articles
        .filter((a) => savedIds.includes(a.id))
        .map((article, i) => ({
          article,
          date: ['Apr 14, 2026', 'Mar 22, 2026', 'Feb 8, 2026', 'Jan 15, 2026'][i % 4] ?? 'Jan 1, 2026',
        })),
    );
  }, [savedIds]);

  const filteredFeed = authorArticles.filter(({ article }) => {
    // 1. Filter by Tab (Published vs Drafts)
    if (tab === 'published' && !article.published) return false;
    if (tab === 'drafts' && article.published) return false;
    if (tab === 'saved') return false; // Handled by savedArticles

    // 2. Filter by Category
    if (!selectedTopic) return true;
    const articleCat = article.category.toLowerCase().replace(/\s+/g, '');
    const selectedCat = selectedTopic.toLowerCase().replace(/\s+/g, '');
    return articleCat === selectedCat;
  });

  const SkeletonRow = () => (
    <div className="flex flex-col gap-5 border-b border-gray-100 py-8 animate-pulse">
      <div className="flex-1">
        <div className="h-3 w-24 bg-gray-200 rounded mb-2"></div>
        <div className="h-6 w-3/4 bg-gray-200 rounded mb-3"></div>
        <div className="h-3 w-full bg-gray-100 rounded mb-1"></div>
        <div className="h-3 w-2/3 bg-gray-100 rounded"></div>
      </div>
      <div className="h-24 w-40 bg-gray-100 rounded-md"></div>
    </div>
  );

  return (
    <PageLayout mainClassName="flex flex-col text-[#1a1a1a]">
      <Navbar />

      <div className="flex border-t border-gray-100">

        <aside className="hidden w-[220px] shrink-0 border-r border-gray-100 bg-[#f9f9f9] px-5 py-8 md:flex md:flex-col lg:w-[260px] lg:px-7">
          <div>
            <p className="font-semibold tracking-tight text-[#111]">Library</p>
            <p className="mt-0.5 text-xs text-gray-500">Curated topics</p>
            <nav className="mt-6 flex flex-col gap-1" aria-label="Topics">
              <button
                type="button"
                onClick={() => setSelectedTopic(null)}
                className={`flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm no-underline transition hover:bg-gray-200/80 hover:text-gray-900 ${
                  selectedTopic === null ? 'bg-gray-200 text-gray-900 font-medium' : 'text-gray-700'
                }`}
              >
                <span className="text-gray-500">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </span>
                All Posts
              </button>
              {topics.map(({ label, icon }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setSelectedTopic(label)}
                  className={`flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm no-underline transition hover:bg-gray-200/80 hover:text-gray-900 ${
                    selectedTopic === label ? 'bg-gray-200 text-gray-900 font-medium' : 'text-gray-700'
                  }`}
                >
                  <span className="text-gray-500">{icon}</span>
                  {label}
                </button>
              ))}
            </nav>
          </div>

        </aside>

        <main className="flex-1 p-6 md:p-10">
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="relative group h-24 w-24 shrink-0 sm:h-28 sm:w-28">
                <img
                  src={profileData.avatar}
                  alt=""
                  className="h-full w-full rounded-xl object-cover"
                />
                {isEditing && (
                  <label className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                      <circle cx="12" cy="13" r="4" />
                    </svg>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                  </label>
                )}
              </div>
              <div className="min-w-0 flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#111] sm:text-4xl">{profileData.name}</h1>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 bg-gray-100 px-2 py-0.5 rounded">Cannot Change</span>
                    </div>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-[15px] outline-none focus:ring-2 focus:ring-violet-500"
                      rows={3}
                      placeholder="Write your bio..."
                    />
                    <div className="flex gap-4">
                      <input
                        type="text"
                        value={profileData.location}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                        placeholder="Location"
                        className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500"
                      />
                      <input
                        type="text"
                        value={profileData.website}
                        onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                        placeholder="Website"
                        className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleSaveChanges}
                        disabled={isSaving}
                        className="rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:opacity-50"
                      >
                        {isSaving ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-wrap items-center gap-3">
                      <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#111] sm:text-4xl">{profileData.name}</h1>
                      {!isOwnProfile && (
                        <button
                          type="button"
                          onClick={handleFollowToggle}
                          className={`rounded-md px-4 py-1.5 text-sm font-semibold transition ${
                            isFollowing 
                              ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                              : 'bg-violet-600 text-white hover:bg-violet-500'
                          }`}
                        >
                          {isFollowing ? 'Following' : 'Follow'}
                        </button>
                      )}
                      {isOwnProfile && (
                        <button
                          type="button"
                          onClick={() => setIsEditing(true)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-600 transition hover:border-gray-400 hover:bg-gray-50"
                          aria-label="Edit Profile"
                        >
                          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                          </svg>
                        </button>
                      )}
                    </div>
                    <p className="mt-4 text-[15px] leading-relaxed text-gray-600">
                      {profileData.bio}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
                      <li className="flex items-center gap-2">
                        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        {profileData.location}
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                        </svg>
                        <a href={`https://${profileData.website}`} className="text-gray-600 underline-offset-2 hover:underline">
                          {profileData.website}
                        </a>
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                          <rect x="3" y="4" width="18" height="18" rx="2" />
                          <path d="M16 2v4M8 2v4M3 10h18" />
                        </svg>
                        Joined March 2022
                      </li>
                    </ul>
                  </>
                )}
              </div>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-gray-100 pt-8 sm:max-w-md">
              <div>
                <p className="text-2xl font-semibold tracking-tight text-[#111] sm:text-3xl">{profileCounts.stories}</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-gray-500">Stories</p>
              </div>
              <div>
                <p className="text-2xl font-semibold tracking-tight text-[#111] sm:text-3xl">{profileCounts.followers}</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-gray-500">Followers</p>
              </div>
              <div>
                <p className="text-2xl font-semibold tracking-tight text-[#111] sm:text-3xl">{profileCounts.following}</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-gray-500">Following</p>
              </div>
            </div>

            <div className="mt-10 border-t border-gray-100 pt-2">
              <div className="flex gap-8 border-b border-gray-200" role="tablist" aria-label="Profile content">
                {(
                  [
                    { id: 'published' as const, label: 'Published' },
                    { id: 'saved' as const, label: 'Saved' },
                    { id: 'drafts' as const, label: 'Drafts' },
                  ] as const
                ).map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={tab === id}
                    onClick={() => setTab(id)}
                    className={`-mb-px border-b-2 pb-3 text-sm font-medium transition ${
                      tab === id
                        ? 'border-indigo-600 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="pt-2" role="tabpanel">
                {profileLoading ? (
                  <div className="space-y-4">
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                  </div>
                ) : tab === 'published' && (
                  <div>
                    {filteredFeed.length > 0 ? (
                      filteredFeed.map(({ article, date }) => (
                        <ProfileStoryRow 
                          key={article.id} 
                          article={article} 
                          date={date} 
                          onDelete={isOwnProfile ? handleDeletePost : undefined}
                        />
                      ))
                    ) : (
                      <p className="py-14 text-center text-sm text-gray-500">No stories found.</p>
                    )}
                  </div>
                )}
                {!profileLoading && tab === 'saved' && (
                  <div>
                    {savedArticles.length > 0 ? (
                      savedArticles.map(({ article, date }) => (
                        <ProfileStoryRow key={article.id} article={article} date={date} />
                      ))
                    ) : (
                      <p className="py-14 text-center text-sm text-gray-500">No saved stories yet.</p>
                    )}
                  </div>
                )}
                {!profileLoading && tab === 'drafts' && (
                  <div>
                    {filteredFeed.length > 0 ? (
                      filteredFeed.map(({ article, date }) => (
                        <ProfileStoryRow 
                          key={article.id} 
                          article={article} 
                          date={date} 
                          onDelete={isOwnProfile ? handleDeletePost : undefined}
                        />
                      ))
                    ) : (
                      <p className="py-14 text-center text-sm text-gray-500">No drafts saved.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      <ProfileFooter />
    </PageLayout>
  );
}

