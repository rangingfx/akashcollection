/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Review } from '../types';
import imgBlue from '../assets/images/bareeze_lawn_blue_1782304418726.jpg';
import imgPink from '../assets/images/bareeze_lawn_pink_1782304438185.jpg';
import imgRust from '../assets/images/bareeze_lawn_rust_1782304454309.jpg';
import imgBlack from '../assets/images/bareeze_lawn_black_1782304473285.jpg';
import imgPlum from '../assets/images/bareeze_lawn_plum_1782304488588.jpg';
import imgModel from '../assets/images/bareeze_lawn_model_1782304501635.jpg';

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
    id: 'bareeze-summer-1',
    title: 'Bareeze Lawn 3 Piece Suit Summer Collection - Light Blue',
    description: 'Elegant light blue Pakistani unstitched lawn 3 piece suit featuring delicate white floral embroidery. Premium quality summer collection by Akash Collection.',
    price: 3500,
    originalPrice: 4500,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '3 Piece',
    image: imgBlue,
    gallery: [imgBlue],
    sizes: ['Unstitched'],
    stock: 50,
    sku: 'AK-BRZ-BLU-1',
    details: [
      'Pure Summer Lawn Fabric',
      'Intricate White Floral Embroidery',
      'Includes Shirt, Trouser, and Dupatta',
      'Fast delivery across Pakistan'
    ]
  },
  {
    id: 'bareeze-summer-2',
    title: 'Bareeze Lawn 3 Piece Suit Summer Collection - Pastel Pink',
    description: 'Beautiful pastel pink Pakistani unstitched lawn 3 piece suit featuring exquisite white floral embroidery. Perfect for the summer season.',
    price: 3500,
    originalPrice: 4500,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '3 Piece',
    image: imgPink,
    gallery: [imgPink],
    sizes: ['Unstitched'],
    stock: 45,
    sku: 'AK-BRZ-PNK-2',
    details: [
      'Pure Summer Lawn Fabric',
      'Exquisite White Floral Embroidery',
      'Includes Shirt, Trouser, and Dupatta',
      'Fast delivery across Pakistan'
    ]
  },
  {
    id: 'bareeze-summer-3',
    title: 'Bareeze Lawn 3 Piece Suit Summer Collection - Rust Orange',
    description: 'Vibrant rust orange Pakistani unstitched lawn 3 piece suit featuring geometric white embroidery. Premium summer collection.',
    price: 3500,
    originalPrice: 4500,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '3 Piece',
    image: imgRust,
    gallery: [imgRust],
    sizes: ['Unstitched'],
    stock: 30,
    sku: 'AK-BRZ-RST-3',
    details: [
      'Pure Summer Lawn Fabric',
      'Geometric White Embroidery',
      'Includes Shirt, Trouser, and Dupatta',
      'Fast delivery across Pakistan'
    ]
  },
  {
    id: 'bareeze-summer-4',
    title: 'Bareeze Lawn 3 Piece Suit Summer Collection - Midnight Black',
    description: 'Classic midnight black Pakistani unstitched lawn 3 piece suit featuring colorful floral embroidery. Elegance for summer evenings.',
    price: 3500,
    originalPrice: 4500,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '3 Piece',
    image: imgBlack,
    gallery: [imgBlack],
    sizes: ['Unstitched'],
    stock: 25,
    sku: 'AK-BRZ-BLK-4',
    details: [
      'Pure Summer Lawn Fabric',
      'Colorful Floral Embroidery',
      'Includes Shirt, Trouser, and Dupatta',
      'Fast delivery across Pakistan'
    ]
  },
  {
    id: 'bareeze-summer-5',
    title: 'Bareeze Lawn 3 Piece Suit Summer Collection - Plum Purple',
    description: 'Rich plum purple Pakistani unstitched lawn 3 piece suit featuring large white floral embroidery patterns.',
    price: 3500,
    originalPrice: 4500,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '3 Piece',
    image: imgPlum,
    gallery: [imgPlum],
    sizes: ['Unstitched'],
    stock: 40,
    sku: 'AK-BRZ-PLM-5',
    details: [
      'Pure Summer Lawn Fabric',
      'Large White Floral Embroidery',
      'Includes Shirt, Trouser, and Dupatta',
      'Fast delivery across Pakistan'
    ]
  },
  {
    id: 'bareeze-summer-6',
    title: 'Bareeze Lawn 3 Piece Suit Summer Collection - Exclusive Model Edit',
    description: 'Exclusive designer summer lawn 3 piece suit in pastel tones. Stay cool and elegant with this premium Akash Collection exclusive.',
    price: 3500,
    originalPrice: 4500,
    fabric: 'Lawn',
    type: 'unstitched',
    pieces: '3 Piece',
    image: imgModel,
    gallery: [imgModel],
    sizes: ['Unstitched'],
    stock: 20,
    sku: 'AK-BRZ-MDL-6',
    details: [
      'Designer Summer Lawn Fabric',
      'Pastel Floral Prints',
      'Includes Shirt, Trouser, and Dupatta',
      'Fast delivery across Pakistan'
    ]
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
