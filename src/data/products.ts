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
  // --- Section 1: Unstitched ---
  {
    id: 'unst-001',
    title: 'Akash Collection - Rang-e-Bahaar Premium Lawn 3PC',
    description: 'An exquisite three-piece unstitched lawn ensemble inspired by the finest aesthetic of Zouq. Featuring a fully embroidered premium quality organic lawn front, dynamic printed chiffon dupatta, and dyed cambric trousers. This gorgeous design blends traditional floral block-prints with a modern pastel palette.',
    price: 3890,
    originalPrice: 4995,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '3 Piece',
    image: 'https://images.unsplash.com/photo-1608748010899-18f300247112?q=80&w=600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1608748010899-18f300247112?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['Unstitched'],
    stock: 25,
    sku: 'AK-ZOUQ-UNST-26-01',
    details: [
      'Embroidered Luxury Lawn Front (1.25 Mtr)',
      'Digital Printed Lawn Back & Sleeves (2.0 Mtr)',
      'Digital Printed Silk-Chiffon Dupatta (2.5 Mtr)',
      'Dyed Cambric Trousers (2.5 Mtr)',
      'Intricate embroidered lace border patch for sleeves and trousers'
    ]
  },
  {
    id: 'unst-002',
    title: 'Akash Collection - Mehr Luxury Festive Lawn 3PC',
    description: 'A deeply pigmented luxury lawn suit inspired by vintage royal designs. Embellished with fine thread tilla work on the collar neck patch, paired with gold block printed fancy chiffon dupatta and dyed cotton trousers.',
    price: 4290,
    originalPrice: 5495,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '3 Piece',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['Unstitched'],
    stock: 18,
    sku: 'AK-ZOUQ-UNST-26-02',
    details: [
      'Heavy Embroidered Lawn Front (1.25 Mtr)',
      'Dyed Lawn Back & Sleeves (1.5 Mtr)',
      'Silk Chiffon Gold Print Dupatta (2.5 Mtr)',
      'Dyed Cambric Cotton Trousers (2.5 Mtr)',
      'Exquisite neckline lace patch border'
    ]
  },
  {
    id: 'unst-003',
    title: 'Akash Collection - Nazneen Purple Chikankari 3PC',
    description: 'An elegant vintage crimson luxury set with detailed chain-stitch borders, dynamic damask prints, and a majestic chiffon dupatta with gold block print edges.',
    price: 6890,
    originalPrice: 8500,
    fabric: 'Chiffon',
    type: 'unstitched',
    pieces: '3 Piece',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['Unstitched'],
    stock: 15,
    sku: 'AK-ZOUQ-UNST-26-03',
    details: [
      'Embroidered Chikankari Lawn Front Panel (1.25 Mtr)',
      'Printed Linen Back & Sleeves (1.75 Mtr)',
      'Heavy Embroidered Border Lace for Daman (1.5 Mtr)',
      'Pure digital printed Chiffon Dupatta (2.5 Mtr)',
      'Dyed Cotton Satin Trousers (2.5 Mtr)'
    ]
  },
  {
    id: 'unst-004',
    title: 'Akash Collection - Zeenat Pastel Blue Lawn 3PC',
    description: 'Fresh minty sky-blue cambric suit printed with pastel watercolor block designs, ideal for hot summer days demanding lightweight resilience.',
    price: 3590,
    originalPrice: 4500,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '3 Piece',
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['Unstitched'],
    stock: 32,
    sku: 'AK-ZOUQ-UNST-26-04',
    details: [
      'Printed Fine Lawn Shirt (3.0 Mtr)',
      'Pure Chiffon Floral Dupatta (2.5 Mtr)',
      'Dyed Cambric Trouser (2.5 Mtr)',
      'Breathable, premium soft feel'
    ]
  },
  {
    id: 'unst-005',
    title: 'Akash Collection - Zarkhaash Amber Jacquard 2PC',
    description: 'A deeply pigmented mustard amber unstitched outfit woven with fine metallic threads in a classic Mughal geometric pattern. Accented with heavy borders and fine cambric trousers for a majestic afternoon or evening statement.',
    price: 3290,
    fabric: 'Jacquard',
    type: 'unstitched',
    pieces: '2 Piece',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['Unstitched'],
    stock: 20,
    sku: 'AK-ZOUQ-UNST-26-05',
    details: [
      'Woven Jacquard Front & Back (2.5 Mtr)',
      'Woven Jacquard Sleeves (0.7 Mtr)',
      'Dyed Cambric Cotton Trousers (2.5 Mtr)',
      'Gilded tilla border work'
    ]
  },

  // --- Section 2: Ready to Wear ---
  {
    id: 'rtw-001',
    title: 'Akash Collection - Flora Fusion Printed Linen 2PC',
    description: 'A stellar stitched co-ord. Composed of a beautiful printed linen boxy straight-cut shirt with intricate floral motifs and matching straight-leg trousers, tailored for daily convenience.',
    price: 2995,
    fabric: 'Cotton',
    type: 'ready-to-wear',
    pieces: '2 Piece',
    image: 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?q=80&w=600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 22,
    sku: 'AK-ZOUQ-RTW-26-01',
    details: [
      'Tailored Straight-Cut Stitched Tunic',
      'Matching dynamic cambric/linen trousers',
      'Breathable, pre-shrunk premium weave',
      'Length: 38 inches'
    ]
  },
  {
    id: 'rtw-002',
    title: 'Akash Collection - Ivory Bloom Embroidered Cotton Kurti',
    description: 'A classic rich ivory ready-to-wear kurta tailored to perfection. Featuring intricate Kashmiri-style threadwork on the neckline and sleeves, completed with minimalist side slit buttons. Elegance in every stitch.',
    price: 2450,
    fabric: 'Cotton',
    type: 'ready-to-wear',
    pieces: '1 Piece',
    image: 'https://images.unsplash.com/photo-1561414927-6d86591d0c4f?q=80&w=600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1561414927-6d86591d0c4f?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 28,
    sku: 'AK-ZOUQ-RTW-26-02',
    details: [
      'Premium Slub Cotton Single Kurta',
      'Hand-inspired anchor thread embroidery on neckline',
      'Pre-washed block styling elements',
      'Total Length: 39 inches'
    ]
  },
  {
    id: 'rtw-003',
    title: 'Akash Collection - Emerald Luxe Printed Silk Co-ord',
    description: 'A high-impact matching monochrome co-ord set with emerald green and cream mosaic print. Comprises a relaxed-fit boxy shirt and straight-leg matching trousers. Inspired by premium western-fusion silhouettes.',
    price: 4250,
    originalPrice: 5200,
    fabric: 'Silk',
    type: 'ready-to-wear',
    pieces: '2 Piece',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['S', 'M', 'L'],
    stock: 15,
    sku: 'AK-ZOUQ-RTW-26-03',
    details: [
      'Premium Satin Silk Fabric with lustrous sheen',
      'V-Neck relaxed-cut collar',
      'Straight pull-on pants with comfortable elastic waist',
      'Modern digital geometric print design'
    ]
  },
  {
    id: 'rtw-004',
    title: 'Akash Collection - Sapphire Elegance Silk Co-ord',
    description: 'A royal blue premium ready-to-wear co-ord set highlighting modern geometric layout, tailored standard cuffs and premium drop shoulder silhouette.',
    price: 4590,
    originalPrice: 5800,
    fabric: 'Silk',
    type: 'ready-to-wear',
    pieces: '2 Piece',
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 14,
    sku: 'AK-ZOUQ-RTW-26-04',
    details: [
      'Lustrous Korean Silk fabric weave',
      'Loose formal shirt with dynamic layout',
      'Includes matching silk straight trousers'
    ]
  },

  // --- Section 3: Festive Luxury ---
  {
    id: 'fest-001',
    title: 'Akash Collection - Aira Lilac Pearl Silk-Organza 3PC',
    description: 'Our crown jewel festive product. Designed on an ethereal lilac base of heavy pure silk organza, styled with delicate silver zari and white pearl work on the panels, matching fine raw-silk jamawar trousers, and an airy embroidered organza dupatta with scalloped borders.',
    price: 9990,
    originalPrice: 12500,
    fabric: 'Organza',
    type: 'festive',
    pieces: '3 Piece',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['S', 'M', 'L'],
    stock: 8,
    sku: 'AK-ZOUQ-FEST-26-01',
    details: [
      'Embellished Organza Front Body, Panels & Base (3.2 Mtr)',
      'Contrast Premium Jamawar Silk Borders',
      'Embroidered Organza Dupatta with Scalloped Lace (2.5 Mtr)',
      'Premium Dyed Raw-Silk Lining Inner (2.5 Mtr)',
      'Dyed Raw-Silk Trousers (2.5 Mtr)'
    ]
  },
  {
    id: 'fest-002',
    title: 'Akash Collection - Gul-e-Zar Heritage Gold Jamawar',
    description: 'A glowing gold silk-jacquard ensemble showcasing deep heritage gold-thread tilla work and traditional gota-patti edges. Perfect for festive dholkis and weddings.',
    price: 8590,
    fabric: 'Silk',
    type: 'festive',
    pieces: '3 Piece',
    image: 'https://images.unsplash.com/photo-1572804013217-10114fcf5723?q=80&w=600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1572804013217-10114fcf5723?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 11,
    sku: 'AK-ZOUQ-FEST-26-02',
    details: [
      'Woven Jamawar Silk Shirt (3.0 Mtr)',
      'Brocade gold borders for hems',
      'Premium embroidered silk chiffon dupatta (2.5 Mtr)',
      'Gota patti neck trim pieces',
      'Dyed Satin Silk Trousers (2.5 Mtr)'
    ]
  },
  {
    id: 'fest-003',
    title: 'Akash Collection - Afsana Crimson Embroidered Chiffon 3PC',
    description: 'A royal crimson chiffon dress intricately decorated with heavy sequins and silk-threaded floral bails, including rich organza daman borders and raw-silk trousers.',
    price: 9290,
    originalPrice: 11500,
    fabric: 'Chiffon',
    type: 'festive',
    pieces: '3 Piece',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['S', 'M', 'L'],
    stock: 9,
    sku: 'AK-ZOUQ-FEST-26-03',
    details: [
      'Sequinned Chiffon Front panel styling',
      'Dyed plain chiffon back panel',
      'Embroidered border cuffs with satin tape patches',
      'Includes premium crepe lining and crepe trousers'
    ]
  },
  {
    id: 'fest-004',
    title: 'Akash Collection - Meherbaano Peach Organza Anarkali',
    description: 'An elegant floor-length peach-colored luxury organza dress featuring continuous gold tilla embroidery and a fully embroidered dupatta designed to turn heads.',
    price: 11990,
    fabric: 'Organza',
    type: 'festive',
    pieces: '3 Piece',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['S', 'M', 'L'],
    stock: 6,
    sku: 'AK-ZOUQ-FEST-26-04',
    details: [
      'Embroidered Organza Panels (12 panels for heavy flare)',
      'Organza embroidered sleeves and back',
      'Net embroidered matching dupatta with gold piping',
      'Viscose slip and matching silk trousers'
    ]
  },

  // --- Section 4: Sale ---
  {
    id: 'sale-001',
    title: 'Akash Collection - Gul-Mohar Warm Slub Linen 3PC (SALE)',
    description: 'A beautiful warm rust-orange unstitched linen fabric. Embroidered with thick winter motifs on the sleeves, accompanied by a matching wool-blend shawl.',
    price: 2790,
    originalPrice: 3990,
    fabric: 'Cambric',
    type: 'sale',
    pieces: '3 Piece',
    image: 'https://images.unsplash.com/photo-1608748010899-18f300247112?q=80&w=600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1608748010899-18f300247112?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['Unstitched'],
    stock: 35,
    sku: 'AK-ZOUQ-SALE-26-01',
    details: [
      'Embroidered Slub Linen Shirt Front (1.25 Mtr)',
      'Dyed Linen Sleeves and Back (1.75 Mtr)',
      'Printed Cozy Shawl (2.5 Mtr)',
      'Dyed Warm Linen Trouser (2.5 Mtr)'
    ]
  },
  {
    id: 'sale-002',
    title: 'Akash Collection - Printed Cambric Daisy Kurta (SALE)',
    description: 'A light, breathable everyday sky-blue camisole style cambric kurta with an attractive, fresh daisy print design.',
    price: 1490,
    originalPrice: 2500,
    fabric: 'Cambric',
    type: 'sale',
    pieces: '1 Piece',
    image: 'https://images.unsplash.com/photo-1561414927-6d86591d0c4f?q=80&w=600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1561414927-6d86591d0c4f?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 50,
    sku: 'AK-ZOUQ-SALE-26-02',
    details: [
      'Printed Cotton Cambric Kurti (1 Piece)',
      'Round neck styling',
      'Comfort-fit cuffs',
      'Azo-free eco safe dyes used'
    ]
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    customerName: 'Ayesha Khan',
    rating: 5,
    comment: 'SubhanAllah! The fabric quality of the Lilac Organza 3pc is out of this world. Delivery was fast in Lahore, neatly packed. Highly recommend Akash Collection.',
    date: 'June 18, 2026',
    verified: true
  },
  {
    id: 'rev-02',
    customerName: 'Fatima Jamil',
    rating: 5,
    comment: 'Beautiful collection! The Nishat Bagh unstitched suit is exactly as displayed. The embroidery is very neat and complete with border patches. Will buy again.',
    date: 'June 12, 2026',
    verified: true
  },
  {
    id: 'rev-03',
    customerName: 'Zainab Bibi',
    rating: 4,
    comment: 'The ready-to-wear Kurti has beautiful stitching but I notice XL is a bit tighter around shoulders than Ideas brand, so do check the size guide. High quality cloth though!',
    date: 'May 28, 2026',
    verified: true
  },
  {
    id: 'rev-04',
    customerName: 'Maryam S.',
    rating: 5,
    comment: 'Extremely good Cash on Delivery service in Karachi. The Amber Jacquard looks very rich, perfect for an evening function. Stitching is simple and beautiful.',
    date: 'May 15, 2026',
    verified: true
  }
];
