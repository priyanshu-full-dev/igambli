import React from 'react';
import { useWhatsApp } from '../context/WhatsAppContext';

export default function CtaBanner({ onJoin }) {
  const { getWhatsAppUrl } = useWhatsApp();

  const handleJoin = () => {
    if (onJoin) {
      onJoin();
    } else {
      window.open(getWhatsAppUrl('Hello, I want to join iGambli Panel and start my sports gaming brand'), '_blank');
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#14060b] via-[#240a14] to-[#14060b] border-t border-[#3d1322] py-6 mt-auto relative z-20">
      <div className="max-w-[1340px] mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left">
        <div>
          <h2 className="font-heading text-lg sm:text-xl md:text-[22px] font-black tracking-wide text-white mb-1">
            START YOUR OWN SPORTS GAMING BRAND TODAY!
          </h2>
          <p className="text-xs sm:text-[13.5px] text-text-light">
            Join iGambli Panel And Grow Your Sports Gaming Business.
          </p>
        </div>

        <div>
          <button 
            className="bg-gradient-to-r from-[#e50914] via-[#ff2a4b] to-[#ff5e3a] hover:from-[#ff1e42] hover:to-[#ff6b35] text-white font-black px-7 py-3 rounded text-sm md:text-[14.5px] font-heading tracking-wide whitespace-nowrap shadow-[0_4px_22px_rgba(255,42,75,0.45)] hover:shadow-[0_6px_30px_rgba(255,42,75,0.7)] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            onClick={handleJoin}
          >
            JOIN NOW &amp; EARN MORE
          </button>
        </div>
      </div>
    </div>
  );
}
