import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { savePost, unsavePost, fetchSavedPosts } from '../utils/api';

export function useSavedPosts() {
  const { user } = useAuth();
  const [savedIds, setSavedIds] = useState<number[]>(() => {
    const saved = localStorage.getItem('savedPosts');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (user) {
      // Fetch saved posts from backend when logged in
      fetchSavedPosts()
        .then((posts) => {
          if (Array.isArray(posts)) {
            setSavedIds(posts.map((p: any) => p.id));
          }
        })
        .catch((err) => console.error('Error fetching saved posts:', err));
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('savedPosts', JSON.stringify(savedIds));
  }, [savedIds]);

  const toggleSave = async (id: number) => {
    if (!user) return;

    const isCurrentlySaved = savedIds.includes(id);
    
    // Optimistic update
    setSavedIds((prev) =>
      isCurrentlySaved ? prev.filter((i) => i !== id) : [...prev, id]
    );

    try {
      if (isCurrentlySaved) {
        await unsavePost(id);
      } else {
        await savePost(id);
      }
    } catch (err) {
      console.error('Error toggling save on server:', err);
      // Revert on error
      setSavedIds((prev) =>
        isCurrentlySaved ? [...prev, id] : prev.filter((i) => i !== id)
      );
    }
  };

  const isSaved = (id: number) => savedIds.includes(id);

  return { savedIds, toggleSave, isSaved };
}
