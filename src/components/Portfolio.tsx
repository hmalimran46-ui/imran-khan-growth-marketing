import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Tag, X, Maximize2, Plus } from 'lucide-react';
import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';

export function Portfolio() {
  const { content } = useContent();
  const [filter, setFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [displayCount, setDisplayCount] = useState(6);

  const categories = ['All', 'Ads Design', 'Social Media', 'Branding', 'Banners'];

  const filteredItems = content.portfolio.filter(item => filter === 'All' || item.category === filter);
  const itemsToShow = filteredItems.slice(0, displayCount);

  return (
    <section id="portfolio" className="py-28 px-6 relative">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center mb-16 gap-4">
        <span className="text-[#00F59B] font-mono font-bold uppercase tracking-[0.3em] text-xs block">
          PORTFOLIO & PROVEN CASE STUDIES
        </span>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 tracking-tight uppercase text-white font-display">
          Client Campaigns & <span className="text-gradient">Growth Results</span>
        </h2>
        <p className="text-slate-300 font-light leading-relaxed text-base sm:text-lg max-w-2xl">
          A showcase of high-converting digital campaigns, visual brand identities, and surgical ad creatives engineered to scale modern brands.
        </p>
      </div>

      {/* Categories Filter */}
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-3 mb-16">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => { setFilter(cat); setDisplayCount(6); }}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer font-mono ${filter === cat ? 'bg-gradient-to-r from-emerald-500 to-[#00F59B] text-black shadow-[0_10px_25px_rgba(0,245,155,0.3)]' : 'bg-[#04140b]/80 text-slate-300 border border-emerald-500/15 hover:bg-white/[0.08] hover:border-emerald-500/40'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {itemsToShow.map((item, index) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative rounded-[2rem] overflow-hidden aspect-[4/5] bg-[#04140b]/80 border border-emerald-500/15 shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer hover:border-emerald-500/40 transition-all duration-500"
              onClick={() => setSelectedImage(item.image)}
            >
              <img
                 src={item.image}
                 alt={item.title}
                 className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                 referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020805] via-[#020805]/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-8">
                 <div className="flex items-center gap-2 text-[#00F59B] mb-2">
                   <Tag className="w-3.5 h-3.5" />
                   <span className="text-[10px] font-mono font-bold uppercase tracking-widest">{item.category}</span>
                 </div>
                 <h3 className="text-xl font-bold text-white mb-6 leading-snug font-display">{item.title}</h3>
                 <div className="flex gap-3">
                   <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
                     <Maximize2 className="w-4 h-4" />
                   </div>
                   <button className="flex-1 bg-gradient-to-r from-emerald-500 to-[#00F59B] text-black text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center shadow-lg font-mono">
                     VIEW ASSET
                   </button>
                 </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {displayCount < filteredItems.length && (
        <div className="mt-16 flex justify-center">
           <button 
             onClick={() => setDisplayCount(prev => prev + 3)}
             className="btn-secondary flex items-center gap-3 cursor-pointer"
            >
             <Plus className="w-4 h-4 text-[#00F59B]" />
             <span>LOAD MORE PROJECTS</span>
           </button>
        </div>
      )}

      {/* Lightbox Preview */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6 md:p-12 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-8 right-8 w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors">
              <X className="w-6 h-6" />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage} 
              className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain border border-emerald-500/20"
              onClick={(e) => e.stopPropagation()} 
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export function Pricing() {
  const { content, setContactModalOpen } = useContent();
  const plans = [
    {
      name: "Growth Starter",
      price: content.pricing.basic,
      features: [
        "Growth Marketing Management",
        "2 Social Media Channels",
        "7 High-Impact Creative Posts",
        "Conversion Copywriting & Captions",
        "Targeted Hashtag Matrix",
        "7-Day Optimization Sprint"
      ],
      buttonText: "INITIALIZE BASIC",
      badge: "ESSENTIAL",
      highlight: false
    },
    {
      name: "Scale Accelerator",
      price: content.pricing.standard,
      features: [
        "Dedicated Growth Partner",
        "3 Social Channels Scale",
        "14 Data-Driven Creatives & Reels",
        "Priority Engagement & Retargeting",
        "Paid Meta & Google Ads Setup",
        "14-Day Growth Acceleration"
      ],
      buttonText: "INITIALIZE STANDARD",
      badge: "MOST POPULAR",
      highlight: true
    },
    {
      name: "Enterprise Dominance",
      price: content.pricing.premium,
      features: [
        "Full Executive Strategy Suite",
        "Omni-Channel Brand Presence",
        "30 Premium Multi-Format Assets",
        "Full Funnel & CRO Scaling",
        "Advanced ROAS & Pixel Architecture",
        "30-Day Complete Market Dominance"
      ],
      buttonText: "INITIALIZE ENTERPRISE",
      badge: "MAXIMUM ROI",
      highlight: false
    }
  ];

  return (
    <section id="pricing" className="py-28 px-6 relative">
      <div className="max-w-7xl mx-auto text-center mb-16">
         <span className="text-[#00F59B] font-mono font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
           INVESTMENT TIERS & PACKAGES
         </span>
         <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-6 tracking-tight uppercase text-white font-display">
           Predictable Growth <span className="text-gradient">Packages</span>
         </h2>
         <p className="text-slate-300 max-w-2xl mx-auto font-light leading-relaxed text-base sm:text-lg">
           Strategic service tiers engineered for maximum return on ad spend and sustainable brand authority.
         </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`relative p-8 sm:p-10 rounded-[2.5rem] flex flex-col transition-all duration-500 group backdrop-blur-2xl ${plan.highlight ? 'bg-[#062414]/90 border-2 border-[#00F59B]/50 shadow-[0_30px_80px_rgba(0,245,155,0.2)] md:-translate-y-2' : 'bg-[#04140b]/80 border border-emerald-500/15 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-emerald-500/40'}`}
          >
            {plan.highlight && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-emerald-400 to-[#00F59B] text-black text-[9px] font-mono font-bold uppercase tracking-widest shadow-md">
                {plan.badge}
              </div>
            )}

            <div className="mb-8">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 block mb-2">
                {!plan.highlight && plan.badge}
              </span>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight font-display mb-4">
                {plan.name}
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl sm:text-6xl font-black text-white font-display tracking-tight">
                  ${plan.price}
                </span>
                <span className="text-slate-400 font-mono text-xs uppercase tracking-wider">/ sprint</span>
              </div>
            </div>

            <ul className="space-y-4 mb-10 flex-grow">
               {plan.features.map((feature, i) => (
                 <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                   <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#00F59B] shadow-[0_0_8px_rgba(0,245,155,0.8)] shrink-0" />
                   <span>{feature}</span>
                 </li>
               ))}
            </ul>

            <button 
              onClick={() => setContactModalOpen(true)}
              className={plan.highlight ? 'btn-primary w-full !py-4.5 !text-xs cursor-pointer' : 'btn-secondary w-full !py-4.5 !text-xs hover:border-[#00F59B]/50 cursor-pointer'}
            >
              {plan.buttonText}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
