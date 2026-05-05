import { motion, AnimatePresence } from 'motion/react';
import { Target, Users, Search, Youtube, PenTool, CheckCircle2, ChevronDown, Globe, Share2, MessageSquare, Zap, BarChart3, Mail, ShoppingCart, Key, Settings, Loader2 } from 'lucide-react';
import React, { useState, useRef } from 'react';
import { useContent } from '../context/ContentContext';
import { Link } from 'react-router-dom';

export function About() {
  const { content, updateContent, isAdmin } = useContent();
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
        updateContent({ about: { ...content.about, profileImage: reader.result as string } })
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
    <section id="about" className="py-32 px-6 relative bg-gradient-to-b from-[#000810] via-[#010c1a]/95 to-[#00040a]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(112,0,255,0.08),transparent)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
           initial={{ opacity: 0, x: -40 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="relative"
        >
          <div className="aspect-[4/5] rounded-[3rem] overflow-hidden glass border-white/10 group relative shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
             <img
               src={content.about.profileImage}
               alt="Growth Marketing Specialist Identity"
               className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 ${isUploading ? 'opacity-50 blur-sm' : ''}`}
               referrerPolicy="no-referrer"
             />
             
             {isUploading && (
               <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-20">
                  <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 text-brand-primary animate-spin" />
                    <p className="text-brand-primary font-black text-[10px] uppercase tracking-widest animate-pulse">Syncing Asset...</p>
                  </div>
               </div>
             )}
             
             {isAdmin && !isUploading && (
               <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-4 backdrop-blur-md z-10">
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="cursor-pointer bg-brand-primary text-black px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:scale-110 shadow-[0_0_40px_rgba(0,255,156,0.5)] transition-all active:scale-95"
                  >
                    <PenTool className="w-4 h-4" />
                    REPLACE PORTRAIT
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                  />
                  <Link 
                    to="/admin" 
                    className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest border border-white/10 transition-all flex items-center gap-2"
                  >
                    <Settings className="w-3 h-3" /> MANAGE CONTENT
                  </Link>
                  <p className="text-white/40 text-[8px] font-bold uppercase tracking-[0.4em] mt-2">Elite Command Overlay</p>
               </div>
             )}
          </div>
          <div className="absolute -bottom-10 -right-4 glass p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-brand-primary/20 backdrop-blur-3xl group">
            <p className="text-brand-primary font-black text-6xl mb-1 drop-shadow-[0_0_15px_rgba(0,255,156,0.3)] group-hover:scale-110 transition-transform">{content.about.experienceYears}</p>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.25em] leading-relaxed italic">Years of Surgical<br />Digital Growth</p>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, x: 40 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <span className="text-brand-primary font-black uppercase tracking-[0.5em] text-xs mb-8 block drop-shadow-[0_0_10px_rgba(0,255,156,0.3)]">The Specialist Identity</span>
          <h2 className="text-4xl md:text-6xl font-black mb-10 leading-[1.1] tracking-tighter uppercase text-white">
            I am <span className="text-gradient font-black">{content.about.name}</span>, <br />
            <span className="text-gradient font-black">{content.about.role}</span> — <br />
            <span className="text-brand-primary">Grow Your Business</span>
          </h2>
          <div className="space-y-8 text-gray-400 text-lg leading-relaxed whitespace-pre-line">
            <p className="font-light italic">
              {content.about.bio}
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-8">
             {[
               "Expert Growth Strategy",
               "Dynamic Conversion Engine",
               "Targeted Audience Mining",
               "Elite Brand Authority"
             ].map((item, i) => (
               <div key={i} className="flex items-center gap-4 group/item">
                 <div className="w-8 h-8 rounded-xl glass flex items-center justify-center group-hover/item:bg-brand-primary group-hover/item:text-black transition-all">
                   <CheckCircle2 className="w-4 h-4 text-brand-primary group-hover/item:text-black" />
                 </div>
                 <span className="text-white/80 font-black text-[10px] uppercase tracking-[0.2em]">{item}</span>
               </div>
             ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function Services() {
  const { content, setContactModalOpen } = useContent();
  const [activeSkill, setActiveSkill] = useState<number | null>(null);

  const services = [
    {
      title: "Social Media Management",
      desc: "Manage, grow, and optimize your social media presence professionally across all major platforms.",
      icon: Users,
      color: "from-blue-600 to-brand-primary",
      fullDesc: "Complete ecosystem management including scheduling, engagement strategy, and community building on Facebook, Instagram, and LinkedIn."
    },
    {
      title: "Facebook & Instagram Ads",
      desc: "Create and run high-converting ad campaigns to boost sales and brand awareness with precision targeting.",
      icon: Target,
      color: "from-brand-primary to-brand-secondary",
      fullDesc: "Advanced pixel tracking, custom audience synthesis, and A/B testing to ensure maximum ROI for your advertising budget."
    },
    {
      title: "SEO Optimization",
      desc: "Improve your website ranking and visibility on search engines to drive organic traffic and authority.",
      icon: Search,
      color: "from-emerald-500 to-brand-primary",
      fullDesc: "Technical auditing, backlink strategy, and keyword optimization that places your brand on the first page of Google."
    },
    {
      title: "TikTok & Reels Strategy",
      desc: "TikTok and Instagram Reels growth strategy to capture the viral potential of short-form video.",
      icon: Share2,
      color: "from-brand-secondary to-pink-600",
      fullDesc: "Trend identification, creative scripting, and viral hooks designed specifically for the TikTok and Reels algorithms."
    },
    {
      title: "YouTube SEO & Growth",
      desc: "Grow your channel with data-driven strategy, SEO, and content optimization to reach millions.",
      icon: Youtube,
      color: "from-red-600 to-brand-primary",
      fullDesc: "Channel auditing, thumbnail optimization, and metadata strategy that increases watch time and subscriber velocity."
    },
    {
      title: "Email Marketing",
      desc: "Lead generation funnels and email marketing automation to nurture leads into loyal customers.",
      icon: Mail,
      color: "from-brand-primary/80 to-brand-secondary/80",
      fullDesc: "Segmented flows, personalized drip campaigns, and newsletter strategies that maintain high open and click-through rates."
    },
    {
      title: "E-commerce Marketing",
      desc: "Shopify and e-commerce specialized marketing strategies focused on scaling sales and lower CAC.",
      icon: ShoppingCart,
      color: "from-cyan-500 to-blue-600",
      fullDesc: "Cart abandonment recovery, product upsells, and targeted sales events tailored for online retail stores."
    },
    {
      title: "Pinterest & X Strategy",
      desc: "Strategic presence on Pinterest and X (Twitter) for diversified traffic and industry authority.",
      icon: Globe,
      color: "from-brand-primary to-emerald-700",
      fullDesc: "Visual board curation for Pinterest and real-time engagement strategies for X to capture unique audience segments."
    },
    {
      title: "Analytics & Tracking",
      desc: "Advanced performance tracking and analytics reporting to measure every aspect of your growth.",
      icon: BarChart3,
      color: "from-gray-700 to-brand-primary",
      fullDesc: "G4 analytics setup, conversion tracking, and monthly performance reports that provide clear, actionable insights."
    }
  ];

  return (
    <section id="services" className="py-32 px-6 bg-[#00040a] relative">
      <div className="max-w-7xl mx-auto text-center mb-24">
        <span className="text-brand-primary font-black uppercase tracking-[0.5em] text-[10px] mb-6 block drop-shadow-[0_0_10px_rgba(0,255,156,0.3)]">Strategic Arsenal</span>
        <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase italic">Dominance & <span className="text-gradient">Scalability</span></h2>
        <p className="text-gray-400 max-w-2xl mx-auto font-light text-lg italic tracking-wide">
          Engineering high-performance marketing ecosystems designed for absolute market authority.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {content.services.map((service, index) => (
          <motion.div
             key={service.id}
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: index * 0.05 }}
             onClick={() => setActiveSkill(activeSkill === index ? null : index)}
             className={`p-10 rounded-[3rem] glass cursor-pointer group transition-all duration-500 ${activeSkill === index ? 'ring-2 ring-brand-primary/40 bg-white/[0.08] shadow-[0_40px_80px_rgba(0,0,0,0.5)]' : 'hover:bg-white/[0.04] hover:shadow-2xl'}`}
          >
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-secondary p-4 mb-10 shadow-[0_10px_30px_rgba(0,0,0,0.3)] group-hover:scale-110 group-hover:rotate-6 transition-all duration-700`}>
              <Zap className="w-full h-full text-white" />
            </div>
            <h3 className="text-2xl font-black mb-4 group-hover:text-brand-primary transition-colors tracking-tighter italic uppercase">{service.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 font-light">
              {service.description}
            </p>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setContactModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-3 bg-brand-primary text-black py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.03] active:scale-95 transition-all shadow-xl"
              >
                <Zap className="w-3.5 h-3.5 animate-pulse" />
                INITIATE GROWTH
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
