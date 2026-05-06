export function Navbar() {
  return (
    <header className="mb-10 flex items-center justify-between">
      <h1 className="text-lg font-semibold tracking-wide text-[#151515]">MUSK</h1>
      <button
        type="button"
        className="rounded-md bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-500"
      >
        Write
      </button>
    </header>
  );
}
