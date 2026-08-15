import { motion } from 'motion/react';
import { MessageCircle, Mail, MessageSquare, Send, Instagram, Facebook, X } from 'lucide-react';
import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';

export function ContactModal() {
  const { isContactModalOpen, setContactModalOpen, addMessage } = useContent();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const [orderId, setOrderId] = useState<string | null>(null);

  if (!isContactModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = await addMessage({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      text: formData.message,
      service: 'Consultation',
      budget: 'TBD'
    });
    setOrderId(id);
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setOrderId(null);
      setContactModalOpen(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 8000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
      <div 
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
        onClick={() => setContactModalOpen(false)}
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-lg bg-[#04140b]/95 backdrop-blur-2xl p-8 sm:p-10 rounded-[2.5rem] relative z-10 border border-emerald-500/20 shadow-[0_30px_90px_rgba(0,0,0,0.8)]"
      >
        <button 
          onClick={() => setContactModalOpen(false)}
          className="absolute top-7 right-7 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {sent ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-[#00F59B]/10 border border-[#00F59B]/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Send className="text-[#00F59B] w-7 h-7" />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight text-white font-display">Inquiry Transmitted</h3>
            <p className="text-slate-300 mt-2 text-xs uppercase tracking-widest font-mono mb-6">I will review and respond within 24 hours.</p>
            
            {orderId && (
              <div className="bg-white/[0.03] border border-emerald-500/30 rounded-2xl p-6 text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#00F59B] font-mono mb-2">Track Your Strategic Order</p>
                <div className="text-2xl font-mono font-bold text-white tracking-[0.2em]">{orderId}</div>
                <p className="text-[10px] text-slate-400 mt-2 font-mono">Use this tracking token to check status anytime.</p>
              </div>
            )}
          </div>
        ) : (
          <>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-2 font-display">
              Initiate Consultation
            </h2>
            <p className="text-[#00F59B] text-xs font-mono font-bold uppercase tracking-[0.2em] mb-8">
              Direct Strategic Channel
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                <input 
                  type="text" 
                  required
                  placeholder="Your Full Name"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/[0.04] border border-emerald-500/20 rounded-2xl px-5 py-3.5 outline-none focus:border-[#00F59B] text-white font-normal text-sm"
                />
                <input 
                  type="email" 
                  required
                  placeholder="Work Email Address"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/[0.04] border border-emerald-500/20 rounded-2xl px-5 py-3.5 outline-none focus:border-[#00F59B] text-white font-normal text-sm"
                />
                <input 
                  type="text" 
                  required
                  placeholder="Subject / Growth Goal"
                  value={formData.subject}
                  onChange={e => setFormData({...formData, subject: e.target.value})}
                  className="w-full bg-white/[0.04] border border-emerald-500/20 rounded-2xl px-5 py-3.5 outline-none focus:border-[#00F59B] text-white font-normal text-sm"
                />
                <textarea 
                  required
                  rows={4} 
                  placeholder="Describe your brand, current challenges, or goals..."
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-white/[0.04] border border-emerald-500/20 rounded-2xl px-5 py-3.5 outline-none focus:border-[#00F59B] text-white font-normal text-sm resize-none"
                />
              </div>
              <button 
                type="submit" 
                className="btn-primary w-full !py-4 text-xs tracking-widest cursor-pointer mt-4"
              >
                <span>TRANSMIT INQUIRY</span>
                <Send className="w-3.5 h-3.5 ml-2 text-black" />
              </button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}

export function Contact() {
  const { content, setContactModalOpen, addMessage } = useContent();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = await addMessage({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      text: formData.message,
      service: 'Direct Consultation',
      budget: 'Business'
    });
    setOrderId(id);
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setOrderId(null);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 10000);
  };

  return (
    <section id="contact" className="py-28 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-20">
        <div className="flex-1">
          <span className="text-[#00F59B] font-mono font-bold uppercase tracking-[0.3em] text-xs mb-6 block">
            DIRECT COMMUNICATION PROTOCOLS
          </span>
          
          <div className="mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
            <a 
              href={`https://wa.me/${content.contact.whatsapp}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-3 group p-3 rounded-2xl bg-white/[0.03] border border-emerald-500/20 hover:border-[#25D366]/50 transition-all"
            >
               <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 flex items-center justify-center">
                 <MessageCircle className="w-5 h-5 text-[#25D366]" />
               </div>
               <span className="text-white text-base font-bold group-hover:text-[#25D366] transition-colors tracking-tight font-mono">{content.contact.whatsapp}</span>
            </a>

            <a 
              href={`mailto:${content.contact.email}`} 
              className="flex items-center gap-3 group p-3 rounded-2xl bg-white/[0.03] border border-emerald-500/20 hover:border-[#00F59B]/50 transition-all"
            >
               <div className="w-10 h-10 rounded-xl bg-[#00F59B]/10 flex items-center justify-center">
                 <Mail className="w-5 h-5 text-[#00F59B]" />
               </div>
               <span className="text-white text-base font-bold group-hover:text-[#00F59B] transition-colors tracking-tight font-mono">{content.contact.email}</span>
            </a>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight text-white uppercase font-display">
              Ready to Accelerate Your <br />
              <span className="text-gradient">Brand Growth?</span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed max-w-xl border-l-2 border-emerald-500/40 pl-6">
              Stop guessing on ad spend. Let's architect a high-converting marketing system tailored precisely for your business revenue targets.
            </p>
          </div>
        </div>

        <div className="flex-1 bg-[#04140b]/85 backdrop-blur-2xl p-8 sm:p-12 rounded-[2.5rem] border border-emerald-500/20 shadow-[0_25px_60px_rgba(0,0,0,0.6)] relative overflow-hidden group">
          {sent ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col items-center justify-center text-center py-10"
            >
              <div className="w-16 h-16 bg-[#00F59B]/10 border border-[#00F59B]/30 rounded-2xl flex items-center justify-center mb-6">
                <Send className="text-[#00F59B] w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-white font-display">Inquiry Received</h3>
              <p className="text-slate-300 mt-2 text-xs uppercase tracking-widest font-mono mb-8">Expect a detailed response within 24 hours.</p>

              {orderId && (
                <div className="bg-white/[0.03] border border-emerald-500/20 rounded-2xl p-6 w-full">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00F59B] font-mono mb-2">Tracking Token</p>
                  <div className="text-2xl font-mono font-bold text-white tracking-[0.15em]">{orderId}</div>
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#00F59B] rounded-full animate-pulse" />
                    <span className="text-[10px] font-mono font-medium text-slate-400">Order recorded into database</span>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                 <div className="space-y-2">
                   <label className="text-[10px] font-bold font-mono uppercase tracking-widest text-slate-400 ml-1">Client Identity</label>
                   <input 
                    type="text" 
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/[0.04] border border-emerald-500/20 rounded-2xl px-5 py-3.5 outline-none focus:border-[#00F59B] text-white font-light text-sm" 
                  />
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] font-bold font-mono uppercase tracking-widest text-slate-400 ml-1">Direct Contact</label>
                   <input 
                    type="email" 
                    required
                    placeholder="Work Email"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white/[0.04] border border-emerald-500/20 rounded-2xl px-5 py-3.5 outline-none focus:border-[#00F59B] text-white font-light text-sm" 
                  />
                 </div>
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-bold font-mono uppercase tracking-widest text-slate-400 ml-1">Strategic Objective</label>
                 <input 
                  type="text" 
                  required
                  placeholder="Subject of Consultation / Target Goals"
                  value={formData.subject}
                  onChange={e => setFormData({...formData, subject: e.target.value})}
                  className="w-full bg-white/[0.04] border border-emerald-500/20 rounded-2xl px-5 py-3.5 outline-none focus:border-[#00F59B] text-white font-light text-sm" 
                />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-bold font-mono uppercase tracking-widest text-slate-400 ml-1">Project Details</label>
                 <textarea 
                  required
                  rows={4} 
                  placeholder="Describe your current business bottlenecks, marketing goals, or ad targets..."
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-white/[0.04] border border-emerald-500/20 rounded-2xl px-5 py-3.5 outline-none focus:border-[#00F59B] text-white font-light text-sm resize-none" 
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="btn-primary w-full !py-4 text-xs tracking-widest cursor-pointer"
              >
                 <span>TRANSMIT INQUIRY</span>
                 <Send className="w-3.5 h-3.5 ml-2 text-black" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { content } = useContent();
  return (
    <footer className="py-16 px-6 border-t border-emerald-500/15 bg-[#020805]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="flex flex-col items-center mb-10">
          <div className="text-2xl sm:text-3xl font-black tracking-tight mb-2 uppercase font-display text-white">
            {content.about.name.split(' ')[0]} <span className="text-gradient">{content.about.name.split(' ').slice(1).join(' ')}</span>
          </div>
          <p className="text-emerald-400 text-xs font-mono font-bold uppercase tracking-[0.25em] text-center">{content.about.role}</p>
        </div>

        <div className="flex gap-6 mb-10">
          <a 
            href="https://www.facebook.com/mdimrankhan48" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-emerald-500/20 flex items-center justify-center text-slate-400 hover:text-[#00F59B] hover:border-[#00F59B]/40 hover:scale-110 transition-all shadow-lg"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a 
            href="https://www.instagram.com/md_imran.khan.1?igsh=ZzhvYmZydmtybTBh" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-emerald-500/20 flex items-center justify-center text-slate-400 hover:text-[#00F59B] hover:border-[#00F59B]/40 hover:scale-110 transition-all shadow-lg"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>

        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#00F59B]/40 to-transparent mb-8" />

        <p className="text-slate-500 text-xs font-mono uppercase tracking-[0.2em] mb-4 text-center">
          © {new Date().getFullYear()} {content.about.name.toUpperCase()}. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-6 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
          <a href="/admin" className="hover:text-[#00F59B] transition-colors">Admin Console</a>
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}

export function FloatingWhatsApp() {
  const { content } = useContent();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 1 }}
      className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40"
    >
      <motion.a 
        href={`https://wa.me/${content.contact.whatsapp}`} 
        target="_blank" 
        rel="noopener noreferrer" 
        animate={{ 
          y: [0, -6, 0],
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="relative w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center shadow-[0_10px_35px_rgba(37,211,102,0.4)] hover:shadow-[0_15px_45px_rgba(0,245,155,0.6)] transition-all duration-300 group cursor-pointer"
        aria-label="Direct WhatsApp Consultation"
      >
        {/* Elegant Concentric Pulse Rings: Soft Pulse -> Pause -> Soft Pulse */}
        <motion.span 
          animate={{ 
            scale: [1, 1.45, 1.5],
            opacity: [0.7, 0.15, 0]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            repeatDelay: 1.5,
            ease: "easeOut" 
          }}
          className="absolute inset-0 rounded-full border-2 border-[#25D366] pointer-events-none -z-10"
        />
        <motion.span 
          animate={{ 
            scale: [1, 1.25, 1.3],
            opacity: [0.5, 0.1, 0]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            delay: 0.3,
            repeatDelay: 1.5,
            ease: "easeOut" 
          }}
          className="absolute inset-0 rounded-full bg-[#00F59B]/20 pointer-events-none -z-10 blur-[2px]"
        />

        {/* Ambient Soft Glow Beacon */}
        <div className="absolute -inset-1 bg-[#25D366]/30 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity -z-20" />

        {/* Floating Tooltip Bubble */}
        <div className="absolute -top-11 right-0 bg-[#04140b]/95 text-white border border-emerald-500/40 px-3.5 py-1.5 rounded-xl text-[10px] font-mono font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all pointer-events-none shadow-[0_10px_25px_rgba(0,0,0,0.8)] whitespace-nowrap translate-y-2 group-hover:translate-y-0 flex items-center gap-1.5 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F59B] animate-pulse" />
          <span>Direct Strategy Line</span>
        </div>

        <MessageCircle className="text-white w-7 h-7 sm:w-8 sm:h-8 group-hover:scale-110 transition-transform duration-300" />
      </motion.a>
    </motion.div>
  );
}
