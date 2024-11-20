import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import styles from "../../assets/css/product_list.module.css";
import Banner from "../../components/Banner/banner";
import Footer from "../../components/Footer/Footer";
import products from "../../assets/dummydata/productDTO";

/* =========================================
   1. 상태 관리 및 초기 설정
========================================= */
const ProductList = () => {
  const [cart, setCart] = useState(0);
  const [wish, setWish] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");

  const categories = ['all', 'Outerwear', 'Pants', 'Jeans'];
  
  /* =========================================
     2. 상품 필터링 및 정렬 로직
  ========================================= */
  const filteredProducts = products.filter(product => 
    activeCategory === 'all' ? true : product.category === activeCategory
  );

  const sortProducts = () => {
    let sorted = [...filteredProducts];
    switch(sortBy) {
      case 'priceHigh':
        return sorted.sort((a, b) => b.price - a.price);
      case 'priceLow':
        return sorted.sort((a, b) => a.price - b.price);
      case 'newest':
        return sorted.sort((a, b) => b.id - a.id);
      default:
        return sorted;
    }
  };

  /* =========================================
     3. 장바구니 및 위시리스트 기능
  ========================================= */
  const addToCart = async (product) => {
    if (!isLoggedIn) {
      alert("로그인 후 이용 가능합니다.");
      navigate("/user");
      return;
    }

    try {
      // 서버에 장바구니 추가 요청
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isLoggedIn}`,
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
        }),
      });

      if (response.ok) {
        setCart(cart + 1);
        const cartIcon = document.getElementById("crt");
        cartIcon.classList.add(styles.shake);
        setTimeout(() => cartIcon.classList.remove(styles.shake), 300);
        alert(`${product.title}이(가) 장바구니에 추가되었습니다.`);
      } else {
        alert("장바구니 추가에 실패했습니다.");
      }
    } catch (error) {
      console.error("장바구니 추가 에러:", error);
      alert("서버와 통신 중 문제가 발생했습니다.");
    }
  };

  // 위시리스트 추가
  const addToWish = async (product) => {
    if (!isLoggedIn) {
      alert("로그인 후 이용 가능합니다.");
      navigate("/user"); // 로그인 페이지로 리다이렉트
      return;
    }

    try {
      // 서버에 위시리스트 추가 요청
      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isLoggedIn}`,
        },
        body: JSON.stringify({
          productId: product.id,
        }),
      });

      if (response.ok) {
        setWish(wish + 1);
        const heartIcon = document.getElementById("wsh");
        heartIcon.classList.add(styles.shake);
        setTimeout(() => heartIcon.classList.remove(styles.shake), 300);
        alert(`${product.title}이(가) 위시리스트에 추가되었습니다.`);
      } else {
        alert("위시리스트 추가에 실패했습니다.");
      }
    } catch (error) {
      console.error("위시리스트 추가 에러:", error);
      alert("서버와 통신 중 문제가 발생했습니다.");
    }
  };

  /* =========================================
     4. 페이지 이동 로직
  ========================================= */
  const goToDetail = (product) => {
    navigate(`/product-detail/${product.id}`, { state: { product } });
  };

  /* =========================================
     5. 렌더링
  ========================================= */
  return (
    <div className={styles.container}>
      {/* 5.1 헤더 섹션 */}
      <Banner />
      
      <motion.div 
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 5.2 타이틀 섹션 */}
        <div className={styles.header}>
          <h1 className={styles.title}>Our Collection</h1>
          <p className={styles.subtitle}>Discover your perfect style</p>
        </div>

        {/* 5.3 필터 및 정렬 섹션 */}
        <div className={styles.filters}>
          <div className={styles.categories}>
            {categories.map(category => (
              <motion.button
                key={category}
                className={`${styles.categoryBtn} ${activeCategory === category ? styles.active : ''}`}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
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

        {/* 5.4 상품 그리드 섹션 */}
        <motion.div 
          className={styles.grid}
          layout
        >
          <AnimatePresence>
            {sortProducts().map((prod) => (
              <motion.div
                key={prod.id}
                className={styles.card}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                whileHover={{ y: -10 }}
              >
                {prod.badge && (
                  <div className={`${styles.badge} ${styles[prod.badge.toLowerCase()]}`}>
                    {prod.badge}
                  </div>
                )}
                <div className={styles.imgWrap}>
                  <img src={prod.image} alt={prod.title} className={styles.img} />
                  <div className={styles.overlay}>
                    <motion.div 
                      className={styles.actions}
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <button onClick={() => addToWish(prod)} className={styles.actionBtn}>
                        <i className="fa fa-heart"></i>
                      </button>
                      <button onClick={() => addToCart(prod)} className={styles.actionBtn}>
                        <i className="fa fa-shopping-cart"></i>
                      </button>
                      <button onClick={() => goToDetail(prod)} className={styles.viewBtn}>
                        View Details
                      </button>
                    </motion.div>
                  </div>
                </div>
                <div className={styles.info}>
                  <h3 className={styles.productTitle}>{prod.title}</h3>
                  <p className={styles.category}>{prod.category}</p>
                  <p className={styles.price}>₩{prod.price.toLocaleString()}</p>
                  <div className={styles.stock}>
                    <span className={styles.stockLabel}>재고:</span>
                    <span className={styles.stockAmount}>{prod.stock}개</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* 5.5 플로팅 버튼 섹션 */}
      <div className={styles.floatingButtons}>
        <motion.div 
          id="wsh" 
          className={styles.wish} 
          data-totalitems={wish}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <i className="fas fa-heart"></i>
        </motion.div>
        <motion.div 
          id="crt" 
          className={styles.cart} 
          data-totalitems={cart}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <i className="fas fa-shopping-cart"></i>
        </motion.div>
      </div>

      {/* 5.6 푸터 섹션 */}
      <Footer />
    </div>
  );
};

export default ProductList;
