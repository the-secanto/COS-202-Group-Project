import { Route, Routes } from 'react-router-dom';
import './App.css';
import { PostPage } from './components/PostPage.tsx';
import { CreatePage } from './pages/CreatePage.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { FeedPage } from './pages/FeedPage.tsx';
import { ProfilePage } from './pages/ProfilePage.tsx';
import { SettingsPage } from './pages/SettingsPage.tsx';
import { LoginPage } from './pages/LoginPage.tsx';
import { RegisterPage } from './pages/RegisterPage.tsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/feed" element={<FeedPage />} />
      <Route path="/post/:articleId?" element={<PostPage />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/:authorName" element={<ProfilePage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
