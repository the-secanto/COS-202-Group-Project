import { Route, Routes } from 'react-router-dom';
import './App.css';
import { PostPage } from './components/PostPage.tsx';
import { CreatePage } from './pages/CreatePage.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { ProfilePage } from './pages/ProfilePage.tsx';
import { LoginPage } from './pages/LoginPage.tsx';
import { SignupPage } from './pages/SignupPage.tsx';
import { ProtectedRoute } from './components/ProtectedRoute.tsx';

function App() {
  return (
    <Routes>
      <Route path="/post/:articleId?" element={<PostPage />} />
      <Route path="/" element={<HomePage />} />
      <Route
        path="/create"
        element={
          <ProtectedRoute>
            <CreatePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/:authorName?"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default App;
