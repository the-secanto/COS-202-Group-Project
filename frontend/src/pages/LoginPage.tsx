import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../AuthLayout';
import { loginUser } from '../utils/api.ts';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const data = await loginUser({ email, password });
      if (data?.token && data?.user) {
        login(data.token, data.user);
        navigate('/');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      setError((err as Error).message || 'Login failed.');
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-2xl font-semibold text-gray-900">Welcome Back</h1>
      <p className="mt-2 text-sm text-gray-500">
        Enter your credentials to access Musk.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        <div className="space-y-2">
          <label htmlFor="email" className="text-xs font-medium tracking-wider text-gray-900">
            EMAIL ADDRESS
          </label>
          <input
            id="email"
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-200 bg-white px-3 h-11 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-xs font-medium tracking-wider text-gray-900">
              PASSWORD
            </label>
          </div>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-gray-200 bg-white px-3 h-11 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            required
          />
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 border border-red-200">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full h-12 rounded-md bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-500 transition-colors shadow-sm"
        >
          Sign In
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-gray-500">
        Don't have an account?{' '}
        <Link to="/signup" className="text-indigo-600 font-semibold hover:underline">
          Sign Up
        </Link>
      </p>
    </AuthLayout>
  );
}
