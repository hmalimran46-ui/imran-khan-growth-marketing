import React, { useState, useRef } from 'react';
import { useContent } from '../context/ContentContext';
import { 
  Layout, Save, LogOut, Image, DollarSign, Type, Settings, 
  ChevronRight, X, MessageSquare, Mail, User, Clock, Trash2, 
  Briefcase, Plus, Edit2, Globe, MessageCircle, Loader2, Upload, Link as LinkIcon, Tag
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export function AdminPanel() {
  const { content, updateContent, isAdmin, setIsAdmin } = useContent();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'services' | 'portfolio' | 'pricing' | 'contact' | 'inbox' | 'banner' | 'offers'>('hero');
  const [localContent, setLocalContent] = useState(content);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'about' | 'banner') => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Image too large. Please keep below 2MB.");
        return;
      }
      setIsUploading(true);
      setUploadStatus("Processing visual asset...");
      const reader = new FileReader();
      reader.onloadend = () => {
        if (target === 'about') {
          setLocalContent({ ...localContent, about: { ...localContent.about, profileImage: reader.result as string } });
        } else {
          setLocalContent({ ...localContent, coverBanner: { ...localContent.coverBanner, image: reader.result as string } });
        }
        setIsUploading(false);
        setUploadStatus("Strategic asset synchronized.");
        setTimeout(() => setUploadStatus(null), 3000);
      };
      reader.onerror = () => {
        setIsUploading(false);
        setUploadStatus("Upload failed.");
        setTimeout(() => setUploadStatus(null), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        setIsAdmin(true);
        setError('');
      } else {
        const data = await res.json();
        setError(data.error || 'Identity Rejected.');
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError('Connection failure. Protocol check required.');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
      setIsAdmin(false);
    } catch (err) {
      console.error("Logout failed");
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateContent(localContent);
      alert('Strategic Data Synchronized Successfully.');
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const deleteMessage = (id: string) => {
    const updatedMessages = localContent.messages.filter(m => m.id !== id);
    setLocalContent({ ...localContent, messages: updatedMessages });
    updateContent({ ...localContent, messages: updatedMessages });
  };

  // Helper for adding dynamic items
  const addItem = (type: 'services' | 'portfolio') => {
    if (type === 'services') {
      const newItem = { id: Date.now().toString(), title: 'New Service', description: 'Description here' };
      setLocalContent({ ...localContent, services: [...localContent.services, newItem] });
    } else {
      const newItem = { id: Date.now().toString(), title: 'New Project', category: 'Category', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80' };
      setLocalContent({ ...localContent, portfolio: [...localContent.portfolio, newItem] });
    }
  };

  const removeItem = (type: 'services' | 'portfolio', id: string) => {
    if (type === 'services') {
      setLocalContent({ ...localContent, services: localContent.services.filter(s => s.id !== id) });
    } else {
      setLocalContent({ ...localContent, portfolio: localContent.portfolio.filter(p => p.id !== id) });
    }
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

          <form onSubmit={handleLogin} className="space-y-6" autoComplete="off">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-1">Secure Identifier</label>
              <input 
                type="text" 
                name="admin-id"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary transition-all text-white font-light"
                placeholder="Secure ID Required"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-1">Access Protocol</label>
              <input 
                type="password" 
                name="admin-pw"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary transition-all text-white"
                placeholder="Access Key Required"
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
    <div className="min-h-screen bg-[#00040a] text-white flex flex-col md:flex-row">
      {/* Sidebar Nav */}
      <aside className="w-full md:w-64 bg-[#000810] border-r border-white/5 flex flex-col sticky top-0 h-screen overflow-y-auto">
        <div className="p-8">
          <div className="text-xl font-black italic tracking-tighter uppercase mb-2">
            Admin<span className="text-brand-primary">Control</span>
          </div>
          <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Growth Architecture OS</p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {(['hero', 'banner', 'about', 'services', 'portfolio', 'pricing', 'contact', 'inbox'] as const).map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left text-[10px] font-black uppercase tracking-widest transition-all px-6 py-4 rounded-xl flex items-center justify-between group ${activeTab === tab ? 'bg-brand-primary text-black' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
            >
              <div className="flex items-center gap-3">
                {tab === 'hero' && <Layout className="w-4 h-4" />}
                {tab === 'banner' && <Image className="w-4 h-4" />}
                {tab === 'about' && <User className="w-4 h-4" />}
                {tab === 'services' && <Briefcase className="w-4 h-4" />}
                {tab === 'portfolio' && <Globe className="w-4 h-4" />}
                {tab === 'pricing' && <DollarSign className="w-4 h-4" />}
                {tab === 'contact' && <Mail className="w-4 h-4" />}
                {tab === 'inbox' && <MessageSquare className="w-4 h-4" />}
                {tab}
              </div>
              {tab === 'inbox' && content.messages.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] px-1.5 py-0.5 rounded-full animate-pulse">{content.messages.length}</span>
            )}
          </button>
        ))}
        {/* New Offers Tab Button */}
        <button 
          onClick={() => setActiveTab('offers')}
          className={`flex-1 md:flex-none px-6 py-4 rounded-2xl flex items-center justify-between gap-4 transition-all duration-300 relative group
            ${activeTab === 'offers' ? 'bg-brand-primary text-black' : 'hover:bg-white/5 text-gray-500'}`}
        >
          <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest italic group-hover:translate-x-1 transition-transform">
            <Tag className="w-4 h-4" />
            OFFERS
          </div>
        </button>
      </nav>

        <div className="p-6 mt-auto border-t border-white/5 space-y-4">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="w-full py-4 bg-brand-primary text-black rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
            {isSaving ? 'Syncing...' : 'Save Changes'}
          </button>
          <button 
            onClick={handleLogout}
            className="w-full py-4 glass rounded-xl text-red-500 hover:bg-red-500/10 transition-all font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2"
          >
            <LogOut className="w-3 h-3" /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-16 max-w-5xl overflow-y-auto">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic drop-shadow-2xl">{activeTab}</h2>
            <div className="w-12 h-1 bg-brand-primary mt-4" />
          </div>

          {/* Form Content */}
          <div className="space-y-8">
            {activeTab === 'hero' && (
              <div className="space-y-8">
                <div className="glass p-8 rounded-[2rem] border-white/5 space-y-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Section Badge</label>
                    <input 
                      value={localContent.hero.badge}
                      onChange={e => setLocalContent({...localContent, hero: {...localContent.hero, badge: e.target.value}})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-brand-primary text-white font-light"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Main Headline (Use \n for line breaks)</label>
                    <textarea 
                      value={localContent.hero.headline}
                      onChange={e => setLocalContent({...localContent, hero: {...localContent.hero, headline: e.target.value}})}
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-brand-primary text-white font-black text-2xl uppercase italic"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Subheadline Description</label>
                    <textarea 
                      value={localContent.hero.subheadline}
                      onChange={e => setLocalContent({...localContent, hero: {...localContent.hero, subheadline: e.target.value}})}
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-brand-primary text-white font-light text-lg"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'banner' && (
              <div className="space-y-8">
                <div className="glass p-8 rounded-[2rem] border-white/5 space-y-6">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Banner Asset Control</label>
                    <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 group">
                      <img src={localContent.coverBanner.image} className="w-full h-full object-cover" alt="Banner" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-4 backdrop-blur-sm">
                        <button 
                          onClick={() => bannerInputRef.current?.click()}
                          className="bg-brand-primary text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:scale-110 transition-all"
                        >
                          <Upload className="w-4 h-4" /> UPLOAD NEW ASSET
                        </button>
                        <input 
                          type="file" 
                          ref={bannerInputRef} 
                          className="hidden" 
                          accept="image/*" 
                          onChange={(e) => handleImageUpload(e, 'banner')} 
                        />
                        <div className="w-full max-w-xs px-4">
                          <input 
                            value={localContent.coverBanner.image}
                            onChange={e => setLocalContent({...localContent, coverBanner: {...localContent.coverBanner, image: e.target.value}})}
                            className="w-full bg-black/60 border border-white/20 rounded-lg px-4 py-2 text-[8px] text-white outline-none focus:border-brand-primary"
                            placeholder="Or paste URL here..."
                          />
                        </div>
                      </div>
                      {isUploading && (
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                          <Loader2 className="w-8 h-8 text-brand-primary animate-spin" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Banner Headline</label>
                    <textarea 
                      value={localContent.coverBanner.headline}
                      onChange={e => setLocalContent({...localContent, coverBanner: {...localContent.coverBanner, headline: e.target.value}})}
                      rows={2}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-brand-primary text-white font-black text-3xl uppercase italic"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Banner Subheadline</label>
                    <textarea 
                      value={localContent.coverBanner.subheadline}
                      onChange={e => setLocalContent({...localContent, coverBanner: {...localContent.coverBanner, subheadline: e.target.value}})}
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-brand-primary text-gray-400 font-light text-lg italic"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="space-y-8">
                <div className="glass p-8 rounded-[2rem] border-white/5 space-y-6">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-1/3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4 block">Identity Portrait</label>
                      <div className="relative group rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-square mb-4">
                        <img src={localContent.about.profileImage} className="w-full h-full object-cover" alt="Profile" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-4 backdrop-blur-sm p-4">
                           <button 
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-brand-primary text-black px-4 py-2 rounded-lg font-black text-[9px] uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all"
                           >
                            <Upload className="w-3 h-3" /> UPLOAD
                           </button>
                           <input 
                            type="file" 
                            ref={fileInputRef} 
                            className="hidden" 
                            accept="image/*" 
                            onChange={(e) => handleImageUpload(e, 'about')} 
                           />
                           <input 
                            value={localContent.about.profileImage}
                            onChange={e => setLocalContent({...localContent, about: {...localContent.about, profileImage: e.target.value}})}
                            className="bg-black/60 border border-white/20 rounded-xl px-4 py-2 text-[10px] text-white w-full outline-none focus:border-brand-primary"
                            placeholder="Image URL..."
                           />
                        </div>
                        {isUploading && (
                          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                            <Loader2 className="w-8 h-8 text-brand-primary animate-spin" />
                          </div>
                        )}
                        {uploadStatus && !isUploading && (
                          <div className="absolute top-4 right-4 bg-brand-primary text-black px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-xl animate-bounce">
                            {uploadStatus}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <div className={`w-2 h-2 rounded-full ${localContent.about.profileImage !== content.about.profileImage ? 'bg-yellow-500 animate-pulse' : 'bg-brand-primary'}`} />
                        <span className="text-[8px] font-black uppercase tracking-widest text-gray-500">
                          {localContent.about.profileImage !== content.about.profileImage ? 'Unsaved Preview' : 'Active Profile Asset'}
                        </span>
                      </div>
                      <p className="text-[8px] text-gray-600 uppercase tracking-widest text-center italic leading-relaxed px-4">Surgical Asset replacement protocol active. Review preview before syncing.</p>
                    </div>
                    <div className="w-full md:w-2/3 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Admin Name</label>
                          <input 
                            value={localContent.about.name}
                            onChange={e => setLocalContent({...localContent, about: {...localContent.about, name: e.target.value}})}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-brand-primary text-white font-bold"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Professional Title</label>
                          <input 
                            value={localContent.about.role}
                            onChange={e => setLocalContent({...localContent, about: {...localContent.about, role: e.target.value}})}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-brand-primary text-brand-primary font-bold"
                          />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Strategic Biography</label>
                        <textarea 
                          value={localContent.about.bio}
                          onChange={e => setLocalContent({...localContent, about: {...localContent.about, bio: e.target.value}})}
                          rows={4}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-brand-primary text-white font-light text-lg"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Years of Execution</label>
                        <input 
                          value={localContent.about.experienceYears}
                          onChange={e => setLocalContent({...localContent, about: {...localContent.about, experienceYears: e.target.value}})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-brand-primary text-brand-primary font-black text-2xl"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-8">
                <button 
                  onClick={() => addItem('services')}
                  className="w-full py-4 border-2 border-dashed border-white/10 rounded-[2rem] text-gray-500 hover:text-brand-primary hover:border-brand-primary transition-all flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widest"
                >
                  <Plus className="w-5 h-5" /> Initialize New Service Protocol
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {localContent.services.map((service, index) => (
                    <div key={service.id} className="glass p-8 rounded-[2.5rem] border-white/5 relative group">
                      <button 
                        onClick={() => removeItem('services', service.id)}
                        className="absolute top-6 right-6 p-2 text-gray-700 hover:text-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">Service Label</label>
                          <input 
                            value={service.title}
                            onChange={e => {
                              const newServices = [...localContent.services];
                              newServices[index].title = e.target.value;
                              setLocalContent({...localContent, services: newServices});
                            }}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-brand-primary text-white font-black uppercase tracking-tight"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">Strategic Description</label>
                          <textarea 
                            value={service.description}
                            onChange={e => {
                              const newServices = [...localContent.services];
                              newServices[index].description = e.target.value;
                              setLocalContent({...localContent, services: newServices});
                            }}
                            rows={3}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-brand-primary text-gray-400 font-light text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'portfolio' && (
              <div className="space-y-8">
                <button 
                  onClick={() => addItem('portfolio')}
                  className="w-full py-4 border-2 border-dashed border-white/10 rounded-[2rem] text-gray-500 hover:text-brand-primary hover:border-brand-primary transition-all flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widest"
                >
                  <Plus className="w-5 h-5" /> Deploy New Portfolio Module
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {localContent.portfolio.map((item, index) => (
                    <div key={item.id} className="glass p-8 rounded-[2.5rem] border-white/5 flex flex-col gap-6 group hover:border-brand-primary/20 transition-all">
                      <div className="relative rounded-2xl overflow-hidden aspect-video border border-white/10 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                        <img src={item.image} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-6 gap-4 backdrop-blur-md">
                           <input 
                            value={item.image}
                            onChange={e => {
                              const newP = [...localContent.portfolio];
                              newP[index].image = e.target.value;
                              setLocalContent({...localContent, portfolio: newP});
                            }}
                            className="w-full bg-black/60 border border-white/20 rounded-xl px-4 py-3 text-[10px] text-white"
                            placeholder="Image URL..."
                           />
                           <p className="text-white font-black text-[9px] uppercase tracking-[0.2em]">Update Visual Asset</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex gap-4">
                          <div className="flex-1 space-y-2">
                             <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">Project Name</label>
                             <input 
                              value={item.title}
                              onChange={e => {
                                const newP = [...localContent.portfolio];
                                newP[index].title = e.target.value;
                                setLocalContent({...localContent, portfolio: newP});
                              }}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-black uppercase italic"
                             />
                          </div>
                          <div className="flex-1 space-y-2">
                             <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">Classification</label>
                             <input 
                              value={item.category}
                              onChange={e => {
                                const newP = [...localContent.portfolio];
                                newP[index].category = e.target.value;
                                setLocalContent({...localContent, portfolio: newP});
                              }}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-brand-primary font-black uppercase italic"
                             />
                          </div>
                        </div>
                        <button 
                          onClick={() => removeItem('portfolio', item.id)}
                          className="w-full py-3 bg-red-500/10 text-red-500 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all mt-2"
                        >
                          Decommission Project
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'pricing' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {([['basic', 'Starter Core'], ['standard', 'Advanced Growth'], ['premium', 'Enterprise Elite']] as const).map(([key, label]) => (
                   <div key={key} className="glass p-10 rounded-[3rem] border-white/5 space-y-8 flex flex-col items-center">
                     <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center">
                       <DollarSign className="w-6 h-6 text-brand-primary" />
                     </div>
                     <div className="text-center space-y-2">
                        <h4 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em]">{label}</h4>
                        <div className="flex items-center justify-center">
                          <span className="text-2xl font-black text-brand-primary mr-2 italic">$</span>
                          <input 
                            type="number"
                            value={localContent.pricing[key]}
                            onChange={e => setLocalContent({...localContent, pricing: {...localContent.pricing, [key]: e.target.value}})}
                            className="bg-transparent text-5xl font-black text-white w-24 text-center outline-none focus:text-brand-primary transition-all font-display italic"
                          />
                        </div>
                     </div>
                     <p className="text-[8px] text-gray-600 uppercase tracking-widest text-center italic">Monthly Recurring Revenue Model</p>
                   </div>
                 ))}
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass p-10 rounded-[3rem] border-white/5 space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-black text-sm uppercase italic tracking-tight">Primary Connection</h4>
                      <p className="text-[9px] text-gray-500 uppercase tracking-widest">Email Uplink</p>
                    </div>
                  </div>
                  <input 
                    value={localContent.contact.email}
                    onChange={e => setLocalContent({...localContent, contact: {...localContent.contact, email: e.target.value}})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-brand-primary text-white font-bold text-lg"
                  />
                </div>
                <div className="glass p-10 rounded-[3rem] border-white/5 space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-brand-primary" />
                    </div>
                    <div>
                      <h4 className="text-white font-black text-sm uppercase italic tracking-tight">Direct Protocol</h4>
                      <p className="text-[9px] text-gray-500 uppercase tracking-widest">WhatsApp Secure Line</p>
                    </div>
                  </div>
                  <input 
                    value={localContent.contact.whatsapp}
                    onChange={e => setLocalContent({...localContent, contact: {...localContent.contact, whatsapp: e.target.value}})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-brand-primary text-white font-bold text-lg"
                  />
                </div>
              </div>
            )}

            {activeTab === 'inbox' && (
              <div className="space-y-6">
                {localContent.messages.length === 0 ? (
                  <div className="glass p-20 rounded-[2.5rem] text-center border-2 border-dashed border-white/5">
                     <MessageSquare className="w-12 h-12 text-gray-800 mx-auto mb-6" />
                     <p className="text-gray-600 font-black uppercase tracking-widest text-xs">Communication Array Clear</p>
                  </div>
                ) : (
                  localContent.messages.map(msg => (
                    <motion.div 
                      key={msg.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="glass p-10 rounded-[2.5rem] border-white/5 hover:border-brand-primary/20 transition-all group relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-1 h-full bg-brand-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                        <div className="flex items-center gap-4">
                          <div className="bg-brand-primary/10 px-4 py-2 rounded-xl">
                            <span className="text-[9px] font-black text-brand-primary uppercase tracking-[0.2em]">Order Identity</span>
                            <p className="text-sm font-mono font-black text-white">{msg.orderId}</p>
                          </div>
                          <div>
                            <span className="text-[9px] font-black text-gray-600 uppercase tracking-[0.2em] block mb-1">Deployment Status</span>
                            <div className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg inline-block
                              ${msg.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' : 
                                msg.status === 'approved' ? 'bg-green-500/20 text-green-500' :
                                msg.status === 'in_progress' ? 'bg-blue-500/20 text-blue-500' :
                                msg.status === 'delivered' ? 'bg-brand-primary/20 text-brand-primary' :
                                'bg-red-500/20 text-red-500'}`}
                            >
                              {msg.status.replace('_', ' ')}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                           <label className="text-[9px] font-black text-gray-600 uppercase tracking-widest mr-2">Transition Logic:</label>
                           {(['pending', 'approved', 'in_progress', 'delivered', 'rejected'] as const).map(s => (
                             <button
                               key={s}
                               onClick={() => {
                                 const updated = localContent.messages.map(m => m.id === msg.id ? { ...m, status: s } : m);
                                 setLocalContent({ ...localContent, messages: updated });
                               }}
                               className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${msg.status === s ? 'bg-brand-primary text-black' : 'bg-white/5 text-gray-500 hover:text-white'}`}
                             >
                               {s.split('_')[0]}
                             </button>
                           ))}
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row gap-10">
                         <div className="md:w-1/3">
                            <div className="space-y-6">
                              <div>
                                <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase">{msg.name}</h3>
                                <p className="text-brand-primary font-black uppercase tracking-[0.3em] text-[10px] mt-1">{msg.email}</p>
                              </div>
                              <div className="flex items-center gap-2 text-gray-600">
                                 <Clock className="w-3 h-3" />
                                 <span className="text-[8px] font-black uppercase tracking-widest">{new Date(msg.timestamp).toLocaleString()}</span>
                              </div>
                              <div className="flex gap-4">
                                <a href={`mailto:${msg.email}`} className="bg-white/5 hover:bg-white/10 p-3 rounded-xl transition-all">
                                  <Mail className="w-4 h-4 text-gray-400" />
                                </a>
                                <button 
                                  onClick={() => deleteMessage(msg.id)}
                                  className="bg-red-500/5 hover:bg-red-500/20 p-3 rounded-xl transition-all"
                                >
                                  <Trash2 className="w-4 h-4 text-red-500" />
                                </button>
                              </div>
                            </div>
                         </div>
                         <div className="md:w-2/3 border-l border-white/5 md:pl-10">
                            <h4 className="text-lg font-black text-white mb-4 uppercase italic tracking-tight">{msg.subject}</h4>
                            <p className="text-gray-400 text-lg font-light leading-relaxed max-w-2xl bg-white/[0.02] p-6 rounded-2xl border border-white/5">
                              "{msg.text}"
                            </p>
                         </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'offers' && (
              <div className="space-y-8">
                <div className="glass p-8 rounded-[2rem] border-white/5 space-y-8">
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <div>
                      <h3 className="text-xl font-black text-white uppercase tracking-tighter">Strategic Campaigns</h3>
                      <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mt-1">Control active market incentives.</p>
                    </div>
                    <button 
                      onClick={() => setLocalContent({...localContent, offers: {...localContent.offers, isActive: !localContent.offers.isActive}})}
                      className={`px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all
                        ${localContent.offers.isActive ? 'bg-brand-primary/20 text-brand-primary border border-brand-primary/30' : 'bg-red-500/20 text-red-500 border border-red-500/30'}`}
                    >
                      {localContent.offers.isActive ? 'CAMPAIGN ACTIVE' : 'CAMPAIGN INACTIVE'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Campaign Badge</label>
                        <input 
                          value={localContent.offers.badge}
                          onChange={e => setLocalContent({...localContent, offers: {...localContent.offers, badge: e.target.value}})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-brand-primary text-white font-light"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Offer Title</label>
                        <input 
                          value={localContent.offers.title}
                          onChange={e => setLocalContent({...localContent, offers: {...localContent.offers, title: e.target.value}})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-brand-primary text-white font-black text-xl uppercase italic"
                        />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Discount/Promo Code</label>
                        <input 
                          value={localContent.offers.discountCode}
                          onChange={e => setLocalContent({...localContent, offers: {...localContent.offers, discountCode: e.target.value}})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-brand-primary text-white font-mono tracking-widest text-lg uppercase"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Detailed Description</label>
                        <textarea 
                          value={localContent.offers.description}
                          onChange={e => setLocalContent({...localContent, offers: {...localContent.offers, description: e.target.value}})}
                          rows={4}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-brand-primary text-white font-light leading-relaxed"
                          placeholder="Describe the tactical advantage of this offer..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
