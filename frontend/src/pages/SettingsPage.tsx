import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar.tsx';
import { Footer } from '../components/Footer.tsx';
import { PageLayout } from '../components/PageLayout.tsx';
import { useTheme } from '../context/ThemeContext.tsx';
import { useAuth } from '../context/AuthContext.tsx';

export function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { user, updateProfile, logout } = useAuth();

  return (
    <PageLayout mainClassName="px-0">
      <Navbar />
      <div className="mx-auto max-w-3xl px-6 py-12 md:px-10">
        <h1 className="font-serif text-3xl font-semibold text-foreground md:text-4xl">Settings</h1>
        <p className="mt-2 text-sm text-muted-foreground">Manage your appearance and account preferences.</p>

        <section className="mt-10 rounded-xl border border-border bg-surface p-6">
          <h2 className="font-serif text-xl font-semibold text-foreground">Appearance</h2>
          <p className="mt-1 text-sm text-muted-foreground">Choose how Musk looks to you.</p>

          <div className="mt-5 grid grid-cols-2 gap-3">
            {(['light', 'dark'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setTheme(mode)}
                className={`rounded-xl border px-4 py-4 text-left transition ${
                  theme === mode
                    ? 'border-primary bg-primary-soft'
                    : 'border-border hover:bg-muted'
                }`}
              >
                <p className="text-lg">{mode === 'dark' ? '☾' : '☀'}</p>
                <p className="mt-2 text-sm font-semibold capitalize text-foreground">{mode} mode</p>
                <p className="text-xs text-muted-foreground">
                  {mode === 'dark' ? 'Easier on the eyes at night.' : 'Crisp and bright for daytime reading.'}
                </p>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-border bg-surface p-6">
          <h2 className="font-serif text-xl font-semibold text-foreground">Account</h2>
          {user ? (
            <div className="mt-4 space-y-4">
              <div className="flex items-center gap-3">
                <img src={user.avatar} alt="" className="h-12 w-12 rounded-full bg-muted object-cover" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Display name</label>
                <input
                  value={user.name}
                  onChange={(e) => updateProfile({ name: e.target.value })}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Bio</label>
                <textarea
                  value={user.bio}
                  onChange={(e) => updateProfile({ bio: e.target.value })}
                  rows={4}
                  className="w-full resize-y rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Location</label>
                <input
                  value={user.location ?? ''}
                  onChange={(e) => updateProfile({ location: e.target.value })}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>

              <p className="text-xs text-muted-foreground">Changes save automatically.</p>

              <button
                type="button"
                onClick={logout}
                className="rounded-full border border-border px-5 py-2 text-sm font-semibold text-foreground transition hover:bg-muted"
              >
                Sign out
              </button>
            </div>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              You are not logged in.{' '}
              <Link to="/login" className="text-primary no-underline hover:underline">Log in</Link> or{' '}
              <Link to="/register" className="text-primary no-underline hover:underline">create an account</Link>.
            </p>
          )}
        </section>
      </div>
      <Footer />
    </PageLayout>
  );
}
