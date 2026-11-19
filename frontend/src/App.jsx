import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { WhatsAppProvider } from './context/WhatsAppContext';
import LandingPage from './pages/LandingPage';
import NumberAdmin from './pages/NumberAdmin';

export default function App() {
  return (
    <WhatsAppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/number" element={<NumberAdmin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </WhatsAppProvider>
  );
}
