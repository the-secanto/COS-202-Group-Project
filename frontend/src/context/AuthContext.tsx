import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type User = {
  name: string;
  email: string;
  bio: string;
  avatar: string;
  location?: string;
  role?: string;
};

type AuthContextValue = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (patch: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = 'musk:user';

const avatarFor = (seed: string) =>
  `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(seed)}&backgroundColor=e8ecf1`;

function loadUser(): User | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(loadUser);

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  }, [user]);

  const login = async (email: string, _password: string) => {
    const name = email.split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    setUser({
      name,
      email,
      bio: 'Writer on Musk. Tell the world a little about yourself in Settings.',
      avatar: avatarFor(name),
      location: 'Somewhere on Earth',
      role: 'Writer',
    });
  };

  const register = async (name: string, email: string, _password: string) => {
    setUser({
      name,
      email,
      bio: 'New on Musk — update your bio in Settings.',
      avatar: avatarFor(name),
      location: '',
      role: 'Writer',
    });
  };

  const logout = () => setUser(null);

  const updateProfile = (patch: Partial<User>) =>
    setUser((u) => (u ? { ...u, ...patch } : u));

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
