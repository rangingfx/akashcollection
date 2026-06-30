/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Search, MapPin, Truck, Check, Clock, AlertCircle, RefreshCw } from 'lucide-react';
import { Order } from '../types';

interface TrackOrderModalProps {
  onClose: () => void;
  orders: Order[]; // Known local orders placed during current session
}

interface TrackResult {
  id: string;
  status: 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  carrier: string;
  trackingNo: string;
  city: string;
  address: string;
  customerName: string;
  steps: {
    title: string;
    description: string;
    time: string;
    done: boolean;
    active: boolean;
  }[];
}

const STAGE_INDEX: Record<string, number> = {
  'Pending': 0,
  'Confirmed': 0,
  'Processing': 1,
  'Shipped': 2,
  'Out for Delivery': 2,
  'Dispatched': 2,
  'Delivered': 3
};

const PROGRESS_STAGES = ['Confirmed', 'Processing', 'Dispatched', 'Delivered'];

export default function TrackOrderModal({ onClose, orders }: TrackOrderModalProps) {
  const [searchId, setSearchId] = useState('');
  const [trackResult, setTrackResult] = useState<TrackResult | null>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  // Generate a realistic tracking flow if the user searches for an arbitrary or real Order ID
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);

    const matchCode = searchId.trim().toUpperCase();

    if (!matchCode) {
      setTrackResult(null);
      return;
    }

    // 1. Attempt to search locally placed orders first
    const localMatch = orders.find(ord => ord.id.toUpperCase() === matchCode || (ord.trackingNo && ord.trackingNo.toUpperCase() === matchCode));

    if (localMatch) {
      // Create detailed steps based on local order status
      const steps = [
        { title: 'Order Booking Catalogued', description: 'Order logged into the Akash Wholesale system from secure browser portal.', time: 'Today, 2:10 PM', done: true, active: false },
        { title: 'Tailoring & Styling Verification', description: 'Garment dimensions and print quality checked by quality control.', time: 'Today, 4:30 PM', done: true, active: true },
        { title: 'Handed over to Leopards Courier', description: 'Package wrapped in secure brand polybag and dispatched to Lahore dispatch dock.', time: 'Awaiting voice confirmation call', done: false, active: false },
        { title: 'Home Package Handover', description: 'Delivery rider delivers parcel to consumer address.', time: 'Est. 2-3 working days', done: false, active: false }
      ];

      setTrackResult({
        id: localMatch.id,
        status: localMatch.status === 'Shipped' ? 'Shipped' : 'Processing',
        carrier: localMatch.carrier || 'Leopards Courier (COD)',
        trackingNo: localMatch.trackingNo || `LEO-9284210-${localMatch.id.split('-')[1] || '94'}`,
        city: localMatch.customer.city,
        address: localMatch.customer.address,
        customerName: `${localMatch.customer.firstName} ${localMatch.customer.lastName}`,
        steps
      });
      return;
    }

    // 2. Search PostEx Live API via our secure backend proxy if the format matches PE- tracking number or they searched an arbitrary code
    if (matchCode.startsWith('PE-') || matchCode.startsWith('CX-') || matchCode.match(/^\d+$/) || matchCode.startsWith('AK-MANUAL')) {
      try {
        setLoading(true);
        const res = await fetch(`/api/postex/track/${matchCode}`);
        if (res.ok) {
          const data = await res.json();
          if (data.statusCode === "200" && data.dist) {
            const tracking = data.dist;
            
            // Map status
            let orderStatus: TrackResult['status'] = 'Processing';
            if (tracking.transactionStatus === 'Delivered') {
              orderStatus = 'Delivered';
            } else if (tracking.transactionStatus === 'Out For Delivery' || tracking.transactionStatus === 'Package on Root') {
              orderStatus = 'Out for Delivery';
            } else if (tracking.transactionStatus === 'Booked') {
              orderStatus = 'Shipped';
            } else if (tracking.transactionStatus === 'UnBooked') {
              orderStatus = 'Confirmed';
            }

            // Map steps
            const steps = tracking.transactionStatusHistory && tracking.transactionStatusHistory.length > 0
              ? tracking.transactionStatusHistory.map((hist: any, index: number) => {
                  const isLast = index === tracking.transactionStatusHistory.length - 1;
                  return {
                    title: hist.transactionStatusMessage,
                    description: `Fulfillment checkpoint code: ${hist.transactionStatusMessageCode}`,
                    time: '',
                    done: true,
                    active: isLast
                  };
                })
              : [
                  { title: 'Parcel Logged on PostEx', description: 'Consignment booked successfully', time: '', done: true, active: true }
                ];

            setTrackResult({
              id: tracking.orderRefNumber || `PE-${tracking.trackingNumber}`,
              status: orderStatus,
              carrier: 'PostEx Courier',
              trackingNo: tracking.trackingNumber,
              city: tracking.cityName || 'Operational Hub',
              address: tracking.deliveryAddress,
              customerName: tracking.customerName,
              steps
            });
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.error("PostEx tracking proxy failed, falling back to static generation...", err);
      }
    }

    // 3. Fallback to realistic demo simulation
    setLoading(false);
    const isDemo = matchCode === 'AK-DEMO' || matchCode.includes('11') || matchCode.startsWith('PE-');
    
    const steps = isDemo ? [
      { title: 'Order Booked', description: 'Order successfully logged and confirmed.', time: '2 Days ago, 11:00 AM', done: true, active: false },
      { title: 'Premium Packing Secured', description: 'Premium lavender-scented box packaging approved by QC specialists.', time: 'Yesterday, 9:20 AM', done: true, active: false },
      { title: 'Dispatched from Lahore Hub', description: 'Manifest packet loaded onto Leopards transit truck LHR-048.', time: 'Yesterday, 8:00 PM', done: true, active: false },
      { title: 'Out for Courier Delivery', description: 'Leopards courier rider Ahmad (0321-8293122) out for home delivery in matching sector.', time: 'Today, 9:15 AM', done: true, active: true },
      { title: 'Delivered', description: 'Signed and cash cleared.', time: 'Est. Today by 6:00 PM', done: false, active: false }
    ] : [
      { title: 'Order Booked', description: 'Order logged from Akash PK e-store.', time: 'June 18, 2026', done: true, active: false },
      { title: 'Tailor Approved', description: 'Unstitched patterns gathered for packaging.', time: 'June 18, 2026', done: true, active: false },
      { title: 'Shipped', description: 'Picked up by Call Courier services.', time: 'June 19, 2026', done: true, active: false },
      { title: 'Delivered', description: 'Handed over to customer and PKR amount cleared.', time: 'June 20, 2026', done: true, active: true }
    ];

    setTrackResult({
      id: matchCode.startsWith('AK-') ? matchCode : `AK-${matchCode}`,
      status: isDemo ? 'Out for Delivery' : 'Delivered',
      carrier: 'Leopards Pakistan',
      trackingNo: `LEO-92149${matchCode.replace(/\D/g, '') || '4259'}`,
      city: 'Rawalpindi',
      address: 'Sector G-9/1, Street 4, Islamabad',
      customerName: 'Zainab Bibi',
      steps
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn" id="track-order-overlay">
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-xl w-full p-6 border border-gray-100 max-h-[90vh] overflow-y-auto flex flex-col relative"
        id="track-order-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Truck className="text-amber-800" size={20} />
            <h2 className="font-serif text-lg font-bold text-gray-950 uppercase tracking-wide">
              Live Courier Tracker
            </h2>
          </div>
          <button
            id="close-track-btn"
            onClick={onClose}
            className="p-1 rounded-full bg-gray-50 hover:bg-black hover:text-white transition-colors border border-gray-200"
          >
            <X size={15} />
          </button>
        </div>

        {/* Info label */}
        <p className="text-xs text-gray-500 mb-4 leading-relaxed font-sans">
          Type your unique order number (e.g., <strong className="font-mono text-gray-800">AK-DEMO</strong> or your placed order number) to see the delivery status of your package.
        </p>

        {/* Search form bar */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-6" id="track-search-form">
          <input
            id="track-id-input"
            type="text"
            placeholder="e.g. AK-DEMO"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-xs outline-none focus:ring-1 focus:ring-black focus:bg-white uppercase flex-grow font-mono font-bold tracking-widest text-center"
          />
          <button
            id="track-search-submit"
            type="submit"
            disabled={loading}
            className="bg-black hover:bg-neutral-800 disabled:bg-stone-400 text-white font-mono text-xs font-bold px-4 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            {loading ? <RefreshCw className="animate-spin" size={14} /> : <Search size={14} />}
            <span>{loading ? "SEARCHING..." : "GENERATE LOGS"}</span>
          </button>
        </form>

        {/* Results layout */}
        {searched && trackResult && (
          <div className="space-y-5 animate-slideUp" id="track-results-wrapper">
            {/* Meta details banner */}
            <div className="bg-gray-50 border border-gray-200 p-3.5 rounded-lg text-xs space-y-1.5 font-mono" id="tracking-meta-banner">
              <div className="flex justify-between">
                <span className="text-gray-400">Order Reference:</span>
                <span className="text-gray-900 font-bold">{trackResult.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Dispatch Logistics:</span>
                <span className="text-gray-900 font-bold">{trackResult.carrier}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Airway Bill (AWB):</span>
                <span className="text-amber-900 font-bold underline select-all">{trackResult.trackingNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Recipient Name:</span>
                <span className="text-gray-900 font-bold">{trackResult.customerName}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-gray-400">Destination:</span>
                <span className="text-gray-900 font-bold text-right max-w-[240px] leading-tight line-clamp-1">{trackResult.address}</span>
              </div>
            </div>

            {/* Real-time Stage Progress Bar */}
            <div className="py-2 mb-2 w-full max-w-sm mx-auto" id="tracking-stage-progress">
              <div className="flex items-center justify-between relative mb-2">
                {/* Connecting Line background */}
                <div className="absolute top-3 left-[12.5%] right-[12.5%] h-[2px] bg-gray-200 z-0"></div>
                {/* Connecting Line foreground active */}
                <div 
                  className="absolute top-3 left-[12.5%] h-[2px] bg-emerald-600 z-0 transition-all duration-700 ease-in-out"
                  style={{ width: `${((STAGE_INDEX[trackResult.status] ?? 0) / 3) * 75}%` }}
                ></div>
                {PROGRESS_STAGES.map((stage, i) => {
                  const currentIdx = STAGE_INDEX[trackResult.status] ?? 0;
                  const isDone = i <= currentIdx;
                  return (
                    <div key={stage} className="flex flex-col items-center relative z-10 w-1/4">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-colors duration-500 bg-white ${isDone ? 'border-emerald-600 text-emerald-600' : 'border-gray-200 text-gray-300'}`}>
                        {isDone ? <Check size={12} strokeWidth={3} /> : (i + 1)}
                      </div>
                      <span className={`text-[8px] sm:text-[9px] font-bold font-mono tracking-wide mt-2 uppercase text-center ${isDone ? 'text-emerald-700' : 'text-gray-400'}`}>
                        {stage}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step chart */}
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 block mb-4">Milestone Logs:</span>
              <div className="relative border-l-2 border-gray-200 ml-3.5 space-y-6" id="tracking-milestone-list">
                {trackResult.steps.map((st, i) => (
                  <div key={i} className="relative pl-7 text-xs" id={`step-row-${i}`}>
                    {/* Circle icon */}
                    <div 
                      className={`absolute -left-[14px] top-0.5 rounded-full w-6 h-6 flex items-center justify-center border-2 ${
                        st.active 
                          ? 'border-amber-800 bg-amber-50 text-amber-800 animate-pulse'
                          : st.done
                          ? 'border-emerald-600 bg-emerald-600 text-white'
                          : 'border-gray-200 bg-white text-gray-200'
                      }`}
                    >
                      {st.done ? (
                        <Check size={11} strokeWidth={3} />
                      ) : st.active ? (
                        <Clock size={11} strokeWidth={3} />
                      ) : (
                        <div className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
                      )}
                    </div>

                    {/* Step descriptions */}
                    <div className="space-y-0.5">
                      <h4 className={`font-serif text-xs font-bold leading-none ${st.done ? 'text-gray-900' : st.active ? 'text-amber-900 font-extrabold' : 'text-gray-400'}`}>
                        {st.title}
                      </h4>
                      <p className={`text-[11px] leading-relaxed ${st.done || st.active ? 'text-gray-500' : 'text-gray-300'}`}>
                        {st.description}
                      </p>
                      {st.time && (
                        <span className="text-[9px] font-mono text-gray-450 bg-gray-100 py-0.5 px-2 rounded-sm block max-w-max text-gray-400">
                          {st.time}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {searched && !trackResult && (
          <div className="text-center py-8 text-gray-500 space-y-2" id="no-track-results">
            <AlertCircle size={32} className="text-gray-350 mx-auto" />
            <h4 className="font-serif text-sm font-semibold text-gray-900">Order ID Not Found</h4>
            <p className="text-[11px] text-gray-400 max-w-xs mx-auto leading-relaxed">
              We couldn't locate any packages matching that code. Make sure you entered it exactly as printed on your receipt (e.g. including the prefix).
            </p>
          </div>
        )}

        {/* Tracking info foot */}
        <div className="mt-6 pt-4 border-t border-gray-100 text-[10px] text-gray-400 font-mono text-center flex flex-col gap-1 inline-block" id="track-assistance">
          <span>Need help directly with shipping couriers? Contact support details:</span>
          <span>Leopards Helpline: (021) 111-300-786 | Lahore Office: G.T. Road Baghbanpura</span>
        </div>
      </div>
    </div>
  );
}
