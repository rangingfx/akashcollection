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
    title: 'Nishat Bagh - Premium Embroidered Lawn 3PC',
    description: 'An exquisite three-piece unstitched lawn ensemble featuring a fully embroidered front on premium organic lawn, dynamic printed chiffon dupatta, and dyed cambric trousers. This gorgeous design blends traditional floral block-prints with a modern pastel palette.',
    price: 4890,
    originalPrice: 5990,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '3 Piece',
    image: 'https://images.unsplash.com/photo-1608748010899-18f300247112?q=80&w=600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1608748010899-18f300247112?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['Unstitched'],
    stock: 12,
    sku: 'AK-UNST-26-01',
    details: [
      'Embroidered Lawn Front (1.25 Mtr)',
      'Digital Printed Lawn Back & Sleeves (2.0 Mtr)',
      'Digital Printed Silk-Chiffon Dupatta (2.5 Mtr)',
      'Dyed Cambric Trousers (2.5 Mtr)',
      'Intricate embroidered lace border patch for sleeves and trousers'
    ]
  },
  {
    id: 'unst-002',
    title: 'Zarkhaash - Amber Jacquard 2PC',
    description: 'A deeply pigmented mustard amber unstitched outfit woven with fine metallic threads in a classic Mughal geometric pattern. Accented with heavy borders and fine cambric trousers for a majestic afternoon or evening statement.',
    price: 3690,
    fabric: 'Jacquard',
    type: 'unstitched',
    pieces: '2 Piece',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['Unstitched'],
    stock: 15,
    sku: 'AK-UNST-26-02',
    details: [
      'Woven Jacquard Front & Back (2.5 Mtr)',
      'Woven Jacquard Sleeves (0.7 Mtr)',
      'Dyed Cambric Cotton Trousers (2.5 Mtr)',
      'Gilded tilla border work'
    ]
  },
  {
    id: 'unst-003',
    title: 'Mehr-un-Nisa - Crimson Chiffon 3PC',
    description: 'An elegant vintage crimson luxury set with detailed chain-stitch borders, dynamic damask prints, and a majestic chiffon dupatta with gold block print edges.',
    price: 5290,
    fabric: 'Chiffon',
    type: 'unstitched',
    pieces: '3 Piece',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['Unstitched'],
    stock: 8,
    sku: 'AK-UNST-26-03',
    details: [
      'Printed Lawn Front (1.25 Mtr)',
      'Printed Lawn Back & Sleeves (1.75 Mtr)',
      'Embroidered Neckline & Border Patch (1.5 Mtr)',
      'Digital Printed Pure Chiffon Dupatta (2.5 Mtr)',
      'Dyed Cotton Satin Shalwar (2.5 Mtr)'
    ]
  },
  {
    id: 'unst-004',
    title: 'Bahaar - Turquoise Cambric 2PC',
    description: 'Fresh minty sky-blue cambric suit printed with pastel watercolor block designs, ideal for hot summer days demanding lightweight resilience.',
    price: 2990,
    originalPrice: 3490,
    fabric: 'Cambric',
    type: 'unstitched',
    pieces: '2 Piece',
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['Unstitched'],
    stock: 22,
    sku: 'AK-UNST-26-04',
    details: [
      'Printed Fine Cambric Shirt (3.0 Mtr)',
      'Dyed Cambric Trouser (2.5 Mtr)',
      'Breathable, premium soft feel'
    ]
  },

  // --- Section 2: Ready to Wear ---
  {
    id: 'rtw-001',
    title: 'Noor Jahan - Embroidered Cotton Kurti',
    description: 'A classic rich ivory ready-to-wear kurta tailored to perfection. Featuring intricate Kashmiri-style threadwork on the neckline and sleeves, completed with minimalist side slit buttons. Elegance in every stitch.',
    price: 3950,
    fabric: 'Cotton',
    type: 'ready-to-wear',
    pieces: '1 Piece',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1561414927-6d86591d0c4f?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 18,
    sku: 'AK-RTW-26-01',
    details: [
      'Tailored Straight-Cut Kameez Silhouette',
      'Hand-inspired anchor thread embroidery on neckline',
      'Premium 100% Breathable Cotton Slub',
      'Button enclosures on cuffs',
      'Total Length: 39 inches'
    ]
  },
  {
    id: 'rtw-002',
    title: 'Emerald Luxe - Printed Silk Co-ord Set',
    description: 'A high-impact matching monochrome co-ord set with emerald green and cream mosaic print. Comprises a relaxed-fit boxy shirt and straight-leg matching trousers. Inspired by premium western-fusion silhouettes.',
    price: 4990,
    originalPrice: 5850,
    fabric: 'Silk',
    type: 'ready-to-wear',
    pieces: '2 Piece',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['S', 'M', 'L'],
    stock: 9,
    sku: 'AK-RTW-26-02',
    details: [
      'Premium Satin Silk Fabric with lustrous sheen',
      'V-Neck relaxed-cut collar',
      'Straight pull-on pants with comfortable elastic waist',
      'Modern digital geometric Pakistani print design'
    ]
  },
  {
    id: 'rtw-003',
    title: 'Darya - Cobalt Blue Cambric Kameez',
    description: 'A deep oceanic cobalt blue traditional shirt with block printed borders and subtle embroidery details on the sleeves. Perfect everyday wear.',
    price: 2490,
    fabric: 'Cambric',
    type: 'ready-to-wear',
    pieces: '1 Piece',
    image: 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?q=80&w=600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 25,
    sku: 'AK-RTW-26-03',
    details: [
      'Pure Cotton Cambric 1 Piece Kurta',
      'Boat neck details',
      'Block printed motifs on front hem',
      'Rich deep color saturation guaranteed'
    ]
  },
  {
    id: 'rtw-004',
    title: 'Shama - Peach Dream Printed 2PC',
    description: 'A beautiful peach-colored matching ensemble with a lovely digital leaf print, regular fit trouser & shirt, crafted in soft linen cotton.',
    price: 3490,
    fabric: 'Cotton',
    type: 'ready-to-wear',
    pieces: '2 Piece',
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 14,
    sku: 'AK-RTW-26-04',
    details: [
      'Full Sleeve Printed Kameez',
      'Matching printed cigarette pants',
      'Pre-washed and shrink-resistant'
    ]
  },

  // --- Section 3: Festive Luxury ---
  {
    id: 'fest-001',
    title: 'Aira - Lilac Pearl Silk-Organza 3PC',
    description: 'Our crown jewel festive product. Designed on an ethereal lilac base of heavy pure silk organza, styled with delicate silver zari and white pearl work on the panels, matching fine raw-silk jamawar trousers, and an airy embroidered organza dupatta with scalloped borders.',
    price: 11990,
    fabric: 'Organza',
    type: 'festive',
    pieces: '3 Piece',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['S', 'M', 'L'],
    stock: 5,
    sku: 'AK-FEST-26-01',
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
    title: 'Gul-e-Zar - Pure Gold Silk Jamawar',
    description: 'A glowing gold silk-jacquard ensemble showcasing deep heritage gold-thread tilla work and traditional gota-patti edges. Perfect for festive dholkis and weddings.',
    price: 9890,
    fabric: 'Silk',
    type: 'festive',
    pieces: '3 Piece',
    image: 'https://images.unsplash.com/photo-1572804013217-10114fcf5723?q=80&w=600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1572804013217-10114fcf5723?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 6,
    sku: 'AK-FEST-26-02',
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
    title: 'Meherbaano - Peach Organza Anarkali',
    description: 'An elegant floor-length peach-colored luxury organza dress featuring continuous gold tilla embroidery and a fully embroidered dupatta designed to turn heads.',
    price: 13500,
    fabric: 'Organza',
    type: 'festive',
    pieces: '3 Piece',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['S', 'M', 'L'],
    stock: 4,
    sku: 'AK-FEST-26-03',
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
    title: 'Khizer - Rust Linen 3PC (SALE)',
    description: 'A beautiful warm rust-orange unstitched linen fabric. Embroidered with thick winter motifs on the sleeves, accompanied by a matching wool-blend shawl.',
    price: 3450,
    originalPrice: 4990,
    fabric: 'Cambric',
    type: 'sale',
    pieces: '3 Piece',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['Unstitched'],
    stock: 30,
    sku: 'AK-SALE-26-01',
    details: [
      'Embroidered Slub Linen Shirt Front (1.25 Mtr)',
      'Dyed Linen Sleeves and Back (1.75 Mtr)',
      'Printed Cozy Shawl (2.5 Mtr)',
      'Dyed Warm Linen Trouser (2.5 Mtr)'
    ]
  },
  {
    id: 'sale-002',
    title: 'Saba - Printed Cambric Kurta (SALE)',
    description: 'A light, breathable everyday sky-blue camisole style cambric kurta with an attractive, fresh daisy print design.',
    price: 1850,
    originalPrice: 2800,
    fabric: 'Cambric',
    type: 'sale',
    pieces: '1 Piece',
    image: 'https://images.unsplash.com/photo-1561414927-6d86591d0c4f?q=80&w=600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1561414927-6d86591d0c4f?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 45,
    sku: 'AK-SALE-26-02',
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
