// src/containers/product/ProductBoard.jsx
import React from 'react';
import Slider from "../../components/Slider/Slider";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "../../assets/css/product_board.module.css";

const ProductBoard = () => {
  return (
    <div className={styles.container}>
      {/* Sidebar 컴포넌트 */}
      <Sidebar />

      {/* Slider 컴포넌트 */}
      <Slider />

      {/* 추가 콘텐츠 */}
      <h2> 추가 공간 </h2>

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
