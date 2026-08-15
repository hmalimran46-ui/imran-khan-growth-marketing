import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  Search, 
  Share2, 
  Target, 
  Video, 
  BarChart3, 
  Zap, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Globe, 
  Youtube, 
  Facebook, 
  Instagram, 
  DollarSign, 
  MousePointerClick, 
  FileText, 
  PieChart, 
  Activity, 
  Compass, 
  ArrowUpRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface SkillItem {
  id: string;
  category: 'all' | 'strategy' | 'seo' | 'social' | 'paid' | 'content' | 'analytics';
  categoryLabel: string;
  title: string;
  description: string;
  icon: any;
  metric: string;
  metricLabel: string;
  tags: string[];
}

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const { setContactModalOpen } = useContent();

  const categories = [
    { id: 'all', label: 'All Capabilities', count: 24 },
    { id: 'strategy', label: 'Growth Strategy', count: 4 },
    { id: 'paid', label: 'Paid Advertising (PPC)', count: 4 },
    { id: 'seo', label: 'SEO & Search', count: 4 },
    { id: 'social', label: 'Social Media', count: 4 },
    { id: 'content', label: 'Content & Creative', count: 4 },
    { id: 'analytics', label: 'Analytics & Tracking', count: 4 },
  ];

  const skillsList: SkillItem[] = [
    // 1. Growth Strategy
    {
      id: 'strat-1',
      category: 'strategy',
      categoryLabel: 'Growth Strategy',
      title: 'Digital Marketing Strategy',
      description: 'End-to-end multi-channel acquisition blueprints designed for predictable pipeline growth and market dominance.',
      icon: Compass,
      metric: '5.2x',
      metricLabel: 'Avg Pipeline Multiple',
      tags: ['Acquisition Model', 'Market Penetration', 'Go-To-Market']
    },
    {
      id: 'strat-2',
      category: 'strategy',
      categoryLabel: 'Growth Strategy',
      title: 'Performance Marketing',
      description: 'Laser-targeted conversion campaigns where every single dollar spent is measured against direct revenue and ROAS.',
      icon: TrendingUp,
      metric: '+340%',
      metricLabel: 'ROAS Acceleration',
      tags: ['Revenue Modeling', 'Ad Spend Efficiency', 'Conversion Funnel']
    },
    {
      id: 'strat-3',
      category: 'strategy',
      categoryLabel: 'Growth Strategy',
      title: 'Brand Positioning & Promotion',
      description: 'Crafting authoritative brand presence that differentiates your enterprise and builds long-term pricing power.',
      icon: Award,
      metric: 'Top Tier',
      metricLabel: 'Market Authority',
      tags: ['Brand Narrative', 'Competitive Moat', 'Trust Architecture']
    },
    {
      id: 'strat-4',
      category: 'strategy',
      categoryLabel: 'Growth Strategy',
      title: 'Growth Marketing & Scaling',
      description: 'Rapid-experimentation loops across acquisition, activation, and retention to unlock exponential business scale.',
      icon: Zap,
      metric: '4.8x',
      metricLabel: 'Customer Lifetime Val',
      tags: ['Viral Loops', 'Retention Sprints', 'LTV Expansion']
    },

    // 2. Paid Advertising
    {
      id: 'paid-1',
      category: 'paid',
      categoryLabel: 'Paid Advertising',
      title: 'Facebook & Instagram (Meta) Ads',
      description: 'High-intent audience mining, dynamic creative testing, and algorithmic scaling that drives massive e-commerce and B2B orders.',
      icon: Target,
      metric: '6.4x',
      metricLabel: 'Peak Campaign ROAS',
      tags: ['Meta CBO/ABO', 'Advantage+ Campaigns', 'Retargeting']
    },
    {
      id: 'paid-2',
      category: 'paid',
      categoryLabel: 'Paid Advertising',
      title: 'Google Ads (Search & Performance Max)',
      description: 'Capturing bottom-of-funnel buyer intent with high-converting search keywords, shopping feeds, and smart bidding.',
      icon: DollarSign,
      metric: '9.4%',
      metricLabel: 'Average Click-Through',
      tags: ['PMax Mastery', 'Exact Match Intent', 'Negative Keywords']
    },
    {
      id: 'paid-3',
      category: 'paid',
      categoryLabel: 'Paid Advertising',
      title: 'Paid Campaign Optimization',
      description: 'Continuous bid adjustment, creative fatigue mitigation, and budget re-allocation toward top 1% performing ad sets.',
      icon: Activity,
      metric: '-38%',
      metricLabel: 'Cost Per Acquisition',
      tags: ['Bid Scaling', 'Dayparting Strategy', 'Creative Refresh']
    },
    {
      id: 'paid-4',
      category: 'paid',
      categoryLabel: 'Paid Advertising',
      title: 'High-Intent Lead Generation',
      description: 'Multi-step qualifier forms and interactive lead funnels that deliver qualified appointments directly to sales teams.',
      icon: MousePointerClick,
      metric: '3.2x',
      metricLabel: 'Lead-to-Close Rate',
      tags: ['Lead Qualification', 'Automated Routing', 'Instant Follow-Up']
    },

    // 3. SEO & Search
    {
      id: 'seo-1',
      category: 'seo',
      categoryLabel: 'SEO & Search',
      title: 'Search Engine Optimization (SEO)',
      description: 'Comprehensive organic ranking strategies that position your domain on Page #1 for competitive high-value keywords.',
      icon: Search,
      metric: '+240%',
      metricLabel: 'Organic Traffic Lift',
      tags: ['Rank Dominance', 'SERP Featured Snippet', 'Search Intent']
    },
    {
      id: 'seo-2',
      category: 'seo',
      categoryLabel: 'SEO & Search',
      title: 'Technical & On-Page SEO',
      description: 'Core Web Vitals tuning, schema markup architecture, internal linking, and content hierarchy for search spiders.',
      icon: Layers,
      metric: '99/100',
      metricLabel: 'PageSpeed & Health',
      tags: ['Schema Markup', 'Site Architecture', 'Crawl Budget']
    },
    {
      id: 'seo-3',
      category: 'seo',
      categoryLabel: 'SEO & Search',
      title: 'Keyword Research & Clustering',
      description: 'Uncovering untapped search volume, commercial intent phrases, and topical authority clusters with low difficulty.',
      icon: Globe,
      metric: '150+',
      metricLabel: 'Target Commercial Terms',
      tags: ['Topical Maps', 'Search Volume Mining', 'Semantic Entities']
    },
    {
      id: 'seo-4',
      category: 'seo',
      categoryLabel: 'SEO & Search',
      title: 'YouTube SEO & Video Rankings',
      description: 'Optimizing video metadata, tags, engagement velocity, and retention graphs to dominate YouTube search results.',
      icon: Youtube,
      metric: 'Top 3',
      metricLabel: 'Video Rank Position',
      tags: ['VSEO Optimization', 'CTR Thumbnails', 'Retention Velocity']
    },

    // 4. Social Media
    {
      id: 'soc-1',
      category: 'social',
      categoryLabel: 'Social Media',
      title: 'Social Media Marketing & Strategy',
      description: 'Omni-channel brand resonance across Instagram, Facebook, LinkedIn, and TikTok that transforms followers into buyers.',
      icon: Share2,
      metric: '+480k',
      metricLabel: 'Monthly Impressions',
      tags: ['Brand Voice', 'Content Calendars', 'Platform Algorithms']
    },
    {
      id: 'soc-2',
      category: 'social',
      categoryLabel: 'Social Media',
      title: 'Social Media Management',
      description: 'Consistent publishing schedules, community engagement, brand monitoring, and active relationship building.',
      icon: Activity,
      metric: '100%',
      metricLabel: 'Schedule Reliability',
      tags: ['Publishing Grid', 'Direct Inbox Funnel', 'Social Listening']
    },
    {
      id: 'soc-3',
      category: 'social',
      categoryLabel: 'Social Media',
      title: 'Audience Growth & Expansion',
      description: 'Targeted demographic building techniques that attract high-net-worth clients, repeat buyers, and loyal evangelists.',
      icon: TrendingUp,
      metric: '4.6x',
      metricLabel: 'Follower Conversion',
      tags: ['Audience Mining', 'Influencer Collabs', 'Organic Hype']
    },
    {
      id: 'soc-4',
      category: 'social',
      categoryLabel: 'Social Media',
      title: 'Community Engagement & Loyalty',
      description: 'Active comment moderation, conversational story polls, and VIP community groups that multiply client lifetime value.',
      icon: ShieldCheck,
      metric: '8.8%',
      metricLabel: 'Engagement Benchmark',
      tags: ['Community Sprints', 'Direct Messaging', 'Loyalty Nurture']
    },

    // 5. Content & Creative Strategy
    {
      id: 'cont-1',
      category: 'content',
      categoryLabel: 'Content Strategy',
      title: 'High-Converting Copywriting',
      description: 'Psychological sales copy, compelling ad hooks, and high-converting landing page headlines that prompt immediate action.',
      icon: FileText,
      metric: '3.8x',
      metricLabel: 'Click Conversion Rate',
      tags: ['Direct Response', 'AIDA Framework', 'Headline Testing']
    },
    {
      id: 'cont-2',
      category: 'content',
      categoryLabel: 'Content Strategy',
      title: 'Video Content & Reels Strategy',
      description: 'Scroll-stopping short-form video hooks, visual pacing, and high-retention formats engineered for viral algorithmic distribution.',
      icon: Video,
      metric: '1.2M+',
      metricLabel: 'Combined Video Views',
      tags: ['Reels / TikTok Hooks', 'Visual Storytelling', 'Retention Spikes']
    },
    {
      id: 'cont-3',
      category: 'content',
      categoryLabel: 'Content Strategy',
      title: 'YouTube Channel & Shorts Growth',
      description: 'Strategic video sequencing, playlist architecture, and subscriber conversion funnels for creator and brand channels.',
      icon: Youtube,
      metric: '+85%',
      metricLabel: 'Subscriber Velocity',
      tags: ['Thumbnail Strategy', 'Channel Packaging', 'Shorts Funnel']
    },
    {
      id: 'cont-4',
      category: 'content',
      categoryLabel: 'Content Strategy',
      title: 'Creative Ad Direction & Assets',
      description: 'Designing eye-popping banners, product showcase graphics, and carousel storytelling tailored for high CTR.',
      icon: Sparkles,
      metric: '4.2%',
      metricLabel: 'Ad CTR Average',
      tags: ['Static Ad Creative', 'Motion Graphics', 'Visual Polish']
    },

    // 6. Analytics & Intelligence
    {
      id: 'ana-1',
      category: 'analytics',
      categoryLabel: 'Analytics & Data',
      title: 'Google Analytics 4 (GA4) & GTM',
      description: 'Server-side tracking, Google Tag Manager container setup, custom event triggers, and automated conversion funnels.',
      icon: BarChart3,
      metric: '100%',
      metricLabel: 'Data Tracking Accuracy',
      tags: ['GA4 Mastery', 'Server GTM', 'Custom Dimension Setup']
    },
    {
      id: 'ana-2',
      category: 'analytics',
      categoryLabel: 'Analytics & Data',
      title: 'Conversion Tracking & Meta CAPI',
      description: 'First-party data collection with Meta Conversions API (CAPI) bypass for iOS privacy limits and 9.8/10 Event Quality Score.',
      icon: PieChart,
      metric: '9.8 / 10',
      metricLabel: 'Event Quality Score',
      tags: ['Meta CAPI', 'Offline Conversions', 'Pixel Safeguard']
    },
    {
      id: 'ana-3',
      category: 'analytics',
      categoryLabel: 'Analytics & Data',
      title: 'Campaign Performance Analysis',
      description: 'Granular weekly cohort breakdowns, cross-channel attribution modeling, and customer acquisition cost benchmarking.',
      icon: Activity,
      metric: 'Real-time',
      metricLabel: 'Telemetry Dashboard',
      tags: ['Cohort Analysis', 'Attribution Matrix', 'CPA Benchmarks']
    },
    {
      id: 'ana-4',
      category: 'analytics',
      categoryLabel: 'Analytics & Data',
      title: 'ROI & Data-Driven Marketing',
      description: 'Translating complex analytical dashboards into clear, actionable executive decisions that maximize capital efficiency.',
      icon: Target,
      metric: '100%',
      metricLabel: 'P&L Transparency',
      tags: ['Executive Reports', 'Profit Optimization', 'Budget Forecasts']
    }
  ];

  const filteredSkills = skillsList.filter(
    skill => activeCategory === 'all' || skill.category === activeCategory
  );

  return (
    <section id="skills" className="py-28 px-6 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] bg-emerald-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[350px] bg-[#00F59B]/5 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[#00F59B] text-xs font-mono font-bold uppercase tracking-[0.25em] mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>FULL-SPECTRUM MARKETING MATRIX</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight font-display mb-6 leading-[1.05]"
          >
            Elite Digital Skills & <span className="text-gradient">Capabilities</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-base sm:text-lg font-light leading-relaxed"
          >
            A battle-tested repertoire of analytical, creative, and technical competencies designed to engineer high-velocity brand growth.
          </motion.p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-14 max-w-5xl mx-auto">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500 to-[#00F59B] text-black shadow-[0_10px_25px_rgba(0,245,155,0.35)] scale-105'
                    : 'bg-[#04140b]/80 text-slate-300 border border-emerald-500/20 hover:border-emerald-500/50 hover:bg-white/[0.05]'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                  isActive ? 'bg-black/20 text-black font-bold' : 'bg-white/10 text-emerald-400'
                }`}>
                  {cat.id === 'all' ? skillsList.length : skillsList.filter(s => s.category === cat.id).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  layout
                  key={skill.id}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.35, delay: index * 0.03 }}
                  className="group relative p-7 sm:p-8 rounded-[2rem] bg-[#04140b]/85 backdrop-blur-2xl border border-emerald-500/20 hover:border-[#00F59B]/50 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,245,155,0.15)] flex flex-col justify-between"
                >
                  {/* Subtle Inner Glow on Hover */}
                  <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Card Upper Info */}
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-6">
                      {/* Geometric Icon */}
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-[#00F59B]/10 border border-emerald-500/30 flex items-center justify-center text-[#00F59B] group-hover:scale-110 group-hover:bg-[#00F59B] group-hover:text-black transition-all duration-300 shadow-[0_5px_15px_rgba(0,245,155,0.15)]">
                        <Icon className="w-6 h-6" />
                      </div>

                      {/* Performance Metric Badge */}
                      <div className="text-right">
                        <span className="text-base sm:text-lg font-black font-display text-[#00F59B] block">
                          {skill.metric}
                        </span>
                        <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400">
                          {skill.metricLabel}
                        </span>
                      </div>
                    </div>

                    {/* Skill Category Indicator */}
                    <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-emerald-400 block mb-2">
                      {skill.categoryLabel}
                    </span>

                    {/* Skill Title */}
                    <h3 className="text-xl font-black text-white uppercase tracking-tight font-display mb-3 group-hover:text-[#00F59B] transition-colors leading-snug">
                      {skill.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-300 text-sm font-light leading-relaxed mb-6">
                      {skill.description}
                    </p>
                  </div>

                  {/* Card Tags / Footer */}
                  <div className="pt-4 border-t border-white/5 flex flex-wrap items-center gap-1.5">
                    {skill.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono font-medium text-slate-300 bg-white/[0.03] border border-white/10 px-2.5 py-1 rounded-lg group-hover:border-emerald-500/30 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-8 sm:p-12 rounded-[2.5rem] bg-gradient-to-r from-[#04140b] via-[#062414] to-[#04140b] border border-emerald-500/30 text-center shadow-[0_25px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl"
        >
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-[#00F59B] text-xs font-mono font-bold uppercase tracking-[0.3em]">
              DEPLOY STRATEGIC ADVANTAGE
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight font-display">
              Need a Custom Multi-Channel Growth Sprint?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
              Combine paid traffic, technical SEO, and high-converting copy into a unified revenue architecture.
            </p>
            <div className="pt-4">
              <button
                onClick={() => setContactModalOpen(true)}
                className="btn-primary px-8 py-4 text-xs tracking-widest cursor-pointer inline-flex items-center gap-2"
              >
                <span>BOOK STRATEGIC AUDIT</span>
                <ArrowUpRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
