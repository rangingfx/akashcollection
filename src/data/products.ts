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
    id: 'akash-3pc-lawn-1',
    title: 'Unstitched 3 Piece Lawn Suit',
    description: 'Component Details (3 Piece) Measurement:\n• Digital Printed Embroidered Front On Lawn: 1.15m\n• Digital Printed Back On Lawn: 1.15m\n• Digital Printed Sleeves On Lawn: 0.65m\n• Embroidered Border On Organza: 1m\n• Embroidered Patti On Organza: 1.5m\n• Embroidered Woven Net Dupatta: 2.5m\n• Embroidered Pallu For Dupatta On Organza: 2m\n• Dyed Cotton Pants: 1.80m',
    price: 4499,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '3 Piece',
    image: '/lawn-1.jpeg',
    gallery: [
      '/lawn-1.jpeg',
      '/lawn-2.jpeg',
      '/lawn-3.jpeg',
      '/lawn-4.jpeg',
      '/lawn-5.jpeg',
      '/lawn-6.jpeg',
      '/lawn-7.jpeg',
      '/lawn-8.jpeg'
    ],
    sizes: ['Unstitched'],
    stock: 100,
    sku: 'AK-LAWN-3PC-1',
    details: [
      'Premium Lawn Fabric',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ],
    isNew: true,
    colors: ['Purple', 'Pink', 'Orange', 'Cream', 'Teal', 'Peach', 'Lilac', 'Aqua'],
    brand: 'Akash Collection'
  },
  {
    id: 'akash-2pc-lawn-1',
    title: '2 Piece - Embroidered Lawn Suit',
    description: 'Component Details (2 Piece):\n• Digital Printed Embroidered Front On Lawn\n• Digital Printed Back On Lawn\n• Digital Printed Sleeves On Lawn\n• Dyed Cotton Pants',
    price: 2750,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: '/lawn-1.jpeg',
    gallery: [
      '/lawn-1.jpeg'
    ],
    sizes: ['Unstitched'],
    stock: 100,
    sku: 'AK-LAWN-2PC-1',
    details: [
      'Premium Embroidered Lawn',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ],
    isNew: true,
    colors: ['Red', 'Blue', 'Green'],
    brand: 'Akash Collection'
  },
  {
    id: 'akash-2pc-lawn-2',
    title: '2 Piece - Embroidered Lawn Suit',
    description: 'Component Details (2 Piece):\n• Digital Printed Embroidered Front On Lawn\n• Digital Printed Back On Lawn\n• Digital Printed Sleeves On Lawn\n• Dyed Cotton Pants',
    price: 2750,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: '/lawn-2.jpeg',
    gallery: [
      '/lawn-2.jpeg'
    ],
    sizes: ['Unstitched'],
    stock: 100,
    sku: 'AK-LAWN-2PC-2',
    details: [
      'Premium Embroidered Lawn',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ],
    isNew: true,
    colors: ['Red', 'Blue', 'Green'],
    brand: 'Akash Collection'
  },
  {
    id: 'akash-2pc-lawn-3',
    title: '2 Piece - Embroidered Lawn Suit',
    description: 'Component Details (2 Piece):\n• Digital Printed Embroidered Front On Lawn\n• Digital Printed Back On Lawn\n• Digital Printed Sleeves On Lawn\n• Dyed Cotton Pants',
    price: 2750,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: '/lawn-3.jpeg',
    gallery: [
      '/lawn-3.jpeg'
    ],
    sizes: ['Unstitched'],
    stock: 100,
    sku: 'AK-LAWN-2PC-3',
    details: [
      'Premium Embroidered Lawn',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ],
    isNew: true,
    colors: ['Red', 'Blue', 'Green'],
    brand: 'Akash Collection'
  },
  {
    id: 'akash-2pc-lawn-4',
    title: '2 Piece - Embroidered Lawn Suit',
    description: 'Component Details (2 Piece):\n• Digital Printed Embroidered Front On Lawn\n• Digital Printed Back On Lawn\n• Digital Printed Sleeves On Lawn\n• Dyed Cotton Pants',
    price: 2750,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: '/lawn-4.jpeg',
    gallery: [
      '/lawn-4.jpeg'
    ],
    sizes: ['Unstitched'],
    stock: 100,
    sku: 'AK-LAWN-2PC-4',
    details: [
      'Premium Embroidered Lawn',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ],
    isNew: true,
    colors: ['Red', 'Blue', 'Green'],
    brand: 'Akash Collection'
  },
  {
    id: 'akash-2pc-lawn-5',
    title: '2 Piece - Embroidered Lawn Suit',
    description: 'Component Details (2 Piece):\n• Digital Printed Embroidered Front On Lawn\n• Digital Printed Back On Lawn\n• Digital Printed Sleeves On Lawn\n• Dyed Cotton Pants',
    price: 2750,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: '/lawn-5.jpeg',
    gallery: [
      '/lawn-5.jpeg'
    ],
    sizes: ['Unstitched'],
    stock: 100,
    sku: 'AK-LAWN-2PC-5',
    details: [
      'Premium Embroidered Lawn',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ],
    isNew: true,
    colors: ['Red', 'Blue', 'Green'],
    brand: 'Akash Collection'
  },
  {
    id: 'akash-2pc-lawn-6',
    title: '2 Piece - Embroidered Lawn Suit',
    description: 'Component Details (2 Piece):\n• Digital Printed Embroidered Front On Lawn\n• Digital Printed Back On Lawn\n• Digital Printed Sleeves On Lawn\n• Dyed Cotton Pants',
    price: 2750,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: '/lawn-6.jpeg',
    gallery: [
      '/lawn-6.jpeg'
    ],
    sizes: ['Unstitched'],
    stock: 100,
    sku: 'AK-LAWN-2PC-6',
    details: [
      'Premium Embroidered Lawn',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ],
    isNew: true,
    colors: ['Red', 'Blue', 'Green'],
    brand: 'Akash Collection'
  },
  {
    id: 'akash-2pc-lawn-7',
    title: '2 Piece - Embroidered Lawn Suit',
    description: 'Component Details (2 Piece):\n• Digital Printed Embroidered Front On Lawn\n• Digital Printed Back On Lawn\n• Digital Printed Sleeves On Lawn\n• Dyed Cotton Pants',
    price: 2750,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: '/lawn-7.jpeg',
    gallery: [
      '/lawn-7.jpeg'
    ],
    sizes: ['Unstitched'],
    stock: 100,
    sku: 'AK-LAWN-2PC-7',
    details: [
      'Premium Embroidered Lawn',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ],
    isNew: true,
    colors: ['Red', 'Blue', 'Green'],
    brand: 'Akash Collection'
  },
  {
    id: 'akash-2pc-lawn-8',
    title: '2 Piece - Embroidered Lawn Suit',
    description: 'Component Details (2 Piece):\n• Digital Printed Embroidered Front On Lawn\n• Digital Printed Back On Lawn\n• Digital Printed Sleeves On Lawn\n• Dyed Cotton Pants',
    price: 2750,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: '/lawn-8.jpeg',
    gallery: [
      '/lawn-8.jpeg'
    ],
    sizes: ['Unstitched'],
    stock: 100,
    sku: 'AK-LAWN-2PC-8',
    details: [
      'Premium Embroidered Lawn',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ],
    isNew: true,
    colors: ['Red', 'Blue', 'Green'],
    brand: 'Akash Collection'
  },
  {
    id: 'akash-2pc-lawn-9',
    title: '2 Piece - Embroidered Lawn Suit',
    description: 'Component Details (2 Piece):\n• Digital Printed Embroidered Front On Lawn\n• Digital Printed Back On Lawn\n• Digital Printed Sleeves On Lawn\n• Dyed Cotton Pants',
    price: 2750,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: '/lawn-9.jpeg',
    gallery: [
      '/lawn-9.jpeg'
    ],
    sizes: ['Unstitched'],
    stock: 100,
    sku: 'AK-LAWN-2PC-9',
    details: [
      'Premium Embroidered Lawn',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ],
    isNew: true,
    colors: ['Red', 'Blue', 'Green'],
    brand: 'Akash Collection'
  },
  {
    id: 'akash-2pc-lawn-10',
    title: '2 Piece - Embroidered Lawn Suit',
    description: 'Component Details (2 Piece):\n• Digital Printed Embroidered Front On Lawn\n• Digital Printed Back On Lawn\n• Digital Printed Sleeves On Lawn\n• Dyed Cotton Pants',
    price: 2750,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: '/lawn-10.jpeg',
    gallery: [
      '/lawn-10.jpeg'
    ],
    sizes: ['Unstitched'],
    stock: 100,
    sku: 'AK-LAWN-2PC-10',
    details: [
      'Premium Embroidered Lawn',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ],
    isNew: true,
    colors: ['Red', 'Blue', 'Green'],
    brand: 'Akash Collection'
  },
  {
    id: 'akash-2pc-lawn-11',
    title: '2 Piece - Embroidered Lawn Suit',
    description: 'Component Details (2 Piece):\n• Digital Printed Embroidered Front On Lawn\n• Digital Printed Back On Lawn\n• Digital Printed Sleeves On Lawn\n• Dyed Cotton Pants',
    price: 2750,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: '/lawn-11.jpeg',
    gallery: [
      '/lawn-11.jpeg'
    ],
    sizes: ['Unstitched'],
    stock: 100,
    sku: 'AK-LAWN-2PC-11',
    details: [
      'Premium Embroidered Lawn',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ],
    isNew: true,
    colors: ['Red', 'Blue', 'Green'],
    brand: 'Akash Collection'
  },
  {
    id: 'akash-2pc-lawn-12',
    title: '2 Piece - Embroidered Lawn Suit',
    description: 'Component Details (2 Piece):\n• Digital Printed Embroidered Front On Lawn\n• Digital Printed Back On Lawn\n• Digital Printed Sleeves On Lawn\n• Dyed Cotton Pants',
    price: 2750,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: '/lawn-12.jpeg',
    gallery: [
      '/lawn-12.jpeg'
    ],
    sizes: ['Unstitched'],
    stock: 100,
    sku: 'AK-LAWN-2PC-12',
    details: [
      'Premium Embroidered Lawn',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ],
    isNew: true,
    colors: ['Red', 'Blue', 'Green'],
    brand: 'Akash Collection'
  },
  {
    id: 'akash-2pc-lawn-13',
    title: '2 Piece - Embroidered Lawn Suit',
    description: 'Component Details (2 Piece):\n• Digital Printed Embroidered Front On Lawn\n• Digital Printed Back On Lawn\n• Digital Printed Sleeves On Lawn\n• Dyed Cotton Pants',
    price: 2750,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: '/lawn-13.jpeg',
    gallery: [
      '/lawn-13.jpeg'
    ],
    sizes: ['Unstitched'],
    stock: 100,
    sku: 'AK-LAWN-2PC-13',
    details: [
      'Premium Embroidered Lawn',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ],
    isNew: true,
    colors: ['Red', 'Blue', 'Green'],
    brand: 'Akash Collection'
  },
  {
    id: 'akash-2pc-lawn-14',
    title: '2 Piece - Embroidered Lawn Suit',
    description: 'Component Details (2 Piece):\n• Digital Printed Embroidered Front On Lawn\n• Digital Printed Back On Lawn\n• Digital Printed Sleeves On Lawn\n• Dyed Cotton Pants',
    price: 2750,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: '/lawn-14.jpeg',
    gallery: [
      '/lawn-14.jpeg'
    ],
    sizes: ['Unstitched'],
    stock: 100,
    sku: 'AK-LAWN-2PC-14',
    details: [
      'Premium Embroidered Lawn',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ],
    isNew: true,
    colors: ['Red', 'Blue', 'Green'],
    brand: 'Akash Collection'
  },
  {
    id: 'akash-2pc-lawn-15',
    title: '2 Piece - Embroidered Lawn Suit',
    description: 'Component Details (2 Piece):\n• Digital Printed Embroidered Front On Lawn\n• Digital Printed Back On Lawn\n• Digital Printed Sleeves On Lawn\n• Dyed Cotton Pants',
    price: 2750,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: '/lawn-15.jpeg',
    gallery: [
      '/lawn-15.jpeg'
    ],
    sizes: ['Unstitched'],
    stock: 100,
    sku: 'AK-LAWN-2PC-15',
    details: [
      'Premium Embroidered Lawn',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ],
    isNew: true,
    colors: ['Red', 'Blue', 'Green'],
    brand: 'Akash Collection'
  },
  {
    id: 'akash-2pc-lawn-16',
    title: '2 Piece - Embroidered Lawn Suit',
    description: 'Component Details (2 Piece):\n• Digital Printed Embroidered Front On Lawn\n• Digital Printed Back On Lawn\n• Digital Printed Sleeves On Lawn\n• Dyed Cotton Pants',
    price: 2750,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: '/lawn-16.jpeg',
    gallery: [
      '/lawn-16.jpeg'
    ],
    sizes: ['Unstitched'],
    stock: 100,
    sku: 'AK-LAWN-2PC-16',
    details: [
      'Premium Embroidered Lawn',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ],
    isNew: true,
    colors: ['Red', 'Blue', 'Green'],
    brand: 'Akash Collection'
  },
  {
    id: 'akash-2pc-lawn-17',
    title: '2 Piece - Embroidered Lawn Suit',
    description: 'Component Details (2 Piece):\n• Digital Printed Embroidered Front On Lawn\n• Digital Printed Back On Lawn\n• Digital Printed Sleeves On Lawn\n• Dyed Cotton Pants',
    price: 2750,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: '/lawn-17.jpeg',
    gallery: [
      '/lawn-17.jpeg'
    ],
    sizes: ['Unstitched'],
    stock: 100,
    sku: 'AK-LAWN-2PC-17',
    details: [
      'Premium Embroidered Lawn',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ],
    isNew: true,
    colors: ['Red', 'Blue', 'Green'],
    brand: 'Akash Collection'
  },
  {
    id: 'akash-2pc-lawn-18',
    title: '2 Piece - Embroidered Lawn Suit',
    description: 'Component Details (2 Piece):\n• Digital Printed Embroidered Front On Lawn\n• Digital Printed Back On Lawn\n• Digital Printed Sleeves On Lawn\n• Dyed Cotton Pants',
    price: 2750,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: '/lawn-18.jpeg',
    gallery: [
      '/lawn-18.jpeg'
    ],
    sizes: ['Unstitched'],
    stock: 100,
    sku: 'AK-LAWN-2PC-18',
    details: [
      'Premium Embroidered Lawn',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ],
    isNew: true,
    colors: ['Red', 'Blue', 'Green'],
    brand: 'Akash Collection'
  },
  {
    id: 'akash-2pc-lawn-19',
    title: '2 Piece - Embroidered Lawn Suit',
    description: 'Component Details (2 Piece):\n• Digital Printed Embroidered Front On Lawn\n• Digital Printed Back On Lawn\n• Digital Printed Sleeves On Lawn\n• Dyed Cotton Pants',
    price: 2750,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: '/lawn-19.jpeg',
    gallery: [
      '/lawn-19.jpeg'
    ],
    sizes: ['Unstitched'],
    stock: 100,
    sku: 'AK-LAWN-2PC-19',
    details: [
      'Premium Embroidered Lawn',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ],
    isNew: true,
    colors: ['Red', 'Blue', 'Green'],
    brand: 'Akash Collection'
  },
  {
    id: 'akash-2pc-lawn-20',
    title: '2 Piece - Embroidered Lawn Suit',
    description: 'Component Details (2 Piece):\n• Digital Printed Embroidered Front On Lawn\n• Digital Printed Back On Lawn\n• Digital Printed Sleeves On Lawn\n• Dyed Cotton Pants',
    price: 2750,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: '/lawn-20.jpeg',
    gallery: [
      '/lawn-20.jpeg'
    ],
    sizes: ['Unstitched'],
    stock: 100,
    sku: 'AK-LAWN-2PC-20',
    details: [
      'Premium Embroidered Lawn',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ],
    isNew: true,
    colors: ['Red', 'Blue', 'Green'],
    brand: 'Akash Collection'
  },
  {
    id: 'akash-2pc-lawn-21',
    title: '2 Piece - Embroidered Lawn Suit',
    description: 'Component Details (2 Piece):\n• Digital Printed Embroidered Front On Lawn\n• Digital Printed Back On Lawn\n• Digital Printed Sleeves On Lawn\n• Dyed Cotton Pants',
    price: 2750,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: '/lawn-21.jpeg',
    gallery: [
      '/lawn-21.jpeg'
    ],
    sizes: ['Unstitched'],
    stock: 100,
    sku: 'AK-LAWN-2PC-21',
    details: [
      'Premium Embroidered Lawn',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ],
    isNew: true,
    colors: ['Red', 'Blue', 'Green'],
    brand: 'Akash Collection'
  },
  {
    id: 'akash-2pc-lawn-22',
    title: '2 Piece - Embroidered Lawn Suit',
    description: 'Component Details (2 Piece):\n• Digital Printed Embroidered Front On Lawn\n• Digital Printed Back On Lawn\n• Digital Printed Sleeves On Lawn\n• Dyed Cotton Pants',
    price: 2750,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: '/lawn-22.jpeg',
    gallery: [
      '/lawn-22.jpeg'
    ],
    sizes: ['Unstitched'],
    stock: 100,
    sku: 'AK-LAWN-2PC-22',
    details: [
      'Premium Embroidered Lawn',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ],
    isNew: true,
    colors: ['Red', 'Blue', 'Green'],
    brand: 'Akash Collection'
  },
  {
    id: 'akash-2pc-lawn-23',
    title: '2 Piece - Embroidered Lawn Suit',
    description: 'Component Details (2 Piece):\n• Digital Printed Embroidered Front On Lawn\n• Digital Printed Back On Lawn\n• Digital Printed Sleeves On Lawn\n• Dyed Cotton Pants',
    price: 2750,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: '/lawn-23.jpeg',
    gallery: [
      '/lawn-23.jpeg'
    ],
    sizes: ['Unstitched'],
    stock: 100,
    sku: 'AK-LAWN-2PC-23',
    details: [
      'Premium Embroidered Lawn',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ],
    isNew: true,
    colors: ['Red', 'Blue', 'Green'],
    brand: 'Akash Collection'
  },
  {
    id: 'akash-2pc-lawn-24',
    title: '2 Piece - Embroidered Lawn Suit',
    description: 'Component Details (2 Piece):\n• Digital Printed Embroidered Front On Lawn\n• Digital Printed Back On Lawn\n• Digital Printed Sleeves On Lawn\n• Dyed Cotton Pants',
    price: 2750,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: '/lawn-24.jpeg',
    gallery: [
      '/lawn-24.jpeg'
    ],
    sizes: ['Unstitched'],
    stock: 100,
    sku: 'AK-LAWN-2PC-24',
    details: [
      'Premium Embroidered Lawn',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ],
    isNew: true,
    colors: ['Red', 'Blue', 'Green'],
    brand: 'Akash Collection'
  },
  {
    id: 'akash-2pc-lawn-25',
    title: '2 Piece - Embroidered Lawn Suit',
    description: 'Component Details (2 Piece):\n• Digital Printed Embroidered Front On Lawn\n• Digital Printed Back On Lawn\n• Digital Printed Sleeves On Lawn\n• Dyed Cotton Pants',
    price: 2750,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: '/lawn-25.jpeg',
    gallery: [
      '/lawn-25.jpeg'
    ],
    sizes: ['Unstitched'],
    stock: 100,
    sku: 'AK-LAWN-2PC-25',
    details: [
      'Premium Embroidered Lawn',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ],
    isNew: true,
    colors: ['Red', 'Blue', 'Green'],
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
