import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { Login } from './pages/Login';
import { Registration } from './pages/Registration';
import { Messages } from './pages/Messages';
import { Conversation } from './pages/Conversation';
import { ProtectedRoute } from './components/ProtectedRoute';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/" element={<ProtectedRoute><App /></ProtectedRoute>} />
        <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
        <Route path="/conversation/:conversationId" element={<ProtectedRoute><Conversation /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}