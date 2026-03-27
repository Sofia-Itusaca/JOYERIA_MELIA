import { Product, User, Order, StoreInfo } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Anillo Elegante Solitario',
    description: 'Hermoso anillo solitario con acabado premium, perfecto para ocasiones especiales. Diseño minimalista y elegante que destaca por su simplicidad.',
    price: 2499,
    category: 'rings',
    materials: [
      {
        type: 'gold',
        images: [
          'https://images.unsplash.com/photo-1758995116142-c626a962a682?w=800',
          'https://images.unsplash.com/photo-1758995116142-c626a962a682?w=800',
          'https://images.unsplash.com/photo-1758995116142-c626a962a682?w=800'
        ]
      },
      {
        type: 'silver',
        images: [
          'https://images.unsplash.com/photo-1633934542430-0905ccb5f050?w=800',
          'https://images.unsplash.com/photo-1633934542430-0905ccb5f050?w=800',
          'https://images.unsplash.com/photo-1633934542430-0905ccb5f050?w=800'
        ]
      }
    ],
    sizes: ['5', '6', '7', '8', '9', '10'],
    stock: 25,
    active: true,
    soldCount: 143,
    reviews: [],
    targetGender: 'ella'
  },
  {
    id: '2',
    name: 'Collar Perlas Clásico',
    description: 'Collar de perlas elegante con cierre de acero inoxidable. Diseño atemporal que complementa cualquier outfit elegante.',
    price: 3299,
    category: 'necklaces',
    materials: [
      {
        type: 'silver',
        images: [
          'https://images.unsplash.com/photo-1676329945867-01c9975aa9d1?w=800',
          'https://images.unsplash.com/photo-1772698262286-844f71d1991b?w=800',
          'https://images.unsplash.com/photo-1676329945867-01c9975aa9d1?w=800'
        ]
      }
    ],
    lengths: [40, 45, 50],
    stock: 18,
    active: true,
    soldCount: 87,
    reviews: [],
    targetGender: 'ella'
  },
  {
    id: '3',
    name: 'Pulsera Diamantes Premium',
    description: 'Pulsera de acero inoxidable con detalles brillantes. Acabado premium y resistente al agua. Perfecta para uso diario.',
    price: 1899,
    category: 'bracelets',
    materials: [
      {
        type: 'stainless-steel',
        images: [
          'https://images.unsplash.com/photo-1763029513623-37d488cb97b1?w=800',
          'https://images.unsplash.com/photo-1744472457504-f99a96ecbd3e?w=800',
          'https://images.unsplash.com/photo-1763029513623-37d488cb97b1?w=800'
        ]
      }
    ],
    stock: 32,
    active: true,
    soldCount: 201,
    reviews: [],
    targetGender: 'ella'
  },
  {
    id: '4',
    name: 'Aretes Gota Elegantes',
    description: 'Aretes tipo gota con acabado dorado. Ligeros y cómodos para uso prolongado. Diseño sofisticado y moderno.',
    price: 1599,
    category: 'earrings',
    materials: [
      {
        type: 'gold',
        images: [
          'https://images.unsplash.com/photo-1629224316810-9d8805b95e76?w=800',
          'https://images.unsplash.com/photo-1769078595478-5f756986b818?w=800',
          'https://images.unsplash.com/photo-1629224316810-9d8805b95e76?w=800'
        ]
      },
      {
        type: 'rose-gold',
        images: [
          'https://images.unsplash.com/photo-1633934542430-0905ccb5f050?w=800',
          'https://images.unsplash.com/photo-1633934542430-0905ccb5f050?w=800',
          'https://images.unsplash.com/photo-1633934542430-0905ccb5f050?w=800'
        ]
      }
    ],
    stock: 45,
    active: true,
    soldCount: 156,
    reviews: [],
    targetGender: 'ella'
  },
  {
    id: '5',
    name: 'Reloj Clásico Premium',
    description: 'Reloj de acero inoxidable con movimiento de precisión. Diseño elegante y minimalista. Resistente al agua hasta 50m.',
    price: 4999,
    category: 'watches',
    materials: [
      {
        type: 'stainless-steel',
        images: [
          'https://images.unsplash.com/photo-1723328254549-24bb3deb4a83?w=800',
          'https://images.unsplash.com/photo-1723328254549-24bb3deb4a83?w=800',
          'https://images.unsplash.com/photo-1723328254549-24bb3deb4a83?w=800'
        ]
      }
    ],
    stock: 12,
    active: true,
    soldCount: 64,
    reviews: [],
    targetGender: 'unisex'
  },
  {
    id: '6',
    name: 'Cadena Plata Para Él',
    description: 'Cadena masculina de plata 925 con acabado mate. Diseño robusto y elegante. Ideal para hombre moderno.',
    price: 2799,
    category: 'necklaces',
    materials: [
      {
        type: 'silver',
        images: [
          'https://images.unsplash.com/photo-1729290252735-ef9824782fcd?w=800',
          'https://images.unsplash.com/photo-1729290252735-ef9824782fcd?w=800',
          'https://images.unsplash.com/photo-1729290252735-ef9824782fcd?w=800'
        ]
      }
    ],
    lengths: [50, 55, 60],
    stock: 22,
    active: true,
    soldCount: 98,
    reviews: [],
    targetGender: 'ellos'
  },
  {
    id: '7',
    name: 'Pulsera Cuero Masculina',
    description: 'Pulsera de cuero genuino con detalles en acero inoxidable. Estilo casual elegante para hombre.',
    price: 899,
    category: 'bracelets',
    materials: [
      {
        type: 'stainless-steel',
        images: [
          'https://images.unsplash.com/photo-1495477413750-0451622f485f?w=800',
          'https://images.unsplash.com/photo-1495477413750-0451622f485f?w=800',
          'https://images.unsplash.com/photo-1495477413750-0451622f485f?w=800'
        ]
      }
    ],
    stock: 38,
    active: true,
    soldCount: 172,
    reviews: [],
    targetGender: 'ellos'
  },
  {
    id: '8',
    name: 'Pulsera Baby Premium',
    description: 'Pulsera delicada para bebé en acero inoxidable hipoalergénico. Diseño seguro con cierre especial.',
    price: 599,
    category: 'bracelets',
    materials: [
      {
        type: 'stainless-steel',
        images: [
          'https://images.unsplash.com/photo-1763368161154-6086e1421130?w=800',
          'https://images.unsplash.com/photo-1763368161154-6086e1421130?w=800',
          'https://images.unsplash.com/photo-1763368161154-6086e1421130?w=800'
        ]
      }
    ],
    stock: 50,
    active: true,
    soldCount: 234,
    reviews: [],
    targetGender: 'babys'
  },
  {
    id: '9',
    name: 'Anillo Oro Rosa Moderno',
    description: 'Anillo contemporáneo en oro rosa con acabado pulido. Diseño único que destaca por su originalidad.',
    price: 2199,
    category: 'rings',
    materials: [
      {
        type: 'rose-gold',
        images: [
          'https://images.unsplash.com/photo-1633934542430-0905ccb5f050?w=800',
          'https://images.unsplash.com/photo-1633934542430-0905ccb5f050?w=800',
          'https://images.unsplash.com/photo-1633934542430-0905ccb5f050?w=800'
        ]
      }
    ],
    sizes: ['5', '6', '7', '8', '9'],
    stock: 15,
    active: true,
    soldCount: 76,
    reviews: [],
    targetGender: 'ella'
  },
  {
    id: '10',
    name: 'Collar Cadena Oro Delicado',
    description: 'Cadena fina de oro con diseño minimalista. Perfecta para layering o uso individual.',
    price: 1899,
    category: 'necklaces',
    materials: [
      {
        type: 'gold',
        images: [
          'https://images.unsplash.com/photo-1772698262286-844f71d1991b?w=800',
          'https://images.unsplash.com/photo-1772698262286-844f71d1991b?w=800',
          'https://images.unsplash.com/photo-1772698262286-844f71d1991b?w=800'
        ]
      }
    ],
    lengths: [40, 45, 50],
    stock: 28,
    active: true,
    soldCount: 189,
    reviews: [],
    targetGender: 'ella'
  },
  {
    id: '11',
    name: 'Pulsera Eslabones Gruesos',
    description: 'Pulsera de eslabones en acero inoxidable con acabado brillante. Diseño statement para estilo audaz.',
    price: 1699,
    category: 'bracelets',
    materials: [
      {
        type: 'stainless-steel',
        images: [
          'https://images.unsplash.com/photo-1744472457504-f99a96ecbd3e?w=800',
          'https://images.unsplash.com/photo-1744472457504-f99a96ecbd3e?w=800',
          'https://images.unsplash.com/photo-1744472457504-f99a96ecbd3e?w=800'
        ]
      }
    ],
    stock: 19,
    active: true,
    soldCount: 112,
    reviews: [],
    targetGender: 'unisex'
  },
  {
    id: '12',
    name: 'Aretes Aro Medianos',
    description: 'Aretes tipo aro en oro con cierre seguro. Tamaño versátil para uso diario o especial.',
    price: 1299,
    category: 'earrings',
    materials: [
      {
        type: 'gold',
        images: [
          'https://images.unsplash.com/photo-1629224316810-9d8805b95e76?w=800',
          'https://images.unsplash.com/photo-1629224316810-9d8805b95e76?w=800',
          'https://images.unsplash.com/photo-1629224316810-9d8805b95e76?w=800'
        ]
      },
      {
        type: 'silver',
        images: [
          'https://images.unsplash.com/photo-1769078595478-5f756986b818?w=800',
          'https://images.unsplash.com/photo-1769078595478-5f756986b818?w=800',
          'https://images.unsplash.com/photo-1769078595478-5f756986b818?w=800'
        ]
      }
    ],
    stock: 42,
    active: true,
    soldCount: 267,
    reviews: [],
    targetGender: 'ella'
  }
];

export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'María González',
    email: 'maria@email.com',
    phone: '+34 612 345 678',
    address: 'Calle Mayor 123, Madrid',
    isAdmin: false
  },
  {
    id: 'admin1',
    name: 'Administrador Joyas',
    email: 'admin@joyasmelia.com',
    phone: '+34 600 000 000',
    address: 'Oficina Central',
    isAdmin: true
  }
];

export const mockOrders: Order[] = [
  {
    id: 'order1',
    userId: 'user1',
    userName: 'María González',
    userPhone: '+34 612 345 678',
    userAddress: 'Calle Mayor 123, Madrid',
    items: [
      {
        productId: '1',
        product: mockProducts[0],
        quantity: 1,
        selectedMaterial: 'gold',
        selectedSize: '7'
      }
    ],
    total: 2499,
    status: 'delivered',
    date: '2026-03-15'
  },
  {
    id: 'order2',
    userId: 'user1',
    userName: 'Carlos Ruiz',
    userPhone: '+34 623 456 789',
    userAddress: 'Avenida Principal 456, Barcelona',
    items: [
      {
        productId: '2',
        product: mockProducts[1],
        quantity: 1,
        selectedMaterial: 'silver'
      }
    ],
    total: 3299,
    status: 'processing',
    date: '2026-03-20'
  },
  {
    id: 'order3',
    userId: 'user1',
    userName: 'Laura Martínez',
    userPhone: '+34 634 567 890',
    userAddress: 'Plaza Central 789, Valencia',
    items: [
      {
        productId: '3',
        product: mockProducts[2],
        quantity: 2,
        selectedMaterial: 'stainless-steel'
      }
    ],
    total: 3798,
    status: 'pending',
    date: '2026-03-24'
  }
];

export const mockStoreInfo: StoreInfo = {
  welcomeTitle: 'Bienvenidos a Joyas Meliá',
  welcomeText: 'Desde 1985, creamos joyas que cuentan historias. Cada pieza es una obra de arte diseñada con pasión y dedicación.',
  aboutText: 'En Joyas Meliá, nos especializamos en la creación de joyas premium con los mejores materiales del mercado. Nuestro compromiso es ofrecer piezas únicas que perduren en el tiempo, acompañando los momentos más especiales de tu vida.',
  materialsText: 'Trabajamos exclusivamente con acero inoxidable premium, oro de 18k, plata 925, oro rosa y piedras preciosas certificadas. Cada joya pasa por rigurosos controles de calidad para garantizar su durabilidad y belleza.',
  storeImages: [
    'https://images.unsplash.com/photo-1774110073583-2475ab5ed8b2?w=800',
    'https://images.unsplash.com/photo-1766524555120-9c2e886c72f5?w=800',
    'https://images.unsplash.com/photo-1765031069580-1ee9543c288f?w=800'
  ],
  address: 'Calle de la Joyería 45, Madrid, España',
  phone: '+34 91 234 5678',
  whatsapp: '+34 612 345 678',
  schedule: 'Lunes a Sábado: 10:00 - 20:00',
  socialMedia: {
    facebook: 'https://facebook.com/joyasmelia',
    instagram: 'https://instagram.com/joyasmelia',
    twitter: 'https://twitter.com/joyasmelia'
  }
};
