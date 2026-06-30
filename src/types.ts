/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number; // in PKR
  originalPrice?: number; // for sale items
  fabric: string; // "Lawn", "Chiffon", "Organza", "Cotton", "Jacquard", "Cambric", "Silk"
  type: 'unstitched' | 'ready-to-wear' | 'festive' | 'sale';
  pieces: '1 Piece' | '2 Piece' | '3 Piece';
  image: string;
  gallery: string[];
  sizes: string[]; // ['Unstitched'] or ['S', 'M', 'L', 'XL'] etc.
  stock: number;
  sku: string;
  details: string[];
  isNew?: boolean;
  colors?: string[];
  brand?: string;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface FilterState {
  search: string;
  types: ('unstitched' | 'ready-to-wear' | 'festive' | 'sale')[];
  fabrics: string[];
  pieces: ('1 Piece' | '2 Piece' | '3 Piece')[];
  sizes: string[];
  priceRange: [number, number];
  sortBy: 'price-low-high' | 'price-high-low' | 'best-seller' | 'newest';
}

export interface CustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  paymentMethod: 'cod' | 'bank_transfer';
  bankReceiptImage?: string;
}

export interface Order {
  id: string;
  date: string;
  customer: CustomerDetails;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  trackingNo?: string;
  trackingUrl?: string;
  carrier?: string;
}
