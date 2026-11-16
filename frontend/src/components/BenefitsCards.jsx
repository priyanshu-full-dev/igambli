import React from 'react';
import { Check } from 'lucide-react';

const BENEFIT_COLUMNS = [
  {
    id: 'whitelabel',
    title: 'WHITELABEL WEBSITE',
    items: [
      'Fully Branded Website',
      'Custom Domain',
      'Responsive Design',
      'SEO Friendly',
      'Admin Panel'
    ]
  },
  {
    id: 'sharing',
    title: 'SHARING & EARNINGS',
    items: [
      'Unlimited Level Sharing',
      'Lifetime Commission',
      'Realtime Reports',
      'Auto Payout',
      'High Conversion'
    ]
  },
  {
    id: 'why-choose-us',
    title: 'WHY CHOOSE US?',
    items: [
      'Advanced Panel',
      '1000+ Users',
      'Best Odds',
      'Easy Management',
      'Regular Updates'
    ]
  }
];

export default function BenefitsCards() {
  return (
    <section className="py-6 bg-dark-main relative z-10">
      <div className="max-w-[1340px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {BENEFIT_COLUMNS.map((col) => (
            <div 
              key={col.id} 
              className="bg-dark-card border border-border-muted hover:border-[#ff2a4b] rounded-xl p-7 md:p-8 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_28px_rgba(255,42,75,0.25)]"
            >
              <h3 className="font-heading text-base md:text-lg font-extrabold tracking-wide text-white mb-5">
                {col.title}
              </h3>
              <ul className="list-none flex flex-col gap-3.5">
                {col.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#e50914] to-[#ff5e3a] flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(255,42,75,0.5)]">
                      <Check size={12} strokeWidth={3.5} color="#ffffff" />
                    </div>
                    <span className="text-sm font-semibold text-text-light">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
