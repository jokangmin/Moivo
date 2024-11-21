const products = [
  {
    productseq: 1,
    name: "Denim Jacket",
    price: 120000,
    content: "A stylish and durable denim jacket perfect for casual wear.",
    categoryseq: 1,
    cartseq: 1,
    wishseq: 1,
    stock: 100,
    productimg: [
      {
        productimgseq: 1,
        filename: "denim_jacket_main.jpg",
        fileurl: "https://via.placeholder.com/640x400.png?text=Denim+Jacket+Main",
        layer: 1,
        productseq: 1,
      },
      {
        productimgseq: 2,
        filename: "denim_jacket_sub.jpg",
        fileurl: "https://via.placeholder.com/400x400.png?text=Denim+Jacket+Sub",
        layer: 2,
        productseq: 1,
      },
      {
        productimgseq: 3,
        filename: "denim_jacket_detail.jpg",
        fileurl: "https://via.placeholder.com/640x400.png?text=Denim+Jacket+Detail",
        layer: 3,
        productseq: 1,
      },
    ],
    review: [],
  },
  {
    productseq: 2,
    name: "Leather Jacket",
    price: 250000,
    content: "A premium leather jacket for a sophisticated look.",
    categoryseq: 1,
    cartseq: 2,
    wishseq: 2,
    stock: 50,
    productimg: [
      {
        productimgseq: 4,
        filename: "leather_jacket_main.jpg",
        fileurl: "https://via.placeholder.com/640x400.png?text=Leather+Jacket+Main",
        layer: 1,
        productseq: 2,
      },
      {
        productimgseq: 5,
        filename: "leather_jacket_sub.jpg",
        fileurl: "https://via.placeholder.com/400x400.png?text=Leather+Jacket+Sub",
        layer: 2,
        productseq: 2,
      },
      {
        productimgseq: 6,
        filename: "leather_jacket_detail.jpg",
        fileurl: "https://via.placeholder.com/640x400.png?text=Leather+Jacket+Detail",
        layer: 3,
        productseq: 2,
      },
    ],
    review: [],
  },
  {
    productseq: 3,
    name: "Wool Coat",
    price: 280000,
    content: "A warm and cozy wool coat for the winter season.",
    categoryseq: 2,
    cartseq: 3,
    wishseq: 3,
    stock: 30,
    productimg: [
      {
        productimgseq: 7,
        filename: "wool_coat_main.jpg",
        fileurl: "https://via.placeholder.com/640x400.png?text=Wool+Coat+Main",
        layer: 1,
        productseq: 3,
      },
      {
        productimgseq: 8,
        filename: "wool_coat_sub.jpg",
        fileurl: "https://via.placeholder.com/400x400.png?text=Wool+Coat+Sub",
        layer: 2,
        productseq: 3,
      },
      {
        productimgseq: 9,
        filename: "wool_coat_detail.jpg",
        fileurl: "https://via.placeholder.com/640x400.png?text=Wool+Coat+Detail",
        layer: 3,
        productseq: 3,
      },
    ],
    review: [],
  },
  {
    productseq: 4,
    name: "Trench Coat",
    price: 220000,
    content: "A classic trench coat for a timeless look.",
    categoryseq: 2,
    cartseq: 4,
    wishseq: 4,
    stock: 80,
    productimg: [
      {
        productimgseq: 10,
        filename: "trench_coat_main.jpg",
        fileurl: "https://via.placeholder.com/640x400.png?text=Trench+Coat+Main",
        layer: 1,
        productseq: 4,
      },
      {
        productimgseq: 11,
        filename: "trench_coat_sub.jpg",
        fileurl: "https://via.placeholder.com/400x400.png?text=Trench+Coat+Sub",
        layer: 2,
        productseq: 4,
      },
      {
        productimgseq: 12,
        filename: "trench_coat_detail.jpg",
        fileurl: "https://via.placeholder.com/640x400.png?text=Trench+Coat+Detail",
        layer: 3,
        productseq: 4,
      },
    ],
    review: [],
  },
  {
    productseq: 5,
    name: "Floral Dress",
    price: 95000,
    content: "A beautiful floral dress for a feminine look.",
    categoryseq: 3,
    cartseq: 5,
    wishseq: 5,
    stock: 120,
    productimg: [
      {
        productimgseq: 13,
        filename: "floral_dress_main.jpg",
        fileurl: "https://via.placeholder.com/640x400.png?text=Floral+Dress+Main",
        layer: 1,
        productseq: 5,
      },
      {
        productimgseq: 14,
        filename: "floral_dress_sub.jpg",
        fileurl: "https://via.placeholder.com/400x400.png?text=Floral+Dress+Sub",
        layer: 2,
        productseq: 5,
      },
      {
        productimgseq: 15,
        filename: "floral_dress_detail.jpg",
        fileurl: "https://via.placeholder.com/640x400.png?text=Floral+Dress+Detail",
        layer: 3,
        productseq: 5,
      },
    ],
    review: [],
  },
  {
    productseq: 6,
    name: "Lace Dress",
    price: 110000,
    content: "An elegant lace dress for special occasions.",
    categoryseq: 3,
    cartseq: 6,
    wishseq: 6,
    stock: 60,
    productimg: [
      {
        productimgseq: 16,
        filename: "lace_dress_main.jpg",
        fileurl: "https://via.placeholder.com/640x400.png?text=Lace+Dress+Main",
        layer: 1,
        productseq: 6,
      },
      {
        productimgseq: 17,
        filename: "lace_dress_sub.jpg",
        fileurl: "https://via.placeholder.com/400x400.png?text=Lace+Dress+Sub",
        layer: 2,
        productseq: 6,
      },
      {
        productimgseq: 18,
        filename: "lace_dress_detail.jpg",
        fileurl: "https://via.placeholder.com/640x400.png?text=Lace+Dress+Detail",
        layer: 3,
        productseq: 6,
      },
    ],
    review: [],
  },
  {
    productseq: 7,
    name: "Striped T-Shirt",
    price: 35000,
    content: "A comfortable striped t-shirt for everyday wear.",
    categoryseq: 4,
    cartseq: 7,
    wishseq: 7,
    stock: 200,
    productimg: [
      {
        productimgseq: 19,
        filename: "striped_tshirt_main.jpg",
        fileurl: "https://via.placeholder.com/640x400.png?text=Striped+T-Shirt+Main",
        layer: 1,
        productseq: 7,
      },
      {
        productimgseq: 20,
        filename: "striped_tshirt_sub.jpg",
        fileurl: "https://via.placeholder.com/400x400.png?text=Striped+T-Shirt+Sub",
        layer: 2,
        productseq: 7,
      },
      {
        productimgseq: 21,
        filename: "striped_tshirt_detail.jpg",
        fileurl: "https://via.placeholder.com/640x400.png?text=Striped+T-Shirt+Detail",
        layer: 3,
        productseq: 7,
      },
    ],
    review: [],
  },
  {
    productseq: 8,
    name: "Graphic T-Shirt",
    price: 25000,
    content: "A trendy graphic t-shirt to express your style.",
    categoryseq: 4,
    cartseq: 8,
    wishseq: 8,
    stock: 150,
    productimg: [
      {
        productimgseq: 22,
        filename: "graphic_tshirt_main.jpg",
        fileurl: "https://via.placeholder.com/640x400.png?text=Graphic+T-Shirt+Main",
        layer: 1,
        productseq: 8,
      },
      {
        productimgseq: 23,
        filename: "graphic_tshirt_sub.jpg",
        fileurl: "https://via.placeholder.com/400x400.png?text=Graphic+T-Shirt+Sub",
        layer: 2,
        productseq: 8,
      },
      {
        productimgseq: 24,
        filename: "graphic_tshirt_detail.jpg",
        fileurl: "https://via.placeholder.com/640x400.png?text=Graphic+T-Shirt+Detail",
        layer: 3,
        productseq: 8,
      },
    ],
    review: [],
  },
  {
    productseq: 9,
    name: "Slim Jeans",
    price: 80000,
    content: "Slim fit jeans for a modern and sleek look.",
    categoryseq: 5,
    cartseq: 9,
    wishseq: 9,
    stock: 90,
    productimg: [
      {
        productimgseq: 25,
        filename: "slim_jeans_main.jpg",
        fileurl: "https://via.placeholder.com/640x400.png?text=Slim+Jeans+Main",
        layer: 1,
        productseq: 9,
      },
      {
        productimgseq: 26,
        filename: "slim_jeans_sub.jpg",
        fileurl: "https://via.placeholder.com/400x400.png?text=Slim+Jeans+Sub",
        layer: 2,
        productseq: 9,
      },
      {
        productimgseq: 27,
        filename: "slim_jeans_detail.jpg",
        fileurl: "https://via.placeholder.com/640x400.png?text=Slim+Jeans+Detail",
        layer: 3,
        productseq: 9,
      },
    ],
    review: [],
  },
  {
    productseq: 10,
    name: "Wide Leg Jeans",
    price: 100000,
    content: "A wide leg jeans for a relaxed and stylish look.",
    categoryseq: 5,
    cartseq: 10,
    wishseq: 10,
    stock: 70,
    productimg: [
      {
        productimgseq: 28,
        filename: "wide_leg_jeans_main.jpg",
        fileurl: "https://via.placeholder.com/640x400.png?text=Wide+Leg+Jeans+Main",
        layer: 1,
        productseq: 10,
      },
      {
        productimgseq: 29,
        filename: "wide_leg_jeans_sub.jpg",
        fileurl: "https://via.placeholder.com/400x400.png?text=Wide+Leg+Jeans+Sub",
        layer: 2,
        productseq: 10,
      },
      {
        productimgseq: 30,
        filename: "wide_leg_jeans_detail.jpg",
        fileurl: "https://via.placeholder.com/640x400.png?text=Wide+Leg+Jeans+Detail",
        layer: 3,
        productseq: 10,
      },
    ],
    review: [],
  },
];

export default products;
