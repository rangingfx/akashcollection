import React, { useEffect, useState, useRef } from 'react';
import { useTikTokSDK } from './TikTokSDK';
import { RefreshCw, CheckCircle2, ShieldAlert, Video, ExternalLink, MessageCircle } from 'lucide-react';

interface TikTokProfileEmbedProps {
  username?: string;
}

export default function TikTokProfileEmbed({ 
  username = 'akashcollection.pk' 
}: TikTokProfileEmbedProps) {
  const { isLoaded, error } = useTikTokSDK();
  const [showFallback, setShowFallback] = useState(false);
  const embedRef = useRef<HTMLDivElement>(null);

  const profileUrl = `https://www.tiktok.com/@${username}`;

  useEffect(() => {
    if (error) {
      setShowFallback(true);
    }
  }, [error]);

  // Give the script a maximum of 5 seconds to run, otherwise use the beautiful, responsive custom fallback card
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoaded) {
        setShowFallback(true);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [isLoaded]);

  // Trigger TikTok embed parser hook if already loaded
  useEffect(() => {
    if (isLoaded && (window as any).twttr || (window as any).tiktokTools) {
      // Sometimes TikTok script requires reprocessing widgets manually
      // We can also let the standard script parse on mount
    }
  }, [isLoaded]);

  if (showFallback) {
    return (
      <div 
        className="w-full bg-gradient-to-br from-stone-900 to-stone-950 border border-stone-800 rounded-2xl p-6 sm:p-8 text-center space-y-6 shadow-2xl flex flex-col items-center justify-center min-h-[450px]"
        id="tiktok-profile-fallback-panel"
      >
        {/* Colorful TikTok Pulsing logo */}
        <div className="relative">
          <div className="absolute inset-0 bg-cyan-500 rounded-full blur-md opacity-40 animate-ping" />
          <div className="absolute inset-0 bg-pink-500 rounded-full blur-md opacity-40 animate-pulse" />
          <div className="relative bg-black p-4 rounded-full text-white border border-stone-700 shadow-xl flex items-center justify-center">
            {/* TikTok Styled SVG path */}
            <svg className="w-8 h-8 fill-current text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.94 1.18 2.22 2.01 3.63 2.44v3.91a10.635 10.635 0 01-5.18-2.22c-.1.08-.13.16-.13.26.02 2.22.01 4.44.02 6.66-.03 2.09-.49 4.19-1.52 6a7.615 7.615 0 01-6.19 3.7c-2.48.24-5-.65-6.66-2.52a8.535 8.535 0 01-2.13-5.71c-.01-2.51 1.12-4.98 3.12-6.5a7.925 7.925 0 017.38-1.12v4.01a4.235 4.235 0 00-3.32 1.34 4.545 4.545 0 00-.91 4.56c.42 1.63 1.84 2.87 3.51 3.05 1.5.17 3.03-.45 3.82-1.74.45-.73.65-1.58.64-2.43V.02z" />
            </svg>
          </div>
        </div>

        <div className="space-y-2 max-w-sm">
          <div className="flex items-center justify-center gap-1.5">
            <h4 className="font-serif text-lg font-bold text-stone-100 uppercase tracking-wide">
              @{username}
            </h4>
            <CheckCircle2 size={16} className="text-pink-500 fill-pink-50" />
          </div>
          <p className="text-xs text-stone-400 leading-relaxed font-sans">
            Follow our trending TikTok channel for luxury unstitched lawn reels, boutique showcases, and genuine stock reviews. Enjoy factory-direct shipping across Islamabad and Pakistan!
          </p>
        </div>

        {/* Status indicator */}
        <div className="bg-stone-800 text-stone-300 border border-stone-750 text-[10px] font-mono uppercase tracking-wider py-1.5 px-3 rounded-full flex items-center gap-1.5">
          <ShieldAlert size={12} className="text-pink-500" />
          <span>Interactive Player Blocked</span>
        </div>

        {/* CTA Docks */}
        <div className="flex flex-wrap gap-3 justify-center pt-2">
          <button
            onClick={() => setShowFallback(false)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-stone-700 hover:border-stone-500 text-xs font-mono text-stone-300 hover:text-white bg-stone-850 transition-all shadow-sm"
          >
            <RefreshCw size={13} className="animate-spin-slow" />
            <span>Load Interactive Profile</span>
          </button>

          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-5 py-2.5 bg-pink-600 hover:bg-pink-500 text-white font-mono text-xs font-bold uppercase rounded-lg shadow-lg hover:shadow-pink-600/30 transition-all"
          >
            <span>Open TikTok Profile</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full flex justify-center" ref={embedRef} id="tiktok-embed-container-frame">
      {/* Fallback load safety wrapper */}
      <blockquote 
        className="tiktok-embed w-full max-w-[500px]" 
        data-unique-id={username} 
        data-embed-type="creator" 
        style={{ minWidth: '288px', background: '#0c0a09', borderRadius: '16px', overflow: 'hidden' }}
      >
        <section className="p-6 text-center text-stone-400">
          <a 
            target="_blank" 
            rel="noopener noreferrer" 
            href={`${profileUrl}?refer=creator_embed`}
            className="text-pink-400 hover:underline font-mono text-xs uppercase"
          >
            @{username} on TikTok
          </a>
        </section>
      </blockquote>
    </div>
  );
}
