import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Chat from './pages/chat';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  </BrowserRouter>
);

