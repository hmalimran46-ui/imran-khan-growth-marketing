import { motion } from 'motion/react';
import { MessageCircle, Mail, MessageSquare, Send, Instagram, Facebook, X } from 'lucide-react';
import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';

export function ContactModal() {
  const { isContactModalOpen, setContactModalOpen, addMessage } = useContent();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  if (!isContactModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMessage({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      text: formData.message
    });
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setContactModalOpen(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={() => setContactModalOpen(false)}
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-lg glass p-8 sm:p-12 rounded-[2.5rem] relative z-10 border-white/10"
      >
        <button 
          onClick={() => setContactModalOpen(false)}
          className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {sent ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Send className="text-brand-primary w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tighter text-white">Message Transmitted</h3>
            <p className="text-gray-400 mt-2 text-sm uppercase tracking-widest font-bold">I'll get back to you shortly.</p>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white mb-4">Send Message</h2>
            <p className="text-brand-primary text-[10px] font-black uppercase tracking-[0.4em] mb-10">Direct Business Channel</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <input 
                  type="text" 
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary text-white font-light group"
                />
                <input 
                  type="email" 
                  required
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary text-white font-light"
                />
                <input 
                  type="text" 
                  required
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={e => setFormData({...formData, subject: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary text-white font-light"
                />
                <textarea 
                  required
                  rows={4}
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary text-white font-light resize-none"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-brand-primary text-black font-black py-5 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-[0_10px_30px_rgba(0,255,156,0.3)] uppercase tracking-widest text-xs"
              >
                INITIALIZE CONTACT
              </button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}

export function Contact() {
  const { setContactModalOpen, addMessage } = useContent();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMessage({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      text: formData.message
    });
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden bg-[#00040a]">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-secondary/5 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
        <div className="flex-1">
          <span className="text-brand-primary font-black uppercase tracking-[0.4em] text-xs mb-10 block">Direct Connection Protocols</span>
          
          <div className="mb-14 flex flex-col sm:flex-row items-center gap-10">
            <a 
              href="https://wa.me/01986620247" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
               <MessageCircle className="w-5 h-5 text-[#25D366] group-hover:scale-110 transition-transform" />
               <span className="text-white text-lg font-bold group-hover:text-brand-primary transition-colors tracking-tight">01986620247</span>
            </a>

            <a 
              href="mailto:h.malimran46@gmail.com" 
              className="flex items-center gap-3 group"
            >
               <Mail className="w-5 h-5 text-brand-primary group-hover:scale-110 transition-transform" />
               <span className="text-white text-lg font-bold group-hover:text-brand-primary transition-colors tracking-tight">h.malimran46@gmail.com</span>
            </a>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tighter text-white uppercase italic">
              Ready to Ignite Your <br />
              <span className="text-gradient">Brand Growth?</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed max-w-xl italic border-l-2 border-brand-primary/20 pl-8">
              Stop waiting for results. Let's engineer a high-converting marketing system tailored for your specific business goals.
            </p>
          </div>
        </div>

        <div className="flex-1 glass p-10 sm:p-14 rounded-[3rem] border-white/5 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/5 to-transparent pointer-events-none" />
          
          {sent ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col items-center justify-center text-center py-10"
            >
              <div className="w-16 h-16 bg-brand-primary/20 rounded-full flex items-center justify-center mb-6">
                <Send className="text-brand-primary w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter text-white">Message Inbound</h3>
              <p className="text-gray-400 mt-2 text-sm uppercase tracking-widest font-bold">Expect a response within 24 hours.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                 <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Identity</label>
                   <input 
                    type="text" 
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary transition-all text-white font-light" 
                  />
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Contact</label>
                   <input 
                    type="email" 
                    required
                    placeholder="Work Email"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary transition-all text-white font-light" 
                  />
                 </div>
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Objective</label>
                 <input 
                  type="text" 
                  required
                  placeholder="Subject of Consultation"
                  value={formData.subject}
                  onChange={e => setFormData({...formData, subject: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary transition-all text-white font-light" 
                />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Detail</label>
                 <textarea 
                  required
                  rows={4} 
                  placeholder="Describe your current business bottlenecks..."
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary transition-all text-white font-light resize-none"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-black font-black py-5 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl uppercase tracking-widest text-xs"
              >
                 SEND TO INBOX <Send className="w-3 h-3 ml-2 inline-block" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="py-20 px-6 border-t border-white/5 bg-[#000810]">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="flex flex-col items-center mb-12">
          <div className="text-3xl font-black italic tracking-tighter mb-2">
            IMRAN<span className="text-brand-primary">KHAN</span>
          </div>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] text-center">Elite Growth Marketing Strategist</p>
        </div>

        <div className="flex gap-10 mb-12">
          <a 
            href="https://www.facebook.com/mdimrankhan48" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-16 h-16 rounded-[1.5rem] glass flex items-center justify-center text-gray-400 hover:text-blue-500 hover:scale-125 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] group border-white/10"
          >
            <Facebook className="w-6 h-6 group-hover:rotate-12 transition-transform" />
          </a>
          <a 
            href="https://www.instagram.com/md_imran.khan.1?igsh=ZzhvYmZydmtybTBh" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-16 h-16 rounded-[1.5rem] glass flex items-center justify-center text-gray-400 hover:text-pink-500 hover:scale-125 transition-all duration-300 hover:shadow-[0_0_30px_rgba(236,72,153,0.3)] group border-white/10"
          >
            <Instagram className="w-6 h-6 group-hover:rotate-12 transition-transform" />
          </a>
        </div>

        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent mb-10" />

        <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
          © {new Date().getFullYear()} IMRAN KHAN. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-6 text-[8px] font-black text-gray-700 uppercase tracking-widest">
          <a href="/admin" className="hover:text-brand-primary transition-colors">Admin Console</a>
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}

export function FloatingWhatsApp() {
  return (
    <a 
      href="https://wa.me/01986620247" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all z-[80] group"
    >
      <div className="absolute -top-12 right-0 bg-white text-black px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all pointer-events-none shadow-xl border border-gray-100 whitespace-nowrap translate-y-2 group-hover:translate-y-0">
        Direct Strategy Line
      </div>
      <MessageCircle className="text-white w-8 h-8" />
    </a>
  );
}
