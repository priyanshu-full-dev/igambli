import React from 'react';

export default function Logo({ size = 'medium', showText = true }) {
  const isSmall = size === 'small';
  
  return (
    <div className="inline-flex items-center gap-3 select-none">
      <div className="relative flex items-center justify-center shrink-0">
        {/* Radiant Glow Behind Logo */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#ff2a4b] to-[#ff5e3a] blur-[6px] opacity-70" />
        <img 
          src="/games/image.png" 
          alt="iGAMBLI Logo" 
          className={`relative rounded-full object-cover ring-1 ring-[#ff2a4b]/80 shadow-[0_0_12px_rgba(255,42,75,0.4)] ${
            isSmall ? 'w-8 h-8' : 'w-10 h-10 md:w-11 md:h-11'
          }`}
        />
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className={`font-heading font-black tracking-tight leading-none flex items-center ${
            isSmall ? 'text-[20px]' : 'text-[24px] md:text-[26px]'
          }`}>
            <span className="text-white">i</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff2a4b] via-[#ff4d4d] to-[#ff6b35] drop-shadow-[0_0_15px_rgba(255,42,75,0.6)]">
              GAMBLI
            </span>
          </div>
          <div className="flex items-center justify-center w-full mt-[2px] gap-1">
            <div className="flex-1 h-[1.5px] bg-gradient-to-r from-[#e50914] to-[#ff5e3a]" />
            <span className={`font-heading font-black tracking-wide-logo text-white pl-[4px] leading-none ${
              isSmall ? 'text-[8.5px]' : 'text-[10px]'
            }`}>
              PANEL
            </span>
            <div className="flex-1 h-[1.5px] bg-gradient-to-l from-[#e50914] to-[#ff5e3a]" />
          </div>
        </div>
      )}
    </div>
  );
}
