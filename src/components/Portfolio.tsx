import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Tag, X, Maximize2, Plus } from 'lucide-react';
import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';

export function Portfolio() {
  const [filter, setFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [displayCount, setDisplayCount] = useState(6);

  const categories = ['All', 'Ads Design', 'Social Media', 'Branding', 'Banners'];

  const allItems = [
    { title: "Organic Growth Ecosystem", category: "Social Media", img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800" },
    { title: "High-ROAS Ad Funnel", category: "Ads Design", img: "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=800" },
    { title: "Marketing Data Architecture", category: "Ads Design", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" },
    { title: "Surgical Brand Identity", category: "Branding", img: "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&q=80&w=800" },
    { title: "Viral Content Blueprint", category: "Social Media", img: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=800" },
    { title: "Conversion UI Scaling", category: "Ads Design", img: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&q=80&w=800" },
    { title: "E-commerce Dominance", category: "Branding", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800" },
    { title: "Targeted Audience Mining", category: "Social Media", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" },
    { title: "Elite Display Banner Set", category: "Banners", img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800" }
  ];

  const filteredItems = allItems.filter(item => filter === 'All' || item.category === filter);
  const itemsToShow = filteredItems.slice(0, displayCount);

  return (
    <section id="portfolio" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center mb-16 gap-6">
        <span className="text-brand-primary font-bold uppercase tracking-widest text-sm block">Portfolio</span>
        <h2 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter sm:italic">My Design & <span className="text-gradient font-black">Marketing Work</span></h2>
        <p className="text-gray-400 font-light leading-relaxed text-lg max-w-2xl">
          A scalable showcase of high-converting campaigns and creative designs developed to scale modern brands.
        </p>
      </div>

      {/* Categories Filter */}
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-3 mb-16">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => { setFilter(cat); setDisplayCount(6); }}
            className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 ${filter === cat ? 'bg-brand-primary text-black' : 'glass text-gray-400 hover:bg-white/10'}`}
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
              key={item.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative rounded-3xl overflow-hidden aspect-[4/5] glass border-white/5 cursor-pointer"
              onClick={() => setSelectedImage(item.img)}
            >
              <img
                 src={item.img}
                 alt={item.title}
                 className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                 referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10 translate-y-4 group-hover:translate-y-0">
                 <div className="flex items-center gap-2 text-brand-primary mb-3">
                   <Tag className="w-4 h-4" />
                   <span className="text-[10px] font-black uppercase tracking-widest">{item.category}</span>
                 </div>
                 <h3 className="text-2xl font-black text-white mb-6 leading-tight">{item.title}</h3>
                 <div className="flex gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-black">
                     <Maximize2 className="w-5 h-5" />
                   </div>
                   <button className="flex-1 glass text-white text-xs font-bold rounded-2xl">
                     VIEW PROJECT
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
             className="btn-secondary flex items-center gap-3"
            >
             <Plus className="w-5 h-5" />
             LOAD MORE PROJECTS
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
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 md:p-12 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-8 right-8 w-12 h-12 glass rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors">
              <X />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage} 
              className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain"
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
      name: "Basic",
      price: content.pricing.basic,
      features: [
        "Growth Marketing Manager",
        "2 Social Accounts Setup",
        "7 Custom Growth Posts",
        "High-Engagement Captions",
        "Strategic Hashtag Matrix",
        "Duration: 7 Days Optimization"
      ],
      buttonText: "GET STARTED"
    },
    {
      name: "Standard",
      price: content.pricing.standard,
      features: [
        "Elite Growth Manager",
        "3 Social Accounts Management",
        "14 Data-Driven Posts",
        "Priority Engagement Strategy",
        "Paid Ads Campaign Design",
        "Duration: 14 Days Growth"
      ],
      buttonText: "ORDER NOW"
    },
    {
      name: "Premium",
      price: content.pricing.premium,
      features: [
        "Executive Growth Partner",
        "4 Social Channels Dominance",
        "30 Premium Content Pieces",
        "Full Brand Scaling Suite",
        "Advanced Ads ROI Management",
        "Duration: 30 Days Full Scale"
      ],
      buttonText: "GO PREMIUM"
    }
  ];

  return (
    <section id="pricing" className="py-32 px-6 bg-[#00060d]">
      <div className="max-w-7xl mx-auto text-center mb-16">
         <span className="text-brand-primary font-black uppercase tracking-[0.4em] text-xs mb-6 block">Investment Tiers</span>
         <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase italic text-white">Scale Your <span className="text-gradient">Empire</span></h2>
         <p className="text-gray-400 max-w-2xl mx-auto font-light leading-relaxed text-lg">
           Strategic packages engineered for high-velocity revenue growth and market dominance. 
         </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {plans.map((plan) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-12 rounded-[3.5rem] glass flex flex-col transition-all duration-500 group hover:translate-y-[-12px] border-white/5 bg-white/[0.04] shadow-[0_30px_70px_rgba(0,0,0,0.4)]"
          >
            <div className="mb-10 group-hover:scale-105 transition-transform duration-500">
              <h3 className="text-3xl font-black mb-4 text-white uppercase tracking-tighter italic">{plan.name} Package</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-black text-brand-primary drop-shadow-[0_0_20px_rgba(0,255,156,0.5)]">
                  ${plan.price}
                </span>
                <span className="text-gray-500 font-black tracking-[0.2em] text-[10px] uppercase ml-2 select-none">/ Investment</span>
              </div>
            </div>

            <ul className="space-y-5 mb-12 flex-grow">
               {plan.features.map((feature, i) => (
                 <li key={i} className="flex items-start gap-4 text-[13px] text-gray-300 font-medium group/item leading-tight uppercase tracking-wider">
                   <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-primary shadow-[0_0_12px_rgba(0,255,156,0.8)] group-hover/item:scale-150 transition-transform" />
                   {feature}
                 </li>
               ))}
            </ul>

            <button 
              onClick={() => setContactModalOpen(true)}
              className="w-full py-6 rounded-2xl font-black text-center transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(0,255,156,0.4)] active:scale-95 shadow-2xl bg-brand-primary text-black tracking-[0.3em] text-[10px] uppercase border-none ring-0 outline-none"
            >
              {plan.buttonText}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
