import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Theme } from '@consta/uikit/Theme';
import { presetGpnDefault } from '@consta/uikit/Theme/index';
import { MainPage } from './pages/MainPage/MainPage';
import { UserDetailPage } from './pages/UserDetailPage/UserDetailPage';
import { PostDetailPage } from './pages/PostDetailPage/PostDetailPage';

const App: React.FC = () => {
  return (
    <Theme preset={presetGpnDefault}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/users/:id" element={<UserDetailPage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </Theme>
  );
};

export default App;