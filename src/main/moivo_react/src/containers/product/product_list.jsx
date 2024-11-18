import React, { useState, useEffect } from "react";
import styles from "../../assets/css/product_list.module.css";
import Banner from "../../components/Banner/banner";
import Footer from "../../components/Footer/Footer";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [wishListCount, setWishListCount] = useState(0);

  useEffect(() => {
    setProducts([
      {
        id: 1,
        title: "Denim Jacket",
        category: "Outerwear",
        image: "https://i.imgur.com/Hyc4BLG.jpg",
        badge: "Hot",
        link: "#",
      },
      {
        id: 2,
        title: "Classic Shoes",
        category: "Shoes",
        image: "https://i.imgur.com/KJvC35p.jpg",
        badge: "New",
        link: "#",
      },
      {
        id: 3,
        title: "Modern Sunglasses",
        category: "Accessories",
        image: "https://i.imgur.com/2i0EIjq.jpg",
        badge: "Limited",
        link: "#",
      },
      {
        id: 4,
        title: "Smart Watch",
        category: "Gadgets",
        image: "https://i.imgur.com/dxAHOUn.jpg",
        badge: "Trending",
        link: "#",
      },
      {
        id: 5,
        title: "Leather Jacket",
        category: "Clothing",
        image: "https://i.imgur.com/NVguAZA.jpg",
        badge: "Best Seller",
        link: "#",
      },
    ]);
  }, []);

  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
    const cartIcon = document.getElementById("cart");
    cartIcon.classList.add(styles.shake);
    setTimeout(() => {
      cartIcon.classList.remove(styles.shake);
    }, 500);
  };

  const handleAddToWishList = () => {
    setWishListCount(wishListCount + 1);
    const heartIcon = document.getElementById("wishlist");
    heartIcon.classList.add(styles.shake);
    setTimeout(() => {
      heartIcon.classList.remove(styles.shake);
    }, 500);
  };

  return (
    <div className={styles.container}>
      <Banner />
      <div id="cart" className={styles.cart} data-totalitems={cartCount}>
        <i className="fas fa-shopping-cart"></i>
      </div>
      <div id="wishlist" className={styles.wishlist} data-totalitems={wishListCount}>
        <i className="fas fa-heart"></i>
      </div>
      <h2 className={styles.title}>Product List</h2>
      <div className={styles.productGrid}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            {product.badge && <div className={styles.badge}>{product.badge}</div>}
            <div className={styles.productImageWrapper}>
              <img src={product.image} alt={product.title} className={styles.productImage} />
              <div className={styles.overlay}>
                <h3 className={styles.overlayTitle}>{product.title}</h3>
                <p className={styles.overlayCategory}>{product.category}</p>
                <div className={styles.overlayLinks}>
                  <button className={styles.actionButton} onClick={handleAddToWishList}>
                    <i className="fa fa-heart"></i>
                  </button>
                  <button className={styles.actionButton} onClick={handleAddToCart}>
                    <i className="fa fa-shopping-cart"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default ProductList;
