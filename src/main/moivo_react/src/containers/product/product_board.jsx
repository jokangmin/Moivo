import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from "../../assets/css/product_board.module.css";
const ProductBoard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const products = [
    { id: 1, title: '상품명 1', price: 1000, image: 'https://via.placeholder.com/300?text=Product+1' },
    { id: 2, title: '상품명 2', price: 2000, image: 'https://via.placeholder.com/300?text=Product+2' },
    { id: 3, title: '상품명 3', price: 3000, image: 'https://via.placeholder.com/300?text=Product+3' },
    { id: 4, title: '상품명 4', price: 4000, image: 'https://via.placeholder.com/300?text=Product+4' },
    { id: 5, title: '상품명 5', price: 5000, image: 'https://via.placeholder.com/300?text=Product+5' },
    { id: 6, title: '상품명 6', price: 6000, image: 'https://via.placeholder.com/300?text=Product+6' },
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 2000);
    return () => clearInterval(interval); // 컴포넌트가 언마운트되면 타이머 제거
  }, [products.length]);
  const goToPrevious = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? products.length - 1 : prevIndex - 1));
  };
  const goToNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % products.length);
  };
  return (
    <div className={styles.container}>
      {/* 네비게이션 바 */}
      <nav className={styles.navbar}>
        <h1 className={styles.logo}>Moivo</h1>
        <ul className={styles.navLinks}>
          <li><Link to="/">Moivo</Link></li>
          <li><Link to="/store-list">상품리스트</Link></li>
        </ul>
      </nav>
      {/* 상단 배너 섹션 */}
      <section className="container">
        <div className="row" id="slider-text">
          <div className="col-md-6">
            <h2 className="text-center">NEW COLLECTION</h2>
          </div>
        </div>
      </section>
      {/* 상품 리스트 섹션 */}
      <div className={`${styles.slider} container-fluid`}>
        <h1 className="text-center">Product Slider</h1>
        <div className={styles.carousel}>
          <div className={styles.carouselInner}>
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`${styles.carouselItem} ${index === activeIndex ? styles.active : ''}`}
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                <div className="col-xs-12 col-sm-6 col-md-2">
                  <a href="#">
                    <img
                      src={product.image}
                      className="img-responsive center-block"
                      alt={`상품 이미지 ${product.id}`}
                    />
                  </a>
                  <h4 className="text-center">{product.title}</h4>
                  <h5 className="text-center">가격 {product.price} 원</h5>
                </div>
              </div>
            ))}
          </div>
          <button className={styles.carouselControlPrev} onClick={goToPrevious}>
            ❮
          </button>
          <button className={styles.carouselControlNext} onClick={goToNext}>
            ❯
          </button>
        </div>
      </div>
      {/* 푸터 섹션 */}
      <footer id="main-footer" className={styles.mainFooter}>
        <div className="container">
          <div className={styles.footerGridContainer}>
            <div>
              <section className={styles.navLogo}>
                Moivo
              </section>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque provident labore suscipit, id illo magni odit?
              </p>
            </div>
            <div>
              <h2>PRIVACY & TERMS</h2>
              <ul className={styles.anchorLinks}>
                <li><a href="#">Privacy & Security</a></li>
                <li><a href="#">Terms and Conditions</a></li>
                <li><a href="#">Policy</a></li>
              </ul>
            </div>
            <div>
              <h2>GET NOTIFIED FOR NEW PRODUCTS</h2>
              <form>
                <input type="email" placeholder="Email" />
                <input type="submit" className={styles.btn} value="Submit" />
              </form>
            </div>
            <div>
              <h2>SITE LINKS</h2>
              <ul className={styles.anchorLinks}>
                <li><a href="#">About us</a></li>
                <li><a href="#">Help & Support</a></li>
                <li><a href="#">Career</a></li>
                <li><a href="#">Refund Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default ProductBoard;