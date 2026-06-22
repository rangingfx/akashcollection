/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShoppingBag, Search, HelpCircle, Truck, Menu, X, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenTrack: () => void;
  onCategorySelect: (category: 'all' | 'unstitched' | 'ready-to-wear' | 'festive' | 'sale') => void;
  selectedCategory: string;
  onSearch: (term: string) => void;
  searchTerm: string;
}

export default function Header({
  cart,
  onOpenCart,
  onOpenTrack,
  onCategorySelect,
  selectedCategory,
  onSearch,
  searchTerm
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navItems = [
    { label: 'All design', value: 'all' },
    { label: 'Unstitched Lawn', value: 'unstitched' },
    { label: 'Ready to Wear', value: 'ready-to-wear' },
    { label: 'Festive Luxury', value: 'festive' },
    { label: 'Sale Flat 30%', value: 'sale', isSale: true }
  ];

  const handleNavClick = (val: 'all' | 'unstitched' | 'ready-to-wear' | 'festive' | 'sale') => {
    onCategorySelect(val);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white" id="main-header">
      {/* 1. Top Bar Marquee */}
      <div className="bg-[#1A1A1A] text-white py-2 px-4 text-xs font-mono tracking-wider flex items-center justify-between overflow-hidden" id="header-promo-bar">
        <div className="flex items-center gap-4 mx-auto animate-pulse">
          <span className="flex items-center gap-1.5">
            <Truck size={13} className="text-amber-400" />
            FREE SHIPPING NATIONWIDE FOR ORDERS ABOVE RS. 2,000
          </span>
          <span className="hidden md:inline text-gray-400">|</span>
          <span className="hidden md:inline">CASH ON DELIVERY (COD) & BANK TRANSFER AVAILABLE</span>
        </div>
      </div>

      {/* 2. Main Branding Bar */}
      <div className="border-b border-gray-100 py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex items-center justify-between" id="header-brand-bar">
        {/* Mobile menu trigger */}
        <button
          id="mobile-menu-btn"
          className="md:hidden text-gray-700 hover:text-black p-1"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>

        {/* Brand Name with Elegant Serif styling */}
        <div 
          className="cursor-pointer text-center md:text-left flex flex-col" 
          onClick={() => handleNavClick('all')}
          id="brand-logo-container"
        >
          <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-widest text-[#1c1c1c] uppercase">
            AKASH
          </span>
          <span className="text-[10px] font-mono tracking-[0.4em] text-gray-500 uppercase -mt-1 text-center md:text-left">
            COLLECTION.PK
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
            className="hidden sm:flex items-center gap-1 text-xs text-gray-600 hover:text-black border border-gray-200 hover:border-black rounded-full px-3 py-1 bg-white font-mono transition-all mr-1"
          >
            <Truck size={14} />
            <span>TRACK ORDER</span>
          </button>

          {/* Cart Bag with Badge */}
          <button
            id="header-cart-btn"
            onClick={onOpenCart}
            className="relative flex items-center gap-1.5 text-gray-800 hover:text-black p-1.5 transition-colors focus:outline-none"
            aria-label="Open Shopping Cart"
          >
            <ShoppingBag size={21} strokeWidth={2} />
            {cartCount > 0 && (
              <span id="cart-item-badge" className="absolute -top-1 -right-1 bg-amber-600 text-white font-mono text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
            <span className="hidden sm:inline text-xs font-medium ml-1">
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
        <div className="max-w-7xl mx-auto px-8 flex justify-center items-center gap-10 h-12">
          {navItems.map((item) => (
            <button
              id={`nav-${item.value}`}
              key={item.value}
              onClick={() => handleNavClick(item.value as any)}
              className={`text-xs uppercase tracking-[0.15em] font-medium transition-all relative h-full flex items-center border-b-2 ${
                selectedCategory === item.value
                  ? 'border-black text-black font-semibold'
                  : 'border-transparent text-gray-600 hover:text-black'
              } ${item.isSale ? 'text-amber-700 font-semibold' : ''}`}
            >
              {item.label}
              {item.isSale && (
                <span className="absolute -top-1.5 -right-5 bg-amber-600 text-white text-[8px] px-1 rounded-sm font-mono tracking-wide scale-90">
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
              <span className="font-serif text-xl tracking-widest text-[#1c1c1c] font-semibold">
                AKASH PK
              </span>
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
                className="text-left text-sm uppercase tracking-widest font-mono text-gray-600 hover:text-black py-2 mt-4 flex items-center gap-2 border border-gray-200 rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition-all justify-center"
              >
                <Truck size={16} />
                <span>Track Your Shipment</span>
              </button>
            </div>

            <div className="mt-auto pt-8 text-center text-xs text-gray-400 font-mono" id="mobile-nav-foot">
              <p>© 2026 Akash Collection Pakistan</p>
              <p className="mt-1">Designed with Modern Pakistani Elegance</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
