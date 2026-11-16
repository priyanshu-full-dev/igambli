import React from 'react';

export default function B2CLogo() {
  return (
    <div className="flex items-center gap-2 select-none">
      {/* KuberBook Sports Exchange Badge & Typography SVG */}
      <svg className="h-9 w-auto" viewBox="0 0 160 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Emblem: Cyan/Blue circle with stylized cricketer / K */}
        <circle cx="19" cy="19" r="17" fill="url(#kb-cyan-grad)" stroke="#00f0ff" strokeWidth="1.5" />
        {/* Cricket ball */}
        <circle cx="9" cy="27" r="3.5" fill="#00f0ff" stroke="#fff" strokeWidth="0.75" />
        <path d="M7 27C8.5 25.5 9.5 28.5 11 27" stroke="#fff" strokeWidth="0.75" />
        
        {/* Stylized K & Cricketer Silhouette */}
        <path d="M12 10L14 12V26H11V10H12Z" fill="#ffffff" />
        <path d="M21 10L14 18L23 26H26L18 18L24 10H21Z" fill="#ffffff" />
        {/* Batsman running figure */}
        <path d="M13 14L18 8L20 9L16 16L18 20L15 22L13 17Z" fill="#00f0ff" />
        <circle cx="19" cy="7" r="1.5" fill="#00f0ff" />

        {/* Brand Text: kuberbook */}
        <text x="44" y="21" fontFamily="'Outfit', 'Montserrat', sans-serif" fontWeight="900" fontStyle="italic" fontSize="19" fill="#ffffff" letterSpacing="0.2">
          kuber<tspan fill="#00f0ff">book</tspan>
        </text>
        
        {/* Subtitle: SPORTS EXCHANGE with bottom line */}
        <text x="44" y="31" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="6.5" fill="#7e90b8" letterSpacing="1.2">
          SPORTS EXCHANGE
        </text>
        <line x1="44" y1="34" x2="135" y2="34" stroke="#00f0ff" strokeWidth="0.75" opacity="0.6" />

        <defs>
          <linearGradient id="kb-cyan-grad" x1="2" y1="2" x2="36" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00f0ff" />
            <stop offset="50%" stopColor="#1a62ff" />
            <stop offset="100%" stopColor="#0b2466" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
