import Navbar from './components/Navbar';
import { Hero, CoverBanner, ExpertiseSlider, AdvancedSkills } from './components/Hero';
import { About, Services } from './components/Services';
import { Portfolio, Pricing } from './components/Portfolio';
import { Contact, Footer, ContactModal, FloatingWhatsApp } from './components/Contact';
import { AdminPanel } from './components/AdminPanel';
import { ContentProvider } from './context/ContentContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function MainSite() {
  return (
    <div className="min-h-screen relative overflow-x-hidden bg-[#00040a]">
      <Navbar />
      <Hero />
      <CoverBanner />
      <ExpertiseSlider />
      <AdvancedSkills />
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <About />
      <Services />
      <Portfolio />
      <Pricing />
      <Contact />
      <Footer />

      {/* Global Modals & Fixed Elements */}
      <ContactModal />
      <FloatingWhatsApp />
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
