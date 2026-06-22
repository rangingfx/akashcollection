/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Eye, ShoppingCart, Percent, Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: React.Key;
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string, quantity?: number) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (product: Product) => void;
}

export default function ProductCard({ 
  product, 
  onQuickView, 
  onAddToCart,
  isFavorite = false,
  onToggleFavorite
}: ProductCardProps) {
  const hasDiscount = !!product.originalPrice;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Default to first available size
    const defaultSize = product.sizes[0] || 'Unstitched';
    onAddToCart(product, defaultSize);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      className="group bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full cursor-pointer"
      onClick={() => onQuickView(product)}
    >
      {/* Product Image Wrapper */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 flex items-center justify-center" id={`img-container-${product.id}`}>
        <img
          id={`product-img-${product.id}`}
          src={product.image}
          alt={product.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 items-start" id={`badges-overlay-${product.id}`}>
          {product.type === 'festive' && (
            <span className="bg-stone-100 text-stone-900 text-[10px] font-semibold tracking-widest uppercase px-2.5 py-0.5 rounded-sm border border-stone-200/50">
              Luxury Festive
            </span>
          )}
          {hasDiscount && (
            <span className="bg-red-600 text-white text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-sm font-bold flex items-center gap-1">
              <Percent size={11} />
              SAVE {discountPercent}%
            </span>
          )}
          <span className="bg-stone-900/95 text-white text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-sm">
            {product.pieces}
          </span>
        </div>

        {/* Favorite wishlist Heart button overlay */}
        <button
          id={`favorite-btn-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            if (onToggleFavorite) onToggleFavorite(product);
          }}
          className="absolute top-2.5 right-2.5 z-10 bg-white/95 hover:bg-white p-2 rounded-full shadow-sm text-stone-900 transition-all duration-300 backdrop-blur-[2px] border border-stone-100/50 flex items-center justify-center hover:scale-105 active:scale-95"
          title={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart 
            size={15} 
            className={`transition-all duration-300 ${
              isFavorite 
                ? 'fill-red-600 text-red-600 scale-110' 
                : 'text-stone-700 hover:text-red-500'
            }`} 
          />
        </button>

        {/* Fabric Type bottom badge */}
        <div className="absolute bottom-2.5 left-2.5" id={`fabric-badge-wrap-${product.id}`}>
          <span className="bg-white/90 text-gray-800 text-[9px] font-mono tracking-widest font-semibold uppercase px-2 py-0.5 rounded-full shadow-sm backdrop-blur-[2px]">
            {product.fabric}
          </span>
        </div>

        {/* Desktop Quick Actions Hover Overlay */}
        <div 
          className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3"
          id={`action-overlay-${product.id}`}
        >
          <button
            id={`card-quickview-btn-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="bg-white p-2.5 rounded-full shadow-md text-gray-800 hover:bg-black hover:text-white transition-colors duration-200"
            title="Quick View Details"
          >
            <Eye size={16} />
          </button>
          
          <button
            id={`card-quickadd-btn-${product.id}`}
            onClick={handleQuickAdd}
            className="bg-white p-2.5 rounded-full shadow-md text-gray-800 hover:bg-black hover:text-white transition-colors duration-200"
            title={product.type === 'unstitched' ? 'Add Unstitched to Cart' : `Quick Add (Size: ${product.sizes[0]})`}
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 flex flex-col flex-grow bg-white" id={`product-info-wrap-${product.id}`}>
        {/* Title & SKU */}
        <div className="flex-grow">
          <span className="text-[10px] font-mono text-gray-400 tracking-wider">
            SKU: {product.sku}
          </span>
          <h3 className="font-serif text-sm font-medium text-gray-900 group-hover:text-stone-600 transition-colors line-clamp-1 mt-0.5">
            {product.title}
          </h3>
          <p className="text-gray-500 text-xs mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Sizes availability preview */}
        <div className="mt-3" id={`sizes-preview-${product.id}`}>
          <span className="text-[9px] font-mono text-gray-400 tracking-wider block mb-1">AVAILABLE SIZES:</span>
          <div className="flex gap-1 flex-wrap">
            {product.sizes.map((sz) => (
              <span
                key={sz}
                className="font-mono text-[9px] border border-gray-200 rounded-sm px-1.5 py-0.5 text-gray-600 bg-gray-50/50 max-w-[80px] truncate"
              >
                {sz}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing & Add Trigger */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-end justify-between" id={`pricing-section-${product.id}`}>
          <div className="flex flex-col">
            {hasDiscount && (
              <span className="text-xs font-mono text-gray-400 line-through">
                Rs. {product.originalPrice!.toLocaleString()}
              </span>
            )}
            <span className="text-base font-serif font-semibold text-gray-950">
              Rs. {product.price.toLocaleString()}
            </span>
          </div>

          <button
            id={`card-add-btn-${product.id}`}
            onClick={handleQuickAdd}
            className="bg-stone-900 hover:bg-stone-800 text-white font-sans text-[10px] font-semibold py-2 px-4 rounded-md transition-all tracking-[0.1em] uppercase md:opacity-0 md:group-hover:opacity-100 shadow-sm"
          >
            {product.type === 'unstitched' ? 'ADD FABRIC' : 'QUICK ADD'}
          </button>
        </div>
      </div>
    </div>
  );
}
