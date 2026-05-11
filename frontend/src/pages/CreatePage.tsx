import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

export function CreatePage() {
  const [visibility, setVisibility] = useState<'Public' | 'Private'>('Public');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState(['Design', 'Minimalism']);

  const handleAddTag = () => {
    const cleanTag = tagInput.trim();
    if (!cleanTag) return;
    if (tags.includes(cleanTag)) return;
    setTags((currentTags) => [...currentTags, cleanTag]);
    setTagInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags((currentTags) => currentTags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] py-4 text-[#1f1f1f]">
      <main className="mx-auto w-[96%] max-w-[1200px] rounded-md bg-white shadow-sm">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-5 py-4"> 
      <Navbar/>
      </header>


        <section className="grid min-h-[680px] grid-cols-1 md:grid-cols-[1fr_290px]">
          <div className="border-b border-gray-100 p-6 md:border-b-0 md:border-r md:border-gray-100 md:p-8">
            <input
              type="text"
              placeholder="Post Title"
              className="mb-6 w-full border-none text-2xl font-medium text-gray-800 outline-none placeholder:text-gray-300"
            />

            <div className="mb-8 flex items-center gap-5 text-gray-500">
              <button type="button" className="text-lg font-semibold">B</button>
              <button type="button" className="text-lg italic">I</button>
              <button type="button" className="text-lg">≡</button>
              <button type="button" className="text-base">🔗</button>
              <button type="button" className="text-base">🖼️</button>
              <button type="button" className="text-base">❞</button>
              <button type="button" className="text-base">↶</button>
              <button type="button" className="text-base">↷</button>
            </div>

            <textarea
              placeholder="Start your story..."
              className="h-[480px] w-full resize-none border-none text-sm leading-7 text-gray-700 outline-none placeholder:text-gray-300"
            />
          </div>

          <aside className="p-6">
            <h2 className="mb-5 text-lg font-medium text-gray-700">Post Settings</h2>

            <div className="mb-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Visibility</p>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setVisibility('Public')}
                  className={`w-full rounded-md border px-3 py-2 text-left text-sm ${
                    visibility === 'Public'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-gray-200 text-gray-500'
                  }`}
                >
                  Public
                </button>
                <button
                  type="button"
                  onClick={() => setVisibility('Private')}
                  className={`w-full rounded-md border px-3 py-2 text-left text-sm ${
                    visibility === 'Private'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-gray-200 text-gray-500'
                  }`}
                >
                  Private
                </button>
              </div>
            </div>

            <div className="mb-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Cover image</p>
              <div className="flex h-28 items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 text-sm text-gray-400">
                Upload cover
              </div>
            </div>

            <div className="mb-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Categories & tags</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(event) => setTagInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      handleAddTag();
                    }
                  }}
                  placeholder="Add a tag..."
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none placeholder:text-gray-400 focus:border-gray-300"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="rounded-md border border-gray-200 px-3 text-sm text-gray-600 hover:bg-gray-50"
                >
                  Add
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 hover:bg-gray-200"
                  >
                    {tag} ×
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Publish date</p>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-500"
              >
                Immediately
                <span>📅</span>
              </button>
            </div>

            <button type="button" className="text-sm font-medium text-red-500 hover:text-red-600">
              Move to Trash
            </button>
          </aside>
        </section>

        <footer className="border-t border-gray-100 px-5 py-8">
          <div className="flex flex-col justify-between gap-6 text-sm text-gray-500 md:flex-row md:items-end">
            <div>
              <h3 className="mb-2 text-2xl font-semibold text-gray-900">MUSK</h3>
              <p className="max-w-sm text-sm leading-6 text-gray-500">
                Crafting premium editorial experiences for the modern reader. We believe in
                high-quality journalism and deep, meaningful narratives.
              </p>
              <p className="mt-5 text-xs text-gray-400">© 2026 MUSK Editorial. All rights reserved.</p>
            </div>

            <div className="grid grid-cols-2 gap-10 text-sm">
              <div className="space-y-2">
                <p className="font-medium text-gray-700">Company</p>
                <p>About</p>
                <p>Careers</p>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-gray-700">Support</p>
                <p>Contact</p>
                <p>Privacy Policy</p>
                <p>Terms of Service</p>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

