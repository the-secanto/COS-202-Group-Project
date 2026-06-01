import { useState } from 'react';
import { Navbar } from '../components/Navbar.tsx';
import { Footer } from '../components/Footer.tsx';
import { PageLayout } from '../components/PageLayout.tsx';
import { createPost } from '../utils/api.ts';

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export function CreatePage() {
  const [visibility, setVisibility] = useState<'Draft' | 'Publish'>('Draft');
  const [selectedCategory, setSelectedCategory] = useState<string>('Lifestyle');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverPhoto, setCoverPhoto] = useState('');

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        setCoverPhoto(base64);
      } catch (err) {
        console.error('File conversion failed:', err);
      }
    }
  };

  const handlePublish = async () => {
    setStatus('');

    if (!title.trim() || !body.trim()) {
      setStatus('Please provide a title and body before publishing.');
      return;
    }

    setIsSubmitting(true);
    try {
      await createPost({
        title: title.trim(),
        content: body.trim(),
        published: visibility === 'Publish',
        tags: selectedCategory ? [selectedCategory] : ['Lifestyle'],
        coverPhoto: coverPhoto,
      });
      setStatus('Your post was created successfully.');
      setTitle('');
      setBody('');
      setCoverPhoto('');
    } catch (error) {
      setStatus((error as Error).message || 'Unable to create post.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelectTag = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value) {
      setSelectedCategory(value);
    }
  };

  const handleRemoveTag = () => {
    setSelectedCategory('');
  };

  return (
    <PageLayout>
      <Navbar />

      <section className="mt-8 grid min-h-[680px] grid-cols-1 border-t border-gray-100 pt-8 md:grid-cols-[1fr_290px]">

        <div className="border-b border-gray-100 pb-8 md:border-b-0 md:border-r md:pr-8">

          <p className="mb-2 text-sm font-semibold italic text-indigo-600">
            Heading
          </p>

          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-8 w-full border-none text-2xl font-medium text-gray-800 outline-none placeholder:text-gray-300"
          />

          <p className="mb-2 text-sm font-semibold italic text-indigo-600">
            Body
          </p>

          <textarea
            placeholder="Start your story..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="h-[480px] w-full resize-none border-none text-sm leading-7 text-gray-700 outline-none placeholder:text-gray-300"
          />
        </div>

        <aside className="pt-8 md:pt-0 md:pl-8">

          <h2 className="mb-5 text-lg font-medium text-gray-700">
            Post <span className='text-indigo-600'>Settings</span>
          </h2>

          <div className="mb-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Cover image
            </p>

            <label className="flex h-28 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-md border border-dashed border-gray-300 bg-gray-50 text-sm text-gray-400 hover:bg-gray-100">
              {coverPhoto ? (
                <img src={coverPhoto} alt="Cover preview" className="h-full w-full object-cover" />
              ) : (
                <>
                  <svg className="mb-2 h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <span>Upload cover</span>
                </>
              )}
              <input 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <div className="mb-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Categories & tags
            </p>

            <select
              onChange={handleSelectTag}
              value={selectedCategory}
              className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-gray-300"
            >
              <option value="" disabled>
                Select a category...
              </option>

              <option value="Technology">Technology</option>
              <option value="Startup">Startup</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Finance">Finance</option>
            </select>

            <div className="mt-3 flex flex-wrap gap-2">
              {selectedCategory && (
                <button
                  type="button"
                  onClick={handleRemoveTag}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 hover:bg-gray-200"
                >
                  {selectedCategory} ×
                </button>
              )}
            </div>
          </div>

          <div className="mb-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Publish date
            </p>

            <input
              type="date"
              value={new Date().toISOString().split('T')[0]}
              readOnly
              className="w-full rounded-md border border-gray-100 bg-gray-50 px-3 py-2 text-sm text-gray-400 outline-none cursor-not-allowed"
            />
          </div>

          <div className="mb-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Visibility
            </p>

            <div className="space-y-2">

              <button
                type="button"
                onClick={() => setVisibility('Draft')}
                className={`w-full rounded-md border transition-all duration-300 ease-in-out px-3 py-2 text-left text-sm hover:cursor-pointer hover:border-indigo-600 ${
                  visibility === 'Draft'
                    ? 'border-indigo-500 bg-indigo-500 text-white'
                    : 'border-gray-200 text-gray-500'
                }`}
              >
                Draft
              </button>

              <button
  type="button"
  onClick={() => setVisibility('Publish')}
  className={`w-full rounded-md border transition-all duration-300 ease-in-out px-3 py-2 text-left text-sm hover:cursor-pointer hover:border-indigo-600 ${
    visibility === 'Publish'
      ? 'border-indigo-500 bg-indigo-500 text-white'
      : 'border-gray-200 text-gray-500'
  }`}
>
                Publish
              </button>

            </div>
          </div>

          <button
            type="button"
            onClick={handlePublish}
            disabled={isSubmitting}
            className="mt-10 w-full rounded-md border border-indigo-600 bg-indigo-600 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:opacity-50"
          >
            {visibility === 'Publish' ? 'Publish Post' : 'Save as Draft'}
          </button>

          {status && <p className="mt-4 text-sm text-gray-700">{status}</p>}

        </aside>
      </section>

      <Footer/>

    </PageLayout>
  );
}