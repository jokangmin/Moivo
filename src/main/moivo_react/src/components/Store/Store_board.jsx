import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../css/Store_board.module.css';

const StoreBoard = () => {
  return (
    <div className={styles.container}>
      {/* 네비게이션 바 */}
      <nav className={styles.navbar}>
        <h1 className={styles.logo}>Moivo</h1>
        <ul className={styles.navLinks}>
          <li><Link to="/">Moivo</Link></li>
          <li><Link to="/store-list">상품리스트</Link></li> {/* 이동 경로 수정 */}
        </ul>
      </nav>

      {/* 상단 배너 섹션 */}
      <section className={styles.banner}>
        <div className={styles.bannerContent}>
          <h1>최신 상품을 만나보세요</h1>
          <p>고객님을 위한 특별한 아이템을 확인하세요.</p>
        </div>
      </section>

      {/* 상품 리스트 섹션 */}
      <section className={styles.productList}>
        {[1, 2, 3].map((item) => (
          <div key={item} className={styles.productItem}>
            <img src="https://via.placeholder.com/300" alt={`상품 이미지 ${item}`} className={styles.productImage} />
            <h2 className={styles.productTitle}>상품명 {item}</h2>
            <p className={styles.productDescription}>상품 설명 {item}</p>
          </div>
        ))}
      </section>

      {/* 푸터 섹션 */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>0</p>
          <p>0</p>
        </div>
      </footer>
    </div>
  );
};

export default StoreBoard;
