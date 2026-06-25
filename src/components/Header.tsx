/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, HelpCircle, Truck, Menu, X, ArrowRight, Phone, Mail, MapPin, BadgeCheck, Heart } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  cart: CartItem[];
  favoritesCount?: number;
  onOpenCart: () => void;
  onOpenTrack: () => void;
  onCategorySelect: (category: 'all' | 'unstitched' | 'ready-to-wear' | 'festive' | 'sale' | 'wishlist') => void;
  selectedCategory: string;
  onSearch: (term: string) => void;
  searchTerm: string;
}

export default function Header({
  cart,
  favoritesCount = 0,
  onOpenCart,
  onOpenTrack,
  onCategorySelect,
  selectedCategory,
  onSearch,
  searchTerm
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    if (cartCount > 0) {
      setIsBouncing(true);
      const timer = setTimeout(() => setIsBouncing(false), 300);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  const navItems = [
    { label: 'All design', value: 'all' },
    { label: 'Unstitched Lawn', value: 'unstitched' },
    { label: 'Ready to Wear', value: 'ready-to-wear' },
    { label: 'Festive Luxury', value: 'festive' },
    { label: 'Wishlist', value: 'wishlist' },
    { label: 'Sale Flat 30%', value: 'sale', isSale: true }
  ];

  const handleNavClick = (val: 'all' | 'unstitched' | 'ready-to-wear' | 'festive' | 'sale' | 'wishlist') => {
    onCategorySelect(val);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white" id="main-header">
      {/* 0. Urdu Announcement Bar */}
      <div className="bg-stone-900 text-white font-urdu text-[14px] md:text-[16px] leading-loose shadow-sm w-full overflow-hidden flex relative items-center h-10 md:h-12 border-b border-stone-800" style={{ direction: 'rtl' }} id="urdu-news-bar">
        <div className="bg-red-600 text-white px-3 md:px-4 py-1 h-full flex items-center justify-center font-bold z-10 shadow-[2px_0_10px_rgba(0,0,0,0.5)] whitespace-nowrap shrink-0 relative text-[14px] md:text-[16px]">
           <span className="animate-pulse pb-1">اہم خبر</span>
           <div className="absolute top-0 bottom-0 left-[-10px] w-0 h-0 border-t-[20px] md:border-t-[24px] border-t-transparent border-b-[20px] md:border-b-[24px] border-b-transparent border-r-[10px] border-r-red-600"></div>
        </div>
        <div className="flex-1 overflow-hidden h-full flex items-center" style={{ direction: 'rtl' }}>
          <div className="animate-marquee-rtl whitespace-nowrap min-w-full flex items-center h-full text-amber-500 pr-5 pb-1">
            پورے پاکستان میں کیش آن ڈیلیوری دستیاب ہے۔ ڈائریکٹ بینک ٹرانسفر کی صورت میں 10٪ ڈسکاؤنٹ حاصل کریں! مزید اپ ڈیٹس کے لیے ہمارے ساتھ جڑے رہیں ۔
          </div>
        </div>
      </div>

      {/* 1. Top Bar Marquee */}
      <div className="bg-[#1a1a1a] text-white py-2.5 px-4 text-[10px] font-semibold tracking-[0.2em] uppercase text-center flex items-center justify-center gap-1 overflow-hidden" id="header-promo-bar">
        <span className="animate-pulse">Free Delivery on Orders Above Rs. 2500 | Limited Time Offer</span>
      </div>

      {/* 2. Main Branding Bar */}
      <div className="border-b border-gray-100 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex items-center justify-between" id="header-brand-bar">
        {/* Mobile menu trigger */}
        <button
          id="mobile-menu-btn"
          className="md:hidden text-gray-700 hover:text-stone-500 p-1"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>

        {/* Brand Name with Elegant Serif styling */}
        <div 
          className="cursor-pointer text-center md:text-left flex flex-col items-center md:items-start select-none" 
          onClick={() => handleNavClick('all')}
          id="brand-logo-container"
        >
          <div className="flex items-center gap-1.5">
            <span className="font-serif text-3xl font-bold tracking-tighter text-[#1a1a1a]">
              AKASH
            </span>
            <BadgeCheck className="text-blue-500 w-6 h-6 sm:w-7 sm:h-7" fill="#1877F2" stroke="white" strokeWidth={1.5} />
          </div>
          <span className="text-[9px] uppercase tracking-[0.4em] text-stone-500 font-medium whitespace-nowrap">
            Collection Wholesale
          </span>
        </div>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex items-center max-w-sm w-full relative mx-4" id="desktop-search-container">
          <input
            id="desktop-search-input"
            type="text"
            placeholder="Search Embroidered Lawn, Co-ords, Organza..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-full py-1.5 pl-4 pr-10 text-xs focus:ring-1 focus:ring-black focus:border-black outline-none transition-all duration-200"
          />
          <Search size={15} className="absolute right-3.5 text-gray-400 pointer-events-none" />
        </div>

        {/* Right side utilities */}
        <div className="flex items-center gap-4" id="header-utilities">
          {/* Mobile Search Button */}
          <button
            id="mobile-search-toggle-btn"
            className="md:hidden text-gray-700 hover:text-black p-1"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Toggle search"
          >
            <Search size={20} />
          </button>

          {/* Track Order Utility */}
          <button
            id="track-order-header-btn"
            onClick={onOpenTrack}
            className="hidden sm:flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] text-stone-600 hover:text-stone-950 border border-stone-200 hover:border-stone-800 rounded-full px-4.5 py-1.5 bg-white transition-all mr-1"
          >
            <Truck size={14} />
            <span>Track Order</span>
          </button>

          {/* Wishlist Utility */}
          <button
            id="header-wishlist-btn"
            onClick={() => onCategorySelect('wishlist')}
            className="relative flex items-center gap-1.5 text-stone-800 hover:text-red-500 p-1.5 transition-colors focus:outline-none hidden sm:flex"
            aria-label="Open Wishlist"
          >
            <Heart size={21} strokeWidth={1.8} />
            {favoritesCount > 0 && (
              <span id="wishlist-badge" className="absolute -top-1 -right-1 bg-red-500 text-white font-mono text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Cart Bag with Badge */}
          <button
            id="header-cart-btn"
            onClick={onOpenCart}
            className={`relative flex items-center gap-1.5 text-stone-800 hover:text-stone-500 p-1.5 transition-all duration-300 focus:outline-none ${isBouncing ? '-translate-y-1 scale-110' : 'translate-y-0 scale-100'}`}
            aria-label="Open Shopping Cart"
          >
            <ShoppingBag size={21} strokeWidth={1.8} />
            {cartCount > 0 && (
              <span id="cart-item-badge" className="absolute -top-1 -right-1 bg-stone-900 text-white font-mono text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
            <span className="hidden sm:inline text-xs font-semibold ml-1 text-stone-800">
              Rs. {cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0).toLocaleString()}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Search Dropdown overlay */}
      {isSearchOpen && (
        <div className="md:hidden bg-white px-4 py-3 border-b border-gray-200 block" id="mobile-search-panel">
          <div className="relative">
            <input
              id="mobile-search-input"
              type="text"
              placeholder="Search fabrics, collections, RTW..."
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 pl-3 pr-10 text-xs focus:ring-1 focus:ring-black focus:border-black outline-none"
            />
            <Search size={15} className="absolute right-3 top-2.5 text-gray-400" />
          </div>
        </div>
      )}

      {/* 3. Category Navigation links (Desktop) */}
      <nav className="hidden md:block border-b border-gray-100 bg-white" id="desktop-navbar">
        <div className="max-w-7xl mx-auto px-8 flex justify-center items-center gap-10 h-14">
          {navItems.map((item) => (
            <button
              id={`nav-${item.value}`}
              key={item.value}
              onClick={() => handleNavClick(item.value as any)}
              className={`text-[11px] uppercase tracking-[0.2em] font-medium transition-all relative h-full flex items-center border-b ${
                selectedCategory === item.value
                  ? 'border-stone-900 text-stone-950 font-bold'
                  : 'border-transparent text-stone-600 hover:text-stone-400'
              } ${item.isSale ? 'text-red-600 font-semibold' : ''}`}
            >
              {item.label}
              {item.isSale && (
                <span className="absolute -top-1.5 -right-5 bg-red-600 text-white text-[8px] px-1 rounded-sm font-mono tracking-wide scale-90">
                  HOT
                </span>
              )}
            </button>
          ))}
          <button
            id="nav-track"
            onClick={onOpenTrack}
            className="md:hidden text-xs uppercase tracking-[0.15em] font-medium text-gray-600 hover:text-black"
          >
            Track Order
          </button>
        </div>
      </nav>

      {/* 4. Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden" id="mobile-nav-drawer-overlay">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Content container */}
          <div className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white p-6 shadow-xl" id="mobile-nav-drawer">
            <div className="flex items-center justify-between" id="mobile-nav-title-row">
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-xl tracking-widest text-[#1c1c1c] font-semibold">
                  AKASH PK
                </span>
                <BadgeCheck className="text-blue-500 w-5 h-5 flex-shrink-0" fill="#1877F2" stroke="white" strokeWidth={1.5} />
              </div>
              <button
                id="close-mobile-menu-btn"
                className="text-gray-500 hover:text-black p-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-8 flex flex-col gap-6" id="mobile-nav-links">
              {navItems.map((item) => (
                <button
                  id={`m-nav-${item.value}`}
                  key={item.value}
                  onClick={() => handleNavClick(item.value as any)}
                  className={`text-left text-sm uppercase tracking-widest font-medium py-1.5 border-b border-gray-100 flex items-center justify-between ${
                    selectedCategory === item.value ? 'text-black font-bold border-black' : 'text-gray-600'
                  } ${item.isSale ? 'text-amber-700 font-bold' : ''}`}
                >
                  <span>{item.label}</span>
                  <ArrowRight size={14} className="text-gray-300" />
                </button>
              ))}

              <button
                id="m-nav-track"
                onClick={() => {
                  onOpenTrack();
                  setIsMobileMenuOpen(false);
                }}
                className="text-left text-xs uppercase tracking-widest font-semibold text-gray-700 hover:text-black py-2.5 mt-2 flex items-center gap-2 border border-stone-200 rounded-md p-3 bg-stone-50 hover:bg-stone-100 transition-all justify-center"
              >
                <Truck size={14} />
                <span>Track Your Shipment</span>
              </button>
            </div>

            {/* Support and Coordinates Widget */}
            <div className="mt-8 pt-6 border-t border-stone-150 space-y-4 text-left font-sans text-xs text-stone-600" id="mobile-nav-contact">
              <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 block">SUPPORT COORDINATES</span>
              
              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <Phone size={14} className="text-stone-400 mt-0.5 flex-shrink-0" />
                  <div className="space-y-1">
                    <p className="font-semibold text-stone-800 text-[11px]">WhatsApp & Call</p>
                    <a href="https://wa.me/923347272246" target="_blank" rel="noopener noreferrer" className="block text-stone-500 font-mono hover:text-stone-900">+92 334 7272246</a>
                    <a href="https://wa.me/923115930237" target="_blank" rel="noopener noreferrer" className="block text-stone-500 font-mono hover:text-stone-900">+92 311 5930237</a>
                  </div>
                </div>

                <a 
                  href="mailto:info@akashcollection.pk" 
                  className="flex items-start gap-2.5 hover:text-stone-900 group"
                >
                  <Mail size={14} className="text-stone-400 group-hover:text-stone-850 mt-0.5 flex-shrink-0" />
                  <div className="space-y-0.5">
                    <p className="font-semibold text-stone-800 text-[11px]">Inquiries Email</p>
                    <p className="text-stone-500 font-mono">info@akashcollection.pk</p>
                  </div>
                </a>

                <div className="flex items-start gap-2.5 group">
                  <MapPin size={14} className="text-stone-400 mt-0.5 flex-shrink-0" />
                  <div className="space-y-0.5">
                    <p className="font-semibold text-stone-800 text-[11px]">Retail Headquarters</p>
                    <p className="text-stone-500 font-sans leading-relaxed">Sohan, Islamabad</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-8 text-center text-[10px] text-gray-400 font-mono" id="mobile-nav-foot">
              <p>© 2026 Akash Collection Wholesale Pakistan</p>
              <p className="mt-1">Designed with Modern Pakistani Elegance</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
