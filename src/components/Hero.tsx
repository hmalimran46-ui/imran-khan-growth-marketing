import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  MessageCircle, 
  ChevronLeft, 
  ChevronRight, 
  BarChart3, 
  Megaphone, 
  Share2, 
  Zap, 
  PenTool, 
  Settings, 
  Loader2, 
  TrendingUp, 
  Target, 
  ShieldCheck, 
  Sparkles,
  Search,
  Award,
  Layers
} from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { useContent } from '../context/ContentContext';
import { Link } from 'react-router-dom';
import { HeroIntelligenceCenter } from './HeroIntelligenceCenter';

interface FloatingMetricProps {
  icon: any;
  label: string;
  value: string;
  badge?: string;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  delay: number;
  glowColor?: 'emerald' | 'electric' | 'gold' | 'forest';
}

function FloatingMetric({ icon: Icon, label, value, badge, position, delay, glowColor = 'emerald' }: FloatingMetricProps) {
  const glowClasses = {
    emerald: 'border-emerald-500/25 shadow-[0_15px_35px_rgba(16,185,129,0.15)] text-emerald-400',
    electric: 'border-[#00F59B]/30 shadow-[0_15px_35px_rgba(0,245,155,0.18)] text-[#00F59B]',
    gold: 'border-amber-500/25 shadow-[0_15px_35px_rgba(245,158,11,0.15)] text-amber-400',
    forest: 'border-emerald-600/25 shadow-[0_15px_35px_rgba(5,150,105,0.15)] text-emerald-300',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ 
        opacity: [0.8, 1, 0.8],
        y: [0, -12, 0]
      }}
      transition={{ 
        duration: 8 + delay * 2, 
        delay, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
      style={position}
      className={`hidden lg:flex absolute items-center gap-3.5 px-5 py-3 rounded-2xl bg-[#04140b]/85 backdrop-blur-xl border ${glowClasses[glowColor]} z-20 pointer-events-none`}
    >
      <div className={`w-9 h-9 rounded-xl bg-white/[0.04] flex items-center justify-center ${glowClasses[glowColor]}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className="text-white font-black text-sm tracking-tight font-display">{value}</span>
          {badge && (
            <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 font-mono font-medium border border-emerald-500/20">
              {badge}
            </span>
          )}
        </div>
        <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">{label}</span>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const { content, setContactModalOpen } = useContent();

  const handleScrollToPortfolio = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('portfolio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-[94vh] flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
      {/* 1. Hero Atmospheric Emerald Spotlight Glow */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] bg-gradient-to-tr from-emerald-600/15 via-[#064e3b]/25 to-teal-800/10 rounded-full blur-[150px]" />
        <div className="absolute top-[20%] right-[15%] w-[400px] h-[300px] bg-amber-500/5 rounded-full blur-[130px]" />
      </div>

      {/* 2. Floating Live Marketing Intelligence Badges (Desktop) */}
      <FloatingMetric 
        icon={TrendingUp} 
        value="+340% ROAS" 
        badge="Meta & Google" 
        label="Performance Ads" 
        position={{ top: '24%', left: '4%' }} 
        delay={0.2} 
        glowColor="electric"
      />
      <FloatingMetric 
        icon={Search} 
        value="Top 1% Rank" 
        badge="Surgical SEO" 
        label="Organic Traffic" 
        position={{ top: '62%', left: '5%' }} 
        delay={1.5} 
        glowColor="emerald"
      />
      <FloatingMetric 
        icon={Target} 
        value="5.4x Multiplier" 
        badge="Revenue Funnel" 
        label="Conversion Scale" 
        position={{ top: '28%', right: '4%' }} 
        delay={0.8} 
        glowColor="gold"
      />
      <FloatingMetric 
        icon={ShieldCheck} 
        value="150+ Brands" 
        badge="Verified Specialist" 
        label="Market Authority" 
        position={{ top: '65%', right: '5%' }} 
        delay={2.1} 
        glowColor="forest"
      />

      {/* 3. Main Hero Content Container */}
      <div className="max-w-6xl w-full text-center relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Executive Status Pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-emerald-500/30 bg-[#04140b]/80 backdrop-blur-2xl shadow-[0_0_30px_rgba(0,245,155,0.15)] group hover:border-[#00F59B]/50 transition-all duration-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F59B] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F59B]"></span>
              </span>
              <span className="text-[#00F59B] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] font-mono">
                {content.hero.badge || 'DATA-DRIVEN DIGITAL GROWTH ARCHITECT'}
              </span>
              <div className="h-3 w-[1px] bg-white/10 hidden sm:block" />
              <span className="text-[10px] text-amber-400/90 font-mono uppercase tracking-widest hidden sm:inline-flex items-center gap-1 font-semibold">
                <Sparkles className="w-3 h-3 text-amber-400" /> ROI FOCUSED
              </span>
            </div>
          </motion.div>
          
          {/* Main Master Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-black mb-8 leading-[1.08] tracking-tight text-white max-w-5xl mx-auto font-display drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)] uppercase whitespace-pre-line"
          >
            {content.hero.headline}
          </motion.h1>
          
          {/* Executive Subheadline Glass Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative max-w-3xl mx-auto mb-12"
          >
            <div className="bg-[#04140b]/75 py-6 px-8 sm:px-12 rounded-[2rem] border border-emerald-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
              <p className="text-slate-200 text-base sm:text-xl md:text-2xl leading-relaxed font-light tracking-wide">
                {content.hero.subheadline}
              </p>
            </div>
          </motion.div>

          {/* High-Converting CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <button 
              onClick={() => setContactModalOpen(true)}
              className="btn-primary w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 rounded-2xl text-xs font-bold tracking-[0.2em] shadow-[0_15px_40px_rgba(0,245,155,0.3)] hover:shadow-[0_20px_50px_rgba(16,185,129,0.5)] transition-all group cursor-pointer"
            >
              <span>START YOUR PROJECT</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
            <a 
              href="#portfolio"
              onClick={handleScrollToPortfolio}
              className="btn-secondary w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 rounded-2xl text-xs font-bold tracking-[0.2em] text-slate-100 hover:text-white cursor-pointer hover:border-emerald-500/50"
            >
              <Zap className="w-4 h-4 text-[#00F59B]" />
              <span>VIEW MY PORTFOLIO</span>
            </a>
          </motion.div>

          {/* Premium Animated Digital Marketing Command Center / Intelligence Visual */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <HeroIntelligenceCenter />
          </motion.div>
        </motion.div>
      </div>

      {/* 4. Strategic Performance Metric Strip */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.95, duration: 0.8 }}
        className="mt-16 sm:mt-20 w-full max-w-5xl px-4"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { label: 'Average ROAS', val: '5.2x', highlight: 'Meta & Google Ads' },
            { label: 'Organic Traffic Scale', val: '+240%', highlight: 'SEO Growth' },
            { label: 'Client Retention', val: '98%', highlight: 'Verified Results' },
            { label: 'Brands Accelerated', val: '150+', highlight: 'Global Portfolios' },
          ].map((stat, i) => (
            <div 
              key={i}
              className="p-5 rounded-2xl bg-[#04140b]/70 backdrop-blur-xl border border-emerald-500/15 hover:border-emerald-500/40 transition-all text-center group shadow-[0_15px_35px_rgba(0,0,0,0.4)]"
            >
              <p className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1 font-display tracking-tight group-hover:text-[#00F59B] transition-colors">
                {stat.val}
              </p>
              <p className="text-[11px] text-slate-300 font-bold uppercase tracking-wider mb-0.5">{stat.label}</p>
              <p className="text-[9px] text-emerald-400 font-mono">{stat.highlight}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export function CoverBanner() {
  const { content, updateContent, isAdmin, setContactModalOpen } = useContent();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const reader = new FileReader();
        reader.onloadend = async () => {
          try {
            const { compressImage } = await import('../lib/imageUtils');
            const compressed = await compressImage(reader.result as string, 4);
            updateContent({ coverBanner: { ...content.coverBanner, image: compressed } })
              .finally(() => setIsUploading(false));
          } catch (err) {
             console.error("Compression failed:", err);
             setIsUploading(false);
          }
        };
        reader.readAsDataURL(file);
      } catch (err) {
        console.error("Upload process failed:", err);
        setIsUploading(false);
      }
    }
  };

  return (
    <section className="px-6 py-12 relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto rounded-[2.5rem] overflow-hidden bg-[#04140b]/80 backdrop-blur-2xl border border-emerald-500/20 shadow-[0_40px_100px_rgba(0,0,0,0.6)] relative group min-h-[420px] flex items-center md:items-stretch"
      >
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={content.coverBanner.image} 
            alt="Marketing Technology Ecosystem" 
            className={`w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-105 opacity-25 mix-blend-luminosity ${isUploading ? 'blur-md' : ''}`}
            referrerPolicy="no-referrer"
          />
        </div>

        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-20">
             <div className="flex flex-col items-center gap-4">
               <Loader2 className="w-10 h-10 text-[#00F59B] animate-spin" />
               <p className="text-[#00F59B] font-bold text-xs uppercase tracking-widest animate-pulse font-mono">Updating Banner Ecosystem...</p>
             </div>
          </div>
        )}

        {isAdmin && !isUploading && (
          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-4 backdrop-blur-md z-20">
             <button 
               onClick={() => fileInputRef.current?.click()}
               className="bg-gradient-to-r from-emerald-500 to-[#00F59B] text-black px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center gap-3 hover:scale-105 shadow-[0_0_40px_rgba(0,245,155,0.4)] transition-all cursor-pointer font-mono"
             >
               <PenTool className="w-4 h-4" />
               SWAP BANNER IMAGE
             </button>
             <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
             <Link 
               to="/admin" 
               className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest border border-white/10 transition-all flex items-center gap-2 font-mono"
             >
               <Settings className="w-3.5 h-3.5" /> COMMAND CENTER
             </Link>
          </div>
        )}
        
        {/* Subtle Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020805] via-[#020805]/90 to-transparent" />
        
        <div className="relative z-10 p-8 sm:p-14 md:p-20 flex flex-col justify-center max-w-3xl">
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.2 }}
             className="inline-flex items-center gap-2 text-[#00F59B] font-mono font-bold tracking-[0.25em] text-[10px] uppercase mb-5"
           >
             <Layers className="w-3.5 h-3.5" />
             <span>SURGICAL GROWTH ARCHITECTURE</span>
           </motion.div>
           <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-6 tracking-tight uppercase leading-[1.05] drop-shadow-2xl whitespace-pre-line font-display">
             {content.coverBanner.headline}
           </h2>
           <div className="text-slate-300 text-base sm:text-lg md:text-xl font-light leading-relaxed mb-10 max-w-xl border-l-2 border-emerald-500/40 pl-6">
             {content.coverBanner.subheadline}
           </div>
           <button 
             onClick={() => setContactModalOpen(true)}
             className="btn-primary w-fit px-10 py-4.5 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] shadow-[0_15px_40px_rgba(0,245,155,0.3)] transition-all cursor-pointer"
           >
             Initiate Growth Protocol
           </button>
        </div>
      </motion.div>
    </section>
  );
}

export function ExpertiseSlider() {
  const slides = [
    { title: "Social Media Growth & Authority", category: "Social Strategy", img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1200" },
    { title: "High-ROAS Facebook & Instagram Ads", category: "Paid Traffic", img: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=1200" },
    { title: "Data-Driven SEO & Search Rankings", category: "Search Optimization", img: "https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?auto=format&fit=crop&q=80&w=1200" },
    { title: "Predictable B2B & E-commerce Lead Funnels", category: "Conversion Systems", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200" },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-[#00F59B] font-mono font-bold uppercase tracking-[0.25em] text-[11px] mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>CORE SPECIALIZATION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black tracking-tight text-white">
              Enterprise Marketing Expertise
            </h2>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
              className="w-12 h-12 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white flex items-center justify-center transition-all cursor-pointer hover:border-emerald-500/40"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
              className="w-12 h-12 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white flex items-center justify-center transition-all cursor-pointer hover:border-emerald-500/40"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative h-[380px] sm:h-[480px] md:h-[580px] rounded-[2.5rem] overflow-hidden bg-[#04140b]/90 border border-emerald-500/20 shadow-[0_30px_90px_rgba(0,0,0,0.6)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0"
            >
              <img 
                src={slides[current].img} 
                alt={slides[current].title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020805] via-[#020805]/50 to-transparent p-8 sm:p-14 flex flex-col justify-end">
                <span className="text-[#00F59B] font-mono text-xs uppercase font-bold tracking-widest mb-3 block">
                  {slides[current].category}
                </span>
                <h3 className="text-2xl sm:text-4xl md:text-5xl font-black text-white max-w-3xl font-display tracking-tight">
                  {slides[current].title}
                </h3>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export function AdvancedSkills() {
  const row1 = [
    "Social Media Marketing", "Facebook Ads Campaign", "Instagram Marketing", 
    "Google Ads (PPC)", "Search Engine Optimization (SEO)", "YouTube Growth & SEO",
    "Content Strategy", "Email Marketing", "Lead Generation", "Sales Funnel Architecture"
  ];
  
  const row2 = [
    "Conversion Rate Optimization (CRO)", "Brand Positioning", "Marketing Automation",
    "Analytics & Tracking Setup", "High-Intent Audience Targeting", "Dynamic Retargeting",
    "E-commerce Growth", "Shopify Marketing", "Performance Copywriting", "Viral Reach Systems"
  ];

  const { setContactModalOpen } = useContent();

  return (
    <section className="py-24 bg-white/[0.01] border-y border-emerald-500/10 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <span className="text-emerald-400 font-mono font-bold uppercase tracking-[0.3em] text-xs">
          COMPREHENSIVE DIGITAL CAPABILITIES
        </span>
      </div>
      
      <div className="space-y-6">
        {/* Row 1 */}
        <div className="flex whitespace-nowrap animate-marquee">
          {[...row1, ...row1].map((skill, index) => (
            <div key={index} className="flex items-center mx-6">
              <span className="text-xl sm:text-3xl md:text-4xl font-display font-black text-white/20 uppercase hover:text-[#00F59B] transition-colors cursor-default">
                {skill}
              </span>
              <div className="w-2 h-2 rounded-full bg-emerald-400/40 mx-6" />
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex whitespace-nowrap animate-marquee-reverse">
          {[...row2, ...row2].map((skill, index) => (
            <div key={index} className="flex items-center mx-6">
              <span className="text-xl sm:text-3xl md:text-4xl font-display font-black text-white/15 uppercase hover:text-emerald-400 transition-colors cursor-default">
                {skill}
              </span>
              <div className="w-2 h-2 rounded-full bg-emerald-500/30 mx-6" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 text-center px-6">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="bg-[#04140b]/80 backdrop-blur-2xl p-10 sm:p-14 rounded-[2.5rem] max-w-4xl mx-auto border border-emerald-500/20 shadow-[0_25px_60px_rgba(0,0,0,0.5)]"
        >
          <h3 className="text-2xl sm:text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight text-white font-display">
            Ready to Scale Your Digital Revenue?
          </h3>
          <p className="text-slate-300 mb-8 text-base sm:text-lg font-light tracking-wide max-w-2xl mx-auto">
            Book a complimentary strategic growth audit and discover untapped traffic and conversion opportunities for your brand.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <button 
              onClick={() => setContactModalOpen(true)}
              className="btn-primary w-full sm:w-auto px-10 py-4.5 rounded-2xl font-bold text-xs tracking-[0.2em] cursor-pointer"
             >
              INITIATE STRATEGY
             </button>
             <button 
              onClick={() => setContactModalOpen(true)}
              className="btn-secondary w-full sm:w-auto px-10 py-4.5 rounded-2xl font-bold text-xs tracking-[0.2em] flex items-center justify-center gap-2.5 cursor-pointer"
             >
              <MessageCircle className="w-4 h-4 text-[#00F59B]" />
              MESSAGE ON WHATSAPP
             </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
