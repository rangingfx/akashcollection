import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Video, Play, Sparkles, MessageCircle, ExternalLink, ArrowRight, Heart, Users, ShieldCheck, HelpCircle } from 'lucide-react';
import TikTokProfileEmbed from './TikTokProfileEmbed';
import TikTokVideoGrid from './TikTokVideoGrid';

export default function TikTokSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const profileUrl = 'https://www.tiktok.com/@akashcollection.pk';

  // Lazy-load using Intersection Observer to protect Lighthouse/performance scores
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only load once
        }
      },
      { rootMargin: '200px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Creator metrics for social proof styling
  const creatorMetrics = [
    {
      icon: <Users className="text-cyan-400 w-5 h-5" />,
      title: "Active Followers",
      value: "20,000+",
      desc: "Lawn enthusiasts and retail partners tuned in daily."
    },
    {
      icon: <Heart className="text-pink-500 w-5 h-5" />,
      title: "Total Video Likes",
      value: "150K+",
      desc: "Reactions on our real fabric reviews & suit previews."
    },
    {
      icon: <ShieldCheck className="text-emerald-400 w-5 h-5" />,
      title: "100% Original Fabric",
      value: "Guaranteed",
      desc: "Clear high-definition video inspections before you order."
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="bg-stone-950 py-20 px-4 sm:px-6 lg:px-8 border-t border-stone-900 relative overflow-hidden text-white" 
      id="tiktok-showroom-section"
    >
      {/* Dynamic background glowing abstract shapes */}
      <div className="absolute top-1/3 left-[-15%] w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-[-15%] w-[450px] h-[450px] bg-pink-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        {/* Modern Header block */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          {/* Neon/Pulse TikTok Badge */}
          <div className="inline-flex items-center gap-2 bg-stone-900 border border-stone-800 text-stone-200 px-4 py-1.5 rounded-full shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
            </span>
            <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-stone-300">WATCH ON THE GO</span>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-wide uppercase leading-tight text-white">
              Follow Akash Collection <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-cyan-400 via-white to-pink-500 bg-clip-text text-transparent font-extrabold">On TikTok</span>
            </h2>
            <div className="w-16 h-[1.5px] bg-gradient-to-r from-cyan-500 to-pink-500 mx-auto rounded-full" />
            <p className="text-stone-400 text-xs sm:text-sm font-sans leading-relaxed">
              Watch our latest fashion collections, styling videos, product showcases, and exclusive offers. Check real fabric flow, unboxing reviews, and direct showroom walkthroughs.
            </p>
          </div>
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="tiktok-core-interactive-panel">
          
          {/* Left Column: Visual branding, stats, and custom callouts */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 text-left">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-cyan-400">
                  <Sparkles size={14} />
                  <span className="font-mono text-[10px] font-bold tracking-widest uppercase">VIRAL VIDEO SHOWROOM</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-100 uppercase">
                  Lawn Collection in High-Definition Action
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed font-sans">
                  We don't just sell suits; we show them. Watch unedited fabric fall videos, dupatta transparency tests, and embroidery details live from our wholesale desks.
                </p>
              </div>

              {/* TikTok creator stats cards */}
              <div className="space-y-3" id="tiktok-metrics-grid">
                {creatorMetrics.map((metric, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    whileHover={{ x: 4, backgroundColor: 'rgba(28, 25, 23, 0.6)' }}
                    className="bg-stone-900/40 border border-stone-800/60 p-4 rounded-xl flex items-start gap-4 transition-all group"
                  >
                    <div className="bg-stone-900 p-2.5 rounded-lg border border-stone-800 shadow-inner flex-shrink-0">
                      {metric.icon}
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-sm font-bold text-white tracking-tight">
                          {metric.value}
                        </span>
                      </div>
                      <h4 className="font-serif text-[11px] font-bold text-stone-300 uppercase tracking-wide">
                        {metric.title}
                      </h4>
                      <p className="text-[11px] text-stone-400 leading-relaxed font-sans">
                        {metric.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Reusable Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-pink-500 to-pink-600 hover:opacity-95 text-white font-mono font-bold tracking-widest text-[11px] uppercase shadow-lg shadow-pink-500/10 transition-all w-full sm:w-auto"
                title="Follow Akash Collection on TikTok"
              >
                <span>Follow on TikTok</span>
                <ArrowRight size={13} className="ml-0.5" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(41, 37, 36, 0.8)' }}
                whileTap={{ scale: 0.98 }}
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-stone-900 border border-stone-800 hover:bg-stone-850 text-stone-300 hover:text-white font-mono font-bold tracking-widest text-[11px] uppercase transition-all w-full sm:w-auto"
                title="Watch Trending Videos on TikTok"
              >
                <span>Watch Videos</span>
                <Play size={12} className="fill-current text-white" />
              </motion.a>
            </div>
          </div>

          {/* Right Column: Video Grid on top, plus official Creator Embed beneath/beside */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Show TikTok Video Grid */}
            <TikTokVideoGrid />

            {/* Official TikTok Profile Embed card with Glassmorphism */}
            <div className="bg-stone-900/30 border border-stone-850 p-4 sm:p-6 rounded-2xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-cyan-500/50 via-stone-850 to-pink-500/50" />
              
              {isVisible ? (
                <TikTokProfileEmbed username="akashcollection.pk" />
              ) : (
                <div className="w-full h-[150px] flex items-center justify-center bg-stone-900/40 border border-stone-850 rounded-xl">
                  <span className="text-xs font-mono text-stone-500 uppercase tracking-widest animate-pulse">
                    Scrolling to Profile Player...
                  </span>
                </div>
              )}

              {/* Sub-label */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-stone-900/80 text-[10px] font-mono text-stone-500">
                <span>Verified @akashcollection.pk Channel</span>
                <a 
                  href={profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-cyan-400 hover:underline"
                >
                  <span>Verify Profile</span>
                  <ExternalLink size={10} />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Credit line matching specifications */}
        <div className="pt-4 border-t border-stone-900/80 text-center">
          <p className="text-[10px] font-mono text-stone-500 uppercase tracking-widest">
            Powered By <a href="https://rangingfx.com" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-pink-500 transition-colors">RanginGfx.com</a>
          </p>
        </div>
      </div>
    </section>
  );
}
