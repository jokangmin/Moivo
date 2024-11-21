import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../../assets/css/product_list.module.css";
import Banner from "../../components/Banner/banner";
import Footer from "../../components/Footer/Footer";
import products from "../../assets/dummydata/productDTO";
import Modal from "../../components/Modal/Modal";

/* =========================================
   1. 상태 관리 및 초기 설정
========================================= */
const ProductList = () => {
  const [cartItems, setCartItems] = useState([]);
  const [wishItems, setWishItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isWishModalOpen, setIsWishModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // 한 페이지에 표시할 상품 수
  const navigate = useNavigate();

  const categories = ["all", "Outerwear", "Pants", "Jeans"];

  /* =========================================
     2. 상품 필터링 및 정렬 로직..
  ========================================= */
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

  /* =========================================
     3. 장바구니 및 위시리스트 핸들러
  ========================================= */
  const handleAddToCart = (product) => {
    const updatedCart = [...cartItems];
    const productIndex = updatedCart.findIndex(
      (item) => item.productseq === product.productseq
    );

    if (productIndex > -1) {
      updatedCart[productIndex].quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const handleAddToWish = (product) => {
    const updatedWish = [...wishItems];
    const productIndex = updatedWish.findIndex(
      (item) => item.productseq === product.productseq
    );

    if (productIndex === -1) {
      updatedWish.push({ ...product });
    }
    setWishItems(updatedWish);
    localStorage.setItem("wishItems", JSON.stringify(updatedWish));
  };

  /* =========================================
     axios 통신 로직

     const handleAddToCart = async (product) => {
  try {
    const response = await axios.post("/api/cart/add", {
      productseq: product.productseq,
      quantity: 1,
    });
    console.log(response.data.message);
  } catch (error) {
    console.error("Error adding to cart:", error.response.data);
  }
};

const handleAddToWish = async (product) => {
  try {
    const response = await axios.post("/api/wishlist/add", {
      productseq: product.productseq,
    });
    console.log(response.data.message);
  } catch (error) {
    console.error("Error adding to wishlist:", error.response.data);
  }
};
  ========================================= */

  /* =========================================
     4. 페이지 이동 로직
  ========================================= */
  const goToDetail = (id) => {
    navigate(`/product-detail/${id}`);
  };
  
  /* =========================================
     5. 렌더링
  ========================================= */
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const storedWishItems = JSON.parse(localStorage.getItem("wishItems")) || [];
    setCartItems(storedCartItems);
    setWishItems(storedWishItems);
  }, []);

  // 페이징 처리
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  return (
    <div className={styles.container}>
      {/* 배너 */}
      <Banner />

      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 타이틀 섹션 */}
        <div className={styles.header}>
          <h1 className={styles.title}>Our Collection</h1>
          <p className={styles.subtitle}>Discover your perfect style</p>
        </div>

        {/* 필터 및 정렬 */}
        <div className={styles.filters}>
          <div className={styles.categories}>
            {categories.map((category, index) => (
              <button
                key={index}
                className={`${styles.categoryBtn} ${activeCategory === category ? styles.active : ""}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <select
            className={styles.sortSelect}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">최신순</option>
            <option value="priceHigh">가격 높은순</option>
            <option value="priceLow">가격 낮은순</option>
          </select>
        </div>

        {/* 상품 그리드 */}
        <motion.div className={styles.grid} layout>
          <AnimatePresence>
            {currentProducts.map((prod) => (
              <motion.div
                key={prod.id}
                className={styles.card}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                layout
                onClick={() => goToDetail(prod.id)}
              >
                <div className={styles.imgWrap}>
                  <img
                    className={styles.img}
                    src={prod.productimg[0].fileurl}
                    alt={prod.name}
                  />
                  <div className={styles.overlay}>
                    <div className={styles.actions}>
                      <button
                        className={styles.actionBtn}
                        onClick={() => handleAddToWish(prod)}
                      >
                        <i className="fa fa-heart"></i>
                      </button>
                      <button
                        className={styles.actionBtn}
                        onClick={() => handleAddToCart(prod)}
                      >
                        <i className="fa fa-shopping-cart"></i>
                      </button>
                      <button
                        className={styles.viewBtn}
                        onClick={() => goToDetail(prod.id)}
                      >
                        View Details
                      </button>
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
                  </div>
                </div>
                
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* 페이징 버튼 */}
        <div className={styles.pagination}>
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
        </div>
      </motion.div>

      {/* 플로팅 버튼 */}
      <div className={styles.floatingButtons}>
        <motion.div
          id="wish"
          className={styles.wish}
          data-totalitems={wishItems.length}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsWishModalOpen(true)}
        >
          <i className="fas fa-heart"></i>
        </motion.div>
        <motion.div
          id="cart"
          className={styles.cart}
          data-totalitems={cartItems.length}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsCartModalOpen(true)}
        >
          <i className="fas fa-shopping-cart"></i>
        </motion.div>
      </div>

      {/* 모달 */}
      <Modal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        title="장바구니"
        items={cartItems}
      />
      <Modal
        isOpen={isWishModalOpen}
        onClose={() => setIsWishModalOpen(false)}
        title="위시리스트"
        items={wishItems}
      />

      {/* 푸터 */}
      <Footer />
    </div>
  );
};

export default ProductList;
