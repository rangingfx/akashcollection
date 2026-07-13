import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  MessageSquare, 
  Copy, 
  Check, 
  Share2, 
  ChevronRight, 
  Layers, 
  BadgeCheck, 
  PhoneCall, 
  Smartphone, 
  Activity, 
  Send,
  Zap,
  Tag
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import QRCodeCard from './QRCodeCard';
import CatalogCTA from './CatalogCTA';

interface WhatsAppCatalogProps {
  onShareSuccess?: (title: string, message: string) => void;
}

export default function WhatsAppCatalog({ onShareSuccess }: WhatsAppCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'unstitched' | 'ready-to-wear' | 'festive' | 'sale'>('all');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // official WhatsApp links
  const catalogUrl = 'https://wa.me/c/923115930237';
  const chatUrl = 'https://wa.me/923115930237';

  // Simulate premium skeleton loader when switching categories
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  const filteredProducts = PRODUCTS.filter(p => {
    if (selectedCategory === 'all') return true;
    return p.type === selectedCategory;
  }).slice(0, 6); // Display key premium articles in the featured catalog section

  const handleCopyCatalogLink = async () => {
    try {
      await navigator.clipboard.writeText(catalogUrl);
      setCopied(true);
      if (onShareSuccess) {
        onShareSuccess('Copied link!', 'Official WhatsApp Catalog link saved to clipboard!');
      }
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleShareCatalog = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Akash Collection WhatsApp Catalog',
          text: 'Explore premium unstitched luxury lawn and digital print articles directly on WhatsApp!',
          url: catalogUrl
        });
        if (onShareSuccess) {
          onShareSuccess('Shared Successfully', 'Shared catalog with friends!');
        }
      } catch (err) {
        console.log('Share aborted', err);
      }
    } else {
      handleCopyCatalogLink();
    }
  };

  // Preformat a highly descriptive and elegant purchase message to send on WhatsApp
  const handleOrderProductViaWhatsApp = (product: Product) => {
    const text = `Assalam-o-Alaikum Akash Collection, I am interested in ordering this article from your WhatsApp Catalog:

• Article: ${product.title}
• SKU: ${product.sku}
• Type: ${product.type.toUpperCase()} (${product.pieces})
• Fabric: ${product.fabric}
• Price: Rs. ${product.price.toLocaleString()}

Please confirm stock availability and guide me through the booking process!`;

    const encodedText = encodeURIComponent(text);
    const orderDeepLink = `https://wa.me/923115930237?text=${encodedText}`;
    window.open(orderDeepLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-16 py-12 bg-white" id="whatsapp-master-catalog-dock">
      {/* 1. HERO HEADER BLOCK */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-50 border border-stone-200/50 rounded-3xl p-6 sm:p-12 relative overflow-hidden flex flex-col lg:flex-row items-center gap-10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
          
          {/* Hero details */}
          <div className="flex-1 space-y-6 text-left relative z-10">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-100 px-3 py-1.5 rounded-full">
              <Sparkles size={14} className="text-emerald-600 animate-spin" />
              <span className="font-mono text-[9px] font-bold uppercase tracking-wider">PREMIUM DIGITAL SHOWROOM</span>
            </div>

            <div className="space-y-3">
              <h1 className="font-serif text-3xl sm:text-5xl font-normal leading-tight text-stone-900 uppercase">
                Shop Our Collection <br />
                <span className="text-emerald-700 font-bold">On WhatsApp</span>
              </h1>
              <p className="text-stone-600 font-sans text-xs sm:text-sm leading-relaxed max-w-xl">
                Browse, share, and book premium unstitched luxury lawn, festive coordinates, and flat-sale catalog articles without leaving your favorite app. Connect instantly with our sales representative for custom pricing.
              </p>
            </div>

            {/* Micro stats banner */}
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="bg-white border border-stone-150 px-4 py-2.5 rounded-xl flex items-center gap-2.5">
                <BadgeCheck className="text-emerald-500 w-5 h-5" />
                <div>
                  <span className="font-bold text-xs font-mono text-stone-900 block leading-tight">FBR REGISTERED</span>
                  <span className="text-[9px] text-stone-400 uppercase font-mono">100% Genuine Brand</span>
                </div>
              </div>

              <div className="bg-white border border-stone-150 px-4 py-2.5 rounded-xl flex items-center gap-2.5">
                <Smartphone className="text-emerald-500 w-5 h-5" />
                <div>
                  <span className="font-bold text-xs font-mono text-stone-900 block leading-tight">TAP TO CHAT</span>
                  <span className="text-[9px] text-stone-400 uppercase font-mono">Instant representative</span>
                </div>
              </div>
            </div>

            {/* Quick action triggers */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleCopyCatalogLink}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-stone-200 hover:border-stone-900 hover:bg-stone-50 text-xs font-mono text-stone-800 transition-all"
                title="Copy Official WhatsApp Link"
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-emerald-500" />
                    <span>Copied link!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy Catalog Link</span>
                  </>
                )}
              </button>

              <button
                onClick={handleShareCatalog}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-stone-200 hover:border-stone-900 hover:bg-stone-50 text-xs font-mono text-stone-800 transition-all"
                title="Share Catalog with Friends"
              >
                <Share2 size={13} />
                <span>Share Catalog</span>
              </button>
            </div>
          </div>

          {/* Side Illustration Grid placeholder or promotional banner */}
          <div className="flex-1 w-full lg:max-w-md relative z-10">
            <div className="relative p-6 bg-white border border-stone-200 rounded-3xl shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-mono font-bold tracking-wider text-stone-400 uppercase">Live Collections</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-bold uppercase">Rs. 4,550 Fixed Rate</span>
              </div>

              {/* Showcase list item preview */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 hover:bg-stone-50 rounded-lg transition-colors border border-transparent hover:border-stone-100">
                  <div className="w-12 h-12 rounded bg-stone-100 overflow-hidden flex-shrink-0">
                    <img src="/lawn-1.jpeg" alt="Lawn" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=100'; }} />
                  </div>
                  <div className="text-left flex-grow">
                    <h4 className="font-serif text-[13px] font-bold text-stone-900">Zamzam Lawn Series-1</h4>
                    <p className="text-[10px] text-stone-400 font-mono">SKU: ZAM-LAWN-3PC-1</p>
                  </div>
                  <ChevronRight size={14} className="text-stone-300" />
                </div>

                <div className="flex items-center gap-3 p-2 hover:bg-stone-50 rounded-lg transition-colors border border-transparent hover:border-stone-100">
                  <div className="w-12 h-12 rounded bg-stone-100 overflow-hidden flex-shrink-0">
                    <img src="/lawn-2.jpeg" alt="Lawn" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=100'; }} />
                  </div>
                  <div className="text-left flex-grow">
                    <h4 className="font-serif text-[13px] font-bold text-stone-900">Zamzam Lawn Series-2</h4>
                    <p className="text-[10px] text-stone-400 font-mono">SKU: ZAM-LAWN-3PC-2</p>
                  </div>
                  <ChevronRight size={14} className="text-stone-300" />
                </div>
              </div>

              {/* Instant Redirection CTA */}
              <a
                href={catalogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block text-center bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold py-3.5 rounded-xl transition-all shadow-md shadow-emerald-900/10 uppercase tracking-widest"
              >
                Launch Catalog App
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. PRODUCT CATEGORY SELECTION TABS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
            <div className="text-left">
              <span className="font-mono text-[9px] tracking-widest text-emerald-600 font-bold uppercase block">Explore Showroom</span>
              <h2 className="font-serif text-lg sm:text-2xl font-bold text-stone-900 uppercase">Featured Showroom Categories</h2>
            </div>

            {/* Tab controls */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Catalog' },
                { id: 'unstitched', label: 'Unstitched Lawn' },
                { id: 'ready-to-wear', label: 'Ready to Wear' },
                { id: 'festive', label: 'Luxury Festive' },
                { id: 'sale', label: 'Special Sales' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold transition-all border ${
                    selectedCategory === tab.id 
                      ? 'bg-emerald-600 border-emerald-600 text-white' 
                      : 'bg-stone-50 border-stone-200 text-stone-600 hover:border-stone-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* DYNAMIC SHOWROOM PRODUCTS LIST WITH SKELETON LOADERS */}
          <AnimatePresence mode="wait">
            {loading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6" id="whatsapp-skeleton-grid">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="space-y-4 animate-pulse">
                    <div className="bg-stone-100 w-full aspect-[3/4] rounded-xl" />
                    <div className="space-y-2 text-center">
                      <div className="h-4 bg-stone-100 rounded w-2/3 mx-auto" />
                      <div className="h-3 bg-stone-100 rounded w-1/3 mx-auto" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10 sm:gap-x-6 lg:gap-x-8"
                id="whatsapp-catalog-preview-grid"
              >
                {filteredProducts.map(product => {
                  const hasDiscount = !!product.originalPrice;
                  const discountPercent = hasDiscount 
                    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100) 
                    : 0;
                  
                  return (
                    <div 
                      key={product.id}
                      className="group flex flex-col h-full text-center relative cursor-pointer border border-stone-100 p-3 sm:p-4 rounded-2xl hover:shadow-xl transition-all duration-300"
                      onClick={() => handleOrderProductViaWhatsApp(product)}
                    >
                      {/* Image frame */}
                      <div className="w-full aspect-[3/4] rounded-xl overflow-hidden relative bg-stone-50">
                        <img 
                          src={product.image} 
                          alt={product.title} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                          onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400'; }}
                        />

                        {/* Badges Overlays */}
                        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                          {hasDiscount && (
                            <span className="bg-red-600 text-white text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 rounded font-bold">
                              Save {discountPercent}%
                            </span>
                          )}
                          <span className="bg-stone-900/95 text-white text-[8px] font-mono tracking-widest uppercase px-1.5 py-0.5 rounded">
                            {product.fabric}
                          </span>
                        </div>

                        {/* Quick View overlay */}
                        <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block z-10">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOrderProductViaWhatsApp(product);
                            }}
                            className="w-full bg-white text-stone-950 hover:bg-emerald-600 hover:text-white py-2.5 text-[10px] font-mono font-bold tracking-widest uppercase transition-colors rounded shadow-lg flex items-center justify-center gap-1.5"
                          >
                            <Send size={11} />
                            <span>Quick Chat Order</span>
                          </button>
                        </div>
                      </div>

                      {/* Product details */}
                      <div className="pt-4 flex flex-col flex-grow text-center">
                        <span className="text-[10px] font-mono text-stone-400 tracking-wider uppercase block">SKU: {product.sku}</span>
                        <h3 className="font-sans text-sm tracking-wide text-stone-900 group-hover:text-stone-600 transition-colors uppercase line-clamp-1 mt-1 font-semibold">
                          {product.title}
                        </h3>
                        
                        <div className="mt-2 flex justify-center items-center gap-2">
                          {hasDiscount ? (
                            <>
                              <span className="text-xs font-sans text-stone-400 line-through">
                                Rs. {product.originalPrice!.toLocaleString()}
                              </span>
                              <span className="text-sm font-sans font-bold text-stone-950">
                                Rs. {product.price.toLocaleString()}
                              </span>
                            </>
                          ) : (
                            <span className="text-sm font-sans font-bold text-stone-950">
                              Rs. {product.price.toLocaleString()}
                            </span>
                          )}
                        </div>

                        {/* Mobile quick add tap */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOrderProductViaWhatsApp(product);
                          }}
                          className="mt-3 underline underline-offset-4 text-[10px] font-mono font-black tracking-widest uppercase text-emerald-600 hover:text-emerald-700 md:hidden"
                        >
                          Book On WhatsApp
                        </button>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 3. BENTO BOX: QR CODE & CTA DOCKS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="whatsapp-bento-layout">
          <div className="lg:col-span-8 flex flex-col justify-between">
            <CatalogCTA catalogUrl={catalogUrl} fallbackUrl={chatUrl} />
            <div className="bg-stone-50 border border-stone-200/50 rounded-2xl p-6 text-left space-y-4 mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-1.5 max-w-md">
                <div className="flex items-center gap-1.5 text-amber-800">
                  <Zap size={14} className="animate-bounce" />
                  <span className="font-mono text-[9px] font-bold tracking-widest uppercase">Wholesale Deal</span>
                </div>
                <h4 className="font-serif text-sm font-bold text-stone-900 uppercase">Save Flat 30% Off on Bulk Inquiries</h4>
                <p className="text-[11px] text-stone-500 leading-relaxed font-sans">
                  Ordering more than 10 pieces? Contact our customer desk directly on WhatsApp to secure premium factory price markdowns with customized shipping rates.
                </p>
              </div>

              <a
                href={`${chatUrl}?text=${encodeURIComponent('Hi Akash Collection, I would like to inquire about wholesale bulk pricing for unstitched lawn.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-stone-900 hover:bg-stone-850 text-white font-mono text-[10px] font-bold tracking-widest px-5 py-3 rounded-lg flex items-center gap-1.5 whitespace-nowrap uppercase"
              >
                <PhoneCall size={12} />
                <span>Bulk Inquiry</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-4">
            <QRCodeCard catalogUrl={catalogUrl} onShareSuccess={onShareSuccess} />
          </div>
        </div>
      </div>
    </div>
  );
}
