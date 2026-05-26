import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar.tsx';
import { Footer } from '../components/Footer.tsx';
import { PageLayout } from '../components/PageLayout.tsx';
import { ArticleCard } from '../components/ArticleCard.tsx';
import { articles } from '../data/articles.ts';
import { useAuth } from '../context/AuthContext.tsx';

type Tab = 'published' | 'about';

export function ProfilePage() {
  const { authorName } = useParams();
  const { user } = useAuth();
  const [tab, setTab] = useState<Tab>('published');

  const decodedName = authorName ? decodeURIComponent(authorName) : undefined;

  // If a name is in the URL, show that author. Otherwise show the logged-in user (or a default).
  const profile = useMemo(() => {
    if (decodedName) {
      const fromArticles = articles.find((a) => a.author === decodedName);
      return {
        name: decodedName,
        avatar:
          fromArticles?.authorAvatar ??
          `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(decodedName)}&backgroundColor=e8ecf1`,
        bio: `Stories and essays by ${decodedName} on Musk.`,
        location: 'On Musk',
        role: 'Writer',
        isMe: user?.name === decodedName,
      };
    }
    if (user) {
      return {
        name: user.name,
        avatar: user.avatar,
        bio: user.bio,
        location: user.location ?? '',
        role: user.role ?? 'Writer',
        isMe: true,
      };
    }
    // Fallback demo profile
    return {
      name: 'Elena Vance',
      avatar:
        'https://api.dicebear.com/7.x/notionists/svg?seed=Elena%20Vance&backgroundColor=e8ecf1',
      bio: 'Creative Director writing about design, digital ethics and the future of human-computer interaction.',
      location: 'San Francisco',
      role: 'Writer',
      isMe: false,
    };
  }, [decodedName, user]);

  const posts = useMemo(() => {
    if (decodedName) return articles.filter((a) => a.author === decodedName);
    return articles.slice(0, 4);
  }, [decodedName]);

  return (
    <PageLayout mainClassName="px-0">
      <Navbar />

      <section className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-4xl flex-col items-start gap-6 px-6 py-12 sm:flex-row sm:items-center md:px-10">
          <img
            src={profile.avatar}
            alt=""
            className="h-24 w-24 rounded-full bg-muted object-cover sm:h-28 sm:w-28"
          />
          <div className="flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              {profile.role}{profile.location ? ` · ${profile.location}` : ''}
            </p>
            <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-foreground">
              {profile.name}
            </h1>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground">{profile.bio}</p>
            <div className="mt-5 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <span><strong className="text-foreground">{posts.length}</strong> stories</span>
              <span><strong className="text-foreground">12.8k</strong> followers</span>
              <span><strong className="text-foreground">156</strong> following</span>
            </div>
          </div>
          <div className="flex gap-2">
            {profile.isMe ? (
              <Link
                to="/settings"
                className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground no-underline hover:opacity-90"
              >
                Edit profile
              </Link>
            ) : (
              <button className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
                Follow
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-10 md:px-10">
        <div className="mb-8 flex gap-6 border-b border-border" role="tablist">
          {([
            { id: 'published' as const, label: 'Published' },
            { id: 'about' as const, label: 'About' },
          ]).map(({ id, label }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={`-mb-px border-b-2 pb-3 text-sm font-medium transition ${
                tab === id
                  ? 'border-foreground text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === 'published' ? (
          posts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {posts.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <p className="rounded-xl border border-dashed border-border py-14 text-center text-sm text-muted-foreground">
              No stories published yet.
            </p>
          )
        ) : (
          <div className="space-y-4 font-serif text-lg leading-relaxed text-foreground/90">
            <p>{profile.bio}</p>
            {profile.isMe && (
              <p className="text-sm font-sans text-muted-foreground">
                Want to update this? Head to{' '}
                <Link to="/settings" className="text-primary no-underline hover:underline">Settings</Link>.
              </p>
            )}
          </div>
        )}
      </div>

      <Footer />
    </PageLayout>
  );
}
