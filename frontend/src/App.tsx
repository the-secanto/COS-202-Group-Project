import { Route, Routes } from 'react-router-dom';
import './App.css';
import { PostPage } from './components/PostPage.tsx';
import { CreatePage } from './pages/CreatePage.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { LoginPage } from './pages/LoginPage.tsx';
import { ProfilePage } from './pages/ProfilePage.tsx';
import { SignupPage } from './pages/SignupPage.tsx';
import { OnboardingPage } from './pages/OnboardingPage.tsx';
import { NotFoundPage } from './pages/NotFoundPage.tsx';
import { ProtectedRoute } from './components/ProtectedRoute.tsx';

function App() {
  return (
    <Routes>
      <Route
        path="/onboarding"
        element={
          <ProtectedRoute message="You must log in to complete onboarding.">
            <OnboardingPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/post/:articleId?"
        element={
          <ProtectedRoute message="You must log in in order to view posts.">
            <PostPage />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<HomePage />} />
      <Route
        path="/create"
        element={
          <ProtectedRoute message="You must log in to create a post.">
            <CreatePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/:authorName?"
        element={
          <ProtectedRoute message="You must log in to view profile.">
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
