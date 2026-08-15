import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  BarChart3, 
  Target, 
  Zap, 
  Activity, 
  Search, 
  Layers, 
  Globe, 
  Share2, 
  DollarSign, 
  CheckCircle2, 
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  MousePointerClick,
  Users,
  Eye,
  RefreshCw
} from 'lucide-react';

interface TelemetryEvent {
  id: number;
  time: string;
  source: string;
  action: string;
  metric: string;
  color: string;
}

export function HeroIntelligenceCenter() {
  const [activeTab, setActiveTab] = useState<'all' | 'performance' | 'seo' | 'conversion'>('all');
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const [isLiveHovered, setIsLiveHovered] = useState(false);
  const [dataSeed, setDataSeed] = useState(0);

  // Live real-time marketing events stream
  const telemetryEvents: TelemetryEvent[] = [
    { id: 1, time: 'Just now', source: 'Meta Ads API', action: 'High-ROAS Conversion Logged', metric: '+$1,840 (5.8x ROAS)', color: 'text-[#00F59B]' },
    { id: 2, time: '12s ago', source: 'Google Search Index', action: 'Keyword Ranked Position #1', metric: 'Growth Marketing Lead', color: 'text-amber-400' },
    { id: 3, time: '28s ago', source: 'CRO Engine', action: 'Funnel Checkout Rate Scaled', metric: 'Conv. Rate +3.4%', color: 'text-[#00F59B]' },
    { id: 4, time: '45s ago', source: 'Social Matrix', action: 'Viral Reel Engagement Spike', metric: '+48.2k Organic Reach', color: 'text-emerald-400' },
    { id: 5, time: '1m ago', source: 'GA4 Server Stream', action: 'Attribution Pixel Synced', metric: '99.8% Match Rate', color: 'text-teal-300' },
  ];

  // Auto cycle live events
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveEventIndex((prev) => (prev + 1) % telemetryEvents.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [telemetryEvents.length]);

  // Subtle data pulse every few seconds
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setDataSeed((prev) => (prev + 1) % 100);
    }, 4500);
    return () => clearInterval(pulseInterval);
  }, []);

  const tabs = [
    { id: 'all', label: 'All Vectors', icon: Activity },
    { id: 'performance', label: 'Performance Ads', icon: TrendingUp },
    { id: 'seo', label: 'SEO & Search Rank', icon: Search },
    { id: 'conversion', label: 'Funnel & CRO', icon: Target },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto mt-12 sm:mt-16 relative">
      {/* Outer Ambient Glow Ring */}
      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/25 via-[#00F59B]/20 to-teal-500/25 rounded-[2.5rem] blur-2xl opacity-70 pointer-events-none -z-10" />

      {/* Main Glassmorphism Command Container */}
      <div className="relative rounded-[2rem] sm:rounded-[2.4rem] bg-[#020905]/90 border border-emerald-500/30 backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.85)] overflow-hidden">
        
        {/* Top Intelligence Status Header Bar */}
        <div className="px-5 sm:px-8 py-3.5 sm:py-4 bg-[#04140b]/80 border-b border-emerald-500/20 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F59B] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F59B]"></span>
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#00F59B]">
                REAL-TIME GROWTH ENGINE // v4.8 ACTIVE
              </span>
            </div>
            <span className="hidden md:inline-block text-[10px] font-mono text-slate-400">
              | AI Studio Precision Matrix
            </span>
          </div>

          {/* Interactive Mode Tabs */}
          <div className="flex items-center gap-1 sm:gap-2 bg-black/40 p-1 rounded-xl border border-white/5 overflow-x-auto max-w-full">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500 to-[#00F59B] text-black shadow-[0_0_15px_rgba(0,245,155,0.4)]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                  }`}
                >
                  <TabIcon className="w-3 h-3" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Command Center Main Interactive Stage */}
        <div className="p-5 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left / Center: Interactive Dynamic Growth SVG Visualizer (7 Columns) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Upper Chart Header with Live Metrics */}
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-emerald-400 block mb-1">
                  {activeTab === 'performance' ? 'ROAS & REVENUE ACCELERATION' :
                   activeTab === 'seo' ? 'ORGANIC SEARCH & RANK DOMINANCE' :
                   activeTab === 'conversion' ? 'CONVERSION FUNNEL EFFICIENCY' :
                   'AGGREGATE CLIENT GROWTH TRAJECTORY'}
                </span>
                <div className="flex items-baseline gap-3">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-display tracking-tight">
                    {activeTab === 'performance' ? '$142,850' :
                     activeTab === 'seo' ? '+310% Traffic' :
                     activeTab === 'conversion' ? '8.6% Conv. Rate' :
                     '+340% ROAS'}
                  </h3>
                  <span className="inline-flex items-center text-xs font-mono font-bold text-[#00F59B] bg-[#00F59B]/10 px-2 py-0.5 rounded-md border border-[#00F59B]/30">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {activeTab === 'performance' ? '5.4x Multiplier' :
                     activeTab === 'seo' ? '#1 Page Ranks' :
                     activeTab === 'conversion' ? '-42% CPL' :
                     'Scaled Across 150+ Brands'}
                  </span>
                </div>
              </div>

              {/* Mini Time Range Pill */}
              <div className="hidden sm:flex items-center gap-1 text-[9px] font-mono text-slate-400 bg-white/[0.03] px-2.5 py-1 rounded-lg border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F59B] animate-pulse" />
                <span>30-Day Growth Sprint</span>
              </div>
            </div>

            {/* SVG Animated Chart Canvas Container */}
            <div className="relative h-48 sm:h-56 md:h-64 w-full bg-[#030e07]/80 rounded-2xl p-4 border border-emerald-500/20 overflow-hidden shadow-inner group">
              
              {/* Background Digital Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f59b0d_1px,transparent_1px),linear-gradient(to_bottom,#00f59b0d_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
              
              {/* Moving Radar Scanline Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00F59B]/10 to-transparent w-24 -translate-x-full group-hover:translate-x-[600px] animate-[shimmer_4s_infinite_linear] pointer-events-none" />

              {/* SVG Main Curve with Animated Gradient & Milestones */}
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 180" preserveAspectRatio="none">
                <defs>
                  {/* Linear Gradient for Fill Area */}
                  <linearGradient id="growthAreaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00F59B" stopOpacity="0.45" />
                    <stop offset="60%" stopColor="#059669" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#04140b" stopOpacity="0" />
                  </linearGradient>

                  {/* Gradient for the Stroke Line */}
                  <linearGradient id="growthStrokeGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#059669" />
                    <stop offset="50%" stopColor="#00F59B" />
                    <stop offset="100%" stopColor="#86efac" />
                  </linearGradient>

                  {/* Filter for Glow */}
                  <filter id="emeraldGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Subtle Horizontal Reference Grid Lines */}
                <line x1="0" y1="40" x2="500" y2="40" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                <line x1="0" y1="90" x2="500" y2="90" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                <line x1="0" y1="140" x2="500" y2="140" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />

                {/* Secondary Baseline Curve (Comparison / Prior Period) */}
                <path
                  d="M 0 155 Q 120 145, 250 130 T 500 110"
                  fill="none"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />

                {/* Area Fill */}
                <motion.path
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  d={
                    activeTab === 'performance' ? "M 0 160 C 90 145, 170 120, 240 85 C 310 50, 400 30, 500 18 L 500 180 L 0 180 Z" :
                    activeTab === 'seo' ? "M 0 165 C 100 150, 190 110, 280 65 C 360 30, 440 25, 500 12 L 500 180 L 0 180 Z" :
                    activeTab === 'conversion' ? "M 0 155 C 110 135, 200 100, 290 60 C 370 28, 430 20, 500 15 L 500 180 L 0 180 Z" :
                    "M 0 160 C 80 145, 160 115, 240 75 C 320 40, 410 25, 500 15 L 500 180 L 0 180 Z"
                  }
                  fill="url(#growthAreaGradient)"
                />

                {/* Main Glowing Surge Line */}
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.8, ease: "easeOut" }}
                  d={
                    activeTab === 'performance' ? "M 0 160 C 90 145, 170 120, 240 85 C 310 50, 400 30, 500 18" :
                    activeTab === 'seo' ? "M 0 165 C 100 150, 190 110, 280 65 C 360 30, 440 25, 500 12" :
                    activeTab === 'conversion' ? "M 0 155 C 110 135, 200 100, 290 60 C 370 28, 430 20, 500 15" :
                    "M 0 160 C 80 145, 160 115, 240 75 C 320 40, 410 25, 500 15"
                  }
                  fill="none"
                  stroke="url(#growthStrokeGradient)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  filter="url(#emeraldGlow)"
                />

                {/* Pulsing Interactive Data Nodes Along The Curve */}
                {[
                  { cx: 120, cy: 130, label: 'Audit & Setup' },
                  { cx: 240, cy: 75, label: 'Target Testing' },
                  { cx: 370, cy: 35, label: 'Scale Budget' },
                  { cx: 500, cy: 15, label: 'Dominance' },
                ].map((node, idx) => (
                  <g key={idx}>
                    <circle cx={node.cx} cy={node.cy} r="6" fill="#020905" stroke="#00F59B" strokeWidth="2.5" />
                    <circle cx={node.cx} cy={node.cy} r="11" fill="none" stroke="#00F59B" strokeWidth="1" opacity="0.4" className="animate-ping" style={{ transformOrigin: `${node.cx}px ${node.cy}px`, animationDuration: `${2.5 + idx}s` }} />
                    <circle cx={node.cx} cy={node.cy} r="2.5" fill="#FFFFFF" />
                  </g>
                ))}
              </svg>

              {/* Floating Highlight Tooltip at Peak Growth */}
              <div className="absolute top-3 right-4 bg-[#04140b]/95 border border-[#00F59B]/40 px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-2 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#00F59B] animate-pulse" />
                <span className="text-[10px] font-mono font-bold text-white uppercase tracking-wider">
                  Peak Scale: +340% ROAS
                </span>
              </div>
            </div>

            {/* Bottom Live Data Stream Event Feed */}
            <div className="p-3.5 bg-black/40 rounded-xl border border-white/5 flex items-center justify-between gap-3 overflow-hidden">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center shrink-0">
                  <RefreshCw className="w-3 h-3 text-[#00F59B] animate-spin" style={{ animationDuration: '6s' }} />
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeEventIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-wrap items-center gap-2 text-[11px] font-mono"
                  >
                    <span className="text-slate-400 font-semibold">[{telemetryEvents[activeEventIndex].source}]</span>
                    <span className="text-slate-200">{telemetryEvents[activeEventIndex].action}:</span>
                    <span className={`font-bold ${telemetryEvents[activeEventIndex].color}`}>
                      {telemetryEvents[activeEventIndex].metric}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
              <span className="text-[9px] font-mono text-slate-500 shrink-0 hidden sm:inline">
                {telemetryEvents[activeEventIndex].time}
              </span>
            </div>
          </div>

          {/* Right: Real-time Growth Pillars & Channel Telemetry (5 Columns) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-emerald-500/20">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#00F59B] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                ACTIVE GROWTH CHANNELS
              </span>
              <span className="text-[9px] font-mono text-slate-400">STATUS: OPTIMIZED</span>
            </div>

            {/* Channels List Cards */}
            <div className="space-y-3">
              {/* Meta / Paid Ads */}
              <div className="p-3.5 rounded-2xl bg-[#04140b]/80 border border-emerald-500/20 hover:border-emerald-500/50 transition-all flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                    <Target className="w-4 h-4 text-[#00F59B]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-tight font-display">Meta & Google Ads</h4>
                    <p className="text-[10px] text-slate-400 font-mono">High-Converting Ad Sets</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-[#00F59B] block">4.8x - 6.2x</span>
                  <span className="text-[9px] text-slate-400 font-mono">ROAS Generated</span>
                </div>
              </div>

              {/* SEO Dominance */}
              <div className="p-3.5 rounded-2xl bg-[#04140b]/80 border border-emerald-500/20 hover:border-emerald-500/50 transition-all flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                    <Search className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-tight font-display">Organic SEO Engine</h4>
                    <p className="text-[10px] text-slate-400 font-mono">Keyword Ranks #1-#3</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-amber-300 block">+240%</span>
                  <span className="text-[9px] text-slate-400 font-mono">Organic Traffic</span>
                </div>
              </div>

              {/* Social Growth & Viral Reach */}
              <div className="p-3.5 rounded-2xl bg-[#04140b]/80 border border-emerald-500/20 hover:border-emerald-500/50 transition-all flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                    <Share2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-tight font-display">Social Authority</h4>
                    <p className="text-[10px] text-slate-400 font-mono">Content & Viral Reach</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-emerald-400 block">+480k</span>
                  <span className="text-[9px] text-slate-400 font-mono">Monthly Reach</span>
                </div>
              </div>

              {/* CRO & Funnel Multiplier */}
              <div className="p-3.5 rounded-2xl bg-[#04140b]/80 border border-emerald-500/20 hover:border-emerald-500/50 transition-all flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                    <Zap className="w-4 h-4 text-[#00F59B]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-tight font-display">Sales Funnel / CRO</h4>
                    <p className="text-[10px] text-slate-400 font-mono">Checkout Optimization</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-[#00F59B] block">-42% CPL</span>
                  <span className="text-[9px] text-slate-400 font-mono">Lower Lead Cost</span>
                </div>
              </div>
            </div>

            {/* Quick Action Consultation Prompt */}
            <div className="p-3 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent rounded-xl border border-emerald-500/20 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#00F59B] shrink-0" />
                <span className="text-[10px] text-slate-300 font-medium font-mono">Custom Strategy Tailored To Your Brand</span>
              </div>
              <a 
                href="#contact"
                className="text-[10px] font-mono font-bold uppercase text-[#00F59B] hover:text-white flex items-center gap-1 shrink-0 transition-colors"
              >
                <span>Scale Now</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
