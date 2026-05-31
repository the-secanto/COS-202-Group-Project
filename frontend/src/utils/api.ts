const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5001';

const getToken = () => localStorage.getItem('authToken');

const buildHeaders = (customHeaders: HeadersInit = {}) => {
  const token = getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

const handleResponse = async (response: Response) => {
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = data?.message || data?.error || response.statusText;
    throw new Error(message ?? 'Request failed');
  }

  return data;
};

const request = async (path: string, options: RequestInit = {}) => {
  const response = await fetch(`${BASE_URL}${path}`, {
    credentials: 'include',
    ...options,
    headers: buildHeaders(options.headers ?? {}),
  });
  return handleResponse(response);
};

export const registerUser = (body: { name: string; email: string; password: string }) =>
  request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(body),
  });

export const loginUser = (body: { email: string; password: string }) =>
  request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(body),
  });

export const createPost = (body: {
  title: string;
  content: string;
  published?: boolean;
  tags?: string[];
  coverPhoto?: string;
}) =>
  request('/posts/create', {
    method: 'POST',
    body: JSON.stringify(body),
  });

export const fetchFeed = () => request('/posts/fyp');
export const fetchPostById = (id: string | number) => request(`/posts/${id}`);
export const fetchProfile = (idOrName: string | number) => request(`/profile/${encodeURIComponent(String(idOrName))}`);
export const fetchComments = (postId: string | number) => request(`/comments/${postId}`);
export const submitComment = (body: { postId: number; content: string; parentId?: number }) =>
  request('/comments', {
    method: 'POST',
    body: JSON.stringify(body),
  });

export const likePost = (id: number) => request(`/posts/${id}/like`, { method: 'POST' });
export const unlikePost = (id: number) => request(`/posts/${id}/like`, { method: 'DELETE' });
export const savePost = (id: number) => request(`/posts/${id}/save`, { method: 'POST' });
export const unsavePost = (id: number) => request(`/posts/${id}/save`, { method: 'DELETE' });
export const fetchSavedPosts = () => request('/posts/saved');

export const followUser = (followingId: number) =>
  request('/users/follow', {
    method: 'POST',
    body: JSON.stringify({ followingId }),
  });

export const unfollowUser = (followingId: number) =>
  request('/users/unfollow', {
    method: 'POST',
    body: JSON.stringify({ followingId }),
  });

export const logoutUser = () =>
  request('/auth/logout', {
    method: 'POST',
  });

export const saveAuthToken = (token: string) => {
  localStorage.setItem('authToken', token);
};

export const clearAuthToken = () => {
  localStorage.removeItem('authToken');
};
