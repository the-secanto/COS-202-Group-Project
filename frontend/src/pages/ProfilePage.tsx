import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar.tsx';
import { articles } from '../data/articles.ts';
import type { BlogArticle } from '../data/articles.ts';

const topics = [
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

const publishedFeed: { article: BlogArticle; date: string }[] = articles.slice(0, 4).map((article, i) => ({
  article,
  date: ['Apr 14, 2026', 'Mar 22, 2026', 'Feb 8, 2026', 'Jan 15, 2026'][i] ?? 'Jan 1, 2026',
}));

type ProfileTab = 'published' | 'highlights' | 'drafts';

function ProfileStoryRow({ article, date }: { article: BlogArticle; date: string }) {
  return (
    <article className="flex flex-col gap-5 border-b border-gray-100 py-8 last:border-b-0 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
          {article.category} <span className="font-normal text-gray-400">·</span> {article.readTime}
        </p>
        <h2 className="mt-2 font-serif text-xl font-semibold leading-snug tracking-tight text-[#111] sm:text-2xl">
          <Link to="/post" className="text-inherit no-underline hover:text-gray-700">
            {article.title}
          </Link>
        </h2>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-600">{article.excerpt}</p>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-500">
          <time dateTime={date}>{date}</time>
          <button
            type="button"
            className="rounded p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            aria-label="Save story"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>
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
      <Link to="/post" className="shrink-0 no-underline sm:pt-1" tabIndex={-1} aria-hidden>
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
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-4 py-12 text-sm text-gray-500 sm:px-8 md:flex-row md:items-end lg:px-12">
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
  const [tab, setTab] = useState<ProfileTab>('published');

  return (
    <div className="flex min-h-screen flex-col bg-white text-[#1a1a1a]">
      <div className="border-b border-gray-100 px-4 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl pt-6 pb-4">
          <Navbar />
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-1">
        <aside className="hidden w-[220px] shrink-0 border-r border-gray-100 bg-[#f9f9f9] px-5 py-8 md:flex md:flex-col lg:w-[260px] lg:px-7">
          <div>
            <p className="font-semibold tracking-tight text-[#111]">Library</p>
            <p className="mt-0.5 text-xs text-gray-500">Curated topics</p>
            <nav className="mt-6 flex flex-col gap-1" aria-label="Topics">
              {topics.map(({ label, icon }) => (
                <Link
                  key={label}
                  to="/"
                  className="flex items-center gap-3 rounded-md px-2 py-2 text-sm text-gray-700 no-underline transition hover:bg-gray-200/80 hover:text-gray-900"
                >
                  <span className="text-gray-500">{icon}</span>
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="mt-auto pt-10">
            <button
              type="button"
              className="w-full rounded-md bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-500"
            >
              Become a member
            </button>
            <div className="mt-8 flex flex-col gap-1 border-t border-gray-200/80 pt-6">
              <Link
                to="/"
                className="flex items-center gap-3 rounded-md px-2 py-2 text-sm text-gray-600 no-underline transition hover:bg-gray-200/60 hover:text-gray-900"
              >
                <svg className="h-4 w-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
                Settings
              </Link>
              <Link
                to="/"
                className="flex items-center gap-3 rounded-md px-2 py-2 text-sm text-gray-600 no-underline transition hover:bg-gray-200/60 hover:text-gray-900"
              >
                <svg className="h-4 w-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" />
                </svg>
                Help
              </Link>
            </div>
          </div>
        </aside>

        <main className="flex-1 px-4 py-8 sm:px-8 lg:px-12 lg:py-10">
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&q=80"
                alt=""
                className="h-24 w-24 shrink-0 rounded-xl object-cover sm:h-28 sm:w-28"
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#111] sm:text-4xl">Elena Vance</h1>
                  <button
                    type="button"
                    className="rounded-md bg-violet-600 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-violet-500"
                  >
                    Follow
                  </button>
                  <button
                    type="button"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-600 transition hover:border-gray-400 hover:bg-gray-50"
                    aria-label="Message"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-10 6L2 7" />
                    </svg>
                  </button>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-gray-600">
                  Creative Director &amp; Design Philosopher. Exploring the intersection of digital ethics, minimalist
                  aesthetics, and the future of human-computer interaction. Currently archiving thoughts on Lumina.
                </p>
                <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
                  <li className="flex items-center gap-2">
                    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    San Francisco
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                    <a href="https://elenavance.design" className="text-gray-600 underline-offset-2 hover:underline">
                      elenavance.design
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
              </div>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-gray-100 pt-8 sm:max-w-md">
              <div>
                <p className="text-2xl font-semibold tracking-tight text-[#111] sm:text-3xl">42</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-gray-500">Stories</p>
              </div>
              <div>
                <p className="text-2xl font-semibold tracking-tight text-[#111] sm:text-3xl">12.8k</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-gray-500">Followers</p>
              </div>
              <div>
                <p className="text-2xl font-semibold tracking-tight text-[#111] sm:text-3xl">156</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-gray-500">Following</p>
              </div>
            </div>

            <div className="mt-10 border-t border-gray-100 pt-2">
              <div className="flex gap-8 border-b border-gray-200" role="tablist" aria-label="Profile content">
                {(
                  [
                    { id: 'published' as const, label: 'Published' },
                    { id: 'highlights' as const, label: 'Highlights' },
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
                        ? 'border-[#111] text-[#111]'
                        : 'border-transparent text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="pt-2" role="tabpanel">
                {tab === 'published' && (
                  <div>
                    {publishedFeed.map(({ article, date }) => (
                      <ProfileStoryRow key={article.id} article={article} date={date} />
                    ))}
                    <div className="flex justify-center pt-4 pb-2">
                      <Link
                        to="/"
                        className="rounded-md border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 no-underline transition hover:border-gray-400 hover:bg-gray-50"
                      >
                        Show all stories
                      </Link>
                    </div>
                  </div>
                )}
                {tab === 'highlights' && (
                  <p className="py-14 text-center text-sm text-gray-500">No highlighted stories yet.</p>
                )}
                {tab === 'drafts' && (
                  <p className="py-14 text-center text-sm text-gray-500">No drafts saved.</p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      <ProfileFooter />
    </div>
  );
}
