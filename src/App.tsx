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
  Heart,
  Facebook,
  Youtube,
  Instagram,
  Mail,
  MapPin,
  Phone,
  BadgeCheck
} from 'lucide-react';

import Header from './components/Header';
import ProductCard from './components/ProductCard';
import QuickViewModal from './components/QuickViewModal';
import CartDrawer from './components/CartDrawer';
import CheckoutSection from './components/CheckoutSection';
import OrderSuccessModal from './components/OrderSuccessModal';
import TrackOrderModal from './components/TrackOrderModal';
import NewsletterSubscription from './components/NewsletterSubscription';
import SmtpDiagnosticModal from './components/SmtpDiagnosticModal';

import { PRODUCTS, MOCK_REVIEWS } from './data/products';
import { Product, CartItem, FilterState, Order, CustomerDetails } from './types';

// Banners generated with timestamps
const unstitchedBannerImg = '/src/assets/images/unstitched_banner_1782097511336.jpg';
const rtwBannerImg = '/src/assets/images/ready_to_wear_banner_1782097529638.jpg';

export default function App() {
  // Navigation & Page State
  const [currentView, setCurrentView] = useState<'store' | 'checkout' | 'success'>('store');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'unstitched' | 'ready-to-wear' | 'festive' | 'sale' | 'wishlist'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Cart & Orders State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [placedOrders, setPlacedOrders] = useState<Order[]>([]);
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);

  // Favorites & Toasts State
  const [favorites, setFavorites] = useState<number[]>([]);
  const [toasts, setToasts] = useState<{
    id: string;
    title: string;
    message: string;
    type: 'favorite' | 'unfavorite' | 'success';
  }[]>([]);

  // Toast dispatch helper
  const triggerToast = (title: string, message: string, type: 'favorite' | 'unfavorite' | 'success') => {
    const id = Date.now().toString() + Math.random().toString().substr(2, 5);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const handleToggleFavorite = (product: Product) => {
    const isFav = favorites.includes(product.id);
    let updated: number[];
    if (isFav) {
      updated = favorites.filter(id => id !== product.id);
      triggerToast('Removed from Wishlist', `${product.title} has been removed.`, 'unfavorite');
    } else {
      updated = [...favorites, product.id];
      triggerToast('Added to Wishlist', `${product.title} has been added to your favorites!`, 'favorite');
    }
    setFavorites(updated);
    localStorage.setItem('akash_collection_favorites', JSON.stringify(updated));
  };
  
  // Product Views Tracker
  const [productViews, setProductViews] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('akash_collection_product_views');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Safe fallback
      }
    }
    
    // Initial deterministic seeds based on popular demand
    return {
      'unst-001': 1482,
      'unst-002': 943,
      'unst-003': 1120,
      'unst-004': 652,
      'rtw-001': 1675,
      'rtw-002': 823,
      'rtw-003': 1198,
      'fest-001': 2490,
      'fest-002': 1850,
      'sale-001': 2130,
      'sale-002': 1340,
    };
  });

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setProductViews(prev => {
      const currentViews = prev[product.id] || 0;
      const updatedViews = currentViews + 1;
      const next = { ...prev, [product.id]: updatedViews };
      localStorage.setItem('akash_collection_product_views', JSON.stringify(next));
      
      const concurrentShoppers = Math.floor(Math.random() * 6) + 3; // 3 to 8 shoppers
      triggerToast(
        'Popular Pick', 
        `${product.title} has reached ${updatedViews.toLocaleString()} views. ${concurrentShoppers} customers are considering this article right now!`, 
        'success'
      );
      return next;
    });
  };

  // UI Modals Toggles
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isTrackOpen, setIsTrackOpen] = useState(false);
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);
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

    const savedFavorites = localStorage.getItem('akash_collection_favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        console.error('Error parsing favorites from localStorage', e);
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
    if (selectedCategory === 'all' || selectedCategory === 'wishlist') {
      setFilters(prev => ({ ...prev, types: [] }));
    } else {
      setFilters(prev => ({ ...prev, types: [selectedCategory as any] }));
    }
  }, [selectedCategory]);

  // Synchronize URL search params/hash to open quick view directly
  useEffect(() => {
    const checkProductParam = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const prId = urlParams.get('product') || window.location.hash.replace('#product-', '');
      if (prId) {
        const found = PRODUCTS.find(p => p.id === prId);
        if (found) {
          setQuickViewProduct(found);
        }
      }
      
      const sharedWishlist = urlParams.get('wishlist');
      if (sharedWishlist) {
        const sharedIds = sharedWishlist.split(',').map(Number).filter(n => !isNaN(n));
        if (sharedIds.length > 0) {
          setFavorites(sharedIds);
          setSelectedCategory('wishlist');
          triggerToast('Wishlist Imported', 'We loaded the shared curated collection for you!', 'favorite');
        }
      }
    };
    checkProductParam();
    window.addEventListener('hashchange', checkProductParam);
    return () => window.removeEventListener('hashchange', checkProductParam);
  }, []);

  // Dynamic SEO Meta Tags for Product Quick View
  useEffect(() => {
    // Helper to safely update meta tags
    const updateMetaTag = (nameOrProperty: 'name' | 'property', key: string, content: string) => {
      let el = document.querySelector(`meta[${nameOrProperty}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(nameOrProperty, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    if (quickViewProduct) {
      const title = `${quickViewProduct.title} - ${quickViewProduct.sku} | Akash Collection Wholesale`;
      const desc = `Shop ${quickViewProduct.title} (${quickViewProduct.sku}). ${quickViewProduct.description.substring(0, 150)}... Price: Rs. ${quickViewProduct.price.toLocaleString()}.`;
      const imageUrl = quickViewProduct.image;

      document.title = title;
      updateMetaTag('name', 'description', desc);
      updateMetaTag('property', 'og:title', title);
      updateMetaTag('property', 'og:description', desc);
      updateMetaTag('property', 'og:image', imageUrl);
      updateMetaTag('property', 'twitter:title', title);
      updateMetaTag('property', 'twitter:description', desc);
      updateMetaTag('property', 'twitter:image', imageUrl);

      // Update URL without reloading
      const url = new URL(window.location.href);
      url.searchParams.set('product', quickViewProduct.id.toString());
      window.history.pushState({}, '', url.toString());

    } else {
      // Revert to default
      const defaultTitle = "Akash Collection Wholesale Pakistan | Premium Unstitched Lawn & Ready-to-Wear";
      const defaultDesc = "Premium clothing brand catering to exquisite custom prints and unstitched lawn catalog articles in Pakistan. Shop high-quality luxury fabrics, ready-to-wear, and festive collections wholesale and retail.";
      const defaultImage = "https://akashcollection.pk/meta-image.jpg";

      document.title = defaultTitle;
      updateMetaTag('name', 'description', defaultDesc);
      updateMetaTag('property', 'og:title', defaultTitle);
      updateMetaTag('property', 'og:description', defaultDesc);
      updateMetaTag('property', 'og:image', defaultImage);
      updateMetaTag('property', 'twitter:title', defaultTitle);
      updateMetaTag('property', 'twitter:description', defaultDesc);
      updateMetaTag('property', 'twitter:image', defaultImage);

      // Remove product param from URL
      const url = new URL(window.location.href);
      if (url.searchParams.has('product')) {
        url.searchParams.delete('product');
        window.history.pushState({}, '', url.toString());
      }
    }
  }, [quickViewProduct]);

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

    // Send order directly to Gmail/Admin Mailbox via our server-side API
    fetch('/api/place-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ order: newOrder }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          if (data.emailSent) {
            triggerToast('Order Submitted', `Order placed! Notification email successfully delivered to ${data.recipient || 'your inbox'}.`, 'success');
          } else {
            console.warn(data.message);
            // Help the user understand if they had configured SMTP but it failed versus if it wasn't set up yet
            const isConfiguredAttempt = data.message && (data.message.includes('sending error') || data.message.includes('failed') || data.message.includes('rejected'));
            if (isConfiguredAttempt) {
              triggerToast('⚠️ SMTP Mailer Warning', `Order placed, but email could not be delivered: ${data.message}. Test credentials using the Diagnostics link in the footer!`, 'success');
            } else {
              triggerToast('Order Submitted', 'Order received! Configure SMTP/Gmail credentials via setting variables to enable automated inbox notifications.', 'success');
            }
          }
        }
      })
      .catch((err) => {
        console.error('Failed to dispatch order notification email:', err);
      });

    // Wipe cart in storage
    saveCartToStorage([]);
    localStorage.removeItem('akash_cart_discount_percent');

    // Slide to success panel
    setCurrentView('success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter products matching dynamic states
  const filteredProducts = PRODUCTS.filter(product => {
    if (selectedCategory === 'wishlist') {
      if (!favorites.includes(product.id)) return false;
    }

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
        favoritesCount={favorites.length}
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
                  <div className="absolute inset-0 bg-gradient-to-r from-stone-950/75 via-stone-900/40 to-transparent flex items-center p-6 sm:p-12 md:p-20">
                    <div className="max-w-md md:max-w-xl text-white space-y-2 sm:space-y-4 pr-4">
                      <span className="font-sans text-[9px] sm:text-xs text-stone-300 font-semibold tracking-[0.3em] uppercase block">
                        {item.subtitle}
                      </span>
                      <h1 className="font-serif text-2xl sm:text-5xl md:text-6xl font-normal tracking-tight leading-tight text-white">
                        {item.title}
                      </h1>
                      <p className="hidden sm:block text-xs sm:text-sm text-stone-200 leading-relaxed font-sans font-light opacity-90 max-w-md">
                        {item.desc}
                      </p>
                      <button
                        id={`hero-cta-btn-${index}`}
                        onClick={() => {
                          setSelectedCategory(item.category as any);
                          const el = document.getElementById('collection-anchor');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="bg-stone-900 hover:bg-stone-800 border border-stone-800 text-white transition-all text-[10px] uppercase font-semibold py-3 px-8 tracking-[0.2em] hover:shadow-xl flex items-center gap-1.5 mt-4 transition-all duration-300"
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
                  Akash Collection Wholesale — A Unique Online Brand Since 2021
                </h2>
                <div className="w-16 h-[1.5px] bg-amber-800 mx-auto" />
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto font-serif">
                  Launched online in 2021, we are a unique brand producing highly luxurious unstitched fabrics alongside modern co-ords tailored with meticulous stitch densities. Utilizing 100% fine cotton fiber and master artisan crew embroideries, we proudly bring our exclusive high-street fashion directly to your doorsteps.
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
                      <h2 className="font-serif text-lg font-bold text-gray-950 uppercase tracking-wider flex items-center gap-1.5 flex-wrap">
                        <span>
                          {selectedCategory === 'all' ? 'All catalog' : selectedCategory === 'wishlist' ? 'My Wishlist' : `${selectedCategory} Collection`}
                        </span>
                        <span className="text-xs font-mono font-normal text-gray-400 bg-gray-100 py-0.5 px-2 rounded-full">
                          {filteredProducts.length} items
                        </span>
                        {selectedCategory === 'wishlist' && favorites.length > 0 && (
                          <button
                            id="share-wishlist-btn"
                            onClick={() => {
                              const productIds = favorites.join(',');
                              const shareUrl = `${window.location.origin}${window.location.pathname}?wishlist=${productIds}`;
                              
                              if (navigator.share) {
                                navigator.share({
                                  title: 'My Curated Collection from Akash',
                                  text: 'Check out my favorite luxury pieces at Akash Collection Wholesale!',
                                  url: shareUrl,
                                }).catch(() => {
                                  navigator.clipboard.writeText(shareUrl);
                                  triggerToast('Link Copied', 'Your wishlist link has been copied to clipboard!', 'success');
                                });
                              } else {
                                navigator.clipboard.writeText(shareUrl);
                                triggerToast('Link Copied', 'Your wishlist link has been copied to clipboard!', 'success');
                              }
                            }}
                            className="ml-2 inline-flex items-center gap-1.5 text-[9px] uppercase font-bold tracking-widest text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1 rounded-full transition-colors whitespace-nowrap"
                          >
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="18" cy="5" r="3"></circle>
                              <circle cx="6" cy="12" r="3"></circle>
                              <circle cx="18" cy="19" r="3"></circle>
                              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                            </svg>
                            Share Collection
                          </button>
                        )}
                      </h2>
                      <p className="text-xs text-gray-500 mt-1" id="catalog-subhead-desc">
                        {selectedCategory === 'wishlist' 
                          ? 'Your curated selection of exquisite premium lawn pieces.'
                          : 'Showing authentic, double-washed luxury cotton lawns and ready clothes.'}
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
                          onQuickView={handleQuickView}
                          onAddToCart={handleAddToCart}
                          isFavorite={favorites.includes(product.id)}
                          onToggleFavorite={handleToggleFavorite}
                          views={productViews[product.id] || 0}
                          isTrending={(productViews[product.id] || 0) >= 1200}
                          onShareSuccess={(title, message) => triggerToast(title, message, 'success')}
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
                    Need help tailoring sizes or checking stock? Out of hours? Send a quick text on WhatsApp: +92 334 7272246. Friendly, instant support.
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

            {/* NEWSLETTER SUBSCRIPTION SECTION */}
            <NewsletterSubscription />

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

      {isDiagnosticOpen && (
        <SmtpDiagnosticModal
          onClose={() => setIsDiagnosticOpen(false)}
        />
      )}


      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
          onShareSuccess={(title, message) => triggerToast(title, message, 'success')}
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
          
          <div className="space-y-4" id="footer-col-about">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="font-serif text-lg tracking-widest text-white uppercase block mt-1">AKASH</span>
                <BadgeCheck className="text-blue-500 w-5 h-5" fill="#1877F2" stroke="#1c1917" strokeWidth={1.5} />
              </div>
              <span className="text-[9px] font-mono text-gray-500 tracking-[0.4em] block uppercase">COLLECTION.PK</span>
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed font-sans pr-2">
              Premium clothing brand catering to exquisite custom prints and unstitched lawn catalog articles. Crafted meticulously with luxury fabrics, serving Islamabad and nationwide.
            </p>
            
            {/* Social Channels Row */}
            <div className="flex items-center gap-3 pt-2" id="footer-social-icons">
              <a 
                href="https://www.facebook.com/akashcollection.pk/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full border border-stone-800 hover:border-stone-500 hover:text-white flex items-center justify-center transition-all text-gray-400 bg-stone-900/30 hover:bg-stone-800"
                title="Follow us on Facebook"
              >
                <Facebook size={13} />
              </a>
              <a 
                href="https://www.instagram.com/akashcollection.pk/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full border border-stone-800 hover:border-stone-500 hover:text-white flex items-center justify-center transition-all text-gray-400 bg-stone-900/30 hover:bg-stone-800"
                title="Follow us on Instagram"
              >
                <Instagram size={13} />
              </a>
              <a 
                href="https://www.threads.net/@akashcollection.pk" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full border border-stone-800 hover:border-stone-500 hover:text-white flex items-center justify-center transition-all text-gray-400 bg-stone-900/30 hover:bg-stone-800"
                title="Follow us on Threads"
              >
                <svg className="w-[14px] h-[14px] fill-current" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg">
                  <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2368 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2368 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.194473 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 153.118 171.796C171.127 153.784 171.033 131.647 164.842 117.159C159.157 103.859 149.034 94.6152 134.1 89.1554C134.869 86.8529 135.244 84.4447 135.244 81.996C135.244 80.5966 135.12 79.2323 134.887 77.9157C134.408 81.3396 133.313 84.6644 131.698 87.8931C130.687 89.9219 129.435 91.849 127.989 93.6669C127.054 94.8413 126.046 95.9525 124.966 97C120.916 100.932 113.805 103.02 105.766 103.02C101.999 103.02 98.2435 102.505 94.6133 101.488C94.5298 101.465 94.4485 101.444 94.3649 101.42C94.2492 101.393 94.1378 101.359 94.0221 101.332C93.9781 101.32 93.9355 101.309 93.8916 101.298C93.6826 101.24 93.4764 101.18 93.2674 101.12C85.5562 98.8875 80.0819 93.6703 76.9926 85.6263L86.6343 81.9215C87.4952 84.9782 89.658 87.5502 92.5186 89.2619C92.5695 89.294 92.6225 89.3242 92.6738 89.3556C95.4208 90.9634 98.9272 91.8021 102.668 91.8021C111.411 91.8021 117.766 87.3595 119.508 81.1685C118.847 81.2589 118.172 81.3314 117.481 81.3855C111.233 81.875 104.287 81.796 97.4394 81.401C95.5303 81.29 93.6601 81.1446 91.8617 80.9702C76.9935 79.529 65.3444 71.8546 64.966 60.0558C64.6049 48.7909 74.0047 38.6496 98.6757 37.9547C105.744 37.756 112.923 38.4552 119.863 40.0163C122.955 40.7121 125.961 41.5977 128.847 42.6681L128.851 42.6698L128.868 42.6763C132.617 44.0935 136.037 45.8851 139.066 48.0666C153.254 58.2831 161.764 74.6212 161.42 95.8344C161.121 114.28 152.052 129.544 135.539 135.78C127.343 138.875 118.066 140.093 108.973 139.261C101.442 138.57 93.9961 136.702 88.0829 133.093C81.867 129.3 77.6256 123.018 77.0181 114.471C76.5413 107.781 81.2057 101.815 88.4283 99.191C88.6653 99.1051 88.9056 99.0207 89.1485 98.9392L85.4526 89.7046L85.3986 89.7226Z"/>
                </svg>
              </a>
              <a 
                href="https://www.tiktok.com/@akashcollection.pk/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full border border-stone-800 hover:border-stone-500 hover:text-white flex items-center justify-center transition-all text-gray-400 bg-stone-900/30 hover:bg-stone-800"
                title="Follow us on TikTok"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.09-1.47-.29-.21-.57-.44-.82-.69-.01 3.64.02 7.28-.01 10.92-.09 1.95-.91 3.86-2.5 5.01-1.9 1.42-4.52 1.79-6.75 1.01-2.45-.82-4.32-3.08-4.75-5.63-.56-3.13 1.04-6.49 3.93-7.75.92-.41 1.93-.6 2.94-.57l.02 4.09c-1.12-.13-2.3.26-3.01 1.14-.65.78-.69 2-.15 2.89.58.98 1.83 1.45 2.92 1.14 1-.26 1.69-1.21 1.7-2.25l-.01-17.31z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="space-y-3" id="footer-col-help">
            <h4 className="font-serif text-sm font-bold text-gray-100 uppercase tracking-widest">Customer Care</h4>
            <ul className="space-y-1.5 font-mono text-[11px]">
              <li><button onClick={() => setIsTrackOpen(true)} className="hover:text-white footer-link focus:outline-none">Shipment tracking status</button></li>
              <li><a href="#collection-anchor" className="hover:text-white footer-link">Lawn stitching guide</a></li>
              <li><a href="#collection-anchor" className="hover:text-white footer-link">Returns & cancellations policies</a></li>
              <li><a href="#collection-anchor" className="hover:text-white footer-link">Frequent Queries (FAQs)</a></li>
              <li><button onClick={() => setIsDiagnosticOpen(true)} className="text-amber-500 hover:text-amber-400 footer-link focus:outline-none font-bold">Diagnostics: Test SMTP mailer</button></li>
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

          <div className="space-y-3 font-sans text-[11px]" id="footer-col-contact">
            <h4 className="font-serif text-sm font-bold text-gray-100 uppercase tracking-widest">Connect with Us</h4>
            
            <div className="flex items-start gap-2 text-gray-400">
              <MapPin size={13} className="text-gray-300 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-200">Retail Headquarters</p>
                <p>Akashcollection.pk, Sohan, Islamabad, Pakistan</p>
              </div>
            </div>

            <div className="flex items-start gap-2 text-gray-400 pt-1">
              <Phone size={13} className="text-gray-300 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-200">WhatsApp & Support</p>
                <p className="font-mono">
                  <a href="https://wa.me/923347272246" target="_blank" rel="noopener noreferrer" className="hover:text-white underline">
                    +92 334 7272246
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 text-gray-400 pt-1">
              <Mail size={13} className="text-gray-300 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-200">Corporate Email</p>
                <p className="font-mono">
                  <a href="mailto:info@akashcollection.pk" className="hover:text-white underline text-stone-300">
                    info@akashcollection.pk
                  </a>
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer base credits */}
        <div className="max-w-7xl mx-auto pt-8 border-t border-stone-850 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 font-mono text-center" id="footer-bottom-credit">
          <p>© 2026 Akash Collection Wholesale Pakistan. All Rights Reserved. Registration ID NTN 8941258-2.</p>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-[10px] uppercase tracking-widest text-gray-500 font-medium">
            <a 
              href="https://RanginGfx.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="animate-rainbow-blink font-bold tracking-widest hover:scale-105 active:scale-95 transition-all text-stone-300"
              id="powered-by-rangingfx"
            >
              powered by RanginGfx.com
            </a>
          </div>
          <div className="flex gap-4">
            <a href="/sitemap.html" className="hover:text-white">Sitemap</a>
            <span>•</span>
            <a href="#app-root-layout" className="hover:text-white">Security Policies</a>
            <span>•</span>
            <a href="#app-root-layout" className="hover:text-white">Usage Regulations</a>
          </div>
        </div>
      </footer>

      {/* Toast Notifications Overlay */}
      <div 
        className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0" 
        id="global-toast-notification-container"
      >
        {toasts.map(toast => (
          <div
            key={toast.id}
            className="bg-white border border-stone-200 shadow-2xl p-4 rounded-md flex items-start gap-3 pointer-events-auto animate-slide-down select-none relative overflow-hidden"
            id={`toast-${toast.id}`}
          >
            <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-stone-900" />
            <div className="flex-shrink-0 mt-0.5" id={`toast-icon-${toast.id}`}>
              {toast.type === 'favorite' ? (
                <Heart size={16} className="fill-red-600 text-red-600 animate-pulse" />
              ) : toast.type === 'unfavorite' ? (
                <Heart size={16} className="text-stone-400" />
              ) : (
                <Sparkles size={16} className="text-stone-900" />
              )}
            </div>
            <div className="flex-grow space-y-0.5" id={`toast-content-${toast.id}`}>
              <h4 className="font-serif text-xs font-semibold text-stone-900 leading-tight">
                {toast.title}
              </h4>
              <p className="text-stone-500 text-[11px] leading-normal font-sans">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
              className="text-stone-400 hover:text-stone-700 transition-colors p-0.5 ml-2 flex-shrink-0"
              aria-label="Dismiss Notification"
              id={`toast-dismiss-${toast.id}`}
            >
              <X size={13} />
            </button>
          </div>
        ))}
      </div>

      {/* Floating Elegant WhatsApp Button */}
      <a 
        href="https://wa.me/923347272246" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-6 right-6 z-[999] bg-stone-900 border border-stone-800 text-white shadow-2xl rounded-full p-3.5 flex items-center justify-center hover:bg-stone-800 hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer pointer-events-auto"
        id="floating-whatsapp-widget"
        title="WhatsApp Order Assistant"
      >
        <div className="absolute right-full mr-3 bg-stone-900 border border-stone-800 text-white font-sans text-[10px] font-bold tracking-widest py-2 px-3 rounded-md shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none uppercase">
          WhatsApp Order Assistant
        </div>
        <svg className="w-5 h-5 fill-current text-emerald-400" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm12.008-21.75c-5.412 0-9.82 4.409-9.825 9.822-.002 1.802.469 3.562 1.365 5.123l.299.52-1.01 3.69 3.774-.99.505.299c1.498.887 3.202 1.354 4.902 1.355 5.41.002 9.818-4.407 9.824-9.822.003-2.623-1.018-5.088-2.879-6.953-1.859-1.865-4.322-2.894-6.946-2.894zm5.372 13.06c-.294-.147-1.74-.86-2.012-.958-.27-.099-.469-.147-.666.147-.196.294-.761.958-.934 1.155-.171.196-.343.221-.637.074-.294-.147-1.241-.457-2.364-1.46-.874-.78-1.464-1.744-1.636-2.038-.172-.294-.018-.453.129-.6.133-.133.294-.343.441-.515.147-.171.196-.294.294-.49.098-.196.05-.367-.025-.515-.074-.148-.666-1.606-.913-2.197-.24-.578-.48-.5-.666-.51-.173-.008-.367-.01-.563-.01-.196 0-.515.073-.784.367-.27.294-1.029 1.005-1.029 2.451s1.054 2.843 1.201 3.039c.147.196 2.074 3.167 5.025 4.444.70.304 1.249.486 1.677.622.705.224 1.345.193 1.853.117.566-.084 1.741-.711 1.986-1.396.246-.686.246-1.274.172-1.396-.073-.122-.27-.196-.564-.343z"/>
        </svg>
      </a>

    </div>
  );
}
