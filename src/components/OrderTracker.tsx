import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Package, Clock, CheckCircle, Truck, AlertCircle } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export function OrderTracker({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { content } = useContent();
  const [orderId, setOrderId] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const found = content.messages.find(m => m.orderId === orderId.toUpperCase() || m.orderId === orderId);
    if (found) {
      setResult(found);
    } else {
      setError('Strategic ID not found in database.');
      setResult(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-lg glass p-8 sm:p-12 rounded-[2.5rem] relative z-10 border-white/10"
      >
        <button onClick={onClose} className="absolute top-8 right-8 text-gray-500 hover:text-white">
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-black uppercase tracking-tighter text-white mb-2">Track Strategy</h2>
        <p className="text-brand-primary text-[10px] font-black uppercase tracking-[0.4em] mb-10">Real-time Deployment Status</p>

        <form onSubmit={handleTrack} className="flex gap-4 mb-10">
          <input 
            value={orderId}
            onChange={e => setOrderId(e.target.value)}
            placeholder="IK-XXXXXX"
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary text-white font-mono uppercase tracking-[0.2em]"
            required
          />
          <button type="submit" className="bg-brand-primary text-black p-4 rounded-2xl hover:scale-105 transition-all">
            <Search className="w-6 h-6" />
          </button>
        </form>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 text-red-500 font-bold uppercase tracking-widest text-[10px] bg-red-500/10 p-4 rounded-xl border border-red-500/20"
            >
              <AlertCircle className="w-4 h-4" /> {error}
            </motion.div>
          )}

          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Status Protocol</p>
                  <p className="text-xl font-black text-white italic uppercase tracking-tight">{result.status.replace('_', ' ')}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Strategic Partner</p>
                  <p className="text-white font-bold">{result.name}</p>
                </div>
              </div>

              <div className="flex justify-between relative px-2">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -translate-y-1/2 -z-10" />
                {[
                  { step: 'pending', icon: Clock },
                  { step: 'approved', icon: CheckCircle },
                  { step: 'in_progress', icon: Package },
                  { step: 'delivered', icon: Truck }
                ].map((item, i, arr) => {
                  const states = arr.map(a => a.step);
                  const currentIndex = states.indexOf(result.status);
                  const isPast = currentIndex >= i;
                  const isCurrent = result.status === item.step;

                  return (
                    <div key={item.step} className="flex flex-col items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 shadow-xl
                        ${isPast ? 'bg-brand-primary text-black' : 'bg-white/5 text-gray-700'}
                        ${isCurrent ? 'animate-pulse scale-110 shadow-[0_0_20px_rgba(0,255,156,0.3)]' : ''}`}
                      >
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className={`text-[8px] font-black uppercase tracking-widest ${isPast ? 'text-white' : 'text-gray-700'}`}>
                        {item.step.split('_')[0]}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="bg-brand-primary/5 rounded-2xl p-6 border border-brand-primary/10">
                <p className="text-[10px] font-black text-brand-primary uppercase tracking-widest mb-2 italic underline decoration-brand-primary/30">Intelligence Note:</p>
                <p className="text-gray-400 text-sm font-light italic leading-relaxed">
                  "Your project is currently in the <span className="text-white font-bold">{result.status.replace('_', ' ')}</span> phase. Our teams are maintaining peak operational efficiency to ensure delivery within the set timeline."
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
