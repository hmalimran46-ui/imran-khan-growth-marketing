import { motion } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Pricing', href: '#pricing' },
  ];

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-6"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between glass rounded-[2rem] px-8 py-4 border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,255,156,0.3)]">
            <span className="text-black font-black text-xl italic italic">I</span>
          </div>
          <span className="font-black text-white tracking-tighter uppercase text-sm hidden sm:block">IMRAN <span className="text-brand-primary">KHAN</span></span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[10px] font-black text-gray-500 hover:text-brand-primary transition-all uppercase tracking-[0.2em]"
            >
              {link.name}
            </a>
          ))}
          <a href="#contact" className="px-8 py-3 bg-white text-black text-[10px] font-black rounded-xl hover:bg-brand-primary hover:scale-105 transition-all flex items-center gap-2 group uppercase tracking-widest">
            CONTACT <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-2">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-brand-primary" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-24 left-6 right-6 glass rounded-[2.5rem] p-10 md:hidden flex flex-col gap-8 shadow-2xl border-white/5"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-3xl font-black text-white tracking-tighter italic uppercase border-b border-white/5 pb-4 last:border-0"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="w-full py-5 bg-brand-primary text-black text-center font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl"
          >
            INITIALIZE CONTACT
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
}
