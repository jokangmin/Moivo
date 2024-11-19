import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../../assets/css/product_detail.module.css";
import Banner from "../../components/Banner/banner";
import Footer from "../../components/Footer/Footer";
import axios  from "axios";

const ProductDetail = () => {
  const { state } = useLocation();
  const product = state?.product;
  const navigate = useNavigate();

  const [selectedSize, setSize] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [mainImg, setMainImg] = useState(product?.image);
  const [showTopButton, setShowTopButton] = useState(false);

  // axios 테스트
  const onTest = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/store/review/test");
      alert(`연결 성공: ${response.data.message}`);
    } catch (error) {
      console.error("API 테스트 실패:", error);
      alert(`연결 실패: ${error.response?.data?.message || "서버 오류"}`);
    }
  };


  if (!product) {
    return (
      <div className={styles.error}>
        <h2>상품 정보를 불러올 수 없습니다.</h2>
        <button onClick={() => navigate("/")}>홈으로 이동</button>
      </div>
    );
  }

  const addToCart = () => {
    if (!selectedSize) {
      alert("옵션을 선택해주세요.");
      return;
    }
    setCartCount(cartCount + 1);
    alert(`장바구니에 추가됨! ${product.title}, 사이즈: ${selectedSize}`);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const onAPI = () => {
    axios.get('http://localhost:8080/api/auth/onAPI')
          .then(res => setAPI(res.data))

  }; 

  return (
    <div>
    <div className={styles.container}>
      <Banner />
      <div className={styles.content}>
        {/* 구매 정보 섹션 */}
        <div className={styles.infoArea}>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.category}>카테고리: {product.category}</p>
          <p className={styles.price}>₩{product.price.toLocaleString()}</p>
          <p className={styles.stock}>재고: {product.stock} 개</p>
          <div className={styles.options}>
            <label>사이즈:</label>
            <select
              value={selectedSize}
              onChange={(e) => setSize(e.target.value)}
              className={styles.select}
            >
              <option value="">사이즈 선택</option>
              {product.size.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          {selectedSize && (
            <div className={styles.selectedOptions}>
              <p>선택한 옵션: 사이즈 - {selectedSize}</p>
            </div>
          )}
          <button className={styles.cartBtn} onClick={addToCart}>
            장바구니에 추가
          </button>
          <button className={styles.buyBtn} onClick={() => alert("구매 페이지로 이동")}>
            바로 구매하기
          </button>

          {/* 썸네일 섹션 */}
          <div className={styles.thumbs}>
            {[...Array(4)].map((_, idx) => (
              <img
                key={idx}
                src={product.image}
                alt={`Thumb ${idx}`}
                className={styles.thumb}
                onClick={() => setMainImg(product.image)}
              />
            ))}
          </div>
        </div>

        {/* 메인 이미지 섹션 */}
        <div className={styles.gallery}>
          <div className={styles.mainImgWrap}>
            <img src={mainImg} alt={product.title} className={styles.mainImg} />
          </div>
        </div>
      </div>

      {/* 설명문 추가 */}
      <div className={styles.description}>
        <h2>상품 설명</h2>
        <p>{product.description || "해당 상품에 대한 설명이 없습니다."}</p>
      </div>

      {/* 리뷰 섹션 */}
      <div className="review-section">
            <h2> 리뷰 섹션 </h2>
            <p> Ah aaaaa </p>
            <p> Ah aaaaa </p>
            <p> Ah aaaaa </p>
            <p> Ah aaaaa </p>
            <p> Ah aaaaa </p>
            <button onClick={ onTest }>API 테스트</button>
      </div>      

      {/* 상단 이동 버튼 */}
      {showTopButton && (
        <button className={styles.topButton} onClick={scrollToTop}>
          ⬆️
        </button>
      )}
      <div>
      
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default ProductDetail;
