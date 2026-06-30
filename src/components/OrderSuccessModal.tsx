/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CheckCircle2, ShoppingBag, MapPin, Phone, Mail, FileText, Printer, Sparkles } from 'lucide-react';
import { Order } from '../types';

interface OrderSuccessModalProps {
  order: Order;
  onContinueShopping: () => void;
}

export default function OrderSuccessModal({ order, onContinueShopping }: OrderSuccessModalProps) {
  const deliveryDays = order.customer.city === 'Lahore' ? '1 to 2' : (['Karachi', 'Islamabad', 'Rawalpindi'].includes(order.customer.city) ? '2 to 3' : '3 to 5');

  const handlePrint = () => {
    try {
      const originalTitle = document.title;
      document.title = `Order_Receipt_${order.id}`;
      window.print();
      document.title = originalTitle;
    } catch (e) {
      console.warn('Printing is not allowed in this environment:', e);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="order-success-panel">
      <div className="bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden p-6 sm:p-8 space-y-8" id="order-receipt-card">
        
        {/* Success Header */}
        <div className="text-center space-y-3 pb-6 border-b border-gray-100" id="order-success-header">
          <div className="mx-auto bg-emerald-50 text-emerald-600 rounded-full w-16 h-16 flex items-center justify-center shadow-inner animate-bounce">
            <CheckCircle2 size={36} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-gray-950 uppercase tracking-tight">
              Order Placed Successfully!
            </h1>
            <p className="font-mono text-xs sm:text-sm text-emerald-800 font-semibold mt-1 flex items-center justify-center gap-1">
              <Sparkles size={14} />
              Your Order Receipt is Generated (ID: <span className="underline select-all">{order.id}</span>)
            </p>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
            Shukriya for choosing Akash Collection Wholesale! We have received your order details and our tailoring team is preparing your package.
          </p>
        </div>

        {/* Verification Note (Authentic PK COD protocol) */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 sm:p-5 text-xs text-amber-900 leading-relaxed space-y-2" id="pk-verification-alert">
          <span className="font-bold flex items-center gap-1.5 text-amber-950 uppercase tracking-widest text-[11px]">
            <CheckCircle2 size={13} className="text-amber-800" />
            CRITICAL STEP: VOICE CONFIRMATION REQUIRED
          </span>
          <p>
            To avoid fake bookings, our representative will place a quick **confirmation phone call** to your mobile number <strong className="font-mono">{order.customer.phone}</strong> within 12 working hours.
          </p>
          <p className="text-[11px] font-semibold italic text-amber-800">
            *Please keep your mobile active. Orders are ONLY dispatched from our Lahore headquarters after successful phone call verification.
          </p>
        </div>

        {/* Receipt Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2" id="order-receipt-grid">
          {/* Customer & Shipping Summary */}
          <div className="space-y-4" id="shipping-summary-column">
            <h3 className="font-serif text-sm font-bold uppercase tracking-widest text-gray-900 border-b border-gray-100 pb-2">
              Customer Details & Billing
            </h3>
            <div className="space-y-2.5 font-mono text-[11px] sm:text-xs text-gray-600">
              <p className="flex items-center gap-2">
                <span className="text-gray-400 w-16">Name:</span>
                <strong className="text-gray-900">{order.customer.firstName} {order.customer.lastName}</strong>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={13} className="text-gray-400" />
                <span className="text-gray-400 w-16">Email:</span>
                <span className="text-gray-900 select-all">{order.customer.email}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone size={13} className="text-gray-400 animate-pulse" />
                <span className="text-gray-400 w-16">Contact:</span>
                <strong className="text-gray-900 select-all">{order.customer.phone}</strong>
              </p>
              <p className="flex items-start gap-2">
                <MapPin size={13} className="text-gray-400 mt-0.5" />
                <span className="text-gray-400 w-16 flex-shrink-0">Address:</span>
                <span className="text-gray-900 leading-normal">{order.customer.address}, {order.customer.city} ({order.customer.province})</span>
              </p>
              <p className="flex items-center gap-2 pt-1">
                <span className="text-gray-400 w-16">Bill Type:</span>
                <span className="bg-gray-100 text-gray-800 px-2.5 py-0.5 rounded text-[10px] uppercase font-bold">
                  {order.customer.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Direct Bank Transfer'}
                </span>
              </p>
            </div>
          </div>

          {/* Delivery Details */}
          <div className="space-y-4" id="delivery-summary-column">
            <h3 className="font-serif text-sm font-bold uppercase tracking-widest text-gray-900 border-b border-gray-100 pb-2">
              Shipment Coordinates
            </h3>
            <div className="space-y-2.5 font-mono text-[11px] sm:text-xs text-gray-600">
              <p>
                <span className="text-gray-400">Order Booking Date:</span>{' '}
                <strong className="text-gray-900">{order.date}</strong>
              </p>
              <p>
                <span className="text-gray-400">Courier Company:</span>{' '}
                <strong className="text-gray-900">{order.carrier || 'PostEx Courier (Nationwide)'}</strong>
              </p>
              {order.trackingNo ? (
                <p>
                  <span className="text-gray-400">Tracking Number:</span>{' '}
                  {order.trackingUrl ? (
                    <a href={order.trackingUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-bold bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded transition-colors inline-flex items-center gap-1">
                      {order.trackingNo}
                    </a>
                  ) : (
                    <strong className="text-gray-900 font-bold bg-gray-100 px-2 py-0.5 rounded">{order.trackingNo}</strong>
                  )}
                </p>
              ) : null}
              <p>
                <span className="text-gray-400">Est. Arrival window:</span>{' '}
                <strong className="text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                  {deliveryDays} Working Days
                </strong>
              </p>
              <p className="text-[10px] text-gray-500 italic leading-relaxed pt-2">
                {order.trackingUrl ? (
                  <>*You can track your parcel via <a href={order.trackingUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">PostEx Tracking</a>. A confirmation email has also been sent to <strong>{order.customer.email}</strong>.</>
                ) : order.trackingNo ? (
                  `*You can track your parcel using the tracking number above. A confirmation email has also been sent to ${order.customer.email}.`
                ) : (
                  `*A customized tracking link from postex.pk will be sent to your email ${order.customer.email} as soon as the courier rider picks up the parcel.`
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Ordered Garments breakdown */}
        <div className="space-y-4 pt-4 border-t border-gray-100" id="receipt-items-section">
          <h3 className="font-serif text-sm font-bold uppercase tracking-widest text-gray-900">
            Ordered Garments Summary
          </h3>
          <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm" id="receipt-items-table">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50 font-mono text-[10px] text-gray-400 uppercase border-b border-gray-100">
                  <th className="p-3">Product SKU & Title</th>
                  <th className="p-3 text-center">Size</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-right">Net Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {order.items.map((item, index) => (
                  <tr key={index} className="font-mono text-[11px] sm:text-xs">
                    <td className="p-3">
                      <p className="font-serif text-xs font-bold text-gray-950">{item.product.title}</p>
                      <span className="text-[9px] text-gray-400 block font-mono">SKU: {item.product.sku}</span>
                    </td>
                    <td className="p-3 text-center">
                      <span className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded uppercase text-[9px] font-bold">
                        {item.selectedSize}
                      </span>
                    </td>
                    <td className="p-3 text-center font-bold text-gray-900">{item.quantity}</td>
                    <td className="p-3 text-right font-bold text-gray-950">Rs. {(item.product.price * item.quantity).toLocaleString()}</td>
                  </tr>
                ))}
                
                {/* Math breakdown lines */}
                <tr className="bg-gray-50/50 font-mono">
                  <td colSpan={3} className="p-2.5 text-right text-gray-500">Items Subtotal:</td>
                  <td className="p-2.5 text-right font-bold text-gray-900">Rs. {order.subtotal.toLocaleString()}</td>
                </tr>
                {order.subtotal - order.total + order.shippingFee > 0 && (
                  <tr className="bg-gray-50/50 font-mono text-emerald-800 font-semibold">
                    <td colSpan={3} className="p-2.5 text-right">Voucher Coupon Save:</td>
                    <td className="p-2.5 text-right">-Rs. {(order.subtotal - order.total + order.shippingFee).toLocaleString()}</td>
                  </tr>
                )}
                <tr className="bg-gray-50/50 font-mono">
                  <td colSpan={3} className="p-2.5 text-right text-gray-500">Shipping (Nationwide):</td>
                  <td className="p-2.5 text-right font-bold text-gray-900">
                    {order.shippingFee === 0 ? 'FREE' : `Rs. ${order.shippingFee}`}
                  </td>
                </tr>
                <tr className="bg-gray-100 font-semibold text-sm">
                  <td colSpan={3} className="p-3 text-right font-serif text-gray-950 uppercase tracking-wide">Net Est. Grand Total:</td>
                  <td className="p-3 text-right font-mono text-amber-900 font-extrabold text-base">Rs. {order.total.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons: Return & Print */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-4 border-t border-gray-100 font-mono" id="receipt-actions">
          <button
            id="print-receipt-btn"
            onClick={handlePrint}
            className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-black border border-gray-200 hover:border-black rounded-lg px-4 py-2.5 bg-white transition-all font-bold group"
          >
            <Printer size={15} className="group-hover:scale-110 duration-200" />
            <span>PRINT RECEIPT / SAVE PDF</span>
          </button>

          <button
            id="success-shop-again-btn"
            onClick={onContinueShopping}
            className="w-full sm:w-auto bg-black hover:bg-neutral-800 text-white text-xs font-bold tracking-widest px-8 py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md focus:ring-2 focus:ring-black/20"
          >
            <ShoppingBag size={14} />
            <span>GO TO HOME CATALOGUE</span>
          </button>
        </div>

        {/* Small support note */}
        <div className="text-center text-[10px] text-gray-400 font-mono pt-4 border-t border-gray-100" id="receipt-help-foot">
          <p>For editing sizes or cancelling bookings, contact us at **info@akashcollection.pk** or WhatsApp **+92 334 7272246**.</p>
          <p className="mt-1">Akash Collection PK is a register business under FBR Pakistan NTN: 8941258-2.</p>
        </div>
      </div>
    </div>
  );
}
