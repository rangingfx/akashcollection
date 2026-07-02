/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Review } from '../types';

export const FABRICS = [
  'Lawn',
  'Chiffon',
  'Organza',
  'Cambric',
  'Jacquard',
  'Silk',
  'Cotton'
];

export const CITIES_OF_PAKISTAN = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Gujranwala',
  'Hyderabad',
  'Sargodha',
  'Bahawalpur',
  'Sukkur',
  'Jhelum'
];

export const PRODUCTS: Product[] = [
  {
    id: 'zamzam-lawn-3pc-1',
    title: 'Zamzam Lawn 3-Piece Suit',
    description: 'Premium Zamzam Lawn 3-Piece Suit.\n\nComponent Details:\n• Digital Printed Zamzam Lawn Shirt\n• Digital Printed Dupatta\n• Dyed Trouser',
    price: 4550,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '3 Piece',
    image: '/lawn-1.jpeg',
    gallery: ['/lawn-1.jpeg'],
    sizes: ['Unstitched'],
    stock: 50,
    sku: 'ZAM-LAWN-3PC-1',
    details: [
      'Premium Zamzam Lawn Fabric',
      'High-quality digital print',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ],
    isNew: true,
    colors: ['Multicolor'],
    brand: 'Akash Collection'
  },
  {
    id: 'zamzam-lawn-3pc-2',
    title: 'Zamzam Lawn 3-Piece Suit',
    description: 'Premium Zamzam Lawn 3-Piece Suit.\n\nComponent Details:\n• Digital Printed Zamzam Lawn Shirt\n• Digital Printed Dupatta\n• Dyed Trouser',
    price: 4550,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '3 Piece',
    image: '/lawn-2.jpeg',
    gallery: ['/lawn-2.jpeg'],
    sizes: ['Unstitched'],
    stock: 50,
    sku: 'ZAM-LAWN-3PC-2',
    details: [
      'Premium Zamzam Lawn Fabric',
      'High-quality digital print',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ],
    isNew: true,
    colors: ['Multicolor'],
    brand: 'Akash Collection'
  },
  {
    id: 'zamzam-lawn-3pc-3',
    title: 'Zamzam Lawn 3-Piece Suit',
    description: 'Premium Zamzam Lawn 3-Piece Suit.\n\nComponent Details:\n• Digital Printed Zamzam Lawn Shirt\n• Digital Printed Dupatta\n• Dyed Trouser',
    price: 4550,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '3 Piece',
    image: '/lawn-3.jpeg',
    gallery: ['/lawn-3.jpeg'],
    sizes: ['Unstitched'],
    stock: 50,
    sku: 'ZAM-LAWN-3PC-3',
    details: [
      'Premium Zamzam Lawn Fabric',
      'High-quality digital print',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ],
    isNew: true,
    colors: ['Multicolor'],
    brand: 'Akash Collection'
  },
  {
    id: 'swiss-lawn-3pc-1',
    title: 'Swiss Lawn 3-Piece Suit',
    description: 'Elegant Swiss Lawn 3-Piece Suit.\n\nComponent Details:\n• Digital Printed Swiss Lawn Shirt\n• Digital Printed Swiss Lawn Dupatta\n• Dyed Trouser',
    price: 5550,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '3 Piece',
    image: '/lawn-4.jpeg',
    gallery: ['/lawn-4.jpeg'],
    sizes: ['Unstitched'],
    stock: 50,
    sku: 'SWISS-LAWN-3PC-1',
    details: [
      'Premium Swiss Lawn Fabric',
      'Elegant design',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ],
    isNew: true,
    colors: ['Multicolor'],
    brand: 'Akash Collection'
  },
  {
    id: 'swiss-lawn-3pc-2',
    title: 'Swiss Lawn 3-Piece Suit',
    description: 'Elegant Swiss Lawn 3-Piece Suit.\n\nComponent Details:\n• Digital Printed Swiss Lawn Shirt\n• Digital Printed Swiss Lawn Dupatta\n• Dyed Trouser',
    price: 5550,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '3 Piece',
    image: '/lawn-5.jpeg',
    gallery: ['/lawn-5.jpeg'],
    sizes: ['Unstitched'],
    stock: 50,
    sku: 'SWISS-LAWN-3PC-2',
    details: [
      'Premium Swiss Lawn Fabric',
      'Elegant design',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ],
    isNew: true,
    colors: ['Multicolor'],
    brand: 'Akash Collection'
  },
  {
    id: 'swiss-lawn-3pc-3',
    title: 'Swiss Lawn 3-Piece Suit',
    description: 'Elegant Swiss Lawn 3-Piece Suit.\n\nComponent Details:\n• Digital Printed Swiss Lawn Shirt\n• Digital Printed Swiss Lawn Dupatta\n• Dyed Trouser',
    price: 5550,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '3 Piece',
    image: '/lawn-6.jpeg',
    gallery: ['/lawn-6.jpeg'],
    sizes: ['Unstitched'],
    stock: 50,
    sku: 'SWISS-LAWN-3PC-3',
    details: [
      'Premium Swiss Lawn Fabric',
      'Elegant design',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ],
    isNew: true,
    colors: ['Multicolor'],
    brand: 'Akash Collection'
  },
  {
    id: 'lawn-2pc-1',
    title: '2-Piece Lawn Suit',
    description: 'Classic 2-Piece Lawn Suit.\n\nComponent Details:\n• Digital Printed Lawn Shirt\n• Dyed Trouser',
    price: 2750,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: '/lawn-7.jpeg',
    gallery: ['/lawn-7.jpeg'],
    sizes: ['Unstitched'],
    stock: 50,
    sku: 'LAWN-2PC-1',
    details: [
      'Quality Lawn Fabric',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ],
    isNew: true,
    colors: ['Multicolor'],
    brand: 'Akash Collection'
  },
  {
    id: 'lawn-2pc-2',
    title: '2-Piece Lawn Suit',
    description: 'Classic 2-Piece Lawn Suit.\n\nComponent Details:\n• Digital Printed Lawn Shirt\n• Dyed Trouser',
    price: 2750,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: '/lawn-8.jpeg',
    gallery: ['/lawn-8.jpeg'],
    sizes: ['Unstitched'],
    stock: 50,
    sku: 'LAWN-2PC-2',
    details: [
      'Quality Lawn Fabric',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ],
    isNew: true,
    colors: ['Multicolor'],
    brand: 'Akash Collection'
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    customerName: 'Ayesha Khan',
    rating: 5,
    comment: 'SubhanAllah! The fabric quality is out of this world. Delivery was fast in Lahore, neatly packed. Highly recommend Akash Collection.',
    date: 'June 18, 2026',
    verified: true
  },
  {
    id: 'rev-02',
    customerName: 'Fatima Jamil',
    rating: 5,
    comment: 'Beautiful collection! Exactly as displayed. Will buy again.',
    date: 'June 12, 2026',
    verified: true
  },
  {
    id: 'rev-03',
    customerName: 'Zainab Ahmed',
    rating: 5,
    comment: 'The stitching is impeccable, and the embroidery matches the picture perfectly. Very satisfied with my order.',
    date: 'June 20, 2026',
    verified: true
  },
  {
    id: 'rev-04',
    customerName: 'Maryam Tariq',
    rating: 4,
    comment: 'Loved the pastel lawn suit! The colors are vibrant but sophisticated. Just took an extra day for delivery to Islamabad.',
    date: 'May 14, 2026',
    verified: true
  },
  {
    id: 'rev-05',
    customerName: 'Sana Farooq',
    rating: 5,
    comment: 'Amazing wholesale rates! Bought 5 suits for a family wedding, and the quality of the chiffon was top tier.',
    date: 'June 05, 2026',
    verified: true
  },
  {
    id: 'rev-06',
    customerName: 'Hira Yaseen',
    rating: 5,
    comment: 'Excellent customer service. The cash on delivery option made me feel secure, and the parcel was sealed perfectly.',
    date: 'May 28, 2026',
    verified: true
  },
  {
    id: 'rev-07',
    customerName: 'Nida Qureshi',
    rating: 5,
    comment: 'Alhamdulillah, ordered a black festive wear suit and it’s gorgeous. Pure fabric and heavy embroidery just as promised.',
    date: 'June 10, 2026',
    verified: true
  },
  {
    id: 'rev-08',
    customerName: 'Rabia Saleem',
    rating: 4,
    comment: 'The ready-to-wear kurtis are so comfortable and trendy. Sizing was accurate as per the chart.',
    date: 'June 02, 2026',
    verified: true
  },
  {
    id: 'rev-09',
    customerName: 'Khadija Rizvi',
    rating: 5,
    comment: 'Absolutely love the Bareeze lawn summer collection. The fabric is very breathable and cooling for the Karachi heat.',
    date: 'June 15, 2026',
    verified: true
  },
  {
    id: 'rev-10',
    customerName: 'Anam Butt',
    rating: 5,
    comment: 'Highly recommended! The quality speaks for itself. My go-to store for unstitched fabric now.',
    date: 'June 22, 2026',
    verified: true
  }
];
