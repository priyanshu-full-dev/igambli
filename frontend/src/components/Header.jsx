import React from 'react';
import Logo from './Logo';

export default function Header() {
  const handleWhatsapp = () => {
    window.open('https://wa.me/917366064847?text=Hello%2C%20I%20want%20to%20know%20more%20about%20iGambli%20Panel', '_blank');
  };

  return (
    <header className="relative z-50 bg-dark-header border-b border-border-muted py-3.5">
      <div className="max-w-[1340px] mx-auto px-4 md:px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center text-inherit no-underline" aria-label="iGambli Panel Home">
          <Logo size="medium" />
        </a>

        <button 
          className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-[#040812] px-5 py-2.5 rounded text-sm md:text-[15px] font-bold tracking-wide shadow-[0_3px_15px_rgba(37,211,102,0.35)] hover:shadow-[0_5px_22px_rgba(37,211,102,0.6)] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
          onClick={handleWhatsapp}
          aria-label="Contact via WhatsApp"
        >
          <svg className="shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.983.538 1.838.82 2.791.82 3.181 0 5.768-2.586 5.768-5.766 0-3.18-2.587-5.766-5.768-5.766zm9.969 5.766c0 5.514-4.486 10-10 10-1.708 0-3.32-.434-4.739-1.196l-5.261 1.378 1.405-5.132c-.87-1.485-1.373-3.21-1.373-5.05 0-5.514 4.486-10 10-10s10 4.486 10 10z"/>
          </svg>
          <span>Whatsapp now</span>
        </button>
      </div>
    </header>
  );
}
