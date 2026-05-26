import { useState } from 'react';
import { Navbar } from '../components/Navbar.tsx';
import { Footer } from '../components/Footer.tsx';
import { PageLayout } from '../components/PageLayout.tsx';

export function CreatePage() {
  const [visibility, setVisibility] = useState<'Public' | 'Private'>('Public');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState(['Design', 'Minimalism']);

  const handleAddTag = () => {
    const cleanTag = tagInput.trim();
    if (!cleanTag || tags.includes(cleanTag)) return;
    setTags((t) => [...t, cleanTag]);
    setTagInput('');
  };

  return (
    <PageLayout mainClassName="px-0">
      <Navbar />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-10 md:grid-cols-[1fr_300px] md:px-10">
        <div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">New story</p>
          <input
            type="text"
            placeholder="Your story title"
            className="mb-6 w-full border-none bg-transparent font-serif text-4xl font-semibold text-foreground outline-none placeholder:text-subtle"
          />

          <div className="mb-6 flex items-center gap-4 border-y border-border py-3 text-sm text-muted-foreground">
            <button className="font-semibold hover:text-foreground">B</button>
            <button className="italic hover:text-foreground">I</button>
            <button className="hover:text-foreground">H2</button>
            <button className="hover:text-foreground">Link</button>
            <button className="hover:text-foreground">Image</button>
            <button className="hover:text-foreground">Quote</button>
          </div>

          <textarea
            placeholder="Tell your story…"
            className="h-[480px] w-full resize-none border-none bg-transparent font-serif text-lg leading-relaxed text-foreground outline-none placeholder:text-subtle"
          />
        </div>

        <aside className="space-y-6 md:sticky md:top-6 md:self-start">
          <div className="rounded-xl border border-border bg-surface p-5">
            <h2 className="font-serif text-lg font-semibold text-foreground">Post settings</h2>

            <div className="mt-5">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Visibility</p>
              <div className="grid grid-cols-2 gap-2">
                {(['Public', 'Private'] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setVisibility(v)}
                    className={`rounded-full border px-3 py-1.5 text-sm transition ${
                      visibility === v
                        ? 'border-primary bg-primary-soft text-primary'
                        : 'border-border text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Cover image</p>
              <div className="flex h-24 items-center justify-center rounded-lg border border-dashed border-border bg-background text-xs text-muted-foreground">
                Click to upload
              </div>
            </div>

            <div className="mt-5">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Tags</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  placeholder="Add a tag…"
                  className="w-full rounded-full border border-border bg-background px-3 py-1.5 text-sm outline-none focus:border-primary"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="rounded-full border border-border px-3 text-sm text-muted-foreground hover:bg-muted"
                >
                  Add
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setTags((t) => t.filter((x) => x !== tag))}
                    className="rounded-full bg-muted px-3 py-1 text-xs text-foreground hover:bg-border"
                  >
                    {tag} ×
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
              Publish
            </button>
            <button className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted">
              Save draft
            </button>
          </div>
        </aside>
      </div>

      <Footer />
    </PageLayout>
  );
}
