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
    title: 'Denim Jacket',
    category: 'Outerwear',
    image: img1,
    badge: 'Hot',
    price: 120000,
    stock: 20,
    size: ['S', 'M', 'L'],
    description: 'A stylish and durable denim jacket perfect for casual wear.',
  },
  {
    id: 2,
    title: 'Puffer Jacket',
    category: 'Outerwear',
    image: img2,
    badge: 'New',
    price: 150000,
    stock: 15,
    size: ['M', 'L', 'XL'],
    description: 'A warm and lightweight puffer jacket for chilly weather.',
  },
  {
    id: 3,
    title: 'Classic Pants',
    category: 'Pants',
    image: img3,
    badge: 'Trending',
    price: 80000,
    stock: 25,
    size: ['S', 'M', 'L'],
    description: 'Elegant and comfortable pants for every occasion.',
  },
  {
    id: 4,
    title: 'Denim Jeans',
    category: 'Jeans',
    image: img4,
    badge: 'Hot',
    price: 90000,
    stock: 30,
    size: ['S', 'M', 'L', 'XL'],
    description: 'Classic denim jeans with a modern fit.',
  },
  {
    id: 5,
    title: 'Leather Jacket',
    category: 'Outerwear',
    image: img5,
    badge: 'Limited',
    price: 200000,
    stock: 5,
    size: ['M', 'L'],
    description: 'A premium leather jacket for stylish individuals.',
  },
  {
    id: 6,
    title: 'Bomber Jacket',
    category: 'Outerwear',
    image: img6,
    badge: 'New',
    price: 170000,
    stock: 12,
    size: ['S', 'M', 'L'],
    description: 'A trendy bomber jacket with a versatile design.',
  },
  {
    id: 7,
    title: 'Blazer',
    category: 'Outerwear',
    image: img7,
    badge: 'Classic',
    price: 110000,
    stock: 8,
    size: ['S', 'M', 'L'],
    description: 'A sophisticated blazer for formal occasions.',
  },
];

export default products;
