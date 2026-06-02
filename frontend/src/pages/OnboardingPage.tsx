import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { updateProfile } from '../utils/api.ts';
import { PageLayout } from '../components/PageLayout';
import { Navbar } from '../components/Navbar';

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export function OnboardingPage() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        setAvatar(base64);
      } catch (err) {
        console.error('File conversion failed:', err);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!bio.trim()) {
      setError('Please share a little bit about yourself in your bio.');
      return;
    }
    if (!location.trim()) {
      setError('Please provide your location.');
      return;
    }

    setIsSubmitting(true);
    try {
      await updateProfile({
        bio: bio.trim(),
        location: location.trim(),
        website: website.trim() || undefined,
        avatar: avatar || undefined,
      });

      // Update global user state to mark profile as complete
      updateUser({ profileCompleted: true });

      // Redirect to home after completion
      navigate('/');
    } catch (err) {
      setError((err as Error).message || 'Failed to update profile.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      {/* Empty Navbar without links during onboarding to prevent skipping */}
      <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl h-16 items-center px-6">
          <span className="text-xl font-bold tracking-tight text-gray-900">MUSK</span>
        </div>
      </nav>

      <div className="mx-auto max-w-xl px-6 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-serif font-bold text-gray-900">Welcome to Musk, {user?.name}!</h1>
          <p className="mt-3 text-gray-600">Complete your profile to start sharing your stories.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-8 bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-4">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Profile Picture (Optional)</p>
            <label className="relative group cursor-pointer">
              <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-dashed border-gray-300 bg-gray-50 transition hover:bg-gray-100">
                {avatar ? (
                  <img src={avatar} alt="Preview" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-gray-400">
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                )}
              </div>
              <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
            </label>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Bio</label>
              <textarea
                required
                placeholder="Tell us about yourself..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all h-32 resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Location</label>
              <input
                required
                type="text"
                placeholder="e.g. San Francisco, CA"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Website</label>
                <span className="text-[10px] font-semibold text-gray-400 uppercase">Optional</span>
              </div>
              <input
                type="url"
                placeholder="https://yourwebsite.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 border border-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-500 transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving Details...' : 'Complete Profile'}
          </button>
        </form>
      </div>
    </PageLayout>
  );
}
