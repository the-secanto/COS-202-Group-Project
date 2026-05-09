import { Footer } from './Footer.tsx';
import { Navbar } from './Navbar.tsx';

export function PostPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f7] py-8 text-[#1f1f1f]">
      <main className="mx-auto w-[92%] max-w-5xl rounded-md bg-white p-6 shadow-sm md:p-10">
        <Navbar />

        <article className="mx-auto max-w-3xl">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-400">
            Technology · 6 min read
          </p>

          <h1 className="text-2xl font-semibold leading-snug text-gray-900 md:text-3xl">
            The Quiet Revolution of Minimal Computing
          </h1>

          <div className="mt-5 flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
              alt="Author avatar"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-medium text-gray-800">Marcus Thorne</p>
              <p className="text-xs text-gray-500">Design Philosopher · Apr 16, 2026</p>
            </div>
          </div>

          <figure className="mt-8">
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80"
              alt="Minimal desk setup"
              className="h-[320px] w-full rounded-sm object-cover"
            />
            <figcaption className="mt-2 text-center text-xs text-gray-400">
              The beauty of a focused environment.
            </figcaption>
          </figure>

          <div className="mt-8 space-y-5 text-[15px] leading-8 text-gray-700">
            <p>
              It was on a rain-soaked afternoon I first powered this machine. No notifications, no
              startup banners, no digital noise. Just one cursor, one text field, and the sound of
              keys striking with intention.
            </p>
            <p>
              Modern software often asks for constant attention, but this discipline asks for
              restraint. The less your tools demand from you, the more your work can demand from
              you.
            </p>
            <p className="border-l-2 border-indigo-500 pl-4 italic text-gray-600">
              Simplicity is not the absence of choice; it is the presence of enough.
            </p>
            <p>
              The architecture of focus is built from small decisions repeated daily. Fewer tabs.
              Clearer files. More complete thoughts.
            </p>
          </div>

          <div className="mt-10 border-y border-gray-100 py-4">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-300 hover:text-gray-900"
              >
                Likes (408)
              </button>
              <button
                type="button"
                className="rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-300 hover:text-gray-900"
              >
                Share
              </button>
            </div>
          </div>

          <section className="mt-10">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-gray-900">Readers Comments (48)</h2>
              <button
                type="button"
                className="rounded-md bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-500"
              >
                Post a comment
              </button>
            </div>

            <div className="space-y-4">
              <article className="rounded-md border border-gray-100 bg-white p-4">
                <div className="flex items-start gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                    alt="Commenter avatar"
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <p className="text-sm font-semibold text-gray-900">Emma J.</p>
                      <span className="text-xs text-gray-400">2 hours ago</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      This perspective helped me rethink my entire setup. Fewer tools really does
                      reduce friction and improve the quality of focused work.
                    </p>
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

              <article className="rounded-md border border-gray-100 bg-white p-4">
                <div className="flex items-start gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                    alt="Commenter avatar"
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <p className="text-sm font-semibold text-gray-900">Julien V.</p>
                      <span className="text-xs text-gray-400">6 hours ago</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      I started a no-notification workday after reading this. The difference in
                      concentration is huge, especially for long-form writing sessions.
                    </p>
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

              <article className="rounded-md border border-gray-100 bg-white p-4">
                <div className="flex items-start gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=120&q=80"
                    alt="Commenter avatar"
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <p className="text-sm font-semibold text-gray-900">Noah K.</p>
                      <span className="text-xs text-gray-400">1 day ago</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      Great read. Minimal computing feels less like a trend and more like a
                      practical design philosophy for modern creators.
                    </p>
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
            </div>
          </section>
        </article>

        <Footer />
      </main>
    </div>
  );
}
