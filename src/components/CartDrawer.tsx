/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, ShieldCheck, Tag, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemoveItem: (index: number) => void;
  onUpdateQty: (index: number, qty: number) => void;
  onProceedToCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onRemoveItem,
  onUpdateQty,
  onProceedToCheckout
}: CartDrawerProps) {
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  
  // Shipping rule: Free for orders above Rs. 2,500; otherwise Rs. 250
  const shippingFee = subtotal === 0 ? 0 : (subtotal >= 2500 ? 0 : 250);
  
  // Discount
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const finalTotal = subtotal - discountAmount + shippingFee;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    
    const code = couponCode.trim().toUpperCase();
    if (code === 'WELCOME10' || code === 'AKASH10' || code === 'RANGINGFX.COM') {
      setDiscountPercent(10);
      setCouponSuccess('10% Discount applied successfully!');
    } else if (code === 'EID30') {
      setDiscountPercent(30);
      setCouponSuccess('FESTIVE 30% Discount applied successfully!');
    } else if (code === '') {
      setCouponError('Please enter a coupon code.');
    } else {
      setCouponError('Invalid coupon code. Try RANGINGFX.COM.');
    }
  };

  const handleCheckoutClick = () => {
    // If voucher applied, passing the discount percentage to checkout in order details could be great,
    // we can simply save it in localStorage or handle it in parent component. Let's write discount info to localStorage
    localStorage.setItem('akash_cart_discount_percent', JSON.stringify(discountPercent));
    onProceedToCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" id="cart-drawer-overlay">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Slide-out panel */}
      <div className="relative flex w-full max-w-md flex-col bg-white shadow-2xl border-l border-gray-100 h-full" id="cart-drawer-panel">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-gray-100 p-5 bg-gray-50/50" id="cart-header">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-gray-900" size={18} />
            <h2 className="font-serif text-lg font-semibold text-gray-950">Your Shopping Bag</h2>
            <span className="font-mono text-xs text-gray-500 bg-gray-200 px-2.5 py-0.5 rounded-full">
              {cart.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          </div>
          <button
            id="close-cart-btn"
            onClick={onClose}
            className="p-1 px-2.5 text-xs font-mono font-bold tracking-wider text-gray-500 hover:text-black border border-gray-200 hover:border-black rounded-lg bg-white"
          >
            CLOSE
          </button>
        </div>

        {/* Drawer Body: Cart Items */}
        <div className="flex-grow overflow-y-auto p-5 space-y-4" id="cart-items-list">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4" id="empty-cart-view">
              <div className="p-4 bg-gray-50 rounded-full text-gray-300">
                <ShoppingBag size={48} strokeWidth={1} />
              </div>
              <div>
                <h3 className="font-serif text-base font-semibold text-gray-900">Your bag is empty</h3>
                <p className="text-gray-500 text-xs mt-1.5 max-w-xs mx-auto leading-relaxed">
                  Looks like you haven't added anything here yet. Dive into our exclusive Unstitched Lawn & Festive pieces.
                </p>
              </div>
              <button
                id="shop-now-empty-btn"
                onClick={onClose}
                className="mt-2 bg-black hover:bg-neutral-800 text-white font-mono text-[10px] font-bold tracking-widest px-6 py-2.5 rounded-lg transition-all"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          ) : (
            cart.map((item, index) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${index}`}
                id={`cart-item-row-${index}`}
                className="flex gap-3.5 border-b border-gray-100 pb-4 last:border-0"
              >
                {/* Thumb */}
                <div className="w-16 h-20 bg-gray-50 rounded overflow-hidden flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Info and quantity buttons */}
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-serif text-xs sm:text-sm font-semibold text-gray-950 line-clamp-1">
                        {item.product.title}
                      </h4>
                      <button
                        id={`delete-cart-item-${index}`}
                        onClick={() => onRemoveItem(index)}
                        className="text-gray-400 hover:text-red-600 p-0.5 transition-colors focus:outline-none"
                        title="Remove Item"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                    <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                      SKU: {item.product.sku}
                    </p>
                    <p className="text-[11px] text-gray-700 mt-1 font-mono">
                      Size: <span className="font-bold bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-800 uppercase rounded-sm">{item.selectedSize}</span>
                    </p>
                  </div>

                  {/* Pricing and Adjusters */}
                  <div className="flex items-center justify-between mt-2.5">
                    {/* Size and Quant adjust */}
                    <div className="flex items-center border border-gray-200 rounded scale-90 origin-left">
                      <button
                        id={`cart-qty-dec-${index}`}
                        onClick={() => onUpdateQty(index, item.quantity - 1)}
                        className="px-1.5 py-1 hover:bg-gray-50 text-gray-500"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-2 font-mono text-xs text-gray-900 min-w-4 text-center font-bold">
                        {item.quantity}
                      </span>
                      <button
                        id={`cart-qty-inc-${index}`}
                        onClick={() => onUpdateQty(index, item.quantity + 1)}
                        className="px-1.5 py-1 hover:bg-gray-50 text-gray-500"
                        disabled={item.quantity >= item.product.stock}
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="font-serif font-bold text-xs sm:text-sm text-gray-950 block">
                        Rs. {(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer: Pricing & coupon input */}
        {cart.length > 0 && (
          <div className="border-t border-gray-100 p-5 bg-gray-50" id="cart-drawer-footer">
            {/* Promo Code Form */}
            <form onSubmit={handleApplyCoupon} className="mb-4" id="coupon-form">
              <label htmlFor="promo-input" className="text-[9px] font-mono text-gray-500 tracking-wider block mb-1 uppercase">Have a promo code? (try RANGINGFX.COM)</label>
              <div className="flex gap-2">
                <input
                  id="promo-input"
                  type="text"
                  placeholder="RANGINGFX.COM"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="bg-white border border-gray-200 rounded-md px-3 py-1.5 text-xs flex-grow outline-none focus:ring-1 focus:ring-black uppercase font-mono"
                />
                <button
                  id="apply-promo-btn"
                  type="submit"
                  className="bg-black hover:bg-neutral-800 text-white font-mono text-[10px] font-bold px-4 rounded-md transition-colors flex items-center gap-1.5"
                >
                  <Tag size={12} />
                  <span>APPLY</span>
                </button>
              </div>
              {couponError && <p id="coupon-error" className="text-red-600 text-[10px] font-mono mt-1">{couponError}</p>}
              {couponSuccess && <p id="coupon-success" className="text-emerald-700 text-[10px] font-mono mt-1 font-semibold flex items-center gap-1"><Sparkles size={10} className="animate-spin" /> {couponSuccess}</p>}
            </form>

            {/* Calculations */}
            <div className="space-y-2 border-b border-gray-200 pb-3" id="cart-pricing-details">
              <div className="flex justify-between text-xs text-gray-600">
                <span>Garment Items (Subtotal):</span>
                <span className="font-mono">Rs. {subtotal.toLocaleString()}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-xs text-emerald-700 font-semibold">
                  <span>Coupon Discount ({discountPercent}%):</span>
                  <span className="font-mono">-Rs. {discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-xs text-gray-600">
                <span>Nationwide Shipping Fee:</span>
                <span className="font-mono">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700 font-bold">FREE SHIPPING</span>
                  ) : (
                    `Rs. ${shippingFee}`
                  )}
                </span>
              </div>
              {shippingFee > 0 && (
                <p className="text-[10px] font-mono text-stone-600 italic">
                  *Add Rs. {(2500 - subtotal).toLocaleString()} more value to qualify for FREE Shipping!
                </p>
              )}
            </div>

            {/* Final checkout button */}
            <div className="mt-4" id="cart-actions-wrapper">
              <div className="flex justify-between text-sm sm:text-base font-serif font-bold text-gray-950 mb-4 items-center">
                <span>Est. Net Payable Amount:</span>
                <span className="text-lg">Rs. {finalTotal.toLocaleString()}</span>
              </div>

              <button
                id="drawer-proceed-btn"
                onClick={handleCheckoutClick}
                className="w-full bg-stone-900 hover:bg-stone-800 text-white font-sans font-semibold tracking-[0.15em] text-xs py-4 rounded-md flex items-center justify-center gap-2 transition-all shadow-md focus:ring-2 focus:ring-stone-500/20 mb-2"
              >
                <span>PROCEED TO SECURE CHECKOUT</span>
              </button>

              <button
                id="drawer-whatsapp-btn"
                type="button"
                onClick={handleCheckoutClick}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-semibold tracking-[0.15em] text-xs py-4 rounded-md flex items-center justify-center gap-2 transition-all shadow-md focus:ring-2 focus:ring-emerald-500/20"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                <span>ORDER VIA WHATSAPP (PROCEED TO SECURE CHECKOUT)</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 mt-3 text-[10px] text-gray-400 font-mono text-center">
                <ShieldCheck size={12} className="text-gray-400" />
                <span>Encrypted, authentic checkout. COD supported.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
