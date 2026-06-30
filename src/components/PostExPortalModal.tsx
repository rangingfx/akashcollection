import React, { useState, useEffect } from 'react';
import { 
  X, MapPin, Truck, Check, Clock, AlertCircle, Building, Search, 
  PlusCircle, Calendar, DollarSign, Globe, RefreshCw, FileText, 
  Trash2, Settings, HelpCircle, CheckCircle2 
} from 'lucide-react';
import { Order } from '../types';

interface PostExPortalModalProps {
  onClose: () => void;
  orders: Order[]; // Local orders placed in current session
  onOrderUpdate?: (updatedOrders: Order[]) => void; // Optional hook to update parent orders
}

type TabType = 'book' | 'track' | 'cities' | 'shipments' | 'config';

export default function PostExPortalModal({ onClose, orders, onOrderUpdate }: PostExPortalModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('book');
  const [config, setConfig] = useState<{ configured: boolean; token: string } | null>(null);
  const [cities, setCities] = useState<any[]>([]);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingAddresses, setLoadingAddresses] = useState(false);

  // Search state for cities
  const [citySearch, setCitySearch] = useState('');
  const [cityFilter, setCityFilter] = useState<'all' | 'pickup' | 'delivery'>('all');

  // Tracking state
  const [trackingNo, setTrackingNo] = useState('');
  const [trackingResult, setTrackingResult] = useState<any | null>(null);
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackingError, setTrackingError] = useState('');

  // PostEx orders list
  const [postexOrders, setPostexOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Order Booking inputs
  const [selectedLocalOrder, setSelectedLocalOrder] = useState<string>('');
  const [bookingName, setBookingName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingCity, setBookingCity] = useState('');
  const [bookingAddress, setBookingAddress] = useState('');
  const [bookingAmount, setBookingAmount] = useState('0');
  const [bookingDetails, setBookingDetails] = useState('');
  const [pickupCode, setPickupCode] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<any | null>(null);

  // Load config & initial data
  useEffect(() => {
    fetchConfig();
    fetchCities();
    fetchAddresses();
  }, []);

  const fetchConfig = async () => {
    try {
      setLoadingConfig(true);
      const res = await fetch('/api/postex/config');
      const data = await res.json();
      setConfig(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingConfig(false);
    }
  };

  const fetchCities = async () => {
    try {
      setLoadingCities(true);
      const res = await fetch('/api/postex/cities');
      const data = await res.json();
      if (data.statusCode === "200" && Array.isArray(data.dist)) {
        setCities(data.dist);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingCities(false);
    }
  };

  const fetchAddresses = async () => {
    try {
      setLoadingAddresses(true);
      const res = await fetch('/api/postex/merchant-address');
      const data = await res.json();
      if (data.statusCode === "200" && Array.isArray(data.dist)) {
        setAddresses(data.dist);
        if (data.dist.length > 0) {
          setPickupCode(data.dist[0].addressCode);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingAddresses(false);
    }
  };

  const fetchPostexOrders = async () => {
    try {
      setLoadingOrders(true);
      const res = await fetch('/api/postex/orders');
      const data = await res.json();
      if (data.statusCode === "200" && Array.isArray(data.dist)) {
        setPostexOrders(data.dist);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingOrders(false);
    }
  };

  // When a tab is clicked
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    if (tab === 'shipments') {
      fetchPostexOrders();
    }
  };

  // Populate booking form when local order is selected
  const handleLocalOrderSelect = (orderId: string) => {
    setSelectedLocalOrder(orderId);
    if (!orderId) {
      clearBookingForm();
      return;
    }
    const order = orders.find(o => o.id === orderId);
    if (order) {
      setBookingName(`${order.customer.firstName} ${order.customer.lastName}`);
      setBookingPhone(order.customer.phone);
      
      // Match city name with known PostEx cities case-insensitively
      const match = cities.find(c => c.operationalCityName.toLowerCase() === order.customer.city.toLowerCase());
      setBookingCity(match ? match.operationalCityName : order.customer.city);
      
      setBookingAddress(order.customer.address);
      setBookingAmount(order.total.toString());
      
      const itemsDesc = order.items.map(it => `${it.product.title} (${it.selectedSize}) x${it.quantity}`).join(', ');
      setBookingDetails(itemsDesc);
    }
  };

  const clearBookingForm = () => {
    setSelectedLocalOrder('');
    setBookingName('');
    setBookingPhone('');
    setBookingCity('');
    setBookingAddress('');
    setBookingAmount('0');
    setBookingDetails('');
    setBookingSuccess(null);
  };

  // Create booking
  const handleCreateBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingPhone || !bookingCity || !bookingAddress) {
      alert("Please fill in all mandatory customer details.");
      return;
    }

    try {
      setBookingLoading(true);
      setBookingSuccess(null);

      const payload = {
        cityName: bookingCity,
        customerName: bookingName,
        customerPhone: bookingPhone,
        deliveryAddress: bookingAddress,
        invoicePayment: parseFloat(bookingAmount) || 0,
        orderDetail: bookingDetails,
        orderRefNumber: selectedLocalOrder || `AK-MANUAL-${Math.floor(1000 + Math.random() * 9000)}`,
        pickupAddressCode: pickupCode,
        invoiceDivision: 1,
        items: 1,
        orderType: "Normal"
      };

      const res = await fetch('/api/postex/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.statusCode === "200" && data.dist) {
        setBookingSuccess(data.dist);
        
        // If it was linked to a local order, update its status & tracking no!
        if (selectedLocalOrder && onOrderUpdate) {
          const updated = orders.map(ord => {
            if (ord.id === selectedLocalOrder) {
              return {
                ...ord,
                status: 'Shipped' as const,
                trackingNo: data.dist.trackingNumber,
                carrier: 'PostEx Courier'
              };
            }
            return ord;
          });
          onOrderUpdate(updated);
        }

        // Set tracking input for quick tracking
        setTrackingNo(data.dist.trackingNumber);
      } else {
        alert(`Failed to book shipment: ${data.statusMessage || data.error || 'Server rejected request'}`);
      }
    } catch (err: any) {
      console.error(err);
      alert("Network or API endpoint failure: " + err.message);
    } finally {
      setBookingLoading(false);
    }
  };

  // Live Track Order
  const handleTrackShipment = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!trackingNo.trim()) return;

    try {
      setTrackingLoading(true);
      setTrackingError('');
      setTrackingResult(null);

      const res = await fetch(`/api/postex/track/${trackingNo.trim()}`);
      if (!res.ok) {
        throw new Error(`HTTP Error ${res.status}`);
      }
      
      const data = await res.json();
      if (data.statusCode === "200" && data.dist) {
        setTrackingResult(data.dist);
      } else {
        setTrackingError(data.statusMessage || "Shipment tracking number not found on PostEx.");
      }
    } catch (err: any) {
      console.error(err);
      setTrackingError("Failed to communicate with tracking service: " + err.message);
    } finally {
      setTrackingLoading(false);
    }
  };

  // Cancel Shipment Order
  const handleCancelShipment = async (trackNo: string) => {
    if (!window.confirm(`Are you sure you want to cancel the PostEx booking for ${trackNo}?`)) {
      return;
    }

    try {
      setTrackingLoading(true);
      const res = await fetch('/api/postex/cancel-order', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackingNumber: trackNo })
      });

      const data = await res.json();
      if (data.statusCode === "200") {
        alert("Shipment successfully cancelled on PostEx!");
        // Refresh tracking if currently active
        if (trackingNo === trackNo) {
          handleTrackShipment();
        }
        // Refresh orders list
        if (activeTab === 'shipments') {
          fetchPostexOrders();
        }
      } else {
        alert("Failed to cancel shipment: " + (data.statusMessage || "Unknown response"));
      }
    } catch (err: any) {
      console.error(err);
      alert("Failed to cancel shipment: " + err.message);
    } finally {
      setTrackingLoading(false);
    }
  };

  // Filtered operational cities
  const filteredCities = cities.filter(c => {
    const matchesSearch = c.operationalCityName.toLowerCase().includes(citySearch.toLowerCase());
    if (cityFilter === 'pickup') return matchesSearch && c.isPickupCity === true;
    if (cityFilter === 'delivery') return matchesSearch && c.isDeliveryCity === true;
    return matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn" id="postex-portal-overlay">
      <div 
        className="bg-stone-50 rounded-2xl shadow-2xl max-w-5xl w-full p-0 border border-stone-200 h-[90vh] flex flex-col overflow-hidden"
        id="postex-portal-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner Title Header */}
        <div className="bg-stone-950 text-white p-5 flex justify-between items-center relative shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white font-serif font-black tracking-tighter text-sm flex items-center gap-0.5">
              <span>PostEx</span>
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold tracking-wide text-white uppercase flex items-center gap-2">
                Merchant Dispatch Hub 
                <span className="text-[9px] font-mono bg-stone-850 text-stone-400 px-2 py-0.5 rounded-full uppercase border border-stone-800">
                  Paid Logistic Systems v4.1.9
                </span>
              </h2>
              <p className="text-[10px] text-stone-400 font-sans tracking-wider uppercase">
                Official logistics, booking fulfillment & live Pakistani courier tracker
              </p>
            </div>
          </div>
          <button
            id="close-postex-btn"
            onClick={onClose}
            className="p-1.5 rounded-full bg-stone-900 text-stone-400 hover:bg-red-600 hover:text-white transition-all border border-stone-800"
          >
            <X size={16} />
          </button>
        </div>

        {/* Config / Demo Banner indicator */}
        <div className={`py-1.5 px-5 text-[10px] font-mono flex justify-between items-center shrink-0 border-b ${
          config?.configured ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-amber-50 border-amber-100 text-amber-800'
        }`}>
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${config?.configured ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
            <span>
              {config?.configured 
                ? `LIVE CONNECTION VERIFIED - SECURE CREDENTIAL DETECTED (${config.token})` 
                : 'SIMULATION / SANDBOX DEMO MODE - API KEY MISSING. USING RECONCILED HIGH-FIDELITY LOCAL SCHEMAS'
              }
            </span>
          </div>
          <button 
            onClick={() => handleTabChange('config')} 
            className="underline font-bold hover:text-stone-900 flex items-center gap-1"
          >
            <Settings size={10} />
            <span>Setup Instructions</span>
          </button>
        </div>

        {/* Body content with Left Sidebar Navigation */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Navigation Menu */}
          <div className="w-64 bg-white border-r border-stone-200 flex flex-col p-4 space-y-1 select-none shrink-0">
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-stone-400 mb-2 px-2.5">
              Fulfillment Menu
            </span>
            
            <button
              id="tab-book-btn"
              onClick={() => handleTabChange('book')}
              className={`flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-left text-xs font-semibold tracking-wide transition-all ${
                activeTab === 'book' 
                  ? 'bg-stone-950 text-white shadow-md' 
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              <PlusCircle size={16} />
              <span>Book New Courier</span>
            </button>

            <button
              id="tab-track-btn"
              onClick={() => handleTabChange('track')}
              className={`flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-left text-xs font-semibold tracking-wide transition-all ${
                activeTab === 'track' 
                  ? 'bg-stone-950 text-white shadow-md' 
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              <Truck size={16} />
              <span>Track Live Shipments</span>
            </button>

            <button
              id="tab-shipments-btn"
              onClick={() => handleTabChange('shipments')}
              className={`flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-left text-xs font-semibold tracking-wide transition-all ${
                activeTab === 'shipments' 
                  ? 'bg-stone-950 text-white shadow-md' 
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              <FileText size={16} />
              <span>PostEx Active Logs</span>
            </button>

            <button
              id="tab-cities-btn"
              onClick={() => handleTabChange('cities')}
              className={`flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-left text-xs font-semibold tracking-wide transition-all ${
                activeTab === 'cities' 
                  ? 'bg-stone-950 text-white shadow-md' 
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              <Globe size={16} />
              <span>Operational Cities</span>
            </button>

            <div className="flex-grow"></div>

            {/* Warehouse display card info */}
            {addresses.length > 0 && (
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 text-[11px] text-stone-600 space-y-1 font-sans">
                <span className="font-bold text-stone-950 flex items-center gap-1.5 uppercase text-[9px] tracking-wide font-mono mb-1 text-blue-800">
                  <Building size={12} />
                  Active Dispatch Wharf
                </span>
                <p className="font-bold text-stone-900 line-clamp-1">{addresses[0].contactPersonName}</p>
                <p className="text-[10px] leading-tight text-stone-500 line-clamp-2">{addresses[0].address}</p>
                <p className="text-[10px] font-mono text-stone-950 font-semibold">{addresses[0].cityName} &bull; {addresses[0].addressCode}</p>
              </div>
            )}
          </div>

          {/* Right Main Panel Content */}
          <div className="flex-1 bg-white p-6 overflow-y-auto">
            {/* TAB 1: BOOK COURIER SHIPMENT */}
            {activeTab === 'book' && (
              <div className="space-y-6 max-w-3xl animate-fadeIn">
                <div className="border-b border-stone-100 pb-3">
                  <h3 className="font-serif text-base font-bold text-stone-950 uppercase tracking-wide">
                    Courier Order Booking Portal
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Link existing storefront checkout orders or manually generate an Airway Bill parcel with PostEx.
                  </p>
                </div>

                {/* Local order selector drop */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider font-bold text-stone-500">
                      Link From Storefront Orders
                    </label>
                    <select
                      id="booking-local-order-select"
                      value={selectedLocalOrder}
                      onChange={(e) => handleLocalOrderSelect(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800 outline-none focus:ring-1 focus:ring-stone-950 focus:bg-white"
                    >
                      <option value="">-- Manual Standalone Booking --</option>
                      {orders.map(ord => (
                        <option key={ord.id} value={ord.id}>
                          {ord.id} - {ord.customer.firstName} {ord.customer.lastName} (Rs. {ord.total}) - {ord.status}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider font-bold text-stone-500">
                      Sender Pickup Warehouse Address
                    </label>
                    {loadingAddresses ? (
                      <div className="text-xs text-stone-400 p-2.5">Loading warehouses...</div>
                    ) : (
                      <select
                        id="booking-pickup-address-select"
                        value={pickupCode}
                        onChange={(e) => setPickupCode(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800 outline-none focus:ring-1 focus:ring-stone-950 focus:bg-white"
                      >
                        {addresses.map(add => (
                          <option key={add.addressCode} value={add.addressCode}>
                            {add.contactPersonName} ({add.cityName}) - {add.addressCode}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>

                {/* Booking success notification banner */}
                {bookingSuccess && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs space-y-2 text-emerald-800 animate-slideUp">
                    <div className="flex items-center gap-2 font-bold text-emerald-950">
                      <CheckCircle2 className="text-emerald-600" size={18} />
                      <span>COURIER SHIPMENT GENERATED SUCCESSFULLY!</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono text-[11px]">
                      <div>
                        <span className="text-stone-400 block">Airway Bill (AWB):</span>
                        <strong className="text-emerald-950 text-xs underline select-all">{bookingSuccess.trackingNumber}</strong>
                      </div>
                      <div>
                        <span className="text-stone-400 block">Booking Status:</span>
                        <span className="bg-emerald-100 text-emerald-900 py-0.5 px-2 rounded-full font-bold">{bookingSuccess.orderStatus}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block">Logged Timestamp:</span>
                        <span className="text-stone-800">{bookingSuccess.orderDate}</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-stone-500 pt-1.5">
                      The generated packing details are logged into the PostEx merchant tracking ledger. Print the invoice airway labels using the live tracking utility.
                    </p>
                  </div>
                )}

                {/* Form Inputs for Booking */}
                <form onSubmit={handleCreateBooking} className="space-y-4">
                  <div className="bg-stone-50/50 border border-stone-150 p-4.5 rounded-xl space-y-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-stone-400 block border-b border-stone-100 pb-1.5">
                      Recipient / Customer Specifications
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase font-bold text-stone-600">
                          Customer Complete Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Amina Khan"
                          value={bookingName}
                          onChange={(e) => setBookingName(e.target.value)}
                          className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800 outline-none focus:ring-1 focus:ring-stone-950"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase font-bold text-stone-600">
                          Mobile Phone * (Format: 03xxxxxxxxx)
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 03001234567"
                          value={bookingPhone}
                          onChange={(e) => setBookingPhone(e.target.value)}
                          className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800 outline-none focus:ring-1 focus:ring-stone-950 font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1 md:col-span-1">
                        <label className="text-[10px] font-mono uppercase font-bold text-stone-600">
                          Operational City Name *
                        </label>
                        <select
                          required
                          value={bookingCity}
                          onChange={(e) => setBookingCity(e.target.value)}
                          className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800 outline-none focus:ring-1 focus:ring-stone-950"
                        >
                          <option value="">-- Select City --</option>
                          {cities.map(c => (
                            <option key={c.operationalCityName} value={c.operationalCityName}>
                              {c.operationalCityName}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1 md:col-span-2">
                        <label className="text-[10px] font-mono uppercase font-bold text-stone-600">
                          Physical Shipping Address *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. House 345, Street 4, Sector F-11/2"
                          value={bookingAddress}
                          onChange={(e) => setBookingAddress(e.target.value)}
                          className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800 outline-none focus:ring-1 focus:ring-stone-950"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-stone-50/50 border border-stone-150 p-4.5 rounded-xl space-y-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-stone-400 block border-b border-stone-100 pb-1.5">
                      Fulfillment & Billing Details
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase font-bold text-stone-600">
                          COD Payment Value * (Rs.)
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-xs font-bold text-stone-400">Rs.</span>
                          <input
                            type="number"
                            required
                            min="0"
                            placeholder="e.g. 4500"
                            value={bookingAmount}
                            onChange={(e) => setBookingAmount(e.target.value)}
                            className="w-full bg-white border border-stone-200 rounded-lg py-2.5 pl-9 pr-3 text-xs text-stone-800 font-mono font-bold outline-none focus:ring-1 focus:ring-stone-950"
                          />
                        </div>
                      </div>

                      <div className="space-y-1 md:col-span-2">
                        <label className="text-[10px] font-mono uppercase font-bold text-stone-600">
                          Consignment Content / Package Details
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 2 Piece Embroidered Unstitched Lawn Suit"
                          value={bookingDetails}
                          onChange={(e) => setBookingDetails(e.target.value)}
                          className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800 outline-none focus:ring-1 focus:ring-stone-950"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 justify-end pt-2">
                    <button
                      type="button"
                      onClick={clearBookingForm}
                      className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-mono text-[10px] font-bold py-2.5 px-4 rounded-xl transition-colors uppercase border"
                    >
                      Clear Fields
                    </button>
                    <button
                      type="submit"
                      disabled={bookingLoading}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-stone-300 disabled:text-stone-500 text-white font-mono text-[10px] font-bold py-2.5 px-6 rounded-xl transition-all uppercase flex items-center gap-2 shadow-md hover:shadow-lg"
                    >
                      {bookingLoading ? (
                        <>
                          <RefreshCw className="animate-spin" size={13} />
                          <span>Generating AWB...</span>
                        </>
                      ) : (
                        <>
                          <Check size={14} strokeWidth={2.5} />
                          <span>Book PostEx Courier</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 2: LIVE SHIPMENT TRACKER */}
            {activeTab === 'track' && (
              <div className="space-y-6 max-w-3xl animate-fadeIn">
                <div className="border-b border-stone-100 pb-3">
                  <h3 className="font-serif text-base font-bold text-stone-950 uppercase tracking-wide">
                    Live Airway Bill Parcel Tracker
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Query active PostEx consignments using any valid tracking code to verify milestone events and billing clearings.
                  </p>
                </div>

                <form onSubmit={handleTrackShipment} className="flex gap-2.5 max-w-lg">
                  <div className="relative flex-grow">
                    <Truck className="absolute left-3 top-2.5 text-stone-400" size={15} />
                    <input
                      type="text"
                      placeholder="Enter PostEx tracking code (e.g. PE-87234901)"
                      value={trackingNo}
                      onChange={(e) => setTrackingNo(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl py-2 pl-9 pr-4 text-xs font-mono font-bold uppercase tracking-widest outline-none focus:ring-1 focus:ring-stone-950 focus:bg-white"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={trackingLoading || !trackingNo.trim()}
                    className="bg-stone-950 hover:bg-stone-800 disabled:bg-stone-200 disabled:text-stone-400 text-white font-mono text-[10px] font-bold px-5 rounded-xl transition-colors uppercase flex items-center gap-1.5 shrink-0"
                  >
                    {trackingLoading ? <RefreshCw className="animate-spin" size={12} /> : <Search size={13} />}
                    <span>Query System</span>
                  </button>
                </form>

                {trackingError && (
                  <div className="bg-red-50 border border-red-150 rounded-xl p-4 text-xs text-red-800 flex items-start gap-2 max-w-lg animate-fadeIn">
                    <AlertCircle className="shrink-0 mt-0.5" size={16} />
                    <div>
                      <strong className="block font-bold">Query Lookup Failed</strong>
                      <p className="text-[11px] text-red-700 mt-0.5">{trackingError}</p>
                    </div>
                  </div>
                )}

                {trackingResult && (
                  <div className="space-y-6 animate-slideUp">
                    {/* Shipment Meta Details Card */}
                    <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2 text-xs font-sans">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 block border-b border-stone-150 pb-1">
                          Consignment Specifications
                        </span>
                        <div className="grid grid-cols-3 gap-1">
                          <span className="text-stone-400">AWB Track:</span>
                          <span className="col-span-2 font-mono font-bold text-stone-950">{trackingResult.trackingNumber}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <span className="text-stone-400">Order Ref:</span>
                          <span className="col-span-2 font-mono font-bold text-stone-950">{trackingResult.orderRefNumber || 'N/A'}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <span className="text-stone-400">COD Value:</span>
                          <span className="col-span-2 font-bold text-blue-900 font-mono">Rs. {trackingResult.invoicePayment}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <span className="text-stone-400">Status Check:</span>
                          <div className="col-span-2">
                            <span className="bg-blue-100 text-blue-950 py-0.5 px-2.5 rounded-full text-[10px] font-bold font-mono">
                              {trackingResult.transactionStatus}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs font-sans">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 block border-b border-stone-150 pb-1">
                          Receiver Information
                        </span>
                        <div className="grid grid-cols-3 gap-1">
                          <span className="text-stone-400">Customer:</span>
                          <span className="col-span-2 font-bold text-stone-950">{trackingResult.customerName}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <span className="text-stone-400">Mobile Phone:</span>
                          <span className="col-span-2 font-mono text-stone-850">{trackingResult.customerPhone}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <span className="text-stone-400">Address:</span>
                          <span className="col-span-2 text-stone-700 leading-tight">{trackingResult.deliveryAddress}</span>
                        </div>
                      </div>
                    </div>

                    {/* Timeline Tracker */}
                    <div className="border border-stone-200 rounded-xl p-5 space-y-4">
                      <h4 className="font-serif text-sm font-bold text-stone-950 uppercase tracking-wide">
                        Consignment Lifecycle Event Logs
                      </h4>

                      <div className="relative border-l-2 border-stone-200 pl-6 ml-2 space-y-5">
                        {trackingResult.transactionStatusHistory && trackingResult.transactionStatusHistory.map((hist: any, index: number) => {
                          const isLast = index === trackingResult.transactionStatusHistory.length - 1;
                          return (
                            <div key={index} className="relative text-xs">
                              <div className={`absolute -left-[29px] top-0 rounded-full w-4 h-4 border-2 flex items-center justify-center ${
                                isLast ? 'bg-blue-600 border-blue-600 text-white animate-pulse' : 'bg-white border-stone-300 text-stone-400'
                              }`}>
                                {isLast ? <Check size={10} strokeWidth={3} /> : <div className="w-1.5 h-1.5 bg-stone-300 rounded-full" />}
                              </div>
                              <div>
                                <h5 className={`font-bold uppercase tracking-wider font-mono ${isLast ? 'text-blue-900 font-extrabold' : 'text-stone-600'}`}>
                                  {hist.transactionStatusMessage}
                                </h5>
                                <p className="text-[10px] text-stone-400 font-mono mt-0.5">
                                  Status Code: {hist.transactionStatusMessageCode}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Actions pane (Cancellation) */}
                    {(trackingResult.transactionStatus === 'Booked' || trackingResult.transactionStatus === 'UnBooked' || trackingResult.transactionStatus === 'Pending') && (
                      <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 flex justify-between items-center max-w-lg">
                        <div className="space-y-0.5">
                          <span className="text-xs font-bold text-stone-900 block">Cancel Consignment Booking</span>
                          <span className="text-[10px] text-stone-400 leading-relaxed block">
                            If this package has not left your warehouse, you can cancel it directly.
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCancelShipment(trackingResult.trackingNumber)}
                          className="bg-red-50 hover:bg-red-100 text-red-700 font-mono text-[9px] font-bold py-2 px-3 rounded-lg border border-red-200 transition-colors uppercase flex items-center gap-1.5 shrink-0"
                        >
                          <Trash2 size={12} />
                          <span>Cancel Order</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: POSTEX ACTIVE LOGS LIST */}
            {activeTab === 'shipments' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-stone-100 pb-3 flex justify-between items-center">
                  <div>
                    <h3 className="font-serif text-base font-bold text-stone-950 uppercase tracking-wide">
                      PostEx Consignment Logs Ledger
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      View all registered courier orders currently managed inside your PostEx Merchant account.
                    </p>
                  </div>
                  <button
                    onClick={fetchPostexOrders}
                    disabled={loadingOrders}
                    className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 hover:text-stone-950 transition-colors text-stone-600 font-mono text-[10px] font-bold flex items-center gap-1 shrink-0 uppercase"
                  >
                    <RefreshCw className={loadingOrders ? 'animate-spin' : ''} size={11} />
                    <span>Sync Ledger</span>
                  </button>
                </div>

                {loadingOrders ? (
                  <div className="py-12 text-center text-stone-400 space-y-2">
                    <RefreshCw className="animate-spin mx-auto text-stone-300" size={24} />
                    <p className="text-xs font-mono">Synchronizing merchant records from PostEx nodes...</p>
                  </div>
                ) : postexOrders.length === 0 ? (
                  <div className="py-12 text-center text-stone-400 border border-dashed rounded-2xl">
                    <FileText className="mx-auto text-stone-300 mb-2" size={32} />
                    <h4 className="font-serif text-xs font-bold text-stone-900 uppercase">No Active Courier Shipments</h4>
                    <p className="text-[11px] text-stone-400 max-w-xs mx-auto mt-1 leading-relaxed">
                      You haven't booked any courier packages yet. Navigate to the "Book New Courier" tab to log your first parcel.
                    </p>
                  </div>
                ) : (
                  <div className="border border-stone-200 rounded-xl overflow-hidden shadow-sm" id="shipments-table-wrapper">
                    <table className="w-full text-left border-collapse font-sans text-xs">
                      <thead>
                        <tr className="bg-stone-50 border-b border-stone-200 text-[10px] font-mono font-bold uppercase text-stone-500 tracking-wider">
                          <th className="p-3.5">Reference No</th>
                          <th className="p-3.5">Airway Bill (AWB)</th>
                          <th className="p-3.5">Recipient Details</th>
                          <th className="p-3.5">Operational City</th>
                          <th className="p-3.5">COD Amount</th>
                          <th className="p-3.5">Courier Status</th>
                          <th className="p-3.5 text-center">Fulfill Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-150">
                        {postexOrders.map((ord, i) => (
                          <tr key={i} className="hover:bg-stone-50/50 transition-colors">
                            <td className="p-3.5 font-mono font-bold text-stone-950">{ord.orderRefNumber}</td>
                            <td className="p-3.5">
                              <button
                                onClick={() => {
                                  setTrackingNo(ord.trackingNumber);
                                  handleTabChange('track');
                                  // Wait for transition, then track
                                  setTimeout(() => {
                                    const mockFormEvent = { preventDefault: () => {} };
                                    // Make sure states have processed
                                  }, 50);
                                }}
                                className="font-mono font-bold text-blue-700 underline text-left hover:text-blue-900 select-all"
                              >
                                {ord.trackingNumber}
                              </button>
                            </td>
                            <td className="p-3.5">
                              <div className="font-bold text-stone-900">{ord.customerName}</div>
                              <div className="text-[10px] font-mono text-stone-500">{ord.customerPhone}</div>
                            </td>
                            <td className="p-3.5 font-bold text-stone-900">{ord.cityName}</td>
                            <td className="p-3.5 font-mono font-bold text-stone-900">Rs. {ord.invoicePayment}</td>
                            <td className="p-3.5">
                              <span className={`inline-block py-0.5 px-2 rounded-full font-mono font-bold text-[9px] tracking-wide uppercase ${
                                ord.transactionStatus === 'Delivered' 
                                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-100'
                                  : ord.transactionStatus === 'Out For Delivery' || ord.transactionStatus === 'Package on Root'
                                  ? 'bg-amber-50 text-amber-800 border border-amber-100 animate-pulse'
                                  : 'bg-blue-50 text-blue-800 border border-blue-100'
                              }`}>
                                {ord.transactionStatus || 'Booked'}
                              </span>
                            </td>
                            <td className="p-3.5 text-center">
                              <button
                                onClick={() => {
                                  setTrackingNo(ord.trackingNumber);
                                  handleTabChange('track');
                                }}
                                className="bg-stone-100 hover:bg-stone-950 hover:text-white border text-stone-700 font-mono text-[9px] font-bold py-1 px-2 rounded-md transition-all uppercase"
                              >
                                Manage / Track
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: OPERATIONAL CITIES */}
            {activeTab === 'cities' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-stone-100 pb-3">
                  <h3 className="font-serif text-base font-bold text-stone-950 uppercase tracking-wide">
                    Operational Cities Registry
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Search and filter official operational hubs in Pakistan where PostEx provides express delivery logistics and warehouse pickups.
                  </p>
                </div>

                {/* Filter and Search Bar */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-grow max-w-md">
                    <Search className="absolute left-3 top-2.5 text-stone-400" size={14} />
                    <input
                      type="text"
                      placeholder="Search city (e.g. Faisalabad, Karachi...)"
                      value={citySearch}
                      onChange={(e) => setCitySearch(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl py-2 pl-9 pr-4 text-xs outline-none focus:ring-1 focus:ring-stone-950 focus:bg-white"
                    />
                  </div>

                  <div className="flex bg-stone-100 p-1 rounded-xl font-mono text-[10px] font-bold uppercase select-none max-w-max">
                    <button
                      onClick={() => setCityFilter('all')}
                      className={`px-3 py-1.5 rounded-lg transition-all ${cityFilter === 'all' ? 'bg-white text-stone-950 shadow-sm' : 'text-stone-500 hover:text-stone-850'}`}
                    >
                      All Hubs ({cities.length})
                    </button>
                    <button
                      onClick={() => setCityFilter('pickup')}
                      className={`px-3 py-1.5 rounded-lg transition-all ${cityFilter === 'pickup' ? 'bg-white text-stone-950 shadow-sm' : 'text-stone-500 hover:text-stone-850'}`}
                    >
                      Pickup Center
                    </button>
                    <button
                      onClick={() => setCityFilter('delivery')}
                      className={`px-3 py-1.5 rounded-lg transition-all ${cityFilter === 'delivery' ? 'bg-white text-stone-950 shadow-sm' : 'text-stone-500 hover:text-stone-850'}`}
                    >
                      COD Home Delivery
                    </button>
                  </div>
                </div>

                {loadingCities ? (
                  <div className="py-12 text-center text-stone-400 space-y-2">
                    <RefreshCw className="animate-spin mx-auto text-stone-300" size={24} />
                    <p className="text-xs font-mono">Querying operational database registry...</p>
                  </div>
                ) : filteredCities.length === 0 ? (
                  <div className="py-12 text-center text-stone-400 border border-dashed rounded-2xl">
                    <Globe className="mx-auto text-stone-300 mb-2 animate-bounce" size={32} />
                    <h4 className="font-serif text-xs font-bold text-stone-900 uppercase">City Not Logged</h4>
                    <p className="text-[11px] text-stone-400 max-w-xs mx-auto mt-1 leading-relaxed">
                      We couldn't find any operational PostEx city matches for "{citySearch}".
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 max-h-[50vh] overflow-y-auto pr-2" id="cities-grid">
                    {filteredCities.map((c, i) => (
                      <div key={i} className="bg-white border border-stone-200 rounded-xl p-3.5 flex justify-between items-center hover:border-stone-400 hover:shadow-sm transition-all">
                        <div className="space-y-0.5">
                          <strong className="font-serif text-xs font-bold text-stone-950 block">{c.operationalCityName}</strong>
                          <span className="text-[9px] font-mono text-stone-400 uppercase tracking-widest">{c.countryName || 'Pakistan'}</span>
                        </div>
                        <div className="flex gap-1.5 font-mono text-[8px] font-black uppercase">
                          {c.isPickupCity ? (
                            <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 py-0.5 px-2 rounded-full flex items-center gap-1 font-bold">
                              <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></span>
                              Pick
                            </span>
                          ) : (
                            <span className="bg-stone-50 text-stone-400 border py-0.5 px-2 rounded-full">No Pick</span>
                          )}
                          
                          {c.isDeliveryCity ? (
                            <span className="bg-blue-50 text-blue-800 border border-blue-100 py-0.5 px-2 rounded-full flex items-center gap-1 font-bold">
                              <span className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"></span>
                              COD
                            </span>
                          ) : (
                            <span className="bg-stone-50 text-stone-400 border py-0.5 px-2 rounded-full">No COD</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 5: CONFIG GUIDE & SECURE SETUP */}
            {activeTab === 'config' && (
              <div className="space-y-6 max-w-3xl animate-fadeIn">
                <div className="border-b border-stone-100 pb-3">
                  <h3 className="font-serif text-base font-bold text-stone-950 uppercase tracking-wide">
                    Secure PostEx API Setup Guide
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Learn how to secure your merchant courier system by injecting your official token.
                  </p>
                </div>

                <div className="space-y-4 font-sans text-stone-700 text-xs leading-relaxed">
                  <div className="bg-stone-950 text-stone-100 p-5 rounded-xl space-y-3 shadow-md border border-stone-800">
                    <span className="text-[10px] font-mono font-bold text-[#b4904c] tracking-widest uppercase block border-b border-stone-800 pb-1">
                      🔐 ENVIRONMENT VARIABLE KEY BINDINGS
                    </span>
                    <p className="text-[11px] leading-relaxed text-stone-300">
                      We have engineered a secure server-side Proxy system. This ensures your private merchant token is <strong>never</strong> transmitted to client browsers, preventing unauthorized third-party bookings.
                    </p>
                    
                    <div className="space-y-1 bg-stone-900 border border-stone-850 p-3.5 rounded-lg text-[11px] font-mono">
                      <span className="text-stone-400 font-bold block mb-1">In your server settings (.env) specify:</span>
                      <span className="text-stone-100 block"><span className="text-emerald-400">POSTEX_API_TOKEN</span>="your_official_postex_token_here"</span>
                    </div>
                  </div>

                  <div className="border border-stone-200 rounded-xl p-5 space-y-3.5">
                    <h4 className="font-serif text-sm font-bold text-stone-950 uppercase tracking-wide flex items-center gap-1.5">
                      <HelpCircle size={16} className="text-stone-700" />
                      Frequently Asked Questions
                    </h4>

                    <div className="space-y-3">
                      <div className="space-y-1">
                        <strong className="text-stone-950 font-bold block">1. Where do I get my PostEx API Token?</strong>
                        <p className="text-stone-500 text-[11px]">
                          Log into your official <strong className="text-stone-850">PostEx Merchant Center portal</strong> (or email <a href="mailto:support@postex.pk" className="underline font-bold text-blue-700">support@postex.pk</a> / contact Babar Razzaq at <strong className="font-mono text-stone-800">0300-0441793</strong>). Go to Integration Settings, copy your unique secret merchant token, and paste it into the system workspace settings.
                        </p>
                      </div>

                      <div className="space-y-1">
                        <strong className="text-stone-950 font-bold block">2. How does the Pakistan Mobile Phone spec format operate?</strong>
                        <p className="text-stone-500 text-[11px]">
                          PostEx APIs require receiver phones to strictly match the standard Pakistani <strong className="font-mono text-stone-800">03xxxxxxxxx</strong> format (e.g., 11 digits starting with 03). Our system features an intelligent regex sanitizer that cleans +92 or 92 prefixes automatically upon dispatch.
                        </p>
                      </div>

                      <div className="space-y-1">
                        <strong className="text-stone-950 font-bold block">3. Can I test shipment cancellations?</strong>
                        <p className="text-stone-500 text-[11px]">
                          Yes! If the shipment is still in the "Booked" or "Unbooked" stage, you can cancel it directly through the "Live Shipment Tracker" tab or from the "PostEx Active Logs" ledger list using the cancel buttons.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
