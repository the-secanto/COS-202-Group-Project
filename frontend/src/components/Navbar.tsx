import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';
import { useTheme } from '../context/ThemeContext.tsx';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/feed', label: 'Feed' },
  { to: '/profile', label: 'Profile' },
  { to: '/settings', label: 'Settings' },
];

export function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const initials = user
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '';

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-6 border-b border-border bg-surface/80 px-6 py-4 backdrop-blur md:px-10">
      <Link to="/" className="font-serif text-2xl font-semibold tracking-tight text-foreground no-underline">
        Musk
      </Link>

      <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
        {links.map((l) => (
          <NavLink
            key={l.label}
            to={l.to}
            end={l.end}
            className={({ isActive }) =>
              `no-underline transition hover:text-foreground ${isActive ? 'text-foreground' : ''}`
            }
          >
            {l.label}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition hover:bg-muted"
        >
          {theme === 'dark' ? '☀' : '☾'}
        </button>

        {user ? (
          <>
            <Link
              to="/create"
              className="hidden rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-surface no-underline transition hover:opacity-90 sm:inline-block"
            >
              Write a story
            </Link>
            <Link
              to="/profile"
              aria-label="Profile"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground no-underline"
              title={user.name}
            >
              {initials}
            </Link>
            <button
              type="button"
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="hidden rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:text-foreground sm:inline-block"
            >
              Sign out
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground no-underline transition hover:bg-muted"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-surface no-underline transition hover:opacity-90"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
