import React, { useEffect, useState, useRef } from 'react';
import { useFacebookSDK } from './FacebookSDK';
import LoadingSkeleton from './LoadingSkeleton';
import { ExternalLink, RefreshCw, Facebook, CheckCircle2, ShieldAlert } from 'lucide-react';

interface FacebookPageEmbedProps {
  pageUrl?: string;
}

export default function FacebookPageEmbed({ 
  pageUrl = 'https://www.facebook.com/akashcollection.pk' 
}: FacebookPageEmbedProps) {
  const { isLoaded, error } = useFacebookSDK();
  const [showFallback, setShowFallback] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Monitor loading status
  useEffect(() => {
    if (error) {
      setShowFallback(true);
    }
  }, [error]);

  // Handle re-parsing on load/resize to ensure adapt-container-width is strictly respected
  useEffect(() => {
    if (isLoaded && window.FB) {
      try {
        window.FB.XFBML.parse(containerRef.current);
      } catch (err) {
        console.warn('XFBML parse warning:', err);
      }
    }
  }, [isLoaded]);

  // Give the embed 5 seconds to mount, else show fallback safely to preserve Lighthouse CLS / speed index
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoaded) {
        setShowFallback(true);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [isLoaded]);

  if (showFallback) {
    return (
      <div 
        className="w-full bg-gradient-to-br from-stone-50 to-stone-100 border border-stone-200 rounded-2xl p-6 sm:p-8 text-center space-y-6 shadow-lg flex flex-col items-center justify-center h-[500px]"
        id="facebook-fallback-panel"
      >
        <div className="bg-blue-600 p-4 rounded-full text-white shadow-md animate-pulse">
          <Facebook size={28} className="fill-current" />
        </div>

        <div className="space-y-2 max-w-sm">
          <div className="flex items-center justify-center gap-1.5">
            <h4 className="font-serif text-lg font-bold text-stone-900 uppercase tracking-wide">
              Akash Collection
            </h4>
            <CheckCircle2 size={16} className="text-blue-500 fill-blue-50" />
          </div>
          <p className="text-xs text-stone-500 leading-relaxed font-sans">
            Our live Facebook feed is currently blocked by your browser's ad-blocker or strict tracking protection. Click below to follow us directly for wholesale launches, reels, and premium live catalogs.
          </p>
        </div>

        {/* Warning Badge */}
        <div className="bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-mono uppercase tracking-wider py-1.5 px-3 rounded-full flex items-center gap-1.5">
          <ShieldAlert size={12} className="text-amber-600" />
          <span>Shield / AdBlocker Active</span>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={() => setShowFallback(false)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-stone-300 hover:border-stone-900 text-xs font-mono text-stone-700 hover:text-stone-950 bg-white transition-all shadow-sm"
          >
            <RefreshCw size={13} className="animate-spin-slow" />
            <span>Retry Feed</span>
          </button>

          <a
            href={pageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <span>Visit Facebook Page</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full" ref={containerRef} id="facebook-embed-root-frame">
      {/* Show Loading Skeleton while SDK is booting or network is fetching */}
      {!isLoaded && <LoadingSkeleton />}

      <div 
        className="fb-page" 
        data-href={pageUrl}
        data-tabs="timeline" 
        data-width="500" 
        data-height="500" 
        data-small-header="false" 
        data-adapt-container-width="true" 
        data-hide-cover="false" 
        data-show-facepile="true"
        style={{ width: '100%', minHeight: '500px' }}
      />
    </div>
  );
}
