import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar.tsx';

export function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#f5f5f7] py-8 text-[#1f1f1f]">
      <main className="mx-auto w-[92%] max-w-6xl rounded-md bg-white p-6 shadow-sm md:p-10">
        <Navbar />
        <section className="py-16 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 text-2xl text-gray-500">
            ?
          </div>
          <h1 className="mb-2 text-2xl font-semibold text-gray-900">Your profile</h1>
          <p className="mb-8 text-sm text-gray-500">
            Add avatar, bio, and saved posts here when you wire the backend.
          </p>
          <Link
            to="/"
            className="text-sm font-medium text-indigo-600 underline-offset-4 hover:underline"
          >
            Back to home
          </Link>
        </section>
      </main>
    </div>
  );
}
