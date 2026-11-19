import React, { createContext, useContext, useState, useEffect } from 'react';

const WhatsAppContext = createContext(null);

export const DEFAULT_WHATSAPP_NUMBER = '7366064847';
export const API_BASE = import.meta.env.VITE_API_URL || '';

export function WhatsAppProvider({ children }) {
  const [whatsappNumber, setWhatsappNumber] = useState(DEFAULT_WHATSAPP_NUMBER);
  const [loading, setLoading] = useState(true);

  const fetchNumber = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/number`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.whatsappNumber) {
          setWhatsappNumber(data.whatsappNumber);
        }
      }
    } catch (err) {
      // Backend not running or network issue - fallback gracefully to default
      console.warn('Could not fetch WhatsApp number from backend, using default.', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNumber();
  }, []);

  const getWhatsAppUrl = (text = '') => {
    const clean = whatsappNumber.replace(/[\s\-\(\)\+]/g, '');
    const prefix = clean.startsWith('91') ? clean : `91${clean}`;
    if (!text) {
      return `https://wa.me/${prefix}`;
    }
    return `https://wa.me/${prefix}?text=${encodeURIComponent(text)}`;
  };

  return (
    <WhatsAppContext.Provider
      value={{
        whatsappNumber,
        setWhatsappNumber,
        refreshNumber: fetchNumber,
        getWhatsAppUrl,
        loading,
      }}
    >
      {children}
    </WhatsAppContext.Provider>
  );
}

export function useWhatsApp() {
  const context = useContext(WhatsAppContext);
  if (!context) {
    // Return safe fallback if used outside provider
    return {
      whatsappNumber: DEFAULT_WHATSAPP_NUMBER,
      getWhatsAppUrl: (text = '') => {
        const clean = DEFAULT_WHATSAPP_NUMBER.replace(/[\s\-\(\)\+]/g, '');
        const prefix = clean.startsWith('91') ? clean : `91${clean}`;
        return text ? `https://wa.me/${prefix}?text=${encodeURIComponent(text)}` : `https://wa.me/${prefix}`;
      },
      refreshNumber: () => {},
      loading: false,
    };
  }
  return context;
}
