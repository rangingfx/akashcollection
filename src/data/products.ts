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
    description: 'Component Details (3 Piece) Measurement\nDigital Printed Embroidered Front On Lawn 1.15m\nDigital Printed Back On Lawn 1.15m\nDigital Printed Sleeves On Lawn 0.65m\nEmbroidered Border On Organza 01m\nEmbroidered Patti On Organza 1.5m\nEmbroidered Woven Net Dupatta 2.5m\nEmbroidered Pallu For Dupatta On Organza 02m\nDyed Cotton Pants 1.80m',
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
    isNew: true,
    colors: ['Purple', 'Pink', 'Orange', 'Cream', 'Teal', 'Peach', 'Lilac', 'Aqua'],
    brand: 'Akash Collection'
  },
  {
    id: 'zouq-1',
    title: 'Akash Collection Wholesale - Bareeze lawn 2 piece',
    description: 'A stellar stitched and unstitched ensemble featuring premium prints and embroidery, sourced directly to give you the best wholesale prices in Pakistan.',
    price: 2750,
    originalPrice: 3000,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: 'https://zouq.pk/wp-content/uploads/2023/07/103D742C-37DF-40DB-B8D0-D717FB93F504-500x750.jpeg',
    gallery: [
      'https://zouq.pk/wp-content/uploads/2023/07/103D742C-37DF-40DB-B8D0-D717FB93F504-500x750.jpeg'
    ],
    sizes: ['Unstitched', 'S', 'M', 'L'],
    stock: 50,
    sku: 'AK-ZOUQ-1',
    details: [
      'Premium Fabric',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ]
  },
  {
    id: 'zouq-2',
    title: 'Akash Collection Wholesale - Bareeze lawn 2 piece',
    description: 'A stellar stitched and unstitched ensemble featuring premium prints and embroidery, sourced directly to give you the best wholesale prices in Pakistan.',
    price: 2750,
    originalPrice: 3000,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: 'https://zouq.pk/wp-content/uploads/2023/05/55887C05-1912-472B-AE8F-9F0A7EF66F5B-scaled-1-500x750.jpeg',
    gallery: [
      'https://zouq.pk/wp-content/uploads/2023/05/55887C05-1912-472B-AE8F-9F0A7EF66F5B-scaled-1-500x750.jpeg'
    ],
    sizes: ['Unstitched', 'S', 'M', 'L'],
    stock: 50,
    sku: 'AK-ZOUQ-2',
    details: [
      'Premium Fabric',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ]
  },
  {
    id: 'zouq-3',
    title: 'Akash Collection Wholesale - Bareeze lawn 2 piece',
    description: 'A stellar stitched and unstitched ensemble featuring premium prints and embroidery, sourced directly to give you the best wholesale prices in Pakistan.',
    price: 2750,
    originalPrice: 3000,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: 'https://zouq.pk/wp-content/uploads/2024/05/WhatsApp-Image-2024-05-13-at-3.21.32-PM-500x750.jpeg',
    gallery: [
      'https://zouq.pk/wp-content/uploads/2024/05/WhatsApp-Image-2024-05-13-at-3.21.32-PM-500x750.jpeg'
    ],
    sizes: ['Unstitched', 'S', 'M', 'L'],
    stock: 50,
    sku: 'AK-ZOUQ-3',
    details: [
      'Premium Fabric',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ]
  },
  {
    id: 'zouq-4',
    title: 'Akash Collection Wholesale - Lawn 2 piece',
    description: 'A stellar stitched and unstitched ensemble featuring premium prints and embroidery, sourced directly to give you the best wholesale prices in Pakistan.',
    price: 2750,
    originalPrice: 3000,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: 'https://zouq.pk/wp-content/uploads/2023/07/WhatsApp-Image-2023-07-20-at-12.06.48-AM-1-500x750.jpeg',
    gallery: [
      'https://zouq.pk/wp-content/uploads/2023/07/WhatsApp-Image-2023-07-20-at-12.06.48-AM-1-500x750.jpeg'
    ],
    sizes: ['Unstitched', 'S', 'M', 'L'],
    stock: 50,
    sku: 'AK-ZOUQ-4',
    details: [
      'Premium Fabric',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ]
  },
  {
    id: 'zouq-5',
    title: 'Akash Collection Wholesale - Bareeze lawn 2 piece',
    description: 'A stellar stitched and unstitched ensemble featuring premium prints and embroidery, sourced directly to give you the best wholesale prices in Pakistan.',
    price: 2750,
    originalPrice: 3000,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: 'https://zouq.pk/wp-content/uploads/2023/07/CE634416-E3B1-4C77-81A2-DCD6BC92C32F-500x750.jpeg',
    gallery: [
      'https://zouq.pk/wp-content/uploads/2023/07/CE634416-E3B1-4C77-81A2-DCD6BC92C32F-500x750.jpeg'
    ],
    sizes: ['Unstitched', 'S', 'M', 'L'],
    stock: 50,
    sku: 'AK-ZOUQ-5',
    details: [
      'Premium Fabric',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ]
  },
  {
    id: 'zouq-6',
    title: 'Akash Collection Wholesale - Bareeze lawn 2 piece',
    description: 'A stellar stitched and unstitched ensemble featuring premium prints and embroidery, sourced directly to give you the best wholesale prices in Pakistan.',
    price: 2750,
    originalPrice: 3000,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: 'https://zouq.pk/wp-content/uploads/2023/07/WhatsApp-Image-2023-07-20-at-12.07.02-AM-1-500x750.jpeg',
    gallery: [
      'https://zouq.pk/wp-content/uploads/2023/07/WhatsApp-Image-2023-07-20-at-12.07.02-AM-1-500x750.jpeg'
    ],
    sizes: ['Unstitched', 'S', 'M', 'L'],
    stock: 50,
    sku: 'AK-ZOUQ-6',
    details: [
      'Premium Fabric',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ]
  },
  {
    id: 'zouq-7',
    title: 'Akash Collection Wholesale - BAREEZE lawn 2 piece',
    description: 'A stellar stitched and unstitched ensemble featuring premium prints and embroidery, sourced directly to give you the best wholesale prices in Pakistan.',
    price: 2750,
    originalPrice: 3000,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: 'https://zouq.pk/wp-content/uploads/2025/10/Bareeze-Lawn-2-piece-suit-3-500x750.jpeg',
    gallery: [
      'https://zouq.pk/wp-content/uploads/2025/10/Bareeze-Lawn-2-piece-suit-3-500x750.jpeg'
    ],
    sizes: ['Unstitched', 'S', 'M', 'L'],
    stock: 50,
    sku: 'AK-ZOUQ-7',
    details: [
      'Premium Fabric',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ]
  },
  {
    id: 'zouq-8',
    title: 'Akash Collection Wholesale - BAREEZE lawn 2 piece',
    description: 'A stellar stitched and unstitched ensemble featuring premium prints and embroidery, sourced directly to give you the best wholesale prices in Pakistan.',
    price: 2750,
    originalPrice: 3000,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: 'https://zouq.pk/wp-content/uploads/2025/02/WhatsApp-Image-2025-02-24-at-1.21.04-AM-2-500x750.jpeg',
    gallery: [
      'https://zouq.pk/wp-content/uploads/2025/02/WhatsApp-Image-2025-02-24-at-1.21.04-AM-2-500x750.jpeg'
    ],
    sizes: ['Unstitched', 'S', 'M', 'L'],
    stock: 50,
    sku: 'AK-ZOUQ-8',
    details: [
      'Premium Fabric',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ]
  },
  {
    id: 'zouq-9',
    title: 'Akash Collection Wholesale - BAREEZE lawn 2 piece',
    description: 'A stellar stitched and unstitched ensemble featuring premium prints and embroidery, sourced directly to give you the best wholesale prices in Pakistan.',
    price: 2750,
    originalPrice: 3000,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: 'https://zouq.pk/wp-content/uploads/2025/01/WhatsApp-Image-2025-01-12-at-1.44.48-AM-5-500x750.jpeg',
    gallery: [
      'https://zouq.pk/wp-content/uploads/2025/01/WhatsApp-Image-2025-01-12-at-1.44.48-AM-5-500x750.jpeg'
    ],
    sizes: ['Unstitched', 'S', 'M', 'L'],
    stock: 50,
    sku: 'AK-ZOUQ-9',
    details: [
      'Premium Fabric',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ]
  },
  {
    id: 'zouq-10',
    title: 'Akash Collection Wholesale - Bareeze lawn 2 piece',
    description: 'A stellar stitched and unstitched ensemble featuring premium prints and embroidery, sourced directly to give you the best wholesale prices in Pakistan.',
    price: 2750,
    originalPrice: 3000,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: 'https://zouq.pk/wp-content/uploads/2023/07/WhatsApp-Image-2023-07-20-at-12.07.02-AM-500x750.jpeg',
    gallery: [
      'https://zouq.pk/wp-content/uploads/2023/07/WhatsApp-Image-2023-07-20-at-12.07.02-AM-500x750.jpeg'
    ],
    sizes: ['Unstitched', 'S', 'M', 'L'],
    stock: 50,
    sku: 'AK-ZOUQ-10',
    details: [
      'Premium Fabric',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ]
  },
  {
    id: 'zouq-11',
    title: 'Akash Collection Wholesale - Bareeze lawn 2 piece',
    description: 'A stellar stitched and unstitched ensemble featuring premium prints and embroidery, sourced directly to give you the best wholesale prices in Pakistan.',
    price: 2750,
    originalPrice: 3000,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: 'https://zouq.pk/wp-content/uploads/2023/07/WhatsApp-Image-2023-07-10-at-11.40.10-AM-500x750.jpeg',
    gallery: [
      'https://zouq.pk/wp-content/uploads/2023/07/WhatsApp-Image-2023-07-10-at-11.40.10-AM-500x750.jpeg'
    ],
    sizes: ['Unstitched', 'S', 'M', 'L'],
    stock: 50,
    sku: 'AK-ZOUQ-11',
    details: [
      'Premium Fabric',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ]
  },
  {
    id: 'zouq-12',
    title: 'Akash Collection Wholesale - BAREEZE lawn 2 piece',
    description: 'A stellar stitched and unstitched ensemble featuring premium prints and embroidery, sourced directly to give you the best wholesale prices in Pakistan.',
    price: 2750,
    originalPrice: 3000,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: 'https://zouq.pk/wp-content/uploads/2025/01/WhatsApp-Image-2025-01-07-at-11.58.36-PM-1-500x750.jpeg',
    gallery: [
      'https://zouq.pk/wp-content/uploads/2025/01/WhatsApp-Image-2025-01-07-at-11.58.36-PM-1-500x750.jpeg'
    ],
    sizes: ['Unstitched', 'S', 'M', 'L'],
    stock: 50,
    sku: 'AK-ZOUQ-12',
    details: [
      'Premium Fabric',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ]
  },
  {
    id: 'zouq-13',
    title: 'Akash Collection Wholesale - Bareeze lawn 2 piece',
    description: 'A stellar stitched and unstitched ensemble featuring premium prints and embroidery, sourced directly to give you the best wholesale prices in Pakistan.',
    price: 2750,
    originalPrice: 3000,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: 'https://zouq.pk/wp-content/uploads/2023/07/C4CD50AE-1352-4FC5-B4DF-D96FDF26BA0F-500x750.jpeg',
    gallery: [
      'https://zouq.pk/wp-content/uploads/2023/07/C4CD50AE-1352-4FC5-B4DF-D96FDF26BA0F-500x750.jpeg'
    ],
    sizes: ['Unstitched', 'S', 'M', 'L'],
    stock: 50,
    sku: 'AK-ZOUQ-13',
    details: [
      'Premium Fabric',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ]
  },
  {
    id: 'zouq-14',
    title: 'Akash Collection Wholesale - Bareeze lawn 2 piece',
    description: 'A stellar stitched and unstitched ensemble featuring premium prints and embroidery, sourced directly to give you the best wholesale prices in Pakistan.',
    price: 2750,
    originalPrice: 3000,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: 'https://zouq.pk/wp-content/uploads/2023/11/WhatsApp-Image-2023-11-24-at-22.48.51-500x750.jpeg',
    gallery: [
      'https://zouq.pk/wp-content/uploads/2023/11/WhatsApp-Image-2023-11-24-at-22.48.51-500x750.jpeg'
    ],
    sizes: ['Unstitched', 'S', 'M', 'L'],
    stock: 50,
    sku: 'AK-ZOUQ-14',
    details: [
      'Premium Fabric',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ]
  },
  {
    id: 'zouq-15',
    title: 'Akash Collection Wholesale - BAREEZE lawn 2 piece',
    description: 'A stellar stitched and unstitched ensemble featuring premium prints and embroidery, sourced directly to give you the best wholesale prices in Pakistan.',
    price: 2750,
    originalPrice: 3000,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: 'https://zouq.pk/wp-content/uploads/2025/01/WhatsApp-Image-2025-01-12-at-1.44.49-AM-10-500x750.jpeg',
    gallery: [
      'https://zouq.pk/wp-content/uploads/2025/01/WhatsApp-Image-2025-01-12-at-1.44.49-AM-10-500x750.jpeg'
    ],
    sizes: ['Unstitched', 'S', 'M', 'L'],
    stock: 50,
    sku: 'AK-ZOUQ-15',
    details: [
      'Premium Fabric',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ]
  },
  {
    id: 'zouq-16',
    title: 'Akash Collection Wholesale - Bareeze lawn 2 piece',
    description: 'A stellar stitched and unstitched ensemble featuring premium prints and embroidery, sourced directly to give you the best wholesale prices in Pakistan.',
    price: 2750,
    originalPrice: 3000,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: 'https://zouq.pk/wp-content/uploads/2025/05/WhatsApp-Image-2025-05-05-at-1.20.17-PM-2-500x750.jpeg',
    gallery: [
      'https://zouq.pk/wp-content/uploads/2025/05/WhatsApp-Image-2025-05-05-at-1.20.17-PM-2-500x750.jpeg'
    ],
    sizes: ['Unstitched', 'S', 'M', 'L'],
    stock: 50,
    sku: 'AK-ZOUQ-16',
    details: [
      'Premium Fabric',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ]
  },
  {
    id: 'zouq-17',
    title: 'Akash Collection Wholesale - Bareeze lawn 2 piece',
    description: 'A stellar stitched and unstitched ensemble featuring premium prints and embroidery, sourced directly to give you the best wholesale prices in Pakistan.',
    price: 2750,
    originalPrice: 3000,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: 'https://zouq.pk/wp-content/uploads/2023/07/DCE4E4C5-294E-44CD-B6D5-7E6115F0BDA2-scaled-500x750.jpeg',
    gallery: [
      'https://zouq.pk/wp-content/uploads/2023/07/DCE4E4C5-294E-44CD-B6D5-7E6115F0BDA2-scaled-500x750.jpeg'
    ],
    sizes: ['Unstitched', 'S', 'M', 'L'],
    stock: 50,
    sku: 'AK-ZOUQ-17',
    details: [
      'Premium Fabric',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ]
  },
  {
    id: 'zouq-18',
    title: 'Akash Collection Wholesale - BAREEZE lawn 2 piece',
    description: 'A stellar stitched and unstitched ensemble featuring premium prints and embroidery, sourced directly to give you the best wholesale prices in Pakistan.',
    price: 2750,
    originalPrice: 3000,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: 'https://zouq.pk/wp-content/uploads/2025/10/Bareeze-Lawn-2-piece-suit-2-500x750.jpeg',
    gallery: [
      'https://zouq.pk/wp-content/uploads/2025/10/Bareeze-Lawn-2-piece-suit-2-500x750.jpeg'
    ],
    sizes: ['Unstitched', 'S', 'M', 'L'],
    stock: 50,
    sku: 'AK-ZOUQ-18',
    details: [
      'Premium Fabric',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ]
  },
  {
    id: 'zouq-19',
    title: 'Akash Collection Wholesale - Bareeze lawn 2 piece',
    description: 'A stellar stitched and unstitched ensemble featuring premium prints and embroidery, sourced directly to give you the best wholesale prices in Pakistan.',
    price: 2750,
    originalPrice: 3000,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: 'https://zouq.pk/wp-content/uploads/2025/01/WhatsApp-Image-2025-01-03-at-2.05.12-AM-500x750.jpeg',
    gallery: [
      'https://zouq.pk/wp-content/uploads/2025/01/WhatsApp-Image-2025-01-03-at-2.05.12-AM-500x750.jpeg'
    ],
    sizes: ['Unstitched', 'S', 'M', 'L'],
    stock: 50,
    sku: 'AK-ZOUQ-19',
    details: [
      'Premium Fabric',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ]
  },
  {
    id: 'zouq-20',
    title: 'Akash Collection Wholesale - Lawn 2 piece',
    description: 'A stellar stitched and unstitched ensemble featuring premium prints and embroidery, sourced directly to give you the best wholesale prices in Pakistan.',
    price: 2750,
    originalPrice: 3000,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '2 Piece',
    image: 'https://zouq.pk/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-01-at-2.46.12-PM-1-500x750.jpeg',
    gallery: [
      'https://zouq.pk/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-01-at-2.46.12-PM-1-500x750.jpeg'
    ],
    sizes: ['Unstitched', 'S', 'M', 'L'],
    stock: 50,
    sku: 'AK-ZOUQ-20',
    details: [
      'Premium Fabric',
      'Original Colors',
      'Wholesale bulk pricing',
      'Fast delivery across Pakistan'
    ]
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
