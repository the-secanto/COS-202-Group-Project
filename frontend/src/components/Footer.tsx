export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-10">
        <div className="mb-10 rounded-2xl bg-foreground px-6 py-10 text-center text-surface md:px-10">
          <p className="text-xs uppercase tracking-[0.2em] text-surface/60">The Musk Newsletter</p>
          <h2 className="mx-auto mt-2 max-w-xl font-serif text-2xl font-semibold leading-snug md:text-3xl">
            One thoughtful read, in your inbox every Sunday.
          </h2>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto mt-6 flex w-full max-w-md flex-col gap-2 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-full bg-surface px-4 py-2.5 text-sm text-foreground outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div className="flex flex-col justify-between gap-8 text-sm text-muted-foreground md:flex-row md:items-end">
          <div className="max-w-sm">
            <p className="font-serif text-xl font-semibold text-foreground">Musk</p>
            <p className="mt-2 text-xs leading-6">
              A modern blog platform for thoughtful writing on technology, startups, lifestyle and finance.
            </p>
            <p className="mt-4 text-xs text-subtle">© 2026 Musk. All rights reserved.</p>
          </div>
          <div className="grid grid-cols-3 gap-10 text-xs">
            <div className="space-y-2">
              <p className="font-semibold uppercase tracking-wider text-foreground">Read</p>
              <p>Technology</p>
              <p>Startup</p>
              <p>Lifestyle</p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold uppercase tracking-wider text-foreground">Company</p>
              <p>About</p>
              <p>Careers</p>
              <p>Contact</p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold uppercase tracking-wider text-foreground">Legal</p>
              <p>Privacy</p>
              <p>Terms</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
