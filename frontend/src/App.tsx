import { Route, Routes } from 'react-router-dom';
import './App.css';
import { CreatePage } from './pages/CreatePage.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { ProfilePage } from './pages/ProfilePage.tsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}

export default App;
