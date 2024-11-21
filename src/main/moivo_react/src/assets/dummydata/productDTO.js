import img1 from '../image/1_outer.jpg';
import img2 from '../image/2_outer.jpg';
import img3 from '../image/1_pa.jpg';
import img4 from '../image/5_ja.jpg';
import img5 from '../image/4_outer.jpg';
import img6 from '../image/7_outer.jpg';
import img7 from '../image/6_outer.jpg';

const products = [
  {
    id: 1,
    name: 'Denim Jacket',
    categoryseq: 1,
    img: img1,
    images: {
      main: img1,
      thumbnails: [img1, img2, img3],
      details: [
        'https://images.unsplash.com/photo-1582552938357-32b906df40cb',
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
      ],
    },
    badge: 'Best',
    price: 120000,
    content: 'A stylish and durable denim jacket perfect for casual wear.',
    productstock: [
      { stockseq: 1, size: 'S', stock: 10 },
      { stockseq: 2, size: 'M', stock: 15 },
      { stockseq: 3, size: 'L', stock: 8 },
    ],
    reviews: [
      {
        reviewseq: 1,
        userseq: 1,
        productseq: 1,
        content: 'Great jacket! Fits perfectly and looks amazing.',
        rating: 5,
        reviewdate: '2023-05-01',
      },
      {
        reviewseq: 2,
        userseq: 2,
        productseq: 1,
        content: 'I love this denim jacket. It\'s my new favorite!',
        rating: 4,
        reviewdate: '2023-05-05',
      },
    ],
    cartseq: 1,
  },
  {
    id: 2,
    name: 'Puffer Jacket',
    categoryseq: 1,
    img: img4,
    images: {
      main: img4,
      thumbnails: [img4, img5, img6],
      details: [
        'https://images.unsplash.com/photo-1605908502724-9093a79a1b39',
        'https://images.unsplash.com/photo-1605908502724-9093a79a1b39',
      ],
    },
    badge: 'New',
    price: 150000,
    content: 'A warm and lightweight puffer jacket for chilly weather.',
    productstock: [
      { stockseq: 4, size: 'M', stock: 12 },
      { stockseq: 5, size: 'L', stock: 18 },
      { stockseq: 6, size: 'XL', stock: 6 },
    ],
    reviews: [
      {
        reviewseq: 3,
        userseq: 3,
        productseq: 2,
        content: 'This puffer jacket keeps me warm and cozy.',
        rating: 4,
        reviewdate: '2023-04-28',
      },
    ],
    cartseq: 2,
  },
  {
    id: 3,
    name: 'Classic Pants',
    categoryseq: 3,
    img: img7,
    images: {
      main: img7,
      thumbnails: [img7, img1, img2],
      details: [
        'https://images.unsplash.com/photo-1604176354204-9268737828e4',
        'https://images.unsplash.com/photo-1604176354204-9268737828e4',
      ],
    },
    badge: 'Sale',
    price: 80000,
    content: 'Elegant and comfortable pants for every occasion.',
    productstock: [
      { stockseq: 7, size: 'S', stock: 20 },
      { stockseq: 8, size: 'M', stock: 25 },
      { stockseq: 9, size: 'L', stock: 15 },
    ],
    reviews: [
      {
        reviewseq: 4,
        userseq: 4,
        productseq: 3,
        content: 'These pants fit perfectly and are very comfortable.',
        rating: 5,
        reviewdate: '2023-05-02',
      },
    ],
    cartseq: 3,
  },
  {
    id: 4,
    name: 'Leather Jacket',
    categoryseq: 1,
    img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5',
    images: {
      main: 'https://images.unsplash.com/photo-1551028719-00167b16eac5',
      thumbnails: [
        'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3',
        'https://images.unsplash.com/photo-1551488831-68b1cd0c5daa',
      ],
      details: [img3, img4],
    },
    badge: 'Premium',
    price: 280000,
    content: 'A premium leather jacket with a classic design.',
    productstock: [
      { stockseq: 10, size: 'M', stock: 5 },
      { stockseq: 11, size: 'L', stock: 8 },
      { stockseq: 12, size: 'XL', stock: 3 },
    ],
    reviews: [
      {
        reviewseq: 5,
        userseq: 5,
        productseq: 4,
        content: 'The leather quality is amazing. Worth the price!',
        rating: 5,
        reviewdate: '2023-05-10',
      },
    ],
    cartseq: 4,
  },
  {
    id: 5,
    name: 'Floral Dress',
    categoryseq: 2,
    img: 'https://images.unsplash.com/photo-1572804013427-4d7ca7268217',
    images: {
      main: 'https://images.unsplash.com/photo-1572804013427-4d7ca7268217',
      thumbnails: [
        'https://images.unsplash.com/photo-1572804013427-4d7ca7268217',
        'https://images.unsplash.com/photo-1595777457583-95e059d581b8',
      ],
      details: [img5, img6],
    },
    badge: 'New',
    price: 95000,
    content: 'A beautiful floral dress for a summer day.',
    productstock: [
      { stockseq: 13, size: 'S', stock: 15 },
      { stockseq: 14, size: 'M', stock: 20 },
      { stockseq: 15, size: 'L', stock: 10 },
    ],
    reviews: [
      {
        reviewseq: 6,
        userseq: 6,
        productseq: 5,
        content: 'The dress is so pretty and fits perfectly!',
        rating: 5,
        reviewdate: '2023-05-12',
      },
    ],
    cartseq: 5,
  },
  {
    id: 6,
    name: 'Striped T-Shirt',
    categoryseq: 2,
    img: 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34',
    images: {
      main: 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34',
      thumbnails: [
        'https://images.unsplash.com/photo-1622445275576-e0ed0be35f1e',
        'https://images.unsplash.com/photo-1622445275576-e0ed0be35f1e',
      ],
      details: [img7, img1],
    },
    badge: 'Sale',
    price: 35000,
    content: 'A classic striped t-shirt for everyday wear.',
    productstock: [
      { stockseq: 16, size: 'S', stock: 20 },
      { stockseq: 17, size: 'M', stock: 25 },
      { stockseq: 18, size: 'L', stock: 15 },
      { stockseq: 19, size: 'XL', stock: 10 },
    ],
    reviews: [
      {
        reviewseq: 7,
        userseq: 7,
        productseq: 6,
        content: 'Great quality and comfortable fabric.',
        rating: 4,
        reviewdate: '2023-05-15',
      },
    ],
    cartseq: 6,
  },
  {
    id: 7,
    name: 'Hooded Sweatshirt',
    categoryseq: 2,
    img: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633',
    images: {
      main: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633',
      thumbnails: [
        'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633',
        'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633',
      ],
      details: [img2, img3],
    },
    badge: 'New',
    price: 68000,
    content: 'A cozy hooded sweatshirt for chilly days.',
    productstock: [
      { stockseq: 20, size: 'S', stock: 12 },
      { stockseq: 21, size: 'M', stock: 18 },
      { stockseq: 22, size: 'L', stock: 15 },
      { stockseq: 23, size: 'XL', stock: 8 },
    ],
    reviews: [
      {
        reviewseq: 8,
        userseq: 8,
        productseq: 7,
        content: 'Perfect for lazy weekends. So comfortable!',
        rating: 5,
        reviewdate: '2023-05-18',
      },
    ],
    cartseq: 7,
  },
  {
    id: 8,
    name: 'Cargo Pants',
    categoryseq: 3,
    img: 'https://images.unsplash.com/photo-1604176354204-9268737828e4',
    images: {
      main: 'https://images.unsplash.com/photo-1604176354204-9268737828e4',
      thumbnails: [
        'https://images.unsplash.com/photo-1604176354204-9268737828e4',
        'https://images.unsplash.com/photo-1605908502724-9093a79a1b39',
      ],
      details: [img4, img5],
    },
    badge: 'Best',
    price: 92000,
    content: 'Durable cargo pants with multiple pockets.',
    productstock: [
      { stockseq: 24, size: 'S', stock: 10 },
      { stockseq: 25, size: 'M', stock: 15 },
      { stockseq: 26, size: 'L', stock: 12 },
      { stockseq: 27, size: 'XL', stock: 5 },
    ],
    reviews: [
      {
        reviewseq: 9,
        userseq: 9,
        productseq: 8,
        content: 'These cargo pants are great for outdoor activities.',
        rating: 4,
        reviewdate: '2023-05-20',
      },
    ],
    cartseq: 8,
  },
  {
    id: 9,
    name: 'Denim Shorts',
    categoryseq: 3,
    img: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09',
    images: {
      main: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09',
      thumbnails: [
        'https://images.unsplash.com/photo-1582418702059-97ebafb35d09',
        'https://images.unsplash.com/photo-1582418702059-97ebafb35d09',
        'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3',
      ],
      details: [img6, img7],
    },
    badge: 'Sale',
    price: 48000,
    content: 'Stylish denim shorts for a casual summer look.',
    productstock: [
      { stockseq: 28, size: 'S', stock: 20 },
      { stockseq: 29, size: 'M', stock: 25 },
      { stockseq: 30, size: 'L', stock: 18 },
    ],
    reviews: [
      {
        reviewseq: 10,
        userseq: 10,
        productseq: 9,
        content: 'Love these shorts! They fit perfectly.',
        rating: 5,
        reviewdate: '2023-05-22',
      },
    ],
    cartseq: 9,
  },
  {
    id: 10,
    name: 'Linen Shirt',
    categoryseq: 2,
    img: 'https://images.unsplash.com/photo-1598961942613-ba897716405b',
    images: {
      main: 'https://images.unsplash.com/photo-1598961942613-ba897716405b',
      thumbnails: [
        'https://images.unsplash.com/photo-1598961942613-ba897716405b',
        'https://images.unsplash.com/photo-1598961942613-ba897716405b',
        'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633',
      ],
      details: [img1, img2],
    },
    badge: 'New',
    price: 78000,
    content: 'A breathable linen shirt for a cool and comfortable feel.',
    productstock: [
      { stockseq: 31, size: 'S', stock: 15 },
      { stockseq: 32, size: 'M', stock: 20 },
      { stockseq: 33, size: 'L', stock: 12 },
      { stockseq: 34, size: 'XL', stock: 8 },
    ],
    reviews: [
      {
        reviewseq: 11,
        userseq: 11,
        productseq: 10,
        content: 'The linen fabric is so soft and comfortable.',
        rating: 4,
        reviewdate: '2023-05-25',
      },
    ],
    cartseq: 10,
  },
];

export default products;