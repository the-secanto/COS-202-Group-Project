import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="mb-10 flex items-center justify-between">
      <Link
        to="/"
        className="text-lg font-semibold tracking-wide text-[#151515] no-underline hover:text-gray-800"
      >
        MUSK
      </Link>

      <div className="flex items-center gap-3">
        {!user ? (
          <Link
            to="/login"
            className="text-xs font-medium text-gray-600 no-underline hover:text-gray-900 transition-colors"
          >
            Sign In
          </Link>
        ) : (
          <button
            onClick={logout}
            className="text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Sign Out
          </button>
        )}
        <Link
          to="/create"
          className="rounded-md bg-indigo-600 px-4 py-2 text-xs font-semibold text-white no-underline transition hover:bg-indigo-500"
        >
          Write
        </Link>
        {user ? (
          <Link
            to={`/profile/${encodeURIComponent(user.name)}`}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-600 no-underline transition hover:bg-gray-300"
            aria-label="Profile"
          >
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="h-full w-full rounded-full object-cover" />
            ) : (
              user.name.charAt(0).toUpperCase()
            )}
          </Link>
        ) : (
          <Link
            to="/login"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-400 no-underline transition hover:bg-gray-200"
            aria-label="Login to view profile"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>
        )}
      </div>
    </header>
  );
}
