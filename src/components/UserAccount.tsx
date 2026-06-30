import React, { useState, useEffect } from 'react';
import { ArrowLeft, Package, Clock, Truck, MapPin, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { Order } from '../types';

interface UserAccountProps {
  orders: Order[];
  onBack: () => void;
}

export default function UserAccount({ orders, onBack }: UserAccountProps) {
  const [trackingData, setTrackingData] = useState<Record<string, any>>({});
  const [loadingTracking, setLoadingTracking] = useState<Record<string, boolean>>({});
  const [errorTracking, setErrorTracking] = useState<Record<string, string>>({});

  const trackOrder = async (order: Order) => {
    if (!order.trackingNo) return;
    
    setLoadingTracking(prev => ({ ...prev, [order.id]: true }));
    setErrorTracking(prev => ({ ...prev, [order.id]: '' }));
    
    try {
      const response = await fetch(`/api/postex/track/${order.trackingNo}`);
      if (!response.ok) throw new Error('Tracking failed');
      const data = await response.json();
      
      if (data.statusCode === "200" && data.dist) {
        setTrackingData(prev => ({ ...prev, [order.id]: data.dist }));
      } else {
        throw new Error(data.statusMessage || 'Tracking details not found');
      }
    } catch (err: any) {
      setErrorTracking(prev => ({ ...prev, [order.id]: err.message || 'Error tracking shipment' }));
    } finally {
      setLoadingTracking(prev => ({ ...prev, [order.id]: false }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-stone-500 hover:text-stone-900 mb-6 transition-colors font-mono text-sm uppercase"
      >
        <ArrowLeft size={16} />
        Back to Store
      </button>
      
      <h1 className="text-3xl font-serif font-bold text-stone-900 mb-8 border-b border-stone-200 pb-4">
        My Orders
      </h1>
      
      {orders.length === 0 ? (
        <div className="bg-stone-50 border border-stone-200 p-8 text-center rounded-xl text-stone-500 font-mono">
          No orders found.
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white border border-stone-200 shadow-sm hover:shadow-md transition-shadow rounded-xl p-6">
              <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-stone-100 pb-4 mb-4 gap-4">
                <div>
                  <h3 className="text-xl font-bold font-mono text-stone-800">Order #{order.id}</h3>
                  <p className="text-stone-500 text-sm mt-1 flex items-center gap-2">
                    <Clock size={14} /> {order.date}
                  </p>
                </div>
                <div className="flex flex-col md:items-end gap-1">
                  <div className="text-sm font-semibold text-stone-600 bg-stone-100 px-3 py-1 rounded-full w-fit">
                    Status: {order.status}
                  </div>
                  {order.trackingNo && (
                    <div className="text-xs font-mono text-stone-500 mt-1">
                      Tracking ID: {order.trackingNo}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Order Items Summary */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-stone-700 mb-3 flex items-center gap-2">
                  <Package size={16} />
                  Items
                </h4>
                {/* Assuming Order type has items, wait, Order type doesn't have items. Let's check types.ts */}
                <div className="text-sm text-stone-600 space-y-2 pl-6 border-l-2 border-stone-100">
                  <div className="flex justify-between items-center text-sm font-semibold text-stone-800 pt-2">
                    <span>Total Amount</span>
                    <span>Rs. {order.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              {/* Shipment Tracking Section */}
              {order.trackingNo && order.carrier === 'PostEx Courier' && (
                <div className="bg-stone-50 border border-stone-200 rounded-lg p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-bold text-stone-800 font-sans tracking-wide uppercase flex items-center gap-2">
                      <Truck size={16} className="text-stone-600" />
                      Shipment Tracking
                    </h4>
                    
                    <button 
                      onClick={() => trackOrder(order)}
                      disabled={loadingTracking[order.id]}
                      className="text-xs font-mono font-semibold bg-white border border-stone-300 text-stone-700 hover:bg-stone-100 px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors disabled:opacity-50"
                    >
                      {loadingTracking[order.id] ? (
                        <RefreshCw size={12} className="animate-spin" />
                      ) : (
                        <RefreshCw size={12} />
                      )}
                      Refresh Status
                    </button>
                  </div>
                  
                  {errorTracking[order.id] && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-md text-xs font-mono flex items-center gap-2 border border-red-100 mb-4">
                      <AlertCircle size={14} />
                      {errorTracking[order.id]}
                    </div>
                  )}
                  
                  {trackingData[order.id] ? (
                    <div className="space-y-4 relative">
                      <div className="absolute left-3 top-2 bottom-0 w-0.5 bg-stone-200 z-0"></div>
                      
                      <div className="flex items-start gap-4 relative z-10">
                         <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                           <CheckCircle size={14} className="text-emerald-500" />
                         </div>
                         <div className="flex-1 bg-white p-3 border border-stone-200 shadow-sm rounded-lg">
                           <p className="font-semibold text-sm text-stone-800">
                             {trackingData[order.id].transactionStatusMessage || trackingData[order.id].transactionStatus}
                           </p>
                           {trackingData[order.id].transactionStatusHistory && trackingData[order.id].transactionStatusHistory.length > 0 && (
                             <p className="text-xs text-stone-500 mt-1 font-mono">
                               Last Update: {trackingData[order.id].transactionStatusHistory[trackingData[order.id].transactionStatusHistory.length - 1].transactionStatusMessage}
                             </p>
                           )}
                         </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-xs text-stone-500 font-mono py-2">
                      Click 'Refresh Status' to fetch real-time PostEx updates.
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
