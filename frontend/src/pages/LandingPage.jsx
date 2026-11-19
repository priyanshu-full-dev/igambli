import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import B2CSites from '../components/B2CSites';
import FeatureGrid from '../components/FeatureGrid';
import BenefitsCards from '../components/BenefitsCards';
import SocialLinks from '../components/SocialLinks';
import CtaBanner from '../components/CtaBanner';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import { useWhatsApp } from '../context/WhatsAppContext';

export default function LandingPage() {
  const { getWhatsAppUrl } = useWhatsApp();

  const handleGetStarted = () => {
    const el = document.getElementById('b2c-sites');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleJoin = () => {
    window.open(getWhatsAppUrl('Hello, I want to join iGambli Panel and start my sports gaming brand'), '_blank');
  };

  return (
    <div className="min-h-screen bg-dark-main flex flex-col relative overflow-x-hidden">
      {/* 1. Top Navigation Bar */}
      <Header />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero onGetStarted={handleGetStarted} />

        {/* 3. Available All B2C Sites Section */}
        <B2CSites />

        {/* 4. 6 Feature Cards Grid */}
        <FeatureGrid />

        {/* 5. Benefits & Feature Breakdown Cards (3 Columns) */}
        <BenefitsCards />

        {/* 6. Social Media Links */}
        <SocialLinks />
      </main>

      {/* 7. Bottom CTA Footer Banner */}
      <CtaBanner onJoin={handleJoin} />

      {/* 8. Floating WhatsApp Contact Button */}
      <FloatingWhatsApp />
    </div>
  );
}
