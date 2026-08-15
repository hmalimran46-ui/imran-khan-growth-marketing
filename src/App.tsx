import Navbar from './components/Navbar';
import { Hero, CoverBanner, ExpertiseSlider, AdvancedSkills } from './components/Hero';
import { SkillsSection } from './components/SkillsSection';
import { About, Services } from './components/Services';
import { Portfolio, Pricing } from './components/Portfolio';
import { SpecialOffers } from './components/SpecialOffers';
import { Contact, Footer, ContactModal, FloatingWhatsApp } from './components/Contact';
import { OrderTracker } from './components/OrderTracker';
import { AdminPanel } from './components/AdminPanel';
import { TechBackground } from './components/TechBackground';
import { ContentProvider } from './context/ContentContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';

function MainSite() {
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  return (
    <div className="min-h-screen relative overflow-x-hidden bg-[#020805] text-slate-100 selection:bg-[#00F59B] selection:text-black">
      {/* Ultra-Premium Layered Tech Background */}
      <TechBackground />

      <div className="relative z-10">
        <Navbar onOpenTracker={() => setIsTrackerOpen(true)} />
        <Hero />
        <SpecialOffers />
        <CoverBanner />
        <ExpertiseSlider />
        <SkillsSection />
        <AdvancedSkills />
        
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
        </div>

        <About />
        <Services />
        <Portfolio />
        <Pricing />
        <Contact />
        <Footer />
      </div>

      {/* Global Modals & Fixed Elements */}
      <ContactModal />
      <FloatingWhatsApp />
      <OrderTracker isOpen={isTrackerOpen} onClose={() => setIsTrackerOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ContentProvider>
        <Routes>
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/" element={<MainSite />} />
          {/* Support legacy hash login structure if needed */}
          <Route path="/admin-login-secure" element={<AdminPanel />} />
        </Routes>
      </ContentProvider>
    </Router>
  );
}

