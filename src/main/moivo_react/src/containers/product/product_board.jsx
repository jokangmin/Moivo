// src/containers/product/ProductBoard.jsx
import React from 'react';
import Slider from "../../components/Slider/Slider";
// import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "../../assets/css/product_board.module.css";
import Footer from './../../components/Footer/Footer';
import Banner from '../../components/Banner/banner';

const ProductBoard = () => {
  return (
    <div>
      <div>
        <Banner />
      </div>
      <div className={styles.container}>
        {/* Sidebar 컴포넌트 */}
        {/* <Sidebar /> */}

        {/* Slider 컴포넌트 */}
        <Slider />

        {/* 추가 콘텐츠 */}
<div className={styles.faqSection}>
  <h3>자주 묻는 질문</h3>
  <details>
    <summary>교환 및 환불이 가능한가요?</summary>
    <p>상품 수령 후 7일 이내에 가능합니다.</p>
  </details>
  <details>
    <summary>배송은 얼마나 걸리나요?</summary>
    <p>주문 후 3~5일 이내에 배송됩니다.</p>
  </details>
</div>

<div className={styles.brandInfo}>
  <h3>브랜드 소개</h3>
  <p>사용자에게 알맞은 제품을 추천드립니다.</p>
</div>

<div className={styles.snsShare}>
  <h3>상품 공유</h3>
  <div className={styles.snsIcons}>
    <a href="https://facebook.com"><i className="fab fa-facebook"></i></a>
    <a href="https://twitter.com"><i className="fab fa-twitter"></i></a>
    <a href="https://instagram.com"><i className="fab fa-instagram"></i></a>
  </div>
</div>

<div className={styles.policySection}>
  <h3>배송 및 환불 정책</h3>
  <p>배송: 주문 후 3~5일 이내 배송</p>
  <p>환불: 상품 수령 후 7일 이내 가능</p>
</div>



        {/* 푸터 */}
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ProductBoard;
