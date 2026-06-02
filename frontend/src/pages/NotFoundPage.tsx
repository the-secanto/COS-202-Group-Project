import { Link } from 'react-router-dom';
import { PageLayout } from '../components/PageLayout';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function NotFoundPage() {
  return (
    <PageLayout>
      <Navbar />
      <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
        <h1 className="text-9xl font-extrabold text-indigo-100">404</h1>
        <h2 className="mt-4 text-3xl font-semibold text-gray-900">Page not found</h2>
        <p className="mt-4 text-gray-600 max-w-sm">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <Link
          to="/"
          className="mt-8 rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
        >
          Return Home
        </Link>
      </div>
      <Footer />
    </PageLayout>
  );
}
