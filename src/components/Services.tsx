import { motion, AnimatePresence } from 'motion/react';
import { Target, Users, Search, Youtube, PenTool, CheckCircle2, ChevronDown, Globe, Share2, MessageSquare, Zap, BarChart3, Mail, ShoppingCart, Key, Settings, Loader2, Upload } from 'lucide-react';
import React, { useState, useRef } from 'react';
import { useContent } from '../context/ContentContext';
import { Link } from 'react-router-dom';

export function About() {
  const { content, updateContent, isAdmin } = useContent();
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
            const compressed = await compressImage(reader.result as string, 3);
            updateContent({ about: { ...content.about, profileImage: compressed } })
              .finally(() => setIsUploading(false));
          } catch (err) {
            console.error("Compression failed:", err);
            setIsUploading(false);
          }
        };
        reader.readAsDataURL(file);
      } catch (err) {
        console.error("Upload failed:", err);
        setIsUploading(false);
      }
    }
  };

  return (
    <section id="about" className="py-28 px-6 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="relative"
        >
          <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-[#04140b]/80 backdrop-blur-2xl border border-emerald-500/20 group relative shadow-[0_40px_100px_rgba(0,0,0,0.7)]">
             <img
               src={content.about.profileImage}
               alt="Growth Marketing Specialist Identity"
               className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 ${isUploading ? 'opacity-50 blur-sm' : ''}`}
               referrerPolicy="no-referrer"
             />
             
             {isUploading && (
               <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-20">
                  <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 text-[#00F59B] animate-spin" />
                    <p className="text-[#00F59B] font-mono font-bold text-xs uppercase tracking-widest animate-pulse">Syncing Asset...</p>
                  </div>
               </div>
             )}
             
             {isAdmin && !isUploading && (
               <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-4 backdrop-blur-md z-10">
                  <div className="bg-[#04140b]/90 p-8 rounded-[2rem] border border-emerald-500/30 flex flex-col items-center gap-4 scale-90 group-hover:scale-100 transition-transform shadow-2xl">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-[#00F59B] rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(0,245,155,0.3)]">
                      <Upload className="text-black w-6 h-6" />
                    </div>
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="cursor-pointer bg-gradient-to-r from-emerald-500 to-[#00F59B] text-black px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center gap-3 hover:scale-105 shadow-[0_0_40px_rgba(0,245,155,0.4)] transition-all active:scale-95 font-mono"
                    >
                      UPLOAD YOUR PHOTO
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
                      className="text-slate-300 hover:text-[#00F59B] font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 transition-colors mt-2 font-mono"
                    >
                      <Settings className="w-3 h-3" /> COMMAND CENTER
                    </Link>
                  </div>
                  <p className="text-slate-400 text-[9px] font-mono uppercase tracking-[0.3em] mt-2">Secure Asset Replacement Mode</p>
               </div>
             )}
          </div>
          <div className="absolute -bottom-8 -right-3 bg-[#04140b]/95 p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-emerald-500/25 backdrop-blur-2xl group">
            <p className="text-[#00F59B] font-black text-5xl mb-1 font-display group-hover:scale-105 transition-transform">{content.about.experienceYears}</p>
            <p className="text-slate-300 text-[10px] font-bold uppercase tracking-[0.2em] leading-relaxed font-mono">Years of Surgical<br />Digital Growth</p>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, x: 30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <span className="text-[#00F59B] font-mono font-bold uppercase tracking-[0.3em] text-xs mb-6 block">
            ABOUT THE GROWTH STRATEGIST
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-8 leading-[1.08] tracking-tight uppercase text-white font-display">
            I am <span className="text-gradient font-black">{content.about.name}</span>, <br />
            <span className="text-white">{content.about.role}</span>
          </h2>
          <div className="space-y-6 text-slate-300 text-base sm:text-lg leading-relaxed whitespace-pre-line font-light">
            <p>
              {content.about.bio}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
             {[
               "Data-Driven Growth Strategy",
               "High-Converting Sales Architecture",
               "Targeted Audience Mining",
               "Enterprise Brand Authority"
             ].map((item, i) => (
               <div key={i} className="flex items-center gap-3.5 group/item">
                 <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover/item:border-emerald-400/50 transition-all">
                   <CheckCircle2 className="w-4 h-4 text-[#00F59B]" />
                 </div>
                 <span className="text-slate-200 font-bold text-xs uppercase tracking-wider">{item}</span>
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

  return (
    <section id="services" className="py-28 px-6 relative">
      <div className="max-w-7xl mx-auto text-center mb-20">
        <span className="text-[#00F59B] font-mono font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
          SPECIALIZED SERVICES
        </span>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-6 tracking-tight uppercase text-white font-display">
          Strategic Growth & <span className="text-gradient">Scalability</span>
        </h2>
        <p className="text-slate-300 max-w-2xl mx-auto font-light text-base sm:text-lg leading-relaxed">
          Engineering high-performance marketing ecosystems tailored for scalable revenue and brand authority.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {content.services.map((service, index) => (
          <motion.div
             key={service.id}
             initial={{ opacity: 0, y: 25 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: index * 0.05 }}
             onClick={() => setActiveSkill(activeSkill === index ? null : index)}
             className={`p-8 sm:p-10 rounded-[2.5rem] bg-[#04140b]/75 backdrop-blur-xl border cursor-pointer group transition-all duration-300 ${activeSkill === index ? 'border-[#00F59B]/60 shadow-[0_25px_60px_rgba(0,245,155,0.15)] bg-[#071f11]' : 'border-emerald-500/15 hover:border-emerald-500/40 hover:shadow-2xl'}`}
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-[#00F59B] p-3.5 mb-8 shadow-[0_10px_25px_rgba(0,245,155,0.3)] group-hover:scale-105 transition-transform flex items-center justify-center">
              <Zap className="w-full h-full text-black" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black mb-3 group-hover:text-[#00F59B] transition-colors tracking-tight uppercase font-display text-white">
              {service.title}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-8 font-light">
              {service.description}
            </p>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setContactModalOpen(true);
                }}
                className="btn-primary w-full !py-3.5 text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 mr-2" />
                INITIATE SERVICE
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
