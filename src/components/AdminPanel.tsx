import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Layout, Save, LogOut, Image, DollarSign, Type, Settings, ChevronRight, X, MessageSquare, Mail, User, Clock, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';

export function AdminPanel() {
  const { content, updateContent, isAdmin, setIsAdmin } = useContent();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'content' | 'inbox' | 'portfolio'>('content');
  const [localContent, setLocalContent] = useState(content);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'h.malimran46@gmail.com' && password === 'admin123') { // Mock password
      setIsAdmin(true);
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleSave = () => {
    updateContent(localContent);
    alert('Strategic Data Synchronized Successfully.');
  };

  const deleteMessage = (id: string) => {
    const updatedMessages = localContent.messages.filter(m => m.id !== id);
    setLocalContent({ ...localContent, messages: updatedMessages });
    updateContent({ ...localContent, messages: updatedMessages });
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-[#00040a]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md glass p-10 rounded-[2.5rem] border-white/10"
        >
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-brand-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(0,255,156,0.3)]">
              <Settings className="text-black w-8 h-8" />
            </div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Command Login</h2>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-2">Authorized Access Required</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-1">Admin Identity</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary transition-all text-white font-light"
                placeholder="h.malimran46@gmail.com"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-1">Security Key</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary transition-all text-white"
                placeholder="••••••••"
                required
              />
            </div>
            {error && <p className="text-red-500 text-[10px] font-bold text-center uppercase tracking-widest animate-pulse">{error}</p>}
            
            <button 
              type="submit" 
              className="w-full bg-brand-primary text-black font-black py-5 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(0,255,156,0.2)] flex items-center justify-center gap-3 uppercase text-[10px] tracking-widest"
            >
              INITIALIZE COMMAND <ChevronRight className="w-5 h-5" />
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#00040a] text-white">
      {/* Admin Nav */}
      <nav className="sticky top-0 z-50 bg-[#000810]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <div className="text-xl font-black italic tracking-tighter uppercase">
              Admin<span className="text-brand-primary">Control</span>
            </div>
            <div className="hidden md:flex gap-6">
              {(['content', 'inbox', 'portfolio'] as const).map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-[10px] font-black uppercase tracking-widest transition-all px-4 py-2 rounded-xl ${activeTab === tab ? 'bg-brand-primary text-black' : 'text-gray-500 hover:text-white'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
             <button 
              onClick={handleSave}
              className="px-6 py-3 bg-brand-primary text-black rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-lg hidden sm:flex items-center gap-2"
            >
              <Save className="w-3 h-3" /> Save Changes
            </button>
            <button 
              onClick={() => setIsAdmin(false)}
              className="p-3 glass rounded-xl text-red-500 hover:bg-red-500/10 transition-all"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6 md:p-12">
        {activeTab === 'inbox' && (
          <div className="space-y-10">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">Communications</h2>
                <p className="text-brand-primary font-black tracking-[0.4em] text-[10px] mt-2 uppercase">Internal Strategy Inbox</p>
              </div>
              <div className="glass px-6 py-3 rounded-xl border-white/5 hidden md:block">
                <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Total Conversations</p>
                <p className="text-2xl font-black text-white">{content.messages.length}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {content.messages.length === 0 ? (
                <div className="glass p-20 rounded-[2.5rem] text-center border-2 border-dashed border-white/5">
                   <MessageSquare className="w-12 h-12 text-gray-800 mx-auto mb-6" />
                   <p className="text-gray-600 font-black uppercase tracking-widest text-xs">No active inquiries</p>
                </div>
              ) : (
                content.messages.map(msg => (
                  <motion.div 
                    key={msg.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass p-8 rounded-[2rem] border-white/5 hover:border-brand-primary/20 transition-all group"
                  >
                    <div className="flex flex-col md:flex-row gap-8">
                       <div className="md:w-1/4">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center">
                              <User className="w-4 h-4 text-brand-primary" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Client Profile</span>
                          </div>
                          <h3 className="text-2xl font-black text-white mb-2">{msg.name}</h3>
                          <p className="text-xs text-brand-primary font-bold uppercase tracking-widest">{msg.email}</p>
                          <div className="mt-6 flex items-center gap-2 text-gray-600">
                             <Clock className="w-3 h-3" />
                             <span className="text-[8px] font-black uppercase tracking-widest">{new Date(msg.timestamp).toLocaleString()}</span>
                          </div>
                       </div>
                       <div className="md:w-3/4 border-l border-white/5 md:pl-12">
                          <h4 className="text-lg font-black text-white mb-4 italic uppercase tracking-tight">{msg.subject}</h4>
                          <p className="text-gray-400 text-lg font-light leading-relaxed mb-8">
                            {msg.text}
                          </p>
                          
                          <div className="space-y-6">
                            <div className="space-y-3">
                              <label className="text-[9px] font-black uppercase tracking-widest text-brand-primary">Draft Strategic Response</label>
                              <textarea 
                                placeholder="Initialize professional response sequence..."
                                className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary text-white text-sm font-light resize-none h-32"
                              />
                            </div>
                            <div className="flex gap-4">
                               <button className="bg-brand-primary text-black px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-lg">
                                 Transmit Response
                               </button>
                               <a href={`mailto:${msg.email}`} className="glass text-gray-400 px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all border-white/5">
                                 External Email
                               </a>
                               <button 
                                onClick={() => deleteMessage(msg.id)}
                                className="text-gray-600 hover:text-red-500 transition-colors p-3"
                               >
                                  <Trash2 className="w-4 h-4" />
                               </button>
                            </div>
                          </div>
                       </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-12">
                 <section className="glass p-8 rounded-[2.5rem] border-white/5">
                    <div className="flex items-center gap-4 mb-10">
                      <div className="w-10 h-10 rounded-xl bg-brand-primary/20 flex items-center justify-center">
                        <Type className="text-brand-primary w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-black uppercase tracking-tight">Messaging Forge</h3>
                    </div>
                    <div className="space-y-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Main Headline</label>
                        <textarea 
                          value={localContent.hero.headline}
                          onChange={e => setLocalContent({...localContent, hero: {...localContent.hero, headline: e.target.value}})}
                          rows={2}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary text-white font-light text-lg"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Sub-Headline</label>
                        <textarea 
                          value={localContent.hero.subheadline}
                          onChange={e => setLocalContent({...localContent, hero: {...localContent.hero, subheadline: e.target.value}})}
                          rows={2}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary text-white font-light"
                        />
                      </div>
                    </div>
                 </section>

                 <section className="glass p-8 rounded-[2.5rem] border-white/5">
                    <div className="flex items-center gap-4 mb-10">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                        <User className="text-blue-400 w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-black uppercase tracking-tight">Identity & Role</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Full Name</label>
                          <input 
                            value={localContent.about.name}
                            onChange={e => setLocalContent({...localContent, about: {...localContent.about, name: e.target.value}})}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary text-white font-light"
                          />
                       </div>
                       <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Professional Role</label>
                          <input 
                            value={localContent.about.role}
                            onChange={e => setLocalContent({...localContent, about: {...localContent.about, role: e.target.value}})}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary text-white font-light"
                          />
                       </div>
                    </div>
                 </section>
              </div>

              <div className="space-y-12">
                 <section className="glass p-8 rounded-[2.5rem] border-white/5">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-10 h-10 rounded-xl bg-brand-secondary/20 flex items-center justify-center">
                        <DollarSign className="text-brand-secondary w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-black uppercase tracking-tight">Pricing Hub</h3>
                    </div>
                    <div className="space-y-6">
                       {([['basic', 'Basic Tier'], ['standard', 'Standard Tier'], ['premium', 'Premium Tier']] as const).map(([key, label]) => (
                         <div key={key} className="space-y-2">
                           <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 ml-1">{label} ($)</label>
                           <input 
                            type="number"
                            value={localContent.pricing[key]}
                            onChange={e => setLocalContent({...localContent, pricing: {...localContent.pricing, [key]: e.target.value}})}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary text-white font-mono text-xl"
                           />
                         </div>
                       ))}
                    </div>
                 </section>

                 <section className="glass p-8 rounded-[2.5rem] border-white/5">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4">System Telemetry</h4>
                    <div className="space-y-4">
                       <div className="flex justify-between items-center bg-white/[0.03] p-4 rounded-xl border border-white/5">
                          <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Database</span>
                          <span className="text-[10px] font-black text-brand-primary">SYNCED</span>
                       </div>
                       <div className="flex justify-between items-center bg-white/[0.03] p-4 rounded-xl border border-white/5">
                          <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Network</span>
                          <span className="text-[10px] font-black text-brand-primary">ONLINE</span>
                       </div>
                       <button 
                        onClick={() => {
                          localStorage.clear();
                          window.location.reload();
                        }}
                        className="w-full py-4 glass rounded-xl text-[9px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500/10 transition-all mt-4"
                       >
                        Hard Reset Local
                       </button>
                    </div>
                 </section>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="glass p-12 rounded-[2.5rem] border-white/5 text-center min-h-[400px] flex flex-col items-center justify-center">
             <Image className="w-16 h-16 text-gray-800 mb-6" />
             <h2 className="text-2xl font-black uppercase tracking-tighter text-white mb-4">Media Repository</h2>
             <p className="text-gray-500 max-w-sm font-light">The visual asset manager is currently optimized for direct file injections. Manual dynamic list editing is coming in a future patch.</p>
             <button className="mt-8 px-10 py-4 bg-brand-primary text-black rounded-xl font-black text-[10px] uppercase tracking-widest">Open Media Injector</button>
          </div>
        )}
      </main>
    </div>
  );
}
