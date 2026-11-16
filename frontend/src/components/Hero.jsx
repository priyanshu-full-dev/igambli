import React from 'react';

export default function Hero({ onGetStarted }) {
  const handleAction = () => {
    if (onGetStarted) {
      onGetStarted();
    } else {
      const el = document.getElementById('b2c-sites');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-dark-main overflow-hidden min-h-[650px] lg:min-h-[740px] xl:min-h-[780px] flex items-stretch" id="home">
      {/* Background Radial Glow */}
      <div className="absolute top-[5%] right-[10%] w-[750px] h-[750px] bg-[radial-gradient(circle,rgba(255,42,75,0.22)_0%,rgba(229,9,20,0.12)_50%,transparent_75%)] blur-[75px] pointer-events-none z-[1]" />

      <div className="max-w-[1340px] w-full mx-auto px-4 md:px-6 pt-6 pb-6 lg:pt-8 lg:pb-0 flex flex-col lg:flex-row justify-between items-center lg:items-center relative z-[2]">
        {/* Left Column Content */}
        <div className="max-w-[580px] w-full pt-1 lg:pt-2 pb-6 lg:pb-8 z-[3] text-center lg:text-left">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#1a080f]/90 border border-[#4a1523] rounded-full text-[#ff4d67] text-[11.5px] font-bold tracking-[1.2px] mb-4 shadow-[0_0_18px_rgba(255,42,75,0.25)]">
            <img src="/games/image.png" alt="" className="w-4 h-4 rounded-full object-cover" />
            <span>POWERFUL • SECURE • PROFITABLE</span>
          </div>

          {/* Main Titles */}
          <div className="flex flex-col mb-4">
            <h1 className="font-heading text-[56px] sm:text-[68px] md:text-[76px] font-black leading-[0.92] tracking-tight">
              <span className="text-white">i</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff2a4b] via-[#ff4d4d] to-[#ff6b35] drop-shadow-[0_0_20px_rgba(255,42,75,0.6)]">
                GAMBLI
              </span>
            </h1>
            <div className="font-heading text-[20px] sm:text-[24px] md:text-[26px] font-black tracking-wide-panel text-white mt-1.5 mb-3">
              PANEL
            </div>
            <h2 className="font-heading text-[24px] sm:text-[28px] md:text-[32px] font-extrabold text-white leading-[1.18] tracking-wide uppercase">
              WHITELABEL WEBSITE &amp; SHARING<br className="hidden sm:inline" /> PANEL
            </h2>
          </div>

          <p className="text-text-light text-[14px] leading-[1.6] max-w-[490px] mx-auto lg:mx-0 mb-6">
            Start your own sports gaming brand with our advanced white label panel and earning sharing system.
          </p>

          {/* 3 Metrics / Highlight Boxes */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6 max-w-[520px] mx-auto lg:mx-0">
            {/* Box 1: 100% Secure */}
            <div className="flex-1 bg-dark-card border border-border-muted hover:border-[#ff2a4b] rounded-lg px-3.5 py-3 flex items-center gap-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:bg-dark-card-hover hover:shadow-[0_0_15px_rgba(255,42,75,0.25)]">
              <div className="shrink-0 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L4 5V11.09C4 16.14 7.41 20.85 12 22C16.59 20.85 20 16.14 20 11.09V5L12 2Z" stroke="#ff2a4b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="11" r="2.5" stroke="#ff2a4b" strokeWidth="1.75"/>
                  <path d="M12 13.5V16" stroke="#ff2a4b" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="text-left">
                <div className="text-[13.5px] font-bold text-white leading-tight whitespace-nowrap">100% Secure</div>
                <div className="text-[11.5px] text-text-muted mt-0.5 leading-tight">Trusted Platform</div>
              </div>
            </div>

            {/* Box 2: Real Time Data */}
            <div className="flex-1 bg-dark-card border border-border-muted hover:border-[#ff2a4b] rounded-lg px-3.5 py-3 flex items-center gap-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:bg-dark-card-hover hover:shadow-[0_0_15px_rgba(255,42,75,0.25)]">
              <div className="shrink-0 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#ff2a4b" strokeWidth="2"/>
                  <path d="M12 6V12L16 14" stroke="#ff2a4b" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M2 12H6" stroke="#ff2a4b" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M18 12H22" stroke="#ff2a4b" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="text-left">
                <div className="text-[13.5px] font-bold text-white leading-tight whitespace-nowrap">Real Time Data</div>
                <div className="text-[11.5px] text-text-muted mt-0.5 leading-tight">Fast &amp; Accurate</div>
              </div>
            </div>

            {/* Box 3: High Profit */}
            <div className="flex-1 bg-dark-card border border-border-muted hover:border-[#ff2a4b] rounded-lg px-3.5 py-3 flex items-center gap-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:bg-dark-card-hover hover:shadow-[0_0_15px_rgba(255,42,75,0.25)]">
              <div className="shrink-0 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 20V10" stroke="#ff2a4b" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M12 20V4" stroke="#ff2a4b" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M6 20V14" stroke="#ff2a4b" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M4 4L20 4M20 4V10M20 4L13 11" stroke="#ff2a4b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="text-left">
                <div className="text-[13.5px] font-bold text-white leading-tight whitespace-nowrap">High Profit</div>
                <div className="text-[11.5px] text-text-muted mt-0.5 leading-tight">Maximize<br className="hidden sm:inline" /> Earnings</div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center lg:justify-start">
            <button 
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#e50914] via-[#ff2a4b] to-[#ff5e3a] hover:from-[#ff1e42] hover:to-[#ff6b35] text-white font-black px-9 py-4 rounded text-base tracking-wide shadow-[0_4px_25px_rgba(255,42,75,0.5)] hover:shadow-[0_6px_35px_rgba(255,42,75,0.7)] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
              onClick={handleAction}
            >
              <span>GET STARTED</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 13h11.86l-5.43 5.43 1.42 1.42L21.14 12l-8.29-7.85-1.42 1.42L16.86 11H5v2z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Right Athlete Banner Image */}
        <div className="relative lg:absolute lg:right-0 lg:bottom-0 h-[480px] sm:h-[600px] lg:h-[98%] max-h-[780px] xl:max-h-[840px] flex items-end justify-center lg:justify-end pointer-events-none z-[2] mt-6 lg:mt-0">
          <img 
            src="/games/79765409731.png" 
            alt="iGambli Brand Ambassador with Smartphone" 
            className="h-full w-auto max-h-[780px] xl:max-h-[840px] object-contain object-bottom select-none drop-shadow-[0_10px_35px_rgba(255,42,75,0.25)]"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
