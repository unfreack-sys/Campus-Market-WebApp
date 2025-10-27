import React from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import { AppRouter } from './AppRouter';
import { AuthProvider } from './contexts/AuthContext';

const root = createRoot(document.getElementById('root')!);
root.render(
  <AuthProvider>
    <AppRouter />
  </AuthProvider>
);