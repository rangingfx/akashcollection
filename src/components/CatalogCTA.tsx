import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface CatalogCTAProps {
  catalogUrl?: string;
  fallbackUrl?: string;
}

export default function CatalogCTA({ 
  catalogUrl = 'https://wa.me/c/923115930237',
  fallbackUrl = 'https://wa.me/923115930237'
}: CatalogCTAProps) {
  
  const handleOpenCatalog = () => {
    // Attempt opening the deep link/catalog URL
    const start = Date.now();
    const newWindow = window.open(catalogUrl, '_blank', 'noopener,noreferrer');
    
    // Check if window opened successfully or fallback if window couldn't be loaded
    setTimeout(() => {
      if (!newWindow || newWindow.closed || Date.now() - start < 100) {
        window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
      }
    }, 500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-emerald-950 via-stone-900 to-stone-950 border border-emerald-800/30 rounded-2xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden"
      id="whatsapp-catalog-cta-panel"
    >
      {/* Visual glowing blobs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-48 h-48 bg-emerald-600/10 rounded-full blur-[60px] pointer-events-none" />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Columns - Logo & Text Details */}
        <div className="lg:col-span-8 space-y-6 text-left">
          {/* Logo Badge and status */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-emerald-500 p-2.5 rounded-2xl shadow-lg shadow-emerald-500/20 text-white flex-shrink-0 flex items-center justify-center">
              {/* Official WhatsApp Business "B" Logo */}
              <svg className="w-8 h-8 fill-current text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm12.008-21.75c-5.412 0-9.82 4.409-9.825 9.822-.002 1.802.469 3.562 1.365 5.123l.299.52-1.01 3.69 3.774-.99.505.299c1.498.887 3.202 1.354 4.902 1.355 5.41.002 9.818-4.407 9.824-9.822.003-2.623-1.018-5.088-2.879-6.953-1.859-1.865-4.322-2.894-6.946-2.894zm-.17 14.542h-.001c-1.284 0-1.921-.498-1.921-1.424 0-.82.684-1.282 1.951-1.282h1.121l.001 1.285c0 .923-.53 1.421-1.152 1.421zm1.152-4.161h-.859c-1.096 0-1.637-.436-1.637-1.233 0-.712.56-1.109 1.579-1.109h.917v2.342zm1.616.486c.642-.486 1.059-1.196 1.059-2.222 0-2.083-1.486-3.235-3.83-3.235H9.553v9.842h4.524c2.518 0 4.148-1.341 4.148-3.411 0-1.144-.576-1.972-1.567-2.484z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[10px] tracking-[0.3em] font-bold text-emerald-400 uppercase block">
                  Official Business Account
                </span>
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
              </div>
              <h4 className="font-serif text-sm font-bold tracking-wide uppercase text-white">
                AKASH COLLECTION CATALOG
              </h4>
            </div>
          </div>

          {/* Heading Text */}
          <div className="space-y-3">
            <h2 className="font-serif text-2xl sm:text-4xl font-normal leading-tight tracking-tight uppercase">
              Browse Wholesale Articles Inside WhatsApp
            </h2>
            <p className="text-stone-300 font-sans text-xs sm:text-sm leading-relaxed max-w-2xl">
              Gain instant access to our official, FBR-registered digital showroom catalog. Compare real-time stocks, choose fabric components, and place wholesale bulk orders with lightning speed.
            </p>
          </div>

          {/* Social Proof and trust factors */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 text-stone-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-emerald-400 w-4 h-4 flex-shrink-0" />
              <span className="text-[11px] font-mono uppercase tracking-wide">100% Verifiable Stocks</span>
            </div>
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-emerald-400 w-4 h-4 flex-shrink-0" />
              <span className="text-[11px] font-mono uppercase tracking-wide">Secure Bulk Checkout</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Sparkles className="text-emerald-400 w-4 h-4 flex-shrink-0" />
              <span className="text-[11px] font-mono uppercase tracking-wide">Direct Factory Rates</span>
            </div>
          </div>
        </div>

        {/* Right Column - Prominent Action Button Panel */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleOpenCatalog}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-mono font-bold tracking-widest text-xs uppercase py-4 sm:py-5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all cursor-pointer"
            id="open-catalog-primary-cta"
          >
            <span>Explore WhatsApp Catalog</span>
            <ArrowRight size={15} />
          </motion.button>
          
          <span className="text-[9px] font-mono text-stone-500 uppercase tracking-widest mt-3 text-center block">
            Compatible with Mobile, Web, and Desktop apps
          </span>
        </div>
      </div>
    </motion.div>
  );
}
