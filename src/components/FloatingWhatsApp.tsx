import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageCircle, ShoppingBag, Send, PhoneCall, HelpCircle } from 'lucide-react';

interface FloatingWhatsAppProps {
  catalogUrl?: string;
  fallbackUrl?: string;
  onShareSuccess?: (title: string, message: string) => void;
}

export default function FloatingWhatsApp({
  catalogUrl = 'https://wa.me/c/923115930237',
  fallbackUrl = 'https://wa.me/923115930237',
  onShareSuccess
}: FloatingWhatsAppProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showMessageHint, setShowMessageHint] = useState(false);

  // Trigger a friendly popup hint after 4 seconds of session load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessageHint(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenLink = (url: string) => {
    setIsOpen(false);
    setShowMessageHint(false);
    
    const start = Date.now();
    const win = window.open(url, '_blank', 'noopener,noreferrer');
    
    // Check fallback
    setTimeout(() => {
      if (!win || win.closed || Date.now() - start < 100) {
        window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
      }
    }, 500);

    if (onShareSuccess) {
      onShareSuccess('Connecting...', 'Redirecting you to our official WhatsApp channel!');
    }
  };

  return (
    <>
      {/* 1. STICKY MOBILE "SHOP ON WHATSAPP" FOOTER BUTTON */}
      <div 
        className="fixed bottom-0 inset-x-0 z-[990] bg-stone-900/95 backdrop-blur border-t border-emerald-900/30 py-3 px-4 flex items-center justify-between gap-4 block md:hidden shadow-[0_-10px_20px_rgba(0,0,0,0.3)]"
        id="sticky-mobile-whatsapp-bar"
      >
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
          <div className="text-left">
            <span className="font-mono text-[9px] tracking-wider text-emerald-400 font-bold block uppercase leading-none">Catalog Live</span>
            <span className="text-[11px] font-serif font-bold text-stone-200 uppercase">AKASH COLLECTION</span>
          </div>
        </div>
        
        <button
          onClick={() => handleOpenLink(catalogUrl)}
          className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold tracking-widest text-[10px] uppercase py-2.5 px-4 rounded-lg shadow-md transition-all active:scale-95"
          title="Shop Catalog on WhatsApp"
        >
          <ShoppingBag size={12} />
          <span>Shop on WhatsApp</span>
        </button>
      </div>

      {/* 2. FLOATING WIDGET ELEMENT */}
      <div className="fixed bottom-16 sm:bottom-6 right-4 sm:right-6 z-[995] flex flex-col items-end pointer-events-none" id="floating-whatsapp-widget-container">
        
        {/* Floating Chat Assistant Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ duration: 0.25 }}
              className="mb-4 bg-white border border-stone-200 shadow-2xl rounded-2xl w-72 overflow-hidden origin-bottom-right pointer-events-auto flex flex-col"
              id="whatsapp-chat-assistant-panel"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 p-4 text-white relative">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 text-emerald-200 hover:text-white transition-colors"
                  title="Close Menu"
                >
                  <X size={16} />
                </button>
                
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center font-serif text-white font-bold text-sm border border-white/20">
                      AC
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-emerald-800 rounded-full" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm leading-tight">Akash Collection</h4>
                    <span className="text-[10px] text-emerald-200 font-mono tracking-wide">Support agent • Online</span>
                  </div>
                </div>
              </div>

              {/* Chat body */}
              <div className="p-4 bg-stone-50 space-y-3 flex-grow text-xs leading-relaxed max-h-[220px] overflow-y-auto">
                <div className="bg-white p-3 rounded-lg border border-stone-100 shadow-sm text-stone-700">
                  <p className="font-medium text-[11px] text-stone-900 mb-1">Salam & Welcome! 🙏</p>
                  <p>Browse our complete inventory directly inside our WhatsApp Catalog or send us catalog articles to book your order instantly.</p>
                </div>
                
                <div className="bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100 text-emerald-850">
                  <span className="font-mono text-[9px] tracking-wider uppercase font-bold text-emerald-700 block mb-0.5">Quick Stat</span>
                  <p>Fast dispatch nationwide. Shipping Islamabad and major cities in 24-48 hours!</p>
                </div>
              </div>

              {/* Dynamic Option Links */}
              <div className="border-t border-stone-100 p-3 space-y-1.5 bg-white">
                <button
                  onClick={() => handleOpenLink(catalogUrl)}
                  className="w-full flex items-center gap-2.5 p-2 rounded-lg hover:bg-stone-50 border border-stone-100 text-left transition-all group/opt"
                >
                  <div className="bg-emerald-100 text-emerald-600 p-1.5 rounded-md group-hover/opt:bg-emerald-600 group-hover/opt:text-white transition-all">
                    <ShoppingBag size={13} />
                  </div>
                  <div>
                    <p className="font-bold text-stone-900 text-[11px]">Browse Full Catalog</p>
                    <p className="text-[9px] text-stone-400 font-mono">View all unstitched & pret pieces</p>
                  </div>
                </button>

                <button
                  onClick={() => handleOpenLink(fallbackUrl)}
                  className="w-full flex items-center gap-2.5 p-2 rounded-lg hover:bg-stone-50 border border-stone-100 text-left transition-all group/opt"
                >
                  <div className="bg-emerald-100 text-emerald-600 p-1.5 rounded-md group-hover/opt:bg-emerald-600 group-hover/opt:text-white transition-all">
                    <PhoneCall size={13} />
                  </div>
                  <div>
                    <p className="font-bold text-stone-900 text-[11px]">Chat with Representative</p>
                    <p className="text-[9px] text-stone-400 font-mono">Order support & queries</p>
                  </div>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Greeting Bubble Tip */}
        <AnimatePresence>
          {showMessageHint && !isOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: 20 }}
              className="mb-2 mr-1 bg-stone-950 border border-stone-850 text-stone-200 font-sans text-[11px] py-2 px-3 rounded-xl shadow-2xl whitespace-nowrap pointer-events-auto flex items-center gap-2 max-w-xs relative"
              id="whatsapp-chat-hint-bubble"
            >
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
              <span>Browse our catalog on WhatsApp!</span>
              <button 
                onClick={() => setShowMessageHint(false)} 
                className="text-stone-400 hover:text-white p-0.5 ml-1"
                title="Dismiss"
              >
                <X size={10} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Primary Floating Action Button (FAB) */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setShowMessageHint(false);
          }}
          className="bg-stone-900 border border-stone-800 text-white shadow-2xl rounded-full p-4 flex items-center justify-center hover:bg-stone-850 hover:scale-105 active:scale-95 transition-all duration-300 pointer-events-auto relative cursor-pointer"
          id="floating-whatsapp-trigger"
          title="WhatsApp Catalog Assistant"
        >
          {/* Animated notification ping */}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-stone-900 flex items-center justify-center text-[8px] font-mono font-black text-stone-950 animate-bounce">
              1
            </span>
          )}

          {isOpen ? (
            <X size={20} className="text-emerald-400" />
          ) : (
            <MessageCircle size={22} className="text-emerald-400 fill-emerald-950/20" />
          )}
        </button>
      </div>
    </>
  );
}
