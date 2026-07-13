import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Facebook, MessageSquare, ArrowRight, Sparkles, ExternalLink } from 'lucide-react';
import FacebookPageEmbed from './FacebookPageEmbed';
import SocialCard from './SocialCard';

export default function FacebookSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const pageUrl = 'https://www.facebook.com/akashcollection.pk';

  // Use Intersection Observer to lazy load the Facebook SDK script & iframe element
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only load once
        }
      },
      { rootMargin: '200px' } // Pre-load 200px before viewport entry
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-t border-stone-200/40 relative overflow-hidden" 
      id="facebook-section-dock"
    >
      {/* Decorative gradient glowing orb */}
      <div className="absolute top-1/4 right-[-10%] w-96 h-96 bg-blue-100/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-[-10%] w-96 h-96 bg-teal-100/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Header Block */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 border border-blue-100 px-3.5 py-1.5 rounded-full shadow-inner">
            <Facebook size={14} className="fill-current text-blue-600 animate-pulse" />
            <span className="font-mono text-[9px] font-bold uppercase tracking-wider">Stay Connected Live</span>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-2xl sm:text-4xl font-normal text-stone-900 tracking-wide uppercase leading-tight">
              Follow Akash Collection <br className="hidden sm:inline" />
              <span className="text-blue-600 font-bold">On Facebook</span>
            </h2>
            <div className="w-12 h-[1.5px] bg-blue-500 mx-auto rounded-full" />
            <p className="text-stone-500 text-xs sm:text-sm font-sans leading-relaxed">
              Explore our verified digital showroom page! Tune in to weekly live broadcasts, view unstitched collections, see genuine buyer testimonials, and purchase directly at unbeatable factory rates.
            </p>
          </div>
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="facebook-core-interactive-grid">
          {/* Left Column: Visual copy, statistics, callouts */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="space-y-2 text-left">
                <div className="flex items-center gap-1.5 text-blue-600">
                  <Sparkles size={14} />
                  <span className="font-mono text-[10px] font-bold tracking-widest uppercase">Community & Integrity</span>
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900 uppercase">
                  Pakistan's Direct Wholesale Clothing Desk
                </h3>
                <p className="text-xs text-stone-500 leading-relaxed font-sans">
                  We post direct warehouse previews, fabric density test reels, color bleeding guarantee announcements, and exclusive wholesale discount coupon codes weekly on our timeline.
                </p>
              </div>

              {/* Social Metrics supplementary component */}
              <SocialCard />
            </div>

            {/* Premium CTA Button */}
            <div className="text-left pt-4">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={pageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono font-bold tracking-widest text-[11px] uppercase shadow-lg shadow-blue-600/15 hover:shadow-blue-600/25 transition-all w-full sm:w-auto justify-center"
                title="Visit Official Facebook Page"
              >
                <span>Visit Facebook Page</span>
                <ExternalLink size={14} />
              </motion.a>
              <span className="text-[10px] font-mono text-stone-400 block mt-2 text-left sm:ml-1 uppercase tracking-wide">
                Powered By RanginGfx.com
              </span>
            </div>
          </div>

          {/* Right Column: Live Facebook Page Plugin Frame */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center bg-white p-3 sm:p-5 border border-stone-200/60 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 to-teal-500" />
            
            {/* Show plugin if within visibility window */}
            {isVisible ? (
              <FacebookPageEmbed pageUrl={pageUrl} />
            ) : (
              <div className="w-full h-[500px] flex items-center justify-center bg-stone-50 border border-stone-200 rounded-xl">
                <span className="text-xs font-mono text-stone-400 uppercase tracking-widest animate-pulse">
                  Scrolling to Live Embed...
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
