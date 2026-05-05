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

              <div className="flex justify-between relative px-2 mb-4">
                <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/5 -translate-y-1/2 -z-10" />
                <motion.div 
                  className="absolute top-1/2 left-0 h-[2px] bg-brand-primary -translate-y-1/2 -z-10 origin-left transition-all duration-500"
                  initial={{ scaleX: 0 }}
                  animate={{ 
                    scaleX: result.status === 'pending' ? 0.125 : 
                            result.status === 'approved' ? 0.375 : 
                            result.status === 'in_progress' ? 0.625 : 
                            result.status === 'delivered' ? 1 : 0 
                  }}
                />
                {[
                  { step: 'pending', icon: Clock, label: 'Pending', desc: 'Awaiting Review' },
                  { step: 'approved', icon: CheckCircle, label: 'Approved', desc: 'Ops Initialized' },
                  { step: 'in_progress', icon: Package, label: 'Active', desc: 'Strategy Deployment' },
                  { step: 'delivered', icon: Truck, label: 'Completed', desc: 'Mission Success' }
                ].map((item, i, arr) => {
                  const states = arr.map(a => a.step);
                  const currentIndex = states.indexOf(result.status === 'rejected' ? 'pending' : result.status);
                  const isPast = currentIndex >= i;
                  const isCurrent = (result.status === 'rejected' && i === 0) || result.status === item.step;
                  const isRejected = result.status === 'rejected' && i === 0;

                  return (
                    <div key={item.step} className="flex flex-col items-center gap-3 relative">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-700 shadow-2xl relative
                        ${isPast ? (isRejected ? 'bg-red-500 text-white' : 'bg-brand-primary text-black') : 'bg-white/5 text-gray-700'}
                        ${isCurrent ? 'scale-110 shadow-[0_0_30px_rgba(0,255,156,0.4)]' : ''}`}
                      >
                        {isRejected && i === 0 ? <AlertCircle className="w-6 h-6" /> : <item.icon className="w-6 h-6" />}
                        {isCurrent && (
                          <motion.div 
                            layoutId="active-indicator"
                            className="absolute -inset-1 border-2 border-brand-primary rounded-[1.2rem] animate-pulse" 
                          />
                        )}
                      </div>
                      <div className="flex flex-col items-center">
                        <span className={`text-[9px] font-black uppercase tracking-widest ${isPast ? (isRejected ? 'text-red-500' : 'text-white') : 'text-gray-700'}`}>
                          {isRejected && i === 0 ? 'REJECTED' : item.label}
                        </span>
                        <span className="text-[7px] font-bold text-gray-600 uppercase tracking-tighter whitespace-nowrap mt-1">
                          {item.desc}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className={`rounded-3xl p-8 border transition-all duration-500 ${result.status === 'rejected' ? 'bg-red-500/5 border-red-500/20' : 'bg-brand-primary/5 border-brand-primary/10'}`}>
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-2 h-2 rounded-full animate-pulse ${result.status === 'rejected' ? 'bg-red-500' : 'bg-brand-primary'}`} />
                  <p className={`text-[10px] font-black uppercase tracking-widest italic ${result.status === 'rejected' ? 'text-red-500' : 'text-brand-primary'}`}>
                    Operational Broadcast:
                  </p>
                </div>
                <p className="text-gray-400 text-sm font-light italic leading-relaxed">
                  {result.status === 'pending' && "Requirement validation stage active. Strategic response pending reviewer authorization."}
                  {result.status === 'approved' && "Verification complete. Mission assets are being provisioned for deployment."}
                  {result.status === 'in_progress' && "Tactical execution initialized. Real-time monitoring systems are analyzing growth vectors."}
                  {result.status === 'delivered' && "Objective achieved. All strategic assets have been successfully transferred."}
                  {result.status === 'rejected' && "Request protocols rejected. Intelligence audit detected non-viable engagement parameters."}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
