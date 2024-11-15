import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from "../../assets/css/product_board.module.css";

const ProductBoard = () => {
  const [activeIndex, setActiveIndex] = useState(0); // 슬라이더 인덱스 상태
  const [sidebarOpen, setSidebarOpen] = useState(false); // 사이드바 열림 상태
  const sidebarRef = useRef(null); // 사이드바 참조

  // 슬라이더 이미지 목록
  const images = [
    "https://static.zara.net/assets/public/367c/3a7e/8f13446db501/6375e147fa9e/image-landscape-8b3ed02c-d286-4182-afd5-137c7958ad3d-default_0/image-landscape-8b3ed02c-d286-4182-afd5-137c7958ad3d-default_0.jpg?ts=1730907764587&w=1775",
    "https://static.zara.net/assets/public/b567/b1ff/c40a4eafae24/693cc78ba17e/image-landscape-7589e724-ce17-4083-acfe-e1dcf345fdea-default_0/image-landscape-7589e724-ce17-4083-acfe-e1dcf345fdea-default_0.jpg?ts=1731590140965&w=1920",
    "https://static.zara.net/assets/public/d241/4ae3/4e3145d182c6/942a76f830af/image-landscape-5b432a32-f01f-45d2-9726-5d66ff8aed41-default_0/image-landscape-5b432a32-f01f-45d2-9726-5d66ff8aed41-default_0.jpg?ts=1731516447084&w=1920"
  ];

  // 슬라이더 자동 재생
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [images.length]);

  // 이전 슬라이드
  const goToPrevious = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  // 다음 슬라이드
  const goToNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // 사이드바 토글
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // 사이드바 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container}>
      {/* 사이드바 토글 버튼 */}
      <div className={styles.navRight}>
        <div className={`${styles.button} ${sidebarOpen ? styles.active : ''}`} onClick={toggleSidebar}>
          <div className={`${styles.bar} ${styles.top}`}></div>
          <div className={`${styles.bar} ${styles.middle}`}></div>
          <div className={`${styles.bar} ${styles.bottom}`}></div>
        </div>
      </div>

      {/* 사이드바 */}
      <div ref={sidebarRef} className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
        <button onClick={() => setSidebarOpen(false)} className={styles.closeButton}>×</button> {/* 닫기 버튼 */}
        <ul className={styles.sidebarList}>
          <li className={styles.sidebarItem}><Link to="/" className={styles.sidebarAnchor}>Home</Link></li>
          <li className={styles.sidebarItem}><Link to="/product-list" className={styles.sidebarAnchor}>상품리스트</Link></li>
          <li className={styles.sidebarItem}><Link to="#" className={styles.sidebarAnchor}>Item 3</Link></li>
          <li className={styles.sidebarItem}><Link to="#" className={styles.sidebarAnchor}>Item 4</Link></li>
        </ul>
      </div>

      {/* 슬라이더 섹션 */}
      <h1 className="text-center">슬라이더 섹션 자리, 로고를 두고 이동하는 링크예정</h1>
      <div className="container-fluid">
        <div className={styles.carousel}>
          <div className={styles.carouselInner} style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
            {images.map((image, index) => (
              <div key={index} className={`${styles.carouselItem} ${index === activeIndex ? styles.active : ''}`}>
                <img src={image} alt={`슬라이드 이미지 ${index + 1}`} className="img-responsive center-block" />
              </div>
            ))}
          </div>
          <button className={styles.carouselControlPrev} onClick={goToPrevious}>❮</button>
          <button className={styles.carouselControlNext} onClick={goToNext}>❯</button>
        </div>
      </div>

      {/* 푸터 */}
      <footer id="main-footer" className={styles.mainFooter}>
        <div className="container">
          <div className={styles.footerGridContainer}>
            <div>
              <section className={styles.navLogo}>Moivo</section>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
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
