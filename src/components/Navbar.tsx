import { motion } from 'motion/react';
import { Menu, X, ArrowUpRight, ShieldCheck, Settings, Package } from 'lucide-react';
import { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Link } from 'react-router-dom';

export default function Navbar({ onOpenTracker }: { onOpenTracker?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const { isAdmin, setContactModalOpen } = useContent();

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Skills', href: '#skills' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Pricing', href: '#pricing' },
  ];

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 py-4 sm:py-5"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-[#04140b]/85 backdrop-blur-2xl rounded-[2rem] px-6 sm:px-8 py-3.5 border border-emerald-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
        <div className="flex items-center gap-3.5">
          <a href="#home" className="flex items-center gap-3.5 group">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-[#00F59B] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,245,155,0.35)] group-hover:scale-105 transition-transform">
              <span className="text-black font-black text-xl font-display">IK</span>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-white tracking-tight uppercase text-sm sm:text-base leading-none font-display">
                IMRAN <span className="text-[#00F59B]">KHAN</span>
              </span>
              <span className="text-[8px] uppercase tracking-[0.25em] text-emerald-400/80 font-mono mt-0.5">
                Growth Platform
              </span>
            </div>
          </a>
          {isAdmin && (
            <Link 
              to="/admin" 
              className="hidden lg:flex items-center gap-1.5 text-[8px] font-black uppercase tracking-[0.2em] text-[#00F59B] bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-lg animate-pulse font-mono hover:bg-emerald-500/20 transition-all"
              title="Admin Session Active"
            >
              <ShieldCheck className="w-2.5 h-2.5" /> Admin Active
            </Link>
          )}
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-bold text-slate-300 hover:text-[#00F59B] transition-colors uppercase tracking-[0.2em] relative group py-1 font-mono"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-[#00F59B] to-emerald-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          
          <div className="h-4 w-[1px] bg-white/10 mx-1" />

          {/* Track Order Button */}
          <button 
            onClick={onOpenTracker}
            className="px-5 py-2.5 bg-white/[0.04] text-slate-200 text-xs font-bold rounded-xl border border-white/10 hover:bg-white/[0.08] hover:border-emerald-500/40 transition-all flex items-center gap-2 uppercase tracking-wider cursor-pointer font-mono"
          >
            <Package className="w-3.5 h-3.5 text-[#00F59B]" /> 
            <span>TRACK ORDER</span>
          </button>

          <Link 
            to="/admin"
            className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center hover:border-emerald-500/50 hover:bg-white/[0.08] transition-all group/admin relative cursor-pointer"
            title="Admin Command Center"
          >
            <Settings className={`w-4 h-4 transition-all duration-500 ${isAdmin ? 'text-[#00F59B] animate-pulse' : 'text-slate-400 group-hover/admin:text-[#00F59B] group-hover/admin:rotate-90'}`} />
            {isAdmin && <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#00F59B] rounded-full animate-ping" />}
          </Link>

          <button 
            onClick={() => setContactModalOpen(true)}
            className="btn-primary !px-6 !py-2.5 !text-xs !tracking-wider cursor-pointer"
          >
            <span>CONTACT</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 text-black" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-white p-2 hover:text-[#00F59B] transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#00F59B]" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-20 left-4 right-4 bg-[#04140b]/95 backdrop-blur-3xl rounded-[2rem] p-8 md:hidden flex flex-col gap-6 shadow-2xl border border-emerald-500/20"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-2xl font-black text-white tracking-tight uppercase border-b border-white/5 pb-3 last:border-0 font-display hover:text-[#00F59B] transition-colors"
            >
              {link.name}
            </a>
          ))}
          
          <button
            onClick={() => {
              setIsOpen(false);
              onOpenTracker?.();
            }}
            className="w-full py-4 bg-white/[0.05] text-slate-200 font-bold rounded-2xl text-xs uppercase tracking-widest border border-white/10 flex items-center justify-center gap-2 font-mono"
          >
            <Package className="w-4 h-4 text-[#00F59B]" /> TRACK ORDER
          </button>

          <button
            onClick={() => {
              setIsOpen(false);
              setContactModalOpen(true);
            }}
            className="btn-primary w-full !py-4"
          >
            INITIALIZE CONTACT
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
}
