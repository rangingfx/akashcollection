/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Eye, ShoppingCart, Percent, Heart, Flame, Share2, MessageCircle } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: React.Key;
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string, quantity?: number) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (product: Product) => void;
  views?: number;
  isTrending?: boolean;
  onShareSuccess?: (title: string, message: string) => void;
}

export default function ProductCard({ 
  product, 
  onQuickView, 
  onAddToCart,
  isFavorite = false,
  onToggleFavorite,
  views = 0,
  isTrending = false,
  onShareSuccess
}: ProductCardProps) {
  const hasDiscount = !!product.originalPrice;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  const handleShare = async (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    
    const shareUrl = `${window.location.origin}${window.location.pathname}?product=${product.id}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: `Check out this gorgeous ${product.title} on Akash Collection Wholesale!`,
          url: shareUrl,
        });
        if (onShareSuccess) {
          onShareSuccess('Product Shared', `${product.title} was shared successfully!`);
        }
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          fallbackCopyToClipboard(shareUrl);
        }
      }
    } else {
      fallbackCopyToClipboard(shareUrl);
    }
  };

  const fallbackCopyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url).then(
      () => {
        if (onShareSuccess) {
          onShareSuccess('Link Copied', 'Product link copied to your clipboard!');
        }
      },
      () => {
        const textArea = document.createElement("textarea");
        textArea.value = url;
        textArea.style.position = "fixed";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
          if (onShareSuccess) {
            onShareSuccess('Link Copied', 'Product link copied to your clipboard!');
          }
        } catch (err) {
          console.error('Was unable to copy to clipboard', err);
        }
        document.body.removeChild(textArea);
      }
    );
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Default to first available size
    const defaultSize = product.sizes[0] || 'Unstitched';
    onAddToCart(product, defaultSize);
  };

  const handleWhatsAppShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const shareUrl = `${window.location.origin}${window.location.pathname}?product=${product.id}`;
    
    const message = `🌸 *Akash Collection Wholesale* 🌸\n\n👗 *${product.title}*\n🧶 *Fabric:* ${product.fabric}\n📐 *Pieces:* ${product.pieces}\n💰 *Price:* Rs. ${product.price.toLocaleString()}\n\n🔗 *Order Link:* ${shareUrl}\n\n🖼️ *Image:* ${product.image}`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedMessage}`;
    
    const link = document.createElement('a');
    link.href = whatsappUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    if (onShareSuccess) {
      onShareSuccess('Sharing to WhatsApp', 'Opening WhatsApp to share this product...');
    }
  };

  return (
    <div
      id={`product-card-${product.id}`}
      className="group flex flex-col h-full cursor-pointer"
      onClick={() => onQuickView(product)}
    >
      {/* Product Image Wrapper */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 flex items-center justify-center" id={`img-container-${product.id}`}>
        <img
          id={`product-img-${product.id}-main`}
          src={product.image}
          alt={product.title}
          loading="lazy"
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover object-top transition-opacity duration-700 ${product.gallery?.length > 1 ? 'group-hover:opacity-0' : 'group-hover:scale-105'}`}
        />
        {product.gallery?.length > 1 && (
          <img
            id={`product-img-${product.id}-hover`}
            src={product.gallery[1]}
            alt={`${product.title} alternative view`}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-top opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
        )}

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 items-start" id={`badges-overlay-${product.id}`}>
          {isTrending && (
            <span className="bg-white text-stone-900 text-[10px] font-sans tracking-widest uppercase px-2 py-0.5 font-semibold">
              Trending
            </span>
          )}
          {hasDiscount && (
            <span className="bg-red-600 text-white text-[10px] font-sans tracking-widest uppercase px-2 py-0.5 font-semibold">
              Sale
            </span>
          )}
        </div>

        {/* Desktop Quick Add Button Overlay */}
        <div 
          className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"
          id={`action-overlay-${product.id}`}
        >
          <button
            id={`card-quickadd-btn-${product.id}`}
            onClick={handleQuickAdd}
            className="w-full bg-white text-stone-900 hover:bg-stone-900 hover:text-white py-3 text-xs font-mono font-bold tracking-widest uppercase transition-colors"
          >
            Quick Add
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="pt-4 pb-2 flex flex-col text-center" id={`product-info-wrap-${product.id}`}>
        <h3 className="font-sans text-sm tracking-wide text-stone-900 group-hover:text-stone-600 transition-colors uppercase line-clamp-1">
          {product.title}
        </h3>
        <div className="mt-2 flex justify-center items-center gap-2">
          {hasDiscount ? (
            <>
              <span className="text-xs font-sans text-gray-400 line-through">
                Rs. {product.originalPrice!.toLocaleString()}
              </span>
              <span className="text-sm font-sans text-stone-900">
                Rs. {product.price.toLocaleString()}
              </span>
            </>
          ) : (
            <span className="text-sm font-sans text-stone-900">
              Rs. {product.price.toLocaleString()}
            </span>
          )}
        </div>
        <button
          id={`card-add-btn-mobile-${product.id}`}
          onClick={handleQuickAdd}
          className="mt-3 underline underline-offset-4 text-xs font-sans tracking-widest uppercase text-stone-500 hover:text-stone-900 md:hidden"
        >
          Quick Add
        </button>
      </div>
    </div>
  );
}
