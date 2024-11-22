import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../../assets/css/product_list.module.css";
import Banner from "../../components/Banner/banner";
import Footer from "../../components/Footer/Footer";
import products from "../../assets/dummydata/productDTO";
import Modal from "../../components/Modal/Modal";

const ProductList = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [wishItems, setWishItems] = useState([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isWishModalOpen, setIsWishModalOpen] = useState(false);

  const categories = ["all", "Outerwear", "Pants", "Jeans"];

  const filteredProducts = products.filter((product) =>
    activeCategory === "all"
      ? true
      : product.categoryid === categories.indexOf(activeCategory)
  );

  const sortProducts = () => {
    let sorted = [...filteredProducts];
    switch (sortBy) {
      case "priceHigh":
        return sorted.sort((a, b) => b.price - a.price);
      case "priceLow":
        return sorted.sort((a, b) => a.price - b.price);
      default:
        return sorted.sort((a, b) => b.id - a.id);
    }
  };

  const sortedProducts = sortProducts();

  const handleAddToCart = (product) => {
    const cartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      productimg: product.productimg,
      quantity: 1
    };
    setCartItems(prev => [...prev, cartProduct]);
    setIsCartModalOpen(true);
  };

  const handleAddToWish = (product) => {
    const wishProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      productimg: product.productimg
    };
    setWishItems(prev => [...prev, wishProduct]);
    setIsWishModalOpen(true);
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateCartQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromWish = (id) => {
    setWishItems(prev => prev.filter(item => item.id !== id));
  };

  const openCartModal = () => setIsCartModalOpen(true);
  const closeCartModal = () => setIsCartModalOpen(false);
  const openWishModal = () => setIsWishModalOpen(true);
  const closeWishModal = () => setIsWishModalOpen(false);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const goToDetail = (id) => {
    navigate(`/product-detail/${id}`);
  };

  return (
    <div className={styles.container}>
      <Banner />
      <motion.div
        className={styles.productList}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.header}>
          <h1>상품 목록</h1>
          <div className={styles.filters}>
            <div className={styles.categories}>
              <AnimatePresence>
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    className={`${styles.categoryBtn} ${
                      activeCategory === category ? styles.active : ""
                    }`}
                    onClick={() => setActiveCategory(category)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
            <div className={styles.sortFilter}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={styles.sortSelect}
              >
                <option value="newest">최신순</option>
                <option value="priceHigh">높은 가격순</option>
                <option value="priceLow">낮은 가격순</option>
              </select>
            </div>
          </div>
        </div>

        <motion.div layout className={styles.grid}>
          <AnimatePresence>
            {currentItems.map((prod) => (
              <motion.div
                key={prod.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={styles.card}
              >
                <div className={styles.productImage}>
                  <img
                    src={prod.productimg[0].fileurl}
                    alt={prod.name}
                    onClick={() => goToDetail(prod.id)}
                  />
                  <div className={styles.productActions}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(prod);
                      }}
                      className={styles.cartBtn}
                    >
                      <i className="fa fa-shopping-cart"></i>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToWish(prod);
                      }}
                      className={styles.wishBtn}
                    >
                      <i className="fa fa-heart"></i>
                    </button>
                    <button
                      className={styles.viewBtn}
                      onClick={() => goToDetail(prod.id)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
                <div className={styles.info}>
                  <h3 className={styles.productTitle}>{prod.name}</h3>
                  <p className={styles.price}>
                    ₩{prod.price?.toLocaleString()}
                  </p>
                  <p className={styles.stock}>
                    재고 수량 : {prod.stock}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div 
          className={styles.pagination}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button
            className={styles.pageBtn}
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            &laquo;
          </button>
          <button
            className={styles.pageBtn}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`${styles.pageBtn} ${currentPage === index + 1 ? styles.active : ""}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className={styles.pageBtn}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
          <button
            className={styles.pageBtn}
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            &raquo;
          </button>
        </motion.div>
      </motion.div>

      <div className={styles.floatingButtons}>
        <motion.div
          id="wish"
          className={styles.wish}
          data-totalitems={wishItems.length}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={openWishModal}
        >
          <i className="fas fa-heart"></i>
        </motion.div>
        <motion.div
          id="cart"
          className={styles.cart}
          data-totalitems={cartItems.length}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={openCartModal}
        >
          <i className="fas fa-shopping-cart"></i>
        </motion.div>
      </div>

      <Modal
        isOpen={isCartModalOpen}
        onClose={closeCartModal}
        title="장바구니"
        items={cartItems}
        onRemove={removeFromCart}
        onQuantityChange={updateCartQuantity}
      />
      <Modal
        isOpen={isWishModalOpen}
        onClose={closeWishModal}
        title="위시리스트"
        items={wishItems}
        onRemove={removeFromWish}
      />

      <Footer />
    </div>
  );
};

export default ProductList;
