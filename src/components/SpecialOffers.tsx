import React from 'react';
import { motion } from 'motion/react';
import { Tag, ArrowRight, Sparkles } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export function SpecialOffers() {
  const { content } = useContent();
  const { offers } = content;

  if (!offers.isActive) return null;

  return (
    <section className="py-20 bg-[#00040a] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="glass p-12 rounded-[3.5rem] border-brand-primary/20 relative group"
        >
          {/* Animated Badge */}
          <div className="absolute -top-6 left-12 bg-white text-black px-8 py-3 rounded-2xl font-black text-[12px] uppercase tracking-[0.3em] shadow-[0_10px_30px_rgba(255,255,255,0.2)] flex items-center gap-3">
            <Sparkles className="w-4 h-4 animate-pulse" />
            {offers.badge}
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-2/3">
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none mb-6">
                {offers.title}
              </h2>
              <p className="text-xl text-gray-400 font-light italic leading-relaxed max-w-2xl">
                {offers.description}
              </p>
            </div>

            <div className="lg:w-1/3 w-full">
              <div className="bg-brand-primary/10 border border-brand-primary/30 p-10 rounded-[2.5rem] text-center backdrop-blur-xl group-hover:bg-brand-primary/20 transition-all duration-500">
                <Tag className="w-10 h-10 text-brand-primary mx-auto mb-6" />
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary mb-3">Target Discount Code</p>
                <div className="text-4xl font-mono font-black text-white tracking-[0.1em] border-2 border-dashed border-brand-primary/40 p-6 rounded-2xl bg-black/40">
                  {offers.discountCode}
                </div>
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full mt-8 bg-brand-primary text-black py-5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl"
                >
                  CLAIM OFFER <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
