import { Link } from 'react-router-dom';


export function Navbar() {
  return (
    <header className="mb-10 flex items-center justify-between">
      <Link
        to="/"
        className="text-lg font-semibold tracking-wide text-[#151515] no-underline hover:text-gray-800"
      >
        MUSK
      </Link>

      <div className="flex items-center gap-3">
        <Link
          to="/create"
          className="rounded-md bg-indigo-600 px-4 py-2 text-xs font-semibold text-white no-underline transition hover:bg-indigo-500"
        >
          Write
        </Link>
        <Link
          to="/profile"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-600 no-underline transition hover:bg-gray-300"
          aria-label="Profile"
        >
          U
        </Link>
      </div>
    </header>
  );
}
