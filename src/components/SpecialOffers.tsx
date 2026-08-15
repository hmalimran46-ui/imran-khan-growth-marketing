import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Tag, ArrowRight, Sparkles, Check } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export function SpecialOffers() {
  const { content } = useContent();
  const { offers } = content;
  const [copied, setCopied] = useState(false);

  if (!offers.isActive) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(offers.discountCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-emerald-500/20 via-white/[0.02] to-transparent p-0.5 rounded-[2.5rem] overflow-hidden group shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
        >
          {/* Moving border highlight */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00F59B]/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[2500ms] ease-in-out pointer-events-none" />
          
          <div className="bg-[#04140b]/90 p-8 sm:p-14 md:p-16 rounded-[2.4rem] relative overflow-hidden backdrop-blur-2xl border border-emerald-500/20">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
              <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-2.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-[0.2em] font-mono"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  <span>{offers.badge}</span>
                </motion.div>
                
                <div>
                  <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-[0.95] mb-5 font-display">
                    {offers.title}
                  </h2>
                  <p className="text-lg text-slate-300 font-light leading-relaxed max-w-xl">
                    {offers.description}
                  </p>
                </div>
              </div>

              <div className="lg:w-1/2 w-full max-w-md">
                <div className="relative p-0.5 rounded-[2rem] bg-gradient-to-br from-[#00F59B]/40 via-emerald-600/30 to-amber-500/30">
                  <div className="bg-[#020a06] p-8 sm:p-10 rounded-[1.9rem] text-center backdrop-blur-2xl">
                    <Tag className="w-10 h-10 text-[#00F59B] mx-auto mb-4 animate-bounce" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#00F59B] font-mono mb-3">
                      STRATEGIC VOUCHER CODE
                    </p>
                    
                    <div 
                      className="relative group/code cursor-pointer mb-8" 
                      onClick={handleCopy}
                    >
                      <div className="text-3xl sm:text-4xl font-mono font-black text-white tracking-[0.15em] border-2 border-dashed border-[#00F59B]/40 p-6 rounded-2xl bg-black/50 group-hover/code:border-[#00F59B] transition-all shadow-inner">
                        {offers.discountCode}
                      </div>
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#00F59B] text-black text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider transition-opacity whitespace-nowrap flex items-center gap-1 shadow-md font-mono">
                        {copied ? (
                          <>
                            <Check className="w-3 h-3" /> COPIED TO CLIPBOARD
                          </>
                        ) : (
                          'CLICK TO COPY'
                        )}
                      </div>
                    </div>

                    <button 
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                      className="btn-primary w-full !py-4 text-xs tracking-widest cursor-pointer"
                    >
                      <span>CLAIM GROWTH DISCOUNT</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                    
                    <p className="mt-4 text-[9px] text-slate-500 font-medium uppercase tracking-wider text-center font-mono">
                      * Limited Time Seasonal Allocation
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
