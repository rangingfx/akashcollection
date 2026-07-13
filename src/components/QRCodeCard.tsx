import React, { useState } from 'react';
import { motion } from 'motion/react';
import { QrCode, Copy, Check, Share2, ExternalLink } from 'lucide-react';

interface QRCodeCardProps {
  catalogUrl?: string;
  onShareSuccess?: (title: string, message: string) => void;
}

export default function QRCodeCard({ 
  catalogUrl = 'https://wa.me/c/923115930237',
  onShareSuccess 
}: QRCodeCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(catalogUrl);
      setCopied(true);
      if (onShareSuccess) {
        onShareSuccess('Link Copied', 'WhatsApp Catalog link copied to clipboard!');
      }
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Akash Collection WhatsApp Catalog',
          text: 'Browse our exquisite unstitched lawn and ready-to-wear catalog on WhatsApp!',
          url: catalogUrl,
        });
        if (onShareSuccess) {
          onShareSuccess('Shared Successfully', 'Catalog link shared with friends.');
        }
      } catch (err) {
        console.log('Share canceled or failed', err);
      }
    } else {
      handleCopyLink();
    }
  };

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(catalogUrl)}&color=0e7490&bgcolor=ffffff&qzone=2`;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8 text-center shadow-xl relative overflow-hidden"
      id="whatsapp-qr-code-card"
    >
      {/* Decorative gradient overlay */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative space-y-6 flex flex-col items-center">
        {/* Header Icon */}
        <div className="bg-emerald-500/10 p-3 rounded-full text-emerald-400 border border-emerald-500/20 shadow-inner">
          <QrCode size={24} className="animate-pulse" />
        </div>

        {/* Text Details */}
        <div className="space-y-2 max-w-sm">
          <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-100 uppercase tracking-wide">
            Instant Scan To Shop
          </h3>
          <p className="text-xs text-stone-400 font-sans leading-relaxed">
            Scan this secure QR code using your phone camera or WhatsApp scanner to open our premium wholesale catalog directly.
          </p>
        </div>

        {/* QR Code Graphic Frame */}
        <div className="relative group/qr p-4 bg-white rounded-xl shadow-2xl border border-stone-800/20 max-w-[200px] sm:max-w-[220px]">
          {/* Neon scanline animation */}
          <div className="absolute left-0 right-0 h-[2px] bg-emerald-400/80 top-0 shadow-[0_0_10px_#34d399] animate-[bounce_3s_infinite]" />
          
          <img 
            src={qrImageUrl} 
            alt="WhatsApp Catalog QR Code" 
            referrerPolicy="no-referrer"
            className="w-full h-auto aspect-square object-contain select-none rounded"
          />
        </div>

        {/* Scanning steps guide */}
        <div className="grid grid-cols-3 gap-2 w-full max-w-md pt-2 border-t border-stone-800/60 text-left font-sans text-[10px] text-stone-400">
          <div className="space-y-1">
            <span className="font-bold text-emerald-400 block font-mono text-xs">01</span>
            <span>Open phone camera or WhatsApp</span>
          </div>
          <div className="space-y-1 border-x border-stone-800/60 px-2">
            <span className="font-bold text-emerald-400 block font-mono text-xs">02</span>
            <span>Point camera at QR code</span>
          </div>
          <div className="space-y-1 pl-1">
            <span className="font-bold text-emerald-400 block font-mono text-xs">03</span>
            <span>Tap popup to explore collections</span>
          </div>
        </div>

        {/* Interactive Action Buttons */}
        <div className="flex flex-wrap gap-2 w-full justify-center pt-2" id="qr-action-buttons">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-750 text-stone-200 hover:text-white text-xs font-mono transition-all border border-stone-700/50 hover:border-stone-600"
            title="Copy Catalog Link"
          >
            {copied ? (
              <>
                <Check size={13} className="text-emerald-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>Copy Link</span>
              </>
            )}
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-750 text-stone-200 hover:text-white text-xs font-mono transition-all border border-stone-700/50 hover:border-stone-600"
            title="Share with Family"
          >
            <Share2 size={13} />
            <span>Share Link</span>
          </button>

          <a
            href={catalogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold transition-all shadow-md shadow-emerald-950/20"
            title="Browse Catalog Instantly"
          >
            <span>Open Catalog</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
