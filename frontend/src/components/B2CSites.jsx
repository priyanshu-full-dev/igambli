import React from 'react';
import { useWhatsApp } from '../context/WhatsAppContext';
import B2CLogo from './B2CLogo';

const B2C_SITES = [
  { 
    id: 1, 
    domain: 'sky.igambli.com', 
    url: 'https://sky.igambli.com/',
    logo: '/games/1787130044743-sky-logo.png' 
  },
  { 
    id: 2, 
    domain: 'aura.igambli.com', 
    url: 'https://aura.igambli.com/cricket',
    logo: '/games/1787251724266-1781074698112-kinglogo.png' 
  },
  { 
    id: 3, 
    domain: 'radhe.igambli.com', 
    url: 'https://radhe.igambli.com/',
    logo: '/games/1787650157885-1757834627720-radheexch.png' 
  },
  { 
    id: 4, 
    domain: 'raftaarclub.com', 
    url: 'https://raftaarclub.com/cricket',
    logo: '/games/raf-logo.png' 
  },
  { 
    id: 5, 
    domain: 'rolexcasino.biz', 
    url: 'https://rolexcasino.biz/',
    logo: '/games/1789197559728-Untitled design - 2026-09-12T123601.443 (1).png' 
  },
];

export default function B2CSites() {
  const { getWhatsAppUrl } = useWhatsApp();

  const handleVisit = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleWhatsapp = (domain) => {
    window.open(getWhatsAppUrl(`Hello, I want to get an ID / information for ${domain}`), '_blank');
  };

  return (
    <section className="py-14 bg-dark-main relative z-10" id="b2c-sites">
      <div className="max-w-[1340px] mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-7">
          <h2 className="font-heading text-[24px] font-extrabold text-white tracking-wide inline-block">
            Available All B2C Sites
          </h2>
          <div className="w-[170px] h-[3px] bg-gradient-to-r from-[#e50914] to-[#ff5e3a] mt-1.5 rounded-full shadow-[0_0_12px_rgba(255,42,75,0.6)]" />
        </div>

        {/* Sites List */}
        <div className="flex flex-col gap-3.5">
          {B2C_SITES.map((site) => (
            <div 
              key={site.id} 
              className="bg-dark-card border border-border-muted hover:border-[#ff2a4b] rounded-lg px-6 md:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 transition-all duration-200 hover:bg-dark-card-hover hover:shadow-[0_4px_22px_rgba(255,42,75,0.2)]"
            >
              {/* Left Logo */}
              <div className="flex items-center w-full md:w-[220px] shrink-0 justify-center md:justify-start min-h-[38px]">
                {site.logo ? (
                  <img 
                    src={site.logo} 
                    alt={site.domain} 
                    className="h-8 md:h-9 w-auto max-w-[170px] object-contain"
                  />
                ) : (
                  <B2CLogo />
                )}
              </div>

              {/* Middle Domain */}
              <div className="font-heading text-[14px] md:text-[15px] font-medium text-white tracking-[0.2px] text-center md:text-left flex-1 pl-0 md:pl-4">
                <span>{site.domain}</span>
              </div>

              {/* Right Action Buttons */}
              <div className="flex items-center gap-3.5 w-full md:w-auto justify-center shrink-0">
                <button 
                  className="flex-1 md:flex-initial bg-gradient-to-r from-[#e50914] to-[#ff5e3a] hover:from-[#ff1e42] hover:to-[#ff6b35] text-white px-6 py-2.5 rounded-md text-sm font-semibold tracking-wide shadow-[0_2px_14px_rgba(255,42,75,0.35)] hover:shadow-[0_4px_20px_rgba(255,42,75,0.6)] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer text-center"
                  onClick={() => handleVisit(site.url)}
                  title={`Visit ${site.domain}`}
                >
                  Visit Site
                </button>

                <button 
                  className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 bg-[#00c950] hover:bg-[#00e05a] text-[#040812] font-bold px-5 py-2.5 rounded-md text-sm tracking-wide shadow-[0_2px_12px_rgba(0,201,80,0.3)] hover:shadow-[0_4px_18px_rgba(0,224,90,0.5)] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                  onClick={() => handleWhatsapp(site.domain)}
                  title={`WhatsApp inquiry for ${site.domain}`}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.983.538 1.838.82 2.791.82 3.181 0 5.768-2.586 5.768-5.766 0-3.18-2.587-5.766-5.768-5.766zm9.969 5.766c0 5.514-4.486 10-10 10-1.708 0-3.32-.434-4.739-1.196l-5.261 1.378 1.405-5.132c-.87-1.485-1.373-3.21-1.373-5.05 0-5.514 4.486-10 10-10s10 4.486 10 10z"/>
                  </svg>
                  <span>Whatsapp Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
