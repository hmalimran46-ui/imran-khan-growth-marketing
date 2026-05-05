import React from 'react';
import { motion } from 'motion/react';
import { Tag, ArrowRight, Sparkles } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export function SpecialOffers() {
  const { content } = useContent();
  const { offers } = content;

  if (!offers.isActive) return null;

  return (
    <section className="py-24 bg-[#00040a] relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative bg-gradient-to-br from-white/5 to-transparent p-1 px-1 rounded-[3rem] overflow-hidden group"
        >
          {/* Moving border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[2000ms] ease-in-out pointer-events-none" />
          
          <div className="bg-[#000810] p-12 md:p-16 rounded-[2.9rem] relative overflow-hidden">
            {/* Animated Glow on hover */}
            <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">
              <div className="lg:w-1/2 space-y-8 items-center lg:items-start text-center lg:text-left">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-3 bg-white text-black px-8 py-3 rounded-2xl font-black text-[12px] uppercase tracking-[0.3em] shadow-[0_10px_30px_rgba(255,255,255,0.2)]"
                >
                  <Sparkles className="w-4 h-4 text-orange-500 animate-pulse" />
                  {offers.badge}
                </motion.div>
                
                <div>
                  <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white leading-[0.9] mb-8 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                    {offers.title}
                  </h2>
                  <p className="text-xl text-gray-400 font-light italic leading-relaxed max-w-xl">
                    {offers.description}
                  </p>
                </div>
              </div>

              <div className="lg:w-1/2 w-full max-w-md">
                <div className="relative p-1 rounded-[2.5rem] bg-gradient-to-br from-brand-primary/30 to-blue-500/30">
                  <div className="bg-[#000c14] p-12 rounded-[2.4rem] text-center backdrop-blur-3xl">
                    <Tag className="w-12 h-12 text-brand-primary mx-auto mb-8 animate-bounce" />
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-primary mb-4 opacity-70">EXECUTION CODE</p>
                    
                    <div className="relative group/code cursor-pointer mb-10" onClick={() => {
                        navigator.clipboard.writeText(offers.discountCode);
                        alert("Code synchronized to clipboard.");
                    }}>
                      <div className="text-4xl font-mono font-black text-white tracking-[0.15em] border-2 border-dashed border-brand-primary/40 p-8 rounded-3xl bg-black/40 group-hover/code:border-brand-primary transition-all shadow-2xl">
                        {offers.discountCode}
                      </div>
                      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-brand-primary text-black text-[8px] font-black px-4 py-1.5 rounded-full opacity-0 group-hover/code:opacity-100 transition-opacity whitespace-nowrap">
                        CLICK TO COPY
                      </div>
                    </div>

                    <button 
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                      className="w-full bg-brand-primary text-black py-6 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_rgba(0,255,156,0.1)]"
                    >
                      CLAIM TACTICAL DISCOUNT <ArrowRight className="w-5 h-5" />
                    </button>
                    
                    <p className="mt-8 text-[8px] text-gray-600 font-black uppercase tracking-widest text-center">
                      * Limited Time Operational Incentive
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
