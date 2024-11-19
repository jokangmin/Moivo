import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../assets/css/Mypage.module.css";

const MypageMain = () => {
  const [startIndex, setStartIndex] = useState(0);

  const productList = [
    { image: "../image/only1.jpg", name: "Angel wing tee", price: "KRW 62,000" },
    { image: "../image/only2.jpg", name: "Ruffle baggy jeans", price: "KRW 129,000" },
    { image: "../image/only3.jpg", name: "Hailey cardigan", price: "KRW 105,000" },
    { image: "../image/only4.jpg", name: "Olive flared skirt", price: "KRW 73,000" },
    { image: "../image/only5.jpg", name: "Classic pink logo top", price: "KRW 78,000" },
    { image: "../image/only6.jpg", name: "Lace up cargo pants", price: "KRW 78,000" },
  ];

  const maxIndex = productList.length - 3; // 화면에 3개씩 표시

  // 좌측 화살표 클릭 시, 시작 인덱스 감소
  const handleLeftArrowClick = () => {
    setStartIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : maxIndex));
  };

  // 우측 화살표 클릭 시, 시작 인덱스 증가
  const handleRightArrowClick = () => {
    setStartIndex((prevIndex) => (prevIndex < maxIndex ? prevIndex + 1 : 0));
  };

  // 자동 슬라이드 기능 구현
  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prevIndex) => (prevIndex < maxIndex ? prevIndex + 1 : 0));
    }, 3000); // 3초마다 자동 슬라이드

    // 컴포넌트 언마운트 시 인터벌 제거
    return () => clearInterval(interval);
  }, [maxIndex]);
  return (
    <div className={styles.memberFrame}>
      {/* 타이틀 */}
      <div className={styles.title}>MY ACCOUNT</div>

      {/* 멤버십 박스 */}
      <div className={styles.membershipBox}>
        <div className={styles.membershipImage}>
          <img src="../image/level5.png" alt="Profile" />
        </div>
        <div>
          <div className={styles.membershipInfo}>
            전수민님의 멤버십 등급은 [GOLD]입니다.<br />
            VIP까지 남은 구매금액은 KRW 100,000원입니다.
          </div>
          <div className={styles.pointCoupon}>POINT : 5,000 | COUPON : 10</div>
        </div>
      </div>

      {/* 좌우 배치 영역 */}
      <div className={styles.contentWrapper}>
        {/* ONLY FOR YOU */}
        <div className={styles.onlyForYouBox}>
          <div className={styles.onlyForYou}>ONLY FOR YOU</div>
          {/* 좌우 화살표 버튼 */}
        <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={handleLeftArrowClick}>
          <img src="../image/arrow.png" alt="Left Arrow" />
        </button>
        <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={handleRightArrowClick}>
          <img src="../image/arrow.png" alt="Right Arrow" />
        </button>

        <div className={styles.productList}>
          {productList.slice(startIndex, startIndex + 3).map((product, index) => (
            <div key={index} className={styles.product}>
              <div className={styles.productImage}>
                <img src={product.image} alt={product.name} />
              </div>
              <div className={styles.productText}>
                {product.name} <br /> {product.price}
              </div>
            </div>
          ))}
        </div>

          {/* 하단 바 */}
          <div className={styles.bottomBar}></div>
          
        </div>

        {/* 오른쪽 메뉴 */}
        <div className={styles.menuWrapper}>
          <div className={styles.crossLine}>
            <div className={styles.horizontal}></div>
            <div className={styles.vertical}></div>
          </div>
            <Link to="/mypage/profile" className={styles.menuItem}>
              <img src="../image/profile.png" alt="Profile" />
              PROFILE
            </Link>
            <Link to="/mypage/order" className={styles.menuItem}>
              <img src="../image/order.png" alt="Order" />
              ORDER
            </Link>
            <Link to="/mypage/board" className={styles.menuItem}>
              <img src="../image/board.png" alt="Board" />
              BOARD
            </Link>
            <Link to="/mypage/wish" className={styles.menuItem}>
              <img src="../image/wish.png" alt="Wishlist" />
              WISHLIST
            </Link>

        </div>
      </div>
      
      {/* Footer */}
      <footer id="main-footer" className={styles.mainFooter}>
        <div className="container">
          <div className={styles.footerGridContainer}> 
            <div>
              <section className={styles.navLogo}>Moivo</section>
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

export default MypageMain;
