import React from 'react';

export default function FloatingWhatsApp() {
  const handleClick = () => {
    window.open('https://wa.me/917366064847?text=Hello%2C%20I%20want%20to%20know%20more%20about%20iGambli%20Panel', '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      {/* Tooltip */}
      <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
        <div className="bg-[#0f1923] text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#2c101c] shadow-lg whitespace-nowrap">
          Chat with us on WhatsApp
        </div>
      </div>

      {/* Ripple Animation Glow */}
      <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none" />

      {/* Floating Button */}
      <button
        onClick={handleClick}
        aria-label="Chat with us on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-[0_4px_20px_rgba(37,211,102,0.5)] hover:shadow-[0_6px_28px_rgba(37,211,102,0.75)] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.983.538 1.838.82 2.791.82 3.181 0 5.768-2.586 5.768-5.766 0-3.18-2.587-5.766-5.768-5.766zm9.969 5.766c0 5.514-4.486 10-10 10-1.708 0-3.32-.434-4.739-1.196l-5.261 1.378 1.405-5.132c-.87-1.485-1.373-3.21-1.373-5.05 0-5.514 4.486-10 10-10s10 4.486 10 10z"/>
        </svg>
      </button>
    </div>
  );
}
