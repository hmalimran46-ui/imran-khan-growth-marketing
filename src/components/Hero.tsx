import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, MessageCircle, ChevronLeft, ChevronRight, BarChart3, Megaphone, Monitor, Smartphone, Share2, Zap, PenTool, Settings, Loader2 } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { useContent } from '../context/ContentContext';
import { Link } from 'react-router-dom';

interface FloatingIconProps {
  key?: React.Key;
  icon: any;
  delay: number;
  x: string;
  y: string;
  size?: number;
}

const FloatingIcon = ({ icon: Icon, delay, x, y, size = 32 }: FloatingIconProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ 
      opacity: [0, 0.4, 0],
      y: [0, -40, 0],
      rotate: [0, 15, -15, 0]
    }}
    transition={{ 
      duration: 10, 
      delay, 
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className="absolute text-brand-primary pointer-events-none -z-5"
    style={{ left: x, top: y }}
  >
    <Icon size={size} strokeWidth={0.5} />
  </motion.div>
);

export function Hero() {
  const { content, setContactModalOpen } = useContent();

  const mktIcons = [
    { icon: BarChart3, delay: 0, x: '12%', y: '15%', size: 48 },
    { icon: Megaphone, delay: 2, x: '88%', y: '20%', size: 56 },
    { icon: Monitor, delay: 4, x: '8%', y: '75%', size: 52 },
    { icon: Share2, delay: 1, x: '82%', y: '68%', size: 44 },
    { icon: Smartphone, delay: 3, x: '15%', y: '40%', size: 40 },
  ];

  return (
    <section id="home" className="relative min-h-[92vh] flex flex-col items-center justify-center pt-32 pb-16 px-6 overflow-hidden bg-[#000205]">
      {/* Ultra-Premium Aurora & Lighting System */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
         {/* Main Aurora Glows */}
         <motion.div 
           animate={{ 
             scale: [1, 1.3, 1],
             rotate: [0, 10, -5, 0],
             opacity: [0.15, 0.3, 0.15]
           }}
           transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
           className="absolute -top-[30%] -left-[10%] w-[80%] h-[80%] bg-brand-primary/15 rounded-full blur-[200px]"
         />
         <motion.div 
           animate={{ 
             scale: [1.3, 1, 1.3],
             rotate: [0, -10, 10, 0],
             opacity: [0.1, 0.25, 0.1]
           }}
           transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
           className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] bg-blue-600/10 rounded-full blur-[180px]"
         />
         
         {/* Center Focal Spotlight */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,255,156,0.05),transparent_70%)]" />
         
         {/* Moving Light Rays */}
         <motion.div 
           animate={{ 
             opacity: [0, 0.4, 0],
             x: [-500, 500] 
           }}
           transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
           className="absolute top-[40%] left-0 w-[600px] h-px bg-gradient-to-r from-transparent via-brand-primary/40 to-transparent blur-[2px]"
         />
      </div>
      
      {/* Cinematic Texture Layer */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none -z-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      
      {/* Technical Animated Growth Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="premium-technical-grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="0.5"/>
              <circle cx="0" cy="0" r="1.5" fill="rgba(255,255,255,0.5)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#premium-technical-grid)" />
        </svg>
      </div>

      {/* Connectivity Layer (Data Nodes) */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`node-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.4, 0],
              scale: [0.8, 1.2, 0.8],
              x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
              y: [Math.random() * 100 + "%", Math.random() * 100 + "%"]
            }}
            transition={{ 
              duration: 20 + Math.random() * 10, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute w-2 h-2 bg-brand-primary rounded-full blur-[2px] shadow-[0_0_15px_rgba(0,255,156,0.8)]"
          />
        ))}
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]">
          <motion.path
            d="M 10% 20% L 30% 40% L 50% 10% L 70% 30% L 90% 15%"
            fill="none"
            stroke="url(#line-gradient)"
            strokeWidth="1"
            strokeDasharray="10 5"
            animate={{ strokeDashoffset: [0, -100] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#00ff9c" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Subtle Animated Growth Lines */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 opacity-[0.05] -z-10 flex items-end justify-between px-20 gap-4">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: [`${20 + Math.random() * 40}%`, `${60 + Math.random() * 40}%`, `${20 + Math.random() * 40}%`] }}
            transition={{ duration: 3 + Math.random() * 5, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
            className="w-1 bg-gradient-to-t from-brand-primary to-transparent rounded-t-full"
          />
        ))}
      </div>
      
      {/* Floating Icons Background */}
      {mktIcons.map((ic, i) => (
        <FloatingIcon key={i} icon={ic.icon} delay={ic.delay} x={ic.x} y={ic.y} size={ic.size} />
      ))}

      <div className="max-w-6xl w-full text-center relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex justify-center mb-12"
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 backdrop-blur-3xl shadow-[0_0_40px_rgba(0,255,156,0.1)] group">
              <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse shadow-[0_0_10px_rgba(0,255,156,1)]" />
              <span className="text-brand-primary text-[10px] font-black uppercase tracking-[0.5em] group-hover:tracking-[0.6em] transition-all duration-500">
                {content.hero.badge}
              </span>
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-7xl lg:text-[5.5rem] font-black mb-12 leading-[1.05] tracking-tighter text-white max-w-6xl mx-auto font-display drop-shadow-[0_20px_50px_rgba(0,0,0,1)] uppercase italic group whitespace-pre-line"
          >
            {content.hero.headline}
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="relative max-w-3xl mx-auto mb-20"
          >
            <div className="absolute inset-0 bg-brand-primary/5 blur-[100px] -z-10" />
            <div className="glass bg-[#000810]/40 py-10 px-14 rounded-[3rem] border border-white/5 shadow-2xl backdrop-blur-xl">
              <p className="text-gray-400 text-lg md:text-2xl leading-relaxed font-light tracking-wide italic">
                {content.hero.subheadline}
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8"
          >
            <button 
              onClick={() => setContactModalOpen(true)}
              className="btn-primary group flex items-center gap-4 px-14 py-6 rounded-2xl text-[11px] font-black tracking-[0.3em] shadow-[0_20px_50px_rgba(0,255,156,0.25)] hover:shadow-[0_25px_60px_rgba(0,255,156,0.4)] hover:-translate-y-1 transition-all"
            >
              INITIALIZE STRATEGY <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </button>
            <button 
              onClick={() => setContactModalOpen(true)}
              className="btn-secondary flex items-center gap-4 group px-14 py-6 rounded-2xl text-[11px] font-black tracking-[0.3em] hover:-translate-y-1 transition-all"
            >
              <Zap className="w-4 h-4 group-hover:text-brand-primary transition-colors animate-pulse" />
              ANALYZE TRAFFIC
            </button>
          </motion.div>
        </motion.div>
      </div>


      {/* Hero Stats */}
      <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
        {[
          { label: 'Growth rate', val: '+240%' },
          { label: 'Ad ROI', val: '5.2x' },
          { label: 'Happy Clients', val: '150+' },
          { label: 'Success rate', val: '98%' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="text-center"
          >
            <p className="text-3xl md:text-4xl font-black text-white mb-1">{stat.val}</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function CoverBanner() {
  const { content, updateContent, isAdmin, setContactModalOpen } = useContent();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Strategic Asset too large. Please limit to 2MB.");
        return;
      }
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        updateContent({ coverBanner: { ...content.coverBanner, image: reader.result as string } })
          .finally(() => setIsUploading(false));
      };
      reader.onerror = () => {
        console.error("FileReader failed");
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="px-6 py-12 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none -z-10">
         <motion.div 
           animate={{ 
             scale: [1, 1.1, 1],
             opacity: [0.1, 0.2, 0.1]
           }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(0,255,156,0.1),transparent)]"
         />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto rounded-[3rem] overflow-hidden glass border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.6)] relative group min-h-[400px] flex items-center md:items-stretch"
      >
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={content.coverBanner.image} 
            alt="Marketing Technology Ecosystem" 
            className={`w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-105 opacity-30 mix-blend-overlay ${isUploading ? 'blur-md' : ''}`}
            referrerPolicy="no-referrer"
          />
        </div>

        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-20">
             <div className="flex flex-col items-center gap-4">
               <Loader2 className="w-10 h-10 text-brand-primary animate-spin" />
               <p className="text-brand-primary font-black text-[10px] uppercase tracking-widest animate-pulse">Reconfiguring Environment...</p>
             </div>
          </div>
        )}

        {isAdmin && !isUploading && (
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-4 backdrop-blur-md z-20">
             <button 
               onClick={() => fileInputRef.current?.click()}
               className="bg-brand-primary text-black px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:scale-110 shadow-[0_0_40px_rgba(0,255,156,0.5)] transition-all"
             >
               <PenTool className="w-4 h-4" />
               SWAP BANNER
             </button>
             <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
             <Link 
               to="/admin" 
               className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest border border-white/10 transition-all flex items-center gap-2"
             >
               <Settings className="w-3 h-3" /> COMMAND CENTER
             </Link>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#00040a] via-[#00040a]/80 to-transparent" />
        
        <div className="relative z-10 p-10 md:p-24 flex flex-col justify-center max-w-3xl">
           <motion.span 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.2 }}
             className="text-brand-primary font-black tracking-[0.6em] text-[10px] uppercase mb-6 block"
           >
             Surgical Growth Architecture
           </motion.span>
           <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase italic leading-[1] drop-shadow-2xl whitespace-pre-line">
             {content.coverBanner.headline}
           </h2>
           <div className="text-gray-400 text-lg md:text-xl font-light leading-relaxed mb-12 max-w-xl italic border-l-2 border-brand-primary/30 pl-8">
             {content.coverBanner.subheadline}
           </div>
           <button 
             onClick={() => setContactModalOpen(true)}
             className="w-fit bg-brand-primary text-black px-12 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:scale-110 active:scale-95 transition-all shadow-[0_20px_50px_rgba(0,255,156,0.3)]"
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
    { title: "Social Media Growth", img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1200" },
    { title: "Facebook & Instagram Ads", img: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=1200" },
    { title: "SEO Optimization", img: "https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?auto=format&fit=crop&q=80&w=1200" },
    { title: "Lead Generation", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200" },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 px-6 bg-brand-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-brand-primary font-bold uppercase tracking-widest text-xs mb-3 block">Expertise</span>
            <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter">My Marketing Expertise</h2>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
              className="w-12 h-12 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <ChevronLeft />
            </button>
            <button 
              onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
              className="w-12 h-12 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        <div className="relative h-[400px] md:h-[600px] rounded-[2.5rem] overflow-hidden glass">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <img 
                src={slides[current].img} 
                alt={slides[current].title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-12 flex flex-col justify-end">
                <h3 className="text-4xl md:text-7xl font-black text-white max-w-2xl">{slides[current].title}</h3>
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
    "Google Ads (PPC)", "Search Engine Optimization (SEO)", "YouTube SEO & Growth",
    "Content Marketing", "Email Marketing", "Lead Generation", "Sales Funnel Strategy"
  ];
  
  const row2 = [
    "Conversion Optimization", "Branding & Identity Design", "Marketing Automation",
    "Analytics & Performance Tracking", "Audience Targeting", "Retargeting Ads",
    "E-commerce Marketing", "Shopify Marketing", "Influencer Marketing", "Copywriting"
  ];

  const { setContactModalOpen } = useContent();

  return (
    <section className="py-24 bg-white/[0.01] border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <h2 className="text-center text-gray-500 font-bold uppercase tracking-[0.3em] text-xs">My Core Skills</h2>
      </div>
      
      <div className="space-y-8">
        {/* Row 1 */}
        <div className="flex whitespace-nowrap animate-marquee">
          {[...row1, ...row1].map((skill, index) => (
            <div key={index} className="flex items-center mx-8">
              <span className="text-2xl md:text-5xl font-display font-black text-white/10 uppercase hover:text-brand-primary transition-colors cursor-default">
                {skill}
              </span>
              <div className="w-2 h-2 rounded-full bg-brand-primary/20 mx-8" />
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex whitespace-nowrap animate-marquee-reverse">
          {[...row2, ...row2].map((skill, index) => (
            <div key={index} className="flex items-center mx-8">
              <span className="text-2xl md:text-5xl font-display font-black text-white/5 uppercase hover:text-brand-secondary transition-colors cursor-default">
                {skill}
              </span>
              <div className="w-2 h-2 rounded-full bg-brand-secondary/20 mx-8" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 text-center px-6">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           className="glass p-12 rounded-[2.5rem] max-w-4xl mx-auto border-white/10 shadow-2xl"
        >
          <h3 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tighter italic">Want to Scale Fast?</h3>
          <p className="text-gray-400 mb-10 text-lg font-light tracking-wide">Let's build your authority and dominate the market together.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
             <button 
              onClick={() => setContactModalOpen(true)}
              className="btn-primary w-full sm:w-auto px-12 py-5 rounded-2xl font-black text-xs tracking-widest"
             >
              INITIATE CONTACT
             </button>
             <button 
              onClick={() => setContactModalOpen(true)}
              className="btn-secondary w-full sm:w-auto px-12 py-5 rounded-2xl font-black text-xs tracking-widest flex items-center justify-center gap-3"
             >
              <MessageCircle className="w-4 h-4" />
              MESSAGE ME
             </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
