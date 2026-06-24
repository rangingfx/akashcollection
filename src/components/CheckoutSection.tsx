/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CalendarDays } from 'lucide-react';
import { getEstimatedDeliveryDays, formatDeliveryDateRange } from '../lib/delivery';

import { ShieldCheck, ShoppingCart, ArrowLeft, Send, Sparkles, Building2, User2, MapPin, PhoneCall } from 'lucide-react';
import { CartItem, CustomerDetails } from '../types';
import { CITIES_OF_PAKISTAN } from '../data/products';

interface CheckoutSectionProps {
  cart: CartItem[];
  onBackToCart: () => void;
  onSubmitOrder: (customer: CustomerDetails) => void;
}

export default function CheckoutSection({ cart, onBackToCart, onSubmitOrder }: CheckoutSectionProps) {
  const [formData, setFormData] = useState<CustomerDetails>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Lahore',
    province: 'Punjab',
    postalCode: '',
    paymentMethod: 'cod',
    bankReceiptImage: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [discountPercent, setDiscountPercent] = useState(0);
  const [fileSelectedName, setFileSelectedName] = useState('');

  useEffect(() => {
    // Read the discount from localStorage if saved in CartDrawer
    const savedDiscount = localStorage.getItem('akash_cart_discount_percent');
    if (savedDiscount) {
      setDiscountPercent(JSON.parse(savedDiscount));
    }
  }, []);

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const shippingFee = subtotal >= 2500 ? 0 : 250;
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const finalTotal = subtotal - discountAmount + shippingFee;

  // Delivery Estimates
  const [deliveryMin, deliveryMax] = getEstimatedDeliveryDays(formData.city);
  const estimatedDeliveryRange = formatDeliveryDateRange(deliveryMin, deliveryMax);

  // Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileSelectedName(file.name);
      setFormData(prev => ({
        ...prev,
        bankReceiptImage: URL.createObjectURL(file)
      }));
    }
  };

  const handleValidation = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) tempErrors.firstName = 'First Name is required';
    if (!formData.lastName.trim()) tempErrors.lastName = 'Last Name is required';
    
    // Email regex
    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Invalid email address syntax';
    }

    // Pakistani Telephone Regex (e.g. 03001234567, 11 digits starting with 03)
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Mobile Phone is required';
    } else if (!/^03\d{9}$/.test(formData.phone.trim())) {
      tempErrors.phone = 'Should be a valid 11-digit PK phone starting with 03 (e.g. 03001234567)';
    }

    if (!formData.address.trim()) tempErrors.address = 'Street Address is required';
    if (!formData.postalCode.trim()) tempErrors.postalCode = 'Postal standard code is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (handleValidation()) {
      onSubmitOrder(formData);
    }
  };

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!handleValidation()) {
      return;
    }
    
    const itemsText = cart.map((item, index) => `${index + 1}. ${item.product.title} (SKU: ${item.product.sku}) - Size: ${item.selectedSize} - Qty: ${item.quantity} x Rs. ${item.product.price}`).join('%0A');
    
    // Using formData to populate info since validation passed
    const customerInfo = `*Customer Info:*%0AName: ${formData.firstName} ${formData.lastName}%0APhone: ${formData.phone}%0AEmail: ${formData.email || 'N/A'}%0AAddress: ${formData.address}, ${formData.city}%0APayment Method: ${formData.paymentMethod === 'bank' ? 'Bank Transfer' : 'Cash on Delivery (COD)'}%0A%0A`;
    
    const message = `*New Order Application*%0A%0A${customerInfo}*Order Items:*%0A${itemsText}%0A%0A*Summary:*%0ASubtotal: Rs. ${subtotal.toLocaleString()}%0ADiscount: - Rs. ${discountAmount.toLocaleString()}%0AShipping: Rs. ${shippingFee.toLocaleString()}%0A*Total: Rs. ${finalTotal.toLocaleString()}*`;
    
    const whatsappUrl = `https://wa.me/923347272246?text=${message}`;
    try {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } catch (e) {
      console.warn('Popup blocked, trying direct redirection:', e);
      window.location.href = whatsappUrl;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="checkout-section-wrapper">
      {/* Return button */}
      <button
        id="checkout-back-btn"
        onClick={onBackToCart}
        className="flex items-center gap-1.5 text-xs font-mono font-bold text-gray-500 hover:text-black mb-6 hover:underline"
      >
        <ArrowLeft size={14} />
        <span>RETURN TO CATALOG</span>
      </button>

      <div className="flex flex-col lg:flex-row gap-8" id="checkout-grid">
        {/* Left column: Information Details form */}
        <div className="flex-grow lg:w-3/5 bg-white border border-gray-100 rounded-xl p-6 shadow-sm" id="checkout-form-container">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-950 flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
            <User2 size={22} className="text-amber-800" />
            <span>Secure Checkout Information</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6" id="checkout-form-tag">
            {/* 1. Contact Info */}
            <div className="space-y-4">
              <h3 className="font-serif text-sm font-bold text-gray-950 uppercase tracking-widest text-amber-900 border-l-2 border-amber-800 pl-2">
                1. Customer Contact
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <label htmlFor="chk-email" className="text-[10px] font-mono text-gray-400 block mb-1 uppercase font-bold">Email (For receipt and packing tracking)</label>
                  <input
                    id="chk-email"
                    type="email"
                    name="email"
                    placeholder="ayesha@gmail.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-50 border rounded-lg p-2.5 text-xs outline-none focus:ring-1 focus:ring-black focus:bg-white ${
                      errors.email ? 'border-red-600 focus:ring-red-600' : 'border-gray-200'
                    }`}
                  />
                  {errors.email && <p className="text-red-700 text-[10px] font-mono mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="chk-phone" className="text-[10px] font-mono text-gray-400 block mb-1 uppercase font-bold">Active Phone number (for COD confirmation)</label>
                  <div className="relative">
                    <input
                      id="chk-phone"
                      type="text"
                      name="phone"
                      placeholder="03001234567"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full bg-gray-50 border rounded-lg p-2.5 text-xs outline-none focus:ring-1 focus:ring-black focus:bg-white ${
                        errors.phone ? 'border-red-600 focus:ring-red-600' : 'border-gray-200'
                      }`}
                    />
                    <PhoneCall size={14} className="absolute right-3.5 top-3 text-gray-300" />
                  </div>
                  {errors.phone && <p className="text-red-700 text-[10px] font-mono mt-1">{errors.phone}</p>}
                  <p className="text-[9px] font-mono text-gray-400 mt-1 italic">
                    Format: 11 digit mobile number starting with 03 (e.g. 03215904033)
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <h3 className="font-serif text-sm font-bold text-gray-950 uppercase tracking-widest text-amber-900 border-l-2 border-amber-800 pl-2">
                2. Shipping Coordinates
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="chk-firstname" className="text-[10px] font-mono text-gray-400 block mb-1 uppercase font-bold">First Name</label>
                  <input
                    id="chk-firstname"
                    type="text"
                    name="firstName"
                    placeholder="Ayesha"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-50 border rounded-lg p-2.5 text-xs outline-none focus:ring-1 focus:ring-black focus:bg-white ${
                      errors.firstName ? 'border-red-600 focus:ring-red-600' : 'border-gray-200'
                    }`}
                  />
                  {errors.firstName && <p className="text-red-700 text-[10px] font-mono mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label htmlFor="chk-lastname" className="text-[10px] font-mono text-gray-400 block mb-1 uppercase font-bold">Last Name</label>
                  <input
                    id="chk-lastname"
                    type="text"
                    name="lastName"
                    placeholder="Khan"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-50 border rounded-lg p-2.5 text-xs outline-none focus:ring-1 focus:ring-black focus:bg-white ${
                      errors.lastName ? 'border-red-600 focus:ring-red-600' : 'border-gray-200'
                    }`}
                  />
                  {errors.lastName && <p className="text-red-700 text-[10px] font-mono mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="chk-address" className="text-[10px] font-mono text-gray-400 block mb-1 uppercase font-bold">Complete House / Apartment Number & Street Location</label>
                <div className="relative">
                  <textarea
                    id="chk-address"
                    rows={2}
                    name="address"
                    placeholder="House No 12-A, Block D1, Gulberg III, Near mini market"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-50 border rounded-lg p-2.5 text-xs outline-none focus:ring-1 focus:ring-black focus:bg-white ${
                      errors.address ? 'border-red-600 focus:ring-red-600' : 'border-gray-200'
                    }`}
                  />
                  <MapPin size={14} className="absolute right-3.5 top-3 text-gray-300" />
                </div>
                {errors.address && <p className="text-red-700 text-[10px] font-mono mt-1">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="chk-city" className="text-[10px] font-mono text-gray-400 block mb-1 uppercase font-bold">City (Pakistan)</label>
                  <select
                    id="chk-city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-xs outline-none focus:ring-1 focus:ring-black focus:bg-white"
                  >
                    {CITIES_OF_PAKISTAN.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="chk-province" className="text-[10px] font-mono text-gray-400 block mb-1 uppercase font-bold">Province</label>
                  <select
                    id="chk-province"
                    name="province"
                    value={formData.province}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-xs outline-none focus:ring-1 focus:ring-black focus:bg-white"
                  >
                    <option value="Punjab">Punjab</option>
                    <option value="Sindh">Sindh</option>
                    <option value="Khyber Pakhtunkhwa (KPK)">Khyber Pakhtunkhwa (KPK)</option>
                    <option value="Balochistan">Balochistan</option>
                    <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
                    <option value="Azad Kashmir (AJK)">Azad Kashmir (AJK)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="chk-postal" className="text-[10px] font-mono text-gray-400 block mb-1 uppercase font-bold">Postal Code</label>
                  <input
                    id="chk-postal"
                    type="text"
                    name="postalCode"
                    placeholder="54000"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-50 border rounded-lg p-2.5 text-xs outline-none focus:ring-1 focus:ring-black focus:bg-white ${
                      errors.postalCode ? 'border-red-600 focus:ring-red-600' : 'border-gray-200'
                    }`}
                  />
                  {errors.postalCode && <p className="text-red-700 text-[10px] font-mono mt-1">{errors.postalCode}</p>}
                </div>
              </div>
            </div>

            {/* 3. Secure payment details */}
            <div className="space-y-4 pt-4 border-t border-gray-100" id="payment-box">
              <h3 className="font-serif text-sm font-bold text-gray-950 uppercase tracking-widest text-amber-900 border-l-2 border-amber-800 pl-2">
                3. Choose Payment Method
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Option 1: COD */}
                <label 
                  className={`flex flex-col p-4 border rounded-xl cursor-pointer transition-all ${
                    formData.paymentMethod === 'cod'
                      ? 'border-black bg-neutral-50 ring-1 ring-black'
                      : 'border-gray-200 hover:border-gray-400 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={() => setFormData(p => ({ ...p, paymentMethod: 'cod' }))}
                      className="accent-black focus:ring-0"
                    />
                    <span className="font-serif text-sm font-bold text-gray-900">Cash on Delivery (COD)</span>
                  </div>
                  <span className="text-[11px] text-gray-500 leading-relaxed font-mono">
                    Pay with physical Cash Rupees to the rider upon delivery. Safest and most popular option in PK.
                  </span>
                </label>

                {/* Option 2: Bank transfer */}
                <label 
                  className={`flex flex-col p-4 border rounded-xl cursor-pointer transition-all ${
                    formData.paymentMethod === 'bank_transfer'
                      ? 'border-stone-900 bg-stone-50/35 ring-1 ring-stone-900'
                      : 'border-gray-200 hover:border-gray-400 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank_transfer"
                      checked={formData.paymentMethod === 'bank_transfer'}
                      onChange={() => setFormData(p => ({ ...p, paymentMethod: 'bank_transfer' }))}
                      className="accent-stone-900 focus:ring-0"
                    />
                    <span className="font-serif text-sm font-bold text-gray-900">Direct Bank Transfer</span>
                  </div>
                  <span className="text-[11px] text-gray-500 leading-relaxed font-mono">
                    Transfer directly to our corporate bank account. Share receipt below or via email for instant shipping priority.
                  </span>
                </label>
              </div>

              {/* Bank detailed box */}
              {formData.paymentMethod === 'bank_transfer' && (
                <div className="bg-stone-50 border border-stone-200 p-4 rounded-xl space-y-4 animate-fadeIn" id="bank-accounts-info">
                  <div className="flex items-start gap-2 text-xs text-stone-900 font-mono leading-relaxed">
                    <Building2 size={16} className="text-stone-800 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold uppercase tracking-wider mb-2 text-stone-950">Akash Collection Wholesale official Business Accounts</p>
                      
                      <div className="space-y-2 border-b border-stone-200 pab-2 mb-2 pb-2">
                        <p><strong>Bank:</strong> UBL</p>
                        <p><strong>Account Title:</strong> Tahir Nawaz</p>
                        <p><strong>Account No:</strong> 0306279546128</p>
                        <p><strong>IBAN:</strong> PK77UNIL0109000279546128</p>
                      </div>

                      <div className="space-y-1">
                        <p><strong>Alternative (Easypaisa):</strong></p>
                        <p><strong>Account Title:</strong> Tahir Nawaz</p>
                        <p><strong>Account No:</strong> 03495645773</p>
                        <p><strong>IBAN:</strong> PK26TMFB0000000022995853</p>
                      </div>
                    </div>
                  </div>

                  {/* Attachment upload */}
                  <div className="pt-2">
                    <label className="text-[10px] font-mono font-bold text-stone-900 block mb-2 uppercase">
                      Upload receipt snapshot (Optional - speeds up checkout validation)
                    </label>
                    <div className="flex items-center gap-3">
                      <label className="bg-white border border-dashed border-stone-300 rounded-lg px-4 py-2 text-xs font-semibold text-stone-900 hover:bg-stone-50 cursor-pointer transition-colors max-w-fit">
                        <span>Select Receipt File</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                      <span className="text-[11px] font-mono text-stone-700">
                        {fileSelectedName ? fileSelectedName : 'No file selected'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Place Order CTA */}
            <div className="pt-4 space-y-3">
              <button
                id="place-order-submit-btn"
                type="submit"
                className="w-full bg-stone-900 hover:bg-stone-800 text-white font-sans font-bold tracking-[0.15em] text-sm py-4 rounded-md flex items-center justify-center gap-2.5 transition-all shadow-md focus:ring-2 focus:ring-stone-500/20 mb-2"
              >
                <Send size={15} />
                <span>CONFIRM & PLACE ORDER — RS. {finalTotal.toLocaleString()}</span>
              </button>

              <button
                id="place-order-whatsapp-btn"
                type="button"
                onClick={handleWhatsAppOrder}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-bold tracking-[0.15em] text-sm py-4 rounded-md flex items-center justify-center gap-2.5 transition-all shadow-md focus:ring-2 focus:ring-emerald-500/20"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                <span>ORDER VIA WHATSAPP</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right column: Order item summary */}
        <div className="lg:w-2/5 flex flex-col gap-6" id="checkout-sidebar">
          {/* Basket Box */}
          <div className="bg-gray-50 border border-gray-200/50 rounded-xl p-5" id="checkout-basket-summary">
            <h3 className="font-serif text-sm font-bold text-gray-950 uppercase tracking-widest text-gray-800 flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
              <ShoppingCart size={16} />
              <span>Bag Summary</span>
              <span className="font-mono text-xs font-normal text-gray-500 ml-auto bg-gray-200 px-2.5 py-0.5 rounded-full">
                {cart.reduce((acc, item) => acc + item.quantity, 0)} items
              </span>
            </h3>

            {/* List */}
            <div className="space-y-3.5 max-h-[280px] overflow-y-auto pr-1" id="checkout-basket-list">
              {cart.map((item, index) => (
                <div key={index} className="flex gap-3 text-xs border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                  <div className="w-11 h-14 bg-white rounded overflow-hidden flex-shrink-0 border border-gray-200">
                    <img src={item.product.image} alt={item.product.title} referrerPolicy="no-referrer" className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="font-serif font-bold text-gray-900 truncate">{item.product.title}</h4>
                    <p className="text-[10px] text-gray-500 font-mono mt-0.5">Size: <span className="uppercase text-gray-700 font-bold">{item.selectedSize}</span> • Qty: {item.quantity}</p>
                    <p className="text-[10px] text-gray-400 font-mono">SKU: {item.product.sku}</p>
                  </div>
                  <span className="font-serif font-bold text-gray-950 flex-shrink-0 text-right">
                    Rs. {(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Price lines */}
            <div className="font-mono text-xs space-y-2 border-t border-gray-200 pt-4 mt-4 text-gray-600" id="checkout-breakdown-numbers">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="text-gray-950 font-bold">Rs. {subtotal.toLocaleString()}</span>
              </div>
              
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span className="flex items-center gap-1">Voucher Save ({discountPercent}%):</span>
                  <span>-Rs. {discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping Fee (Nationwide):</span>
                <span className="text-gray-950 font-bold">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700">FREE SHIPPING</span>
                  ) : (
                    `Rs. ${shippingFee}`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-base font-serif font-bold text-gray-950 pt-3 border-t border-gray-200">
                <span>Final Payable:</span>
                <span className="text-amber-900">Rs. {finalTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Delivery Estimator Banner */}
          <div className="bg-amber-50/50 border border-amber-200/50 p-4 rounded-xl flex items-start gap-3" id="checkout-delivery-estimate">
            <CalendarDays className="text-amber-700 flex-shrink-0 mt-0.5" size={16} />
            <div>
              <p className="text-xs font-mono font-bold text-gray-900 uppercase tracking-widest mb-1">
                Estimated Delivery to {formData.city}:
              </p>
              <p className="text-[13px] font-sans font-bold text-amber-900">
                {estimatedDeliveryRange}
              </p>
              <p className="text-[10px] text-gray-500 font-mono mt-1">
                ({deliveryMin}-{deliveryMax} working days for {formData.city})
              </p>
            </div>
          </div>

          {/* Secure Trust Banner */}
          <div className="bg-stone-50 border border-stone-200/50 p-4 rounded-xl text-[11px] leading-relaxed text-stone-600" id="trust-banner">
            <span className="font-bold flex items-center gap-1 text-stone-800 uppercase tracking-wide mb-1">
              <ShieldCheck size={14} className="text-emerald-600" />
              Guaranteed Authentic Pakistani Fabrics
            </span>
            <p>
              Akash Collection Wholesale sources thread yarns, dye chemical bases, and raw cambric only from certified national spinning mills. We supervise all tailoring under clean, fair, expert design conditions in Lahore. Expect premium excellence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
