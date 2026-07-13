import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Heart, CheckCircle2, ChevronRight, ShoppingCart } from 'lucide-react';

interface ShopOnWhatsAppProps {
  catalogUrl?: string;
}

export default function ShopOnWhatsApp({ 
  catalogUrl = 'https://wa.me/c/923115930237'
}: ShopOnWhatsAppProps) {

  const steps = [
    {
      num: '01',
      title: 'Select Your Favorites',
      desc: 'Browse our exquisite catalogs or active listings and save what catches your eye.',
      icon: <Heart size={18} className="text-emerald-500" />
    },
    {
      num: '02',
      title: 'Send Catalog Snippets',
      desc: 'Click "Send to WhatsApp" or share the catalog item link directly to our representative.',
      icon: <MessageSquare size={18} className="text-emerald-500" />
    },
    {
      num: '03',
      title: 'Instant Confirmation',
      desc: 'Our team verifies stock levels, calculates custom shipping, and books your COD dispatch.',
      icon: <CheckCircle2 size={18} className="text-emerald-500" />
    }
  ];

  return (
    <section className="bg-stone-50 py-16 px-4 sm:px-6 lg:px-8 border-y border-stone-200/40" id="shop-on-whatsapp-steps-section">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Block */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="font-mono text-xs text-amber-800 tracking-[0.3em] font-bold uppercase block">
            Seamless Wholesale Workflow
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-normal text-stone-900 tracking-wide uppercase">
            How To Buy From Us On WhatsApp
          </h2>
          <div className="w-12 h-[1px] bg-stone-300 mx-auto" />
          <p className="text-stone-500 text-xs sm:text-sm font-sans leading-relaxed">
            Skip the checkout forms! Get personalized support, custom bulk quotes, and rapid confirmation by completing your purchase inside the WhatsApp App.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="shop-whatsapp-steps-grid">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -5 }}
              className="bg-white border border-stone-100 rounded-xl p-6 sm:p-8 relative flex flex-col justify-between transition-all duration-300 hover:shadow-lg shadow-sm group"
              id={`step-card-${idx}`}
            >
              {/* Card content */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="bg-emerald-50 p-2.5 rounded-lg border border-emerald-100/50">
                    {step.icon}
                  </div>
                  <span className="font-mono text-2xl font-black text-stone-200/70 group-hover:text-emerald-500/20 transition-colors">
                    {step.num}
                  </span>
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-serif text-base font-bold text-stone-900">
                    {step.title}
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed font-sans">
                    {step.desc}
                  </p>
                </div>
              </div>

              {/* Decorative hover indicator */}
              <div className="h-1 bg-stone-100 group-hover:bg-emerald-500 w-full mt-6 rounded transition-colors duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Centralised CTA Action */}
        <div className="text-center pt-4">
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={catalogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-850 text-white font-mono font-bold tracking-widest text-[10px] uppercase py-3.5 px-8 rounded-lg shadow-md transition-all border border-stone-800"
            title="Start Shopping"
          >
            <ShoppingCart size={13} />
            <span>Launch Order Catalog</span>
            <ChevronRight size={13} />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
