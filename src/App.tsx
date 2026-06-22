/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Filter, 
  X, 
  RotateCcw, 
  PhoneCall, 
  MessageSquare,
  ShieldCheck, 
  Truck, 
  Clock, 
  ChevronRight,
  Heart
} from 'lucide-react';

import Header from './components/Header';
import ProductCard from './components/ProductCard';
import QuickViewModal from './components/QuickViewModal';
import CartDrawer from './components/CartDrawer';
import CheckoutSection from './components/CheckoutSection';
import OrderSuccessModal from './components/OrderSuccessModal';
import TrackOrderModal from './components/TrackOrderModal';

import { PRODUCTS, MOCK_REVIEWS } from './data/products';
import { Product, CartItem, FilterState, Order, CustomerDetails } from './types';

// Banners generated with timestamps
const unstitchedBannerImg = '/src/assets/images/unstitched_banner_1782097511336.jpg';
const rtwBannerImg = '/src/assets/images/ready_to_wear_banner_1782097529638.jpg';

export default function App() {
  // Navigation & Page State
  const [currentView, setCurrentView] = useState<'store' | 'checkout' | 'success'>('store');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'unstitched' | 'ready-to-wear' | 'festive' | 'sale'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Cart & Orders State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [placedOrders, setPlacedOrders] = useState<Order[]>([]);
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);

  // UI Modals Toggles
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isTrackOpen, setIsTrackOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Banner Slideshow State
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  // Advanced Filters State
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    types: [],
    fabrics: [],
    pieces: [],
    sizes: [],
    priceRange: [1000, 15000],
    sortBy: 'best-seller'
  });

  // Load state from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('akash_collection_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error parsing cart from localStorage', e);
      }
    }

    const savedOrders = localStorage.getItem('akash_collection_orders');
    if (savedOrders) {
      try {
        setPlacedOrders(JSON.parse(savedOrders));
      } catch (e) {
        console.error('Error parsing orders from localStorage', e);
      }
    }
  }, []);

  // Sync state to local storage
  const saveCartToStorage = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('akash_collection_cart', JSON.stringify(newCart));
  };

  // Sync orders to local storage
  const saveOrdersToStorage = (newOrders: Order[]) => {
    setPlacedOrders(newOrders);
    localStorage.setItem('akash_collection_orders', JSON.stringify(newOrders));
  };

  // Slideshow interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBannerIndex(prev => (prev === 0 ? 1 : 0));
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Sync overall search bar of header with filter search state
  useEffect(() => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
  }, [searchTerm]);

  // Sync header categories selection with filters type state
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilters(prev => ({ ...prev, types: [] }));
    } else {
      setFilters(prev => ({ ...prev, types: [selectedCategory as any] }));
    }
  }, [selectedCategory]);

  // 1. ADD ITEM TO CART logic
  const handleAddToCart = (product: Product, size: string, quantity: number = 1) => {
    const existingIndex = cart.findIndex(
      item => item.product.id === product.id && item.selectedSize === size
    );

    let updatedCart: CartItem[] = [];
    if (existingIndex > -1) {
      updatedCart = [...cart];
      const nextQty = updatedCart[existingIndex].quantity + quantity;
      updatedCart[existingIndex].quantity = Math.min(nextQty, product.stock);
    } else {
      updatedCart = [...cart, { product, selectedSize: size, quantity }];
    }

    saveCartToStorage(updatedCart);
    setIsCartOpen(true); // Slide out cart automatically
  };

  // 2. REMOVE ITEM FROM CART
  const handleRemoveCartItem = (indexToRemove: number) => {
    const updated = cart.filter((_, idx) => idx !== indexToRemove);
    saveCartToStorage(updated);
  };

  // 3. EDIT QUANTITY IN CART
  const handleUpdateCartQty = (indexToUpdate: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(indexToUpdate);
      return;
    }
    const updated = [...cart];
    updated[indexToUpdate].quantity = Math.min(newQty, updated[indexToUpdate].product.stock);
    saveCartToStorage(updated);
  };

  // 4. SUBMIT ORDER LOGIC (Checkout Complete)
  const handlePlaceOrder = (customer: CustomerDetails) => {
    // Generate simulated billing metrics
    const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const discountPercentStr = localStorage.getItem('akash_cart_discount_percent');
    const discountPercent = discountPercentStr ? JSON.parse(discountPercentStr) : 0;
    const discountAmount = Math.round(subtotal * (discountPercent / 100));
    const shippingFee = subtotal >= 2000 ? 0 : 250;
    const total = subtotal - discountAmount + shippingFee;

    const newOrder: Order = {
      id: `AK-${Math.floor(10000 + Math.random() * 90000)}`, // e.g. AK-71283
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      customer,
      items: cart,
      subtotal,
      shippingFee,
      total,
      status: 'Pending'
    };

    // Save order
    const nextOrders = [...placedOrders, newOrder];
    saveOrdersToStorage(nextOrders);
    setLatestOrder(newOrder);

    // Wipe cart in storage
    saveCartToStorage([]);
    localStorage.removeItem('akash_cart_discount_percent');

    // Slide to success panel
    setCurrentView('success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter products matching dynamic states
  const filteredProducts = PRODUCTS.filter(product => {
    // A. Term matches SKU, title, fabric
    if (filters.search) {
      const query = filters.search.toLowerCase();
      const matchesTitle = product.title.toLowerCase().includes(query);
      const matchesSku = product.sku.toLowerCase().includes(query);
      const matchesFabric = product.fabric.toLowerCase().includes(query);
      const matchesDesc = product.description.toLowerCase().includes(query);
      if (!matchesTitle && !matchesSku && !matchesFabric && !matchesDesc) return false;
    }

    // B. Categories type (unstitched, etc.)
    if (filters.types.length > 0) {
      if (!filters.types.includes(product.type)) return false;
    }

    // C. Fabrics (Lawn, Jacquard, etc.)
    if (filters.fabrics.length > 0) {
      if (!filters.fabrics.includes(product.fabric)) return false;
    }

    // D. Pieces length (1pc, 2pc, 3pc)
    if (filters.pieces.length > 0) {
      if (!filters.pieces.includes(product.pieces)) return false;
    }

    // E. Sizing selection
    if (filters.sizes.length > 0) {
      const hasSize = product.sizes.some(sz => filters.sizes.includes(sz));
      if (!hasSize) return false;
    }

    // F. Priceline Range
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    // Sorting
    switch (filters.sortBy) {
      case 'price-low-high':
        return a.price - b.price;
      case 'price-high-low':
        return b.price - a.price;
      case 'newest':
        return b.id.localeCompare(a.id); // Simple mock newest sorting
      case 'best-seller':
      default:
        // Best sellers can prioritize our highlighted unstitched items or festive organza
        return b.stock - a.stock;
    }
  });

  // Extract count statistics for filtering sidebar
  const uniqueFabrics = Array.from(new Set(PRODUCTS.map(p => p.fabric)));
  const uniquePieces = Array.from(new Set(PRODUCTS.map(p => p.pieces)));
  const uniqueSizes = Array.from(new Set(PRODUCTS.flatMap(p => p.sizes)));

  const handleResetFilters = () => {
    setFilters({
      search: '',
      types: [],
      fabrics: [],
      pieces: [],
      sizes: [],
      priceRange: [1000, 15000],
      sortBy: 'best-seller'
    });
    setSearchTerm('');
    setSelectedCategory('all');
  };

  const toggleFilterFabric = (fab: string) => {
    setFilters(prev => {
      const nextFabrics = prev.fabrics.includes(fab)
        ? prev.fabrics.filter(f => f !== fab)
        : [...prev.fabrics, fab];
      return { ...prev, fabrics: nextFabrics };
    });
  };

  const toggleFilterPiece = (pc: any) => {
    setFilters(prev => {
      const nextPieces = prev.pieces.includes(pc)
        ? prev.pieces.filter(p => p !== pc)
        : [...prev.pieces, pc];
      return { ...prev, pieces: nextPieces };
    });
  };

  const toggleFilterSize = (sz: string) => {
    setFilters(prev => {
      const nextSizes = prev.sizes.includes(sz)
        ? prev.sizes.filter(s => s !== sz)
        : [...prev.sizes, sz];
      return { ...prev, sizes: nextSizes };
    });
  };

  const banners = [
    {
      img: unstitchedBannerImg,
      subtitle: 'EXCLUSIVE NEW DROPS',
      title: 'Luxury Unstitched Lawn \'26',
      desc: 'Elegant floral threads, pure silk chiffons, and soft handloomed cambric coordinates crafted for peak summer glamour.',
      cta: 'SHOP UNSTITCHED',
      category: 'unstitched'
    },
    {
      img: rtwBannerImg,
      subtitle: 'EASY NO-FUSS ELEGANCE',
      title: 'Ready to Wear Co-ords',
      desc: 'Sleek, minimalist matching top-to-bottom coordinates in pure satin silk and breathable cotton linen.',
      cta: 'EXPLORE READY WEAR',
      category: 'ready-to-wear'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col justify-between selection:bg-amber-100 selection:text-amber-900" id="app-root-layout">
      {/* 1. Universal header */}
      <Header
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTrack={() => setIsTrackOpen(true)}
        onCategorySelect={setSelectedCategory}
        selectedCategory={selectedCategory}
        onSearch={setSearchTerm}
        searchTerm={searchTerm}
      />

      {/* 2. Primary Views Router */}
      <main className="flex-grow">
        {currentView === 'store' && (
          <div id="store-view-layout">
            
            {/* HEROS SLIDER BANNER SECTION */}
            <section className="relative overflow-hidden bg-gray-100 h-[240px] sm:h-[460px] md:h-[540px]" id="store-hero-slideshow">
              {banners.map((item, index) => (
                <div
                  key={index}
                  id={`hero-slide-${index}`}
                  className={`absolute inset-0 w-full h-full duration-700 transition-opacity ease-in-out ${
                    currentBannerIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  {/* Aspect full styling */}
                  <img
                    src={item.img}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                  {/* Left aligned high contrast content drawer */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent flex items-center p-6 sm:p-12 md:p-16">
                    <div className="max-w-md md:max-w-lg text-white space-y-1 sm:space-y-4 pr-4">
                      <span className="font-mono text-[9px] sm:text-xs text-amber-300 font-bold tracking-[0.3em] uppercase block">
                        {item.subtitle}
                      </span>
                      <h1 className="font-serif text-lg sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-none text-white drop-shadow-sm uppercase">
                        {item.title}
                      </h1>
                      <p className="hidden sm:block text-xs sm:text-sm text-gray-200 leading-relaxed font-sans font-medium opacity-90">
                        {item.desc}
                      </p>
                      <button
                        id={`hero-cta-btn-${index}`}
                        onClick={() => {
                          setSelectedCategory(item.category as any);
                          const el = document.getElementById('collection-anchor');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="bg-white hover:bg-amber-800 text-black hover:text-white transition-all font-mono text-[9px] sm:text-xs font-bold py-1.5 sm:py-3 px-4 sm:px-6 rounded-md hover:shadow-lg flex items-center gap-1 mt-2 tracking-widest"
                      >
                        <span>{item.cta}</span>
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Slider dots indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2" id="hero-slider-indicators">
                {banners.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentBannerIndex(i)}
                    className={`h-1.5 rounded-full transition-all border border-black/10 ${
                      currentBannerIndex === i ? 'bg-white w-6' : 'bg-white/40 w-1.5 hover:bg-white/70'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </section>

            {/* BRANDING INTRODUCTORY ELEVATOR */}
            <section className="bg-stone-50 border-y border-stone-200/50 py-12 px-4 sm:px-6 lg:px-8 text-center" id="brand-story-dock">
              <div className="max-w-3xl mx-auto space-y-2 sm:space-y-4">
                <span className="font-mono text-xs text-amber-800 tracking-[0.3em] font-bold uppercase">
                  OUR PHILOSOPHY
                </span>
                <h2 className="font-serif text-xl sm:text-3xl font-semibold text-stone-900 tracking-wide uppercase">
                  Akash Collection — Stitching Legacy Since 2012
                </h2>
                <div className="w-16 h-[1.5px] bg-amber-800 mx-auto" />
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto font-serif">
                  Influenced by Libas Asghar and major Pakistani classic fashion houses, we produce highly luxurious unstitched fabrics alongside modern co-ords tailored with meticulous stitch densities. Utilizing 100% fine cotton fiber and master artisan crew embroideries, we present high-street fashion directly to your doorsteps.
                </p>
              </div>
            </section>

            {/* ANCHOR LINK */}
            <div id="collection-anchor" className="scroll-mt-24" />

            {/* MAIN CATALOG E-COMMERCE SECTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="main-catalog-grid-box">
              <div className="flex flex-col lg:flex-row gap-8" id="catalog-flex-wrapper">
                
                {/* A. Collapsible Filters Sidebar Component (Desktop) */}
                <aside className="hidden lg:block w-64 flex-shrink-0 space-y-6" id="desktop-filters-sidebar">
                  {/* Category clear indicator */}
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="font-serif text-sm font-bold tracking-wider uppercase text-gray-900 flex items-center gap-1.5">
                      <Filter size={15} />
                      <span>Refine Collection</span>
                    </span>
                    <button
                      id="reset-filter-btn"
                      onClick={handleResetFilters}
                      className="text-[10px] font-mono text-amber-800 hover:text-black font-semibold flex items-center gap-1 focus:outline-none hover:underline"
                    >
                      <RotateCcw size={11} />
                      <span>Reset All</span>
                    </button>
                  </div>

                  {/* Filter Group: Fabric type */}
                  <div className="space-y-2.5">
                    <span className="text-[11px] font-mono font-bold tracking-wider text-gray-500 uppercase block">Pure Fabrics</span>
                    <div className="space-y-1.5 text-xs text-gray-700">
                      {uniqueFabrics.map(fab => (
                        <label key={fab} className="flex items-center gap-2 cursor-pointer hover:text-black select-none">
                          <input
                            type="checkbox"
                            checked={filters.fabrics.includes(fab)}
                            onChange={() => toggleFilterFabric(fab)}
                            className="rounded border-gray-300 text-amber-800 focus:ring-0 w-3.5 h-3.5"
                          />
                          <span>{fab}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Filter Group: Piece configuration */}
                  <div className="space-y-2.5 pt-4 border-t border-gray-100">
                    <span className="text-[11px] font-mono font-bold tracking-wider text-gray-500 uppercase block">Piece Counts</span>
                    <div className="space-y-1.5 text-xs text-gray-700">
                      {uniquePieces.map(pc => (
                        <label key={pc} className="flex items-center gap-2 cursor-pointer hover:text-black select-none">
                          <input
                            type="checkbox"
                            checked={filters.pieces.includes(pc as any)}
                            onChange={() => toggleFilterPiece(pc)}
                            className="rounded border-gray-300 text-amber-800 focus:ring-0 w-3.5 h-3.5"
                          />
                          <span>{pc}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Filter Group: Sizes */}
                  <div className="space-y-2.5 pt-4 border-t border-gray-100">
                    <span className="text-[11px] font-mono font-bold tracking-wider text-gray-500 uppercase block">Available Sizes</span>
                    <div className="flex gap-1.5 flex-wrap">
                      {uniqueSizes.map(sz => (
                        <button
                          key={sz}
                          id={`filter-sz-btn-${sz}`}
                          onClick={() => toggleFilterSize(sz)}
                          className={`border rounded px-2.5 py-1 text-[10px] font-mono font-semibold transition-all uppercase ${
                            filters.sizes.includes(sz)
                              ? 'bg-black text-white border-black'
                              : 'bg-white border-gray-200 text-gray-700 hover:border-black'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Filter Group: Price range quick tabs */}
                  <div className="space-y-2.5 pt-4 border-t border-gray-100">
                    <span className="text-[11px] font-mono font-bold tracking-wider text-gray-500 uppercase block">Price Range</span>
                    <div className="space-y-1.5 text-xs text-gray-700">
                      <button
                        id="price-tab-all"
                        onClick={() => setFilters(p => ({ ...p, priceRange: [1000, 15000] }))}
                        className={`text-left block w-full py-1 ${filters.priceRange[1] === 15000 && filters.priceRange[0] === 1000 ? 'font-bold text-amber-800' : 'hover:text-black'}`}
                      >
                        All Prices
                      </button>
                      <button
                        id="price-tab-under3k"
                        onClick={() => setFilters(p => ({ ...p, priceRange: [1000, 3000] }))}
                        className={`text-left block w-full py-1 ${filters.priceRange[1] === 3000 ? 'font-bold text-amber-800' : 'hover:text-black'}`}
                      >
                        Budget Friendly (Under Rs. 3,000)
                      </button>
                      <button
                        id="price-tab-under6k"
                        onClick={() => setFilters(p => ({ ...p, priceRange: [3000, 6000] }))}
                        className={`text-left block w-full py-1 ${filters.priceRange[0] === 3000 && filters.priceRange[1] === 6000 ? 'font-bold text-amber-800' : 'hover:text-black'}`}
                      >
                        Mid Range (Rs. 3,000 - Rs. 6,000)
                      </button>
                      <button
                        id="price-tab-festive7k"
                        onClick={() => setFilters(p => ({ ...p, priceRange: [6000, 15000] }))}
                        className={`text-left block w-full py-1 ${filters.priceRange[0] === 6000 ? 'font-bold text-amber-800' : 'hover:text-black'}`}
                      >
                        Premium Luxe (Above Rs. 6,000)
                      </button>
                    </div>
                  </div>
                </aside>

                {/* B. Core Product Grid Content of Catalog */}
                <div className="flex-grow space-y-6" id="catalog-products-side">
                  {/* Category banner description & sort header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4" id="catalog-subheader">
                    <div>
                      <h2 className="font-serif text-lg font-bold text-gray-950 uppercase tracking-wider flex items-center gap-1.5">
                        <span>
                          {selectedCategory === 'all' ? 'All catalog' : `${selectedCategory} Collection`}
                        </span>
                        <span className="text-xs font-mono font-normal text-gray-400 bg-gray-100 py-0.5 px-2 rounded-full">
                          {filteredProducts.length} items
                        </span>
                      </h2>
                      <p className="text-xs text-gray-500 mt-0.5" id="catalog-subhead-desc">
                        Showing authentic, double-washed luxury cotton lawns and ready clothes.
                      </p>
                    </div>

                    {/* Sorting selectors and mobile refinement button */}
                    <div className="flex items-center gap-2 self-start sm:self-auto" id="sorting-selection-row">
                      {/* Mobile filter toggle */}
                      <button
                        id="mobile-filter-drawer-open"
                        onClick={() => setIsMobileFilterOpen(true)}
                        className="lg:hidden flex items-center gap-1.5 text-xs text-gray-700 font-semibold border border-gray-200 hover:border-black rounded-lg px-3 py-1.5 bg-white transition-all"
                      >
                        <Filter size={14} />
                        <span>Filter</span>
                      </button>

                      {/* Sorting Dropdown */}
                      <label htmlFor="catalog-sort" className="hidden sm:inline text-xs text-gray-400 font-mono">Sort By:</label>
                      <select
                        id="catalog-sort"
                        value={filters.sortBy}
                        onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                        className="bg-white border border-gray-250 rounded-lg py-1.5 px-3 text-xs outline-none focus:border-black min-w-[130px]"
                      >
                        <option value="best-seller">Best Selling Articles</option>
                        <option value="price-low-high">Price: Low to High</option>
                        <option value="price-high-low">Price: High to Low</option>
                        <option value="newest">Latest Collections</option>
                      </select>
                    </div>
                  </div>

                  {/* Render filters chips if active */}
                  {(filters.fabrics.length > 0 || filters.pieces.length > 0 || filters.sizes.length > 0 || filters.search !== '' || selectedCategory !== 'all') && (
                    <div className="flex flex-wrap items-center gap-2" id="filter-chips-row">
                      <span className="text-[10px] font-mono text-gray-400">ACTIVE CO-ORDS:</span>
                      
                      {selectedCategory !== 'all' && (
                        <span className="bg-amber-50 text-amber-900 border border-amber-250 text-[10px] font-mono px-2 py-0.5 rounded-sm flex items-center gap-1 font-semibold uppercase">
                          <span>Theme: {selectedCategory}</span>
                          <button onClick={() => setSelectedCategory('all')} className="hover:text-black">×</button>
                        </span>
                      )}

                      {filters.fabrics.map(fab => (
                        <span key={fab} className="bg-gray-150 text-gray-800 border border-gray-200 text-[10px] font-mono px-2 py-0.5 rounded-sm flex items-center gap-1">
                          <span>{fab}</span>
                          <button onClick={() => toggleFilterFabric(fab)} className="hover:text-black">×</button>
                        </span>
                      ))}

                      {filters.pieces.map(pc => (
                        <span key={pc} className="bg-gray-150 text-gray-800 border border-gray-200 text-[10px] font-mono px-2 py-0.5 rounded-sm flex items-center gap-1">
                          <span>{pc}</span>
                          <button onClick={() => toggleFilterPiece(pc)} className="hover:text-black">×</button>
                        </span>
                      ))}

                      {filters.sizes.map(sz => (
                        <span key={sz} className="bg-gray-150 text-gray-800 border border-gray-200 text-[10px] font-mono px-2 py-0.5 rounded-sm flex items-center gap-1 select-none">
                          <span className="uppercase">{sz}</span>
                          <button onClick={() => toggleFilterSize(sz)} className="hover:text-black">×</button>
                        </span>
                      ))}

                      {filters.search && (
                        <span className="bg-gray-150 text-gray-800 border border-gray-200 text-[10px] font-mono px-2 py-0.5 rounded-sm flex items-center gap-1 uppercase select-none">
                          <span>Term: "{filters.search}"</span>
                          <button onClick={() => { setSearchTerm(''); setFilters(p => ({ ...p, search: '' })); }} className="hover:text-black">×</button>
                        </span>
                      )}

                      <button
                        id="clear-all-chips-btn"
                        onClick={handleResetFilters}
                        className="text-[10px] font-mono font-bold text-amber-800 hover:underline"
                      >
                        Wipe All
                      </button>
                    </div>
                  )}

                  {/* Empty state visual */}
                  {filteredProducts.length === 0 ? (
                    <div className="text-center py-16 border rounded-xl border-dashed border-gray-200 space-y-3.5" id="empty-filtered-view">
                      <div className="bg-gray-50 text-gray-300 rounded-full w-12 h-12 flex items-center justify-center mx-auto">
                        <Sparkles size={24} />
                      </div>
                      <div>
                        <h4 className="font-serif text-sm font-semibold text-gray-900">No matching articles in inventory</h4>
                        <p className="text-gray-500 text-xs mt-1.5 max-w-sm mx-auto leading-relaxed">
                          We couldn't locate any items matching your selected criteria. Try resetting filters or changing fabric toggles.
                        </p>
                      </div>
                      <button
                        id="reset-empty-catalog-btn"
                        onClick={handleResetFilters}
                        className="bg-black hover:bg-neutral-800 text-white font-mono text-[10px] font-bold tracking-widest px-5 py-2 rounded-lg transition-colors"
                      >
                        DISCOVER DEFAULTS
                      </button>
                    </div>
                  ) : (
                    /* The dynamic Grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" id="catalog-products-cards-grid">
                      {filteredProducts.map(product => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onQuickView={setQuickViewProduct}
                          onAddToCart={handleAddToCart}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* TRUST COURIER LOGISTICS ROW */}
            <section className="bg-[#1A1A1A] text-white py-14 px-4 sm:px-6 lg:px-8 border-t border-gray-800" id="trust-metrics-section">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center" id="trust-metrics-grid">
                <div className="space-y-2 flex flex-col items-center">
                  <div className="p-3 bg-amber-800/10 rounded-full text-amber-400">
                    <Truck size={24} />
                  </div>
                  <h3 className="font-serif text-base font-bold text-gray-100 uppercase tracking-wider">Fast Courier Dispatch</h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans max-w-xs">
                    Parcels are wrapped securely in waterproof courier envelopes and shipped from our central warehouse. Full tracking details provided.
                  </p>
                </div>

                <div className="space-y-2 flex flex-col items-center border-y border-gray-800 md:border-y-0 md:border-x md:px-4 py-6 md:py-0">
                  <div className="p-3 bg-amber-800/10 rounded-full text-amber-400">
                    <Clock size={24} />
                  </div>
                  <h3 className="font-serif text-base font-bold text-gray-100 uppercase tracking-wider">24/7 Customer WhatsApp</h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans max-w-xs">
                    Need help tailoring sizes or checking stock? Out of hours? Send a quick text on WhatsApp: +92 300 8123456. Friendly, instant support.
                  </p>
                </div>

                <div className="space-y-2 flex flex-col items-center">
                  <div className="p-3 bg-amber-800/10 rounded-full text-amber-400">
                    <ShieldCheck size={24} />
                  </div>
                  <h3 className="font-serif text-base font-bold text-gray-100 uppercase tracking-wider">Secure Cash Payment</h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans max-w-xs">
                    Risk-free checkout. Only pays the cash to leopards courier agent once you receive the sealed brand parcel directly in your hands.
                  </p>
                </div>
              </div>
            </section>

            {/* TESTIMONIAL REVIEW CAROUSEL */}
            <section className="bg-stone-50 py-16 px-4 sm:px-6 lg:px-8" id="testimonials-carousel-box">
              <div className="max-w-5xl mx-auto space-y-8">
                <div className="text-center space-y-1.5">
                  <span className="font-mono text-[10px] text-amber-800 tracking-[0.2em] font-bold uppercase block">HAPPY CLIENTS REVIEWED</span>
                  <h2 className="font-serif text-2xl font-bold text-stone-900 uppercase">Verifiable Feedback From Pakistani Buyers</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="testimonials-cards-grid">
                  {MOCK_REVIEWS.map(rev => (
                    <div key={rev.id} className="bg-white p-5 rounded-xl border border-stone-150 hover:shadow-md transition-shadow flex flex-col justify-between" id={`review-card-${rev.id}`}>
                      <div>
                        {/* Rating stars */}
                        <div className="flex gap-0.5 text-amber-500 mb-2.5">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <span key={i} className="text-sm font-bold">★</span>
                          ))}
                        </div>
                        <p className="text-xs text-gray-600 italic leading-relaxed font-serif">
                          "{rev.comment}"
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[10px] font-mono text-gray-400">
                        <div>
                          <p className="font-sans font-bold text-stone-800 text-[11px] block text-left leading-none mb-0.5">{rev.customerName}</p>
                          <span>{rev.date}</span>
                        </div>
                        {rev.verified && (
                          <span className="text-emerald-700 bg-emerald-50 px-1 rounded-sm text-[9px] font-bold">✓ VERIFIED</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

          </div>
        )}

        {/* B. Checkout Form View */}
        {currentView === 'checkout' && (
          <CheckoutSection
            cart={cart}
            onBackToCart={() => {
              setCurrentView('store');
              window.scrollTo({ top: 0, behavior: 'instant' });
            }}
            onSubmitOrder={handlePlaceOrder}
          />
        )}

        {/* C. Order confirmed success View */}
        {currentView === 'success' && latestOrder && (
          <OrderSuccessModal
            order={latestOrder}
            onContinueShopping={() => {
              setCurrentView('store');
              setSelectedCategory('all');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* 3. Global components and sliders */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveItem={handleRemoveCartItem}
        onUpdateQty={handleUpdateCartQty}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setCurrentView('checkout');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {isTrackOpen && (
        <TrackOrderModal
          onClose={() => setIsTrackOpen(false)}
          orders={placedOrders}
        />
      )}

      {/* Floating WhatsApp Action Button for Easy Pakistan Support */}
      <a
        id="floating-pk-whatsapp-cta"
        href="https://wa.me/923008123456"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#20BA5A] text-white p-3.5 rounded-full shadow-2xl z-30 transition-transform duration-300 hover:scale-110 flex items-center justify-center group focus:outline-none"
        title="WhatsApp Support / order clothes"
      >
        <MessageSquare size={22} className="relative z-10" />
        <span className="absolute right-12 bg-black text-white text-[10px] font-mono px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md selection:bg-transparent">
          WhatsApp Order Assistant
        </span>
      </a>

      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Mobile Drawer Filter panel */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden" id="mobile-filter-mask">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileFilterOpen(false)} />
          
          <div className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white p-5 shadow-xl" id="mobile-filters-drawer-body">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
              <span className="font-serif text-sm font-bold tracking-wider uppercase text-gray-900">
                Filter Selection
              </span>
              <button
                id="close-mobile-filter-btn"
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded-full bg-gray-50 text-gray-600 hover:text-black hover:bg-gray-150 border"
              >
                <X size={15} />
              </button>
            </div>

            {/* Content duplicator */}
            <div className="space-y-6 text-xs text-gray-700" id="mobile-filters-content-space">
              
              {/* Fabrics */}
              <div className="space-y-2.5">
                <span className="text-[10px] font-mono font-bold tracking-wider text-gray-500 uppercase block">Pure Fabrics</span>
                <div className="space-y-2">
                  {uniqueFabrics.map(fab => (
                    <label key={fab} className="flex items-center gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={filters.fabrics.includes(fab)}
                        onChange={() => toggleFilterFabric(fab)}
                        className="rounded border-gray-300 text-amber-800 focus:ring-0 w-4 h-4"
                      />
                      <span>{fab}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Pieces */}
              <div className="space-y-2.5 pt-4 border-t border-gray-100">
                <span className="text-[10px] font-mono font-bold tracking-wider text-gray-500 uppercase block">Piece Configuration</span>
                <div className="space-y-2">
                  {uniquePieces.map(pc => (
                    <label key={pc} className="flex items-center gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={filters.pieces.includes(pc as any)}
                        onChange={() => toggleFilterPiece(pc)}
                        className="rounded border-gray-300 text-amber-800 focus:ring-0 w-4 h-4"
                      />
                      <span>{pc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="space-y-2.5 pt-4 border-t border-gray-100">
                <span className="text-[10px] font-mono font-bold tracking-wider text-gray-500 uppercase block">Available Sizes</span>
                <div className="flex gap-2 flex-wrap">
                  {uniqueSizes.map(sz => (
                    <button
                      key={sz}
                      onClick={() => toggleFilterSize(sz)}
                      className={`border rounded px-3 py-1.5 text-[10px] font-mono font-semibold transition-all uppercase ${
                        filters.sizes.includes(sz)
                          ? 'bg-black text-white border-black'
                          : 'bg-white border-gray-200 text-gray-700 hover:border-black'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action buttons inside drawer */}
              <div className="pt-6 border-t border-gray-100 flex gap-2" id="mobile-filter-drawer-actions">
                <button
                  id="mobile-wipe-filters-btn"
                  onClick={() => {
                    handleResetFilters();
                    setIsMobileFilterOpen(false);
                  }}
                  className="w-1/2 border border-black hover:bg-gray-50 text-black font-semibold font-mono text-[10px] py-3 rounded-lg text-center"
                >
                  Wipe All
                </button>
                <button
                  id="mobile-apply-filters-btn"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-1/2 bg-black hover:bg-neutral-800 text-white font-semibold font-mono text-[10px] py-3 rounded-lg text-center shadow-md pb-3"
                >
                  Show ({filteredProducts.length}) Items
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 4. Elegant footer */}
      <footer className="bg-stone-900 text-gray-400 text-xs py-12 px-4 sm:px-6 lg:px-8 border-t border-stone-850" id="main-footer">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8" id="footer-links-grid">
          
          <div className="space-y-3" id="footer-col-about">
            <span className="font-serif text-lg tracking-widest text-white uppercase block">AKASH</span>
            <span className="text-[9px] font-mono text-gray-500 tracking-[0.4em] block uppercase -mt-2">COLLECTION.PK</span>
            <p className="text-[11px] text-gray-500 leading-relaxed font-sans pr-2">
              Premium clothing brand catering to custom prints and unstitched lawn catalog articles. Crafted meticulously in Lahore since 2012.
            </p>
          </div>

          <div className="space-y-3" id="footer-col-help">
            <h4 className="font-serif text-sm font-bold text-gray-100 uppercase tracking-widest">Customer Care</h4>
            <ul className="space-y-1.5 font-mono text-[11px]">
              <li><button onClick={() => setIsTrackOpen(true)} className="hover:text-white footer-link focus:outline-none">Shipment tracking status</button></li>
              <li><a href="#collection-anchor" className="hover:text-white footer-link">Lawn stitching guide</a></li>
              <li><a href="#collection-anchor" className="hover:text-white footer-link">Returns & cancellations policies</a></li>
              <li><a href="#collection-anchor" className="hover:text-white footer-link">Frequent Queries (FAQs)</a></li>
            </ul>
          </div>

          <div className="space-y-3" id="footer-col-quick">
            <h4 className="font-serif text-sm font-bold text-gray-100 uppercase tracking-widest">Collections</h4>
            <ul className="space-y-1.5 font-mono text-[11px] uppercase">
              <li><button onClick={() => { setSelectedCategory('unstitched'); const a = document.getElementById('collection-anchor'); if(a) a.scrollIntoView(); }} className="hover:text-white text-left focus:outline-none">Unstitched Luxury Lawn</button></li>
              <li><button onClick={() => { setSelectedCategory('ready-to-wear'); const a = document.getElementById('collection-anchor'); if(a) a.scrollIntoView(); }} className="hover:text-white text-left focus:outline-none">Ready to Wear Coordinates</button></li>
              <li><button onClick={() => { setSelectedCategory('festive'); const a = document.getElementById('collection-anchor'); if(a) a.scrollIntoView(); }} className="hover:text-white text-left focus:outline-none">Festive Organza & Silk</button></li>
              <li><button onClick={() => { setSelectedCategory('sale'); const a = document.getElementById('collection-anchor'); if(a) a.scrollIntoView(); }} className="hover:text-white font-bold text-amber-500 text-left focus:outline-none">Seasonal flat 30% discount</button></li>
            </ul>
          </div>

          <div className="space-y-3 font-mono text-[11px]" id="footer-col-contact">
            <h4 className="font-serif text-sm font-bold text-gray-100 uppercase tracking-widest">Business coordinates</h4>
            <p className="flex items-start gap-1">
              <span>Retail Outlet: Shop #14, Ground Floor, Liberty Plaza, Gulberg III, Lahore, Pakistan.</span>
            </p>
            <p className="flex items-center gap-1.5 mt-1.5">
              <span>Customer HelpDesk: +92 300 8123456</span>
            </p>
            <p className="flex items-center gap-1.5">
              <span>Email Booking: support@akashcollection.pk</span>
            </p>
          </div>

        </div>

        {/* Footer base credits */}
        <div className="max-w-7xl mx-auto pt-8 border-t border-stone-850 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 font-mono text-center" id="footer-bottom-credit">
          <p>© 2026 Akash Collection Pakistan. All Rights Reserved. Registration ID NTN 8941258-2.</p>
          <div className="flex gap-4">
            <a href="#app-root-layout" className="hover:text-white">Security Policies</a>
            <span>•</span>
            <a href="#app-root-layout" className="hover:text-white">Usage Regulations</a>
            <span>•</span>
            <a href="#app-root-layout" className="hover:text-white opacity-20">Designed by Gulberg Studios</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
