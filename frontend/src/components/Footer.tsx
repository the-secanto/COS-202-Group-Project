export function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-100 pt-10">
      <section className="mx-auto mb-10 max-w-4xl rounded-2xl bg-indigo-600 px-6 py-10 text-center text-white md:px-8">
        <p className="mb-1 text-sm text-indigo-100">Never miss a blog!</p>
        <h2 className="mx-auto mb-5 max-w-xl text-lg font-medium">
          Get the latest stories, research, and curated insights delivered to your inbox.
        </h2>
        <div className="mx-auto flex w-full max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full rounded-md border-none bg-white px-4 py-2 text-sm text-gray-700 outline-none"
          />
          <button
            type="button"
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-black"
          >
            Subscribe
          </button>
        </div>
      </section>

      <section className="flex flex-col justify-between gap-6 text-sm text-gray-500 md:flex-row md:items-end">
        <div>
          <h3 className="mb-2 text-base font-semibold text-gray-900">MUSK</h3>
          <p className="max-w-sm text-xs leading-5 text-gray-500">
            Crafting stories and ideas for the modern reader. Discover high-quality articles
            across inspiring themes.
          </p>
          <p className="mt-4 text-xs text-gray-400">© 2026 MUSK. All rights reserved.</p>
        </div>

        <div className="grid grid-cols-2 gap-8 text-xs">
          <div className="space-y-2">
            <p className="font-medium uppercase tracking-wide text-gray-700">Company</p>
            <p>About</p>
            <p>Careers</p>
          </div>
          <div className="space-y-2">
            <p className="font-medium uppercase tracking-wide text-gray-700">Support</p>
            <p>Contact</p>
            <p>Terms of Service</p>
          </div>
        </div>
      </section>
    </footer>
  );
}
