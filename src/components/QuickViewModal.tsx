/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Heart, ShieldCheck, RefreshCcw, Truck, Minus, Plus, ShoppingBag, Ruler, Share2 } from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
  onShareSuccess?: (title: string, message: string) => void;
}

export default function QuickViewModal({ product, onClose, onAddToCart, onShareSuccess }: QuickViewModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [mainImage, setMainImage] = useState<string>(product.image);
  const [activeTab, setActiveTab] = useState<'details' | 'fabric' | 'shipping'>('details');
  const [showSizeChart, setShowSizeChart] = useState<boolean>(false);

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

  // Initialize size
  useEffect(() => {
    if (product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
    setMainImage(product.image);
    setQuantity(1);
  }, [product]);

  const hasDiscount = !!product.originalPrice;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  const handleIncrement = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddSubmit = () => {
    onAddToCart(product, selectedSize, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" id="quick-view-overlay">
      {/* Container */}
      <div 
        className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto flex flex-col md:flex-row border border-gray-100"
        id="quick-view-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-quickview-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-black hover:text-white transition-colors border border-gray-100 shadow-sm"
        >
          <X size={18} />
        </button>

        {/* Left Side: Product Gallery */}
        <div className="md:w-1/2 p-6 flex flex-col gap-4 border-r border-gray-100" id="modal-gallery-side">
          <div className="aspect-[3/4] bg-gray-50 rounded-lg overflow-hidden relative">
            <img
              id="modal-main-image"
              src={mainImage}
              alt={product.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
            {hasDiscount && (
              <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-mono font-bold uppercase px-3 py-1 rounded-sm shadow-sm">
                -{discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.gallery && product.gallery.length > 1 && (
            <div className="flex gap-2" id="modal-thumbnails-strip">
              {product.gallery.map((img, index) => (
                <button
                  key={index}
                  id={`thumb-${index}`}
                  onClick={() => setMainImage(img)}
                  className={`w-20 aspect-[3/4] rounded-md overflow-hidden border-2 transition-all ${
                    mainImage === img ? 'border-amber-800' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} referrerPolicy="no-referrer" className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Product Customization & Ordering */}
        <div className="md:w-1/2 p-6 flex flex-col h-full overflow-y-auto" id="modal-details-side">
          {/* Header context */}
          <div className="border-b border-gray-100 pb-4">
            <span className="text-xs font-mono text-gray-500 bg-gray-100 py-1 px-2.5 rounded-full uppercase tracking-wider">
              {product.fabric} • {product.pieces}
            </span>
            <div className="flex justify-between items-start gap-4 mt-3">
              <h1 className="font-serif text-xl sm:text-2xl font-semibold text-gray-950">
                {product.title}
              </h1>
              <button
                id={`modal-share-btn-${product.id}`}
                onClick={handleShare}
                className="p-2 rounded-full border border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors flex items-center justify-center flex-shrink-0 shadow-sm"
                title="Share this product"
              >
                <Share2 size={15} />
              </button>
            </div>
            <p className="text-xs font-mono text-gray-400 mt-1">SKU: {product.sku}</p>

            {/* Price section */}
            <div className="flex items-center gap-3 mt-4">
              <span className="text-2xl font-serif font-bold text-gray-950">
                Rs. {product.price.toLocaleString()}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-sm font-mono text-gray-400 line-through">
                    Rs. {product.originalPrice!.toLocaleString()}
                  </span>
                  <span className="text-xs text-amber-700 bg-amber-50 font-mono px-2 py-0.5 rounded-sm font-semibold">
                    You Save Rs. {(product.originalPrice! - product.price).toLocaleString()}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="py-4 border-b border-gray-100">
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Options: Sizes selection */}
          <div className="py-4 border-b border-gray-100" id="modal-sizes-container">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-gray-800 font-bold tracking-wider uppercase">
                {product.type === 'unstitched' ? 'Fabric Stitching option' : 'Select Tailoring Size'}
              </span>
              
              {product.type !== 'unstitched' && (
                <button
                  id="size-chart-trigger"
                  onClick={() => setShowSizeChart(!showSizeChart)}
                  className="text-xs text-amber-800 hover:text-black font-semibold flex items-center gap-1.5 focus:outline-none"
                >
                  <Ruler size={13} />
                  <span>Size Chart guide</span>
                </button>
              )}
            </div>

            {/* Size interactive chips */}
            <div className="flex gap-2.5 flex-wrap">
              {product.sizes.map((sz) => (
                <button
                  id={`size-btn-${sz}`}
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`min-w-[48px] px-3.5 py-2 text-xs font-mono font-bold rounded-md border text-center transition-all ${
                    selectedSize === sz
                      ? 'border-black bg-black text-white'
                      : 'border-gray-200 hover:border-black text-gray-800 bg-gray-50/50'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>

            {/* Mini size chart dropdown overlay */}
            {showSizeChart && (
              <div className="mt-3.5 bg-amber-50/75 border border-amber-200/50 p-3.5 rounded-lg text-[11px] leading-relaxed" id="size-chart-guide">
                <span className="font-bold text-amber-900 block mb-1">Standard Tailoring Guide (Inches)</span>
                <table className="w-full text-left font-mono border-collapse">
                  <thead>
                    <tr className="border-b border-amber-200 text-amber-900 text-[10px]">
                      <th className="py-1">Size</th>
                      <th>Shoulder</th>
                      <th>Chest</th>
                      <th>Kameez Length</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-amber-100">
                      <td className="py-1 font-bold">XS</td>
                      <td>13.5</td>
                      <td>33</td>
                      <td>38</td>
                    </tr>
                    <tr className="border-b border-amber-100">
                      <td className="py-1 font-bold">Small</td>
                      <td>14.0</td>
                      <td>36</td>
                      <td>39</td>
                    </tr>
                    <tr className="border-b border-amber-100">
                      <td className="py-1 font-bold">Medium</td>
                      <td>14.5</td>
                      <td>40</td>
                      <td>40</td>
                    </tr>
                    <tr className="border-b border-amber-100">
                      <td className="py-1 font-bold">Large</td>
                      <td>15.2</td>
                      <td>44</td>
                      <td>40</td>
                    </tr>
                    <tr className="border-b border-amber-100">
                      <td className="py-1 font-bold">XL</td>
                      <td>16.0</td>
                      <td>48</td>
                      <td>41</td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-2 text-[10px] text-amber-800 italic">
                  *Length may vary by 1-1.5 inches based on designer cut patterns.
                </p>
              </div>
            )}
          </div>

          {/* Options: Quantity Selector */}
          <div className="py-4 border-b border-gray-100 flex items-center gap-6" id="modal-qty-container">
            <span className="text-xs font-mono text-gray-800 font-bold tracking-wider uppercase">Quantity</span>
            <div className="flex items-center border border-gray-200 rounded-md bg-gray-50/50">
              <button
                id="qty-decrement-btn"
                onClick={handleDecrement}
                className="px-3 py-1.5 hover:bg-gray-100 text-gray-600 transition-colors"
                disabled={quantity <= 1}
              >
                <Minus size={14} />
              </button>
              <span className="px-4 font-mono font-bold text-sm text-gray-950 w-8 text-center">
                {quantity}
              </span>
              <button
                id="qty-increment-btn"
                onClick={handleIncrement}
                className="px-3 py-1.5 hover:bg-gray-100 text-gray-600 transition-colors"
                disabled={quantity >= product.stock}
              >
                <Plus size={14} />
              </button>
            </div>
            <span className="text-xs font-mono text-gray-400">
              Only {product.stock} items left in stock
            </span>
          </div>

          {/* Product Spec Accordion */}
          <div className="py-4 border-b border-gray-100" id="accordion-tabs">
            <div className="flex gap-4 border-b border-gray-100 text-xs font-mono pb-2 mb-3">
              <button
                id="tab-details"
                onClick={() => setActiveTab('details')}
                className={`pb-1 uppercase tracking-wider font-semibold border-b ${
                  activeTab === 'details' ? 'border-black text-black' : 'text-gray-400 border-transparent hover:text-gray-600'
                }`}
              >
                Includes Detail
              </button>
              <button
                id="tab-fabric"
                onClick={() => setActiveTab('fabric')}
                className={`pb-1 uppercase tracking-wider font-semibold border-b ${
                  activeTab === 'fabric' ? 'border-black text-black' : 'text-gray-400 border-transparent hover:text-gray-600'
                }`}
              >
                Care Guide
              </button>
              <button
                id="tab-shipping"
                onClick={() => setActiveTab('shipping')}
                className={`pb-1 uppercase tracking-wider font-semibold border-b ${
                  activeTab === 'shipping' ? 'border-black text-black' : 'text-gray-400 border-transparent hover:text-gray-600'
                }`}
              >
                Shipping INFO
              </button>
            </div>

            <div className="text-[12px] leading-relaxed text-gray-600 min-h-[60px]" id="tab-content">
              {activeTab === 'details' && (
                <ul className="list-disc pl-4 space-y-1">
                  {product.details.map((dt, i) => (
                    <li key={i}>{dt}</li>
                  ))}
                </ul>
              )}
              {activeTab === 'fabric' && (
                <div className="space-y-1">
                  <p><strong>Fabric Composition:</strong> Premium raw combed cotton fibers, pre-shrunk yarns only.</p>
                  <p>• Avoid bleach and direct harsh midday sunlight.</p>
                  <p>• Dry clean recommended for heavy embellished organza & silk festive wear.</p>
                  <p>• Standard medium ironing temperature.</p>
                </div>
              )}
              {activeTab === 'shipping' && (
                <p>
                  Delivery speed ranges between <strong>2 to 4 working days</strong> for Lahore, Islamabad, and Karachi. Rest of Pakistan takes 3 to 5 working days. Cash On Delivery is available nationwide. Unopened items in original state can be exchanged within 14 days of delivery.
                </p>
              )}
            </div>
          </div>

          {/* Checkout Icons */}
          <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-gray-500 py-4" id="quality-badges">
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="text-amber-800" size={18} />
              <span className="font-semibold text-gray-800">100% Genuine Fabric</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RefreshCcw className="text-amber-800" size={18} />
              <span className="font-semibold text-gray-800">Easy 14-days Exchange</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Truck className="text-amber-800" size={18} />
              <span className="font-semibold text-gray-800">Swift Delivery PK</span>
            </div>
          </div>

          {/* Add to Bag and close CTAs */}
          <button
            id="modal-add-to-bag-btn"
            onClick={handleAddSubmit}
            disabled={product.stock === 0}
            className="w-full mt-auto bg-black hover:bg-neutral-800 text-white font-mono font-bold tracking-widest text-xs py-3.5 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md focus:ring-2 focus:ring-black/20"
          >
            <ShoppingBag size={16} />
            <span>ADD TO SHOPPING BAG</span>
          </button>
        </div>
      </div>
    </div>
  );
}
