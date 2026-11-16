import React from 'react';
import { 
  Tv, 
  Share2, 
  Globe2, 
  Headphones, 
  ShieldCheck, 
  TrendingUp 
} from 'lucide-react';

const FEATURES = [
  {
    id: 'white-label',
    icon: Tv,
    title: 'White Label',
    subtitle: 'Get Your Own Brand Website'
  },
  {
    id: 'sharing-system',
    icon: Share2,
    title: 'Sharing System',
    subtitle: 'Invite Users And Earn Lifetime'
  },
  {
    id: 'multi-market',
    icon: Globe2,
    title: 'Multi Market',
    subtitle: 'Multiple Sports And Markets'
  },
  {
    id: 'live-support',
    icon: Headphones,
    title: 'Live Support',
    subtitle: '24/7 Expert Customer Support'
  },
  {
    id: 'secure',
    icon: ShieldCheck,
    title: 'Secure',
    subtitle: 'Advanced Security & Uptime'
  },
  {
    id: 'high-returns',
    icon: TrendingUp,
    title: 'High Returns',
    subtitle: 'Best Odds, More Profit'
  }
];

export default function FeatureGrid() {
  return (
    <section className="py-8 bg-dark-main relative z-10">
      <div className="max-w-[1340px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 md:gap-4">
          {FEATURES.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id} 
                className="bg-dark-card border border-border-muted hover:border-[#ff2a4b] rounded-xl p-5 sm:p-6 flex flex-col items-center text-center transition-all duration-200 hover:-translate-y-1 hover:bg-dark-card-hover hover:shadow-[0_0_20px_rgba(255,42,75,0.25)]"
              >
                <div className="w-[50px] h-[50px] flex items-center justify-center mb-3.5 text-[#ff2a4b] drop-shadow-[0_0_10px_rgba(255,42,75,0.6)]">
                  <Icon size={32} color="#ff2a4b" strokeWidth={1.75} />
                </div>
                <h3 className="font-heading text-sm md:text-[15px] font-bold text-white mb-1.5 leading-tight">
                  {item.title}
                </h3>
                <p className="text-[11px] md:text-[11.5px] text-text-muted leading-snug">
                  {item.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
